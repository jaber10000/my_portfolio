import my_photo from "./assets/my_photo.png";
import "./Css/About.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>SELF-SUMMARY</h1>
      </div>

      <div className="profile-section">
        <div className="profile-image">
          <img src={my_photo} alt="jaber" />
        </div>
        <div className="profile-summary">
          <h2>Md. Abdullah Al Jaber</h2>
          <span className="role-tag">CS Engineer · ML & AI · Frontend Dev</span>
          <p>
            Motivated and detail-oriented Computer Science Engineer with a strong foundation in
            Machine Learning &amp; AI, Frontend Development, and Data Analysis. Experienced in building
            predictive models, developing responsive web applications, and creating data-driven
            insights using Power BI and Excel. Skilled in combining technical innovation with analytical
            thinking to deliver impactful academic and practical solutions. Passionate about applying
            AI, data, and visualization tools to solve real-world problems and support decision-making.
          </p>
        </div>
      </div>

      <div className="boxes">
        <div className="box">
          <h3>Experience</h3>
          <ul>
            <li>
              <strong>Front End Developer</strong><br />
              Aug-2025 – Current<br />
              IT Company
            </li>
            <li>
              <strong>Student Data Scientist</strong><br />
              Jan-2024 – Aug-2025<br />
              Daffodil International University
            </li>
            <li>
              <strong>Dataset Contest Winner</strong><br />
              Jan-2025 – April-2025 Session<br />
              Daffodil International University
            </li>
          </ul>
        </div>

        <div className="box">
          <h3>Education</h3>
          <ul>
            <li>
              <strong>BSc in CSE</strong><br />
              2021 – 2025<br />
              Daffodil International University
            </li>
            <li>
              <strong>HSC</strong><br />
              2018 – 2019<br />
              Gov't BM College, Barisal
            </li>
            <li>
              <strong>SSC</strong><br />
              2016 – 2017<br />
              Jhalakathi N S Kamil Madrasah
            </li>
          </ul>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="card">STAY WITH ME<span>Profiles</span></div>
        <div className="card center">Let's <span>work together.</span></div>
        <div className="card">MORE ABOUT ME<span>Credentials</span></div>
      </div>
    </div>
  );
};

export default About;
