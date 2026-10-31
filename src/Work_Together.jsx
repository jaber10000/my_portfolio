import "./Css/Work_Together.css";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { SiTelegram } from "react-icons/si";
import { SectionHead, ArrowIcon } from "./Ui.jsx";
import { profile } from "./siteData.js";
import React, { useRef, useState } from "react";

// ---- EmailJS (Gmail service) ------------------------------------------
// Fill these in from https://dashboard.emailjs.com (or put them in .env as
// VITE_EMAILJS_SERVICE_ID / VITE_EMAILJS_PUBLIC_KEY).
const EMAILJS = {
  serviceId: import.meta.env?.VITE_EMAILJS_SERVICE_ID || "service_hvoubob", // Email Services -> Service ID (e.g. service_xxxxxxx)
  publicKey: import.meta.env?.VITE_EMAILJS_PUBLIC_KEY || "uTtfqIXZ8mdIg4u3D", // Account -> General -> Public Key
  contactTemplateId: "template_sc5dlxl",   // Contact Us
  autoReplyTemplateId: "template_sw8kilv", // Auto-Reply
};

async function sendEmailJS(templateId, templateParams) {
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: EMAILJS.serviceId,
      template_id: templateId,
      user_id: EMAILJS.publicKey,
      template_params: templateParams,
    }),
  });
  if (!res.ok) throw new Error(`EmailJS ${res.status}: ${await res.text()}`);
}

function Work_Together() {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({ state: "idle", msg: "" });
  const submitting = useRef(false); // blocks double-clicks / double submits

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setStatus({ state: "sending", msg: "" });

    try {
      // Variables available inside both EmailJS templates
      const templateParams = {
        ...formData,
        // aliases, in case the template uses different variable names
        name: formData.user_name,
        email: formData.user_email,
        from_name: formData.user_name,
        from_email: formData.user_email,
        reply_to: formData.user_email,
        to_email: formData.user_email,
        title: formData.subject,
      };

      // 1) Contact Us template -> delivers the message to your inbox
      await sendEmailJS(EMAILJS.contactTemplateId, templateParams);

      // 2) Auto-Reply template -> confirmation to the visitor (non-blocking:
      //    the message already reached you, so a failure here is only logged)
      sendEmailJS(EMAILJS.autoReplyTemplateId, templateParams).catch((err) =>
        console.warn("Auto-reply failed:", err)
      );

      setStatus({ state: "ok", msg: "Message sent successfully — I'll get back to you soon." });

      setFormData({
        user_name: "",
        user_email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setStatus({ state: "error", msg: "Something went wrong. Please try again or email me directly." });
    } finally {
      submitting.current = false;
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-intro container">
        <SectionHead
          index="05"
          eyebrow="Contact"
          title="Let's work"
          accent="together."
          as="h1"
          sub="Open to AI/ML, generative AI and full-stack opportunities. Tell me what you're building — I usually reply within a day."
        />
      </div>

      <div className="contact-wrapper container">
        <div className="contact-left">
          <h2>CONTACT INFO</h2>

          <div className="info-block glass">
            <div className="icon"><FaEnvelope /></div>
            <div className="info-text">
              <p className="label">EMAIL ME</p>
              <a href={`mailto:${profile.emailAlt}`}>{profile.emailAlt}</a>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
          </div>

          <div className="info-block glass">
            <div className="icon"><FaPhone /></div>
            <div className="info-text">
              <p className="label">CONTACT ME</p>
              <a href="tel:01647271765" className="link">
                <SiTelegram /> 01647271765
              </a>
            </div>
          </div>

          <div className="info-block glass">
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
              <a href={profile.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
            </div>
          </div>
        </div>

        <div className="contact-right glass">
          <h2 className="contact-heading">
            Send a <span className="highlight">message.</span>
          </h2>

          <form onSubmit={sendEmail} className="contact-form">
            <label>
              <span>Name</span>
              <input type="text" name="user_name" placeholder="Your name *" value={formData.user_name} onChange={handleChange} required />
            </label>
            <label>
              <span>Email</span>
              <input type="email" name="user_email" placeholder="you@example.com *" value={formData.user_email} onChange={handleChange} required />
            </label>
            <label>
              <span>Subject</span>
              <input type="text" name="subject" placeholder="Your subject *" value={formData.subject} onChange={handleChange} required />
            </label>
            <label>
              <span>Message</span>
              <textarea name="message" placeholder="Tell me about your project *" rows="5" value={formData.message} onChange={handleChange} required />
            </label>

            <button type="submit" disabled={status.state === "sending"}>
              {status.state === "sending" ? "Sending…" : <>Send Message <ArrowIcon /></>}
            </button>

            {status.msg && (
              <p className={`form-status is-${status.state}`} role="status">{status.msg}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Work_Together;