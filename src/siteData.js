
import { projectCategories, getTotalProjects } from "./projectData.js";

/* ═══════════════════════════════════════════════════════════════
   SINGLE SOURCE OF TRUTH for the portfolio copy.
   Edit here and Home / About / Resume update together.
   ═══════════════════════════════════════════════════════════════ */

/* ── Personal Profile ────────────────────────────────────────── */

export const profile = {
  name: "Md. Abdullah Al Jaber",
  first: "Md. Abdullah",
  last: "Al Jaber",

  title: "AI / ML Engineer",

  roles: [
    "AI/ML Engineer",
    "Computer Vision Developer",
    "Generative AI & RAG Developer",
    "AI Automation Engineer",
    "Full-Stack Developer",
    "Embedded Systems Enthusiast",
  ],

  intro:
    "I am a Computer Science and Engineering graduate passionate about building intelligent systems and practical software solutions. My work spans Artificial Intelligence, Machine Learning, Computer Vision, Generative AI, RAG applications, workflow automation, and full-stack development. From developing AI-powered assistants and machine learning models to building automated workflows and full-stack applications, I enjoy turning ideas into real-world solutions. I am also interested in research, emerging technologies, and continuous learning.",

  email: "jaber15-4458@diu.edu.bd",
  emailAlt: "bs10000jaber@gmail.com",

  phone: "+880 1777848795",

  location: "Mirpur-2, Dhaka, Bangladesh",

  github: "https://github.com/jaber10000",

  linkedin:
    "https://www.linkedin.com/in/md-abdullah-al-jaber-699a1a266/",

  facebook:
    "https://www.facebook.com/share/1Xm4Wo3FYk/",
};


/* ── Professional Experience ─────────────────────────────────── */

export const experience = [
  {
    title: "Inbound Officer – Customer Care",
    org: "bKash Limited",
    period: "Nov 2025 – Present",

    text:
      "Handling customer queries and providing support for account and transaction-related issues. Using internal CRM tools to investigate and resolve customer problems, documenting interactions, escalating complex cases, and collaborating with the team to maintain service quality and improve customer experience.",
  },

  {
    title: "Student Data Scientist",
    org: "Daffodil International University",
    period: "Jan 2024 – Aug 2025",

    text:
      "Worked on academic research and development involving Artificial Intelligence and Machine Learning. Responsibilities and activities included data preprocessing, exploratory data analysis, model development, experimentation, and research-oriented problem solving.",
  },

  {
    title: "Dataset Contest Winner",
    org: "Daffodil International University",
    period: "Jan 2025 – Apr 2025",

    text:
      "Recognized for outstanding work in a university-level data science dataset competition.",

    award: true,
  },
];


/* ── Education ───────────────────────────────────────────────── */

export const education = [
  {
    title: "BSc in Computer Science & Engineering",
    org: "Daffodil International University",
    period: "2021 – 2025",
    result: "CGPA: 3.30 / 4.00",
  },

  {
    title: "Higher Secondary Certificate (HSC)",
    org: "Government BM College, Barisal",
    period: "2018 – 2019",
  },

  {
    title: "Secondary School Certificate (SSC)",
    org: "Jhalakathi N. S. Kamil Madrasah",
    period: "2016 – 2017",
  },
];


/* ── Achievements ───────────────────────────────────────────────
   Counts are computed from projectData so they never go stale.
   ─────────────────────────────────────────────────────────────── */

const allProjects = projectCategories.flatMap((c) => c.projects);

const researchCount =
  projectCategories.find((c) => c.id === "research")?.projects.length ?? 0;

const liveCount = allProjects.filter((p) => p.live).length;

export const achievements = [
  {
    icon: "trophy",
    title: "Dataset Contest Winner",
    meta: "Daffodil International University · 2025",

    text:
      "Recognized for outstanding data science work in a university-level dataset competition.",
  },

  {
    icon: "flask",
    title: `${researchCount} Research Contributions`,
    meta: "Federated Learning · Explainable AI · NLP",

    text:
      "Research contributions in privacy-preserving medical AI, federated learning, and Bangla fake-news detection.",
  },

  {
    icon: "rocket",
    title: `${liveCount} Live Demos Shipped`,
    meta: "Streamlit · Hugging Face · Vercel",

    text:
      "Developed and deployed AI assistants, OCR applications, and full-stack products.",
  },

  {
    icon: "chart",
    title: `${getTotalProjects()} Projects Built`,
    meta: "AI · Research · Web · Automation · Embedded Systems",

    text:
      "A growing portfolio of academic, research, and personal projects across machine learning, software engineering, workflow automation, and embedded systems.",
  },
];


/* ── Certifications ─────────────────────────────────────────────
   Add real certificates here and the section appears automatically:
   { title: "Certificate name", issuer: "Issuer", year: "2025", url: "https://…" }
   ─────────────────────────────────────────────────────────────── */

export const certifications = [];


/* ── Tech Stack, grouped by discipline ──────────────────────────
   `tools`  → chips shown in the panel
   `net`    → three leaves drawn in the neural diagram
   `test`   → decides which projects belong to the discipline
   ─────────────────────────────────────────────────────────────── */

const has = (p, list) =>
  (p.techs || []).some((t) => list.includes(t.toLowerCase()));

