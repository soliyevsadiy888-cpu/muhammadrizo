import React, { useMemo } from "react";
import { COLORS } from "../../theme";
import { AppleEmoji } from "../../components/ui/AppleEmoji";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { position: "relative", height: 120, overflow: "hidden", marginBottom: 16 } as const;
const __style2 = { position: "absolute", bottom: 0, left: 0, right: 0,
        height: 32, background: "linear-gradient(transparent, #08131F)" } as const;


export function FishRain({ items }) {
  const fishes = useMemo(() => items.flatMap((it) =>
    Array.from({ length: Math.min(it.qty || 1, 3) }, (_, i) => ({
      key: `${it.id}-${i}`, img: it.img,
      x: 5 + Math.random() * 90, delay: Math.random() * 2.5, dur: 2 + Math.random() * 1.5,
      size: 22 + Math.random() * 16,
    }))
  ), []);
  const confetti = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    key: i, x: Math.random() * 100, delay: Math.random() * 2,
    dur: 1.8 + Math.random() * 1.2,
    color: [COLORS.teal,COLORS.amber,COLORS.green2,"#60A5FA","#F472B6"][i % 5],
    size: 5 + Math.random() * 5,
  })), []);

  return (
    <div style={__style1}>
      <style>{`
        @keyframes fishSwim {
          0%  { transform:translateY(0) scale(1);   opacity:0; }
          15% { opacity:1; }
          85% { opacity:1; }
          100%{ transform:translateY(-120px) scale(0.5); opacity:0; }
        }
        @keyframes confettiFall {
          0%  { transform:translateY(-10px) rotate(0deg); opacity:0; }
          10% { opacity:1; }
          90% { opacity:0.8; }
          100%{ transform:translateY(120px) rotate(360deg); opacity:0; }
        }
      `}</style>
      {confetti.map((c) => (
        <div key={c.key} style={{
          position: "absolute", bottom: 0, left: `${c.x}%`,
          width: c.size, height: c.size * 0.4,
          background: c.color, borderRadius: 2,
          animation: `confettiFall ${c.dur}s ease-in ${c.delay}s both`,
        }} />
      ))}
      {fishes.map((f) => (
        <span key={f.key} style={{
          position: "absolute", bottom: 0, left: `${f.x}%`,
          lineHeight: 1, display: "inline-block",
          animation: `fishSwim ${f.dur}s ease-in ${f.delay}s both`,
        }}><AppleEmoji e={f.img} size={f.size} /></span>
      ))}
      <div style={__style2} />
    </div>
  );
}

/* ── Экран загрузки при оформлении заказа ────────────────── */
