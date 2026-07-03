import React, { useEffect, useState } from "react";
import { COLORS } from "../../theme";
import { AppleEmoji } from "../../components/ui/AppleEmoji";
import { getReviewsList } from "../../data/reviews";
import { formatSum, getStock } from "../../lib/catalog-utils";
import { parseProSpecs } from "../../lib/fish-specs";
import { SUBSCRIPTION_DISCOUNT, SUBSCRIPTION_INTERVALS, fmtDate } from "../../lib/subscriptions";
import { ARPreview } from "./ARPreview";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = {
      background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12,
      padding: "12px 14px", display: "flex", flexDirection: "column", gap: 4,
    } as const;
const __style2 = { fontSize: 18 } as const;
const __style3 = { fontSize: 11, color: COLORS.muted, fontWeight: 600 } as const;
const __style4 = { fontSize: 15, fontWeight: 800, color: COLORS.teal } as const;
const __style5 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 } as const;
const __style6 = { background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "14px 16px", fontSize: 14, lineHeight: 1.6, color: COLORS.soft2 } as const;
const __style7 = { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 } as const;
const __style8 = { fontSize: 11.5, color: COLORS.muted } as const;
const __style9 = { fontSize: 12, color: COLORS.muted, marginBottom: 10 } as const;
const __style10 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } as const;
const __style11 = {
        position: "fixed",
        inset: 0,
        background: "rgba(5,10,16,0.7)",
        zIndex: 150,
        display: "flex",
        alignItems: "flex-end",
      } as const;
const __style12 = {
          background: COLORS.bg2,
          width: "100%",
          maxHeight: "88vh",
          overflowY: "auto",
          borderRadius: "20px 20px 0 0",
          color: COLORS.text,
          animation: "sheetUp 0.25s ease-out",
        } as const;
const __style13 = { width: "100%", height: "100%", objectFit: "cover" } as const;
const __style14 = {
                position: "absolute",
                top: 12,
                right: 56,
                background: "rgba(0,0,0,0.4)",
                border: "none",
                color: COLORS.text,
                borderRadius: 999,
                width: 32,
                height: 32,
                fontSize: 16,
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              } as const;
const __style15 = {
              position: "absolute",
              top: 12,
              right: 12,
              background: "rgba(0,0,0,0.4)",
              border: "none",
              color: COLORS.text,
              borderRadius: 999,
              width: 32,
              height: 32,
              fontSize: 16,
              cursor: "pointer",
            } as const;
const __style16 = { padding: "16px 18px 0" } as const;
const __style17 = { display: "flex", gap: 4, marginBottom: 8, flexWrap: "wrap" } as const;
const __style18 = {
                  fontSize: 11,
                  background: COLORS.panel,
                  color: COLORS.soft,
                  borderRadius: 6,
                  padding: "3px 7px",
                } as const;
