import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SkillNet } from "./Neural.jsx";
import { techCategories, projectsForTech } from "./siteData.js";
import { Icon, SectionHead, ArrowIcon } from "./Ui.jsx";
import { useGo } from "./Effects.jsx";
import "./Css/TechStack.css";

/* Interactive tech-stack explorer:
   • the neural diagram (existing SkillNet) lights up one discipline at a time
   • the tabs and the diagram are linked — hover/tap either and both follow
   • each discipline lists the tools and the real projects built with them */
export default function TechStack() {
  const [activeId, setActiveId] = useState(techCategories[0].id);
  const go = useGo();

  const data = useMemo(
    () => techCategories.map((c) => ({ ...c, projects: projectsForTech(c) })),
    []
  );
  const active = data.find((c) => c.id === activeId) ?? data[0];

  return (
    <section className="tech-section container" id="stack">
      <SectionHead
        index="02"
        eyebrow="Technology stack"
        title="Five disciplines,"
        accent="one connected toolkit."
        sub="Hover the network or pick a discipline — every tool listed here is something I have shipped in a real project."
      />

      <div className="tech-layout">
        {/* ── Neural diagram ── */}
        <div className="tech-viz glass reveal" style={{ "--c": active.color }}>
          <div className="tech-viz-bar">
            <span className="dot" /><span className="dot" /><span className="dot" />
            <small>skill-graph.live</small>
          </div>
          <SkillNet active={activeId} onActive={setActiveId} />
        </div>

        {/* ── Category tabs + detail ── */}
        <div className="tech-panel reveal">
          <div className="tech-tabs" role="tablist" aria-label="Technology categories">
            {data.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={c.id === activeId}
                className={`tech-tab ${c.id === activeId ? "is-on" : ""}`}
                style={{ "--c": c.color }}
                onClick={() => setActiveId(c.id)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActiveId(c.id)}
              >
                <Icon name={c.icon} />
                <span>{c.label}</span>
                <b>{c.projects.length}</b>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              className="tech-detail"
              style={{ "--c": active.color }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
              role="tabpanel"
            >
              <div className="tech-detail-head">
                <span className="tech-detail-icon"><Icon name={active.icon} /></span>
                <div>
                  <h3>{active.long}</h3>
                  <p>{active.blurb}</p>
                </div>
              </div>

              <ul className="tech-chips">
                {active.tools.map((t) => <li key={t}>{t}</li>)}
              </ul>

              <div className="tech-used">
                <p className="eyebrow">Built with it · {active.projects.length}</p>
                <ul>
                  {active.projects.slice(0, 4).map((p) => (
                    <li key={p.categoryId + p.id}>
                      <button onClick={() => go("/projects")}>
                        <span>{p.title}</span>
                        <ArrowIcon size={13} />
                      </button>
                    </li>
                  ))}
                </ul>
                {active.projects.length > 4 && (
                  <button className="tech-more" onClick={() => go("/projects")}>
                    +{active.projects.length - 4} more projects
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
