import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Css/Project.css";
import Speech_Emotion from "./assets/AI/Speech_Emotion.jpg";
import Nlp_emotion from "./assets/AI/EMOTION_IN_TEXT.png";
import Classification from "./assets/AI/Classification.gif";
import Speech_Emotion_pdf from "./pdf/Toronto_Emotion,_Deep_learning-compressed.pdf";
import Nlp_emotion_pdf from "./pdf/NLP_emotion_detection_1 with kaggle data.ipynb - Colab.pdf";
import classification_pdf from "./pdf/Classification for Contest.ipynb - Colab.pdf";
import AiImage from "./assets/AiImage.png";
import ReactImg from "./assets/ReactImg.png";
import IMDB_Review from "./pdf/DataS_ML_Task.ipynb - Colab.pdf";
import IMDB_image from "./assets/AI/IMDB_review_image.png";
import OCR_Image_Text from "./assets/AI/image-to-text-extractor.gif";
import OCR_Image_Text_pdf from "./pdf/optical-character-recognition.pdf";
import Cat_Dog_Classification from "./assets/AI/cat_or_dog.gif";
import Cat_Dog_Classification_pdf from "./pdf/cat_or_dog_classification_to__image.pdf";
import Student_Management_System from "./assets/WebPage/Student_Management_System.gif";
import Shopping_Mart from "./assets/WebPage/Shopping_Mart.gif";
import Sunrise_Hotel from "./assets/WebPage/Sunrise_Hotel.gif";
import Flappy_Bird from "./assets/WebPage/Flappy_Bird.png";
import Basic_Python_Projects from "./assets/Extra_Projects/Basic_Python_Projects.gif";
import Extra_Work from "./assets/Extra_Work.png";
import Basic_Food_Delivery_App from "./assets/Extra_projects/Basic_Food_Delivery_App.gif";
import student_learning_path from "./assets/AI/Student_Learning_Path_img.gif";

