import React from "react";
import { COLORS } from "../../theme";
import { Sticker } from "../../components/ui/Sticker";
import { PAY_METHODS } from "../../data/checkout";
import { ORDER_STATUSES } from "../../data/orders";
import { DELIVERY_RATES } from "../../data/regions";
import { formatSum } from "../../lib/catalog-utils";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { minHeight: "100vh", background: COLORS.bg, color: COLORS.text, paddingBottom: 30 } as const;
const __style2 = { padding: "16px 16px 0" } as const;
const __style3 = { background: "none", border: "none", color: COLORS.soft, fontSize: 14, marginBottom: 14, cursor: "pointer" } as const;
const __style4 = { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 } as const;
const __style5 = { fontSize: 18, fontWeight: 800, margin: 0 } as const;
const __style6 = { fontSize: 12, color: COLORS.muted } as const;
const __style7 = { fontSize: 13, color: COLORS.soft, marginBottom: 20 } as const;
const __style8 = {
          background: COLORS.card,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 16,
          padding: "18px 16px",
          marginBottom: 16,
        } as const;
const __style9 = { fontSize: 13, fontWeight: 700, color: COLORS.soft, marginBottom: 16 } as const;
const __style10 = { display: "flex", flexDirection: "column", alignItems: "center", width: 28 } as const;
const __style11 = { fontSize: 12, color: COLORS.soft, marginTop: 2 } as const;
const __style12 = {
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 16,
            padding: "16px",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 14,
          } as const;
