import { useEffect, useRef } from "react";

/* Tech tag → icon mapping (devicon CDN for brand icons, emoji for concepts).
   Moved out of Project.jsx so Home and Projects share one implementation. */
const DEV = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
export const TECH_ICONS = {
  Python: { svg: `${DEV}/python/python-original.svg` },
  TensorFlow: { svg: `${DEV}/tensorflow/tensorflow-original.svg` },
  FastAPI: { svg: `${DEV}/fastapi/fastapi-original.svg` },
  React: { svg: `${DEV}/react/react-original.svg` },
  HTML: { svg: `${DEV}/html5/html5-original.svg` },
  CSS: { svg: `${DEV}/css3/css3-original.svg` },
  JavaScript: { svg: `${DEV}/javascript/javascript-original.svg` },
  PHP: { svg: `${DEV}/php/php-original.svg` },
  Flutter: { svg: `${DEV}/flutter/flutter-original.svg` },
  Firebase: { svg: `${DEV}/firebase/firebase-plain.svg` },
  Dart: { svg: `${DEV}/dart/dart-original.svg` },
  ML: { emoji: "🤖" },
  NLP: { emoji: "💬" },
  OpenCV: { svg: `${DEV}/opencv/opencv-original.svg` },
  Sklearn: { emoji: "📊" },
  "Federated Learning": { emoji: "🔐" },
  FedAvg: { emoji: "🔄" },
  "U-Net": { emoji: "🧠" },
  Transformer: { emoji: "🧩" },
  BERT: { emoji: "📚" },
  "XLM-RoBERTa": { emoji: "🌐" },
  BanglaBERT: { emoji: "🇧🇩" },
  BiLSTM: { emoji: "🔁" },
  LIME: { emoji: "🍋" },
  SHAP: { emoji: "📈" },
};

/* <video> for .mp4/.webm (plays only while visible), <img> otherwise */
const isVideo = (src) => /\.(mp4|webm)(\?|$)/i.test(src || "");

export function Media({ src, alt }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, [src]);
  return isVideo(src)
    ? <video ref={ref} src={src} muted loop playsInline preload="metadata" aria-label={alt} />
    : <img src={src} alt={alt} loading="lazy" />;
}

export function TechBadge({ tech }) {
  const info = TECH_ICONS[tech] || { emoji: "⚙️" };
  return (
    <span className="tech-badge">
      {info.svg
        ? <img src={info.svg} alt="" className="tech-badge-icon" />
        : <span className="tech-badge-emoji">{info.emoji}</span>}
      {tech}
    </span>
  );
}