// Tech tag → icon mapping (using emoji + devicons CDN for brand icons)
const TECH_ICONS = {
  "Python":      { svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  "TensorFlow":  { svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  "FastAPI":     { svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  "React":       { svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  "HTML":        { svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  "CSS":         { svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  "JavaScript":  { svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  "PHP":         { svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  "Flutter":     { svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  "Firebase":    { svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  "Dart":        { svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
  "ML":          { emoji: "🤖" },
  "NLP":         { emoji: "💬" },
  "OpenCV":      { svg: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
  "Sklearn":     { emoji: "📊" },
};

function TechBadge({ tech }) {
  const info = TECH_ICONS[tech] || { emoji: "⚙️" };
  return (
    <span className="tech-badge">
      {info.svg
        ? <img src={info.svg} alt={tech} className="tech-badge-icon" />
        : <span className="tech-badge-emoji">{info.emoji}</span>
      }
      {tech}
    </span>
  );
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showLiveMessage, setShowLiveMessage] = useState(false);
  const [liveLink, setLiveLink] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const projectCategories = [
    {
      id: "ml",
      title: "Machine Learning / AI",
      image: AiImage,
      icon: "🤖",
      tag: "ML · AI · Deep Learning",
      count: 7,
      color: "#1DCD9F",
      projects: [
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
      id: "react",
      title: "React / Frontend",
      image: ReactImg,
      icon: "⚛️",
      tag: "React · HTML · CSS · JS",
      count: 4,
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
      count: 2,
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
      ],
    },
  ];

  const currentCategory = projectCategories.find((c) => c.id === selectedCategory);

  const handleLiveClick = (link) => {
    setLiveLink(link);
    setShowLiveMessage(true);
  };

  const filteredProjects = currentCategory?.projects.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalProjects = projectCategories.reduce((sum, c) => sum + c.projects.length, 0);

  return (
    <section className="projects-page">
      {/* ── Header ── */}
      <div className="projects-top">
        <p className="projects-section-label">Portfolio</p>
        <div className="projects-header">
          <div>
            <h1>{selectedCategory ? currentCategory.title : "MY PROJECTS"}</h1>
            {!selectedCategory && (
              <p className="projects-subtitle">
                {totalProjects} projects across {projectCategories.length} categories
              </p>
            )}
          </div>
          {selectedCategory && (
            <div className="search-bar">
              <svg className="search-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search project..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      {/* ── Category Grid ── */}
      {!selectedCategory ? (
        <div className="category-grid">
          {projectCategories.map((category, i) => (
            <motion.div
              key={category.id}
              className="category-card"
              onClick={() => setSelectedCategory(category.id)}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.12 }}
            >
              <div className="category-img-wrap">
                <img src={category.image} alt={category.title} />
                <div className="category-overlay">
                  <span className="category-emoji">{category.icon}</span>
                </div>
              </div>
              <div className="category-card-body">
                <div className="category-card-top">
                  <h3>{category.title}</h3>
                  <span className="category-count">{category.projects.length}</span>
                </div>
                <p className="category-tag">{category.tag}</p>
                <div className="category-arrow">
                  <span>Explore</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Stats row */}
          <div className="projects-stats">
            <div className="stat-chip">
              <span className="stat-chip-num">{totalProjects}+</span>
              <span className="stat-chip-label">Total Projects</span>
            </div>
            <div className="stat-chip">
              <span className="stat-chip-num">8+</span>
              <span className="stat-chip-label">Tech Stacks</span>
            </div>
            <div className="stat-chip">
              <span className="stat-chip-num">3</span>
              <span className="stat-chip-label">Domains</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="project-list-header">
            <button
              className="back-btn"
              onClick={() => { setSelectedCategory(null); setSelectedProject(null); setSearchTerm(""); }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to Categories
            </button>
            <span className="project-list-count">{filteredProjects?.length} project{filteredProjects?.length !== 1 ? "s" : ""}</span>
          </div>

          <div className="project-grid">
            <AnimatePresence>
              {filteredProjects?.map((project, i) => (
                <motion.div
                  key={project.id}
                  className="project-card"
                  onClick={() => setSelectedProject(project)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: i * 0.07 }}
                >
                  <div className="project-card-img-wrap">
                    <img src={project.image} alt={project.title} />
                    <div className="project-card-img-overlay">
                      <span className="project-view-btn">View Details</span>
                    </div>
                  </div>
                  <div className="project-card-body">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-techs">
                      {project.techs?.slice(0, 4).map((t) => (
                        <TechBadge key={t} tech={t} />
                      ))}
                    </div>
                    <div className="project-card-footer">
                      {project.github && <span className="link-indicator github-ind">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        GitHub
                      </span>}
                      {project.live && <span className="link-indicator live-ind">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        Live
                      </span>}
                      {project.pdf && <span className="link-indicator pdf-ind">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        PDF
                      </span>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}

      {/* ── Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-modal"
            onClick={() => setSelectedProject(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.25 }}
            >
              <button className="close-btn" onClick={() => setSelectedProject(null)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
              <div className="modal-img-wrap">
                <img src={selectedProject.image} alt={selectedProject.title} />
              </div>
              <div className="modal-body">
                <h2>{selectedProject.title}</h2>
                <p>{selectedProject.details}</p>
                {selectedProject.techs && (
                  <div className="modal-techs">
                    {selectedProject.techs.map((t) => <TechBadge key={t} tech={t} />)}
                  </div>
                )}
                <div className="modal-links">
                  {selectedProject.github && (
                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="btn-gh">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      GitHub
                    </a>
                  )}
                  {selectedProject.live && (
                    <button onClick={() => handleLiveClick(selectedProject.live)} className="btn-live">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      Live Demo
                    </button>
                  )}
                  {selectedProject.pdf && (
                    <a href={selectedProject.pdf} download className="btn-pdf">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      Download PDF
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Live Toast ── */}
      {showLiveMessage && (
        <div className="live-toast">
          <svg viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" width="18" height="18">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <span>If the Space is sleeping, click <strong>"Restart the Space"</strong> and wait a few seconds.</span>
          <a href={liveLink} target="_blank" rel="noopener noreferrer" onClick={() => setShowLiveMessage(false)}>Open →</a>
          <button onClick={() => setShowLiveMessage(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      )}
    </section>
  );
}
