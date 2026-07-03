import React from "react";
import { COLORS } from "../../theme";
import { Sticker } from "../../components/ui/Sticker";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { background: "linear-gradient(135deg, #071C14, #071828)", border: "1px solid #00C9B133",
      borderRadius: 16, padding: "16px", marginBottom: 20,
      boxShadow: "0 4px 20px rgba(0,201,177,0.08)" } as const;
const __style2 = { display: "flex", alignItems: "center", gap: 8, marginBottom: 14 } as const;
const __style3 = { width: 28, height: 28, borderRadius: "50%", background: "#00C9B122",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 } as const;
const __style4 = { fontSize: 13, fontWeight: 800, color: COLORS.teal, letterSpacing: "0.04em" } as const;
const __style5 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } as const;
const __style6 = { marginBottom: 6 } as const;
const __style7 = { fontSize: 12, fontWeight: 700, color: COLORS.text, marginBottom: 3 } as const;
const __style8 = { fontSize: 10.5, color: COLORS.muted, lineHeight: 1.4 } as const;


export function CheckoutGuarantees() {
  const items = [
    { icon: "🐠", title: "Гарантия 48 часов", desc: "Рыбы застрахованы — вернём деньги или заменим если погибнут", accent: COLORS.teal },
    { icon: "🎥", title: "Видеофиксация",    desc: "Курьер снимет передачу заказа — доказательство здоровья рыб", accent: COLORS.teal },
    { icon: "🔄", title: "Возврат 24 ч",     desc: "Не понравилось — вернём деньги без вопросов", accent: COLORS.amber },
    { icon: "🔒", title: "Безопасная оплата", desc: "Данные карты не сохраняются — шифрование PCI DSS", accent: COLORS.amber },
  ];
  return (
    <div style={__style1}>
      <div style={__style2}>
        <div style={__style3}>✅</div>
        <div style={__style4}>
          Покупаете с защитой AquaMarjon
        </div>
      </div>
      <div style={__style5}>
        {items.map(({ icon, title, desc, accent }) => (
          <div key={title} style={{ background: COLORS.bg2, border: `1px solid ${accent}22`,
            borderRadius: 12, padding: "12px 10px" }}>
            <div style={__style6}><Sticker e={icon} size={34} /></div>
            <div style={__style7}>{title}</div>
            <div style={__style8}>{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Карточка курьера ─────────────────────────────────────── */
