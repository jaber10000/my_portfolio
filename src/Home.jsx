import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import my_photo from "./assets/my_photo3.png";
import { CountUp, Split, useGo } from "./Effects.jsx";
import TechStack from "./TechStack.jsx";
import { Media, TechBadge, TECH_ICONS } from "./Media.jsx";
import { SectionHead, ArrowIcon, AchievementGrid } from "./Ui.jsx";
import { profile, achievements, techCategories, getFeatured } from "./siteData.js";
import { getTotalProjects, projectCategories } from "./projectData.js";
import "./Css/Home.css";

/* ── Orbital tech visual ─────────────────────────────────────────────
   Three concentric orbits, each rotating on its own clock. Every badge sits in a
   static "slot" (its angle), and is counter-rotated so it always reads upright. */
const DEV = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
const ORBITS = [
  { id: "inner", dur: 42, dir: "cw", labels: false, items: [
    { name: "Python", icon: TECH_ICONS.Python.svg, a: 20 },
    { name: "PyTorch", icon: `${DEV}/pytorch/pytorch-original.svg`, a: 200 },
  ] },
  { id: "middle", dur: 64, dir: "ccw", labels: true, items: [
    { name: "TensorFlow", icon: TECH_ICONS.TensorFlow.svg, a: 40 },
    { name: "OpenCV", icon: TECH_ICONS.OpenCV.svg, a: 160 },
    { name: "Hugging Face", emoji: "🤗", a: 280 },
  ] },
  { id: "outer", dur: 96, dir: "cw", labels: true, items: [
    { name: "React", icon: TECH_ICONS.React.svg, a: 70 },
    { name: "JavaScript", icon: TECH_ICONS.JavaScript.svg, a: 190 },
    { name: "GitHub", icon: `${DEV}/github/github-original.svg`, invert: true, a: 310 },
  ] },
];
const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  x: (i * 37 + 11) % 100, y: (i * 53 + 7) % 100, s: 2 + (i % 3), d: -((i * 1.7) % 9), t: 7 + (i % 5) * 1.6,
}));