const __style19 = { fontSize: 20, fontWeight: 800, margin: "0 0 2px" } as const;
const __style20 = { fontSize: 12, color: COLORS.muted, fontStyle: "italic" } as const;
const __style21 = { fontSize: 13, color: COLORS.soft, marginTop: 4 } as const;
const __style22 = { marginTop: 10 } as const;
const __style23 = { fontSize: 12, color: COLORS.muted, marginBottom: 6 } as const;
const __style24 = { display: "flex", gap: 6, flexWrap: "wrap" } as const;
const __style25 = { display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" } as const;
const __style26 = {
                fontSize: 11, fontWeight: 700, color: COLORS.amber,
                background: "#2A1F0E", border: "1px solid #F0A93C44",
                borderRadius: 7, padding: "3px 8px",
              } as const;
const __style27 = {
                fontSize: 11, fontWeight: 700, color: COLORS.teal,
                background: COLORS.greenBg, border: "1px solid #00C9B144",
                borderRadius: 7, padding: "3px 8px",
              } as const;
const __style28 = {
                marginTop: 12,
                background: COLORS.greenBg,
                border: `1px solid ${COLORS.teal}`,
                borderRadius: 10,
                padding: "10px 12px",
                fontSize: 13,
              } as const;
const __style29 = { display: "flex", gap: 6, marginTop: 16, borderBottom: `1px solid ${COLORS.border}` } as const;
const __style30 = { padding: "14px 0 20px", fontSize: 14, lineHeight: 1.6, color: COLORS.soft2 } as const;
const __style31 = { display: "flex", flexDirection: "column", gap: 10 } as const;
const __style32 = {
                    background: COLORS.card, border: `1px solid ${COLORS.border}`,
                    borderRadius: 12, padding: "12px 14px",
                  } as const;
const __style33 = { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 } as const;
const __style34 = { fontWeight: 700, fontSize: 13, color: COLORS.text } as const;
const __style35 = { fontSize: 12, color: COLORS.amber } as const;
const __style36 = { fontSize: 13, color: COLORS.soft, lineHeight: 1.55 } as const;
const __style37 = { fontSize: 11.5, color: COLORS.muted, textAlign: "center", marginTop: 2 } as const;
const __style38 = {
            position: "sticky",
            bottom: 0,
            background: COLORS.bg2,
            borderTop: `1px solid ${COLORS.border}`,
            padding: "12px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          } as const;
const __style39 = { display: "flex", gap: 8 } as const;
const __style40 = {
                  flex: 1,
                  background: COLORS.panel, color: COLORS.soft,
                  border: `1px solid ${COLORS.border}`, borderRadius: 12,
                  padding: "10px", fontSize: 13, fontWeight: 600, cursor: "pointer",
                } as const;
const __style41 = {
                background: COLORS.greenBg,
                border: `1px solid ${COLORS.teal}`,
                borderRadius: 12,
                padding: "12px 14px",
              } as const;
const __style42 = { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 } as const;
const __style43 = { fontSize: 13, fontWeight: 700, color: COLORS.teal } as const;
const __style44 = {
                  fontSize: 11, fontWeight: 700, color: COLORS.bg,
                  background: COLORS.amber, borderRadius: 6, padding: "2px 7px",
                } as const;
const __style45 = { fontSize: 12.5, color: COLORS.soft, marginBottom: 10, lineHeight: 1.5 } as const;
const __style46 = { fontSize: 11.5, color: COLORS.muted, marginBottom: 10 } as const;
const __style47 = {
                  width: "100%",
                  background: "none",
                  border: `1px solid ${COLORS.teal}`,
                  borderRadius: 10,
                  padding: "9px",
                  color: COLORS.teal,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                } as const;
const __style48 = { display: "flex", alignItems: "center", gap: 12 } as const;
const __style49 = { fontSize: 18, fontWeight: 800, color: COLORS.amber } as const;


export const TEMPER_LABELS = { peaceful: "🕊 Миролюбивая", aggressive: "🔥 Территориальная", semi: "⚖️ Полу-агрессивная" };

export const SIZE_LABELS = { small: "Маленькая", medium: "Средняя", large: "Крупная" };

export const DIFFICULTY_LABELS = { easy: "Легко", medium: "Средне", hard: "Для опытных" };


export interface SpecCardProps {
  icon: React.ReactNode;
  label?: string;
  value: React.ReactNode;
}

export const SpecCard = React.memo(function SpecCard({ icon, label, value }: SpecCardProps) {
  return (
    <div style={__style1}>
      <div style={__style2}>{icon}</div>
      {label && <div style={__style3}>{label}</div>}
      <div style={__style4}>{value}</div>
    </div>
  );
});

/* ---------- «О рыбке» — короткие факты сеткой + текст в карточке ---------- */

export function FactsStrip({ fish }) {
  if (fish.type !== "fish") return null;
  return (
    <div style={__style5}>
      {fish.temp && <SpecCard icon="🌡️" label="Температура" value={`${fish.temp[0]}–${fish.temp[1]}°C`} />}
      {fish.temper && <SpecCard icon="🤝" label="Характер" value={TEMPER_LABELS[fish.temper] || fish.temper} />}
      {fish.size && <SpecCard icon="📏" label="Размер рыбки" value={SIZE_LABELS[fish.size] || fish.size} />}
      {fish.difficulty && <SpecCard icon="🎓" label="Сложность" value={DIFFICULTY_LABELS[fish.difficulty] || fish.difficulty} />}
    </div>
  );
}

export function AboutTab({ fish }) {
  return (
    <div>
      <FactsStrip fish={fish} />
      <div style={__style6}>
        {fish.about}
      </div>
    </div>
  );
}

/* ---------- «Откуда» — бейдж происхождения + карточка-история ---------- */

export function OriginCard({ fish }) {
  const isImport = fish.origin === "import";
  const story = (fish.origin_story || "").replace(/^(?:🌏|🏠)\s*/, "");
  return (
    <div>
      <div style={__style7}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          background: isImport ? "#2A1F0F" : COLORS.greenBg,
          border: `1px solid ${isImport ? COLORS.amber : COLORS.teal}`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
        }}>
          {isImport ? "✈️" : "🏠"}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: isImport ? COLORS.amber : COLORS.teal }}>
            {isImport ? "Привозная рыбка" : "Выращена локально"}
          </div>
          <div style={__style8}>
            {isImport ? "Прошла карантин перед продажей" : "В Ташкенте, без долгой перевозки"}
          </div>
        </div>
      </div>
      <div style={__style6}>
        {story}
      </div>
    </div>
  );
}

