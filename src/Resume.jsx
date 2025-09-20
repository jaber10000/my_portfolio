// ProfileCard.jsx
import React, { useState } from "react";
import { Routes, Route,  useNavigate } from "react-router-dom";
import "./Css/Resume.css";
import { Link } from 'react-router-dom';
import profileImg from "./assets/my_photo3.png"; // Replace with your image path
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaBirthdayCake, FaLinkedinIn, FaGithub , FaReact, FaLanguage} from "react-icons/fa";
import { SiDjango, SiTensorflow } from "react-icons/si";
import my_cv from "./pdf/MYCV.pdf"


const Resume = () => {
  const [showContacts, setShowContacts] = useState(false);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img src={profileImg} alt="Profile" className="resume-image" />
          <div>
            <h2 className="profile-name">Md. Abdullah Al Jaber</h2>
            <div className="tags">
              <span className="tag">React Developer</span>
              <span className="tag">Data Scientist</span>
            </div>
          </div>
          <button className="toggle-btn" onClick={() => setShowContacts(!showContacts)}>
            {showContacts ? "Hide Contacts" : "Show Contacts"}
          </button>
        </div>

        {showContacts && (
          <div className="contact-info">
            <div className="info-row">
              <FaEnvelope className="icon" />
              <span>bs10000jaber@gmail.com</span>
            </div>
            <div className="info-row">
              <FaPhone className="icon" />
              <span>+880 1647271765</span>
            </div>
            <div className="info-row">
              <FaBirthdayCake className="icon" />
              <span>May 26, 2003</span>
            </div>
            <div className="info-row">
              <FaMapMarkerAlt className="icon" />
              <span>Mirpur - 2, Dhaka</span>
            </div>
          </div>
        )}

        <div className="social-icons">
          <a href="https://github.com/jaber10000"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/md-abdullah-al-jaber-699a1a266/"><FaLinkedinIn /></a>
        </div>
      </div>


      <div className="about-section">
    <div className="tabs">
      <span className="tab active"><Link to='#'className="portfolio">About</Link></span>

      <span className="tab"><a href={my_cv}className="portfolio" target="_blank">CV</a></span>
    </div>

    <h2 className="about-title">About Me</h2>
    <p className="about-desc">
      I am a highly skilled developer with expertise in Fontend with React, Python for machine learning and deep learning also NLP as well.
    </p>

    <h3 className="doing-title">What I'm Doing</h3>
    <div className="grid-2-cols">
      <div className="grid-box">
        <FaReact className="grid-icon" />
        <div>
          <strong>React Development</strong><br />
          Developing web applications using React
        </div>
      </div>
      <div className="grid-box">
        <SiTensorflow className="grid-icon" />
        <div>
          <strong>Data Science</strong><br />
         Data Releted work with CNN & Audio Data
        </div>
      </div>
      <div className="grid-box">
        <SiDjango className="grid-icon" />
        <div>
          <strong>Django(Python FrameWork)</strong><br />
          Server-side webpage with Django(Python FrameWork)
        </div>
      </div>
      <div className="grid-box">
        <FaLanguage className="grid-icon" />
        <div>
          <strong>NLP</strong><br />
          Real World Language Releted Problem using Natural Language Processing 
        </div>
      </div>
    </div>
  </div>

  <Routes>
</Routes>

</div>



  );
};

export default Resume;
