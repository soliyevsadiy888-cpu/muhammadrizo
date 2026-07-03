import React from "react";
import { COLORS } from "../../theme";
import { Sticker } from "../../components/ui/Sticker";
import { UPSELL } from "../../data/checkout";
import { formatSum } from "../../lib/catalog-utils";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { background: "linear-gradient(135deg, #2A1E00, #1A1200)", border: "1px solid #F0A93C33",
      borderRadius: 16, padding: "14px", marginBottom: 20 } as const;
const __style2 = { display: "flex", alignItems: "center", gap: 8, marginBottom: 12 } as const;
const __style3 = { fontSize: 16 } as const;
const __style4 = { flex: 1 } as const;
const __style5 = { fontSize: 13, fontWeight: 800, color: COLORS.amber } as const;
const __style6 = { fontSize: 11, color: COLORS.soft, marginTop: 1 } as const;
const __style7 = { display: "flex", flexDirection: "column", gap: 8 } as const;
const __style8 = { display: "flex", alignItems: "center", gap: 12,
            background: COLORS.bg2, border: "1px solid #F0A93C22",
            borderRadius: 12, padding: "12px 14px" } as const;
const __style9 = { flex: 1, minWidth: 0 } as const;
const __style10 = { fontSize: 13, fontWeight: 600, color: COLORS.text } as const;
const __style11 = { fontSize: 11, color: COLORS.muted, marginTop: 1 } as const;
const __style12 = { flexShrink: 0, textAlign: "right" } as const;
const __style13 = { fontSize: 13, fontWeight: 800, color: COLORS.amber, marginBottom: 5 } as const;
const __style14 = { background: "#F0A93C22", border: `1px solid ${COLORS.amber}`,
                  borderRadius: 8, padding: "5px 12px", color: COLORS.amber,
                  fontSize: 12, fontWeight: 700, cursor: "pointer" } as const;


export function UpsellBlock({ groupedCart, onAddUpsell }) {
  const cartIds = groupedCart.map((i) => i.id);
  const suggestions = UPSELL.filter((u) => !cartIds.includes(u.id));
  if (!suggestions.length) return null;
  return (
    <div style={__style1}>
      <div style={__style2}>
        <span style={__style3}>🛒</span>
        <div style={__style4}>
          <div style={__style5}>Не забудьте</div>
          <div style={__style6}>Подобрано под рыб в вашем заказе</div>
        </div>
      </div>
      <div style={__style7}>
        {suggestions.slice(0, 2).map((u) => (
          <div key={u.id} style={__style8}>
            <Sticker e={u.img} size={40} />
            <div style={__style9}>
              <div style={__style10}>{u.name}</div>
              <div style={__style11}>{u.reason}</div>
            </div>
            <div style={__style12}>
              <div style={__style13}>{formatSum(u.price)}</div>
              <button onClick={() => onAddUpsell(u)}
                style={__style14}>
                + Добавить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Анимированные рыбки на экране подтверждения ─────────── */
