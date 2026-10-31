import { Link, useLocation } from "react-router-dom";
import { FaGithub, FaLinkedinIn, FaFacebookF, FaEnvelope } from "react-icons/fa";
import { profile } from "./siteData.js";
import { ArrowIcon } from "./Ui.jsx";
import { useGo } from "./Effects.jsx";

export default function Footer() {
  const go = useGo();
  const { pathname } = useLocation();
  const onContact = /^\/(contact|work_together)$/i.test(pathname); // the page already is the call to action
  const top = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="site-footer">
      {!onContact && (
      <div className="footer-cta container">
        <p className="eyebrow reveal"><b>→</b>Have an idea?</p>
        <h2 className="footer-big reveal">
          Let’s build something <em>intelligent</em> together.
        </h2>
        <div className="footer-cta-row reveal">
          <button className="btn-primary" onClick={() => go("/contact")}>
            Start a conversation <ArrowIcon />
          </button>
          <a className="footer-mail" href={`mailto:${profile.email}`}>
            <FaEnvelope aria-hidden="true" /> {profile.email}
          </a>
        </div>
      </div>
      )}

      <div className="footer-grid container">
        <div className="footer-brand">
          <strong>{profile.name}</strong>
          <span>{profile.title} · Full-Stack Developer</span>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/my_resume">Resume</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="footer-social">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
          <a href={profile.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
        </div>
      </div>

      <div className="footer-base container">
        <span>
          &copy; {new Date().getFullYear()} <b>Jaber</b> — All rights reserved
        </span>
        <button className="to-top" onClick={top} aria-label="Back to top">
          Back to top
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
        </button>
        <span className="footer-bd">BD 🇧🇩</span>
      </div>
    </footer>
  );
}
