import { projectCategories, getTotalProjects } from "./projectData.js";

/* ═══════════════════════════════════════════════════════════════
   SINGLE SOURCE OF TRUTH for the portfolio copy.
   Edit here and Home / About / Resume update together.
   ═══════════════════════════════════════════════════════════════ */

export const profile = {
  name: "Md. Abdullah Al Jaber",
  first: "Md. Abdullah",
  last: "Al Jaber",
  title: "AI / ML Engineer",
  roles: ["AI/ML Engineer", "Computer Vision Developer", "Generative AI & RAG Developer", "Full-Stack Developer"],
  intro:
    "I build intelligent systems end to end — from federated-learning research and RAG assistants to full-stack products people actually use.",
  email: "bs10000jaber@gmail.com",
  emailAlt: "jaber15-4458@diu.edu.bd",
  phone: "+880 1647271765",
  location: "Mirpur-2, Dhaka, Bangladesh",
  github: "https://github.com/jaber10000",
  linkedin: "https://www.linkedin.com/in/md-abdullah-al-jaber-699a1a266/",
  facebook: "https://www.facebook.com/share/1Xm4Wo3FYk/",
};

export const experience = [
  {
    title: "Front End Developer",
    org: "IT Company",
    period: "Aug 2025 – Present",
    text: "Building responsive React applications and user interfaces.",
  },
  {
    title: "Student Data Scientist",
    org: "Daffodil International University",
    period: "Jan 2024 – Aug 2025",
    text: "Research and development in ML/AI models, data preprocessing, and analysis.",
  },
  {
    title: "Dataset Contest Winner",
    org: "Daffodil International University",
    period: "Jan 2025 – Apr 2025",
    text: "Won dataset competition for outstanding data science work.",
    award: true,
  },
];

export const education = [
  { title: "BSc in CSE", org: "Daffodil International University", period: "2021 – 2025" },
  { title: "HSC", org: "Gov't BM College, Barisal", period: "2018 – 2019" },
  { title: "SSC", org: "Jhalakathi N S Kamil Madrasah", period: "2016 – 2017" },
];

/* ── Achievements (counts are computed from projectData so they never go stale) ── */
const allProjects = projectCategories.flatMap((c) => c.projects);
const researchCount = projectCategories.find((c) => c.id === "research")?.projects.length ?? 0;
const liveCount = allProjects.filter((p) => p.live).length;

export const achievements = [
  {
    icon: "trophy",
    title: "Dataset Contest Winner",
    meta: "Daffodil International University · 2025",
    text: "Won the dataset competition for outstanding data science work.",
  },
  {
    icon: "flask",
    title: `${researchCount} Research Contributions`,
    meta: "Federated Learning · Explainable AI · NLP",
    text: "Contributed to papers on privacy-preserving medical AI and Bangla fake-news detection.",
  },
  {
    icon: "rocket",
    title: `${liveCount} Live Demos Shipped`,
    meta: "Streamlit · Hugging Face · Vercel",
    text: "RAG assistants, OCR and full-stack products deployed and open for anyone to try.",
  },
  {
    icon: "chart",
    title: `${getTotalProjects()} Projects Built`,
    meta: "AI · Research · Web · Automation",
    text: "A growing body of work across machine learning, web engineering and workflow automation.",
  },
];

/* ── Certifications ─────────────────────────────────────────────
   Add real certificates here and the section appears automatically:
   { title: "Certificate name", issuer: "Issuer", year: "2025", url: "https://…" }
   ─────────────────────────────────────────────────────────────── */
export const certifications = [];

/* ── Tech stack, grouped by discipline ──────────────────────────
   `tools`  → chips shown in the panel
   `net`    → three leaves drawn in the neural diagram
   `test`   → decides which of your projects belong to the discipline
   ─────────────────────────────────────────────────────────────── */
const has = (p, list) => (p.techs || []).some((t) => list.includes(t.toLowerCase()));

