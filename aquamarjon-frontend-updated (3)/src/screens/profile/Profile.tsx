import React, { useEffect, useMemo, useRef, useState } from "react";
import { COLORS } from "../../theme";
import { Icon } from "../../components/ui/Icon";
import { IconBadge } from "../../components/ui/IconBadge";
import { Sticker } from "../../components/ui/Sticker";
import { Toast } from "../../components/ui/Toast";
import { WaterReminder } from "../../components/ui/WaterReminder";
import { ORDER_STATUSES } from "../../data/orders";
import { getRewardPromos } from "../../lib/achievement-promo";
import { tgUser } from "../../lib/api";
import { formatSum } from "../../lib/catalog-utils";
import { SUBSCRIPTION_DISCOUNT, SUBSCRIPTION_INTERVALS, fmtDate } from "../../lib/subscriptions";
import { getWishlistAlerts, notifyWishlistAlerts } from "../../lib/wishlist";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { minHeight: "100vh", background: COLORS.bg, color: COLORS.text, paddingBottom: 30 } as const;
const __style2 = { padding: "16px 16px 0" } as const;
const __style3 = { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 } as const;
const __style4 = { background: "none", border: "none", color: COLORS.soft, cursor: "pointer", padding: 4, lineHeight: 1, display: "flex" } as const;
const __style5 = { fontSize: 15, fontWeight: 800 } as const;
const __style6 = { width: 28 } as const;
const __style7 = { display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 22 } as const;
const __style8 = {
              width: 96,
              height: 96,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #00C9B1, #00A896)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 800,
              color: COLORS.bg,
              marginBottom: 12,
              boxShadow: "0 8px 28px #00C9B144",
            } as const;
const __style9 = { fontSize: 19, fontWeight: 800, textAlign: "center" } as const;
const __style10 = { fontSize: 12, color: COLORS.muted, marginTop: 2 } as const;
const __style11 = {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#121F2C",
            border: `1px solid ${COLORS.border}`,
            borderRadius: 18,
            padding: "12px 14px",
            marginBottom: 14,
          } as const;
const __style12 = { display: "flex", alignItems: "center", gap: 12 } as const;
const __style13 = { fontSize: 14, fontWeight: 700 } as const;
const __style14 = { color: "#4C6A73", display: "flex" } as const;
const __style15 = {
            background: "#121F2C",
            border: `1px solid ${COLORS.border}`,
            borderRadius: 18,
            marginBottom: 18,
            overflow: "hidden",
          } as const;
const __style16 = { padding: "0 16px" } as const;
const __style17 = { textAlign: "center", color: COLORS.muted, fontSize: 13, margin: "30px 0" } as const;
const __style18 = {
                  background: COLORS.card,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 14,
                  padding: "14px",
                  marginBottom: 12,
                } as const;
const __style19 = { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 } as const;
const __style20 = { fontSize: 15, fontWeight: 700 } as const;
const __style21 = { fontSize: 12, color: COLORS.muted } as const;
const __style22 = { display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 4 } as const;
const __style23 = { fontSize: 12.5, color: COLORS.soft2 } as const;
const __style24 = {
                width: "100%",
                border: "1px dashed #1C3A4A",
                background: "none",
                color: COLORS.muted,
                borderRadius: 14,
                padding: "16px",
                fontSize: 13,
                cursor: "pointer",
              } as const;
const __style25 = { display: "flex", justifyContent: "space-between", marginBottom: 8 } as const;
const __style26 = { fontSize: 13, fontWeight: 700 } as const;
const __style27 = { display: "flex", gap: 10, marginBottom: 10, flexWrap: "wrap" } as const;
const __style28 = { fontSize: 12, color: COLORS.soft, alignSelf: "center" } as const;
const __style29 = { display: "flex", justifyContent: "space-between", alignItems: "center" } as const;
const __style30 = { fontSize: 14, fontWeight: 700, color: COLORS.amber } as const;
const __style31 = { display: "flex", gap: 8, marginTop: 10 } as const;
const __style32 = {
                          flex: 1,
                          background: COLORS.panel,
                          border: `1px solid ${COLORS.border}`,
                          color: COLORS.soft,
                          borderRadius: 10,
                          padding: "8px",
                          fontSize: 12.5,
                          cursor: "pointer",
                        } as const;
