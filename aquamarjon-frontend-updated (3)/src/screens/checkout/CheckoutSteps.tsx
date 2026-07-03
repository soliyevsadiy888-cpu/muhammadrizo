import React from "react";
import { COLORS } from "../../theme";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { marginBottom: 28 } as const;
const __style2 = { display: "flex", justifyContent: "space-between", marginBottom: 8 } as const;
const __style3 = { height: 4, background: COLORS.border, borderRadius: 2, overflow: "hidden" } as const;
const __style4 = { textAlign: "right", fontSize: 10, color: COLORS.teal, marginTop: 4 } as const;


export function CheckoutSteps({ current, onStepClick }) {
  const labels = ["Адрес", "Оплата", "Готово"];
  const pct = current === 1 ? 18 : current === 2 ? 55 : 100;
  return (
    <div style={__style1}>
      <div style={__style2}>
        {labels.map((l, i) => {
          const stepNum = i + 1;
          const isDone = stepNum < current;
          const isCurrent = stepNum === current;
          const clickable = isDone && !!onStepClick;
          return (
            <span
              key={l}
              onClick={clickable ? () => onStepClick(stepNum) : undefined}
              style={{ fontSize: 11, fontWeight: isCurrent ? 700 : 400,
                color: isDone ? COLORS.teal : isCurrent ? COLORS.text : COLORS.muted,
                cursor: clickable ? "pointer" : "default",
                textDecoration: clickable ? "underline" : "none",
                textUnderlineOffset: 3 }}
            >
              {isDone ? "✓ " : ""}{l}
            </span>
          );
        })}
      </div>
      <div style={__style3}>
        <div style={{ height: "100%", width: `${pct}%`, background: COLORS.teal,
          borderRadius: 2, transition: "width 0.5s ease" }} />
      </div>
      <div style={__style4}>{pct}%</div>
    </div>
  );
}

/* ── Редактируемый состав корзины ────────────────────────── */
