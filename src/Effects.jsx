import { Fragment, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";

// Cards animate themselves with framer-motion, so they are not in REVEAL.
const REVEAL = ".reveal, .timeline-item, .edu-item, .skill-group, .info-block, .projects-header";
const TILT = ".project-card, .category-card, .tilt, .stat-chip";
const MAGNET = ".btn-primary, .btn-ghost, .resume-button button, .theme-toggle, .cv-download-btn";
const HOT = "a, button, input, textarea, select, [role=button], .project-card, .category-card, .feature-card";
const ROUTES = ["/", "/about", "/projects", "/contact", "/work_together", "/my_resume"];

const calm = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* Navigate with a cross-fade (View Transitions API); falls back to a normal navigate */
export function useGo() {
  const navigate = useNavigate();
  return (to) => {
    if (calm() || !document.startViewTransition) return navigate(to);
    document.startViewTransition(() => flushSync(() => navigate(to)));
  };
}

/* Aurora + spotlight + progress bar + cursor ring + magnetic buttons + tilt + parallax + reveal + page transitions */
export function FX() {
  const bar = useRef(null);
  const glow = useRef(null);
  const ring = useRef(null);
  const { pathname } = useLocation();
  const go = useGo();
  const goRef = useRef(go);
  goRef.current = go;

  /* every page change starts at the top (instantly, so it doesn't fight the transition) */
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);

  /* route links -> view transition */
  useEffect(() => {
    if (calm() || !document.startViewTransition) return;
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const u = new URL(a.href, location.href);
      if (u.origin !== location.origin || u.pathname === location.pathname) return;
      if (!ROUTES.includes(u.pathname.toLowerCase())) return;
      e.preventDefault();
      e.stopPropagation();
      goRef.current(u.pathname + u.search + u.hash);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  /* pointer-driven effects */
  useEffect(() => {
    if (calm()) return;
    const hasCursor = fine();
    let mx = -100, my = -100, rx = -100, ry = -100, raf = 0, pending = null;

    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };

    const frame = () => {
      // lagging cursor ring
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px)`;
      // hero parallax (written once per frame, only on the hero element)
      if (pending) {
        const hero = document.querySelector(".home-container");
        if (hero) {
          hero.style.setProperty("--px", ((pending.x / innerWidth) * 2 - 1).toFixed(3));
          hero.style.setProperty("--py", ((pending.y / innerHeight) * 2 - 1).toFixed(3));
        }
        pending = null;
      }
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY; pending = { x: mx, y: my };
      if (glow.current) glow.current.style.transform = `translate(${mx}px,${my}px)`;
      if (ring.current) {
        ring.current.classList.add("on");
        ring.current.classList.toggle("hot", !!e.target.closest?.(HOT));
      }
      const m = e.target.closest?.(MAGNET);
      if (m) {
        const r = m.getBoundingClientRect();
        m.style.setProperty("--tx", `${(e.clientX - r.left - r.width / 2) * 0.22}px`);
        m.style.setProperty("--ty", `${(e.clientY - r.top - r.height / 2) * 0.35}px`);
      }
      const c = e.target.closest?.(TILT);
      if (!c) return;
      const r = c.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.style.setProperty("--ry", `${(x - 0.5) * 10}deg`);
      c.style.setProperty("--rx", `${(0.5 - y) * 10}deg`);
      c.style.setProperty("--mx", `${x * 100}%`);
      c.style.setProperty("--my", `${y * 100}%`);
    };

    const onOut = (e) => {
      const m = e.target.closest?.(MAGNET);
      if (m && !m.contains(e.relatedTarget)) { m.style.setProperty("--tx", "0px"); m.style.setProperty("--ty", "0px"); }
      const c = e.target.closest?.(TILT);
      if (c && !c.contains(e.relatedTarget)) { c.style.setProperty("--rx", "0deg"); c.style.setProperty("--ry", "0deg"); }
    };
    const onLeaveWindow = () => ring.current?.classList.remove("on");

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseout", onOut);
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);
    if (hasCursor) raf = requestAnimationFrame(frame);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* scroll-reveal for current page, including items added later (filters, modals) */
  useEffect(() => {
    if (calm()) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("fx-in"); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    let raf;
    const scan = () => document.querySelectorAll(REVEAL).forEach((el) => {
      if (el.dataset.fx) return;
      el.dataset.fx = "1";
      el.classList.add("fx-reveal");
      el.style.transitionDelay = `${(Array.from(el.parentNode.children).indexOf(el) % 6) * 70}ms`;
      io.observe(el);
    });
    const mo = new MutationObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(scan); });
    mo.observe(document.querySelector(".app-root"), { childList: true, subtree: true });
    scan();
    return () => { io.disconnect(); mo.disconnect(); cancelAnimationFrame(raf); };
  }, [pathname]);

  return (
    <>
      <div className="fx-progress" ref={bar} />
      <div className="fx-aurora" aria-hidden="true"><i /><i /><i /></div>
      <div className="fx-spot" ref={glow} aria-hidden="true" />
      <div className="fx-ring" ref={ring} aria-hidden="true" />
    </>
  );
}

/* Headline words that rise out of a mask, one after another */
export function Split({ text, start = 0, step = 0.08, className = "" }) {
  return text.split(" ").map((w, i) => (
    <Fragment key={i}>
      <span className="sw-mask" aria-hidden="true">
        <span className={`sw ${className}`} style={{ "--d": `${0.15 + (start + i) * step}s` }}>{w}</span>
      </span>{" "}
    </Fragment>
  ));
}

/* Typewriter that cycles through words */
export function Typed({ words, speed = 70, hold = 1400 }) {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    if (calm()) { setN(words[0].length); return; }
    const w = words[i];
    const t = setTimeout(() => {
      if (!del && n === w.length) return setDel(true);
      if (del && n === 0) { setDel(false); return setI((i + 1) % words.length); }
      setN(n + (del ? -1 : 1));
    }, !del && n === w.length ? hold : del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [n, del, i, words, speed, hold]);
  return <span className="typed">{words[i].slice(0, n)}<b className="caret" /></span>;
}

/* Count-up number that starts when scrolled into view */
export function CountUp({ to, suffix = "", ms = 1400 }) {
  const ref = useRef(null);
  const [v, setV] = useState(calm() ? to : 0);
  useEffect(() => {
    if (calm()) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - t0) / ms);
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to, ms]);
  return <span ref={ref}>{v}{suffix}</span>;
}
