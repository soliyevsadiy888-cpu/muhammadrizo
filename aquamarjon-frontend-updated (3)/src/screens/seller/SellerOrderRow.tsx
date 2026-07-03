import React, { useState } from "react";
import { COLORS } from "../../theme";
import { ORDER_STATUS_FLOW } from "../../data/orders";
import { fmtS } from "../../lib/format";
import { S } from "../../lib/seller-styles";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { padding: "12px 14px", cursor: "pointer" } as const;
const __style2 = { display: "flex", justifyContent: "space-between", alignItems: "flex-start" } as const;
const __style3 = { fontSize: 13, fontWeight: 700 } as const;
const __style4 = { fontSize: 12, color: S.muted } as const;
const __style5 = { textAlign: "right" } as const;
const __style6 = { fontSize: 13, color: S.amber, fontWeight: 800 } as const;
const __style7 = { fontSize: 12, color: S.soft, marginTop: 6 } as const;
const __style8 = { borderTop: `1px solid ${S.border}`, padding: "12px 14px" } as const;
const __style9 = { fontSize: 12, color: S.muted, marginBottom: 10 } as const;
const __style10 = { fontSize: 12, color: S.soft, marginBottom: 8, fontWeight: 600 } as const;
const __style11 = { display: "flex", gap: 6, flexWrap: "wrap" } as const;


export interface SellerOrder {
  id: string | number;
  date: string;
  buyer: string;
  region: string;
  status: string;
  total: number;
  items: string[];
  address: string;
}

export const SellerOrderRow = React.memo(function SellerOrderRow({ order, onChangeStatus }: { order: SellerOrder; onChangeStatus: (id: string | number, status: string) => void }) {
  const st = ORDER_STATUS_FLOW.find(s => s.key === order.status) || ORDER_STATUS_FLOW[0];
  const [open, setOpen] = useState(false);
  const nextStatuses = ORDER_STATUS_FLOW.filter(s => s.key !== order.status && s.key !== "cancelled");
  return (
    <div style={{ background: S.card, border: `1px solid ${order.status === "new" ? S.amber + "66" : S.border}`, borderRadius: 14, marginBottom: 10, overflow: "hidden" }}>
      <div onClick={() => setOpen(o => !o)} style={__style1}>
        <div style={__style2}>
          <div>
            <div style={__style3}>Заказ #{order.id}</div>
            <div style={__style4}>{order.date} · {order.buyer} · {order.region}</div>
          </div>
          <div style={__style5}>
            <div style={{ fontSize: 12, color: st.color, fontWeight: 700, marginBottom: 2 }}>{st.icon} {st.label}</div>
            <div style={__style6}>{fmtS(order.total)}</div>
          </div>
        </div>
        <div style={__style7}>{order.items.join(", ")}</div>
      </div>
      {open && (
        <div style={__style8}>
          <div style={__style9}>📍 {order.address}</div>
          {order.status !== "delivered" && order.status !== "cancelled" && (
            <>
              <div style={__style10}>Сменить статус:</div>
              <div style={__style11}>
                {nextStatuses.map(ns => (
                  <button key={ns.key} onClick={() => { onChangeStatus(order.id, ns.key); setOpen(false); }} style={{
                    background: COLORS.panel, border: `1px solid ${ns.color}66`,
                    borderRadius: 8, padding: "6px 12px", fontSize: 12,
                    color: ns.color, cursor: "pointer", fontWeight: 600,
                  }}>
                    {ns.icon} {ns.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
});

/* ---- Добавить товар (многошаговый) ---- */
