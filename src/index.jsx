import { Routes, Route, Link, useNavigate } from "react-router-dom";
import About from "./About.jsx";
import Projects from "./Project.jsx";
import logo from "./assets/logo.png";
import my_photo from "./assets/my_photo3.png";
import Work_Together from "./Work_Together.jsx";
import Resume from "./Resume.jsx";

function Message() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Animated marquee bar */}
      <div className="marquee-bar">
        <div className="marquee-inner">
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{display:'contents'}}>
              <span>Open to Work</span>
              <span>Web Development</span>
              <span>Machine Learning</span>
              <span>Data Science</span>
              <span>AI Projects</span>
              <span>React Developer</span>
              <span>Python</span>
              <span>Power BI</span>
              <span>Deep Learning</span>
              <span>Open to Work</span>
              <span>Web Development</span>
              <span>Machine Learning</span>
              <span>Data Science</span>
              <span>AI Projects</span>
              <span>React Developer</span>
              <span>Python</span>
              <span>Power BI</span>
              <span>Deep Learning</span>
            </span>
          ))}
        </div>
      </div>

      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="MyWebsite Logo" />
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="resume-button">
          <Link to="/my_resume">
            <button>My Resume</button>
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/Work_Together" element={<Work_Together />} />
        <Route path="/contact" element={<Work_Together />} />
        <Route path="/my_resume" element={<Resume />} />
        <Route
          path="/"
          element={
            <div className="home-container">
              <div className="home-text">
                <span className="label">Portfolio — 2025</span>
                <h1>
                  Hi, I'm{" "}
                  <span className="highlight">Md. Abdullah<br />Al Jaber</span>
                </h1>
                <h2>
                  Web Developer &amp;{" "}
                  <span className="highlight-alt">Data Scientist</span>
                </h2>
                <p>
                  I build modern, responsive web applications and intelligent
                  data-driven solutions — turning complex problems into elegant,
                  user-centered experiences.
                </p>
                <div className="cta-row">
                  <button className="btn-primary" onClick={() => navigate("/Work_Together")}>
                    Let's Work Together
                  </button>
                  <button className="btn-ghost" onClick={() => navigate("/projects")}>
                    View Projects
                  </button>
                </div>
                <div className="stats-row">
                  <div className="stat-item">
                    <div className="num">15+</div>
                    <div className="desc">Projects</div>
                  </div>
                  <div className="stat-item">
                    <div className="num">2+</div>
                    <div className="desc">Years Exp.</div>
                  </div>
                  <div className="stat-item">
                    <div className="num">5+</div>
                    <div className="desc">Tech Stacks</div>
                  </div>
                </div>
              </div>

              <div className="home-image">
                <img className="image_box" src={my_photo} alt="Jaber Profile" />
              </div>
            </div>
          }
        />
      </Routes>

      <footer>
        <span style={{color:'var(--muted)'}}>
          &copy; {new Date().getFullYear()} <span>Jaber</span> — All rights reserved
        </span>
        <span style={{letterSpacing:'2px'}}>BD 🇧🇩</span>
      </footer>
    </div>
  );
}

export default Message;
