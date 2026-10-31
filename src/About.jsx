import my_photo from "./assets/my_photo.png";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedinIn, FaMapMarkerAlt } from "react-icons/fa";
import { SectionHead, Timeline, AchievementGrid, CertGrid, ArrowIcon, Icon } from "./Ui.jsx";
import { profile, experience, education, achievements, certifications, techCategories } from "./siteData.js";
import "./Css/About.css";

const FOCUS = [
  {
    icon: "flask",
    title: "Research & ML",
    text: "Federated learning, explainable AI and NLP — models that are accurate, private and interpretable.",
    tags: ["Federated Learning", "LIME / SHAP", "BERT"],
  },
  {
    icon: "spark",
    title: "Generative AI & Automation",
    text: "RAG assistants for documents and news, plus n8n workflows that route, reply and notify automatically.",
    tags: ["LangChain", "FAISS", "n8n"],
  },
  {
    icon: "layers",
    title: "Product Engineering",
    text: "React front ends on FastAPI back ends — authentication, dashboards and deployment included.",
    tags: ["React", "FastAPI", "PostgreSQL"],
  },
];

const About = () => {
  return (
    <div className="about-page">
      {/* ═════ Intro ═════ */}
      <section className="about-hero container">
        <div className="about-copy">
          <p className="eyebrow reveal"><b>01</b>Self-summary</p>
          <h1 className="about-title reveal">
            Engineer by training, <em>explorer</em> by habit.
          </h1>

          <div className="profile-summary glass reveal">
            <h2>{profile.name}</h2>
            <span className="role-tag">CS Engineer · ML &amp; AI · Frontend Dev</span>
            <p>
              Motivated and detail-oriented Computer Science Engineer with a strong foundation in
              Machine Learning &amp; AI, Frontend Development, and Data Analysis. Experienced in building
              predictive models, developing responsive web applications, and creating data-driven
              insights using Power BI and Excel. Skilled in combining technical innovation with analytical
              thinking to deliver impactful academic and practical solutions. Passionate about applying
              AI, data, and visualization tools to solve real-world problems and support decision-making.
            </p>
            <div className="about-links">
              <a href={profile.github} target="_blank" rel="noreferrer"><FaGithub /> GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer"><FaLinkedinIn /> LinkedIn</a>
              <span><FaMapMarkerAlt /> Dhaka, Bangladesh</span>
            </div>
          </div>
        </div>

        <figure className="profile-image reveal">
          <div className="profile-stack">
            <span className="profile-plate profile-plate--back" aria-hidden="true" />
            <span className="profile-plate profile-plate--mid" aria-hidden="true" />
            <div className="profile-frame">
              <img src={my_photo} alt="Md. Abdullah Al Jaber" />
              <span className="corner corner--tl" /><span className="corner corner--br" />
            </div>
            <div className="profile-tag profile-tag--a glass"><small>Based in</small>Dhaka, BD</div>
            <div className="profile-tag profile-tag--b glass"><small>Focus</small>ML · AI · Web</div>
          </div>
          <figcaption className="profile-badge glass">
            <i /> Open to work
          </figcaption>
        </figure>
      </section>

      {/* ═════ What I do ═════ */}
      <section className="about-focus container">
        <SectionHead index="02" eyebrow="What I do" title="Three ways I" accent="create value." />
        <div className="focus-grid">
          {FOCUS.map((f, i) => (
            <article key={f.title} className="focus-card glass tilt" style={{ "--i": i }}>
              <span className="focus-no">0{i + 1}</span>
              <span className="ach-icon"><Icon name={f.icon} /></span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
              <ul className="tech-chips">{f.tags.map((t) => <li key={t}>{t}</li>)}</ul>
            </article>
          ))}
        </div>

        <ul className="disc-strip reveal" aria-label="Disciplines">
          {techCategories.map((c) => (
            <li key={c.id} style={{ "--c": c.color }}><Icon name={c.icon} />{c.long}</li>
          ))}
        </ul>
      </section>

      {/* ═════ Journey ═════ */}
      <section className="about-journey container">
        <SectionHead index="03" eyebrow="Journey" title="Where I’ve" accent="been & learned." />
        <div className="journey-grid">
          <div className="journey-col">
            <h3 className="col-label reveal">Experience</h3>
            <Timeline items={experience} />
          </div>
          <div className="journey-col">
            <h3 className="col-label reveal">Education</h3>
            <Timeline items={education} variant="edu" />
          </div>
        </div>
      </section>

      {/* ═════ Achievements ═════ */}
      <section className="about-ach container">
        <SectionHead index="04" eyebrow="Achievements" title="Recognition &" accent="milestones." />
        <AchievementGrid items={achievements} />
        {certifications.length > 0 && (
          <>
            <h3 className="col-label reveal" style={{ marginTop: 56 }}>Certifications</h3>
            <CertGrid items={certifications} />
          </>
        )}
      </section>

      {/* ═════ Links ═════ */}
      <section className="bottom-grid container">
        <Link to="/my_resume" className="card glass">
          More about me<span>Resume &amp; credentials</span><ArrowIcon size={18} />
        </Link>
        <Link to="/contact" className="card card-hot center">
          Let's <span>work together.</span><ArrowIcon size={18} />
        </Link>
        <a href={profile.github} target="_blank" rel="noreferrer" className="card glass">
          Stay with me<span>Code &amp; profiles</span><ArrowIcon size={18} />
        </a>
      </section>
    </div>
  );
};

export default About;
