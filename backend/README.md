# JabuAi Backend (FastAPI)

```
React Portfolio → JabuAi Chatbot → FastAPI POST /ask
     1. intents        (phrase match)            ┐
     2. keywords       (typo-tolerant scoring)   │  offline, ~2 ms, no API key needed
     3. quick_answers  (intents.json templates)  │
     4. detailed knowledge (sections / project / tech / category) ┘
     5. LLM (Gemini or any OpenAI-compatible API) — only if 1-4 found nothing
     6. offline search → "no match" message — if the LLM is off or fails
```

Bangla (বাংলা), English ও Banglish (romanised Bangla) — তিনটাই keyword matching-এ supported।

## Files
| File | কাজ |
|---|---|
| `main.py` | FastAPI app: `/ask`, `/health`, CORS, rate limit, LLM clients |
| `matcher.py` | normalisation, language detection, intent + keyword router |
| `answers.py` | quick answers, detailed sections, project/tech/category lookup, offline search |
| `intents.json` | **তুমি যেটা edit করবে**: intents, keywords, quick-answer templates (en / bn / bn_roman) |
| `knowledge.json` | auto-generated from `siteData.js` + `projectData.js` |
| `test_router.py` | pytest suite (46 tests) |

## What each question returns
| User asks | Answer |
|---|---|
| education / শিক্ষা / porashona | education section |
| experience / অভিজ্ঞতা / obhiggota | experience section |
| achievements / অর্জন / ortion | achievements section |
| research / গবেষণা / gobeshona | research section (count + titles) |
| projects / প্রজেক্ট / project koyta | total count, per-category counts, full project list |
| contact / যোগাযোগ / jogajog | email, phone, location, LinkedIn, GitHub |
| about / সম্পর্কে / jaber ke | profile summary |
| skills, resume, who are you, hi/thanks/bye | quick answers too |
| "… in detail" / "বিস্তারিত" / "bistarito" | the same section with full descriptions |
| a project name ("ExpenseFlow"), a tech ("react", "tensorflow"), a category ("ml projects") | targeted detailed answer |
| anything else | LLM (if key set) → offline search → help message |

Multiple sections work too: `experience and education` → both, in the order asked.
The response also carries `source` (`intent | keyword | detail | llm | search | fallback`), `intent` and `lang` (`en | bn | bn_roman`).

## Setup
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env              # GEMINI_API_KEY (optional now — steps 1-4 work without it)
node build_knowledge.mjs ../src   # siteData.js / projectData.js → knowledge.json
uvicorn main:app --reload --port 8000
```
Frontend `.env`: `VITE_CHATBOT_API_URL=http://localhost:8000`

## নতুন keyword / intent যোগ করা
`intents.json` খুলে সংশ্লিষ্ট intent-এর `phrases` (পুরো প্রশ্ন, যেমন "how many projects") বা `keywords` (একক শব্দ) list-এ `en` / `bn` / `bn_roman` এর নিচে শব্দ বসাও — code বদলাতে হবে না, server restart দিলেই হবে।
- `phrases` আগে check হয় (intent), না মিললে `keywords` (typo সহ)।
- Answer-এর text বদলাতে `quick_answers.<intent>.<en|bn|bn_roman>` edit করো। Placeholder: `{items} {name} {email} {phone} {project_total} {research_total} ...`
- `generic: true` = catch-all (শুধু ছোট message-এ), `weak: true` = অন্য section মিললে বাদ যায় (resume)।

## Portfolio data বদলালে
`siteData.js` / `projectData.js` edit → `node build_knowledge.mjs ../src` → backend restart। Counts, lists, contact info সব নিজে থেকে update হয়।

## Env variables
| Var | Default | মানে |
|---|---|---|
| `LLM_PROVIDER` | `gemini` | `gemini` / `openai` |
| `GEMINI_API_KEY`, `OPENAI_API_KEY` | – | খালি থাকলে LLM বন্ধ, বাকি সব কাজ করে |
| `ALLOWED_ORIGINS` | localhost + web.app | CORS |
| `RATE_LIMIT_PER_MIN` | `20` | per IP |
| `LLM_ESCALATE_TOKENS` | `0` | `0` = intent মিললে সবসময় quick answer। `N>0` = N+ শব্দের লম্বা প্রশ্ন LLM-এ যাবে |
| `TRUST_PROXY_HEADERS` | `true` | Cloud Run/Render-এর পেছনে `X-Forwarded-For` ব্যবহার করবে |
| `LOG_LEVEL` | `INFO` | |

## Tests
```bash
pip install -r requirements-dev.txt
pytest -q
```

## Chat history
Server বা browser কোথাও save হয় না। Frontend শুধু React state-এ রাখে এবং শেষ ৮টি message প্রতিটি request-এর সাথে পাঠায় (শুধু LLM step-এর জন্য)।

## Deploy (Firebase Hosting + Cloud Run)
```bash
cd backend
gcloud run deploy jabuai-backend --source . --region asia-south1 --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=xxxx
```
তারপর frontend `.env`-এ `VITE_CHATBOT_API_URL=<Cloud Run URL>` দিয়ে `npm run build && firebase deploy`।
Dockerfile এখন `main.py matcher.py answers.py intents.json knowledge.json` copy করে এবং non-root user-এ চলে।
