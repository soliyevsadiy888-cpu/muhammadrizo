import React from "react";
import { COLORS } from "../../theme";
import { Bubbles } from "../../components/ui/Bubbles";
import { IconBadge } from "../../components/ui/IconBadge";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { position: "relative", overflow: "hidden", background: "radial-gradient(ellipse 100% 80% at 50% 0%, #0E2A36 0%, #08131F 80%)", paddingBottom: 0 } as const;
const __style2 = { position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px 0" } as const;
const __style3 = { display: "flex", alignItems: "center", gap: 8 } as const;
const __style4 = { fontSize: 20 } as const;
const __style5 = { fontSize: 17, fontWeight: 900, letterSpacing: "-0.03em", color: COLORS.teal } as const;
const __style6 = { display: "flex", gap: 8, alignItems: "center" } as const;
const __style7 = { background: "none", border: "none", cursor: "pointer", padding: 0 } as const;
const __style8 = { position: "relative", zIndex: 1, padding: "20px 16px 0", textAlign: "center" } as const;
const __style9 = { background: "#00C9B122", border: "1px solid #00C9B144", borderRadius: 999, padding: "4px 14px", fontSize: 12, fontWeight: 700, color: COLORS.teal, cursor: "pointer", marginBottom: 14 } as const;
const __style10 = { fontSize: 26, fontWeight: 900, letterSpacing: "-0.03em", margin: "0 0 8px", fontFamily: "Georgia, serif", lineHeight: 1.2 } as const;
const __style11 = { background: "linear-gradient(90deg,#00C9B1,#4DE8D5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" } as const;
const __style12 = { fontSize: 13, color: COLORS.soft, margin: "0 0 18px", lineHeight: 1.6 } as const;
const __style13 = { display: "flex", gap: 8, justifyContent: "center", marginBottom: 20, flexWrap: "wrap" } as const;
const __style14 = { position: "relative", zIndex: 1, display: "flex", gap: 0, borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}` } as const;
const __style15 = { fontSize: 14, fontWeight: 900, color: COLORS.teal } as const;
const __style16 = { fontSize: 10, color: COLORS.muted } as const;


export function HomeHero({ region, onChangeRegion, onOpenProfile, onOpenDoctor, onOpenDiary, onOpenSeller, onOpenCourier, onOpenClub, cart, onOpenCart }) {
  return (
    <div style={__style1}>
      <Bubbles count={12} />

      {/* Топ-бар */}
      <div style={__style2}>
        <div style={__style3}>
          <span style={__style4}>🐠</span>
          <span style={__style5}>AquaMarjon</span>
        </div>
        <div style={__style6}>
          <button onClick={onOpenProfile} style={__style7}>
            <IconBadge icon="person" size={30} grad="linear-gradient(135deg, #2E86FF, #1D5FCC)" />
          </button>
        </div>
      </div>

      {/* Hero текст */}
      <div style={__style8}>
        <button onClick={onChangeRegion} style={__style9}>
          📍 {region} ▾
        </button>
        <h1 style={__style10}>
          Живые рыбы —<br />
          <span style={__style11}>прямо к вам домой</span>
        </h1>
        <p style={__style12}>300+ видов · Доставка сегодня · Гарантия 48 ч</p>

        {/* Продающие метки */}
        <div style={__style13}>
          {[
            { icon: "✅", label: "Гарантия 48 ч", bg: COLORS.greenBg, border: "#00C9B144", color: COLORS.teal },
            { icon: "🚚", label: "Доставка сегодня", bg: COLORS.bg2, border: COLORS.border, color: COLORS.soft },
            { icon: "🐠", label: "300+ видов", bg: COLORS.bg2, border: COLORS.border, color: COLORS.soft },
          ].map(b => (
            <div key={b.label} style={{ background: b.bg, border: `1px solid ${b.border}`, borderRadius: 10, padding: "7px 12px", fontSize: 12, fontWeight: 700, color: b.color }}>
              {b.icon} {b.label}
            </div>
          ))}
        </div>
      </div>

      {/* Мини-статы */}
      <div style={__style14}>
        {[
          { val: "2 400+", lbl: "покупателей" },
          { val: "300+", lbl: "видов рыб" },
          { val: "48 ч", lbl: "гарантия" },
          { val: "12", lbl: "регионов" },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", padding: "10px 4px", borderRight: i < 3 ? `1px solid ${COLORS.border}` : "none" }}>
            <div style={__style15}>{s.val}</div>
            <div style={__style16}>{s.lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   🎯 ОНБОРДИНГ-КВИЗ
   3 шага: объём аквариума → опыт → цель
   Результат: персональный стартовый набор рыб + фильтр каталога
   ============================================================ */

