import React from "react";
import { COLORS } from "../../theme";
import { Dp } from "../../lib/doctor-styles";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { marginBottom: 14 } as const;
const __style2 = { display: "flex", gap: 8 } as const;
const __style3 = { flex: 1, background: Dp.card, border: `1px solid ${Dp.border}`, borderRadius: 12, padding: "9px 4px", textAlign: "center" } as const;
const __style4 = { fontSize: 10, color: Dp.muted, marginTop: 1 } as const;
const __style5 = { marginTop: 8, background: COLORS.redBg, border: `1px solid ${Dp.danger}66`, borderRadius: 12, padding: "10px 12px" } as const;
const __style6 = { fontSize: 12, color: "#FF8A8A", lineHeight: 1.4, marginBottom: 8 } as const;
const __style7 = { width: "100%", background: Dp.danger, border: "none", color: "#fff", borderRadius: 9, padding: "8px 0", fontSize: 12, fontWeight: 700, cursor: "pointer" } as const;


export function DiaryParamsGrid({ tank, onOpenCatalog }) {
  const params = [
    { label: "pH", value: tank.ph, color: Dp.teal },
    { label: "Темп.", value: `${tank.temperature}°C`, color: Dp.amber },
    { label: "NO₃", value: tank.no3 ?? "—", color: tank.no3 > 40 ? Dp.danger : Dp.soft },
    { label: "NH₄", value: (tank.nh4 ?? 0).toFixed(1), color: (tank.nh4 ?? 0) > 0 ? Dp.danger : COLORS.green },
  ];
  // Замыкаем цикл «дневник → магазин»: если показатели вышли за норму, сразу
  // предлагаем конкретный товар, а не только в AI Докторе.
  const no3High = tank.no3 != null && tank.no3 > 40;
  const nh4High = (tank.nh4 ?? 0) > 0;
  let alert = null;
  if (nh4High) {
    alert = { text: "Обнаружен аммиак (NH₄) — это опасно для рыб. Подмените 20–30% воды и используйте кондиционер для нейтрализации.", query: "кондиционер для воды антиаммиак" };
  } else if (no3High) {
    alert = { text: "NO₃ выше нормы (>40 мг/л) — пора подменить воду и проверить параметры тест-набором.", query: "тест набор для воды NO3" };
  }
  return (
    <div style={__style1}>
      <div style={__style2}>
        {params.map((p, i) => (
          <div key={i} style={__style3}>
            <div style={{ fontSize: 15, fontWeight: 800, color: p.color }}>{p.value}</div>
            <div style={__style4}>{p.label}</div>
          </div>
        ))}
      </div>
      {alert && (
        <div style={__style5}>
          <div style={__style6}>⚠️ {alert.text}</div>
          {onOpenCatalog && (
            <button
              onClick={() => onOpenCatalog(alert.query)}
              style={__style7}
            >
              🛒 Подобрать товар в каталоге
            </button>
          )}
        </div>
      )}
    </div>
  );
}

