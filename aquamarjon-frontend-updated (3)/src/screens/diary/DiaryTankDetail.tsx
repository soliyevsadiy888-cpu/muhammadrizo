import React, { useState } from "react";
import { COLORS } from "../../theme";
import { Sticker } from "../../components/ui/Sticker";
import { UrgencyBar } from "../../components/ui/UrgencyBar";
import { DIARY_LOG_TYPES, FISH_SURVIVAL_TIERS, TIER_COLORS, TIER_NAMES } from "../../data/diary-content";
import { diaryDaysSince, diaryTodayISO, formatDiaryDate, getFishSurvivalTier } from "../../lib/diary-stats";
import { Dp } from "../../lib/doctor-styles";
import { DiaryAddFishModal } from "./DiaryAddFishModal";
import { DiaryParamsGrid } from "./DiaryParamsGrid";
import { DiaryTaskList } from "./DiaryTaskList";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { minHeight: "100vh", background: Dp.bg, color: Dp.text, paddingBottom: 30 } as const;
const __style2 = { background: Dp.card, borderBottom: `1px solid ${Dp.border}`, padding: "14px 16px" } as const;
const __style3 = { background: "none", border: "none", color: Dp.soft, fontSize: 14, cursor: "pointer", marginBottom: 10 } as const;
const __style4 = { display: "flex", alignItems: "center", gap: 10 } as const;
const __style5 = { fontSize: 17, fontWeight: 800 } as const;
const __style6 = { fontSize: 12, color: Dp.muted } as const;
const __style7 = { display: "flex", gap: 6, padding: "12px 16px 0" } as const;
const __style8 = { padding: "14px 16px 0" } as const;
const __style9 = { background: Dp.card, border: `1px solid ${Dp.border}`, borderRadius: 14, padding: 14, marginBottom: 14 } as const;
const __style10 = { fontSize: 13, fontWeight: 700, marginBottom: 10 } as const;
const __style11 = { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 } as const;
const __style12 = { width: "100%", background: COLORS.panel, border: `1px solid ${Dp.border}`, borderRadius: 10, padding: "10px 12px", color: Dp.text, fontSize: 13, outline: "none", boxSizing: "border-box", minHeight: 70, resize: "none", marginBottom: 10 } as const;
const __style13 = { marginBottom: 10 } as const;
const __style14 = { fontSize: 12, color: Dp.soft, marginBottom: 4 } as const;
const __style15 = { color: Dp.amber } as const;
const __style16 = { width: "100%", accentColor: Dp.amber } as const;
const __style17 = { display: "flex", gap: 8 } as const;
const __style18 = { flex: 1, background: COLORS.panel, border: `1px solid ${Dp.border}`, color: Dp.soft, borderRadius: 10, padding: 10, fontSize: 13, cursor: "pointer" } as const;
const __style19 = { width: "100%", background: Dp.teal, border: "none", color: COLORS.bg, borderRadius: 12, padding: "11px", fontSize: 14, fontWeight: 700, cursor: "pointer", marginBottom: 14 } as const;
const __style20 = { background: Dp.card, border: `1px solid ${Dp.border}`, borderRadius: 12, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: Dp.soft, lineHeight: 1.5 } as const;
const __style21 = { background: Dp.card, border: `1px solid ${Dp.border}`, borderRadius: 12, padding: "12px 14px", marginBottom: 10 } as const;
const __style22 = { display: "flex", justifyContent: "space-between", marginBottom: 6 } as const;
const __style23 = { display: "flex", alignItems: "center", gap: 6 } as const;
const __style24 = { fontSize: 10.5, background: COLORS.greenBg, color: COLORS.green, border: "1px solid #51CF6666", borderRadius: 999, padding: "2px 7px", fontWeight: 700 } as const;
const __style25 = { fontSize: 11.5, color: Dp.muted } as const;
const __style26 = { fontSize: 13, color: Dp.text, lineHeight: 1.5 } as const;
const __style27 = { display: "flex", gap: 10, alignItems: "center", marginBottom: 8 } as const;
const __style28 = { flex: 1 } as const;
const __style29 = { fontSize: 11, color: Dp.muted, marginBottom: 4 } as const;
const __style30 = { display: "flex", gap: 8, alignItems: "center", background: COLORS.redBg, border: "1px solid #FF6B6B66", borderRadius: 8, padding: "8px 10px" } as const;
const __style31 = { fontSize: 11, color: "#FF8A8A", flex: 1 } as const;
const __style32 = { background: "none", border: `1px solid ${Dp.border}`, color: Dp.muted, borderRadius: 6, padding: "4px 8px", fontSize: 11, cursor: "pointer" } as const;
const __style33 = { background: COLORS.red, border: "none", color: "#1A0808", borderRadius: 6, padding: "4px 8px", fontSize: 11, fontWeight: 700, cursor: "pointer" } as const;
const __style34 = { width: "100%", background: "none", border: `1px dashed ${Dp.border}`, color: Dp.muted, borderRadius: 8, padding: "5px 0", fontSize: 10.5, cursor: "pointer" } as const;
const __style35 = { textAlign: "center", color: Dp.muted, fontSize: 13, marginTop: 30, marginBottom: 14 } as const;
const __style36 = { width: "100%", background: COLORS.panel, border: `1px dashed ${Dp.border}`, color: Dp.soft, borderRadius: 12, padding: "12px 0", fontSize: 13, fontWeight: 600, cursor: "pointer" } as const;
const __style37 = { background: Dp.card, border: `1px solid ${Dp.border}`, borderRadius: 14, padding: 16 } as const;
const __style38 = { fontSize: 13, color: Dp.muted } as const;
const __style39 = { fontSize: 13, fontWeight: 700, color: Dp.text } as const;


