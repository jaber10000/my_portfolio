import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import logo from "./assets/logo.png";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17" height="17" aria-hidden="true">
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);
const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17" height="17" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export default function Navbar({ theme, onToggleTheme, isActive, pathname }) {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  /* compact bar after scrolling */
  useEffect(() => {
    const on = () => setStuck(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  /* close the mobile menu on route change */
  useEffect(() => setOpen(false), [pathname]);

  /* lock page scroll + Esc to close while the menu is open */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open]);

  const themeLabel = theme === "dark" ? "Light" : "Dark";

  return (
    <>
      <nav className={`navbar ${stuck ? "is-stuck" : ""}`} aria-label="Main">
        <Link to="/" className="logo" aria-label="Home">
          <img src={logo} alt="Jaber logo" />
        </Link>

        <ul className="nav-links">
          {LINKS.map(({ to, label }) => (
            <li key={to}>
              <Link to={to} className={isActive(to) ? "nav-active" : ""} aria-current={isActive(to) ? "page" : undefined}>
                {label}
                {isActive(to) && <span className="nav-active-dot" />}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <span className="theme-icon">{theme === "dark" ? <SunIcon /> : <MoonIcon />}</span>
            <span className="theme-label">{themeLabel}</span>
          </button>

          <div className="resume-button">
            <Link to="/my_resume">
              <button className={isActive("/my_resume") ? "resume-btn-active" : ""}>My Resume</button>
            </Link>
          </div>

          <button
            className={`nav-burger ${open ? "is-open" : ""}`}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span /><span />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav aria-label="Mobile">
              <ul>
                {[...LINKS, { to: "/my_resume", label: "Resume" }].map(({ to, label }, i) => (
                  <motion.li
                    key={to}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.06, duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                  >
                    <Link to={to} className={isActive(to) ? "is-on" : ""} onClick={() => setOpen(false)}>
                      <small>0{i + 1}</small>
                      {label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mobile-menu-foot">
              <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
                <span className="theme-icon">{theme === "dark" ? <SunIcon /> : <MoonIcon />}</span>
                <span className="theme-label" style={{ display: "inline" }}>{themeLabel} mode</span>
              </button>
              <span>Open to work · Dhaka, BD</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
