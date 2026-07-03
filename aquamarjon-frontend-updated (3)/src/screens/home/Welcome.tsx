import React from "react";
import { COLORS } from "../../theme";
import { AppleEmoji } from "../../components/ui/AppleEmoji";
import { Bubbles } from "../../components/ui/Bubbles";
import { Sticker } from "../../components/ui/Sticker";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = {
        position: "relative",
        minHeight: "100vh",
        background: "radial-gradient(ellipse at top, #0E2235 0%, #08131F 70%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        textAlign: "center",
        color: COLORS.text,
      } as const;
const __style2 = { marginBottom: 8, animation: "swim 3s ease-in-out infinite" } as const;
const __style3 = {
          fontSize: 32,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          margin: "8px 0 6px",
          fontFamily: "Georgia, serif",
        } as const;
const __style4 = { fontSize: 15, color: COLORS.soft, maxWidth: 280, lineHeight: 1.5, marginBottom: 28 } as const;
const __style5 = { display: "flex", gap: 18, marginBottom: 36 } as const;
const __style6 = { width: 84 } as const;
const __style7 = { display: "flex", justifyContent: "center", marginBottom: 4 } as const;
const __style8 = { fontSize: 12, fontWeight: 700, marginTop: 4, textAlign: "center" } as const;
const __style9 = { fontSize: 11, color: COLORS.muted, textAlign: "center" } as const;
const __style10 = {
          background: COLORS.teal,
          color: COLORS.bg,
          border: "none",
          borderRadius: 14,
          padding: "14px 36px",
          fontSize: 16,
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(0,201,177,0.35)",
        } as const;


export function Welcome({ onNext }) {
  return (
    <div
      style={__style1}
    >
      <Bubbles count={16} />
      <div style={__style2}><AppleEmoji e="🐠" size={56} /></div>
      <h1
        style={__style3}
      >
        AquaMarjon
      </h1>
      <p style={__style4}>
        Живые рыбы. Честные цены.<br />Доставка сегодня.
      </p>

      <div style={__style5}>
        {[
          ["✅", "Гарантия", "48 часов"],
          ["🚚", "Доставка", "по городу"],
          ["🐠", "300+", "видов рыб"],
        ].map(([icon, t, s]) => (
          <div key={t} style={__style6}>
            <div style={__style7}><Sticker e={icon} size={36} /></div>
            <div style={__style8}>{t}</div>
            <div style={__style9}>{s}</div>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        style={__style10}
      >
        Выбрать рыбу →
      </button>

      <style>{`
        @keyframes swim {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          50% { transform: translateX(8px) rotate(3deg); }
        }
      `}</style>
    </div>
  );
}

/* ---------- City picker ---------- */
