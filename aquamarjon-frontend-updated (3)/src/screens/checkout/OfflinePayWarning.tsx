import React from "react";
import { COLORS } from "../../theme";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { position: "fixed", inset: 0, background: "rgba(5,10,16,0.75)", zIndex: 220,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20 } as const;
const __style2 = { background: COLORS.card, border: "1px solid #F0A93C55", borderRadius: 18,
        padding: "22px 20px", maxWidth: 340, width: "100%", textAlign: "center" } as const;
const __style3 = { fontSize: 34, marginBottom: 12 } as const;
const __style4 = { fontSize: 15, fontWeight: 800, color: COLORS.amber, marginBottom: 8 } as const;
const __style5 = { fontSize: 13, color: COLORS.soft, lineHeight: 1.5, margin: "0 0 18px" } as const;
const __style6 = { display: "flex", gap: 10 } as const;
const __style7 = { flex: 1, background: COLORS.panel, color: COLORS.soft,
            border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "12px", fontSize: 13,
            fontWeight: 700, cursor: "pointer" } as const;
const __style8 = { flex: 1, background: COLORS.amber, color: COLORS.bg,
              border: "none", borderRadius: 12, padding: "12px", fontSize: 13,
              fontWeight: 800, cursor: "pointer" } as const;


export function OfflinePayWarning({ pay, onConfirm, onCancel }) {
  const isDigital = pay === "click" || pay === "payme";
  return (
    <div style={__style1}>
      <div style={__style2}>
        <div style={__style3}>📡</div>
        <div style={__style4}>
          Нет соединения с интернетом
        </div>
        <p style={__style5}>
          {isDigital
            ? "Онлайн-оплата сейчас недоступна — для Click/Payme нужен интернет. Проверьте связь и попробуйте снова."
            : "Заказ будет принят локально и уйдёт на сервер, как только связь восстановится. Если это срочно — проверьте интернет и попробуйте снова."}
        </p>
        <div style={__style6}>
          <button onClick={onCancel} style={__style7}>
            Отмена
          </button>
          {!isDigital && (
            <button onClick={onConfirm} style={__style8}>
              Всё равно продолжить
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Главный компонент Checkout (модалка) ────────────────── */
