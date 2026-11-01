"""
matcher.py — text normalisation + intent / keyword routing for JabuAi.

Handles three kinds of input with one code path:
  - English            "how many projects does he have?"
  - Bangla script      "তোমার প্রজেক্ট কয়টা?"
  - Banglish (romanised Bangla)   "tomar projects koyta?"

Matching rules (all deterministic, no network, no ML):
  - Latin words : exact, or word + a small set of safe suffixes (projects, projectgulo, emailta),
                  or a typo-tolerant fuzzy match for words of 5+ letters ("educaton", "projcts").
  - Bangla words: exact, or prefix match for words of 3+ characters, because Bangla inflects by
                  suffix ("প্রজেক্ট" -> "প্রজেক্টগুলো").
  - Phrases     : consecutive words, each matched with the rules above.
"""
from __future__ import annotations

import json
import re
import unicodedata
from dataclasses import dataclass, field
from difflib import SequenceMatcher
from functools import lru_cache
from pathlib import Path

# ───────────────────────── normalisation ─────────────────────────

_BN_DIGITS = str.maketrans("০১২৩৪৫৬৭৮৯", "0123456789")
_INVISIBLE = dict.fromkeys(map(ord, "\u200b\u200c\u200d\u2060\ufeff"), None)  # ZWSP / ZWNJ / ZWJ / BOM
_NON_WORD = re.compile(r"[^a-z0-9\u0980-\u09ff]+")
_REPEATS = re.compile(r"(.)\1{2,}")
_TOKEN = re.compile(r"[a-z0-9]+|[\u0980-\u09ff]+")
_BN_CHAR = re.compile(r"[\u0980-\u09ff]")

# Suffixes that may follow a Latin keyword without changing its meaning.
_SUFFIXES = frozenset(
    {"s", "es", "d", "ed", "ing", "er", "ers", "al", "ly", "r", "e", "ta", "ti", "gulo", "gula", "guli", "ke", "te", "ra", "der", "ar", "tar"}
)
_FUZZY_MIN_LEN = 5
_FUZZY_RATIO = 0.87
_FUZZY_WEIGHT = 0.8
_MAX_TOKENS = 40


def normalize(text: str) -> str:
    """Lower-case, NFC-normalise, strip punctuation / zero-width chars, map Bangla digits."""
    t = unicodedata.normalize("NFC", text).translate(_INVISIBLE).translate(_BN_DIGITS).lower()
    t = t.replace("'", "").replace("\u2019", "")  # what's -> whats
    t = _REPEATS.sub(lambda m: m.group(1) * 2, t)  # hiiiii -> hii
    return " ".join(_NON_WORD.sub(" ", t).split())


def tokenize(norm: str) -> list[str]:
    return _TOKEN.findall(norm)


def has_bangla(text: str) -> bool:
    return bool(_BN_CHAR.search(text))


# ───────────────────────── term matching ─────────────────────────


@dataclass(frozen=True)
class Term:
    """A keyword or phrase, already normalised and split into words."""

    text: str
    words: tuple[str, ...]


def compile_term(raw: str) -> Term | None:
    words = tuple(tokenize(normalize(raw)))
    return Term(" ".join(words), words) if words else None


@lru_cache(maxsize=8192)
def _fuzzy(a: str, b: str) -> bool:
    return a[0] == b[0] and SequenceMatcher(None, a, b).ratio() >= _FUZZY_RATIO


def _word_match(token: str, word: str, fuzzy: bool) -> float:
    """1.0 exact / safe-affix match, 0.8 fuzzy match, 0 no match."""
    if token == word:
        return 1.0
    if has_bangla(word):
        return 1.0 if len(word) >= 3 and token.startswith(word) else 0.0
    if len(word) >= 4 and token.startswith(word) and token[len(word):] in _SUFFIXES:
        return 1.0
    if fuzzy and len(word) >= _FUZZY_MIN_LEN and len(token) >= _FUZZY_MIN_LEN and abs(len(word) - len(token)) <= 2 and _fuzzy(token, word):
        return _FUZZY_WEIGHT
    return 0.0