export const techCategories = [
  {
    id: "ml",
    label: "AI / ML",
    long: "AI & Machine Learning",
    icon: "brain",
    color: "var(--g1)",
    blurb: "Models that learn from messy data — classical ML, deep learning, NLP and privacy-preserving federated training.",
    tools: ["Python", "TensorFlow", "Scikit-Learn", "Pandas", "NumPy", "NLP", "BERT", "XGBoost", "Federated Learning", "LIME / SHAP"],
    net: ["Python", "TensorFlow", "Scikit-Learn"],
    test: (p) => has(p, ["tensorflow", "sklearn", "ml", "nlp", "bert", "xlm-roberta", "banglabert", "bilstm", "federated learning", "fedavg", "ann", "lime", "shap", "deep learning"]),
  },
  {
    id: "cv",
    label: "Computer Vision",
    long: "Computer Vision",
    icon: "eye",
    color: "var(--g2)",
    blurb: "Teaching machines to see — OCR, image classification and medical image segmentation.",
    tools: ["OpenCV", "Tesseract OCR", "U-Net", "ResNet18", "VGG16", "CNNs", "Transformer U-Net", "Medical Imaging"],
    net: ["OpenCV", "U-Net", "ResNet18"],
    test: (p) => has(p, ["opencv", "u-net", "resnet18", "vgg16"]) || /image|ocr|cat & dog|tumor|leukemia/i.test(p.title),
  },
  {
    id: "genai",
    label: "Generative AI",
    long: "Generative AI",
    icon: "spark",
    color: "var(--g3)",
    blurb: "Retrieval-augmented assistants that ground LLM answers in real documents — in English and Bangla.",
    tools: ["LangChain", "RAG", "FAISS", "Gemini API", "Sentence Transformers", "LLMs", "Streamlit"],
    net: ["LangChain", "RAG", "FAISS"],
    test: (p) => has(p, ["langchain", "faiss", "rag", "llm", "gemini api", "sentence transformers"]),
  },
  {
    id: "automation",
    label: "Automation",
    long: "Workflow Automation",
    icon: "cogs",
    color: "var(--g5)",
    blurb: "Event-driven workflows that validate, route and notify — so no inquiry waits for a human.",
    tools: ["n8n", "Webhooks", "Google Sheets", "Gmail", "Telegram", "JSON", "Conditional Routing"],
    net: ["n8n", "Webhooks", "Telegram"],
    test: (p) => has(p, ["n8n", "webhooks"]),
  },
  {
    id: "fullstack",
    label: "Full Stack",
    long: "Full-Stack Development",
    icon: "layers",
    color: "var(--g4)",
    blurb: "Polished interfaces on top of secure APIs — React front ends, FastAPI back ends, real databases.",
    tools: ["React", "TypeScript", "FastAPI", "Django", "PostgreSQL", "SQLite", "MySQL", "JWT", "SQLAlchemy", "Alembic", "Flutter", "Firebase", "HTML / CSS / JS", "PHP"],
    net: ["React", "FastAPI", "PostgreSQL"],
    test: (p) => has(p, ["react", "fastapi", "html", "php", "flutter", "jwt", "postgresql"]),
  },
];

/** Projects that belong to a tech category, with their parent category info. */
export const projectsForTech = (cat) =>
  projectCategories.flatMap((c) =>
    c.projects.filter(cat.test).map((p) => ({ ...p, categoryId: c.id, categoryTitle: c.title, color: c.color }))
  );

/** Hand-picked projects for the Home page (falls back gracefully if one is removed). */
export const getFeatured = () => {
  const pick = (catId, idx) => {
    const c = projectCategories.find((x) => x.id === catId);
    const p = c?.projects[idx];
    return p ? { ...p, categoryId: c.id, categoryTitle: c.title, color: c.color } : null;
  };
  return [pick("ml", 0), pick("research", 1), pick("full stack", 1)].filter(Boolean);
};