export function DiaryTankDetail({ tank, onBack, onUpdate, onShareFish, onOpenCatalog }) {
  const [tab, setTab] = useState("diary");
  const [addingLog, setAddingLog] = useState(false);
  const [logType, setLogType] = useState("water");
  const [logNote, setLogNote] = useState("");
  const [logTemp, setLogTemp] = useState(tank.temperature);
  const [confirmLossId, setConfirmLossId] = useState(null);
  const [addFishModal, setAddFishModal] = useState(false);

  function addFishToTank(fish) {
    onUpdate({
      ...tank,
      fish: [...tank.fish, {
        id: fish.id + "_" + Date.now(), name: fish.name, qty: 1, img: fish.img,
        temp: fish.temp, lifespan: fish.lifespan || "—",
        addedDate: new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long" }),
        addedDateISO: diaryTodayISO(), status: "alive",
      }],
    });
    setAddFishModal(false);
  }

  function markFishLost(fishId) {
    const today = diaryTodayISO();
    onUpdate({
      ...tank,
      fish: tank.fish.map(f => f.id === fishId ? { ...f, status: "lost", lostDateISO: today } : f),
      lastLossISO: today, // сбрасывает отсчёт «месяцев без потерь» для бейджа 🛡️
    });
    setConfirmLossId(null);
  }

  function addLog() {
    if (!logNote.trim()) return;
    // Своевременность: задача выполнена ДО того, как стала просроченной (daysAgo < интервал)
    const onTime =
      logType === "water" ? tank.lastWaterChange < tank.waterChangeEvery :
      logType === "clean" ? tank.lastFilterClean < tank.filterCleanEvery :
      undefined;
    const newLog = { id: "l" + Date.now(), date: diaryTodayISO(), type: logType, note: logNote, temp: logTemp, onTime };
    onUpdate({
      ...tank, logs: [newLog, ...tank.logs],
      lastWaterChange: logType === "water" ? 0 : tank.lastWaterChange,
      lastFilterClean: logType === "clean" ? 0 : tank.lastFilterClean,
      temperature: logTemp,
    });
    setLogNote(""); setAddingLog(false);
  }

  const TABS = [
    { id: "diary", label: "📔 Дневник" },
    { id: "fish",  label: "🐠 Рыбы" },
    { id: "params", label: "🌡 Параметры" },
  ];

  return (
    <div style={__style1}>
      <div style={__style2}>
        <button onClick={onBack} style={__style3}>← К аквариумам</button>
        <div style={__style4}>
          <Sticker e={tank.emoji} size={44} />
          <div>
            <div style={__style5}>{tank.name}</div>
            <div style={__style6}>{tank.volume} л · {tank.fish.reduce((s,f)=>s+(f.status==="lost"?0:f.qty),0)} рыб · 🌡 {tank.temperature}°C</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={__style7}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, background: tab === t.id ? Dp.teal : COLORS.panel, color: tab === t.id ? COLORS.bg : Dp.soft, border: `1px solid ${tab === t.id ? Dp.teal : Dp.border}`, borderRadius: 10, padding: "8px 4px", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={__style8}>
        {/* DIARY TAB */}
        {tab === "diary" && (
          <>
            <DiaryParamsGrid tank={tank} onOpenCatalog={onOpenCatalog} />
            <DiaryTaskList tank={tank} onUpdate={onUpdate} />
            <UrgencyBar daysAgo={tank.lastWaterChange} interval={tank.waterChangeEvery} label={`💧 Смена воды (каждые ${tank.waterChangeEvery} дн.)`} />
            <UrgencyBar daysAgo={tank.lastFilterClean} interval={tank.filterCleanEvery} label={`🧹 Чистка фильтра (каждые ${tank.filterCleanEvery} дн.)`} />

            {addingLog ? (
              <div style={__style9}>
                <div style={__style10}>Новая запись</div>
                <div style={__style11}>
                  {DIARY_LOG_TYPES.map(lt => (
                    <button key={lt.id} onClick={() => setLogType(lt.id)} style={{ background: logType === lt.id ? lt.color + "33" : COLORS.panel, border: `1px solid ${logType === lt.id ? lt.color : Dp.border}`, borderRadius: 8, padding: "5px 10px", fontSize: 12, color: logType === lt.id ? lt.color : Dp.muted, cursor: "pointer" }}>
                      {lt.icon} {lt.label}
                    </button>
                  ))}
                </div>
                {(logType === "water" || logType === "clean") && (
                  (() => {
                    const onTimeNow = logType === "water" ? tank.lastWaterChange < tank.waterChangeEvery : tank.lastFilterClean < tank.filterCleanEvery;
                    return (
                      <div style={{ fontSize: 11, marginBottom: 10, color: onTimeNow ? COLORS.green : Dp.amber, display: "flex", alignItems: "center", gap: 5 }}>
                        {onTimeNow ? "✅ Вовремя — будет бонус +8 XP" : "⚠️ Уже просрочено — бонус за своевременность не начислится"}
                      </div>
                    );
                  })()
                )}
                <textarea
                  value={logNote} onChange={e => setLogNote(e.target.value)}
                  placeholder="Что сделали или заметили?"
                  style={__style12}
                />
                <div style={__style13}>
                  <div style={__style14}>🌡 Температура: <strong style={__style15}>{logTemp}°C</strong></div>
                  <input type="range" min={16} max={32} step={0.5} value={logTemp} onChange={e => setLogTemp(Number(e.target.value))} style={__style16} />
                </div>
                <div style={__style17}>
                  <button onClick={() => setAddingLog(false)} style={__style18}>Отмена</button>
                  <button onClick={addLog} disabled={!logNote.trim()} style={{ flex: 2, background: logNote.trim() ? Dp.teal : Dp.border, border: "none", color: logNote.trim() ? COLORS.bg : Dp.muted, borderRadius: 10, padding: 10, fontSize: 13, fontWeight: 700, cursor: logNote.trim() ? "pointer" : "default" }}>Сохранить</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setAddingLog(true)} style={__style19}>
                + Добавить запись
              </button>
            )}

            {tank.notes && (
              <div style={__style20}>
                📝 {tank.notes}
              </div>
            )}

            {tank.logs.map(log => {
              const lt = DIARY_LOG_TYPES.find(t => t.id === log.type) || DIARY_LOG_TYPES[4];
              return (
                <div key={log.id} style={__style21}>
                  <div style={__style22}>
                    <span style={__style23}>
                      <span style={{ fontSize: 12, background: lt.color + "22", color: lt.color, border: `1px solid ${lt.color}44`, borderRadius: 999, padding: "2px 8px", fontWeight: 600 }}>{lt.icon} {lt.label}</span>
                      {log.onTime === true && (
                        <span title="Сделано до просрочки — бонус XP" style={__style24}>
                          ✅ Вовремя +8 XP
                        </span>
                      )}
                    </span>
                    <span style={__style25}>{formatDiaryDate(log.date)} · {log.temp}°C</span>
                  </div>
                  <div style={__style26}>{log.note}</div>
                </div>
              );
            })}
          </>
        )}

        {/* FISH TAB */}
        {tab === "fish" && (
          <>
            {tank.fish.map(f => {
              const isLost = f.status === "lost";
              const days = f.addedDateISO ? diaryDaysSince(f.addedDateISO) : null;
              const tierIndex = days != null ? getFishSurvivalTier(days) : -1;
              const earned = tierIndex >= 0;
              const nextTarget = tierIndex < FISH_SURVIVAL_TIERS.length - 1 ? FISH_SURVIVAL_TIERS[tierIndex + 1] : FISH_SURVIVAL_TIERS[FISH_SURVIVAL_TIERS.length - 1];
              const prevTarget = tierIndex >= 0 ? FISH_SURVIVAL_TIERS[tierIndex] : 0;
              const pct = tierIndex === FISH_SURVIVAL_TIERS.length - 1 ? 1 : Math.min(Math.max((days - prevTarget) / ((nextTarget - prevTarget) || 1), 0), 1);
              return (
                <div key={f.id} style={{ background: Dp.card, border: `1px solid ${isLost ? Dp.border : earned ? TIER_COLORS[tierIndex] : Dp.border}`, borderRadius: 14, padding: "14px", marginBottom: 10, opacity: isLost ? 0.6 : 1 }}>
                  <div style={__style27}>
                    <span style={{ filter: isLost ? "grayscale(1)" : "none", display: "inline-flex" }}><Sticker e={f.img} size={44} /></span>
                    <div style={__style28}>
                      <div style={{ fontSize: 14, fontWeight: 700, textDecoration: isLost ? "line-through" : "none" }}>{f.name}</div>
                      <div style={__style6}>
                        {isLost ? `🕊️ В памяти · с ${f.addedDate}${f.lostDateISO ? ` по ${formatDiaryDate(f.lostDateISO)}` : ""}` : `${f.qty} шт · добавлены ${f.addedDate}`}
                      </div>
                    </div>
                    {!isLost && earned && (
                      <span style={{ fontSize: 9.5, fontWeight: 800, color: TIER_COLORS[tierIndex], border: `1px solid ${TIER_COLORS[tierIndex]}66`, borderRadius: 999, padding: "1px 7px", whiteSpace: "nowrap" }}>
                        {TIER_NAMES[tierIndex]}
                      </span>
                    )}
                  </div>
                  {!isLost && (
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", fontSize: 12, color: Dp.soft, marginBottom: f.addedDateISO ? 10 : 0 }}>
                      <span>🌡 {f.temp[0]}–{f.temp[1]}°C</span>
                      <span>⏳ Живёт {f.lifespan}</span>
                    </div>
                  )}
                  {!isLost && f.addedDateISO && (
                    <>
                      <div style={__style29}>
                        📅 {days} дн. у вас {tierIndex === FISH_SURVIVAL_TIERS.length - 1 ? "— максимум!" : `· до «${TIER_NAMES[tierIndex + 1]}» осталось ${nextTarget - days} дн.`}
                      </div>
                      <div style={{ height: 5, background: Dp.border, borderRadius: 999, overflow: "hidden", marginBottom: earned ? 8 : 0 }}>
                        <div style={{ height: "100%", width: `${pct * 100}%`, background: earned ? TIER_COLORS[tierIndex] : Dp.amber, borderRadius: 999 }} />
                      </div>
                      {earned && onShareFish && (
                        <button
                          onClick={() => onShareFish(f, tank.name, days, tierIndex)}
                          style={{ width: "100%", background: COLORS.panel, border: `1px solid ${TIER_COLORS[tierIndex]}66`, color: TIER_COLORS[tierIndex], borderRadius: 8, padding: "6px 0", fontSize: 11, fontWeight: 700, cursor: "pointer", marginBottom: 8 }}
                        >
                          📤 Поделиться в Клубе
                        </button>
                      )}
                    </>
                  )}
                  {!isLost && (
                    confirmLossId === f.id ? (
                      <div style={__style30}>
                        <span style={__style31}>Отметить рыбу как потерянную? Это сбросит счётчик «без потерь» 🛡️</span>
                        <button onClick={() => setConfirmLossId(null)} style={__style32}>Отмена</button>
                        <button onClick={() => markFishLost(f.id)} style={__style33}>Да</button>
                      </div>
                    ) : (
                      <button onClick={() => setConfirmLossId(f.id)} style={__style34}>
                        💔 Отметить как потерянную
                      </button>
                    )
                  )}
                </div>
              );
            })}
            {tank.fish.length === 0 && (
              <div style={__style35}>
                Рыб ещё нет — добавьте рыб в аквариум
              </div>
            )}
            <button
              onClick={() => setAddFishModal(true)}
              style={__style36}
            >
              🐠 + Добавить рыбу в этот аквариум
            </button>
          </>
        )}

        {/* PARAMS TAB */}
        {tab === "params" && (
          <div style={__style37}>
            {[
              { label: "Объём аквариума", value: `${tank.volume} л` },
              { label: "Температура", value: `${tank.temperature}°C` },
              { label: "pH воды", value: String(tank.ph) },
              { label: "Кормление", value: tank.feedingSchedule },
              { label: "Смена воды каждые", value: `${tank.waterChangeEvery} дн.` },
              { label: "Чистка фильтра каждые", value: `${tank.filterCleanEvery} дн.` },
            ].map((row, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 5 ? `1px solid ${Dp.border}` : "none" }}>
                <span style={__style38}>{row.label}</span>
                <span style={__style39}>{row.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {addFishModal && (
        <DiaryAddFishModal tank={tank} onClose={() => setAddFishModal(false)} onAdd={addFishToTank} />
      )}
    </div>
  );
}

// Живая проверка совместимости при добавлении рыбы в УЖЕ существующий
// аквариум дневника — переиспользует ту же checkCompatibility, что и корзина,
// просто собирает «виртуальную корзину» из текущих обитателей по FISH_DB.