function OrbitVisual({ photo }) {
  const root = useRef(null);
  const rate = useRef({ now: 1, goal: 1, raf: 0 });

  /* hover → ease every orbit (and its counter-rotation) down to 35% speed, via WAAPI playbackRate */
  const setGoal = (g) => {
    const r = rate.current;
    r.goal = g;
    if (r.raf) return;
    const step = () => {
      r.now += (r.goal - r.now) * 0.12;
      if (Math.abs(r.goal - r.now) < 0.01) r.now = r.goal;
      root.current?.querySelectorAll(".orbit").forEach((o) =>
        o.getAnimations({ subtree: true }).forEach((an) => { an.playbackRate = r.now; }));
      r.raf = r.now === r.goal ? 0 : requestAnimationFrame(step);
    };
    r.raf = requestAnimationFrame(step);
  };
  useEffect(() => () => cancelAnimationFrame(rate.current.raf), []);

  /* pause everything while the hero is off-screen */
  useEffect(() => {
    const el = root.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => el.classList.toggle("is-paused", !e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="orbit-stage" ref={root}>
      <div className="hero-orb" aria-hidden="true">
        <div className="hero-grid" />
        {PARTICLES.map((p, i) => (
          <i key={i} className="particle" style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, animationDelay: `${p.d}s`, animationDuration: `${p.t}s` }} />
        ))}
        <span className="wave wave--1" />
        <span className="wave wave--2" />

        <div
          className="orbits"
          onPointerOver={(e) => e.target.closest?.(".o-pin") && setGoal(0.35)}
          onPointerOut={(e) => e.target.closest?.(".o-pin") && setGoal(1)}
        >
          {ORBITS.map((o) => (
            <div key={o.id} className={`orbit orbit--${o.id} orbit--${o.dir}${o.labels ? " has-labels" : ""}`} style={{ "--d": `${o.dur}s` }}>
              <span className="orbit-trail" />
              {o.items.map((it) => (
                <div key={it.name} className="o-slot" style={{ "--ang": `${it.a}deg` }}>
                  <div className="o-pin">
                    <div className="o-badge glass" tabIndex={-1}>
                      {it.icon
                        ? <img src={it.icon} alt="" width="20" height="20" loading="lazy" decoding="async" className={it.invert ? "o-ico is-invert" : "o-ico"} />
                        : <span className="o-emoji">{it.emoji}</span>}
                      <span className="o-label">{it.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="hero-portrait">
        <img className="image_box" src={photo} alt="Jaber Profile" />
      </div>

      <p className="sr-only">Technologies I work with: {ORBITS.flatMap((o) => o.items.map((i) => i.name)).join(", ")}.</p>
    </div>
  );
}

/* ── Vertical role switcher (replaces the typewriter) ── */
function RoleSwitcher({ roles, every = 2800 }) {
  const calm = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    let id = 0;
    const start = () => { stop(); id = setInterval(() => setI((n) => (n + 1) % roles.length), every); };
    const stop = () => clearInterval(id);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    if (!document.hidden) start();
    return () => { stop(); document.removeEventListener("visibilitychange", onVis); };
  }, [roles.length, every]);

  const v = calm
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 } }
    : {
        initial: { y: "110%", opacity: 0 },
        animate: { y: "0%", opacity: 1 },
        exit: { y: "-110%", opacity: 0 },
        transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] },
      };

  return (
    <>
      <span className="role-ind" aria-hidden="true" />
      <span className="role-window" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.span key={roles[i]} className="role-item" {...v}>{roles[i]}</motion.span>
        </AnimatePresence>
      </span>
      <span className="sr-only">{roles.join(", ")}</span>
    </>
  );
}

export default function Home() {
  const go = useGo();
  const featured = getFeatured();
  const research = projectCategories.find((c) => c.id === "research")?.projects.length ?? 0;

  return (
    <main className="home">
      {/* ═════════ HERO ═════════ */}
      <section className="home-container container">
        <div className="home-text">
          <span className="label">
            <i className="pulse" /> Portfolio — 2026 · Open to work
          </span>

          <h1 aria-label={`Hi, I'm ${profile.name}`}>
            <span className="h1-small"><Split text="Hi, I'm" /></span>
            <Split text={profile.first} start={2} className="grad" />
            <br />
            <Split text={profile.last} start={4} className="grad serif" />
          </h1>

          <h2 className="role-line">
            <RoleSwitcher roles={profile.roles} />
          </h2>

          <p>{profile.intro}</p>

          <div className="cta-row">
            <button className="btn-primary" onClick={() => go("/Work_Together")}>
              Let's Work Together <ArrowIcon />
            </button>
            <button className="btn-ghost" onClick={() => go("/projects")}>
              View Projects
            </button>
          </div>

          <div className="stats-row">
            <div className="stat-item"><div className="num"><CountUp to={getTotalProjects()} suffix="+" /></div><div className="desc">Projects</div></div>
            <div className="stat-item"><div className="num"><CountUp to={research} /></div><div className="desc">Research</div></div>
            <div className="stat-item"><div className="num"><CountUp to={2} suffix="+" /></div><div className="desc">Years Exp.</div></div>
            <div className="stat-item"><div className="num"><CountUp to={techCategories.length} /></div><div className="desc">Disciplines</div></div>
          </div>
        </div>

        <div className="home-image hero-visual" aria-hidden="false">
          <OrbitVisual photo={my_photo} />
        </div>

        <a className="scroll-cue" href="#stack" aria-label="Scroll to technology stack">
          <span>Scroll</span><i />
        </a>
      </section>

      {/* ═════════ TECH STACK ═════════ */}
      <TechStack />

      {/* ═════════ FEATURED WORK ═════════ */}
      <section className="featured container">
        <div className="featured-head">
          <SectionHead
            index="03"
            eyebrow="Selected work"
            title="Projects that"
            accent="ship & explain."
          />
          <button className="btn-ghost reveal" onClick={() => go("/projects")}>
            All projects <ArrowIcon />
          </button>
        </div>

        <div className="featured-grid">
          {featured.map((p, i) => (
            <article
              key={p.categoryId + p.id}
              className="feature-card tilt"
              style={{ "--c": p.color }}
              onClick={() => go("/projects")}
            >
              <div className="feature-media">
                <Media src={p.image} alt={p.title} />
                <span className="feature-no">0{i + 1}</span>
                <span className="feature-cat"><i />{p.categoryTitle}</span>
              </div>
              <div className="feature-body">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="project-techs">
                  {p.techs?.slice(0, 3).map((t) => <TechBadge key={t} tech={t} />)}
                </div>
                <span className="feature-go">Explore <ArrowIcon /></span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ═════════ ACHIEVEMENTS ═════════ */}
      <section className="home-ach container">
        <SectionHead index="04" eyebrow="Highlights" title="Proof, not" accent="promises." />
        <AchievementGrid items={achievements} />
      </section>
    </main>
  );
}
