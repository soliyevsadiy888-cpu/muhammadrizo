import React from "react";
import { COLORS } from "../../theme";
import { Sticker } from "../../components/ui/Sticker";
import { DIARY_BADGES, TIER_COLORS, TIER_NAMES } from "../../data/diary-content";
import { ACHIEVEMENT_PROMO_PERCENTS, diaryAchievementPromoCode } from "../../lib/achievement-promo";
import { getBadgeTier } from "../../lib/diary-stats";
import { Dp } from "../../lib/doctor-styles";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { position: "fixed", inset: 0, background: "rgba(5,10,16,0.85)", zIndex: 400, display: "flex", alignItems: "flex-end", justifyContent: "center" } as const;
const __style2 = { background: COLORS.bg2, borderRadius: "20px 20px 0 0", padding: "22px 18px 32px", width: "100%", maxWidth: 460, maxHeight: "85vh", overflowY: "auto", color: Dp.text, boxSizing: "border-box" } as const;
const __style3 = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 } as const;
const __style4 = { fontSize: 17, fontWeight: 900 } as const;
const __style5 = { background: "none", border: "none", color: Dp.muted, fontSize: 20, cursor: "pointer", padding: 0 } as const;
const __style6 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } as const;
const __style7 = { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 } as const;
const __style8 = { fontSize: 12.5, fontWeight: 700, marginBottom: 3 } as const;
const __style9 = { fontSize: 10.5, color: Dp.muted, marginBottom: 8, lineHeight: 1.4 } as const;
const __style10 = { height: 5, background: Dp.border, borderRadius: 999, overflow: "hidden", marginBottom: 4 } as const;
const __style11 = { fontSize: 9.5, fontWeight: 800, color: Dp.amber, letterSpacing: 0.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } as const;
const __style12 = { fontSize: 9.5, color: Dp.muted, whiteSpace: "nowrap" } as const;


export function DiaryAchievementsModal({ stats, onClose, onShare, onShareImage }) {
  return (
    <div style={__style1} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={__style2}>
        <div style={__style3}>
          <div style={__style4}>🏅 Достижения</div>
          <button onClick={onClose} style={__style5} aria-label="Закрыть">✕</button>
        </div>
        <div style={__style6}>
          {DIARY_BADGES.map(b => {
            const { earned, tierIndex, maxed, val, nextTarget, pctToNext } = getBadgeTier(b, stats);
            const tierColor = earned ? TIER_COLORS[tierIndex] : Dp.border;
            return (
              <div key={b.id} style={{ background: Dp.card, border: `1px solid ${tierColor}`, borderRadius: 14, padding: 12 }}>
                <div style={__style7}>
                  <span style={{ filter: earned ? "none" : "grayscale(0.6)", opacity: earned ? 1 : 0.5 }}><Sticker e={b.icon} size={40} /></span>
                  {earned && (
                    <span style={{ fontSize: 9.5, fontWeight: 800, color: tierColor, border: `1px solid ${tierColor}66`, borderRadius: 999, padding: "1px 7px" }}>
                      {TIER_NAMES[tierIndex]}
                    </span>
                  )}
                </div>
                <div style={__style8}>{b.title}</div>
                <div style={__style9}>{b.desc}</div>
                <div style={__style10}>
                  <div style={{ height: "100%", width: `${pctToNext * 100}%`, background: earned ? COLORS.green : Dp.amber, borderRadius: 999 }} />
                </div>
                <div style={{ fontSize: 10, color: earned ? COLORS.green : Dp.muted, fontWeight: earned ? 700 : 400 }}>
                  {maxed ? `✅ Золото (${val})` : `${val}/${nextTarget} до ${TIER_NAMES[tierIndex + 1]}`}
                </div>
                {earned && !maxed && (
                  <div style={{ display: "flex", gap: 3, marginTop: 6, marginBottom: earned ? 8 : 0 }}>
                    {TIER_NAMES.map((tn, i) => (
                      <span key={tn} style={{ flex: 1, height: 3, borderRadius: 999, background: i <= tierIndex ? TIER_COLORS[i] : Dp.border }} />
                    ))}
                  </div>
                )}
                {earned && (() => {
                  const code = diaryAchievementPromoCode(b.id, tierIndex);
                  const percent = ACHIEVEMENT_PROMO_PERCENTS[tierIndex] ?? 5;
                  return (
                    <div
                      onClick={(e) => { e.stopPropagation(); navigator.clipboard?.writeText(code); }}
                      title="Скопировать промокод"
                      style={{ marginTop: 8, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6, background: COLORS.bg, border: `1px dashed ${tierColor}88`, borderRadius: 8, padding: "5px 8px", cursor: "pointer" }}
                    >
                      <span style={__style11}>🎁 {code}</span>
                      <span style={__style12}>−{percent}%</span>
                    </div>
                  );
                })()}
                {earned && onShare && (
                  <button
                    onClick={() => onShare(b, tierIndex)}
                    style={{ width: "100%", marginTop: 8, background: COLORS.panel, border: `1px solid ${tierColor}66`, color: tierColor, borderRadius: 8, padding: "6px 0", fontSize: 11, fontWeight: 700, cursor: "pointer" }}
                  >
                    📤 Поделиться в Клубе
                  </button>
                )}
                {earned && onShareImage && (
                  <button
                    onClick={() => onShareImage(b, tierIndex)}
                    style={{ width: "100%", marginTop: 6, background: "none", border: `1px dashed ${tierColor}44`, color: Dp.soft, borderRadius: 8, padding: "6px 0", fontSize: 11, fontWeight: 600, cursor: "pointer" }}
                  >
                    🖼️ Скачать картинку
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Рендерит карточку бейджа в PNG через canvas и делится ей через Web Share API
// (файлом — если поддерживается, например в Telegram на мобильных) либо
// скачивает файл как фолбэк. В отличие от поста в Клубе (виден только внутри
// приложения), эта картинка — самостоятельный файл, который можно отправить
// в любой внешний чат.
