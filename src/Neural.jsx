import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { techCategories } from "./siteData.js";

const calm = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

function useMedia(q) {
  const [m, setM] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const f = () => setM(mq.matches);
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, [q]);
  return m;
}

/* ════════════════════════════════════════════════════════════════
   HERO — a rotating holographic neural sphere (plain canvas 2D, no Three.js).
   • nodes sit on a fibonacci sphere, neighbours are linked, light pulses run along the links
   • three great-circle rings + one scanning ring give the "hologram" look
   • moving the mouse tilts / turns the sphere slightly (fine pointers only)
   • pauses off-screen / in a background tab, draws one still frame for reduced-motion
   ════════════════════════════════════════════════════════════════ */
export function NeuralSphere({ className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv.getContext("2d");
    const still = calm();
    const small = window.matchMedia("(max-width: 768px)").matches;
    const N = small ? 46 : 72;
    const LINK = small ? 0.8 : 0.62;

    const pts = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const a = i * 2.399963; // golden angle
      pts.push({ x: Math.cos(a) * r, y, z: Math.sin(a) * r, spark: i % 7 === 0 });
    }
    const edges = [];
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y, pts[i].z - pts[j].z);
        if (d < LINK) edges.push([i, j]);
      }
    }
    const pulses = Array.from({ length: small ? 4 : 7 }, () => ({
      e: Math.floor(Math.random() * edges.length), t: Math.random(), v: 0.35 + Math.random() * 0.45,
    }));

    let W = 0, R = 0, frame = 0, cols = {};
    const mouse = { tx: 0, ty: 0, x: 0, y: 0 };

    const read = () => {
      const s = getComputedStyle(document.documentElement);
      const g = (n, d) => s.getPropertyValue(n).trim() || d;
      cols = {
        a: g("--g1", "#1DCD9F"), b: g("--g2", "#22d3ee"), c: g("--g3", "#8b5cf6"), d: g("--g4", "#ff4ecd"),
        boost: document.documentElement.dataset.theme === "light" ? 1.35 : 1,
      };
    };
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.clientWidth;
      R = W * 0.34;
      cv.width = cv.height = Math.round(W * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    // rotate (yaw about Y, pitch about X) then perspective-project -> [sx, sy, depth(-1..1), scale]
    const proj = (x, y, z, yaw, pit) => {
      const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pit), sp = Math.sin(pit);
      const x1 = x * cy + z * sy, z1 = -x * sy + z * cy;
      const y2 = y * cp - z1 * sp, z2 = y * sp + z1 * cp;
      const s = 4 / (4 - z2);
      return [W / 2 + x1 * R * s, W / 2 + y2 * R * s, z2, s];
    };

    const draw = (t, dt) => {
      if (!W) return;
      if (frame++ % 90 === 0) read(); // picks up theme toggles
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      const yaw = t * 0.28 + mouse.x, pit = 0.32 + mouse.y, k = cols.boost;
      ctx.clearRect(0, 0, W, W);
      const P = pts.map((p) => proj(p.x, p.y, p.z, yaw, pit));

      const ring = (fn, color, alpha) => {
        ctx.strokeStyle = color; ctx.lineWidth = 1;
        let prev = null;
        for (let i = 0; i <= 64; i++) {
          const q = proj(...fn((i / 64) * Math.PI * 2), yaw, pit);
          if (prev) {
            ctx.globalAlpha = alpha * (0.25 + 0.75 * ((q[2] + prev[2]) / 4 + 0.5)) * k;
            ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(q[0], q[1]); ctx.stroke();
          }
          prev = q;
        }
      };
      ring((a) => [Math.cos(a), 0, Math.sin(a)], cols.c, 0.22);
      ring((a) => [Math.cos(a), Math.sin(a), 0], cols.b, 0.16);
      ring((a) => [0, Math.cos(a), Math.sin(a)], cols.a, 0.16);
      const ys = Math.sin(t * 0.9) * 0.85, rr = Math.sqrt(1 - ys * ys); // scanning ring
      ring((a) => [Math.cos(a) * rr, ys, Math.sin(a) * rr], cols.b, 0.6);

      ctx.lineWidth = 1;
      for (const [i, j] of edges) {
        const a = P[i], b = P[j], d = (a[2] + b[2]) / 2;
        ctx.globalAlpha = (0.08 + 0.4 * ((d + 1) / 2)) * k;
        ctx.strokeStyle = d > 0.2 ? cols.b : cols.c;
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
      }

      if (!still) {
        for (const p of pulses) {
          p.t += p.v * dt;
          if (p.t > 1) { p.t = 0; p.e = Math.floor(Math.random() * edges.length); }
          const [i, j] = edges[p.e], a = P[i], b = P[j];
          const x = a[0] + (b[0] - a[0]) * p.t, y = a[1] + (b[1] - a[1]) * p.t, d = (a[2] + b[2]) / 2;
          ctx.fillStyle = cols.d;
          ctx.globalAlpha = 0.35 * k; ctx.beginPath(); ctx.arc(x, y, 6, 0, 7); ctx.fill();
          ctx.globalAlpha = (0.5 + 0.5 * ((d + 1) / 2)); ctx.beginPath(); ctx.arc(x, y, 2.2, 0, 7); ctx.fill();
        }
      }

      for (let i = 0; i < N; i++) {
        const q = P[i], d = (q[2] + 1) / 2, r = (1.2 + 2.4 * d) * q[3];
        ctx.fillStyle = pts[i].spark ? cols.d : cols.a;
        ctx.globalAlpha = 0.14 * d * k; ctx.beginPath(); ctx.arc(q[0], q[1], r * 3, 0, 7); ctx.fill();
        ctx.globalAlpha = Math.min(1, (0.35 + 0.65 * d) * k); ctx.beginPath(); ctx.arc(q[0], q[1], r, 0, 7); ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0, last = 0, run = false, onScreen = false;
    const loop = (ms) => {
      const t = ms / 1000;
      draw(t, Math.min(0.05, t - last || 0.016));
      last = t;
      raf = requestAnimationFrame(loop);
    };
    const start = () => { if (run || still) return; run = true; last = 0; raf = requestAnimationFrame(loop); };
    const stop = () => { run = false; cancelAnimationFrame(raf); };

    const ro = new ResizeObserver(() => { size(); if (still) draw(1.2, 0); });
    ro.observe(cv);
    size(); read();
    if (still) draw(1.2, 0);

    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; onScreen && !document.hidden ? start() : stop(); });
    io.observe(cv);
    const onVis = () => (document.hidden ? stop() : onScreen && start());
    document.addEventListener("visibilitychange", onVis);

    const onMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth * 2 - 1) * 0.6;   // left/right turns the sphere
      mouse.ty = (e.clientY / window.innerHeight * 2 - 1) * 0.35; // up/down tilts it
    };
    const hasCursor = !still && fine();
    if (hasCursor) window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      stop(); ro.disconnect(); io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

