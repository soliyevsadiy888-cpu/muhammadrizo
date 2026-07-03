import React, { useState } from "react";
import { COLORS } from "../../theme";
import { AppleEmoji } from "../../components/ui/AppleEmoji";
import { Icon } from "../../components/ui/Icon";
import { IconBadge } from "../../components/ui/IconBadge";
import { HOME_BANNERS, HOME_CATEGORIES } from "../../data/home-content";
import { Catalog } from "../catalog/Catalog";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { minHeight: "100vh", background: COLORS.bg, color: COLORS.text, fontFamily: "system-ui, -apple-system, sans-serif", paddingBottom: 90 } as const;
const __style2 = { padding: "16px 16px 0" } as const;
const __style3 = { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 } as const;
const __style4 = { display: "flex", alignItems: "center", gap: 8 } as const;
const __style5 = { fontSize: 20 } as const;
const __style6 = { fontSize: 17, fontWeight: 900, letterSpacing: "-0.03em", color: COLORS.teal } as const;
const __style7 = { display: "flex", alignItems: "center", gap: 10 } as const;
const __style8 = { fontSize: 12, color: COLORS.muted } as const;
const __style9 = {
                background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0,
              } as const;
const __style10 = {
              flex: 1, display: "flex", alignItems: "center", gap: 8,
              background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 14,
              padding: "12px 14px", cursor: "pointer", textAlign: "left",
            } as const;
const __style11 = { color: COLORS.muted, display: "flex" } as const;
const __style12 = { fontSize: 14, color: COLORS.muted } as const;
const __style13 = {
              position: "relative", flexShrink: 0,
            } as const;
const __style14 = { position: "absolute", top: -5, right: -5, background: COLORS.teal, color: COLORS.bg, fontSize: 9, fontWeight: 800, borderRadius: 999, padding: "1px 5px", minWidth: 14, textAlign: "center" } as const;
const __style15 = { display: "flex", gap: 12, overflowX: "auto", padding: "16px 16px", scrollSnapType: "x mandatory" } as const;
const __style16 = { fontSize: 16, fontWeight: 900, color: COLORS.bg, marginBottom: 2, lineHeight: 1.25 } as const;
const __style17 = { fontSize: 12, fontWeight: 600, color: COLORS.bg, opacity: 0.8 } as const;
const __style18 = { display: "flex", gap: 5, justifyContent: "center", marginBottom: 22 } as const;
const __style19 = { padding: "0 16px" } as const;
const __style20 = { fontSize: 15, fontWeight: 800, margin: "0 0 12px", letterSpacing: "-0.01em" } as const;
const __style21 = { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 } as const;
const __style22 = { marginTop: 20 } as const;
const __style23 = { fontSize: 15, fontWeight: 800, margin: "0 0 4px", padding: "0 16px", letterSpacing: "-0.01em" } as const;
const __style24 = {
          position: "fixed", bottom: 14, left: 12, right: 12,
          background: "rgba(16, 28, 40, 0.55)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 26,
          display: "flex", justifyContent: "space-around",
          padding: "10px 6px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
          zIndex: 90,
        } as const;
const __style25 = { position: "relative", display: "flex", justifyContent: "center", marginBottom: 3 } as const;
const __style26 = { position: "absolute", top: -4, right: -6, background: COLORS.teal, color: COLORS.bg, fontSize: 9, fontWeight: 800, borderRadius: 999, padding: "1px 5px" } as const;


