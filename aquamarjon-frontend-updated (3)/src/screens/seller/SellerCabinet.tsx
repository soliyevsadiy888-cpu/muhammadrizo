import React, { useCallback, useEffect, useMemo, useState } from "react";
import { COLORS } from "../../theme";
import { Sticker } from "../../components/ui/Sticker";
import { FISH_DB, getStockOverrides, setStockOverride } from "../../data/fish";
import { ORDER_STATUS_FLOW } from "../../data/orders";
import { SELLER_INITIAL_ORDERS } from "../../data/seller-seed";
import { fmtS } from "../../lib/format";
import { listOrders, logClientError, updateOrderStatus } from "../../lib/api";
import { mapBackendOrder } from "../../lib/orders-map";
import { notifyTelegram } from "../../lib/notify";
import { S } from "../../lib/seller-styles";
import { SellerOrderRow } from "./SellerOrderRow";
import { SellerProductRow } from "./SellerProductRow";
import { SellerStockFlow } from "./SellerStockFlow";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { minHeight: "100vh", background: S.bg, color: S.text, paddingBottom: 40 } as const;
const __style2 = { background: S.card, borderBottom: `1px solid ${S.border}`, padding: "14px 16px" } as const;
const __style3 = { background: "none", border: "none", color: S.soft, fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 8, display: "block" } as const;
const __style4 = { display: "flex", justifyContent: "space-between", alignItems: "center" } as const;
const __style5 = { fontSize: 11, color: S.amber, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 2 } as const;
const __style6 = { fontSize: 20, fontWeight: 900 } as const;
const __style7 = { background: S.amber, color: COLORS.bg, borderRadius: 999, padding: "4px 12px", fontSize: 12, fontWeight: 800 } as const;
const __style8 = { display: "flex", borderBottom: `1px solid ${S.border}`, background: S.card } as const;
const __style9 = { fontSize: 16 } as const;
const __style10 = { padding: "16px" } as const;
const __style11 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 } as const;
const __style12 = { background: S.card, border: `1px solid ${S.border}`, borderRadius: 14, padding: "14px 16px" } as const;
const __style13 = { fontSize: 22, marginBottom: 6 } as const;
const __style14 = { fontSize: 11, color: S.muted, marginBottom: 2 } as const;
const __style15 = { fontSize: 13, fontWeight: 700, color: S.amber, marginBottom: 10 } as const;
const __style16 = { fontSize: 13, fontWeight: 700, color: S.soft, marginBottom: 10, marginTop: 6 } as const;
const __style17 = { display: "flex", gap: 10, alignItems: "center", background: S.card, border: `1px solid ${S.border}`, borderRadius: 12, padding: "10px 12px", marginBottom: 8 } as const;
const __style18 = { flex: 1 } as const;
const __style19 = { fontSize: 13, fontWeight: 600 } as const;
const __style20 = { fontSize: 11, color: S.muted } as const;
const __style21 = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 } as const;
const __style22 = { fontSize: 14, fontWeight: 700 } as const;
const __style23 = { background: S.teal, color: COLORS.bg, border: "none", borderRadius: 10, padding: "7px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer" } as const;
const __style24 = { border: `1px dashed ${S.border}`, borderRadius: 14, padding: "22px", textAlign: "center", color: S.muted, fontSize: 13 } as const;
const __style25 = { fontSize: 14, fontWeight: 700, marginBottom: 14 } as const;
const __style26 = { display: "flex", gap: 6, marginBottom: 14, overflowX: "auto", paddingBottom: 2 } as const;
const __style27 = { position: "fixed", inset: 0, background: "rgba(5,10,16,0.8)", zIndex: 200, display: "flex", alignItems: "flex-end" } as const;
const __style28 = { background: COLORS.bg2, width: "100%", borderRadius: "20px 20px 0 0", padding: "20px 20px 32px" } as const;
const __style29 = { fontSize: 16, fontWeight: 800, marginBottom: 4 } as const;
const __style30 = { fontSize: 13, color: S.muted, marginBottom: 4 } as const;
const __style31 = { fontSize: 12, color: S.muted, marginBottom: 18 } as const;
const __style32 = { fontSize: 12, color: S.soft, display: "block", marginBottom: 6 } as const;
const __style33 = { width: "100%", background: COLORS.panel, border: `1px solid ${S.border}`, borderRadius: 12, padding: "12px 14px", color: S.text, fontSize: 16, fontWeight: 700, outline: "none", boxSizing: "border-box", marginBottom: 16 } as const;
const __style34 = { display: "flex", gap: 8 } as const;
const __style35 = { flex: 1, background: COLORS.panel, color: S.soft, border: `1px solid ${S.border}`, borderRadius: 12, padding: "12px", fontSize: 14, cursor: "pointer" } as const;
const __style36 = { flex: 2, background: S.teal, color: COLORS.bg, border: "none", borderRadius: 12, padding: "12px", fontSize: 15, fontWeight: 700, cursor: "pointer" } as const;


