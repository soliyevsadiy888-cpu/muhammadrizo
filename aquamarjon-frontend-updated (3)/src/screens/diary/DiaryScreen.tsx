import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { COLORS } from "../../theme";
import { Bubbles } from "../../components/ui/Bubbles";
import { Confetti } from "../../components/ui/Confetti";
import { Sticker } from "../../components/ui/Sticker";
import { Toast } from "../../components/ui/Toast";
import { DIARY_BADGES, TIER_COLORS, TIER_NAMES } from "../../data/diary-content";
import { DIARY_SEED_TANKS } from "../../data/tanks-seed";
import { unlockAchievementPromo } from "../../lib/achievement-promo";
import { DIARY_LAST_OPEN_KEY, DIARY_TANKS_STORAGE_KEY, PENDING_DIARY_TANK_KEY, computeDiaryStats, diaryBadgeShareText, diaryEarnedBadgeKeys, diaryFishShareText, diaryNearestNextBadge, diaryPluralRu, maybeSendInactivityReminder, shareBadgeImage } from "../../lib/diary-stats";
import { Dp } from "../../lib/doctor-styles";
import { notifyTelegram } from "../../lib/notify";
import { readLocal, writeLocal } from "../../lib/storage";
import { DiaryAchievementsModal } from "./DiaryAchievementsModal";
import { DiaryAddTankModal } from "./DiaryAddTankModal";
import { DiaryBadgeStrip, DiaryGamificationBar, DiaryNextBadgeCard } from "./DiaryGamification";
import { DiaryTankCard } from "./DiaryTankCard";
import { DiaryTankDetail } from "./DiaryTankDetail";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { minHeight: "100vh", background: Dp.bg, color: Dp.text, paddingBottom: 30 } as const;
const __style2 = { background: Dp.card, borderBottom: `1px solid ${Dp.border}`, padding: "16px 16px 14px", position: "relative", overflow: "hidden" } as const;
const __style3 = { position: "relative", zIndex: 1 } as const;
const __style4 = { background: "none", border: "none", color: Dp.soft, fontSize: 13, cursor: "pointer", marginBottom: 8, padding: 0 } as const;
const __style5 = { fontSize: 11, color: Dp.teal, fontWeight: 700, letterSpacing: 1.5, marginBottom: 4, textTransform: "uppercase" } as const;
const __style6 = { fontSize: 21, fontWeight: 900, letterSpacing: -0.5, marginBottom: 2 } as const;
const __style7 = { fontSize: 12.5, color: Dp.muted } as const;
const __style8 = { padding: "12px 16px 0" } as const;
const __style9 = { display: "flex", gap: 8, marginBottom: 16 } as const;
const __style10 = { flex: 1, background: Dp.card, border: `1px solid ${Dp.border}`, borderRadius: 12, padding: "10px 8px", textAlign: "center" } as const;
const __style11 = { display: "flex", justifyContent: "center", marginBottom: 4 } as const;
const __style12 = { fontSize: 10.5, color: Dp.muted } as const;
const __style13 = { width: "100%", border: `1px dashed ${Dp.border}`, background: "none", color: Dp.muted, borderRadius: 16, padding: 18, fontSize: 14, cursor: "pointer" } as const;
const __style14 = { display: "flex", alignItems: "center", gap: 10 } as const;
const __style15 = { display: "inline-block", animation: "aquaBadgePulse 0.9s ease-in-out 0.1s" } as const;
const __style16 = { flex: 1, minWidth: 0 } as const;
const __style17 = { fontSize: 13.5, fontWeight: 700 } as const;
const __style18 = { display: "flex", alignItems: "center", gap: 8, marginTop: 10, background: COLORS.bg, border: `1px dashed ${Dp.amber}88`, borderRadius: 10, padding: "8px 10px" } as const;
const __style19 = { fontSize: 16 } as const;
const __style20 = { fontSize: 13, fontWeight: 800, color: Dp.amber, letterSpacing: 0.5 } as const;
const __style21 = { background: COLORS.panel, border: `1px solid ${Dp.amber}66`, color: Dp.amber, borderRadius: 7, padding: "5px 9px", fontSize: 10.5, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" } as const;
const __style22 = { position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: COLORS.greenBg, border: `1px solid ${Dp.teal}`, color: Dp.text, padding: "10px 18px", borderRadius: 12, fontSize: 13, zIndex: 600, whiteSpace: "nowrap", boxShadow: "0 8px 24px rgba(0,0,0,0.5)" } as const;


export function DiaryScreen({ onBack, onAddClubPost, onStatsUpdate, onOpenCatalog }) {
  const [tanks, setTanks] = useState(() => {
    const pending = readLocal(PENDING_DIARY_TANK_KEY, null);
    const saved = readLocal(DIARY_TANKS_STORAGE_KEY, null);
    const base = saved || DIARY_SEED_TANKS;
    return pending ? [pending, ...base] : base;
  });
  useEffect(() => { writeLocal(DIARY_TANKS_STORAGE_KEY, tanks); }, [tanks]);
  // До открытия дневника шлём ретеншн-пуш по состоянию НА МОМЕНТ предыдущего
  // визита, и только потом обновляем метку «открыл сейчас».
  useEffect(() => {
    maybeSendInactivityReminder(readLocal(DIARY_TANKS_STORAGE_KEY, DIARY_SEED_TANKS));
    writeLocal(DIARY_LAST_OPEN_KEY, new Date().toISOString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [selectedTank, setSelectedTank] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [showBadges, setShowBadges] = useState(false);
  const [badgeToast, setBadgeToast] = useState(null);
  const [shareToast, setShareToast] = useState(false);
  const prevEarnedRef = useRef(null);
  const notifiedNearRef = useRef(new Set()); // чтобы не слать пуш повторно за один и тот же прогресс

  // Если только что подхватили черновик из заказа — открываем его сразу и
  // чистим за собой, чтобы он не подмешивался при следующем визите.
  const [pendingTankToast, setPendingTankToast] = useState(null);
  useEffect(() => {
    const pending = readLocal(PENDING_DIARY_TANK_KEY, null);
    if (pending) {
      setSelectedTank(pending);
      writeLocal(PENDING_DIARY_TANK_KEY, null);
      setPendingTankToast({ text: `✅ Аквариум «${pending.name}» создан из заказа`, type: "ok" });
      setTimeout(() => setPendingTankToast(null), 2200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stats = useMemo(() => computeDiaryStats(tanks), [tanks]);

  // Поднимаем актуальную статистику наверх — нужна для рейтинга в Клубе
  useEffect(() => { onStatsUpdate?.(stats); }, [stats]);

  // Отслеживаем разблокировку новых бейджей/тиров и показываем тост
  useEffect(() => {
    const earnedKeys = diaryEarnedBadgeKeys(stats);
    if (prevEarnedRef.current === null) {
      // Первый расчёт при заходе в дневник: бейджи, уже полученные раньше,
      // должны иметь рабочий промокод без показа тоста.
      earnedKeys.forEach(k => {
        const [badgeId, tierIndexStr] = k.split(":");
        const badge = DIARY_BADGES.find(b => b.id === badgeId);
        if (badge) unlockAchievementPromo(badge, Number(tierIndexStr));
      });
    } else {
      const newOnes = earnedKeys.filter(k => !prevEarnedRef.current.includes(k));
      if (newOnes.length > 0) {
        const [badgeId, tierIndexStr] = newOnes[0].split(":");
        const badge = DIARY_BADGES.find(b => b.id === badgeId);
        if (badge) {
          const tierIndex = Number(tierIndexStr);
          const reward = unlockAchievementPromo(badge, tierIndex); // реальный промокод в магазин
          setBadgeToast({ ...badge, tierIndex, rewardCode: reward.code, rewardPercent: reward.percent });
          setTimeout(() => setBadgeToast(null), 5500);
        }
      }
    }
    prevEarnedRef.current = earnedKeys;
  }, [stats]);

  // Пуш в Telegram, когда пользователь близко к новому бейджу (актуально вне приложения)
  useEffect(() => {
    const nb = diaryNearestNextBadge(stats);
    if (!nb || nb.remaining > 2) return;
    const key = `${nb.badge.id}:${nb.tierIndex + 1}:${nb.remaining}`;
    if (notifiedNearRef.current.has(key)) return;
    notifiedNearRef.current.add(key);
    const word = diaryPluralRu(nb.remaining, "записи", "записей", "записей");
    notifyTelegram("badge_progress", {
      title: `Ты на ${nb.remaining} ${word} от нового бейджа! 🎯`,
      text: `${nb.badge.icon} «${nb.badge.title}» · ${TIER_NAMES[nb.tierIndex + 1]} уже близко — заполни дневник AquaMarjon`,
      badgeId: nb.badge.id, tierIndex: nb.tierIndex + 1, remaining: nb.remaining,
    });
  }, [stats]);

  function shareBadge(badge, tierIndex) {
    if (!onAddClubPost) return;
    onAddClubPost(diaryBadgeShareText(badge, tierIndex));
    setBadgeToast(null);
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2500);
  }

  function shareFish(fish, tankName, days, tierIndex) {
    if (!onAddClubPost) return;
    onAddClubPost(diaryFishShareText(fish, tankName, days, tierIndex));
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2500);
  }

  function updateTank(updated) {
    setTanks(prev => prev.map(t => t.id === updated.id ? updated : t));
    setSelectedTank(updated);
  }
  function addTank(tank) {
    setTanks(prev => [...prev, tank]);
    setAddModal(false);
    setSelectedTank(tank);
  }
  const selectTank = useCallback((tank) => setSelectedTank(tank), []);

  if (selectedTank) {
    return (
      <>
        <DiaryTankDetail tank={selectedTank} onBack={() => setSelectedTank(null)} onUpdate={updateTank} onShareFish={shareFish} onOpenCatalog={onOpenCatalog} />
        <Toast toast={pendingTankToast} />
      </>
    );
  }

  const totalLogs = stats.totalLogs;
  const totalFish = stats.totalFish;
  const waterChanges = stats.water;

  return (
    <>
      <div style={__style1}>
        <div style={__style2}>
          <Bubbles count={10} />
          <div style={__style3}>
            <button onClick={onBack} style={__style4}>← Назад в каталог</button>
            <div style={__style5}>AquaMarjon</div>
            <div style={__style6}>📔 Дневник аквариума</div>
            <div style={__style7}>Ведите записи по уходу, следите за здоровьем рыб</div>
          </div>
        </div>

        <div style={__style8}>
          {/* Stats row */}
          <div style={__style9}>
            {[
              { icon: "💧", label: "Смен воды", value: waterChanges, color: Dp.teal },
              { icon: "📔", label: "Записей",   value: totalLogs,    color: Dp.amber },
              { icon: "🐠", label: "Всего рыб", value: totalFish,    color: Dp.soft },
            ].map((stat, i) => (
              <div key={i} style={__style10}>
                <div style={__style11}><Sticker e={stat.icon} size={30} /></div>
                <div style={{ fontSize: 20, fontWeight: 800, color: stat.color }}>{stat.value}</div>
                <div style={__style12}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Геймификация: уровень, XP, бейджи */}
          <DiaryGamificationBar stats={stats} onOpenBadges={() => setShowBadges(true)} />
          <DiaryNextBadgeCard stats={stats} onOpenBadges={() => setShowBadges(true)} />
          <DiaryBadgeStrip stats={stats} onOpenBadges={() => setShowBadges(true)} />

          {tanks.map(tank => (
            <DiaryTankCard key={tank.id} tank={tank} onClick={selectTank} />
          ))}

          <button onClick={() => setAddModal(true)} style={__style13}>
            + Добавить аквариум
          </button>
        </div>
      </div>
      {addModal && <DiaryAddTankModal onClose={() => setAddModal(false)} onAdd={addTank} />}
      {showBadges && <DiaryAchievementsModal stats={stats} onClose={() => setShowBadges(false)} onShare={shareBadge} onShareImage={shareBadgeImage} />}
      <Confetti active={!!badgeToast} colors={badgeToast ? [TIER_COLORS[badgeToast.tierIndex] || Dp.teal, "#FFD24A", COLORS.green] : undefined} />
      {badgeToast && (
        <>
          <style>{`
            @keyframes aquaBadgePulse {
              0%   { transform: scale(1); }
              30%  { transform: scale(1.28); }
              55%  { transform: scale(0.95); }
              75%  { transform: scale(1.1); }
              100% { transform: scale(1); }
            }
            @keyframes aquaToastDrop {
              0%   { transform: translate(-50%, -16px); opacity: 0; }
              100% { transform: translate(-50%, 0); opacity: 1; }
            }
          `}</style>
          <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", width: "calc(100% - 32px)", maxWidth: 380, background: COLORS.greenBg, border: `1px solid ${TIER_COLORS[badgeToast.tierIndex] || Dp.teal}`, borderRadius: 14, padding: "12px 16px", zIndex: 660, boxShadow: `0 8px 28px rgba(0,0,0,0.55), 0 0 0 3px ${TIER_COLORS[badgeToast.tierIndex] || Dp.teal}33`, animation: "aquaToastDrop 0.35s cubic-bezier(0.34,1.56,0.64,1)", boxSizing: "border-box" }}>
            <div style={__style14}>
              <span style={__style15}><Sticker e={badgeToast.icon} size={40} bg={(TIER_COLORS[badgeToast.tierIndex] || Dp.teal) + "22"} /></span>
              <div style={__style16}>
                <div style={{ fontSize: 11.5, fontWeight: 800, color: TIER_COLORS[badgeToast.tierIndex] || Dp.teal, letterSpacing: 0.5, textTransform: "uppercase" }}>
                  {TIER_NAMES[badgeToast.tierIndex]} · новый бейдж!
                </div>
                <div style={__style17}>{badgeToast.title}</div>
              </div>
              {onAddClubPost && (
                <button onClick={() => shareBadge(badgeToast, badgeToast.tierIndex)} style={{ background: TIER_COLORS[badgeToast.tierIndex] || Dp.teal, border: "none", color: COLORS.bg, borderRadius: 8, padding: "6px 10px", fontSize: 11, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" }}>
                  📤
                </button>
              )}
            </div>
            {badgeToast.rewardCode && (
              <div style={__style18}>
                <span style={__style19}>🎁</span>
                <div style={__style16}>
                  <div style={__style12}>Промокод на скидку −{badgeToast.rewardPercent}% в магазине</div>
                  <div style={__style20}>{badgeToast.rewardCode}</div>
                </div>
                <button
                  onClick={() => { navigator.clipboard?.writeText(badgeToast.rewardCode); }}
                  style={__style21}
                >
                  Копировать
                </button>
              </div>
            )}
          </div>
        </>
      )}
      {shareToast && (
        <div style={__style22}>
          ✅ Опубликовано в Клубе
        </div>
      )}
      <Toast toast={pendingTankToast} />
    </>
  );
}

/* ============================================================
   👥 КЛУБ — сообщество AquaMarjon (форум, обмен, конкурсы, города)
   ============================================================ */