export function HomeScreen({
  region, cart, setCart, wishlist, onToggleWishlist, subscriptions, onSubscribe,
  onOpenCatalog, onOpenCart, onOpenProfile, onOpenFavorites, onOpenDoctor, onOpenConfigurator,
  onOrderPlaced, quizFilter, onClearQuizFilter, onOpenDiary,
}) {
  const [bannerIdx, setBannerIdx] = useState(0);
  const [filterSeed, setFilterSeed] = useState(null);

  function handleCategorySelect(c) {
    setFilterSeed({ token: Date.now(), search: c.search || "", cat: c.cat || "all" });
  }

  return (
    <div style={__style1}>
      {/* Шапка */}
      <div style={__style2}>
        <div style={__style3}>
          <div style={__style4}>
            <span style={__style5}>🐠</span>
            <span style={__style6}>AquaMarjon</span>
          </div>
          <div style={__style7}>
            {region && (
              <span style={__style8}>📍 {region}</span>
            )}
            <button
              onClick={onOpenProfile}
              style={__style9}
            >
              <IconBadge icon="person" size={34} grad="linear-gradient(135deg, #2E86FF, #1D5FCC)" />
            </button>
          </div>
        </div>

        {/* Поиск + избранное */}
        <div style={__style7}>
          <button
            onClick={onOpenCatalog}
            style={__style10}
          >
            <span style={__style11}><Icon name="search" size={16} /></span>
            <span style={__style12}>Поиск рыб и товаров</span>
          </button>
          <button
            onClick={onOpenFavorites}
            style={__style13}
          >
            <IconBadge icon="heart" size={44} grad="linear-gradient(135deg, #FF5C7A, #E23F5D)" />
            {wishlist && wishlist.length > 0 && (
              <span style={__style14}>
                {wishlist.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Баннеры — горизонтальная карусель */}
      <div
        style={__style15}
        onScroll={(e) => {
          const w = e.currentTarget.clientWidth;
          const idx = Math.round(e.currentTarget.scrollLeft / (w * 0.86 + 12));
          if (idx !== bannerIdx) setBannerIdx(idx);
        }}
      >
        {HOME_BANNERS.map((b, i) => (
          <button
            key={i}
            onClick={onOpenCatalog}
            style={{
              flex: "0 0 86%", scrollSnapAlign: "start",
              background: b.bg, border: "none", borderRadius: 18,
              padding: "20px 18px", textAlign: "left", cursor: "pointer",
              minHeight: 110, display: "flex", flexDirection: "column", justifyContent: "space-between",
              boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
            }}
          >
            <AppleEmoji e={b.emoji} size={30} />
            <div>
              <div style={__style16}>{b.title}</div>
              <div style={__style17}>{b.sub}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Индикаторы баннеров */}
      <div style={__style18}>
        {HOME_BANNERS.map((_, i) => (
          <span key={i} style={{ width: i === bannerIdx ? 16 : 6, height: 6, borderRadius: 999, background: i === bannerIdx ? COLORS.teal : COLORS.border, transition: "all 0.2s" }} />
        ))}
      </div>

      {/* Важные категории */}
      <div style={__style19}>
        <h2 style={__style20}>Популярные категории</h2>
        <div style={__style21}>
          {HOME_CATEGORIES.map((c) => {
            const isActive = filterSeed && (
              (c.search && filterSeed.search === c.search) ||
              (c.cat && !c.search && filterSeed.cat === c.cat)
            );
            return (
              <button
                key={c.label}
                onClick={() => handleCategorySelect(c)}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                  background: isActive ? COLORS.greenBg : COLORS.panel,
                  border: `1px solid ${isActive ? COLORS.teal : COLORS.border}`,
                  borderRadius: 14,
                  padding: "14px 6px", cursor: "pointer",
                }}
              >
                <AppleEmoji e={c.icon} size={26} />
                <span style={{ fontSize: 11, fontWeight: 600, color: isActive ? COLORS.teal : COLORS.text, textAlign: "center", lineHeight: 1.2 }}>{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Каталог рыб — встроен прямо на главной, под категориями.
          Выбор категории выше фильтрует список ниже на месте, без перехода на отдельный экран. */}
      <div style={__style22}>
        <h2 style={__style23}>Каталог рыб</h2>
        <Catalog
          region={region}
          cart={cart}
          setCart={setCart}
          onOpenConfigurator={onOpenConfigurator}
          onOpenProfile={onOpenProfile}
          onOpenDoctor={onOpenDoctor}
          onOrderPlaced={onOrderPlaced}
          hideHeader
          hideBottomNav
          quizFilter={quizFilter}
          onClearQuizFilter={onClearQuizFilter}
          wishlist={wishlist}
          onToggleWishlist={onToggleWishlist}
          subscriptions={subscriptions}
          onSubscribe={onSubscribe}
          filterSeed={filterSeed}
          onOpenDiary={onOpenDiary}
        />
      </div>

      {/* Нижняя навигация: Главная · Каталог · Доктор · AI Подбор · Я — как в каталоге, чтобы не «прыгала» */}
      <div
        style={__style24}
      >
        {[
          ["home", "Главная", null, true],
          ["fish", "Каталог", onOpenCatalog, false],
          ["cart", "Корзина", onOpenCart, false],
          ["doctor", "Доктор", onOpenDoctor, false],
          ["ai", "AI Подбор", onOpenConfigurator, false],
        ].map(([icon, label, action, active]) => (
          <button
            key={label}
            onClick={action || undefined}
            aria-label={label === "Корзина" && cart && cart.length > 0 ? `Открыть корзину, товаров: ${cart.length}` : undefined}
            style={{
              position: "relative", textAlign: "center",
              color: active ? COLORS.teal : COLORS.muted,
              fontSize: 10.5, fontWeight: active ? 700 : 500,
              background: active ? "rgba(255,255,255,0.06)" : "none",
              border: "none", borderRadius: 14, padding: "6px 10px",
              cursor: action ? "pointer" : "default",
              transition: "background 0.2s",
            }}
          >
            <div style={__style25}>
              <Icon name={icon} size={20} />
              {label === "Корзина" && cart && cart.length > 0 && (
                <span style={__style26}>
                  {cart.length}
                </span>
              )}
            </div>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

