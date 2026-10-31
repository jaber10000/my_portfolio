import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import About from "./About.jsx";
import Projects from "./Project.jsx";
import Work_Together from "./Work_Together.jsx";
import Resume from "./Resume.jsx";
import Chatbot from "./Chatbot.jsx";
import Home from "./Home.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { FX } from "./Effects.jsx";
import "./effects.css";

const MARQUEE = [
  "Open to Work", "AI / Machine Learning", "Computer Vision", "Generative AI",
  "RAG Systems", "Automation", "Full-Stack Development", "Federated Learning", "React · FastAPI",
];

function Message() {
  const location = useLocation();
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [themeAnimating, setThemeAnimating] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeAnimating(true);
    setTimeout(() => {
      setTheme((t) => (t === "dark" ? "light" : "dark"));
      setThemeAnimating(false);
    }, 200);
  };

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    if (path === "/contact") return location.pathname === "/contact" || location.pathname.toLowerCase() === "/work_together";
    return location.pathname.startsWith(path);
  };

  return (
    <div className={`app-root ${themeAnimating ? "theme-fade" : ""}`}>
      <FX />

      {/* Animated marquee bar */}
      <div className="marquee-bar" aria-hidden="true">
        <div className="marquee-inner">
          {[0, 1].map((i) => (
            <span key={i} style={{ display: "contents" }}>
              {MARQUEE.map((m) => <span key={m}>{m}</span>)}
            </span>
          ))}
        </div>
      </div>

      <Navbar theme={theme} onToggleTheme={toggleTheme} isActive={isActive} pathname={location.pathname} />

      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/Work_Together" element={<Work_Together />} />
        <Route path="/contact" element={<Work_Together />} />
        <Route path="/my_resume" element={<Resume />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
      <Chatbot />
    </div>
  );
}

export default Message;
