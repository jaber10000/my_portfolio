import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import JabuAvatar from "./JabuAvatar.jsx";
import "./Css/Chatbot.css";

const API_URL = import.meta.env.VITE_CHATBOT_API_URL || "http://localhost:8000";

const quickActions = [
  { label: "Home", route: "/" },
  { label: "Projects", route: "/projects" },
  { label: "About Jaber", route: "/about" },
  { label: "Resume", route: "/my_resume" },
  { label: "Contact", route: "/contact" },
];

// Turns raw URLs in a bot answer into clickable links.
const renderText = (text) =>
  text.split(/(https?:\/\/[^\s)]+)/g).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>
        {part}
      </a>
    ) : (
      part
    )
  );

function Chatbot() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(true);
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(false);
  const bodyRef = useRef(null);
  const welcomedRef = useRef(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      if (!welcomedRef.current) {
        welcomedRef.current = true;
        setShowWelcomeBubble(true);
        setUnread(true);

        // Keep the Messenger-style welcome bubble visible for a few seconds.
        setTimeout(() => setShowWelcomeBubble(false), 6000);
      }
    }, 3000);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, loading]);

  const openChat = () => {
    setOpen(true);
    setUnread(false);
    setShowWelcomeBubble(false);

    if (messages.length === 0) {
      setMessages([
        {
          role: "bot",
          text: "Assalamu Alaikum! 😊 Ami JabuAi. Portfolio niye ki jante chan? Skill, Project, Resume naki Contact?",
        },
      ]);
    }
  };

  const addMessage = (role, text, action) => {
    setMessages((prev) => [...prev, { role, text, action }]);
  };

  // NOTE: chat history lives only in React state (memory). Nothing is written to
  // localStorage / sessionStorage / a database, so a page reload starts fresh.
  const sendMessage = async (event) => {
    event?.preventDefault();
    const question = input.trim();
    if (!question || loading) return;

    // Last few turns are sent along so follow-up questions ("and the second one?") work.
    const history = messages.slice(-8).map(({ role, text }) => ({ role, text }));

    addMessage("user", question);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, history }),
      });

      if (!response.ok) throw new Error("Chat service unavailable");
      const data = await response.json();
      addMessage("bot", data.answer, data.route || null);
    } catch (error) {
      addMessage(
        "bot",
        "Oops! Ekhon amar AI service-e connection hocche na. Apni chaile niche theke Portfolio page-e direct jete paren. 😊"
      );
    } finally {
      setLoading(false);
    }
  };

  const goTo = (route) => {
    setOpen(false);
    navigate(route);
  };

  return (
    <>
      {open && (
        <section className="jabu-chat" aria-label="JabuAi chat window">
          <header className="jabu-chat-header">
            <JabuAvatar size={42} online />
            <div>
              <strong>JabuAi</strong>
              <span>Portfolio Assistant · Online</span>
            </div>
            <button className="jabu-close" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </header>

          <div className="jabu-chat-body" ref={bodyRef}>
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`jabu-message-row ${message.role}`}>
                {message.role === "bot" && <JabuAvatar size={28} className="in-chat" />}
                <div className={`jabu-message ${message.role}`}>
                  {renderText(message.text)}
                  {message.action && (
                    <button className="jabu-action" onClick={() => goTo(message.action)}>
                      Open page →
                    </button>
                  )}
                </div>
              </div>
            ))}

            {messages.length === 0 && (
              <div className="jabu-empty">Ask me about Jaber's skills, projects, experience or contact info.</div>
            )}

            {loading && (
              <div className="jabu-message-row bot">
                <JabuAvatar size={28} className="in-chat" />
                <div className="jabu-message bot typing"><span></span><span></span><span></span></div>
              </div>
            )}
          </div>

          <div className="jabu-quick-actions">
            {quickActions.map((item) => (
              <button key={item.route} onClick={() => goTo(item.route)}>{item.label}</button>
            ))}
          </div>

          <form className="jabu-input-wrap" onSubmit={sendMessage}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask in Bangla, English or Banglish..."
              aria-label="Message JabuAi"
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()} aria-label="Send message">➤</button>
          </form>
        </section>
      )}

      {showWelcomeBubble && !open && (
        <button
          className="jabu-welcome-bubble"
          onClick={openChat}
          aria-label="Open JabuAi welcome message"
        >
          <span className="jabu-welcome-close" aria-hidden="true">×</span>
          <strong>Assalamu Alaikum! 👋</strong>
          <span>Ami JabuAi. Portfolio niye ki jante chan?</span>
        </button>
      )}

      <button
        className={`jabu-fab ${open ? "open" : ""}`}
        onClick={openChat}
        aria-label="Open JabuAi"
        title="Chat with JabuAi"
      >
        <span className="jabu-fab-ring" />
        <JabuAvatar size={54} />
        {unread && !open && <span className="jabu-notification-dot" />}
      </button>
    </>
  );
}

export default Chatbot;
