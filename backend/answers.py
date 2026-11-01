"""
answers.py — the deterministic part of the JabuAi pipeline.

  1. intents          (matcher.IntentRouter, phrase level)
  2. keywords         (matcher.IntentRouter, keyword level, typo tolerant, Bangla + English + Banglish)
  3. quick_answers    (templates in intents.json filled with live data from knowledge.json)
  4. detailed knowledge
        - explicit "in detail" requests          → full section
        - a specific project / technology / category in the question → targeted answer
        - offline keyword search over the whole knowledge base

Anything this module cannot answer returns Reply(answer=None) and the API layer hands the
question to the LLM (or the final "no match" message).
"""
from __future__ import annotations

import re
from dataclasses import dataclass, field

from matcher import IntentRouter, RouteResult, Term, compile_term, match_term, normalize, tokenize

# ───────────────────────── small helpers ─────────────────────────


class _Safe(dict):
    def __missing__(self, key: str) -> str:  # unknown {placeholder} stays visible instead of crashing
        return "{" + key + "}"


def _fmt(template: str, ctx: dict) -> str:
    return template.format_map(_Safe(ctx))


def _pick_lang(block: dict, lang: str) -> str:
    return block.get(lang) or block["en"]


def _clean_missing(text: str) -> str:
    """Drop '- Label: -' lines produced by optional fields (e.g. no alternate email)."""
    return "\n".join(line for line in text.split("\n") if not re.match(r"^\s*-\s.*:\s*-\s*$", line))


# Words that say nothing about *which* project the user means.
_GENERIC_TITLE_WORDS = frozenset(
    {"web", "application", "app", "system", "based", "using", "framework", "project", "projects", "basic", "template", "reusable", "website", "game", "enhanced", "personal", "for", "and", "the", "with"}
)
# Technologies too broad to be a useful filter.
_GENERIC_TECH = frozenset({"ai", "ml", "api", "json"})
# Query → canonical technology key.
_TECH_ALIASES = {
    "sklearn": "scikit learn",
    "scikit": "scikit learn",
    "js": "javascript",
    "postgres": "postgresql",
    "unet": "u net",
    "tf": "tensorflow",
    "llms": "llm",
    "cnns": "cnn",
    "gemini": "gemini api",
    "reactjs": "react",
}
_STOPWORDS = frozenset(
    "a an the is are was were be do does did can could will would you your yours he his him she her they them i me my we our of in on at to for from with and or but "
    "what which who whom how many much any some about tell show give list please there this that these those it its as by not no yes has have had "
    "ami tumi apni tomar apnar amar ki kii ache achhe koto koyta koyti bolo bolun jante chai chaichi dao din kon kore kori niye er ke te ta ti gulo gula ar o".split()
)

ENTITY_OVERRIDE_INTENTS = frozenset({"projects", "research", "skills", "experience"})

_T = {  # wrappers for entity answers (the data itself stays in English)
    "tech_used": {
        "en": "{tech} is part of Jaber's {group} toolkit and is used in {n} project(s):",
        "bn": "{tech} জাবেরের {group} টুলকিটের অংশ এবং {n}টি প্রজেক্টে ব্যবহার হয়েছে:",
        "bn_roman": "{tech} Jaber-er {group} toolkit-er ongsho ar {n}-ta project-e use hoyeche:",
    },
    "tech_projects": {
        "en": "{tech} is used in {n} project(s):",
        "bn": "{tech} {n}টি প্রজেক্টে ব্যবহার হয়েছে:",
        "bn_roman": "{tech} {n}-ta project-e use hoyeche:",
    },
    "tech_only": {
        "en": "{tech} is listed under {group} in Jaber's tech stack.",
        "bn": "{tech} জাবেরের টেক স্ট্যাকে {group} ক্যাটাগরিতে আছে।",
        "bn_roman": "{tech} Jaber-er tech stack-e {group} category-te ache.",
    },
    "category": {
        "en": "{title} — {n} project(s):",
        "bn": "{title} — মোট {n}টি প্রজেক্ট:",
        "bn_roman": "{title} — mot {n}-ta project:",
    },
    "more": {
        "en": "...and {n} more. See the Projects page for the full list.",
        "bn": "...আরও {n}টি আছে। পূর্ণ তালিকা Projects পেজে দেখুন।",
        "bn_roman": "...aro {n}-ta ache. Puro list Projects page-e dekhun.",
    },
    "hint_detail": {
        "en": "Ask about any project by name for full details and links.",
        "bn": "যেকোনো প্রজেক্টের নাম লিখলে বিস্তারিত ও লিংক পাবেন।",
        "bn_roman": "Jekono project-er naam likhle bistarito ar link paben.",
    },
    "related": {
        "en": "Here is what I found in Jaber's portfolio:",
        "bn": "জাবেরের পোর্টফোলিওতে যা পেলাম:",
        "bn_roman": "Jaber-er portfolio-te ja pelam:",
    },
    "tech": {"en": "Tech", "bn": "টেক", "bn_roman": "Tech"},
}


