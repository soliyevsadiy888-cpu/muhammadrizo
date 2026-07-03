import React from "react";
import { COLORS } from "../../theme";
import { Sticker } from "../../components/ui/Sticker";
import { DIARY_BADGES, TIER_COLORS, TIER_NAMES } from "../../data/diary-content";
import { diaryComputeXP, diaryLevelName, diaryNearestNextBadge, diaryPluralRu, getBadgeTier } from "../../lib/diary-stats";
import { Dp } from "../../lib/doctor-styles";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { background: Dp.card, border: `1px solid ${Dp.border}`, borderRadius: 16, padding: 14, marginBottom: 12, cursor: "pointer" } as const;
const __style2 = { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 } as const;
const __style3 = { display: "flex", alignItems: "center", gap: 10 } as const;
const __style4 = { width: 36, height: 36, borderRadius: 999, background: "linear-gradient(135deg,#00C9B1,#F0A93C)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 900, color: COLORS.bg, flexShrink: 0 } as const;
const __style5 = { fontSize: 13, fontWeight: 800 } as const;
const __style6 = { color: Dp.muted, fontWeight: 600 } as const;
const __style7 = { fontSize: 11, color: Dp.muted } as const;
const __style8 = { color: Dp.amber } as const;
const __style9 = { fontSize: 11, color: Dp.teal, fontWeight: 700, whiteSpace: "nowrap" } as const;
const __style10 = { height: 6, background: Dp.border, borderRadius: 999, overflow: "hidden" } as const;
const __style11 = { fontSize: 10, color: Dp.muted, marginTop: 4 } as const;
const __style12 = { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: 16, cursor: "pointer" } as const;
const __style13 = { background: "linear-gradient(135deg,#0F2A26,#1A2F1A)", border: `1px solid ${TIER_COLORS[2]}66`, borderRadius: 16, padding: "14px 16px", marginBottom: 16, cursor: "pointer", display: "flex", alignItems: "center", gap: 12 } as const;
const __style14 = { fontSize: 13, fontWeight: 800, color: TIER_COLORS[2] } as const;
const __style15 = { display: "flex", alignItems: "center", gap: 12, position: "relative" } as const;
const __style16 = { flex: 1, minWidth: 0 } as const;
const __style17 = { fontSize: 13, fontWeight: 700, color: Dp.text, marginBottom: 2 } as const;
const __style18 = { fontSize: 11.5, color: Dp.soft } as const;
const __style19 = { height: 6, background: Dp.border, borderRadius: 999, overflow: "hidden", marginTop: 10 } as const;


export function DiaryGamificationBar({ stats, onOpenBadges }) {
  const xp = diaryComputeXP(stats);
  const level = Math.floor(xp / 100) + 1;
  const xpInLevel = xp % 100;
  const levelName = diaryLevelName(level);
  const earnedCount = DIARY_BADGES.filter(b => getBadgeTier(b, stats).earned).length;
  return (
    <div onClick={onOpenBadges} style={__style1}>
      <div style={__style2}>
        <div style={__style3}>
          <div style={__style4}>
            {level}
          </div>
          <div>
            <div style={__style5}>{levelName} <span style={__style6}>· уровень {level}</span></div>
            <div style={__style7}>
              🏅 {earnedCount} из {DIARY_BADGES.length} бейджей
              {stats.currentStreak > 1 && <span style={__style8}> · 🔥 серия {stats.currentStreak} дн.</span>}
            </div>
          </div>
        </div>
        <span style={__style9}>Все бейджи →</span>
      </div>
      <div style={__style10}>
        <div style={{ height: "100%", width: `${xpInLevel}%`, background: "linear-gradient(90deg,#00C9B1,#F0A93C)", borderRadius: 999, transition: "width 0.4s ease" }} />
      </div>
      <div style={__style11}>{xpInLevel}/100 XP до уровня {level + 1} ({diaryLevelName(level + 1)})</div>
    </div>
  );
}


export function DiaryBadgeStrip({ stats, onOpenBadges }) {
  return (
    <div onClick={onOpenBadges} style={__style12}>
      {DIARY_BADGES.map(b => {
        const { earned, tierIndex } = getBadgeTier(b, stats);
        const tierColor = earned ? TIER_COLORS[tierIndex] : Dp.border;
        return (
          <div key={b.id} title={b.title} style={{ position: "relative", flex: "0 0 auto", opacity: earned ? 1 : 0.35, filter: earned ? "none" : "grayscale(1)" }}>
            <Sticker e={b.icon} size={50} radius={14} bg={earned ? COLORS.greenBg : COLORS.panel} borderColor={tierColor} />
            {earned && (
              <span style={{ position: "absolute", bottom: -4, right: -4, width: 14, height: 14, borderRadius: 999, background: tierColor, border: `1px solid ${Dp.bg}` }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---- Карточка «ближайшая цель» — всегда видна на главном экране дневника ---- */

export function DiaryNextBadgeCard({ stats, onOpenBadges }) {
  const nb = diaryNearestNextBadge(stats);

  // Все бейджи уже на максимальном тире — поздравляем вместо прогресса
  if (!nb) {
    return (
      <div onClick={onOpenBadges} style={__style13}>
        <Sticker e="🏆" size={44} bg={`${TIER_COLORS[2]}22`} />
        <div>
          <div style={__style14}>Все бейджи получены на золото!</div>
          <div style={__style7}>Вы — легенда AquaMarjon 🌟</div>
        </div>
      </div>
    );
  }

  const { badge, tierIndex, pctToNext, remaining } = nb;
  const nextTierIndex = tierIndex + 1;
  const nextTierColor = TIER_COLORS[nextTierIndex];
  const word = diaryPluralRu(remaining, "записи", "записей", "записей");
  const isAlmostThere = remaining <= 1;

  return (
    <div
      onClick={onOpenBadges}
      style={{
        background: isAlmostThere ? `linear-gradient(135deg, ${nextTierColor}18, ${Dp.card})` : Dp.card,
        border: `1px solid ${nextTierColor}${isAlmostThere ? "" : "66"}`, borderRadius: 16,
        padding: "14px 16px", marginBottom: 16, cursor: "pointer", position: "relative", overflow: "hidden",
        animation: isAlmostThere ? "nextBadgePulse 1.8s ease-in-out infinite" : "none",
      }}
    >
      {isAlmostThere && (
        <style>{`@keyframes nextBadgePulse { 0%,100%{box-shadow:0 0 0 0 ${nextTierColor}55} 50%{box-shadow:0 0 0 6px ${nextTierColor}00} }`}</style>
      )}
      <div style={{ position: "absolute", top: -20, right: -20, width: 90, height: 90, borderRadius: 999, background: `${nextTierColor}14`, pointerEvents: "none" }} />
      <div style={__style15}>
        <Sticker e={badge.icon} size={42} radius={12} bg={COLORS.panel} borderColor={nextTierColor} />
        <div style={__style16}>
          <div style={{ fontSize: 11, color: nextTierColor, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 1 }}>
            {isAlmostThere ? "🔥 Совсем чуть-чуть!" : "🎯 Ближайшая цель"}
          </div>
          <div style={__style17}>
            {badge.title} · {TIER_NAMES[nextTierIndex]}
          </div>
          <div style={__style18}>
            {isAlmostThere
              ? <>Ещё <strong style={{ color: nextTierColor }}>{remaining}</strong> {word} — и бейдж ваш!</>
              : <>Ещё <strong style={{ color: nextTierColor }}>{remaining}</strong> {word} до бейджа</>}
          </div>
        </div>
      </div>
      <div style={__style19}>
        <div style={{ height: "100%", width: `${pctToNext * 100}%`, background: nextTierColor, borderRadius: 999, transition: "width 0.4s ease" }} />
      </div>
    </div>
  );
}

/* ---- Конфетти при разблокировке бейджа ---- */
