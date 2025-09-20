import my_photo from "./assets/y_wedding.jpg";
import "./Css/About.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>SELF-SUMMARY</h1>
      </div>

      <div className="profile-section">
        <div className="profile-image">
          <img src={my_photo} alt="Zion" />
        </div>
        <div className="profile-summary">
          <h2>Md. Abdullah Al Jaber</h2>
          <p>
            Driven problem solver and accomplished React, Django developer with a solid foundation in object-oriented programming.
            Eager to utilize expertise in building innovative Web
            applications and contributing to team success through advanced
            technical skills and collaborative mindset.
          </p>
        </div>
      </div>

      <div className="boxes">
        <div className="box">
          <h3>EXPERIENCE</h3>
          <ul>
            <li>
              <strong>Fornt End Developer</strong><br />
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
              Jan-2025 – April-2025 Sesion<br />
              Daffodil International University
            </li>
          </ul>
        </div>

        <div className="box">
          <h3>EDUCATION</h3>
          <ul>
            
            <li>
              <strong>BSc in CSE</strong><br />
              2021 – 2025<br />
              Daffodil International University
            </li>
            <li>
              <strong>HSC</strong><br />
              2018 – 2019<br />
              Gov't BM College,Barisal
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
        <div className="card">STAY WITH ME<br /><span>Profiles</span></div>
        <div className="card center">Let's <span>work together.</span></div>
        <div className="card">MORE ABOUT ME<br /><span>Credentials</span></div>
      </div>
    </div>
  );
};

export default About;
