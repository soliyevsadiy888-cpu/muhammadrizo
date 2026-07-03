import React, { useState } from "react";
import { COLORS } from "../../theme";
import { Sticker } from "../../components/ui/Sticker";
import { FISH_DB } from "../../data/fish";
import { checkCompatibility } from "../../lib/catalog-utils";
import { Dp } from "../../lib/doctor-styles";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { position: "fixed", inset: 0, background: "rgba(5,10,16,0.75)", zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center" } as const;
const __style2 = { background: COLORS.bg2, borderRadius: "20px 20px 0 0", padding: "20px 16px 28px", width: "100%", maxWidth: 420, maxHeight: "78vh", display: "flex", flexDirection: "column", color: Dp.text } as const;
const __style3 = { fontSize: 16, fontWeight: 800, marginBottom: 12 } as const;
const __style4 = { width: "100%", background: COLORS.panel, border: `1px solid ${Dp.border}`, borderRadius: 10, padding: "10px 12px", color: Dp.text, fontSize: 14, outline: "none", boxSizing: "border-box", marginBottom: 12 } as const;
const __style5 = { overflowY: "auto", flex: 1 } as const;
const __style6 = { display: "flex", alignItems: "center", gap: 10, background: Dp.card, border: `1px solid ${Dp.border}`, borderRadius: 12, padding: "10px 12px", marginBottom: 8 } as const;
const __style7 = { flex: 1, minWidth: 0 } as const;
const __style8 = { fontSize: 13, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } as const;
const __style9 = { fontSize: 11, color: COLORS.green, marginTop: 2 } as const;
const __style10 = { textAlign: "center", color: Dp.muted, fontSize: 13, marginTop: 20 } as const;
const __style11 = { marginTop: 12, width: "100%", background: COLORS.panel, border: `1px solid ${Dp.border}`, color: Dp.soft, borderRadius: 12, padding: 12, fontSize: 14, cursor: "pointer" } as const;


export function DiaryAddFishModal({ tank, onClose, onAdd }) {
  const [q, setQ] = useState("");
  const tankAsCart = tank.fish
    .filter(f => f.status !== "lost")
    .map(f => FISH_DB.find(d => f.id.startsWith(d.id)))
    .filter(Boolean);
  const results = FISH_DB.filter(f => f.type === "fish" && (!q || f.name.toLowerCase().includes(q.toLowerCase()))).slice(0, 30);
  return (
    <div style={__style1} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={__style2}>
        <div style={__style3}>Добавить рыбу в «{tank.name}»</div>
        <input
          autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Поиск рыбы..."
          style={__style4}
        />
        <div style={__style5}>
          {results.map(f => {
            const compat = checkCompatibility(f, tankAsCart);
            const color = compat.level === "bad" ? Dp.danger : compat.level === "warn" ? Dp.amber : COLORS.green;
            return (
              <div key={f.id} style={__style6}>
                <Sticker e={f.img} size={40} radius={10} />
                <div style={__style7}>
                  <div style={__style8}>{f.name}</div>
                  {compat.reason ? (
                    <div style={{ fontSize: 11, color, marginTop: 2 }}>{compat.level === "bad" ? "⛔ " : "⚠️ "}{compat.reason}</div>
                  ) : (
                    <div style={__style9}>✅ Совместима с обитателями</div>
                  )}
                </div>
                <button
                  onClick={() => onAdd(f)}
                  style={{ background: compat.level === "bad" ? "transparent" : Dp.teal, border: `1px solid ${compat.level === "bad" ? Dp.danger : Dp.teal}`, color: compat.level === "bad" ? Dp.danger : COLORS.bg, borderRadius: 9, padding: "7px 10px", fontSize: 11.5, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}
                >
                  {compat.level === "bad" ? "Всё равно" : "+ Добавить"}
                </button>
              </div>
            );
          })}
          {results.length === 0 && (
            <div style={__style10}>Ничего не найдено</div>
          )}
        </div>
        <button onClick={onClose} style={__style11}>Отмена</button>
      </div>
    </div>
  );
}

