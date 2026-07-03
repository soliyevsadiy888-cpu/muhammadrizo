import React, { useState } from "react";
import { COLORS } from "../../theme";
import { AppleEmoji } from "../../components/ui/AppleEmoji";
import { Dp } from "../../lib/doctor-styles";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { position: "fixed", inset: 0, background: "rgba(5,10,16,0.75)", zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center" } as const;
const __style2 = { background: COLORS.bg2, borderRadius: "20px 20px 0 0", padding: "24px 20px 32px", width: "100%", maxWidth: 420, color: Dp.text } as const;
const __style3 = { fontSize: 16, fontWeight: 800, marginBottom: 18 } as const;
const __style4 = { display: "flex", gap: 8, marginBottom: 16 } as const;
const __style5 = { width: "100%", background: COLORS.panel, border: `1px solid ${Dp.border}`, borderRadius: 10, padding: "11px 12px", color: Dp.text, fontSize: 14, outline: "none", boxSizing: "border-box", marginBottom: 14 } as const;
const __style6 = { marginBottom: 20 } as const;
const __style7 = { fontSize: 12.5, color: Dp.soft, marginBottom: 6 } as const;
const __style8 = { color: Dp.amber } as const;
const __style9 = { width: "100%", accentColor: Dp.amber } as const;
const __style10 = { display: "flex", justifyContent: "space-between", fontSize: 11, color: Dp.muted } as const;
const __style11 = { display: "flex", gap: 8 } as const;
const __style12 = { flex: 1, background: COLORS.panel, border: `1px solid ${Dp.border}`, color: Dp.soft, borderRadius: 12, padding: 12, fontSize: 14, cursor: "pointer" } as const;


export function DiaryAddTankModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [volume, setVolume] = useState(100);
  const [emoji, setEmoji] = useState("🌿");
  const EMOJIS = ["🌿","🏔️","🪸","🌊","🐚","🌴","👑","✨"];

  function submit() {
    if (!name.trim()) return;
    onAdd({ id: "tank_" + Date.now(), name: name.trim(), volume, emoji, fish: [], logs: [], waterChangeEvery: 7, lastWaterChange: 0, filterCleanEvery: 30, lastFilterClean: 0, feedingSchedule: "2 раза в день", notes: "", temperature: 25, ph: 7.0 });
  }

  return (
    <div style={__style1} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={__style2}>
        <div style={__style3}>Новый аквариум</div>
        <div style={__style4}>
          {EMOJIS.map(e => (
            <button key={e} onClick={() => setEmoji(e)} style={{ width: 38, height: 38, borderRadius: 10, background: emoji === e ? Dp.teal + "33" : COLORS.panel, border: `1px solid ${emoji === e ? Dp.teal : Dp.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }}><AppleEmoji e={e} size={20} /></button>
          ))}
        </div>
        <input autoFocus value={name} onChange={e => setName(e.target.value)} placeholder="Название (Гостиная, Кабинет...)" style={__style5} />
        <div style={__style6}>
          <div style={__style7}>Объём: <strong style={__style8}>{volume} л</strong></div>
          <input type="range" min={20} max={500} step={10} value={volume} onChange={e => setVolume(Number(e.target.value))} style={__style9} />
          <div style={__style10}><span>20 л (нано)</span><span>500 л (XL)</span></div>
        </div>
        <div style={__style11}>
          <button onClick={onClose} style={__style12}>Отмена</button>
          <button onClick={submit} disabled={!name.trim()} style={{ flex: 2, background: name.trim() ? Dp.teal : Dp.border, border: "none", color: name.trim() ? COLORS.bg : Dp.muted, borderRadius: 12, padding: 12, fontSize: 14, fontWeight: 700, cursor: name.trim() ? "pointer" : "default" }}>Создать</button>
        </div>
      </div>
    </div>
  );
}