const __style33 = {
                          flex: 1,
                          background: COLORS.greenBg,
                          border: `1px solid ${COLORS.teal}`,
                          color: COLORS.teal,
                          borderRadius: 10,
                          padding: "8px",
                          fontSize: 12.5,
                          cursor: "pointer",
                        } as const;
const __style34 = { textAlign: "center", color: COLORS.muted, fontSize: 13, marginTop: 40 } as const;
const __style35 = { display: "flex", flexDirection: "column", gap: 10 } as const;
const __style36 = { flex: 1, minWidth: 0 } as const;
const __style37 = { fontSize: 13.5, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } as const;
const __style38 = { display: "flex", alignItems: "center", gap: 6, marginTop: 2 } as const;
const __style39 = { fontSize: 12.5, color: COLORS.green, fontWeight: 800 } as const;
const __style40 = { fontSize: 11, color: COLORS.muted, textDecoration: "line-through" } as const;
const __style41 = { fontSize: 10, background: COLORS.greenBg, color: COLORS.green, border: "1px solid #51CF6666", borderRadius: 999, padding: "1px 6px", fontWeight: 800 } as const;
const __style42 = { fontSize: 12.5, color: COLORS.amber, fontWeight: 700, marginTop: 2 } as const;
const __style43 = { background: COLORS.teal, border: "none", borderRadius: 10, padding: "7px 10px", color: COLORS.bg, fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" } as const;
const __style44 = { background: "none", border: "none", color: COLORS.red, fontSize: 16, cursor: "pointer", padding: "4px 2px" } as const;
const __style45 = { background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "12px 12px" } as const;
const __style46 = { textAlign: "right" } as const;
const __style47 = { fontSize: 12.5, color: COLORS.amber, fontWeight: 700 } as const;
const __style48 = { fontSize: 10.5, color: COLORS.muted, textDecoration: "line-through" } as const;
const __style49 = { flex: 1, background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 9, padding: "8px", color: COLORS.soft, fontSize: 12, fontWeight: 600, cursor: "pointer" } as const;
const __style50 = { background: "none", border: "1px solid #FF6B6B44", borderRadius: 9, padding: "8px 12px", color: COLORS.red, fontSize: 12, fontWeight: 600, cursor: "pointer" } as const;
const __style51 = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 } as const;
const __style52 = { fontSize: 13.5, fontWeight: 800, color: COLORS.teal, letterSpacing: 0.5, marginTop: 6 } as const;
const __style53 = { fontSize: 11.5, color: COLORS.muted, marginTop: 4 } as const;
const __style54 = { marginTop: 8, width: "100%", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 9, padding: "7px", color: COLORS.soft, fontSize: 12, fontWeight: 600, cursor: "pointer" } as const;
const __style55 = { marginTop: 28, marginBottom: 8 } as const;
const __style56 = { fontSize: 11, color: COLORS.muted, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 12 } as const;
const __style57 = {
              background: "#2A2210", border: "1px solid #F0A93C44", borderRadius: 12,
              padding: "10px 12px", fontSize: 12, color: COLORS.amber, marginBottom: 10, lineHeight: 1.5,
            } as const;
const __style58 = { background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, overflow: "hidden" } as const;
const __style59 = { fontSize: 11, color: COLORS.muted, marginTop: 2 } as const;
const __style60 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } as const;
const __style61 = {
                  background: COLORS.card,
                  border: `1px solid #1C3A4A`,
                  borderRadius: 14,
                  padding: "14px 12px",
                  textAlign: "left",
                  cursor: "pointer",
                  color: COLORS.text,
                } as const;