@dataclass
class Reply:
    answer: str | None
    route: str | None = None
    source: str = "none"  # intent | keyword | detail | none
    intents: list[str] = field(default_factory=list)
    lang: str = "en"


@dataclass
class _Project:
    raw: dict
    sig: list[str]
    core: str  # normalised title without parentheses / suffix after "|"


# ───────────────────────── the engine ─────────────────────────


class Responder:
    def __init__(self, kb: dict, config: dict, router: IntentRouter):
        self.kb, self.cfg, self.router = kb, config, router
        self.qa = config["quick_answers"]
        self.headers = config.get("detail_headers", {})
        self.fallback_msgs = config.get("fallback_messages", {})
        self.projects = kb["projects"]
        self._ctx = self._build_context()
        self._build_indexes()

    # ── context for templates ──────────────────────────────────────────────────────────────────

    def _build_context(self) -> dict:
        kb, p = self.kb, self.kb["profile"]
        cats = kb.get("project_categories", [])
        research = [x for x in self.projects if x["category_id"] == "research"]
        research_cat = next((c for c in cats if c["title"].lower() == "research"), {})
        return {
            "name": p["name"],
            "title": p["title"],
            "roles": ", ".join(p.get("roles", [])),
            "intro": p.get("intro", ""),
            "location": p.get("location", "-"),
            "email": p.get("email", "-"),
            "email_alt": p.get("emailAlt") or "-",
            "phone": p.get("phone", "-"),
            "linkedin": p.get("linkedin", "-"),
            "github": p.get("github", "-"),
            "project_total": len(self.projects),
            "category_total": len(cats) or len({x["category_id"] for x in self.projects}),
            "live_total": sum(1 for x in self.projects if x.get("live")),
            "research_total": len(research),
            "research_tag": research_cat.get("tag", "Research"),
            "tech_groups": ", ".join(t["label"] for t in kb.get("tech_stack", [])),
        }

    # ── lists used by quick answers / details ──────────────────────────────────────────────────

    def _items(self, intent: str, detailed: bool) -> str:
        kb = self.kb
        if intent == "education":
            return "\n".join(f"- {e['title']}, {e['org']} ({e['period']})" for e in kb["education"])
        if intent == "experience":
            rows = []
            for e in kb["experience"]:
                rows.append(f"- {e['title']} @ {e['org']} ({e['period']})")
                if detailed and e.get("text"):
                    rows.append(f"  {e['text']}")
            return "\n".join(rows)
        if intent == "achievements":
            rows = []
            for a in kb["achievements"]:
                rows.append(f"- {a['title']} — {a['meta']}")
                if detailed and a.get("text"):
                    rows.append(f"  {a['text']}")
            for c in kb.get("certifications", []):
                rows.append(f"- Certification: {c.get('title')} ({c.get('issuer', '')})".replace(" ()", ""))
            return "\n".join(rows)
        if intent == "research":
            rows = []
            for x in (p for p in self.projects if p["category_id"] == "research"):
                rows.append(f"- {x['title']}")
                if detailed:
                    rows.append(f"  {x['description']}")
                    rows.append(f"  Tech: {', '.join(x['techs'])}")
            return "\n".join(rows)
        if intent == "projects":
            rows = []
            for cat in kb["project_categories"]:
                members = [x for x in self.projects if x["category"] == cat["title"]]
                rows.append(f"{cat['title']} ({len(members)}):")
                for x in members:
                    rows.append(f"- {x['title']}" + (f": {x['description']}" if detailed else ""))
            return "\n".join(rows)
        if intent == "skills":
            rows = []
            for t in kb["tech_stack"]:
                tools = t["tools"] if detailed else t["tools"][:8]
                rows.append(f"- {t['label']}: {', '.join(tools)}")
                if detailed and t.get("blurb"):
                    rows.append(f"  {t['blurb']}")
            return "\n".join(rows)
        if intent == "resume":
            return "\n".join([self._items("experience", False), self._items("education", False)])
        return ""

    # ── step 3: quick answers ──────────────────────────────────────────────────────────────────

    def quick(self, intent: str, lang: str) -> str:
        ctx = {**self._ctx, "items": self._items(intent, False)}
        return _clean_missing(_fmt(_pick_lang(self.qa[intent], lang), ctx)).strip()

    # ── step 4a: detailed sections ─────────────────────────────────────────────────────────────

    def detailed(self, intent: str, lang: str) -> str:
        header = _pick_lang(self.headers.get(intent, {"en": ""}), lang)
        ctx = {**self._ctx, "items": self._items(intent, True)}
        if intent == "about":
            body = [self.quick("about", lang), self._items("skills", False), f"{self._ctx['email']} | {self._ctx['linkedin']}"]
            return f"{header}\n" + "\n\n".join(b for b in body if b)
        if intent in ("projects", "research", "experience", "achievements", "skills"):
            text = _fmt(_pick_lang(self.qa[intent], lang), ctx)
            if intent == "projects":
                text += "\n\n" + _pick_lang(_T["hint_detail"], lang)
            return _clean_missing(text).strip()
        return self.quick(intent, lang)  # education / contact / resume / small talk have nothing more to add

    # ── step 4b: entities (project / technology / category) ────────────────────────────────────

    def _build_indexes(self) -> None:
        vocab = self.router.vocab
        # technologies
        self.tech_display: dict[str, str] = {}
        self.tech_group: dict[str, str] = {}
        for grp in self.kb.get("tech_stack", []):
            for tool in grp["tools"]:
                for part in re.split(r"\s*/\s*", tool):
                    key = self._tech_key(part)
                    if key:
                        self._set_display(key, part.strip())
                        self.tech_group.setdefault(key, grp["label"])
        self.project_techs: list[set[str]] = []
        for pr in self.projects:
            keys = {k for k in (self._tech_key(t) for t in pr["techs"]) if k}
            for t in pr["techs"]:
                if self._tech_key(t):
                    self._set_display(self._tech_key(t), t)
            self.project_techs.append(keys)
        self.tech_terms: dict[str, list[Term]] = {}
        for key in self.tech_display:
            if key in _GENERIC_TECH:
                continue
            names = [key] + [a for a, canon in _TECH_ALIASES.items() if canon == key]
            self.tech_terms[key] = [t for t in (compile_term(n) for n in names) if t]

        # projects (by title)
        self.proj_index: list[_Project] = []
        df: dict[str, int] = {}
        for pr in self.projects:
            core = re.split(r"\s\|\s", re.sub(r"\(.*?\)", " ", pr["title"]))[0]
            sig = [w for w in tokenize(normalize(pr["title"])) if len(w) >= 3 and w not in _GENERIC_TITLE_WORDS]
            self.proj_index.append(_Project(pr, sig, normalize(core)))
            for w in set(sig):
                df[w] = df.get(w, 0) + 1
        tech_words = {w for k in self.tech_display for w in k.split()}
        self.distinctive = {w for w, n in df.items() if n == 1 and len(w) >= 5 and w not in vocab and w not in tech_words}

        # categories (aliases are editable in intents.json)
        self.category_terms: dict[str, list[Term]] = {}
        for cid, langs in self.cfg.get("category_aliases", {}).items():
            terms = [t for items in langs.values() for t in (compile_term(x) for x in items) if t]
            self.category_terms[cid] = terms

    def _set_display(self, key: str, name: str) -> None:
        if len(name) > len(self.tech_display.get(key, "")):
            self.tech_display[key] = name

    @staticmethod
    def _tech_key(name: str) -> str:
        key = normalize(name)
        key = _TECH_ALIASES.get(key, key)
        return key

    def find_projects(self, tokens: list[str], norm: str) -> list[dict]:
        qset = set(tokens) | {t[:-1] for t in tokens if len(t) > 3 and t.endswith("s")}
        scored = []
        for p in self.proj_index:
            matched = [w for w in p.sig if w in qset]
            if not matched:
                continue
            full = len(p.core) >= 8 and p.core in norm
            ratio = len(matched) / max(len(p.sig), 1)
            strong = full or (len(matched) >= 2 and ratio >= 0.4) or len(matched) >= 3 or any(w in self.distinctive for w in matched)
            if strong:
                scored.append((full, len(matched), ratio, p.raw))
        scored.sort(key=lambda x: (x[0], x[1], x[2]), reverse=True)
        if scored and scored[0][0]:
            scored = [s for s in scored if s[0]]
        return [s[3] for s in scored[:3]]

    def find_techs(self, tokens: list[str]) -> list[str]:
        found: list[tuple[int, str]] = []
        for key, terms in self.tech_terms.items():
            for term in terms:
                if len(term.words) == 1 and len(term.text) < 5:
                    idx = next((i for i, t in enumerate(tokens) if t in (term.text, term.text + "s")), None)
                    hit = (idx, 1.0) if idx is not None else None
                else:
                    hit = match_term(term, tokens, fuzzy=True)
                if hit:
                    found.append((hit[0], key))
                    break
        found.sort()
        return [k for _, k in found][:3]

    def find_categories(self, tokens: list[str]) -> list[str]:
        return [cid for cid, terms in self.category_terms.items() if any(match_term(t, tokens) for t in terms)][:2]

    def _project_card(self, pr: dict, lang: str) -> str:
        lines = [f"{pr['title']} [{pr['category']}]", pr["description"]]
        if pr.get("details") and pr["details"] != pr["description"]:
            lines.append(pr["details"])
        lines.append(f"{_pick_lang(_T['tech'], lang)}: {', '.join(pr['techs'])}")
        if pr.get("github"):
            lines.append(f"GitHub: {pr['github']}")
        if pr.get("live"):
            lines.append(f"Live: {pr['live']}")
        return "\n".join(lines)

    def _tech_block(self, key: str, lang: str) -> str:
        display = self.tech_display.get(key, key)
        group = self.tech_group.get(key)
        members = [self.projects[i] for i, keys in enumerate(self.project_techs) if key in keys]
        if not members:
            return _fmt(_pick_lang(_T["tech_only"], lang), {"tech": display, "group": group or "skills"})
        tpl = _T["tech_used"] if group else _T["tech_projects"]
        rows = [_fmt(_pick_lang(tpl, lang), {"tech": display, "group": group, "n": len(members)})]
        rows += [f"- {m['title']} ({m['category']})" for m in members[:8]]
        if len(members) > 8:
            rows.append(_fmt(_pick_lang(_T["more"], lang), {"n": len(members) - 8}))
        return "\n".join(rows)

    def _category_block(self, cid: str, lang: str) -> str | None:
        members = [x for x in self.projects if x["category_id"] == cid]
        if not members:
            return None
        rows = [_fmt(_pick_lang(_T["category"], lang), {"title": members[0]["category"], "n": len(members)})]
        rows += [f"- {m['title']}: {m['description']}" for m in members]
        return "\n".join(rows)

    def entity_answer(self, rr: RouteResult) -> tuple[str, str] | None:
        """Returns (text, route) for a specific project / technology / category question."""
        lang = rr.lang
        projects = self.find_projects(rr.tokens, rr.norm)
        if projects:
            return "\n\n".join(self._project_card(p, lang) for p in projects), "/projects"
        techs = self.find_techs(rr.tokens)
        if techs and (not rr.intents or set(rr.intents) <= ENTITY_OVERRIDE_INTENTS):
            return "\n\n".join(self._tech_block(k, lang) for k in techs), "/projects"
        cats = self.find_categories(rr.tokens)
        if cats and (not rr.intents or set(rr.intents) <= ENTITY_OVERRIDE_INTENTS):
            blocks = [b for b in (self._category_block(c, lang) for c in cats) if b]
            if blocks:
                return "\n\n".join(blocks), "/projects"
        return None

    # ── step 4c: offline search over the whole knowledge base ──────────────────────────────────

    def _documents(self) -> list[tuple[str, set[str], str]]:
        docs: list[tuple[str, set[str], str]] = []

        def add(label: str, text: str) -> None:
            docs.append((label, {w.rstrip("s") for w in tokenize(normalize(text))}, label))

        for x in self.projects:
            add(f"{x['title']}: {x['description']}", f"{x['title']} {x['description']} {x['details']} {' '.join(x['techs'])}")
        for e in self.kb["experience"]:
            add(f"{e['title']} @ {e['org']} ({e['period']}): {e['text']}", f"{e['title']} {e['org']} {e['text']}")
        for a in self.kb["achievements"]:
            add(f"{a['title']} — {a['text']}", f"{a['title']} {a['meta']} {a['text']}")
        return docs

    def search(self, rr: RouteResult, limit: int = 3) -> str | None:
        if not hasattr(self, "_docs"):
            self._docs = self._documents()
        words = {w.rstrip("s") for w in rr.tokens if len(w) >= 3 and w not in _STOPWORDS and not w.isdigit()}
        if not words:
            return None
        ranked = sorted(((len(words & d[1]), d[0]) for d in self._docs), reverse=True)
        top = [label for score, label in ranked if score >= (2 if len(words) >= 4 else 1)][:limit]
        if not top:
            return None
        return _pick_lang(_T["related"], rr.lang) + "\n" + "\n".join(f"- {t}" for t in top)

    def no_match(self, lang: str) -> str:
        return _pick_lang(self.fallback_msgs.get("no_match", {"en": "Sorry, I don't have that information."}), lang)

    # ── the pipeline ───────────────────────────────────────────────────────────────────────────

    def resolve(self, question: str) -> Reply:
        """intents → keywords → quick_answers → detailed knowledge. answer=None means 'not handled'."""
        rr = self.router.route(question)
        route = self.router.routes.get(rr.intents[0]) if rr.intents else None
        base = dict(intents=list(rr.intents), lang=rr.lang)

        # Steps 1-3: an intent / keyword matched → its answer. A specific project/tech in the same
        # question ("which projects use React?") upgrades the answer to the detailed layer.
        if rr.intents:
            override = None
            if not set(rr.intents) <= {"greeting", "thanks", "goodbye", "bot_identity"}:
                override = self.entity_answer(rr)
            if override:
                return Reply(override[0], override[1], "detail", **base)
            parts = [self.detailed(i, rr.lang) if rr.detail else self.quick(i, rr.lang) for i in rr.intents]
            return Reply("\n\n".join(parts), route, rr.stage, **base)

        # Step 4: nothing matched → detailed knowledge (entities), still deterministic.
        ent = self.entity_answer(rr)
        if ent:
            return Reply(ent[0], ent[1], "detail", **base)
        return Reply(None, None, "none", **base)
