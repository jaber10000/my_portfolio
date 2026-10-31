import Speech_Emotion from "./assets/AI/Speech_Emotion.jpg";
import Nlp_emotion from "./assets/AI/EMOTION_IN_TEXT.png";
import AI_Resume_Matcher from "./assets/AI/AI_Resume_Matcher.gif";
import BanglaNewsQABot from "./assets/AI/BanglaNewsQABot.gif";
import PDF_Assistant_Image from "./assets/AI/UniversityPDFAssistant.GIF";

import Classification from "./assets/AI/Classification.mp4";
import Speech_Emotion_pdf from "./pdf/Toronto_Emotion,_Deep_learning-compressed.pdf";
import Nlp_emotion_pdf from "./pdf/NLP_emotion_detection_1 with kaggle data.ipynb - Colab.pdf";
import classification_pdf from "./pdf/Classification for Contest.ipynb - Colab.pdf";
import AiImage from "./assets/AiImage.png";
import ReactImg from "./assets/ReactImg.png";
import IMDB_Review from "./pdf/DataS_ML_Task.ipynb - Colab.pdf";
import IMDB_image from "./assets/AI/IMDB_review_image.png";
import OCR_Image_Text from "./assets/AI/image-to-text-extractor.mp4";
import OCR_Image_Text_pdf from "./pdf/optical-character-recognition.pdf";
import Cat_Dog_Classification from "./assets/AI/cat_or_dog.mp4";
import Cat_Dog_Classification_pdf from "./pdf/cat_or_dog_classification_to__image.pdf";
import Student_Management_System from "./assets/WebPage/Student_Management_System.mp4";


import Shopping_Mart from "./assets/WebPage/Shopping_Mart.mp4";
import Sunrise_Hotel from "./assets/WebPage/Sunrise_Hotel.mp4";

import Flappy_Bird from "./assets/WebPage/Flappy_Bird.png";
import Basic_Python_Projects from "./assets/Extra_projects/Basic_Python_Projects.mp4";

import role_based_contact_automation from "./assets/Extra_projects/Role-Based Contact Automation  n8n.png";
import enterprise_contact_automation from "./assets/Extra_projects/Enterprise Contact Automation  n8n.webp";

import Extra_Work from "./assets/Extra_Work.png";
import Basic_Food_Delivery_App from "./assets/Extra_projects/Basic_Food_Delivery_App.mp4";
import student_learning_path from "./assets/AI/Student_Learning_Path_img.mp4";

import Paper_Brain from "./assets/Research/brain_tumor_notebook.pdf";
import Paper_Hybrid from "./assets/Research/bangla_hybrid_paper.pdf";
import Paper_Multi from "./assets/Research/bengali_multitask_paper.pdf";
import Paper_Colon from "./assets/Research/colorectal_Cancer.pdf";
import Paper_Pancreatic from "./assets/Research/Federated Pancreatic Malignancy Detection.pdf";
import Paper_Leukemia from "./assets/Research/Leukemia Stage Classification.pdf";

import Notebook_Brain from "./assets/Research/brain_tumor_notebook.ipynb?url";
import Notebook_Hybrid from "./assets/Research/bangla_hybrid_paper.ipynb?url";
import Notebook_Multi from "./assets/Research/bengali_multitask_paper.ipynb?url";
import Notebook_Colon from "./assets/Research/colorectal_paper.ipynb?url";
import Notebook_Pancreatic from "./assets/Research/Federated Pancreatic Malignancy Detection.ipynb?url";
import Notebook_Leukemia from "./assets/Research/Leukemia Stage Classification.ipynb?url";

import Research_Pancreatic from "./assets/Research/pancreatic_fl.svg";
import Research_Leukemia from "./assets/Research/leukemia_ensemble.svg";
import Research_Colon from "./assets/Research/colorectal_fl.svg";

import Research_Cover from "./assets/Research/research_cover.jpg";
import Research_FL from "./assets/Research/federated_brain.svg";
import Research_Fake1 from "./assets/Research/fake_news_hybrid.svg";
import Research_Fake2 from "./assets/Research/fake_news_multitask.svg";


