import React, { useEffect, useState } from "react";
import { COLORS } from "../../theme";
import { TIME_SLOTS } from "../../data/checkout";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { flex: 1 } as const;
const __style2 = { fontSize: 13, color: COLORS.text, fontWeight: 800, letterSpacing: "0.05em", fontFamily: "monospace" } as const;
const __style3 = { fontSize: 10, color: COLORS.muted, textAlign: "right", lineHeight: 1.4 } as const;


export function SlotTimer({ slotId }: { slotId: string }) {
  const slot = TIME_SLOTS.find((s: any) => s.id === slotId);
  const [secs, setSecs] = useState<number | null>(null);

  useEffect(() => {
    const now = new Date();
    const close = new Date();
    close.setHours(slot.closeHour + 3, 0, 0, 0); // демо: всегда +3ч
    const diff = Math.max(0, Math.floor((close.getTime() - now.getTime()) / 1000));
    setSecs(diff);
    const t = setInterval(() => setSecs((s) => (s !== null && s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [slotId]);

  if (secs === null) return null;
  const h = Math.floor(secs / 3600), m = Math.floor((secs % 3600) / 60), s = secs % 60;
  const urgent = secs < 1800;
  const veryUrgent = secs < 600;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10,
      background: veryUrgent ? "#3A0E0E" : urgent ? "#2A1A08" : COLORS.greenBg2,
      border: `1px solid ${veryUrgent ? COLORS.red : urgent ? COLORS.amber : COLORS.teal}44`,
      borderRadius: 12, padding: "10px 14px" }}>
      <span style={{ fontSize: 18, animation: urgent ? "pulse 1s ease-in-out infinite" : "none" }}>⏳</span>
      <div style={__style1}>
        <div style={{ fontSize: 11, color: veryUrgent ? COLORS.red : urgent ? COLORS.amber : COLORS.teal,
          fontWeight: 700, marginBottom: 2 }}>
          {veryUrgent ? "⚠️ Слот почти закрыт!" : urgent ? "Торопитесь!" : `Слот «${slot.label}» открыт`}
        </div>
        <div style={__style2}>
          {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
        </div>
      </div>
      <div style={__style3}>
        до закрытия<br />записи
      </div>
      <style>{`@keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.2)} }`}</style>
    </div>
  );
}

/* ── Анимированный прогресс шагов ────────────────────────── */