const __style62 = { marginBottom: 8 } as const;
const __style63 = {
            position: "fixed",
            inset: 0,
            background: "rgba(5,10,16,0.7)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          } as const;
const __style64 = {
              background: COLORS.bg2,
              borderRadius: 16,
              padding: "24px 18px",
              maxWidth: 320,
              width: "100%",
              color: COLORS.text,
            } as const;
const __style65 = { fontSize: 16, fontWeight: 800, margin: "0 0 16px" } as const;
const __style66 = {
                width: "100%",
                background: COLORS.panel,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 10,
                padding: "10px 12px",
                color: COLORS.text,
                fontSize: 13,
                outline: "none",
                boxSizing: "border-box",
                marginBottom: 12,
              } as const;
const __style67 = { marginBottom: 12 } as const;
const __style68 = { fontSize: 12, color: COLORS.soft, display: "block", marginBottom: 6 } as const;
const __style69 = { width: "100%", cursor: "pointer" } as const;
const __style70 = { display: "flex", gap: 8 } as const;
const __style71 = {
                  flex: 1,
                  background: COLORS.panel,
                  border: `1px solid ${COLORS.border}`,
                  color: COLORS.soft,
                  borderRadius: 10,
                  padding: "10px",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                } as const;


export function Profile({ onBack, onOpenCatalog, orders = [], userTanks = [], setUserTanks, onTrackOrder, onRepeatOrder, onCreateTankFromOrder, onOpenDoctor, onOpenDiary, onOpenSeller, onOpenCourier, onOpenClub, onOpenAdmin, wishlist = [], onToggleWishlist, onAddToCart, subscriptions = [], onCancelSubscription, onTogglePauseSubscription, notifPrefs, onUpdateNotifPref, initialTab }) {
  const [tab, setTab] = useState(initialTab || null); // null = меню, иначе: tanks | orders | favorites | subscriptions | rewards
  const [newTankModal, setNewTankModal] = useState(false);
  const [tankName, setTankName] = useState("");
  const [tankVolume, setTankVolume] = useState(100);
  const wishlistAlerts = useMemo(() => getWishlistAlerts(wishlist), [wishlist]);
  useEffect(() => { notifyWishlistAlerts(wishlist); }, [wishlist]);

  // Локальный тост профиля — для действий, у которых нет своего экрана-подтверждения
  // (повтор заказа, создание дневника из заказа, новый аквариум и т.п.)
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  function showToast(text, type = "ok") {
    setToast({ text, type });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }

  function createNewTank() {
    if (!tankName.trim()) return;
    const newTank = {
      id: "tank_" + Math.random().toString(36).substr(2, 9),
      name: tankName,
      volume: tankVolume,
      fishList: [],
      lastWaterChange: 0,
    };
    setUserTanks((prev) => [...prev, newTank]);
    setNewTankModal(false);
    setTankName("");
    setTankVolume(100);
    showToast(`✅ Аквариум «${newTank.name}» создан`, "ok");
  }

  const PROFILE_MENU = [
    { id: "tanks", icon: "aquarium", text: "Мои аквариумы", grad: "linear-gradient(135deg, #2E86FF, #1D5FCC)" },
    { id: "orders", icon: "box", text: "Заказы", grad: "linear-gradient(135deg, #F0A93C, #C97F1F)" },
    { id: "favorites", icon: "heart", text: "Избранное", grad: "linear-gradient(135deg, #FF5C7A, #E23F5D)" },
    { id: "subscriptions", icon: "repeat", text: "Подписки", grad: "linear-gradient(135deg, #8B5CF6, #6D28D9)" },
    { id: "rewards", icon: "gift", text: "Награды", grad: "linear-gradient(135deg, #00C9B1, #00A896)" },
  ];

  return (
    <div style={__style1}>
      <div style={__style2}>
        <div style={__style3}>
          <button
            onClick={tab ? () => setTab(null) : onBack}
            aria-label={tab ? "Назад в меню профиля" : "На главную"}
            style={__style4}
          >
            <Icon name="back" size={20} />
          </button>
          <div style={__style5}>
            {tab ? (PROFILE_MENU.find((m) => m.id === tab)?.text || "Профиль") : "Профиль"}
          </div>
          <div style={__style6} />
        </div>

        {!tab && (
        <>
        <div style={__style7}>
          <div
            style={__style8}
          >
            А
          </div>
          <div style={__style9}>Алишер К.</div>
          <div style={__style10}>📍 Ташкент · с нами 3 месяца</div>
        </div>

        <div
          style={__style11}
        >
          <div style={__style12}>
            <IconBadge icon="person" grad="linear-gradient(135deg, #FF5C7A, #E23F5D)" />
            <span style={__style13}>Мой профиль</span>
          </div>
          <span style={__style14}><Icon name="chevron" size={16} /></span>
        </div>

        <div
          style={__style15}
        >
          {PROFILE_MENU.map(({ id, icon, text, grad }, i) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: tab === id ? "#17293A" : "transparent",
                border: "none",
                borderBottom: i < PROFILE_MENU.length - 1 ? `1px solid ${COLORS.border}` : "none",
                padding: "13px 14px",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div style={__style12}>
                <IconBadge icon={icon} grad={grad} />
                <span style={{ fontSize: 14, fontWeight: 700, color: tab === id ? COLORS.teal : COLORS.text }}>{text}</span>
              </div>
              <span style={__style14}><Icon name="chevron" size={16} /></span>
            </button>
          ))}
        </div>
        </>
        )}
      </div>

      <div style={__style16}>
        {tab === "tanks" && (
          <>
            {userTanks.length === 0 && (
              <div style={__style17}>
                Пока нет ни одного аквариума — оформите первый заказ с рыбами,
                и мы предложим завести аквариум автоматически.
              </div>
            )}
            {userTanks.map((t) => (
              <div
                key={t.id}
                style={__style18}
              >
                <div style={__style19}>
                  <div style={__style20}>🐠 Аквариум «{t.name}»</div>
                  <div style={__style21}>{t.volume} л</div>
                </div>
                <div style={__style22}>
                  {t.fishList.map((f) => (
                    <span key={f.name} style={__style23}>
                      {f.img} {f.name} ×{f.qty}
                    </span>
                  ))}
                </div>
                <WaterReminder days={t.lastWaterChange} tankName={t.name} notifEnabled={notifPrefs ? notifPrefs.water : true} />
              </div>
            ))}

            <button
              onClick={() => setNewTankModal(true)}
              style={__style24}
            >
              + Завести новый аквариум
            </button>
          </>
        )}

        {tab === "orders" && (
          <>
            {orders.length === 0 && (
              <div style={__style17}>
                Пока нет заказов — самое время добавить первую рыбку 🐠
              </div>
            )}
            {orders.map((o) => {
              const items = Array.isArray(o.items) ? o.items : [];
              const fishItems = items.filter((it) => it.type === "fish");
              const statusInfo = ORDER_STATUSES.find((s) => s.key === o.status) || { label: o.status || "Принят", icon: "✅" };
              const isActive = o.status && o.status !== "delivered";
              return (
                <div
                  key={o.id}
                  style={{
                    background: COLORS.card,
                    border: `1px solid ${isActive ? "#00C9B144" : COLORS.border}`,
                    borderRadius: 14,
                    padding: "14px",
                    marginBottom: 12,
                  }}
                >
                  <div style={__style25}>
                    <span style={__style26}>Заказ №{o.id}</span>
                    <span style={__style21}>{o.date}</span>
                  </div>
                  <div style={__style27}>
                    {items.map((it, idx) => (
                      <Sticker key={(it.id || it.name) + idx} e={it.img} size={38} title={it.name} />
                    ))}
                    <span style={__style28}>
                      {items.length} {items.length === 1 ? "товар" : "товара"}
                    </span>
                  </div>
                  <div style={__style29}>
                    <span
                      style={{
                        fontSize: 11.5,
                        color: o.status === "delivered" ? COLORS.teal : COLORS.amber,
                        background: o.status === "delivered" ? COLORS.greenBg : "#2A2210",
                        borderRadius: 999,
                        padding: "3px 10px",
                      }}
                    >
                      {statusInfo.icon} {statusInfo.label}
                    </span>
                    <span style={__style30}>{formatSum(o.total)}</span>
                  </div>
                  <div style={__style31}>
                    {onTrackOrder && (
                      <button
                        onClick={() => onTrackOrder(o)}
                        style={{
                          flex: 1,
                          background: isActive ? COLORS.teal : COLORS.panel,
                          border: `1px solid ${isActive ? COLORS.teal : COLORS.border}`,
                          color: isActive ? COLORS.bg : COLORS.soft,
                          borderRadius: 10,
                          padding: "8px",
                          fontSize: 12.5,
                          fontWeight: isActive ? 700 : 500,
                          cursor: "pointer",
                        }}
                      >
                        {isActive ? "🚚 Отслеживать" : "📦 Детали заказа"}
                      </button>
                    )}
                    {onRepeatOrder && (
                      <button
                        onClick={() => onRepeatOrder(o)}
                        style={__style32}
                      >
                        Повторить заказ
                      </button>
                    )}
                    {fishItems.length > 0 && onCreateTankFromOrder && (
                      <button
                        onClick={() => onCreateTankFromOrder(o)}
                        style={__style33}
                      >
                        🐠 Завести аквариум
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </>
        )}

        {tab === "favorites" && (
          wishlist.length === 0 ? (
            <div style={__style34}>
              ❤️ Пока нет избранного — отмечайте товары сердечком в каталоге
            </div>
          ) : (
            <div style={__style35}>
              {wishlist.map((f) => {
                const alert = wishlistAlerts.find((a) => a.item.id === f.id && a.type === "price_drop");
                return (
                <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 12, background: COLORS.card, border: `1px solid ${alert ? "#51CF6666" : COLORS.border}`, borderRadius: 14, padding: "10px 12px" }}>
                  <Sticker e={f.img} size={46} radius={12} />
                  <div style={__style36}>
                    <div style={__style37}>{f.name}</div>
                    {alert ? (
                      <div style={__style38}>
                        <span style={__style39}>{formatSum(alert.live.price)}</span>
                        <span style={__style40}>{formatSum(f.price)}</span>
                        <span style={__style41}>−{alert.pct}%</span>
                      </div>
                    ) : (
                      <div style={__style42}>{formatSum(f.price)}</div>
                    )}
                  </div>
                  {onAddToCart && (
                    <button onClick={() => onAddToCart(f)} style={__style43}>+ 🛒</button>
                  )}
                  {onToggleWishlist && (
                    <button onClick={() => onToggleWishlist(f)} style={__style44}>🗑️</button>
                  )}
                </div>
              );})}
            </div>
          )
        )}

        {tab === "subscriptions" && (
          subscriptions.length === 0 ? (
            <div style={__style34}>
              🔁 Нет активных подписок — оформите подписку на корм в карточке товара и получайте скидку 10% на каждую доставку
            </div>
          ) : (
            <div style={__style35}>
              {subscriptions.map((s) => {
                const intervalLabel = (SUBSCRIPTION_INTERVALS.find((o) => o.weeks === s.intervalWeeks) || {}).label || `Каждые ${s.intervalWeeks} нед.`;
                const discountedPrice = Math.round(s.product.price * (1 - SUBSCRIPTION_DISCOUNT));
                return (
                  <div key={s.id} style={__style45}>
                    <div style={__style12}>
                      <Sticker e={s.product.img} size={46} radius={12} />
                      <div style={__style36}>
                        <div style={__style37}>{s.product.name}</div>
                        <div style={__style10}>{intervalLabel}</div>
                      </div>
                      <div style={__style46}>
                        <div style={__style47}>{formatSum(discountedPrice)}</div>
                        <div style={__style48}>{formatSum(s.product.price)}</div>
                      </div>
                    </div>
                    <div style={{
                      marginTop: 10, fontSize: 12, color: s.paused ? COLORS.amber : COLORS.teal,
                      background: s.paused ? "#2A2210" : COLORS.greenBg,
                      border: `1px solid ${s.paused ? "#F0A93C44" : "#00C9B144"}`,
                      borderRadius: 9, padding: "7px 10px",
                    }}>
                      {s.paused ? "⏸ Подписка на паузе" : `📅 Следующая доставка: ${fmtDate(s.nextDate)}`}
                    </div>
                    <div style={__style31}>
                      {onTogglePauseSubscription && (
                        <button
                          onClick={() => onTogglePauseSubscription(s.id)}
                          style={__style49}
                        >
                          {s.paused ? "▶️ Возобновить" : "⏸ Поставить на паузу"}
                        </button>
                      )}
                      {onCancelSubscription && (
                        <button
                          onClick={() => onCancelSubscription(s.id)}
                          style={__style50}
                        >
                          Отменить
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}

        {tab === "rewards" && (() => {
          const rewardPromos = getRewardPromos();
          const entries = Object.entries(rewardPromos).sort((a, b) => (b[1].usedAt ? 0 : 1) - (a[1].usedAt ? 0 : 1));
          if (entries.length === 0) {
            return (
              <div style={__style34}>
                🎁 Пока нет наград — открывайте бейджи в дневнике аквариума, и сюда будут падать рабочие промокоды на скидку
              </div>
            );
          }
          return (
            <div style={__style35}>
              {entries.map(([code, r]) => {
                const used = !!r.usedAt;
                return (
                  <div key={code} style={{
                    background: COLORS.card, border: `1px solid ${used ? COLORS.border : "#F0A93C44"}`,
                    borderRadius: 14, padding: "12px 14px", opacity: used ? 0.55 : 1,
                  }}>
                    <div style={__style51}>
                      <div style={__style26}>{r.label}</div>
                      <span style={{
                        fontSize: 10, fontWeight: 800, borderRadius: 999, padding: "2px 8px", whiteSpace: "nowrap",
                        background: used ? COLORS.border : "#F0A93C22", color: used ? COLORS.muted : COLORS.amber,
                      }}>
                        {used ? "Использован" : "Доступен"}
                      </span>
                    </div>
                    <div style={__style52}>{code}</div>
                    <div style={__style53}>
                      −{r.percent}% · от {formatSum(r.minOrderSum || 0)}
                      {used && r.usedAt ? ` · применён ${fmtDate(r.usedAt)}` : ""}
                    </div>
                    {!used && (
                      <button
                        onClick={() => navigator.clipboard?.writeText(code)}
                        style={__style54}
                      >
                        📋 Скопировать код
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })()}

        {!tab && (
        <>
        {/* ---- Уведомления (Telegram push) ---- */}
        <div style={__style55}>
          <div style={__style56}>
            🔔 Уведомления в Telegram
          </div>
          {!tgUser?.id && (
            <div style={__style57}>
              ⚠️ Откройте AquaMarjon через Telegram-бота, чтобы получать пуши — сейчас приложение открыто в браузере.
            </div>
          )}
          <div style={__style58}>
            {[
              { key: "water", icon: "water", grad: "linear-gradient(135deg, #2EA0FF, #1D6FCC)", label: "Напоминания о смене воды", sub: "Когда пора менять воду в аквариуме" },
              { key: "delivery", icon: "truck", grad: "linear-gradient(135deg, #F0A93C, #C97F1F)", label: "Статус доставки", sub: "Принят · Собран · В пути · Доставлен" },
              { key: "arrivals", icon: "fish", grad: "linear-gradient(135deg, #00C9B1, #00A896)", label: "Новые поступления рыб", sub: "Когда привозят редкие или популярные виды" },
            ].map((row, i) => (
              <div
                key={row.key}
                style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                  borderTop: i === 0 ? "none" : `1px solid ${COLORS.border}`,
                }}
              >
                <IconBadge icon={row.icon} grad={row.grad} size={32} />
                <div style={__style36}>
                  <div style={__style26}>{row.label}</div>
                  <div style={__style59}>{row.sub}</div>
                </div>
                <button
                  onClick={() => onUpdateNotifPref && onUpdateNotifPref(row.key, !(notifPrefs && notifPrefs[row.key]))}
                  style={{
                    width: 40, height: 24, borderRadius: 12, border: "none", cursor: "pointer", flexShrink: 0,
                    background: notifPrefs && notifPrefs[row.key] ? COLORS.teal : COLORS.border,
                    position: "relative", transition: "background 0.15s",
                  }}
                >
                  <span style={{
                    position: "absolute", top: 3, left: notifPrefs && notifPrefs[row.key] ? 19 : 3,
                    width: 18, height: 18, borderRadius: "50%", background: COLORS.bg,
                    transition: "left 0.15s",
                  }} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Сервисы ---- */}
        <div style={__style55}>
          <div style={__style56}>Сервисы</div>
          <div style={__style60}>
            {[
              { icon: "doctor", grad: "linear-gradient(135deg, #00C9B1, #00A896)", label: "AI-доктор рыб", sub: "Диагноз по симптомам", action: onOpenDoctor, accent: COLORS.teal },
              { icon: "edit", grad: "linear-gradient(135deg, #4D9FFE, #2F6FCB)", label: "Дневник аквариума", sub: "Уход и напоминания", action: onOpenDiary, accent: COLORS.soft },
              { icon: "cart", grad: "linear-gradient(135deg, #F0A93C, #C97F1F)", label: "Кабинет продавца", sub: "Продавайте рыб", action: onOpenSeller, accent: COLORS.amber },
              { icon: "truck", grad: "linear-gradient(135deg, #9FC4CC, #5D8A93)", label: "Кабинет курьера", sub: "Доставляйте заказы", action: onOpenCourier, accent: COLORS.soft },
              { icon: "group", grad: "linear-gradient(135deg, #8B5CF6, #6D28D9)", label: "Клуб аквариумистов", sub: "Общение и советы", action: onOpenClub, accent: COLORS.soft },
              { icon: "settings", grad: "linear-gradient(135deg, #F0A93C, #C97F1F)", label: "Admin-панель", sub: "Управление системой", action: onOpenAdmin, accent: COLORS.amber },
            ].map(s => (
              <button
                key={s.label}
                onClick={s.action}
                style={__style61}
              >
                <div style={__style62}><IconBadge icon={s.icon} grad={s.grad} size={38} /></div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: s.accent, lineHeight: 1.3 }}>{s.label}</div>
                <div style={__style59}>{s.sub}</div>
              </button>
            ))}
          </div>
        </div>
        </>
        )}
      </div>

      {newTankModal && (
        <div
          style={__style63}
          onClick={() => setNewTankModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={__style64}
          >
            <h3 style={__style65}>Новый аквариум</h3>
            <input
              value={tankName}
              onChange={(e) => setTankName(e.target.value)}
              placeholder="Название (например, Гостиная)"
              style={__style66}
            />
            <div style={__style67}>
              <label style={__style68}>
                Объём: {tankVolume} л
              </label>
              <input
                type="range"
                min={20}
                max={350}
                step={10}
                value={tankVolume}
                onChange={(e) => setTankVolume(Number(e.target.value))}
                style={__style69}
              />
            </div>
            <div style={__style70}>
              <button
                onClick={() => setNewTankModal(false)}
                style={__style71}
              >
                Отмена
              </button>
              <button
                onClick={createNewTank}
                disabled={!tankName.trim()}
                style={{
                  flex: 1,
                  background: tankName.trim() ? COLORS.teal : COLORS.border,
                  border: "none",
                  color: tankName.trim() ? COLORS.bg : COLORS.muted,
                  borderRadius: 10,
                  padding: "10px",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: tankName.trim() ? "pointer" : "not-allowed",
                }}
              >
                Создать
              </button>
            </div>
          </div>
        </div>
      )}
      <Toast toast={toast} />
    </div>
  );
}

/* ============================================================
   🏪 КАБИНЕТ ПРОДАВЦА — полноценный модуль
   ============================================================ */

// Демо-данные продавца
