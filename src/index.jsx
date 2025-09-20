import { Routes, Route, Link, useNavigate } from "react-router-dom";
import About from "./About.jsx";
import Projects from "./Project.jsx";
import logo from "./assets/logo.png";
import my_photo from "./assets/my_photo3.png";
import Work_Together from "./Work_Together.jsx";
import Resume from "./Resume.jsx";

function Message() {
  const navigate = useNavigate(); // ✅ add this

  return (
    <div>
      <marquee direction="right" style={{color:"white"}}
        >This website is now under construction</marquee> 

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
        {/* My Resume Button */}
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

        <Route path="/contact" element={<Work_Together />}/>

        <Route path="/my_resume" element={<Resume />}/>
        <Route
          path="/"
          element={
            <div className="home-container">
              {/* Left Side */}
              <div className="home-text">
                <h1>
                  Hi, I’m <span className="highlight">Md.Abdullah Al Jaber</span>
                </h1>
                <h2>
                  A Passionate{" "}
                  <span className="highlight-alt">Web Developer & Data Scientist</span>
                </h2>
                <p>
                  I specialize in building modern, responsive websites and
                  applications that deliver excellent user experiences.
                </p>
                <button onClick={() => navigate("/Work_Together")}>
                  Let's Work Together
                </button>
              </div>

              {/* Right Side */}
              <div className="home-image">
                <img className="image_box" src={my_photo} alt="Your Profile" />
              </div>
            </div>
          }
        />
      </Routes>
      <footer>
            <p>&copy; {new Date().getFullYear()}Jaber</p>
      </footer>
    </div>
    
  );
}

export default Message;
