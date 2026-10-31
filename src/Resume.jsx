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
import my_cv from "./pdf/MyCV.pdf";
import { SectionHead, Timeline, AchievementGrid, CertGrid } from "./Ui.jsx";
import { profile, experience, education, achievements, certifications } from "./siteData.js";

const SKILL_GROUPS = [
  {
    group: "Frontend",
    color: "var(--g2)",
    skills: [
      { icon: <FaReact />, label: "React.js" },
      { icon: <FaHtml5 />, label: "HTML5" },
      { icon: <FaCss3Alt />, label: "CSS3" },
      { icon: <FaJs />, label: "JavaScript" },
    ]
  },
  {
    group: "Machine Learning",
    color: "var(--g3)",
    skills: [
      { icon: <FaPython />, label: "Python" },
      { icon: <SiTensorflow />, label: "TensorFlow" },
      { icon: <SiScikitlearn />, label: "Scikit-Learn" },
      { icon: <AiOutlineRobot />, label: "Deep Learning" },
    ]
  },
  {
    group: "Backend & Data",
    color: "var(--g1)",
    skills: [
      { icon: <SiDjango />, label: "Django" },
      { icon: <SiFastapi />, label: "FastAPI" },
      { icon: <SiMysql />, label: "MySQL" },
      { icon: <FaDatabase />, label: "Data Analysis" },
    ]
  },
  {
    group: "Tools & Other",
    color: "var(--g5)",
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
    <div className="resume-page">
      <div className="profile-container container">
        {/* ── Identity (sticky on desktop) ── */}
        <aside className="resume-aside">
          <div className="profile-card identity-card glass">
            <div className="resume-avatar-wrap">
              <img src={profileImg} alt="Profile" className="resume-image" />
              <div className="resume-status-dot" title="Open to work" />
            </div>
            <div className="resume-name-block">
              <p className="eyebrow"><b>CV</b>Resume</p>
              <h2 className="profile-name">{profile.name}</h2>
              <div className="tags">
                <span className="tag">AI / ML Engineer</span>
                <span className="tag">React Developer</span>
                <span className="tag">Data Scientist</span>
              </div>
            </div>
            <button className="toggle-btn" onClick={() => setShowContacts(!showContacts)} aria-expanded={showContacts}>
              {showContacts ? "Hide Info" : "Show Info"}
            </button>

            {showContacts && (
              <div className="contact-info">
                <div className="info-row">
                  <FaEnvelope className="info-icon" />
                  <span>{profile.email}</span>
                </div>
                <div className="info-row">
                  <FaPhone className="info-icon" />
                  <span>{profile.phone}</span>
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
                  <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn Profile</a>
                </div>
                <div className="info-row">
                  <FaGithub className="info-icon" />
                  <a href={profile.github} target="_blank" rel="noreferrer">github.com/jaber10000</a>
                </div>
              </div>
            )}

            <a href={my_cv} target="_blank" rel="noreferrer" className="cv-download-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV
            </a>
            <p className="cv-desc">Full resume with all details and references.</p>
          </div>
        </aside>

        {/* ── Main column ── */}
        <div className="resume-main">
          <section>
            <SectionHead index="01" eyebrow="Toolbox" title="Technical" accent="skills." />
            <div className="skill-groups">
              {SKILL_GROUPS.map((group) => (
                <div key={group.group} className="skill-group glass" style={{ "--c": group.color }}>
                  <p className="skill-group-label">{group.group}</p>
                  <div className="skills-grid">
                    {group.skills.map((s) => (
                      <div key={s.label} className="skill-item">
                        <span className="skill-icon-wrap">{s.icon}</span>
                        <span className="skill-label">{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHead index="02" eyebrow="Career" title="Work" accent="experience." />
            <Timeline items={experience} />
          </section>

          <section>
            <SectionHead index="03" eyebrow="Learning" title="Education" accent="path." />
            <Timeline items={education} variant="edu" />
          </section>

          <section>
            <SectionHead index="04" eyebrow="Recognition" title="Achievements" accent="& milestones." />
            <AchievementGrid items={achievements} />
          </section>

          {certifications.length > 0 && (
            <section>
              <SectionHead index="05" eyebrow="Credentials" title="Certifi-" accent="cations." />
              <CertGrid items={certifications} />
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resume;
