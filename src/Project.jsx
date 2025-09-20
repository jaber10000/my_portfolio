import React, { useState } from "react";
import "./Css/Project.css";
import Speech_Emotion from "./assets/Speech_Emotion.jpg"
import Nlp_emotion from "./assets/Nlp_emotion.png"
import Speech_Emotion_pdf from "./pdf/Toronto_Emotion,_Deep_learning-compressed.pdf"
import Nlp_emotion_pdf from "./pdf/NLP_emotion_detection_1 with kaggle data.ipynb - Colab.pdf"
import Classification from "./assets/classification.jpg"
import classification_pdf from "./pdf/Classification for Contest.ipynb - Colab.pdf"


export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Speech Emotion Recognition with Deep Learning & Audio Features",
      description: "This deep learning project uses the TESS dataset to classify emotions in speech. Includes feature extraction (MFCC, Mel spectrogram), model training, evaluation metrics, and final predictions.",
      image: Speech_Emotion, 
      pdf: Speech_Emotion_pdf, 
      details: "  I recently completed a project using the TESS Toronto Emotional Speech dataset to classify spoken emotions based on audio signals. This was a deep dive into combining audio signal processing with machine learning to understand human emotions through voice "
    },
    {
      id: 2,
      title: "Emotion Detection with Machine Learning & NLP",
      description: "Emotion Detection NLP project using machine learning. It includes data preprocessing, TF-IDF vectorization, and performance comparison of models like Logistic Regression, Random Forest, XGBoost, and SVM on a labeled emotion dataset.",
      image: Nlp_emotion,
      pdf: Nlp_emotion_pdf,
      details: "I'm thrilled to share my recent project where I built an emotion detection system using Natural Language Processing and several machine learning models. The goal was to classify text into emotional categories like joy, sadness, anger, fear, love, and surprise.Cleaned and processed a custom emotion-labeled dataset from Kaggle Used TF-IDF vectorization for feature extraction Trained and evaluated multiple models:Logistic Regression: 87% Accuracy Multinomial Naive Bayes: ~69% Random Forest: 90% XGBoost: 90% Linear SVM: ~90%"
    },
    {
      id: 3,
      title: "Using this classification file, You can sholve any classification dataset problem",
      description: "Classification codes are standardized sets of numbers or letters used to categorize and identify different types of items, activities, or entities. They provide a structured way to organize information, facilitating data management, analysis, and communication across various systems and industries.",
      image: Classification, 
      pdf: classification_pdf, 
      details: " Classification codes are standardized sets of numbers or letters used to categorize and identify different types of items, activities, or entities. They provide a structured way to organize information, facilitating data management, analysis, and communication across various systems and industries."
    },
  ];

  return (
    <section className="about-section" id="about">
      <h2>My Projects</h2>
      <p>
        Explore some of the projects I’ve worked on. Click any project to see
        full details and download the PDF catalog.
      </p>

      <div className="project-grid">
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-card"
            onClick={() => setSelectedProject(project)}
          >
            <img src={project.image} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description.split(" ")
          .slice(0, 30)
          .join(" ")}
        {project.details.split(" ").length > 30 && " ..."}</p>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="project-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedProject(null)}>
              ✖
            </button>
            <h2>{selectedProject.title}</h2>
            <img src={selectedProject.image} alt={selectedProject.title} />
            <p>{selectedProject.details}</p>
            <a href={selectedProject.pdf} download className="download-btn">
              Download PDF
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