def match_term(term: Term, tokens: list[str], fuzzy: bool = False) -> tuple[int, float] | None:
    """Return (token_index, weight) of the first occurrence of `term` in `tokens`, else None."""
    n = len(term.words)
    use_fuzzy = fuzzy and n == 1
    for i in range(len(tokens) - n + 1):
        weight = 1.0
        for j, word in enumerate(term.words):
            m = _word_match(tokens[i + j], word, use_fuzzy)
            if not m:
                break
            weight = min(weight, m)
        else:
            return i, weight
    return None


# ───────────────────────── intent definitions ─────────────────────────


@dataclass
class IntentDef:
    id: str
    route: str | None
    phrases: list[Term]
    keywords: list[Term]
    generic: bool = False  # catch-all topic (e.g. "about"): only used when nothing more specific matched
    smalltalk: bool = False  # greeting / thanks / bye
    weak: bool = False  # dropped when any other topic intent matched (e.g. "resume")


@dataclass
class RouteResult:
    intents: list[str] = field(default_factory=list)
    stage: str = "none"  # "intent" | "keyword" | "none"
    lang: str = "en"  # "en" | "bn" | "bn_roman"
    detail: bool = False  # user explicitly asked for details
    norm: str = ""
    tokens: list[str] = field(default_factory=list)
    score: float = 0.0


def _flat(group: dict | list | None) -> list[str]:
    if isinstance(group, dict):
        return [x for items in group.values() for x in items]
    return list(group or [])


def _terms(items: list[str]) -> list[Term]:
    seen: set[str] = set()
    out: list[Term] = []
    for raw in items:
        t = compile_term(raw)
        if t and t.text not in seen:
            seen.add(t.text)
            out.append(t)
    return out


