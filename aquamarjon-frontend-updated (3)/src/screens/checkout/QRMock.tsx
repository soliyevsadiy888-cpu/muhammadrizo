import React, { useMemo } from "react";
import { COLORS } from "../../theme";
import { formatSum } from "../../lib/catalog-utils";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { display: "flex", alignItems: "center", gap: 8, marginBottom: 14 } as const;
const __style2 = { display: "flex", gap: 16, alignItems: "center" } as const;
const __style3 = { fontSize: 13, fontWeight: 700, color: COLORS.text, marginBottom: 6 } as const;
const __style4 = { fontSize: 12, color: COLORS.soft, marginBottom: 10, lineHeight: 1.5 } as const;
const __style5 = { fontSize: 10, color: COLORS.muted, marginTop: 3 } as const;
const __style6 = { fontSize: 10, color: COLORS.muted, marginTop: 6 } as const;


export function QRMock({ pay, total }) {
  if (pay === "cash") return null;
  const label = pay === "click" ? "Click" : "Payme";
  const color = pay === "click" ? "#1A73E8" : "#00C853";
  const bgColor = pay === "click" ? "#1A73E822" : "#00C85322";
  const cells = useMemo(() => {
    const grid = [];
    for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {
      const corner = (r < 3 && c < 3) || (r < 3 && c > 5) || (r > 5 && c < 3);
      const inner = (r >= 1 && r <= 2 && c >= 1 && c <= 2) || (r >= 1 && r <= 2 && c >= 6 && c <= 7) || (r >= 6 && r <= 7 && c >= 1 && c <= 2);
      const filled = corner || (!inner && Math.random() > 0.45);
      grid.push({ r, c, filled, corner, inner });
    }
    return grid;
  }, [pay]);
  return (
    <div style={{ background: COLORS.panel, border: `1px solid ${color}33`,
      borderRadius: 16, padding: 16, marginBottom: 18, overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60,
        background: bgColor, borderRadius: "0 16px 0 60px", pointerEvents: "none" }} />

      <div style={__style1}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
        <div style={{ fontSize: 12, fontWeight: 700, color, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          QR-код · {label} · без перехода в приложение
        </div>
      </div>

      <div style={__style2}>
        <div style={{ background: "#fff", padding: 10, borderRadius: 12, flexShrink: 0,
          boxShadow: `0 4px 16px ${color}44` }}>
          <svg width={90} height={90} viewBox="0 0 9 9">
            {cells.map(({ r, c, filled, corner, inner }) => (
              <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1}
                fill={corner || inner ? "#111" : filled ? "#111" : "transparent"} />
            ))}
            {[[0, 0], [0, 6], [6, 0]].map(([r, c]) => (
              <g key={`${r}${c}`}>
                <rect x={c} y={r} width={3} height={3} fill="none" stroke="#111" strokeWidth={0.3} />
                <rect x={c + 0.8} y={r + 0.8} width={1.4} height={1.4} fill="#111" />
              </g>
            ))}
          </svg>
        </div>
        <div>
          <div style={__style3}>
            Наведите камеру
          </div>
          <div style={__style4}>
            Откроется {label} — подтвердите оплату одной кнопкой
          </div>
          <div style={{ fontSize: 18, fontWeight: 900, color }}>
            {formatSum(total)}
          </div>
          <div style={__style5}>
            🔒 Безопасный платёж
          </div>
          <div style={__style6}>
            После нажатия «Подтвердить» ниже мы покажем статус ожидания оплаты
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Блок гарантий перед оплатой ─────────────────────────── */
