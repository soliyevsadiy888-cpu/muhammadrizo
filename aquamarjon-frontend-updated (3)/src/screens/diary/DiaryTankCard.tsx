import React from "react";
import { COLORS } from "../../theme";
import { DPill } from "../../components/ui/DPill";
import { Sticker } from "../../components/ui/Sticker";
import { UrgencyBar } from "../../components/ui/UrgencyBar";
import { diaryUrgency } from "../../lib/diary-stats";
import { Dp } from "../../lib/doctor-styles";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { position: "absolute", top: 12, right: 12, background: Dp.amber, color: COLORS.bg, borderRadius: 999, fontSize: 10, fontWeight: 800, padding: "2px 8px" } as const;
const __style2 = { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 } as const;
const __style3 = { fontSize: 15, fontWeight: 700 } as const;
const __style4 = { fontSize: 12, color: Dp.muted } as const;
const __style5 = { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 } as const;
const __style6 = { fontSize: 12, color: Dp.muted, marginTop: 4 } as const;


export interface DiaryTankFish {
  id: string;
  img?: string;
  name: string;
  qty: number;
  status?: "alive" | "lost";
}

export interface DiaryTankTask {
  id: string;
  done: boolean;
  [key: string]: any;
}

export interface DiaryTank {
  id: string;
  name: string;
  emoji?: string;
  volume: number;
  fish: DiaryTankFish[];
  tasks?: DiaryTankTask[];
  lastWaterChange: number;
  waterChangeEvery: number;
  lastFilterClean: number;
  filterCleanEvery: number;
  temperature: number;
  ph: number;
  no3?: number;
  nh4?: number;
  feedingSchedule: string;
}

export const DiaryTankCard = React.memo(function DiaryTankCard({ tank, onClick }: { tank: DiaryTank; onClick: (tank: DiaryTank) => void }) {
  const waterUrg = diaryUrgency(tank.lastWaterChange, tank.waterChangeEvery);
  const filterUrg = diaryUrgency(tank.lastFilterClean, tank.filterCleanEvery);
  const hasAlert = waterUrg !== "ok" || filterUrg !== "ok";
  const tasksDone = tank.tasks ? tank.tasks.filter(t => t.done).length : 0;
  const tasksTotal = tank.tasks ? tank.tasks.length : 0;
  return (
    <div
      onClick={() => onClick(tank)}
      role="button"
      tabIndex={0}
      aria-label={`Открыть аквариум «${tank.name}»`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(tank);
        }
      }}
      style={{ background: Dp.card, border: `1px solid ${hasAlert ? Dp.amber + "66" : Dp.border}`, borderRadius: 16, padding: 16, marginBottom: 12, cursor: "pointer", position: "relative" }}
    >
      {hasAlert && (
        <div style={__style1}>
          Нужен уход
        </div>
      )}
      <div style={__style2}>
        <Sticker e={tank.emoji} size={44} radius={12} ring />
        <div>
          <div style={__style3}>{tank.name}</div>
          <div style={__style4}>{tank.volume} л · {tank.fish.filter(f=>f.status!=="lost").length} вида · {tank.fish.reduce((s,f)=>s+(f.status==="lost"?0:f.qty),0)} рыб</div>
        </div>
      </div>
      {tasksTotal > 0 && (
        <div style={{ fontSize: 11.5, color: tasksDone === tasksTotal ? COLORS.green : Dp.soft, marginBottom: 10 }}>
          ✅ Задачи на сегодня: {tasksDone} из {tasksTotal}
        </div>
      )}
      <div style={__style5}>
        {tank.fish.map(f => <DPill key={f.id} text={`${f.img} ${f.name.split(" ")[0]} ×${f.qty}`} color={Dp.soft} />)}
      </div>
      <UrgencyBar daysAgo={tank.lastWaterChange} interval={tank.waterChangeEvery} label={`💧 Смена воды (каждые ${tank.waterChangeEvery} дн.)`} />
      <UrgencyBar daysAgo={tank.lastFilterClean} interval={tank.filterCleanEvery} label={`🧹 Чистка фильтра (каждые ${tank.filterCleanEvery} дн.)`} />
      <div style={__style6}>🌡 {tank.temperature}°C · pH {tank.ph} · Кормление: {tank.feedingSchedule}</div>
    </div>
  );
});

