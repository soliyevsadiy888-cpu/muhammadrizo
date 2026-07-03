import React from "react";
import { COLORS } from "../../theme";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { background: COLORS.bg2, border: `1px solid ${COLORS.border}`, borderRadius: 16,
      padding: "16px", marginBottom: 16, overflow: "hidden", position: "relative" } as const;
const __style2 = { position: "absolute", top: 0, right: 0, width: 80, height: 80,
        background: "radial-gradient(circle, #00C9B108, transparent 70%)", pointerEvents: "none" } as const;
const __style3 = { fontSize: 11, fontWeight: 700, color: COLORS.muted, marginBottom: 12,
        textTransform: "uppercase", letterSpacing: "0.07em" } as const;
const __style4 = { display: "flex", alignItems: "center", gap: 14 } as const;
const __style5 = { position: "relative", flexShrink: 0 } as const;
const __style6 = { width: 56, height: 56, borderRadius: "50%",
            background: "linear-gradient(135deg, #00C9B1, #F0A93C)",
            padding: 2 } as const;
const __style7 = { width: "100%", height: "100%", borderRadius: "50%",
              background: COLORS.panel,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, fontWeight: 800, color: COLORS.teal } as const;
const __style8 = { position: "absolute", bottom: 2, right: 2,
            width: 12, height: 12, borderRadius: "50%",
            background: COLORS.green2, border: `2px solid ${COLORS.bg2}` } as const;
const __style9 = { flex: 1 } as const;
const __style10 = { fontSize: 15, fontWeight: 700, color: COLORS.text } as const;
const __style11 = { display: "flex", alignItems: "center", gap: 6, marginTop: 3 } as const;
const __style12 = { display: "flex", gap: 1 } as const;
const __style13 = { fontSize: 13, fontWeight: 700, color: COLORS.amber } as const;
const __style14 = { fontSize: 11, color: COLORS.muted } as const;
const __style15 = { fontSize: 11, color: COLORS.muted, marginTop: 3 } as const;
const __style16 = { display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" } as const;
const __style17 = { fontSize: 10.5, background: COLORS.panel,
            border: `1px solid ${COLORS.border}`, borderRadius: 999, padding: "3px 8px", color: COLORS.soft } as const;


export function CourierCard({ info }) {
  const initials = info.courier.split(" ").map((w) => w[0]).join("").slice(0, 2);
  const ratingNum = info.rating || 4.8;
  const fullStars = Math.floor(ratingNum);
  const hasHalf = ratingNum - fullStars >= 0.5;
  return (
    <div style={__style1}>
      {/* subtle glow */}
      <div style={__style2} />

      <div style={__style3}>Ваш курьер</div>

      <div style={__style4}>
        {/* Avatar with photo simulation */}
        <div style={__style5}>
          <div style={__style6}>
            <div style={__style7}>
              {initials}
            </div>
          </div>
          {/* online dot */}
          <div style={__style8} />
        </div>

        <div style={__style9}>
          <div style={__style10}>{info.courier}</div>
          <div style={__style11}>
            <div style={__style12}>
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} style={{ fontSize: 13, color: i < fullStars ? COLORS.amber : i === fullStars && hasHalf ? "#F0A93C88" : COLORS.border }}>★</span>
              ))}
            </div>
            <span style={__style13}>{ratingNum}</span>
            {info.trips != null && <span style={__style14}>· {info.trips} поездок</span>}
          </div>
          <div style={__style15}>{info.phone}</div>
        </div>
      </div>

      {/* Trust badges */}
      <div style={__style16}>
        {["🐠 Везёт живых рыб", "🎥 Снимет видео", "⏱ " + info.time].map((badge) => (
          <span key={badge} style={__style17}>
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Апсейл корма/оборудования ───────────────────────────── */
