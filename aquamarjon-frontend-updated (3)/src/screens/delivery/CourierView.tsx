import React, { useEffect, useState } from "react";
import { COLORS } from "../../theme";
import { Sticker } from "../../components/ui/Sticker";
import { PAY_METHODS } from "../../data/checkout";
import { DEMO_DELIVERIES } from "../../data/demo-deliveries";
import { ORDER_STATUSES } from "../../data/orders";
import { formatSum } from "../../lib/catalog-utils";
import { listOrders, logClientError, updateOrderStatus } from "../../lib/api";
import { mapBackendOrder } from "../../lib/orders-map";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { minHeight: "100vh", background: COLORS.bg, color: COLORS.text, padding: "16px" } as const;
const __style2 = { background: "none", border: "none", color: COLORS.soft, fontSize: 14, marginBottom: 18, cursor: "pointer" } as const;
const __style3 = { fontSize: 18, fontWeight: 800, margin: "0 0 20px" } as const;
const __style4 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 } as const;
const __style5 = { background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "14px" } as const;
const __style6 = { fontSize: 11, color: COLORS.muted, marginBottom: 4 } as const;
const __style7 = { fontSize: 16, fontWeight: 800, color: COLORS.teal } as const;
const __style8 = { fontSize: 13, fontWeight: 700, color: COLORS.soft, marginBottom: 12 } as const;
const __style9 = { display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #15293A", fontSize: 13 } as const;
const __style10 = { color: COLORS.teal } as const;
const __style11 = { minHeight: "100vh", background: COLORS.bg, color: COLORS.text, padding: "16px 16px 30px" } as const;
const __style12 = { background: "none", border: "none", color: COLORS.soft, fontSize: 14, marginBottom: 14, cursor: "pointer" } as const;
const __style13 = { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 } as const;
const __style14 = { fontSize: 18, fontWeight: 800, margin: 0 } as const;
const __style15 = { fontSize: 12, color: COLORS.muted } as const;
const __style16 = { background: COLORS.redBg, border: `1px solid ${COLORS.red}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#FF8F8F", marginBottom: 14 } as const;
const __style17 = { background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "14px", marginBottom: 12 } as const;
const __style18 = { fontSize: 13, fontWeight: 700, marginBottom: 10 } as const;
const __style19 = { fontSize: 14, color: COLORS.soft2, marginBottom: 4 } as const;
const __style20 = { fontSize: 13, color: COLORS.soft, marginBottom: 10 } as const;
const __style21 = { display: "inline-flex", alignItems: "center", gap: 6, background: COLORS.teal, color: COLORS.bg, borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 700, textDecoration: "none" } as const;
const __style22 = { fontSize: 13, fontWeight: 700, marginBottom: 8 } as const;
const __style23 = { display: "flex", gap: 10, alignItems: "center", fontSize: 13 } as const;
const __style24 = { marginTop: 10, paddingTop: 10, borderTop: "1px solid #15293A", display: "flex", justifyContent: "space-between", fontSize: 13 } as const;
const __style25 = { color: COLORS.soft } as const;
const __style26 = { color: COLORS.amber, fontWeight: 700 } as const;
const __style27 = { fontSize: 12, color: COLORS.muted, marginTop: 4 } as const;
const __style28 = { background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "14px", marginBottom: 16 } as const;
const __style29 = { fontSize: 13, fontWeight: 700, color: COLORS.soft, marginBottom: 8 } as const;
const __style30 = { display: "flex", gap: 6, justifyContent: "space-between" } as const;
const __style31 = { textAlign: "center", flex: 1 } as const;
const __style32 = {
              width: "100%",
              background: COLORS.teal,
              color: COLORS.bg,
              border: "none",
              borderRadius: 12,
              padding: "15px",
              fontSize: 16,
              fontWeight: 800,
              cursor: "pointer",
            } as const;
const __style33 = { textAlign: "center", color: COLORS.teal, fontWeight: 700, fontSize: 15 } as const;
const __style34 = { minHeight: "100vh", background: COLORS.bg, color: COLORS.text, paddingBottom: 20 } as const;
const __style35 = { padding: "16px 16px 0" } as const;
const __style36 = { background: "none", border: "none", color: COLORS.soft, fontSize: 14, marginBottom: 10, cursor: "pointer" } as const;
const __style37 = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 } as const;
const __style38 = { background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "7px 12px", color: COLORS.teal, fontSize: 13, fontWeight: 700, cursor: "pointer" } as const;
const __style39 = { display: "flex", gap: 10, marginBottom: 16 } as const;
const __style40 = { flex: 1, background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "12px", textAlign: "center" } as const;
const __style41 = { fontSize: 22, fontWeight: 800, color: COLORS.amber } as const;
const __style42 = { fontSize: 11, color: COLORS.muted } as const;
const __style43 = { fontSize: 22, fontWeight: 800, color: COLORS.teal } as const;
const __style44 = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 } as const;
const __style45 = { fontSize: 14, fontWeight: 700 } as const;
const __style46 = { marginLeft: 8, fontSize: 11, color: COLORS.amber, background: "#2A1800", padding: "2px 6px", borderRadius: 6 } as const;
const __style47 = { display: "flex", justifyContent: "space-between", fontSize: 12, color: COLORS.soft, marginTop: 4 } as const;
const __style48 = { color: COLORS.amber } as const;


export function CourierView({ onBack }) {
  const [deliveries, setDeliveries] = useState(DEMO_DELIVERIES);
  const [selectedId, setSelectedId] = useState(null);
  const [earningsTab, setEarningsTab] = useState(false);

  // Подтягиваем реальные назначенные заказы с бэкенда (GET /orders — для
  // роли courier бэкенд сам отфильтровывает только заказы, назначенные на
  // этого курьера, см. routes/orders.ts). Раньше этот экран показывал
  // только DEMO_DELIVERIES и не видел вообще ничего из настоящих заказов.
  // Если бэкенд недоступен, молча остаёмся на демо-данных.
  useEffect(() => {
    let cancelled = false;
    listOrders()
      .then((rows) => {
        if (cancelled) return;
        const mapped = rows
          .map(mapBackendOrder)
          .filter((o) => o.status !== "cancelled");
        setDeliveries(mapped);
      })
      .catch((err) => {
        logClientError("CourierView.listOrders", err);
      });
    return () => { cancelled = true; };
  }, []);

  const selected = deliveries.find((d) => d.id === selectedId);

  function advance(id) {
    let toStatus = null;
    setDeliveries((prev) => prev.map((d) => {
      if (d.id !== id) return d;
      const idx = ORDER_STATUSES.findIndex((s) => s.key === d.status);
      const next = ORDER_STATUSES[idx + 1];
      if (!next) return d;
      toStatus = next.key;
      return { ...d, status: next.key };
    }));
    if (toStatus) {
      updateOrderStatus(String(id), toStatus).catch((err) => logClientError("CourierView.advance", err, { id, toStatus }));
    }
  }

  const activeCount = deliveries.filter((d) => d.status !== "delivered").length;
  const doneCount = deliveries.filter((d) => d.status === "delivered").length;
  const earnings = deliveries.filter((d) => d.status === "delivered").length * 15000;

  if (earningsTab) {
    return (
      <div style={__style1}>
        <button onClick={() => setEarningsTab(false)} style={__style2}>
          ← Назад к доставкам
        </button>
        <h2 style={__style3}>💰 Мой заработок</h2>
        <div style={__style4}>
          {[
            ["Сегодня", `${formatSum(earnings)}`],
            ["Доставок", `${doneCount} из ${deliveries.length}`],
            ["Рейтинг", "⭐ 4.9"],
            ["На маршруте", `${activeCount} шт`],
          ].map(([label, value]) => (
            <div key={label} style={__style5}>
              <div style={__style6}>{label}</div>
              <div style={__style7}>{value}</div>
            </div>
          ))}
        </div>
        <div style={__style5}>
          <div style={__style8}>История сегодня</div>
          {deliveries.filter((d) => d.status === "delivered").map((d) => (
            <div key={d.id} style={__style9}>
              <span>#{d.id} — {d.client}</span>
              <span style={__style10}>+15 000 сум</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (selected) {
    const statusIdx = ORDER_STATUSES.findIndex((s) => s.key === selected.status);
    const nextStatus = ORDER_STATUSES[statusIdx + 1];
    const payLabel = PAY_METHODS.find((m) => m.id === selected.pay)?.label || "";
    return (
      <div style={__style11}>
        <button onClick={() => setSelectedId(null)} style={__style12}>
          ← К списку
        </button>
        <div style={__style13}>
          <h2 style={__style14}>Заказ #{selected.id}</h2>
          <span style={__style15}>{selected.slot}</span>
        </div>

        {selected.hasLivefish && (
          <div style={__style16}>
            🐠 ЖИВЫЕ РЫБЫ — везти аккуратно! Не класть горизонтально. Термопакет не открывать.
          </div>
        )}

        <div style={__style17}>
          <div style={__style18}>Клиент</div>
          <div style={__style19}>{selected.client}</div>
          <div style={__style20}>📍 {selected.address}</div>
          <a href={`tel:${selected.phone}`} style={__style21}>
            📞 Позвонить клиенту
          </a>
        </div>

        <div style={__style17}>
          <div style={__style22}>Товары</div>
          {selected.items.map((item, i) => (
            <div key={i} style={__style23}>
              <Sticker e={item.img} size={36} />
              <span>{item.name}</span>
            </div>
          ))}
          <div style={__style24}>
            <span style={__style25}>Итого клиенту:</span>
            <span style={__style26}>{formatSum(selected.total)}</span>
          </div>
          <div style={__style27}>💳 {payLabel}</div>
        </div>

        {/* Current status */}
        <div style={__style28}>
          <div style={__style29}>Статус</div>
          <div style={__style30}>
            {ORDER_STATUSES.map((s, i) => (
              <div key={s.key} style={__style31}>
                <div style={{ fontSize: 18, opacity: i <= statusIdx ? 1 : 0.25 }}>{s.icon}</div>
                <div style={{ fontSize: 9, color: i === statusIdx ? COLORS.teal : i < statusIdx ? COLORS.soft : COLORS.muted, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {nextStatus && (
          <button
            onClick={() => { advance(selected.id); setSelectedId(null); }}
            style={__style32}
          >
            {nextStatus.icon} {nextStatus.label === "Доставлен" ? "✅ ДОСТАВЛЕНО" : `→ ${nextStatus.label.toUpperCase()}`}
          </button>
        )}
        {!nextStatus && (
          <div style={__style33}>
            ✅ Доставлено — отличная работа!
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={__style34}>
      <div style={__style35}>
        <button onClick={onBack} style={__style36}>
          ← Назад
        </button>
        <div style={__style37}>
          <h2 style={__style14}>🏍️ Мои доставки</h2>
          <button onClick={() => setEarningsTab(true)} style={__style38}>
            💰 {formatSum(earnings)}
          </button>
        </div>

        <div style={__style39}>
          <div style={__style40}>
            <div style={__style41}>{activeCount}</div>
            <div style={__style42}>активных</div>
          </div>
          <div style={__style40}>
            <div style={__style43}>{doneCount}</div>
            <div style={__style42}>доставлено</div>
          </div>
        </div>

        {deliveries.map((d) => {
          const statusInfo = ORDER_STATUSES.find((s) => s.key === d.status);
          const isDone = d.status === "delivered";
          return (
            <div
              key={d.id}
              onClick={() => setSelectedId(d.id)}
              style={{
                background: isDone ? "#0A1C14" : COLORS.card,
                border: `1px solid ${isDone ? "#1C3A2A" : d.hasLivefish ? "#F0A93C44" : COLORS.border}`,
                borderRadius: 14,
                padding: "14px",
                marginBottom: 10,
                cursor: "pointer",
                opacity: isDone ? 0.7 : 1,
              }}
            >
              <div style={__style44}>
                <div>
                  <span style={__style45}>#{d.id} — {d.client}</span>
                  {d.hasLivefish && <span style={__style46}>🐠 Живые рыбы</span>}
                </div>
                <span style={{ fontSize: 12, color: statusInfo?.key === "delivered" ? COLORS.teal : COLORS.soft }}>
                  {statusInfo?.icon} {statusInfo?.label}
                </span>
              </div>
              <div style={__style15}>📍 {d.address}</div>
              <div style={__style47}>
                <span>{d.slot}</span>
                <span style={__style48}>{formatSum(d.total)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- AI Configurator (4 вопроса) ---------- */
