# TumiAI integration

This project now contains a React floating chat widget and a FastAPI/Gemini backend.

## Frontend

The widget is in `src/Chatbot.jsx` and `src/Css/Chatbot.css`. It is mounted globally from `src/index.jsx`, so it appears on every route.

Set the API URL in a Vite environment variable:

```bash
VITE_CHATBOT_API_URL=http://localhost:8000
```

For production, set it to your deployed backend URL, for example:

```bash
VITE_CHATBOT_API_URL=https://your-tumiai-backend.onrender.com
```

## Backend

From the `backend` directory:

```bash
pip install -r requirements.txt
```

Set `GEMINI_API_KEY` as an environment variable. Never put the Gemini API key in React/frontend code.

Run locally:

```bash
uvicorn main:app --reload --port 8000
```

Then open the portfolio and test the floating bot.

## Render

Create a Python Web Service using the `backend` directory as the root directory.

Build command:

```bash
pip install -r requirements.txt
```

Start command:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

Add these environment variables in Render:

- `GEMINI_API_KEY` = your Gemini API key
- `GEMINI_MODEL` = `gemini-2.5-flash`
- `FRONTEND_ORIGIN` = your deployed portfolio URL

After deployment, copy the Render backend URL into the frontend's `VITE_CHATBOT_API_URL` and rebuild the React site.
