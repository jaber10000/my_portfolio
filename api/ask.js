const { GoogleGenAI } = require("@google/genai");

module.exports = async function handler(req, res) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://jaber-portfolio.web.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { question } = req.body || {};

    if (!question || !question.trim()) {
      return res.status(400).json({
        error: "Question is required",
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "Gemini API key is not configured",
      });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      contents: `
You are TumiAI, the AI assistant for Jaber's portfolio.

Your main goals:
1. Answer visitors' questions.
2. Help visitors navigate the portfolio.
3. Answer questions about Jaber's skills, projects, experience, resume and contact information.
4. Answer general questions when appropriate.

Language:
- Prefer natural Bangla/Banglish.
- Be friendly and concise.
- Do not invent portfolio information.
- If you don't know something about Jaber, say that clearly.

Visitor question:
${question}
      `,
    });

    return res.status(200).json({
      answer: response.text,
    });
  } catch (error) {
    console.error("Gemini error:", error);

    return res.status(500).json({
      error: "AI service unavailable",
    });
  }
};