const __style13 = {
              width: 48, height: 48, borderRadius: "50%",
              background: COLORS.panel, border: `1px solid ${COLORS.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, flexShrink: 0,
            } as const;
const __style14 = { flex: 1 } as const;
const __style15 = { fontSize: 14, fontWeight: 700 } as const;
const __style16 = { fontSize: 13, color: COLORS.soft, marginTop: 1 } as const;
const __style17 = { fontSize: 11, color: COLORS.muted, marginTop: 2 } as const;
const __style18 = {
              background: COLORS.teal,
              color: COLORS.bg,
              border: "none",
              borderRadius: 10,
              padding: "8px 14px",
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
              cursor: "pointer",
            } as const;
const __style19 = {
          background: COLORS.card,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 16,
          padding: "16px",
          marginBottom: 16,
        } as const;
const __style20 = { fontSize: 13, fontWeight: 700, color: COLORS.soft, marginBottom: 12 } as const;
const __style21 = { flex: 1, fontSize: 13 } as const;
const __style22 = { fontSize: 12, color: COLORS.amber } as const;
const __style23 = { display: "flex", justifyContent: "space-between", fontSize: 13, color: COLORS.soft, marginTop: 10, paddingTop: 10, borderTop: "1px solid #15293A" } as const;
const __style24 = { display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 800, marginTop: 6 } as const;
const __style25 = { color: COLORS.amber } as const;
const __style26 = { fontSize: 12, color: COLORS.muted, marginTop: 8 } as const;
const __style27 = {
            background: COLORS.greenBg,
            border: `1px solid ${COLORS.teal}`,
            borderRadius: 14,
            padding: "14px 16px",
            marginBottom: 16,
            fontSize: 13,
            color: COLORS.soft,
            lineHeight: 1.6,
          } as const;
const __style28 = {
            background: COLORS.panel,
            border: "1px dashed #1C3A4A",
            borderRadius: 12,
            padding: "12px 14px",
            fontSize: 12,
            color: COLORS.muted,
            marginBottom: 12,
            textAlign: "center",
          } as const;
const __style29 = { marginBottom: 8 } as const;
const __style30 = { display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" } as const;


export function DeliveryTracker({ order, onBack, onSimulate }) {
  const currentIdx = ORDER_STATUSES.findIndex((s) => s.key === order.status);
  const info = order.deliveryInfo || DELIVERY_RATES[order.region] || { price: 35000, time: "сегодня", courier: "Курьер", phone: "" };
  const payLabel = PAY_METHODS.find((m) => m.id === order.pay)?.label || "";

  return (
    <div style={__style1}>
      <div style={__style2}>
        <button onClick={onBack} style={__style3}>
          ← Назад
        </button>

        <div style={__style4}>
          <h2 style={__style5}>Заказ #{order.id}</h2>
          <span style={__style6}>{order.date}</span>
        </div>
        <div style={__style7}>
          📍 {order.region} · ⏱ {info.time}
        </div>

        {/* Live status track */}
        <div style={__style8}>
          <div style={__style9}>
            Статус доставки
          </div>

          {ORDER_STATUSES.map((s, i) => {
            const done = i < currentIdx;
            const active = i === currentIdx;
            return (
              <div key={s.key} style={{ display: "flex", gap: 12, marginBottom: i < ORDER_STATUSES.length - 1 ? 0 : 0 }}>
                {/* connector line + dot */}
                <div style={__style10}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: done ? COLORS.teal : active ? COLORS.greenBg : COLORS.panel,
                    border: `2px solid ${done ? COLORS.teal : active ? COLORS.teal : COLORS.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, flexShrink: 0,
                    boxShadow: active ? "0 0 12px rgba(0,201,177,0.45)" : "none",
                  }}>
                    {done ? "✓" : s.icon}
                  </div>
                  {i < ORDER_STATUSES.length - 1 && (
                    <div style={{ width: 2, flex: 1, minHeight: 20, background: done ? COLORS.teal : COLORS.border, margin: "2px 0" }} />
                  )}
                </div>
                {/* text */}
                <div style={{ paddingBottom: i < ORDER_STATUSES.length - 1 ? 16 : 0 }}>
                  <div style={{ fontSize: 14, fontWeight: active ? 700 : 500, color: done || active ? COLORS.text : COLORS.muted }}>
                    {s.label}
                  </div>
                  {active && (
                    <div style={__style11}>{s.desc}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Courier card */}
        {(currentIdx >= 2) && order.status !== "delivered" && (
          <div style={__style12}>
            <div style={__style13}>
              🏍️
            </div>
            <div style={__style14}>
              <div style={__style15}>Ваш курьер</div>
              <div style={__style16}>{info.courier}</div>
              <div style={__style17}>⚠️ Везёт живых рыб — аккуратно!</div>
            </div>
            <a href={`tel:${info.phone}`} style={__style18}>
              📞 Позвонить
            </a>
          </div>
        )}

        {/* Order summary */}
        <div style={__style19}>
          <div style={__style20}>Состав заказа</div>
          {(order.items || []).map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < (order.items.length - 1) ? "1px solid #15293A" : "none" }}>
              <Sticker e={item.img} size={38} />
              <span style={__style21}>{item.name}</span>
              <span style={__style22}>{formatSum(item.price)}</span>
            </div>
          ))}
          <div style={__style23}>
            <span>🚚 Доставка</span><span>{formatSum(info.price)}</span>
          </div>
          <div style={__style24}>
            <span>Итого</span><span style={__style25}>{formatSum(order.total)}</span>
          </div>
          <div style={__style26}>
            💳 {payLabel} · 📍 {order.address}
          </div>
        </div>

        {/* 48h guarantee */}
        {order.status === "delivered" && (
          <div style={__style27}>
            ✅ Заказ доставлен! Если в течение 48 часов с рыбой что-то не так — напишите нам, заменим бесплатно. Сделайте фото как доказательство.
          </div>
        )}

        {/* Demo buttons to simulate status progression */}
        {order.status !== "delivered" && (
          <div style={__style28}>
            <div style={__style29}>🎛 Демо: симуляция статуса доставки</div>
            <div style={__style30}>
              {ORDER_STATUSES.map((s) => (
                <button
                  key={s.key}
                  onClick={() => onSimulate(s.key)}
                  style={{
                    background: order.status === s.key ? COLORS.teal : COLORS.border,
                    color: order.status === s.key ? COLORS.bg : COLORS.soft,
                    border: "none",
                    borderRadius: 8,
                    padding: "5px 10px",
                    fontSize: 11,
                    cursor: "pointer",
                  }}
                >
                  {s.icon} {s.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- CourierView (интерфейс курьера) ---------- */
