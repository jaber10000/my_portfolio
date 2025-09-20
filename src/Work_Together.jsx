import "./Css/Work_Together.css"
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebookF, FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";
import { SiTelegram } from "react-icons/si";
import React, { useRef } from "react";
import emailjs from "emailjs-com";

function Work_Together (){
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_b6wwcdm", 
        "template_sc5dlxl", 
        form.current,
        "uTtfqIXZ8mdIg4u3D" 
      )
      .then(
        (result) => {
          alert("Message Sent Successfully!");
          e.target.reset();
        },
        (error) => {
          alert("Failed to send message. Please try again later.");
        }
      );
  };
    return(
         <div className="contact-container">
      <div className="contact-wrapper">

        <div className="contact-left">
          <h2>CONTACT INFO</h2>

          <div className="info-block">
            <div className="icon"><FaEnvelope /></div>
            <div className="info-text">
              <p className="label">EMAIL ME</p>
              <p>jaber15-4458@diu.edu.bd</p>
              <p>bs10000jaber@gmail.com</p>
            </div>
          </div>

          <div className="info-block">
            <div className="icon"><FaPhone /></div>
            <div className="info-text">
              <p className="label">CONTACT ME</p>
              <a href="tel:01647271765" className="link">
                <SiTelegram /> 01647271765
              </a>
            </div>
          </div>

          <div className="info-block">
            <div className="icon"><FaMapMarkerAlt /></div>
            <div className="info-text">
              <p className="label">LOCATION</p>
              <p>Commerce College Road</p>
              <p>Mirpur-2, Dhaka</p>
              <p>Bangladesh</p>
            </div>
          </div>

          <div className="social-section">
            <p className="label">SOCIAL INFO</p>
            <div className="social-icons">
              <a href="https://www.facebook.com/share/1Xm4Wo3FYk/"><FaFacebookF /></a>
              <a href="https://www.linkedin.com/in/md-abdullah-al-jaber-699a1a266/"><FaLinkedinIn /></a>
              <a href="https://github.com/jaber10000"><FaGithub /></a>
            </div>
          </div>
        </div>

        {/* Right Section: Form */}
         <div className="contact-right">
      <h2 className="contact-heading">
        Let's work <span className="highlight">together.</span>
      </h2>

      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <input type="text" name="user_name" placeholder="Name *" required />
        <input type="email" name="user_email" placeholder="Email *" required />
        <input type="text" name="subject" placeholder="Your Subject *" required />
        <textarea name="message" placeholder="Your Message *" rows="5" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>

      </div>
    </div>
    )
}

export default Work_Together