export const techCategories = [
  {
    id: "ml",
    label: "AI / ML",
    long: "AI & Machine Learning",
    icon: "brain",
    color: "var(--g1)",

    blurb:
      "Building intelligent models through classical machine learning, deep learning, natural language processing, and privacy-preserving federated learning.",

    tools: [
      "Python",
      "TensorFlow",
      "Keras",
      "PyTorch",
      "Scikit-Learn",
      "Pandas",
      "NumPy",
      "NLP",
      "BERT",
      "XGBoost",
      "Federated Learning",
      "LIME / SHAP",
    ],

    net: ["Python", "TensorFlow", "Scikit-Learn"],

    test: (p) =>
      has(p, [
        "tensorflow",
        "keras",
        "pytorch",
        "sklearn",
        "ml",
        "nlp",
        "bert",
        "xlm-roberta",
        "banglabert",
        "bilstm",
        "federated learning",
        "fedavg",
        "ann",
        "lime",
        "shap",
        "deep learning",
      ]),
  },

  {
    id: "cv",
    label: "Computer Vision",
    long: "Computer Vision",
    icon: "eye",
    color: "var(--g2)",

    blurb:
      "Developing computer vision solutions for image classification, object and image analysis, OCR, and medical image segmentation.",

    tools: [
      "OpenCV",
      "Tesseract OCR",
      "U-Net",
      "ResNet18",
      "VGG16",
      "CNNs",
      "Transformer U-Net",
      "Medical Imaging",
    ],

    net: ["OpenCV", "U-Net", "ResNet18"],

    test: (p) =>
      has(p, ["opencv", "u-net", "resnet18", "vgg16"]) ||
      /image|ocr|cat & dog|tumor|leukemia/i.test(p.title),
  },

  {
    id: "genai",
    label: "Generative AI",
    long: "Generative AI & RAG Development",
    icon: "spark",
    color: "var(--g3)",

    blurb:
      "Building LLM-powered applications and retrieval-augmented assistants that provide context-aware answers using documents and external knowledge sources.",

    tools: [
      "LangChain",
      "RAG",
      "FAISS",
      "Gemini API",
      "Sentence Transformers",
      "Hugging Face",
      "LLMs",
      "Streamlit",
    ],

    net: ["LangChain", "RAG", "FAISS"],

    test: (p) =>
      has(p, [
        "langchain",
        "faiss",
        "rag",
        "llm",
        "gemini api",
        "sentence transformers",
        "hugging face",
      ]),
  },

  {
    id: "automation",
    label: "Automation",
    long: "AI & Workflow Automation",
    icon: "cogs",
    color: "var(--g5)",

    blurb:
      "Designing automated, event-driven workflows for data collection, validation, conditional routing, notifications, and business process automation.",

    tools: [
      "n8n",
      "Webhooks",
      "Google Sheets",
      "Gmail",
      "Telegram",
      "JSON",
      "Conditional Routing",
      "Workflow Automation",
    ],

    net: ["n8n", "Webhooks", "Telegram"],

    test: (p) => has(p, ["n8n", "webhooks"]),
  },

  {
    id: "fullstack",
    label: "Full Stack",
    long: "Full-Stack Development",
    icon: "layers",
    color: "var(--g4)",

    blurb:
      "Developing full-stack web applications with responsive user interfaces, REST APIs, authentication systems, and relational databases.",

    tools: [
      "Python",
      "JavaScript",
      "React",
      "TypeScript",
      "Next.js",
      "FastAPI",
      "Flask",
      "PostgreSQL",
      "SQLite",
      "JWT",
      "SQLAlchemy",
      "Alembic",
      "HTML / CSS",
      "Bootstrap",
      "Git",
      "GitHub",
    ],

    net: ["React", "FastAPI", "PostgreSQL"],

    test: (p) =>
      has(p, [
        "react",
        "typescript",
        "next.js",
        "fastapi",
        "flask",
        "html",
        "javascript",
        "jwt",
        "postgresql",
        "sqlalchemy",
      ]),
  },

  {
    id: "embedded",
    label: "Embedded Systems",
    long: "Embedded Systems & Microcontroller Programming",
    icon: "cpu",
    color: "var(--g6)",

    blurb:
      "Academic experience with embedded systems, Intel 8086 programming, Arduino, microcontrollers, and automated hardware-based projects.",

    tools: [
      "Intel 8086",
      "Arduino",
      "Microcontrollers",
      "Embedded C",
      "LED Traffic Light System",
      "Automated Fire Extinguisher Car",
    ],

    net: ["Arduino", "Intel 8086", "Microcontrollers"],

    test: (p) =>
      has(p, [
        "arduino",
        "microcontroller",
        "embedded c",
        "8086",
      ]) ||
      /traffic light|fire extinguisher/i.test(p.title),
  },
];


/** Projects that belong to a tech category, with their parent category info. */

export const projectsForTech = (cat) =>
  projectCategories.flatMap((c) =>
    c.projects
      .filter(cat.test)
      .map((p) => ({
        ...p,
        categoryId: c.id,
        categoryTitle: c.title,
        color: c.color,
      }))
  );


/** Hand-picked projects for the Home page (falls back gracefully if one is removed). */

export const getFeatured = () => {
  const pick = (catId, idx) => {
    const c = projectCategories.find((x) => x.id === catId);
    const p = c?.projects[idx];

    return p
      ? {
          ...p,
          categoryId: c.id,
          categoryTitle: c.title,
          color: c.color,
        }
      : null;
  };

  return [
    pick("ml", 0),
    pick("research", 1),
    pick("full stack", 1),
  ].filter(Boolean);
};
