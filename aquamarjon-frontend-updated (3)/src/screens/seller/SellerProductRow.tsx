import React from "react";
import { Sticker } from "../../components/ui/Sticker";
import { fmtS } from "../../lib/format";
import { S } from "../../lib/seller-styles";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { display: "flex", gap: 12, alignItems: "center" } as const;
const __style2 = { flex: 1, minWidth: 0 } as const;
const __style3 = { fontSize: 13.5, fontWeight: 700, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } as const;
const __style4 = { fontSize: 12, color: S.amber, fontWeight: 700 } as const;
const __style5 = {
          background: "none", border: `1px solid ${S.border}`, borderRadius: 8,
          padding: "6px 10px", fontSize: 11, color: S.soft, cursor: "pointer", flexShrink: 0,
        } as const;


export interface SellerProduct {
  id: string;
  name: string;
  img?: string;
  photo?: string | null;
  color?: string;
  price: number;
  qty: number;
}

export const SellerProductRow = React.memo(function SellerProductRow({ product, onEdit }: { product: SellerProduct; onEdit: (p: SellerProduct) => void }) {
  const out = product.qty <= 0;
  return (
    <div style={{ background: S.card, border: `1px solid ${out ? "#0D1E2C" : S.border}`, borderRadius: 14, padding: "12px 14px", marginBottom: 10, opacity: out ? 0.6 : 1 }}>
      <div style={__style1}>
        <Sticker e={product.img} photo={product.photo} size={48} radius={12} bg={`radial-gradient(circle, ${product.color}33, #050B12)`} />
        <div style={__style2}>
          <div style={__style3}>{product.name}</div>
          <div style={__style4}>{fmtS(product.price)}</div>
          <div style={{ fontSize: 11, color: out ? S.red : S.muted, marginTop: 2, fontWeight: out ? 700 : 400 }}>
            {out ? "❌ Нет в наличии" : `📦 Остаток: ${product.qty} шт`}
          </div>
        </div>
        <button onClick={() => onEdit(product)} style={__style5}>✏️ Остаток</button>
      </div>
    </div>
  );
});

/* ---- Строка заказа ---- */
