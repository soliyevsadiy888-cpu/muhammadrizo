import React, { useMemo } from "react";
import { COLORS } from "../../theme";
import type { CompatResult, Fish } from "../../types";
import { AppleEmoji } from "../../components/ui/AppleEmoji";
import { formatSum, getStock } from "../../lib/catalog-utils";
import { diaryPluralRu } from "../../lib/diary-stats";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { width: "100%", height: "100%", objectFit: "cover" } as const;
const __style2 = {
            position: "absolute", bottom: 8, left: 8,
            background: "rgba(8,19,31,0.75)", color: COLORS.soft,
            fontSize: 10.5, fontWeight: 700, borderRadius: 8, padding: "3px 7px",
          } as const;
const __style3 = {
              position: "absolute",
              top: 8,
              left: 8,
              background: COLORS.teal,
              color: COLORS.bg,
              fontSize: 11,
              fontWeight: 800,
              borderRadius: 8,
              padding: "3px 7px",
            } as const;
const __style4 = {
              position: "absolute", bottom: 8, right: 8,
              background: "rgba(8,19,31,0.7)", border: "none",
              borderRadius: "50%", width: 28, height: 28,
              fontSize: 14, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            } as const;
const __style5 = { padding: "10px 12px 12px" } as const;
const __style6 = { display: "flex", gap: 4, marginBottom: 6, flexWrap: "wrap" } as const;
const __style7 = {
                fontSize: 10,
                background: COLORS.panel,
                color: COLORS.soft,
                borderRadius: 6,
                padding: "2px 6px",
              } as const;
const __style8 = {
                fontSize: 10, fontWeight: 700,
                background: COLORS.greenBg, color: COLORS.teal,
                border: "1px solid #00C9B144",
                borderRadius: 6,
                padding: "2px 6px",
              } as const;
const __style9 = {
            display: "inline-block", fontSize: 10.5, fontWeight: 700,
            color: COLORS.amber, background: "#2A1F0E", border: "1px solid #F0A93C44",
            borderRadius: 6, padding: "2px 7px", marginBottom: 6,
          } as const;
const __style10 = { fontSize: 14, fontWeight: 700, color: COLORS.text, lineHeight: 1.25 } as const;
const __style11 = { fontSize: 11, color: COLORS.muted, marginTop: 2 } as const;
const __style12 = {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 8,
          } as const;
const __style13 = { fontSize: 15, fontWeight: 800, color: COLORS.amber } as const;
const __style14 = { display: "flex", gap: 5 } as const;
const __style15 = {
                  background: COLORS.teal, color: COLORS.bg, border: "none", borderRadius: 10,
                  padding: "6px 12px", fontSize: 13, fontWeight: 700, cursor: "pointer",
                } as const;


export interface FishCardProps {
  fish: Fish;
  compat?: CompatResult;
  inCart?: number;
  onOpen: (fish: Fish) => void;
  onAdd: (fish: Fish) => void;
  onCompare: (fish: Fish) => void;
  inCompare?: boolean;
  isFav?: boolean;
  onToggleFav: (fish: Fish) => void;
}

export const FishCard = React.memo(function FishCard({ fish, compat, inCart, onOpen, onAdd, onCompare, inCompare, isFav, onToggleFav }: FishCardProps) {
  const ringColor =
    compat.level === "bad" ? COLORS.red : compat.level === "warn" ? COLORS.amber : COLORS.border;
  const stock = useMemo(() => (fish.isSpeciesGroup ? null : getStock(fish)), [fish.id, fish.isSpeciesGroup]);
  const lowStock = stock != null && stock <= 4;
  return (
    <div
      onClick={() => onOpen(fish)}
      role="button"
      tabIndex={0}
      aria-label={`Открыть карточку «${fish.name}»`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(fish);
        }
      }}
      style={{
        background: COLORS.card,
        border: `1px solid ${ringColor}`,
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          aspectRatio: "1/1",
          background: `radial-gradient(circle at 50% 35%, ${fish.color}22, #050B12 75%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {fish.photo ? (
          <img src={fish.photo} alt={fish.name} style={__style1} />
        ) : (
          <AppleEmoji e={fish.img} size={58} />
        )}
        {fish.isSpeciesGroup && (
          <div style={__style2}>
            🖼 {fish.variantsCount} {diaryPluralRu(fish.variantsCount, "вид", "вида", "видов")}
          </div>
        )}
        {compat.level !== "ok" && (
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              background: compat.level === "bad" ? COLORS.red : COLORS.amber,
              color: COLORS.bg,
              fontSize: 11,
              fontWeight: 700,
              borderRadius: 8,
              padding: "3px 6px",
            }}
          >
            ⚠️
          </div>
        )}
        {inCart > 0 && (
          <div
            style={__style3}
          >
            ×{inCart}
          </div>
        )}
        {onToggleFav && (
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFav(fish); }}
            title={isFav ? "Убрать из избранного" : "В избранное"}
            aria-label={isFav ? `Убрать «${fish.name}» из избранного` : `Добавить «${fish.name}» в избранное`}
            aria-pressed={isFav}
            style={__style4}
          >{isFav ? "❤️" : "🤍"}</button>
        )}
      </div>
      <div style={__style5}>
        <div style={__style6}>
          {fish.badges.map((b) => (
            <span
              key={b}
              style={__style7}
            >
              {b}
            </span>
          ))}
          {fish.type === "food" && (
            <span
              style={__style8}
            >
              🔁 Подписка −10%
            </span>
          )}
        </div>
        {lowStock && (
          <div style={__style9}>
            🔥 Осталось {stock} шт
          </div>
        )}
        <div style={__style10}>
          {fish.name}
        </div>
        <div style={__style11}>
          ⭐ {fish.rating} ({fish.reviews})
        </div>
        <div
          style={__style12}
        >
          <span style={__style13}>
            {fish.isSpeciesGroup ? `от ${formatSum(fish.price)}` : formatSum(fish.price)}
          </span>
          <div style={__style14}>
            {fish.type === "fish" && onCompare && !fish.isSpeciesGroup && (
              <button
                onClick={(e) => { e.stopPropagation(); onCompare(fish); }}
                style={{
                  background: inCompare ? COLORS.amber : COLORS.panel, color: inCompare ? COLORS.bg : COLORS.soft,
                  border: `1px solid ${inCompare ? COLORS.amber : COLORS.border}`, borderRadius: 10,
                  padding: "6px 8px", fontSize: 12, cursor: "pointer", fontWeight: inCompare ? 800 : 400,
                }}
                title="Сравнить"
                aria-label={inCompare ? `Убрать «${fish.name}» из сравнения` : `Добавить «${fish.name}» к сравнению`}
                aria-pressed={inCompare}
              >⚖️</button>
            )}
            {fish.isSpeciesGroup ? (
              <button
                onClick={(e) => { e.stopPropagation(); onOpen(fish); }}
                aria-label={`Смотреть карточки вида «${fish.name}»`}
                style={__style15}
              >
                Виды →
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd(fish);
                }}
                aria-label={`Добавить «${fish.name}» в корзину`}
                style={{
                  background: compat.level === "bad" ? COLORS.border : COLORS.teal,
                  color: compat.level === "bad" ? COLORS.muted : COLORS.bg,
                  border: "none",
                  borderRadius: 10,
                  padding: "6px 12px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                + {fish.type === "fish" ? "🐠" : "🛒"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

/* ---------- Fish detail sheet ---------- */
