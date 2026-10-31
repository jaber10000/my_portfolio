import {
  FaBrain, FaEye, FaMagic, FaCogs, FaLayerGroup,
  FaTrophy, FaFlask, FaRocket, FaChartLine, FaCertificate,
} from "react-icons/fa";

/* Reusable building blocks shared by Home / About / Resume.
   Scroll-reveal is handled globally by <FX /> (class `reveal`, `timeline-item`, …),
   so nothing here re-implements an entrance animation. */

const ICONS = {
  brain: FaBrain, eye: FaEye, spark: FaMagic, cogs: FaCogs, layers: FaLayerGroup,
  trophy: FaTrophy, flask: FaFlask, rocket: FaRocket, chart: FaChartLine, cert: FaCertificate,
};
export const Icon = ({ name, ...rest }) => {
  const C = ICONS[name] || FaLayerGroup;
  return <C aria-hidden="true" {...rest} />;
};

export const ArrowIcon = ({ size = 14 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={size} height={size} aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* Section heading: mono eyebrow + large display title with an editorial serif accent */
export function SectionHead({ index, eyebrow, title, accent, sub, align = "left", as: Tag = "h2" }) {
  return (
    <header className={`section-head reveal ${align === "center" ? "is-center" : ""}`}>
      <p className="eyebrow">
        {index && <b>{index}</b>}
        {eyebrow}
      </p>
      <Tag className="section-title">
        {title} {accent && <em>{accent}</em>}
      </Tag>
      {sub && <p className="section-sub">{sub}</p>}
    </header>
  );
}

/* Vertical timeline used for experience & education */
export function Timeline({ items, variant = "work" }) {
  return (
    <ol className={`timeline timeline--${variant}`}>
      {items.map((it) => (
        <li key={it.title + it.period} className="timeline-item">
          <span className={`timeline-dot ${it.award ? "timeline-dot--award" : ""}`} aria-hidden="true" />
          <div className="timeline-content">
            <div className="timeline-header">
              <h4>{it.title}</h4>
              <span className="period-badge">{it.period}</span>
            </div>
            <p className="org">{it.org}</p>
            {it.text && <p className="timeline-text">{it.text}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function AchievementGrid({ items, limit }) {
  const list = limit ? items.slice(0, limit) : items;
  return (
    <div className="ach-grid reveal">
      {list.map((a, i) => (
        <article key={a.title} className="ach-card glass tilt" style={{ "--i": i }}>
          <span className="ach-icon"><Icon name={a.icon} /></span>
          <h3>{a.title}</h3>
          <p className="ach-meta">{a.meta}</p>
          <p className="ach-text">{a.text}</p>
        </article>
      ))}
    </div>
  );
}

/* Renders nothing until real certificates are added to siteData.js */
export function CertGrid({ items }) {
  if (!items.length) return null;
  return (
    <div className="cert-grid reveal">
      {items.map((c) => {
        const Tag = c.url ? "a" : "div";
        return (
          <Tag key={c.title} className="cert-card glass" {...(c.url ? { href: c.url, target: "_blank", rel: "noreferrer" } : {})}>
            <span className="ach-icon"><Icon name="cert" /></span>
            <div>
              <h4>{c.title}</h4>
              <p>{c.issuer}{c.year ? ` · ${c.year}` : ""}</p>
            </div>
          </Tag>
        );
      })}
    </div>
  );
}