import fullstack from "../src/assets/fullstack/fullstack.png";
import task_manager from "../src/assets/fullstack/task_manager.gif";
import ExpenseFlow_Image from "../src/assets/fullstack/expenseflow.gif";

// Single source of truth for all projects.
// Add a new project here (inside a category) and the Projects page
// AND the Home page project counter update automatically.
export const projectCategories = [
  
  {
    id: "ml",
    title: "Machine Learning / AI",
    image: AiImage,
    icon: "🤖",
    tag: "ML · AI · Deep Learning",
    color: "#1DCD9F",
    projects: [
      {
        id: 10,
        title: "University PDF Assistant",
        description:
          "AI-powered PDF assistant for document understanding and intelligent question answering.",
        image: PDF_Assistant_Image, // তোমার screenshot/image
        github: "https://github.com/jaber10000/UniversityPDFAssistant",
        live: "https://universitypdfassistant-3c3txq6z4cdmpxl3uzuws8.streamlit.app/",
        techs: [
          "Python",
          "Streamlit",
          "LangChain",
          "FAISS",
          "Gemini API",
          "RAG"
        ],
        details:
          "Developed an AI-powered PDF Assistant that enables users to upload academic and university documents and receive context-aware answers. Implemented Retrieval-Augmented Generation (RAG) using LangChain and FAISS for semantic document retrieval, while leveraging the Gemini API to generate accurate responses through an interactive Streamlit interface.",
      },
      {
        id: 9,
        title: "Bangla News Q&A Bot (RAG)",
        description:
          "Retrieval-Augmented Generation system for answering questions from Bangla news articles.",
        image: BanglaNewsQABot,
        github: "https://github.com/jaber10000/BanglaNewsQABot",
        live:"https://banglanewsappbot-9om7r2ssgatdpacunkenyz.streamlit.app/",
        techs: [
          "Python",
          "LangChain",
          "FAISS",
          "RAG",
          "LLM",
          "NLP"
        ],
        details:
          "Built a Retrieval-Augmented Generation (RAG) system that retrieves relevant context from Bangla news articles and generates accurate answers to user queries. Implemented document chunking, vector embeddings, semantic search with FAISS, and LangChain-based retrieval pipelines to improve response quality and relevance.",
      },
      {
        id: 8,
        title: "AI Resume Matcher",
        description:
          "AI-powered ATS resume analyzer with job matching and career recommendations.",
        image: AI_Resume_Matcher,
        github: "https://github.com/jaber10000/ai_resume_matcher",
        live: "https://airesumematcher-rh3snztvwwsu33acjqdnwe.streamlit.app/",
        techs: [
          "Python",
          "Streamlit",
          "LangChain",
          "Sentence Transformers",
          "NLP",
          "AI"
        ],
        details:
          "Built an AI-powered ATS Resume Analyzer that compares resumes with job descriptions, calculates matching scores, identifies skill gaps, and generates AI-driven career recommendations. Implemented semantic similarity analysis using Sentence Transformers and developed an interactive dashboard with Streamlit.",
      },
      {
        id: 1, title: "Sentiment Analysis of Movie Reviews",
        description: "Automates IMDB review classification using ML & DL.",
        image: IMDB_image,
        live: "https://huggingface.co/spaces/jaber10101/DataSynthis_ML_JobTask",
        pdf: IMDB_Review,
        techs: ["Python", "TensorFlow", "Sklearn", "ML"],
        details: "Automatically classifies IMDB movie reviews into positive or negative categories using machine learning and deep learning techniques. Helps gain actionable insights quickly.",
      },
      {
        id: 2, title: "OCR-Based Image-to-Text Extraction",
        description: "Extract text from scanned images using OCR and OpenCV.",
        image: OCR_Image_Text,
        live: "https://huggingface.co/spaces/jaber10101/ocr-text-extractor",
        pdf: OCR_Image_Text_pdf,
        techs: ["Python", "OpenCV"],
        details: "OCR system extracts text from images using Tesseract and OpenCV with preprocessing to enhance accuracy.",
      },
      {
        id: 3, title: "AI-Enhanced Student Learning Dashboard",
        description: "An AI-powered dashboard built with FastAPI that analyzes student performance data.",
        image: student_learning_path,
        github: "https://github.com/jaber10000/AI-Enhanced-Student-Learning-Dashboard",
        techs: ["FastAPI", "Python", "ML"],
        details: "Backend Framework: FastAPI (Python). Key Features: Automatically analyzes student scores, identifies weak areas, and suggests improvements via RESTful API.",
      },
      {
        id: 4, title: "Speech Emotion Recognition",
        description: "Classify emotions in speech using MFCC & Mel Spectrogram.",
        image: Speech_Emotion,
        pdf: Speech_Emotion_pdf,
        techs: ["Python", "TensorFlow"],
        details: "Trained on the TESS dataset to detect emotions from speech using deep learning.",
      },
      {
        id: 5, title: "Cat & Dog Image Classification",
        description: "Neural network to classify cat and dog images.",
        image: Cat_Dog_Classification,
        pdf: Cat_Dog_Classification_pdf,
        techs: ["Python", "TensorFlow", "ML"],
        details: "Deep learning model classifies cat/dog images from Kaggle dataset.",
      },
      {
        id: 6, title: "Emotion Detection using NLP",
        description: "Classify text emotions using multiple ML models.",
        image: Nlp_emotion,
        pdf: Nlp_emotion_pdf,
        techs: ["Python", "NLP", "Sklearn"],
        details: "Built text emotion classifier using TF-IDF and Logistic Regression, Random Forest, XGBoost.",
      },
      {
        id: 7, title: "Reusable Classification Template",
        description: "Flexible classification framework for any dataset.",
        image: Classification,
        pdf: classification_pdf,
        techs: ["Python", "Sklearn", "ML"],
        details: "Reusable project template for experimentation and classification tasks.",
      },
    ],
  },

  {
    id: "research",
    title: "Research",
    image: Research_Cover,
    icon: "🔬",
    tag: "Federated Learning · Explainable AI · NLP",
    color: "#A78BFA",
    projects: [
      {
        id: 1,
        title: "Privacy-Preserving Explainable Federated Transfer Learning for Brain Tumor Segmentation",
        description: "Federated MRI brain tumor segmentation with CNN-based and Transformer-based U-Net.",
        image: Research_FL,
        paper: Paper_Brain,
        notebook: Notebook_Brain,
        techs: ["Python", "Federated Learning", "U-Net", "Transformer"],
        details: "Contributed to a privacy-preserving federated learning framework for MRI-based brain tumor segmentation, working with CNN-based U-Net and Transformer-based U-Net architectures across centralized, federated, IID, and Non-IID settings. Evaluated model performance using Dice, IoU, Precision, Recall, and F1-score.",
      },
      {
        id: 2,
        title: "Explainable Hybrid Deep Learning Framework for Bangla Fake News Detection",
        description: "BERT & XLM-RoBERTa embeddings with classical ML and LIME explanations.",
        image: Research_Fake1,
        paper: Paper_Hybrid,
        notebook: Notebook_Hybrid,
        techs: ["Python", "NLP", "BERT", "XLM-RoBERTa", "LIME"],
        details: "Contributed to Bangla fake news detection using BERT and XLM-RoBERTa-based language representations combined with conventional machine learning approaches. Worked with hybrid modeling and explainability techniques, including LIME, to improve model interpretation and analysis.",
      },
      {
        id: 3,
        title: "Category-Guided Intelligence: Explainable Multi-Task Framework for Bengali Fake News Detection",
        description: "BanglaBERT + BiLSTM + attention with category-aware multi-task learning.",
        image: Research_Fake2,
        paper: Paper_Multi,
        notebook: Notebook_Multi,
        techs: ["Python", "NLP", "BanglaBERT", "BiLSTM", "LIME", "SHAP"],
        details: "Contributed to an explainable multi-task framework for Bengali fake news detection by combining BanglaBERT, BiLSTM, attention mechanisms, and category-aware learning. Worked with LIME, SHAP, and attention-based analysis to interpret model predictions and evaluate model behavior.",
      },
      {
        id: 4,
        title: "Privacy-Preserving Federated Learning for Colorectal Cancer Detection",
        description: "FedAvg-based deep learning on distributed healthcare data.",
        image: Research_Colon,
        paper: Paper_Colon,
        notebook: Notebook_Colon,
        techs: ["Python", "TensorFlow", "Federated Learning", "FedAvg"],
        details: "Developed a privacy-preserving federated learning framework for colorectal cancer detection using distributed healthcare data. Implemented deep learning-based federated training with the FedAvg algorithm and evaluated model performance under distributed learning settings.",
      },
      {
        id: 5,
        title: "Privacy-Preserving Federated Learning for Pancreatic Malignancy Detection",
        description: "Federated learning framework for pancreatic cancer detection using SEER clinical data.",
        image: Research_Pancreatic,
        paper: Paper_Pancreatic,
        notebook: Notebook_Pancreatic,
        techs: ["Python", "Federated Learning", "ANN", "FedAvg"],
        details:
          "Contributed to a federated learning framework for pancreatic cancer detection using SEER clinical data, implementing ANN-based models and FedAvg aggregation in distributed healthcare settings.",
      },
      {
        id: 6,
        title: "Ensemble Deep Learning for Leukemia Stage Classification",
        description: "Leukemia stage classification using ResNet18 and VGG16 ensemble models.",
        image: Research_Leukemia,
        paper: Paper_Leukemia,
        notebook: Notebook_Leukemia,
        techs: ["Python", "Deep Learning", "ResNet18", "VGG16"],
        details:
          "Contributed to leukemia stage classification using an ensemble of ResNet18 and VGG16 models, with explainable AI techniques for model interpretation.",
      },
    ],
  },

  {
  id: "full stack",
  title: "Full Stack / Web Development",
  image: fullstack,
  icon: "🧩",
  tag: "React · FastAPI · Python · Database",
  color: "#61DAFB",
  projects: [
    {
      id: 1,
      title: "Task Manager Web Application",
      description:
        "Full-stack task management platform with authentication, CRUD operations, and productivity tracking.",
      image: task_manager,
      live: "https://task-manager-kappa-eight-21.vercel.app/",
      techs: [
        "React",
        "FastAPI",
        "Python",
        "PostgreSQL",
        "SQLite",
        "JWT",
      ],
      details:
        "Developed a full-stack task management application featuring JWT authentication, task CRUD operations, recurring task management, calendar view, and productivity insights. Built the frontend with React and the backend using FastAPI, with support for PostgreSQL and SQLite databases.",
    },
    {
      id: 2,
      title: "ExpenseFlow – Personal Finance Management Web Application",
      description:
        "Full-stack finance management platform with expense tracking, analytics, and multi-currency support.",
      image: ExpenseFlow_Image, // project screenshot/video
      github: "https://github.com/jaber10000/Expenseflow",
      live: "https://expenseflow-beryl.vercel.app/",
      techs: [
        "React",
        "TypeScript",
        "FastAPI",
        "Python",
        "PostgreSQL",
        "SQLAlchemy",
        "Alembic",
        "JWT"
      ],
      details:
        "Developed a full-stack personal finance management application featuring JWT-based authentication, income and expense tracking, transaction management, dashboard analytics, savings insights, and multi-currency support. Integrated a React frontend with a FastAPI backend and PostgreSQL database to provide secure API communication and real-time financial summaries. Deployed the frontend on Vercel and backend services on Render.",
    },

  ],
},
  {
    id: "react",
    title: "React / Frontend",
    image: ReactImg,
    icon: "⚛️",
    tag: "React · HTML · CSS · JS",
    color: "#61DAFB",
    projects: [
      {
        id: 1, title: "Student Management System",
        description: "React-based system with dashboards for admin, teacher, and student roles.",
        image: Student_Management_System,
        github: "https://github.com/jaber10000/student-management",
        techs: ["React", "CSS", "JavaScript"],
        details: "Developed a responsive and user-friendly frontend system using React for managing student information. Includes distinct profile designs for admin, teacher, and student roles.",
      },
      {
        id: 2, title: "Sunrise Hotel Website",
        description: "Hotel booking and information website.",
        image: Sunrise_Hotel,
        github: "https://github.com/jaber10000/jaber_sunrise_hotel",
        techs: ["React", "HTML", "CSS"],
        details: "Built a responsive hotel website featuring booking options, room details, and clean navigation using HTML, CSS, and React.",
      },
      {
        id: 3, title: "E-Commerce Shopping Mart",
        description: "CRUD-based shopping site with cart and checkout.",
        image: Shopping_Mart,
        github: "https://github.com/jaber10000/web_eng_project",
        techs: ["HTML", "CSS", "JavaScript", "PHP"],
        details: "Dynamic shopping website using HTML, CSS, JavaScript, and PHP with CRUD functionalities.",
      },
      {
        id: 4, title: "Flappy Bird Game",
        description: "Fun, interactive Flappy Bird-style game.",
        image: Flappy_Bird,
        github: "https://github.com/jaber10000/Flappy_Bird",
        live: "https://jaber10000.github.io/Flappy_Bird/",
        techs: ["HTML", "CSS", "JavaScript"],
        details: "Smooth game built with HTML, CSS, and JavaScript. Press spacebar to keep the bird flying and avoid obstacles.",
      },
    ],
  },
  {
    id: "python",
    title: "Other Projects",
    image: Extra_Work,
    icon: "🐍",
    tag: "Python · Flutter · Mobile",
    color: "#FFD43B",
    projects: [
      {
        id: 1, title: "Basic Python Projects (4 Projects)",
        description: "Banking System, Quiz Game, Rock Paper Scissors, Tic-Tac-Toe.",
        image: Basic_Python_Projects,
        github: "https://github.com/jaber10000/Basic-Python-Project",
        techs: ["Python"],
        details: "Several console-based Python applications to strengthen programming fundamentals. Includes Banking System, Quiz Game, Rock Paper Scissors, and Tic-Tac-Toe.",
      },
      {
        id: 2, title: "Basic Food Delivery App (Flutter)",
        description: "Food delivery app with Firebase authentication.",
        image: Basic_Food_Delivery_App,
        github: "https://github.com/jaber10000/Basic_food_delivery_app",
        techs: ["Flutter", "Dart", "Firebase"],
        details: "Food delivery application using Flutter (Dart) featuring Firebase Authentication for secure login. Clean and responsive UI with cart and checkout functionality.",
      },
      {
        id: 3,
        title: "Role-Based Contact Automation | n8n",
        description:
          "Automated contact management with category-based routing, notifications, and auto-replies.",
        image: role_based_contact_automation, 
        github: "https://github.com/jaber10000/Role-Based-Contact-Automation",
        techs: ["n8n", "Webhooks", "Google Sheets", "Gmail", "Telegram"],
        details:
          "Built an automated contact management workflow using n8n. Implemented category-based routing, Telegram notifications, Google Sheets logging, and automated Gmail responses to streamline communication and inquiry handling.",
      },
      {
        id: 4,
        title: "Enterprise Contact Automation | n8n",
        description:
          "Enterprise-grade contact automation with validation, routing, and notifications.",
        image: enterprise_contact_automation, 
        github: "https://github.com/jaber10000/Enterprise-Contact-Automation-System",
        techs: ["n8n", "Webhooks", "JSON", "Google Sheets", "Gmail", "Telegram"],
        details:
          "Designed and implemented an enterprise contact automation system using n8n. Features include conditional validation, inquiry routing, automated data logging, Gmail notifications, Telegram alerts, and workflow-based communication management.",
      },
    ],
  },
];

export const getTotalProjects = () =>
  projectCategories.reduce((sum, c) => sum + c.projects.length, 0);

export const getTotalTechs = () =>
  new Set(projectCategories.flatMap((c) => c.projects.flatMap((p) => p.techs || []))).size;
