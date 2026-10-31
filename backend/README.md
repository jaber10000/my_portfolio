# TumiAI Backend (FastAPI)

```
React Portfolio → TumiAI Chatbot → FastAPI (/ask) → knowledge.json → Gemini / other LLM → Answer
```

`knowledge.json` আলাদা করে লেখা লাগে না — এটা `siteData.js` + `projectData.js` থেকে auto-generate হয়।

## Setup
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env            # GEMINI_API_KEY বসাও (https://aistudio.google.com/apikey)
node build_knowledge.mjs ../src # siteData.js / projectData.js পড়ে knowledge.json বানায়
uvicorn main:app --reload --port 8000
```
Frontend `.env`: `VITE_CHATBOT_API_URL=http://localhost:8000`

## Portfolio data বদলালে
`siteData.js` বা `projectData.js` edit করার পর শুধু `node build_knowledge.mjs ../src` চালিয়ে backend restart দাও।

## Chat history
Server বা browser কোথাও save হয় না। Frontend শুধু React state-এ রাখে এবং শেষ ৮টি message প্রতিটি request-এর সাথে পাঠায় — reload দিলেই সব মুছে যায়।

## অন্য LLM
`.env`-এ `LLM_PROVIDER=openai` + `OPENAI_BASE_URL` / `OPENAI_API_KEY` / `OPENAI_MODEL` (Groq, OpenRouter ইত্যাদি চলবে)।

## Deploy
`ALLOWED_ORIGINS`-এ তোমার deployed site-এর domain দাও, আর frontend-এ `VITE_CHATBOT_API_URL` সেই backend URL-এ সেট করো।
API key না থাকলে বা LLM fail করলে backend নিজে থেকে simple fallback answer দেয়।

## Firebase Hosting (jaber-portfolio.web.app) + Cloud Run
Firebase Hosting শুধু static site চালায়, তাই FastAPI আলাদা deploy করতে হবে (Cloud Run / Render / Railway)।
```bash
cd backend
gcloud run deploy tumiai-backend --source . --region asia-south1 --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=xxxx
```
তারপর frontend-এর `.env`-এ `VITE_CHATBOT_API_URL=<Cloud Run URL>` দিয়ে `npm run build && firebase deploy`।
`web.app` ও `firebaseapp.com` আগে থেকেই `ALLOWED_ORIGINS`-এ আছে।