class IntentRouter:
    """Stage 1: intent phrases  →  Stage 2: keyword scoring  →  generic / small-talk fallbacks."""

    def __init__(self, config: dict):
        self.config = config
        self.max_sections = int(config.get("max_sections", 3))
        self.generic_max_tokens = int(config.get("generic_max_tokens", 6))
        self.smalltalk_extra = int(config.get("smalltalk_max_extra_tokens", 3))
        self.min_keyword_score = float(config.get("min_keyword_score", 0.8))
        self.intents: list[IntentDef] = [
            IntentDef(
                id=raw["id"],
                route=raw.get("route"),
                phrases=_terms(_flat(raw.get("phrases"))),
                keywords=_terms(_flat(raw.get("keywords"))),
                generic=bool(raw.get("generic")),
                smalltalk=bool(raw.get("smalltalk")),
                weak=bool(raw.get("weak")),
            )
            for raw in config["intents"]
        ]
        self.routes = {i.id: i.route for i in self.intents}
        self.detail_terms = _terms(config.get("detail_markers", []))

        # every word the router knows — used to ignore these words when looking for entities
        self.vocab: set[str] = {w for i in self.intents for t in (*i.phrases, *i.keywords) for w in t.words}

        # Banglish detection: explicit marker words + romanised keywords that are not English words.
        en_words = {w for i in config["intents"] for k in ("phrases", "keywords") for w in _words_of((i.get(k) or {}).get("en", []))}
        roman_words = {w for i in config["intents"] for k in ("phrases", "keywords") for w in _words_of((i.get(k) or {}).get("bn_roman", []))}
        en_stems = {w.rstrip("s") for w in en_words}
        roman_only = {w for w in roman_words if w.rstrip("s") not in en_stems}
        self.banglish_markers: set[str] = {w for m in config.get("banglish_markers", []) for w in _words_of([m])} | roman_only

    # -- helpers --------------------------------------------------------------------------------

    def detect_language(self, text: str, tokens: list[str]) -> str:
        if has_bangla(text):
            return "bn"
        return "bn_roman" if any(t in self.banglish_markers for t in tokens) else "en"

    def _wants_detail(self, tokens: list[str]) -> bool:
        return any(match_term(t, tokens) for t in self.detail_terms)

    @staticmethod
    def _collect(terms: list[Term], tokens: list[str], fuzzy: bool) -> tuple[float, int | None]:
        """Sum of weights of distinct matched terms, and the earliest token position."""
        score, first = 0.0, None
        for term in terms:
            hit = match_term(term, tokens, fuzzy)
            if hit:
                pos, weight = hit
                score += weight
                first = pos if first is None else min(first, pos)
        return score, first

    def _pick(self, scored: list[tuple[str, float, int]]) -> list[str]:
        """Order by position in the question (so 'experience and education' answers in that order)."""
        scored.sort(key=lambda x: x[2])
        return [s[0] for s in scored][: self.max_sections]

    # -- main entry -----------------------------------------------------------------------------

    def route(self, text: str) -> RouteResult:
        norm = normalize(text)
        tokens = tokenize(norm)[:_MAX_TOKENS]  # bounds the worst-case work per request
        res = RouteResult(
            lang=self.detect_language(text, tokens),
            detail=self._wants_detail(tokens),
            norm=norm,
            tokens=tokens,
        )
        if not tokens:
            return res

        topics = [i for i in self.intents if not i.generic and not i.smalltalk]

        # Stage 1 — intent phrases (explicit questions such as "how many projects")
        hits = [(i.id, *self._collect(i.phrases, tokens, False)) for i in topics]
        stage1 = [(iid, s, pos) for iid, s, pos in hits if s > 0 and pos is not None]
        weak = {i.id for i in self.intents if i.weak}
        if stage1 and any(s[0] not in weak for s in stage1):
            res.intents, res.stage, res.score = self._pick(self._drop_weak(stage1)), "intent", max(s for _, s, _ in stage1)
            return res

        # Stage 2 — keyword scoring (single topical words, typo-tolerant)
        hits = [(i.id, *self._collect(i.keywords, tokens, True)) for i in topics]
        stage2 = [(iid, s, pos) for iid, s, pos in hits if s >= self.min_keyword_score and pos is not None]
        if stage2 and (not stage1 or any(s[0] not in weak for s in stage2)):
            res.intents, res.stage, res.score = self._pick(self._drop_weak(stage2)), "keyword", max(s for _, s, _ in stage2)
            return res
        if stage1:  # only weak intents (e.g. "resume") matched
            res.intents, res.stage, res.score = self._pick(stage1), "intent", max(s for _, s, _ in stage1)
            return res

        # Generic topic ("about") — only for short messages, otherwise let the detailed layer / LLM decide
        if len(tokens) <= self.generic_max_tokens:
            for i in self.intents:
                if not i.generic:
                    continue
                ps, _ = self._collect(i.phrases, tokens, False)
                ks, _ = self._collect(i.keywords, tokens, True)
                if ps > 0 or ks >= self.min_keyword_score:
                    res.intents, res.stage, res.score = [i.id], ("intent" if ps > 0 else "keyword"), max(ps, ks)
                    return res

        # Small talk — only when the message is basically just the greeting / thanks
        for i in self.intents:
            if not i.smalltalk:
                continue
            for term in i.phrases:
                if match_term(term, tokens) and len(tokens) <= len(term.words) + self.smalltalk_extra:
                    res.intents, res.stage, res.score = [i.id], "intent", 1.0
                    return res
        return res

    def _drop_weak(self, scored: list[tuple[str, float, int]]) -> list[tuple[str, float, int]]:
        weak = {i.id for i in self.intents if i.weak}
        strong = [s for s in scored if s[0] not in weak]
        return strong or scored


def _words_of(items: list[str]) -> list[str]:
    return [w for raw in items for w in tokenize(normalize(raw))]


def load_config(path: Path) -> dict:
    cfg = json.loads(path.read_text(encoding="utf-8"))
    ids = [i["id"] for i in cfg["intents"]]
    if len(ids) != len(set(ids)):
        raise ValueError("intents.json: duplicate intent ids")
    missing = [i for i in ids if i not in cfg.get("quick_answers", {})]
    if missing:
        raise ValueError(f"intents.json: quick_answers missing for intents: {missing}")
    for iid, block in cfg["quick_answers"].items():
        if "en" not in block:
            raise ValueError(f"intents.json: quick_answers.{iid} needs an 'en' template")
    return cfg
