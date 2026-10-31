import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Css/Project.css";
import { projectCategories, getTotalProjects, getTotalTechs } from "./projectData.js";
import { Media, TechBadge } from "./Media.jsx";
import { ArrowIcon } from "./Ui.jsx";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showLiveMessage, setShowLiveMessage] = useState(false);
  const [liveLink, setLiveLink] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const currentCategory = projectCategories.find((c) => c.id === selectedCategory);

  const handleLiveClick = (link) => {
    setLiveLink(link);
    setShowLiveMessage(true);
  };

  const filteredProjects = currentCategory?.projects.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!selectedProject) return;
    const onKey = (e) => e.key === "Escape" && setSelectedProject(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedProject]);

  const totalProjects = getTotalProjects();
  const totalTechs = getTotalTechs();

  return (
    <section className="projects-page">
      {/* ── Header ── */}
      <div className="projects-top">
        <p className="eyebrow projects-section-label"><b>{selectedCategory ? "→" : "03"}</b>Portfolio</p>
        <div className="projects-header">
          <div>
            <h1>{selectedCategory ? currentCategory.title : <>My <em>projects</em></>}</h1>
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
              style={{ "--c": category.color }}
              onClick={() => setSelectedCategory(category.id)}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.12 }}
            >
              <div className="category-img-wrap">
                <Media src={category.image} alt={category.title} />
                <span className="category-no">0{i + 1}</span>
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
                  <ArrowIcon />
                </div>
              </div>
            </motion.div>
          ))}

          {/* Stats row */}
          <div className="projects-stats">
            <div className="stat-chip">
              <span className="stat-chip-num">{totalProjects}</span>
              <span className="stat-chip-label">Total Projects</span>
            </div>
            <div className="stat-chip">
              <span className="stat-chip-num">{totalTechs}</span>
              <span className="stat-chip-label">Tech Stacks</span>
            </div>
            <div className="stat-chip">
              <span className="stat-chip-num">{projectCategories.length}</span>
              <span className="stat-chip-label">Categories</span>
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

          <div className="cat-switch" role="tablist" aria-label="Project categories">
            {projectCategories.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={c.id === selectedCategory}
                className={`cat-chip ${c.id === selectedCategory ? "is-on" : ""}`}
                style={{ "--c": c.color }}
                onClick={() => { setSelectedCategory(c.id); setSearchTerm(""); }}
              >
                <span>{c.icon}</span>{c.title}<b>{c.projects.length}</b>
              </button>
            ))}
          </div>

          <div className="project-grid">
            {filteredProjects?.length === 0 && <p className="empty-state">No project matches “{searchTerm}”.</p>}
            <AnimatePresence>
              {filteredProjects?.map((project, i) => (
                <motion.div
                  key={project.id}
                  className="project-card"
                  style={{ "--c": currentCategory.color }}
                  onClick={() => setSelectedProject(project)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: i * 0.07 }}
                >
                  <div className="project-card-img-wrap">
                    <Media src={project.image} alt={project.title} />
                    <span className="project-cat"><i />{currentCategory.icon} {currentCategory.title.split(" / ")[0]}</span>
                    <span className="project-no">{String(i + 1).padStart(2, "0")}</span>
                    <div className="project-card-img-overlay">
                      <span className="project-view-btn">View Details <ArrowIcon size={13} /></span>
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
                      {project.paper && <span className="link-indicator dataset-ind">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        Paper
                      </span>}
                      {project.notebook && <span className="link-indicator github-ind">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                        Notebook
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
                <Media src={selectedProject.image} alt={selectedProject.title} />
              </div>
              <div className="modal-body">
                {currentCategory && <p className="eyebrow modal-cat" style={{ "--c": currentCategory.color }}><b>{currentCategory.icon}</b>{currentCategory.title}</p>}
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
                  {selectedProject.paper && (
                    <a href={selectedProject.paper} target="_blank" rel="noopener noreferrer" className="btn-dataset">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      View Paper
                    </a>
                  )}
                  {selectedProject.notebook && (
                    <a href={selectedProject.notebook} download={`${selectedProject.title.slice(0, 40).replace(/[^a-z0-9]+/gi, "_")}.ipynb`} className="btn-pdf">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      Notebook (.ipynb)
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
