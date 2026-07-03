import React from "react";
import { COLORS } from "../../theme";
import { REGIONS } from "../../data/regions";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = {
        minHeight: "100vh",
        background: COLORS.bg,
        color: COLORS.text,
        padding: "48px 20px 24px",
      } as const;
const __style2 = { textAlign: "center", marginBottom: 28 } as const;
const __style3 = { fontSize: 32, marginBottom: 8 } as const;
const __style4 = { fontSize: 20, fontWeight: 700, margin: 0 } as const;
const __style5 = { fontSize: 13, color: COLORS.muted, marginTop: 6 } as const;
const __style6 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } as const;
const __style7 = {
              background: COLORS.panel,
              border: `1px solid ${COLORS.border}`,
              color: COLORS.text,
              borderRadius: 12,
              padding: "14px 10px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            } as const;


export function CityPicker({ onSelect }) {
  return (
    <div
      style={__style1}
    >
      <div style={__style2}>
        <div style={__style3}>📍</div>
        <h2 style={__style4}>Вы из какого города?</h2>
        <p style={__style5}>
          Покажем рыб с быстрой и дешёвой доставкой именно у вас
        </p>
      </div>
      <div style={__style6}>
        {REGIONS.map((r) => (
          <button
            key={r}
            onClick={() => onSelect(r)}
            style={__style7}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   WOW-ФИЧА 1: Визуализация аквариума
   Схема с кружками рыб, красные стрелки — конфликты, зелёные — дружба
   ============================================================ */
