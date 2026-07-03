import React, { useState } from "react";
import { COLORS } from "../../theme";
import { Dp } from "../../lib/doctor-styles";
import { getMyReferralCode, redeemReferralCode } from "../../lib/referral";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { background: "linear-gradient(135deg, #0F2A26, #0E2030)", border: `1px solid ${Dp.teal}44`, borderRadius: 16, padding: 16, marginBottom: 14 } as const;
const __style2 = { fontSize: 14, fontWeight: 800, marginBottom: 4 } as const;
const __style3 = { fontSize: 12, color: Dp.soft, lineHeight: 1.5, marginBottom: 10 } as const;
const __style4 = { display: "flex", gap: 8, marginBottom: 10 } as const;
const __style5 = { flex: 1, background: COLORS.panel, border: `1px solid ${Dp.border}`, borderRadius: 10, padding: "9px 12px", fontSize: 14, fontWeight: 800, color: Dp.teal, letterSpacing: 0.5 } as const;
const __style6 = { background: Dp.teal, border: "none", color: COLORS.bg, borderRadius: 10, padding: "0 14px", fontSize: 12.5, fontWeight: 700, cursor: "pointer" } as const;
const __style7 = { display: "flex", gap: 8 } as const;
const __style8 = { flex: 1, background: COLORS.panel, border: `1px solid ${Dp.border}`, borderRadius: 10, padding: "9px 12px", color: Dp.text, fontSize: 13, outline: "none" } as const;
const __style9 = { background: COLORS.panel, border: `1px solid ${Dp.border}`, color: Dp.soft, borderRadius: 10, padding: "0 14px", fontSize: 12.5, fontWeight: 700, cursor: "pointer" } as const;


export function ReferralCard() {
  const [code] = useState(() => getMyReferralCode());
  const [friendCode, setFriendCode] = useState("");
  const [msg, setMsg] = useState(null);
  const shareText = `Заказываю рыб и оборудование в AquaMarjon — подключайся по моему коду ${code} и получи промокод на первый заказ! 🐠`;

  function redeem() {
    const res = redeemReferralCode(friendCode);
    if (!res.ok) { setMsg({ ok: false, text: res.error }); return; }
    setMsg({ ok: true, text: `Промокод −${res.reward.percent}% активирован: ${res.reward.code}` });
    setFriendCode("");
  }

  return (
    <div style={__style1}>
      <div style={__style2}>🤝 Пригласи друга — оба получите промокод</div>
      <div style={__style3}>
        Поделитесь своим кодом. Когда друг активирует его — вы оба получаете скидку 10% на заказ от 150 000 сум.
      </div>
      <div style={__style4}>
        <div style={__style5}>{code}</div>
        <button
          onClick={() => {
            if (navigator.share) navigator.share({ text: shareText }).catch(() => {});
            else navigator.clipboard?.writeText(shareText);
          }}
          style={__style6}
        >
          Поделиться
        </button>
      </div>
      <div style={__style7}>
        <input
          value={friendCode} onChange={e => setFriendCode(e.target.value)} placeholder="Код друга (FRIEND-XXXXX)"
          style={__style8}
        />
        <button onClick={redeem} style={__style9}>
          Активировать
        </button>
      </div>
      {msg && (
        <div style={{ marginTop: 8, fontSize: 12, color: msg.ok ? COLORS.green : Dp.danger }}>{msg.ok ? "✅ " : "⚠️ "}{msg.text}</div>
      )}
    </div>
  );
}

