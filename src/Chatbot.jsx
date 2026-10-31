import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [slow, setSlow] = useState(false); // true when the server takes > 10s (free hosting cold start)
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
          text: "Assalamu Alaikum! 😊 Ami TumiAI. Portfolio niye ki jante chan? Skill, Project, Resume naki Contact?",
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
    setSlow(false);

    const slowTimer = setTimeout(() => setSlow(true), 10000);
    const controller = new AbortController();
    const abortTimer = setTimeout(() => controller.abort(), 90000);

    try {
      const response = await fetch(`${API_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, history }),
        signal: controller.signal,
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
      clearTimeout(slowTimer);
      clearTimeout(abortTimer);
      setSlow(false);
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
        <section className="tumi-chat" aria-label="TumiAI chat window">
          <header className="tumi-chat-header">
            <div className="tumi-bot-avatar small" aria-hidden="true">🤖</div>
            <div>
              <strong>TumiAI</strong>
              <span>Portfolio Assistant · Online</span>
            </div>
            <button className="tumi-close" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </header>

          <div className="tumi-chat-body" ref={bodyRef}>
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`tumi-message-row ${message.role}`}>
                <div className={`tumi-message ${message.role}`}>
                  {renderText(message.text)}
                  {message.action && (
                    <button className="tumi-action" onClick={() => goTo(message.action)}>
                      Open page →
                    </button>
                  )}
                </div>
              </div>
            ))}

            {messages.length === 0 && (
              <div className="tumi-empty">Ask me about Jaber's skills, projects, experience or contact info.</div>
            )}

            {loading && (
              <div className="tumi-message-row bot">
                <div className="tumi-message bot typing"><span></span><span></span><span></span></div>
              </div>
            )}

            {loading && slow && (
              <div className="tumi-message-row bot">
                <div className="tumi-message bot">
                  ⏳ Server ekhon run hocche (free hosting, ghumiye chilo). Please 1 minute wait korun — tarpor uttor chole asbe.
                </div>
              </div>
            )}
          </div>

          <div className="tumi-quick-actions">
            {quickActions.map((item) => (
              <button key={item.route} onClick={() => goTo(item.route)}>{item.label}</button>
            ))}
          </div>

          <form className="tumi-input-wrap" onSubmit={sendMessage}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Banglay question korun..."
              aria-label="Message TumiAI"
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()} aria-label="Send message">➤</button>
          </form>
        </section>
      )}

      {showWelcomeBubble && !open && (
        <button
          className="tumi-welcome-bubble"
          onClick={openChat}
          aria-label="Open TumiAI welcome message"
        >
          <span className="tumi-welcome-close" aria-hidden="true">×</span>
          <strong>Assalamu Alaikum! 👋</strong>
          <span>Ami TumiAI. Portfolio niye ki jante chan?</span>
        </button>
      )}

      <button
        className={`tumi-fab ${open ? "open" : ""}`}
        onClick={openChat}
        aria-label="Open TumiAI"
        title="Chat with TumiAI"
      >
        <span className="tumi-fab-ring" />
        <span className="tumi-bot-avatar">🤖</span>
        {unread && !open && <span className="tumi-notification-dot" />}
      </button>
    </>
  );
}

export default Chatbot;
