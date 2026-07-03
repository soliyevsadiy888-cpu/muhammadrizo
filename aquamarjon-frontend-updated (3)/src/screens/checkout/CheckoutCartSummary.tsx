import React, { useState } from "react";
import { COLORS } from "../../theme";
import { Sticker } from "../../components/ui/Sticker";
import { formatSum } from "../../lib/catalog-utils";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { background: COLORS.bg2, border: `1px solid ${COLORS.border}`, borderRadius: 16, marginBottom: 22, overflow: "hidden" } as const;
const __style2 = { width: "100%", display: "flex",
        justifyContent: "space-between", alignItems: "center", background: "none",
        border: "none", padding: "14px 16px", cursor: "pointer", color: COLORS.text } as const;
const __style3 = { fontSize: 13, fontWeight: 700 } as const;
const __style4 = { fontSize: 13, color: COLORS.amber, fontWeight: 800 } as const;
const __style5 = { padding: "0 16px 14px" } as const;
const __style6 = { display: "flex", alignItems: "center", gap: 10,
              paddingBottom: 10, marginBottom: 10, borderBottom: `1px solid ${COLORS.border}` } as const;
const __style7 = { flex: 1, minWidth: 0 } as const;
const __style8 = { fontSize: 13, fontWeight: 600, color: COLORS.text,
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } as const;
const __style9 = { display: "flex", alignItems: "center", gap: 6, marginTop: 4 } as const;
const __style10 = { background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 6,
                      width: 22, height: 22, color: COLORS.soft, fontSize: 14, cursor: "pointer", lineHeight: 1, padding: 0 } as const;
const __style11 = { fontSize: 12, color: COLORS.text, minWidth: 14, textAlign: "center" } as const;
const __style12 = { background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 6,
                      width: 22, height: 22, color: COLORS.teal, fontSize: 14, cursor: "pointer", lineHeight: 1, padding: 0 } as const;
const __style13 = { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 } as const;
const __style14 = { fontSize: 13, fontWeight: 700, color: COLORS.soft } as const;
const __style15 = { background: "none", border: "none", color: COLORS.muted, fontSize: 11, cursor: "pointer", padding: 0 } as const;
const __style16 = { display: "flex", justifyContent: "space-between", fontSize: 12, color: COLORS.muted, marginBottom: 4 } as const;
const __style17 = { display: "flex", justifyContent: "space-between", fontSize: 12, color: COLORS.green2, marginBottom: 4 } as const;
const __style18 = { display: "flex", justifyContent: "space-between", fontSize: 12, color: COLORS.muted, marginBottom: 2 } as const;
const __style19 = { display: "flex", justifyContent: "space-between", fontSize: 15,
            fontWeight: 800, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${COLORS.border}` } as const;
const __style20 = { color: COLORS.text } as const;
const __style21 = { color: COLORS.amber } as const;


export function CheckoutCartSummary({ groupedCart, onQtyChange, onRemove, subtotal, discount, delivery, total, deliveryInfo, collapsed }) {
  const [open, setOpen] = useState(!collapsed);
  const totalQty = groupedCart.reduce((a, i) => a + i.qty, 0);
  return (
    <div style={__style1}>
      <button onClick={() => setOpen((v) => !v)} style={__style2}>
        <span style={__style3}>🛒 Состав · {totalQty} шт.</span>
        <span style={__style4}>{formatSum(total)}</span>
      </button>
      {open && (
        <div style={__style5}>
          {groupedCart.map((item) => (
            <div key={item.id} style={__style6}>
              <Sticker e={item.img} size={36} />
              <div style={__style7}>
                <div style={__style8}>{item.name}</div>
                <div style={__style9}>
                  <button onClick={() => onQtyChange(item.id, -1)}
                    style={__style10}>−</button>
                  <span style={__style11}>{item.qty}</span>
                  <button onClick={() => onQtyChange(item.id, 1)}
                    style={__style12}>+</button>
                </div>
              </div>
              <div style={__style13}>
                <span style={__style14}>{formatSum(item.price * item.qty)}</span>
                <button onClick={() => onRemove(item.id)}
                  style={__style15}>удалить</button>
              </div>
            </div>
          ))}
          <div style={__style16}>
            <span>Товары</span><span>{formatSum(subtotal)}</span>
          </div>
          {discount > 0 && (
            <div style={__style17}>
              <span>Скидка по промокоду</span><span>−{formatSum(discount)}</span>
            </div>
          )}
          <div style={__style18}>
            <span>🚚 Доставка · {deliveryInfo.time}</span><span>{formatSum(delivery)}</span>
          </div>
          <div style={__style19}>
            <span style={__style20}>Итого</span>
            <span style={__style21}>{formatSum(total)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── QR-код для Click/Payme (демо) ────────────────────────── */