export function SellerCabinet({ onBack }) {
  const [tab, setTab] = useState("dashboard"); // dashboard | products | orders | add
  const [orders, setOrders] = useState(SELLER_INITIAL_ORDERS);
  const [editProduct, setEditProduct] = useState(null);
  const [editQty, setEditQty] = useState("");
  const [stockVersion, setStockVersion] = useState(0); // растёт при каждом изменении остатка — форсит перечитать localStorage

  // Подтягиваем реальные заказы с бэкенда (GET /orders) — раньше кабинет
  // продавца показывал только SELLER_INITIAL_ORDERS и не видел заказы,
  // реально оформленные покупателями. Если бэкенд недоступен, молча
  // остаёмся на демо-данных (как и остальные офлайн-фолбэки в проекте).
  useEffect(() => {
    let cancelled = false;
    listOrders()
      .then((rows) => {
        if (cancelled) return;
        setOrders(
          rows.map((r) => {
            const o = mapBackendOrder(r);
            // SellerOrderRow ждёт items как массив строк ("Гуппи ×3"),
            // а не объектов — см. интерфейс SellerOrder в SellerOrderRow.tsx.
            return { ...o, items: o.itemNames };
          })
        );
      })
      .catch((err) => {
        logClientError("SellerCabinet.listOrders", err);
      });
    return () => { cancelled = true; };
  }, []);

  // Остатки, которые продавец уже выставил на карточках из каталога админа
  const products = useMemo(() => {
    const overrides = getStockOverrides();
    return Object.keys(overrides)
      .map((id) => FISH_DB.find((f) => f.id === id))
      .filter(Boolean)
      .map((f) => ({ id: f.id, name: f.name, img: f.img, photo: f.photo, color: f.color, price: f.price, qty: overrides[f.id], views: 0, orders: 0 }));
  }, [stockVersion]);

  const newOrders = orders.filter(o => o.status === "new").length;
  const revenue = orders.filter(o => o.status === "delivered").reduce((s, o) => s + o.total, 0);
  const activeProducts = products.filter(p => p.qty > 0).length;

  const changeOrderStatus = useCallback((id, status) => {
    setOrders(os => os.map(o => o.id === id ? { ...o, status } : o));
    updateOrderStatus(String(id), status).catch((err) => logClientError("SellerCabinet.updateOrderStatus", err, { id, status }));
  }, []);
  const handleEditProduct = useCallback((p) => {
    setEditProduct(p);
    setEditQty(String(p.qty));
  }, []);
  function saveEditQty() {
    setStockOverride(editProduct.id, parseInt(editQty, 10) || 0);
    setStockVersion(v => v + 1);
    setEditProduct(null);
  }

  return (
    <div style={__style1}>
      {/* Header */}
      <div style={__style2}>
        <button onClick={onBack} style={__style3}>← Назад в каталог</button>
        <div style={__style4}>
          <div>
            <div style={__style5}>AquaMarjon</div>
            <div style={__style6}>🏪 Кабинет продавца</div>
          </div>
          {newOrders > 0 && (
            <div style={__style7}>
              🔔 {newOrders} новых
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div style={__style8}>
        {[["dashboard","📊","Сводка"],["products","📦","Остатки"],["orders","🛒","Заказы"],["add","➕","Добавить"]].map(([id, icon, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, padding: "12px 4px", background: "none", border: "none",
            borderBottom: `2px solid ${tab === id ? S.teal : "transparent"}`,
            color: tab === id ? S.teal : S.muted,
            fontSize: 11, fontWeight: tab === id ? 700 : 400, cursor: "pointer",
          }}>
            <div style={__style9}>{icon}</div>
            {label}
          </button>
        ))}
      </div>

      {/* DASHBOARD */}
      {tab === "dashboard" && (
        <div style={__style10}>
          <div style={__style11}>
            {[
              ["💰", "Выручка", fmtS(revenue), S.amber],
              ["🔔", "Новых заказов", newOrders, S.amber],
              ["📦", "Активных товаров", activeProducts, S.teal],
              ["🛒", "Всего заказов", orders.length, S.teal],
            ].map(([icon, label, value, color]) => (
              <div key={label} style={__style12}>
                <div style={__style13}>{icon}</div>
                <div style={__style14}>{label}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Быстрые новые заказы */}
          {newOrders > 0 && (
            <>
              <div style={__style15}>🔔 Требуют обработки:</div>
              {orders.filter(o => o.status === "new").map(o => (
                <SellerOrderRow key={o.id} order={o} onChangeStatus={changeOrderStatus} />
              ))}
            </>
          )}

          {/* Топ товаров */}
          {products.length > 0 && (
            <>
              <div style={__style16}>📦 Мои остатки:</div>
              {[...products].sort((a, b) => b.qty - a.qty).slice(0, 3).map((p, i) => (
                <div key={p.id} style={__style17}>
                  <div style={{ fontSize: 20, color: [S.amber, S.soft, S.muted][i], fontWeight: 800, width: 20, textAlign: "center" }}>{["🥇","🥈","🥉"][i]}</div>
                  <Sticker e={p.img} photo={p.photo} size={34} />
                  <div style={__style18}>
                    <div style={__style19}>{p.name}</div>
                    <div style={__style20}>📦 {p.qty} шт · {fmtS(p.price)}</div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {/* PRODUCTS (остатки) */}
      {tab === "products" && (
        <div style={__style10}>
          <div style={__style21}>
            <div style={__style22}>Мои остатки ({products.length})</div>
            <button onClick={() => setTab("add")} style={__style23}>+ Указать остаток</button>
          </div>
          {products.length === 0 && (
            <div style={__style24}>
              Вы ещё не указали остатки. Карточки, фото и цены ведёт администратор — вам остаётся выбрать готовую карточку и указать, сколько рыбы есть в наличии.
            </div>
          )}
          {products.map(p => (
            <SellerProductRow key={p.id} product={p} onEdit={handleEditProduct} />
          ))}
        </div>
      )}

      {/* ORDERS */}
      {tab === "orders" && (
        <div style={__style10}>
          <div style={__style25}>Все заказы ({orders.length})</div>
          {/* фильтр статусов */}
          <div style={__style26}>
            {[{key:"all",label:"Все",icon:"",color:S.soft},...ORDER_STATUS_FLOW].map(st => (
              <button key={st.key} style={{ whiteSpace: "nowrap", background: COLORS.panel, border: `1px solid ${S.border}`, borderRadius: 999, padding: "5px 12px", fontSize: 12, color: st.color || S.soft, cursor: "pointer" }}>
                {st.icon} {st.label}
              </button>
            ))}
          </div>
          {orders.map(o => (
            <SellerOrderRow key={o.id} order={o} onChangeStatus={changeOrderStatus} />
          ))}
        </div>
      )}

      {/* УКАЗАТЬ ОСТАТОК */}
      {tab === "add" && (
        <SellerStockFlow
          onBack={() => setTab("products")}
          onPublish={(item, qty) => {
            setStockOverride(item.id, qty);
            setStockVersion(v => v + 1);
            setTab("products");
            if (qty > 0) {
              notifyTelegram("new_arrival", { name: item.name, price: item.price, emoji: item.img });
            }
          }}
        />
      )}

      {/* Модалка редактирования остатка */}
      {editProduct && (
        <div style={__style27} onClick={() => setEditProduct(null)}>
          <div onClick={e => e.stopPropagation()} style={__style28}>
            <div style={__style29}>✏️ Изменить остаток</div>
            <div style={__style30}>{editProduct.name}</div>
            <div style={__style31}>Цену и фото этой карточки меняет администратор</div>
            <label style={__style32}>Остаток на складе (шт)</label>
            <input type="number" min="0" value={editQty} onChange={e => setEditQty(e.target.value)} autoFocus
              style={__style33} />
            <div style={__style34}>
              <button onClick={() => setEditProduct(null)} style={__style35}>Отмена</button>
              <button onClick={saveEditQty} style={__style36}>Сохранить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   🩺 AI ДОКТОР РЫБ — встроенный модуль
   ============================================================ */