/* ════════════════════════════════════════════════════════════════
   SKILLS — animated neural diagram (SVG + framer-motion).
   Skills come from techCategories in siteData.js. Hover / tap a branch to follow its signal.
   ════════════════════════════════════════════════════════════════ */
const NET = techCategories.map((c) => ({ id: c.id, label: c.label, color: c.color, leaves: c.net }));
const pillW = (s) => Math.round(s.length * 7.4 + 26);
const curve = (x1, y1, x2, y2) => {
  const dx = (x2 - x1) * 0.5;
  return `M${x1} ${y1} C${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}`;
};

function buildLayout(tall) {
  const n = NET.length;
  const W = tall ? 360 : 720, H = tall ? 60 + n * 140 : 40 + n * 96;
  const center = { x: tall ? 26 : 60, y: H / 2, r: tall ? 14 : 30 };
  const hubLeft = tall ? 60 : 230, leafLeft = tall ? 222 : 560;
  const hy = (i) => (tall ? 90 + i * 140 : 68 + i * 96);
  const gap = tall ? 38 : 34;
  const hubs = NET.map((h, i) => {
    const w = pillW(h.label);
    const hub = { ...h, x: hubLeft, y: hy(i), w };
    hub.toHub = curve(center.x + center.r, center.y, hub.x, hub.y);
    hub.nodes = h.leaves.map((label, k) => {
      const n = { label, x: leafLeft, y: hy(i) + (k - 1) * gap, w: pillW(label) };
      n.d = curve(hub.x + w, hub.y, n.x, n.y);
      return n;
    });
    return hub;
  });
  return { W, H, center, hubs };
}