export function ProSpecsGrid({ text }) {
  const specs = parseProSpecs(text);
  if (specs.length === 0) return null;
  return (
    <div>
      <div style={__style9}>Параметры воды для этого вида</div>
      <div style={__style10}>
        {specs.map((s, i) => <SpecCard key={i} icon={s.icon} label={s.label} value={s.value} />)}
      </div>
    </div>
  );
}


export function FishDetail({ fish, compat, onClose, onAdd, onCompare, inCompare, isFav, onToggleFav, onSubscribe, activeSubscription, onShare }) {
  const [tab, setTab] = useState("about");
  const [arOpen, setArOpen] = useState(false);
  const [subInterval, setSubInterval] = useState((activeSubscription && activeSubscription.intervalWeeks) || 4);
  const [activeSizeId, setActiveSizeId] = useState(fish && fish.sizeId);
  useEffect(() => { setActiveSizeId(fish && fish.sizeId); }, [fish && fish.id]);
  if (!fish) return null;
  const hasSizes = fish.sizeSiblings && fish.sizeSiblings.length > 1;
  const activeSib = hasSizes ? (fish.sizeSiblings.find(s => s.sizeId === activeSizeId) || fish.sizeSiblings[0]) : null;
  // effectiveFish — та же карточка, но с ценой/фото/остатком актуального выбранного размера
  const fishBase = hasSizes ? { ...fish, id: activeSib.id, sizeId: activeSib.sizeId, cm: activeSib.cm, price: activeSib.price } : fish;
  const titleLabel = fish.variantName ? `${fish.speciesName} «${fish.variantName}»` : fish.name;
  const stock = getStock(fishBase);
  const lowStock = stock <= 4;
  const reviewsList = getReviewsList(fishBase);
  return (
    <div
      style={__style11}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={__style12}
      >
        <div
          style={{
            aspectRatio: "16/10",
            background: `radial-gradient(circle at 50% 35%, ${fish.color}22, #050B12 80%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {fishBase.photo ? (
            <img src={fishBase.photo} alt={titleLabel} style={__style13} />
          ) : (
            <AppleEmoji e={fish.img} size={96} />
          )}
          {onShare && (
            <button
              onClick={() => onShare(fishBase)}
              style={__style14}
              aria-label={`Поделиться карточкой «${titleLabel}»`}
              title="Поделиться"
            >
              🔗
            </button>
          )}
          {onToggleFav && (
            <button
              onClick={() => onToggleFav(fishBase)}
              style={__style14}
            >
              {isFav ? "❤️" : "🤍"}
            </button>
          )}
          <button
            onClick={onClose}
            style={__style15}
          >
            ✕
          </button>
        </div>

        <div style={__style16}>
          <div style={__style17}>
            {fish.badges.map((b) => (
              <span
                key={b}
                style={__style18}
              >
                {b}
              </span>
            ))}
          </div>
          <h2 style={__style19}>{titleLabel}</h2>
          {fish.latin && <div style={__style20}>{fish.latin}</div>}
          <div style={__style21}>
            ⭐ {fish.rating} ({fish.reviews} отзывов)
          </div>
          {hasSizes && (
            <div style={__style22}>
              <div style={__style23}>Размер</div>
              <div style={__style24}>
                {fish.sizeSiblings.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSizeId(s.sizeId)}
                    style={{
                      background: activeSib.sizeId === s.sizeId ? COLORS.teal : COLORS.panel,
                      color: activeSib.sizeId === s.sizeId ? COLORS.bg : COLORS.soft,
                      border: `1px solid ${activeSib.sizeId === s.sizeId ? COLORS.teal : COLORS.border}`,
                      borderRadius: 10, padding: "7px 10px", fontSize: 12.5, fontWeight: 700, cursor: "pointer",
                    }}
                  >
                    {s.cm ? `${s.cm} см` : "стандарт"} · {formatSum(s.price)}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div style={__style25}>
            {lowStock && (
              <span style={__style26}>
                🔥 Осталось {stock} шт
              </span>
            )}
            {fish.type === "fish" && (
              <span style={__style27}>
                🛡️ Гарантия здоровья 48 ч
              </span>
            )}
          </div>

          {fish.type === "fish" && compat.level !== "ok" && (
            <div
              style={{
                marginTop: 12,
                background: compat.level === "bad" ? COLORS.redBg : "#2A2210",
                border: `1px solid ${compat.level === "bad" ? COLORS.red : COLORS.amber}`,
                borderRadius: 10,
                padding: "10px 12px",
                fontSize: 13,
              }}
            >
              {compat.level === "bad" ? "⚠️ " : "🟡 "}
              {compat.reason}
            </div>
          )}
          {fish.type === "fish" && compat.level === "ok" && (
            <div
              style={__style28}
            >
              ✅ Совместима с вашей корзиной
            </div>
          )}

          <div style={__style29}>
            {(fish.type === "fish"
              ? [["about", "О рыбке"], ["origin", "Откуда"], ["reviews", "Отзывы"], ["pro", "Для профи"]]
              : [["about", "Описание"], ["reviews", "Отзывы"], ["pro", "Характеристики"]]
            ).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                style={{
                  background: "none",
                  border: "none",
                  color: tab === id ? COLORS.teal : COLORS.muted,
                  fontWeight: tab === id ? 700 : 500,
                  fontSize: 13,
                  padding: "8px 4px",
                  borderBottom: tab === id ? `2px solid ${COLORS.teal}` : "2px solid transparent",
                  cursor: "pointer",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div style={__style30}>
            {tab === "about" && <AboutTab fish={fish} />}
            {tab === "origin" && <OriginCard fish={fish} />}
            {tab === "pro" && <ProSpecsGrid text={fish.pro} />}
            {tab === "reviews" && (
              <div style={__style31}>
                {reviewsList.map((r, i) => (
                  <div key={i} style={__style32}>
                    <div style={__style33}>
                      <span style={__style34}>{r.name} · {r.city}</span>
                      <span style={__style35}>{"⭐".repeat(r.rating)}</span>
                    </div>
                    <div style={__style36}>{r.text}</div>
                  </div>
                ))}
                <div style={__style37}>
                  Показаны последние {reviewsList.length} из {fish.reviews} отзывов
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          style={__style38}
        >
          {fish.type === "fish" && (
            <div style={__style39}>
              <button
                onClick={() => setArOpen(true)}
                style={__style40}
              >📸 В моём аквариуме</button>
              {onCompare && (
                <button
                  onClick={() => onCompare(fishBase)}
                  style={{
                    background: inCompare ? COLORS.amber : COLORS.panel, color: inCompare ? COLORS.bg : COLORS.soft,
                    border: `1px solid ${inCompare ? COLORS.amber : COLORS.border}`, borderRadius: 12,
                    padding: "10px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer",
                  }}
                >⚖️ {inCompare ? "В сравнении" : "Сравнить"}</button>
              )}
            </div>
          )}
          {fish.type === "food" && onSubscribe && (
            <div
              style={__style41}
            >
              <div style={__style42}>
                <span style={__style43}>
                  🔁 Подписка на корм
                </span>
                <span style={__style44}>
                  −10%
                </span>
              </div>
              <div style={__style45}>
                Автоматическая доставка без напоминаний — отменить можно в любой момент в профиле.
              </div>
              <div style={{ display: "flex", gap: 6, marginBottom: activeSubscription ? 10 : 0 }}>
                {SUBSCRIPTION_INTERVALS.map((opt) => (
                  <button
                    key={opt.weeks}
                    onClick={() => setSubInterval(opt.weeks)}
                    style={{
                      flex: 1,
                      background: subInterval === opt.weeks ? COLORS.teal : COLORS.panel,
                      color: subInterval === opt.weeks ? COLORS.bg : COLORS.soft,
                      border: `1px solid ${subInterval === opt.weeks ? COLORS.teal : COLORS.border}`,
                      borderRadius: 9,
                      padding: "8px 4px",
                      fontSize: 11.5,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {activeSubscription && (
                <div style={__style46}>
                  Следующая доставка: {fmtDate(activeSubscription.nextDate)}
                </div>
              )}
              <button
                onClick={() => onSubscribe(fish, subInterval)}
                style={__style47}
              >
                {activeSubscription ? "Обновить подписку" : `Оформить за ${formatSum(Math.round(fish.price * (1 - SUBSCRIPTION_DISCOUNT)))}`}
              </button>
            </div>
          )}
          <div style={__style48}>
            <span style={__style49}>
              {formatSum(fishBase.price)}
            </span>
            <button
              onClick={() => onAdd(fishBase)}
              style={{
                flex: 1,
                background: compat.level === "bad" ? COLORS.border : COLORS.teal,
                color: compat.level === "bad" ? COLORS.muted : COLORS.bg,
                border: "none",
                borderRadius: 12,
                padding: "12px",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {fish.type === "fish" ? "🐠 Добавить в аквариум" : "🛒 Добавить в корзину"}
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes sheetUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
      {arOpen && <ARPreview fish={fish} onClose={() => setArOpen(false)} />}
    </div>
  );
}

/* ---------- Галерея карточек одного вида (окрасы/породы) ----------
   Открывается по клику на карточку-вид в каталоге. Показывает все
   карточки-варианты, которые завёл админ: фото, название, диапазон
   цен по размерам. Тап по варианту открывает обычную FishDetail
   с выбором конкретного размера. */
