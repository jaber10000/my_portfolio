import React, { useState } from "react";
import "./Css/Resume.css";
import profileImg from "./assets/my_photo3.png";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaBirthdayCake,
  FaLinkedinIn, FaGithub, FaReact, FaPython, FaDatabase,
  FaChartBar, FaLanguage, FaHtml5, FaCss3Alt, FaJs
} from "react-icons/fa";
import {
  SiDjango, SiTensorflow, SiScikitlearn, SiMysql,
  SiFastapi, SiPandas, SiNumpy, SiFlutter, SiFirebase
} from "react-icons/si";
import { AiOutlineRobot } from "react-icons/ai";
import my_cv from "./pdf/MYCV.pdf";

const SKILL_GROUPS = [
  {
    group: "Frontend",
    color: "#61DAFB",
    skills: [
      { icon: <FaReact />, label: "React.js" },
      { icon: <FaHtml5 />, label: "HTML5" },
      { icon: <FaCss3Alt />, label: "CSS3" },
      { icon: <FaJs />, label: "JavaScript" },
    ]
  },
  {
    group: "Machine Learning",
    color: "#FF6B6B",
    skills: [
      { icon: <FaPython />, label: "Python" },
      { icon: <SiTensorflow />, label: "TensorFlow" },
      { icon: <SiScikitlearn />, label: "Scikit-Learn" },
      { icon: <AiOutlineRobot />, label: "Deep Learning" },
    ]
  },
  {
    group: "Backend & Data",
    color: "#1DCD9F",
    skills: [
      { icon: <SiDjango />, label: "Django" },
      { icon: <SiFastapi />, label: "FastAPI" },
      { icon: <SiMysql />, label: "MySQL" },
      { icon: <FaDatabase />, label: "Data Analysis" },
    ]
  },
  {
    group: "Tools & Other",
    color: "#FFB800",
    skills: [
      { icon: <FaLanguage />, label: "NLP" },
      { icon: <FaChartBar />, label: "Power BI" },
      { icon: <SiPandas />, label: "Pandas" },
      { icon: <SiFlutter />, label: "Flutter" },
    ]
  }
];

const Resume = () => {
  const [showContacts, setShowContacts] = useState(false);

  return (
    <div className="profile-container">

      {/* ── Identity card ── */}
      <div className="profile-card identity-card">
        <div className="profile-header">
          <div className="resume-avatar-wrap">
            <img src={profileImg} alt="Profile" className="resume-image" />
            <div className="resume-status-dot" />
          </div>
          <div className="resume-name-block">
            <h2 className="profile-name">Md. Abdullah Al Jaber</h2>
            <div className="tags">
              <span className="tag">React Developer</span>
              <span className="tag">Data Scientist</span>
              <span className="tag">ML Engineer</span>
            </div>
          </div>
          <button className="toggle-btn" onClick={() => setShowContacts(!showContacts)}>
            {showContacts ? "Hide Info" : "Show Info"}
          </button>
        </div>

        {showContacts && (
          <div className="contact-info">
            <div className="info-row">
              <FaEnvelope className="info-icon" />
              <span>bs10000jaber@gmail.com</span>
            </div>
            <div className="info-row">
              <FaPhone className="info-icon" />
              <span>+880 1647271765</span>
            </div>
            <div className="info-row">
              <FaBirthdayCake className="info-icon" />
              <span>May 26, 2003</span>
            </div>
            <div className="info-row">
              <FaMapMarkerAlt className="info-icon" />
              <span>Mirpur-2, Dhaka, BD</span>
            </div>
            <div className="info-row">
              <FaLinkedinIn className="info-icon" />
              <a href="https://www.linkedin.com/in/md-abdullah-al-jaber-699a1a266/" target="_blank" rel="noreferrer">LinkedIn Profile</a>
            </div>
            <div className="info-row">
              <FaGithub className="info-icon" />
              <a href="https://github.com/jaber10000" target="_blank" rel="noreferrer">github.com/jaber10000</a>
            </div>
          </div>
        )}
      </div>

      {/* ── Technical Skills ── */}
      <div className="profile-card">
        <h3 className="section-title">Technical Skills</h3>
        <div className="skill-groups">
          {SKILL_GROUPS.map((group) => (
            <div key={group.group} className="skill-group">
              <p className="skill-group-label" style={{ color: group.color }}>{group.group}</p>
              <div className="skills-grid">
                {group.skills.map((s, i) => (
                  <div key={i} className="skill-item" style={{ "--skill-color": group.color }}>
                    <span className="skill-icon-wrap" style={{ color: group.color }}>{s.icon}</span>
                    <span className="skill-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Experience ── */}
      <div className="profile-card">
        <h3 className="section-title">Experience</h3>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="timeline-header">
                <h4>Front End Developer</h4>
                <span className="period-badge">Aug 2025 – Present</span>
              </div>
              <p className="org">IT Company</p>
              <p>Building responsive React applications and user interfaces.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="timeline-header">
                <h4>Student Data Scientist</h4>
                <span className="period-badge">Jan 2024 – Aug 2025</span>
              </div>
              <p className="org">Daffodil International University</p>
              <p>Research and development in ML/AI models, data preprocessing, and analysis.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot timeline-dot--award" />
            <div className="timeline-content">
              <div className="timeline-header">
                <h4>Dataset Contest Winner 🏆</h4>
                <span className="period-badge">Jan 2025 – Apr 2025</span>
              </div>
              <p className="org">Daffodil International University</p>
              <p>Won dataset competition for outstanding data science work.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Education ── */}
      <div className="profile-card">
        <h3 className="section-title">Education</h3>
        <div className="edu-grid">
          <div className="edu-item">
            <span className="edu-degree">BSc in CSE</span>
            <span className="edu-school">Daffodil International University</span>
            <span className="edu-year">2021 – 2025</span>
          </div>
          <div className="edu-item">
            <span className="edu-degree">HSC</span>
            <span className="edu-school">Gov't BM College, Barisal</span>
            <span className="edu-year">2018 – 2019</span>
          </div>
          <div className="edu-item">
            <span className="edu-degree">SSC</span>
            <span className="edu-school">Jhalakathi N S Kamil Madrasah</span>
            <span className="edu-year">2016 – 2017</span>
          </div>
        </div>
      </div>

      {/* ── CV Download ── */}
      <div className="profile-card cv-card">
        <div className="cv-content">
          <div>
            <h3 className="section-title" style={{ marginBottom: 6 }}>Download CV</h3>
            <p className="cv-desc">Get my full resume with all details and references.</p>
          </div>
          <a href={my_cv} target="_blank" rel="noreferrer" className="cv-download-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download CV
          </a>
        </div>
      </div>

    </div>
  );
};

export default Resume;