export function SkillNet({ active: activeProp, onActive }) {
  const ref = useRef(null);
  const tall = useMedia("(max-width: 640px)");
  const still = calm();
  const seen = useInView(ref, { once: true, amount: 0.25 });
  const show = seen || still;
  const [inner, setInner] = useState(null);
  const controlled = typeof onActive === "function";
  const active = controlled ? activeProp : inner;
  // controlled: the parent keeps the last hovered / tapped branch (pointer-leave never clears it)
  const setActive = controlled
    ? (v) => { const id = typeof v === "function" ? v(active) : v; if (id) onActive(id); }
    : setInner;
  const L = useMemo(() => buildLayout(tall), [tall]);
  const dim = (id) => (active && active !== id ? "net-dim" : "");
  const ease = [0.2, 0.8, 0.2, 1];
  const T = (delay, d = 0.9) => (still ? { duration: 0 } : { duration: d, delay, ease });

  const summary = NET.map((h) => `${h.label}: ${h.leaves.join(", ")}`).join(". ");

  return (
    <div className="skillnet" ref={ref}>
      <svg viewBox={`0 0 ${L.W} ${L.H}`} role="img" aria-label={`Skill network. ${summary}`}>
        {L.hubs.map((hub, i) => (
          <g key={hub.id} className={`net-branch ${dim(hub.id)}`} style={{ color: hub.color }}>
            <motion.path className="net-edge" d={hub.toHub} style={{ stroke: hub.color }}
              initial={{ pathLength: 0 }} animate={{ pathLength: show ? 1 : 0 }} transition={T(0.1 + i * 0.12)} />
            {hub.nodes.map((n, k) => (
              <motion.path key={n.label} className="net-edge" d={n.d} style={{ stroke: hub.color }}
                initial={{ pathLength: 0 }} animate={{ pathLength: show ? 1 : 0 }} transition={T(0.7 + i * 0.12 + k * 0.08)} />
            ))}
            {show && !still && [hub.toHub, ...hub.nodes.map((n) => n.d)].map((d, k) => (
              <circle key={k} r="3" className="net-pulse" style={{ fill: hub.color }}>
                <animateMotion dur={`${2.6 + ((i + k) % 4) * 0.45}s`} begin={`${(k * 0.55) % 2}s`} repeatCount="indefinite" path={d} />
              </circle>
            ))}
          </g>
        ))}

        {/* centre */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: show ? 1 : 0 }} transition={T(0, 0.6)}>
          <circle className="net-halo net-halo-round" cx={L.center.x} cy={L.center.y} r={L.center.r + 8} style={{ fill: "var(--g2)" }} />
          <circle cx={L.center.x} cy={L.center.y} r={L.center.r} className="net-core" />
          {!tall && <text x={L.center.x} y={L.center.y + 4.5} textAnchor="middle" className="net-label net-label-strong">Skills</text>}
        </motion.g>

        {/* hubs + leaves */}
        {L.hubs.map((hub, i) => (
          <g key={hub.id} className={`net-node ${dim(hub.id)}`} style={{ color: hub.color }}
            onPointerEnter={() => setActive(hub.id)} onPointerLeave={() => setActive(null)}
            onClick={() => setActive((a) => (a === hub.id ? null : hub.id))}>
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: show ? 1 : 0 }} transition={T(0.5 + i * 0.12, 0.6)}>
              <rect className="net-halo" x={hub.x - 6} y={hub.y - 20} width={hub.w + 12} height={40} rx={20} style={{ fill: hub.color }} />
              <rect className="net-pill net-hub-pill" x={hub.x} y={hub.y - 14} width={hub.w} height={28} rx={14} style={{ stroke: hub.color }} />
              <text x={hub.x + hub.w / 2} y={hub.y + 4.5} textAnchor="middle" className="net-label net-label-strong">{hub.label}</text>
            </motion.g>
            {hub.nodes.map((n, k) => (
              <motion.g key={n.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: show ? 1 : 0, x: show ? 0 : -10 }}
                transition={T(1.1 + i * 0.12 + k * 0.08, 0.6)}>
                <rect className="net-pill" x={n.x} y={n.y - 12} width={n.w} height={24} rx={12} style={{ stroke: hub.color }} />
                <text x={n.x + n.w / 2} y={n.y + 4} textAnchor="middle" className="net-label">{n.label}</text>
              </motion.g>
            ))}
          </g>
        ))}
      </svg>
      <p className="net-caption">{tall ? "Tap" : "Hover"} a branch to follow the signal.</p>
    </div>
  );
}
