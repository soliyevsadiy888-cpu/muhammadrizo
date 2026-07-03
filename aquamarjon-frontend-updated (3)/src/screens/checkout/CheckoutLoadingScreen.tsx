import React, { useEffect, useState } from "react";
import { COLORS } from "../../theme";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { textAlign: "center", padding: "60px 20px" } as const;
const __style2 = { fontSize: 52, marginBottom: 20, animation: "ckSpin 2s linear infinite" } as const;
const __style3 = { fontSize: 16, color: COLORS.text, fontWeight: 700, marginBottom: 8 } as const;
const __style4 = { fontSize: 12, color: COLORS.muted, marginBottom: 4 } as const;
const __style5 = { width: 180, height: 4, background: COLORS.border, borderRadius: 2,
        margin: "16px auto 0", overflow: "hidden" } as const;
const __style6 = { height: "100%", background: COLORS.teal, borderRadius: 2,
          animation: "ckFill 2.4s linear forwards" } as const;
const __style7 = { marginTop: 20, fontSize: 12, color: COLORS.soft } as const;
const __style8 = { background: "none", border: "none", color: COLORS.teal, fontWeight: 700, fontSize: 12, cursor: "pointer", padding: 0, textDecoration: "underline" } as const;


export function CheckoutLoadingScreen({ onDone, pay, onPaymentIssue }) {
  const [dot, setDot] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const isDigital = pay === "click" || pay === "payme";
  const msgs = isDigital
    ? ["Ожидаем подтверждение оплаты…", "Проверяем платёж…", "Почти готово…"]
    : ["Отправляем заказ…", "Назначаем курьера…", "Подтверждаем…"];
  useEffect(() => {
    const t = setInterval(() => setDot((d) => (d + 1) % 3), 900);
    const done = setTimeout(onDone, 2400);
    // Если бы это была реальная оплата и подтверждение задержалось — через 6с
    // показываем подсказку «платёж завис». В моке не наступает, но UI на это готов.
    const help = setTimeout(() => setShowHelp(true), 6000);
    return () => { clearInterval(t); clearTimeout(done); clearTimeout(help); };
  }, []);
  return (
    <div style={__style1}>
      <div style={__style2}>🐠</div>
      <style>{`@keyframes ckSpin{ 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }`}</style>
      <div style={__style3}>
        {msgs[dot]}
      </div>
      {isDigital && (
        <div style={__style4}>
          Не закрывайте окно, пока платёж не подтвердится
        </div>
      )}
      <div style={__style5}>
        <div style={__style6} />
        <style>{`@keyframes ckFill{ from{width:0%} to{width:100%} }`}</style>
      </div>
      {showHelp && isDigital && (
        <div style={__style7}>
          Платёж долго не подтверждается?{" "}
          <button
            onClick={onPaymentIssue}
            style={__style8}
          >Попробовать другой способ</button>
        </div>
      )}
    </div>
  );
}


/* ── STEP 1: адрес + телефон/SMS ─────────────────────────── */
