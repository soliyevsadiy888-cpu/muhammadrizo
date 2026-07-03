import React from "react";
import { COLORS } from "../../theme";
import { PAY_METHODS, TIME_SLOTS } from "../../data/checkout";
import { ORDER_STATUSES } from "../../data/orders";
import { CourierCard } from "./CourierCard";
import { FishRain } from "./FishRain";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { textAlign: "center" } as const;
const __style2 = { width: 80, height: 80, borderRadius: "50%",
        background: "#00C9B122", border: "2px solid #00C9B144",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 36, margin: "0 auto 16px",
        boxShadow: "0 0 32px #00C9B133" } as const;
const __style3 = { fontSize: 22, fontWeight: 900, margin: "0 0 6px",
        color: COLORS.text, fontFamily: "Georgia,serif" } as const;
const __style4 = { fontSize: 13, color: COLORS.soft, marginBottom: 24, lineHeight: 1.6 } as const;
const __style5 = { background: COLORS.bg2, border: `1px solid ${COLORS.border}`,
        borderRadius: 16, padding: "16px", marginBottom: 16, textAlign: "left" } as const;
const __style6 = { fontSize: 11, fontWeight: 700, color: COLORS.muted, marginBottom: 14,
          letterSpacing: "0.06em", textTransform: "uppercase" } as const;
const __style7 = { display: "flex", justifyContent: "space-around" } as const;
const __style8 = { textAlign: "center", flex: 1, position: "relative" } as const;
const __style9 = { background: COLORS.bg2, border: `1px solid ${COLORS.border}`,
        borderRadius: 16, padding: "14px 16px", marginBottom: 16, textAlign: "left" } as const;
const __style10 = { display: "flex", gap: 10, alignItems: "baseline",
            paddingBottom: 10, marginBottom: 10, borderBottom: `1px solid ${COLORS.border}` } as const;
const __style11 = { fontSize: 14, flexShrink: 0 } as const;
const __style12 = { fontSize: 10, color: COLORS.muted, fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 } as const;
const __style13 = { fontSize: 13, color: COLORS.text } as const;
const __style14 = { fontSize: 12, color: COLORS.soft, lineHeight: 1.5 } as const;
const __style15 = { width: "100%", background: COLORS.teal, color: COLORS.bg, border: "none",
          borderRadius: 14, padding: "14px", fontSize: 15, fontWeight: 800, cursor: "pointer",
          boxShadow: "0 4px 20px #00C9B144", marginBottom: 10 } as const;


export function StepDone({ orderId, address, slot, pay, groupedCart, deliveryInfo, region, onDone }) {
  const slotObj = TIME_SLOTS.find((s) => s.id === slot);
  const slotLabel = slotObj ? `${slotObj.label} · ${slotObj.sub}` : "";
  const payLabel = PAY_METHODS.find((m) => m.id === pay)?.label;
  return (
    <div style={__style1}>
      <FishRain items={groupedCart} />

      <div style={__style2}>🎉</div>

      <h2 style={__style3}>Заказ принят!</h2>
      <p style={__style4}>
        Заказ #{orderId} · {deliveryInfo.time}<br />
        Уведомим в Telegram при каждом изменении статуса
      </p>

      <div style={__style5}>
        <div style={__style6}>Статус доставки</div>
        <div style={__style7}>
          {ORDER_STATUSES.map((s, i) => (
            <div key={s.key} style={__style8}>
              {i < ORDER_STATUSES.length - 1 && (
                <div style={{ position: "absolute", top: 13, left: "60%", right: "-40%",
                  height: 2, background: i === 0 ? COLORS.teal : COLORS.border, zIndex: 0 }} />
              )}
              <div style={{ position: "relative", zIndex: 1, width: 28, height: 28,
                borderRadius: "50%", margin: "0 auto 6px",
                background: i === 0 ? COLORS.teal : COLORS.panel,
                border: `2px solid ${i === 0 ? COLORS.teal : COLORS.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, boxShadow: i === 0 ? "0 0 12px #00C9B166" : "none" }}>
                {i === 0 ? "✓" : s.icon}
              </div>
              <div style={{ fontSize: 9, color: i === 0 ? COLORS.teal : COLORS.muted, fontWeight: i === 0 ? 700 : 400 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={__style9}>
        <CourierCard info={deliveryInfo} />
        {[
          ["📍", "Адрес", address || "уточняется"],
          ["🕐", "Время", slotLabel],
          ["💳", "Оплата", payLabel],
        ].map(([icon, key, val]) => (
          <div key={key} style={__style10}>
            <span style={__style11}>{icon}</span>
            <div>
              <div style={__style12}>{key}</div>
              <div style={__style13}>{val}</div>
            </div>
          </div>
        ))}
        <div style={__style14}>
          🔔 Мы свяжемся с вами для подтверждения
        </div>
      </div>

      <button onClick={onDone}
        style={__style15}>
        Готово
      </button>
    </div>
  );
}

/* ── Разовое предупреждение при попытке оплаты офлайн ────── */
