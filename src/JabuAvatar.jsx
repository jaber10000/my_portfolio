import "./Css/JabuAvatar.css";

/*
  JabuAi's face. Picks the first image it finds, so you never have to touch code to change it:

    1. src/assets/jabuai.(png|jpg|jpeg|webp|svg)  ← drop a cartoon / cute version of your photo here
    2. src/assets/my_photo3.png                   ← your hero-section photo (already in your project)
    3. the built-in cute robot mascot below       ← used if neither file exists

  import.meta.glob returns {} when no file matches, so a missing image never breaks the build.
*/
const custom = import.meta.glob("./assets/jabuai.{png,jpg,jpeg,webp,svg}", { eager: true, import: "default" });
const hero = import.meta.glob("./assets/my_photo3.png", { eager: true, import: "default" });
const AVATAR_SRC = Object.values(custom)[0] || Object.values(hero)[0] || null;

function Mascot() {
  return (
    <svg viewBox="0 0 64 64" className="jabu-mascot" role="img" aria-label="JabuAi mascot">
      <defs>
        <linearGradient id="jabuFace" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7CF2D2" />
          <stop offset="1" stopColor="#1DCD9F" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="#0f2f2a" />
      <rect x="10" y="14" width="44" height="38" rx="16" fill="url(#jabuFace)" />
      <rect x="15" y="21" width="34" height="24" rx="11" fill="#0b1f1c" />
      <ellipse cx="25" cy="32" rx="4.2" ry="5" fill="#fff" />
      <ellipse cx="39" cy="32" rx="4.2" ry="5" fill="#fff" />
      <circle cx="26.2" cy="30.6" r="1.6" fill="#0b1f1c" />
      <circle cx="40.2" cy="30.6" r="1.6" fill="#0b1f1c" />
      <circle cx="19.5" cy="39.5" r="3" fill="#ff8fab" opacity=".75" />
      <circle cx="44.5" cy="39.5" r="3" fill="#ff8fab" opacity=".75" />
      <path d="M27.5 40 Q32 44.5 36.5 40" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <rect x="4" y="29" width="5" height="10" rx="2.5" fill="#1DCD9F" />
      <rect x="55" y="29" width="5" height="10" rx="2.5" fill="#1DCD9F" />
    </svg>
  );
}

export default function JabuAvatar({ size = 44, className = "", online = false }) {
  return (
    <span className={`jabu-avatar ${className}`} style={{ "--jabu-size": `${size}px` }} aria-hidden="true">
      <span className="jabu-avatar-face">
        {AVATAR_SRC ? <img src={AVATAR_SRC} alt="" draggable="false" /> : <Mascot />}
      </span>
      <span className="jabu-avatar-antenna" />
      <span className="jabu-avatar-badge">🤖</span>
      {online && <span className="jabu-avatar-online" />}
    </span>
  );
}
