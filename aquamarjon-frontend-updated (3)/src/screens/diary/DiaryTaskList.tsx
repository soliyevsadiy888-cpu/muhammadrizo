import React from "react";
import { COLORS } from "../../theme";
import { Dp } from "../../lib/doctor-styles";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { marginBottom: 16 } as const;
const __style2 = { fontSize: 11, color: Dp.muted, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 8 } as const;
const __style3 = { display: "flex", flexDirection: "column", gap: 6 } as const;
const __style4 = { flex: 1 } as const;
const __style5 = {
            display: "flex", alignItems: "center", gap: 10,
            background: "#2A2210", border: `1px solid ${Dp.amber}66`,
            borderRadius: 12, padding: "10px 12px",
          } as const;
const __style6 = { fontSize: 18 } as const;
const __style7 = { fontSize: 13.5, fontWeight: 700, color: Dp.amber } as const;
const __style8 = { fontSize: 11, color: Dp.soft, marginTop: 1 } as const;


export function DiaryTaskList({ tank, onUpdate }) {
  function toggleTask(taskId) {
    const updatedTasks = tank.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t);
    onUpdate({ ...tank, tasks: updatedTasks });
  }
  if (!tank.tasks || tank.tasks.length === 0) return null;
  return (
    <div style={__style1}>
      <div style={__style2}>
        Задачи на сегодня
      </div>
      <div style={__style3}>
        {tank.tasks.map(t => (
          <div key={t.id} onClick={() => toggleTask(t.id)} style={{
            display: "flex", alignItems: "center", gap: 10,
            background: Dp.card, border: `1px solid ${t.overdue && !t.done ? Dp.amber + "66" : Dp.border}`,
            borderRadius: 12, padding: "10px 12px", cursor: "pointer",
          }}>
            <div style={{
              width: 22, height: 22, flexShrink: 0, borderRadius: 6,
              border: `1.5px solid ${t.done ? COLORS.green : Dp.border}`,
              background: t.done ? COLORS.green : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, color: COLORS.bg, fontWeight: 900,
            }}>
              {t.done ? "✓" : ""}
            </div>
            <div style={__style4}>
              <div style={{
                fontSize: 13.5, fontWeight: 600,
                color: t.done ? Dp.muted : Dp.text,
                textDecoration: t.done ? "line-through" : "none",
              }}>
                {t.icon} {t.label}
              </div>
              <div style={{ fontSize: 11, color: t.overdue && !t.done ? Dp.amber : Dp.muted, marginTop: 1 }}>
                {t.overdue && !t.done ? "⚠️ " : ""}{t.sub}
              </div>
            </div>
          </div>
        ))}
        {tank.treatment && (
          <div style={__style5}>
            <div style={__style6}>💊</div>
            <div style={__style4}>
              <div style={__style7}>
                Курс лечения — день {tank.treatment.day}/{tank.treatment.totalDays}
              </div>
              <div style={__style8}>
                Добавить {tank.treatment.name}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

