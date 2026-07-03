import React, { useState } from "react";
import { COLORS } from "../../theme";
import { Sticker } from "../../components/ui/Sticker";
import { SAVED_ADDRESSES, TIME_SLOTS } from "../../data/checkout";
import { formatSum } from "../../lib/catalog-utils";
import { CkField, CkLabel } from "./CkFields";
import { MapPicker } from "./MapPicker";
import { SlotTimer } from "./SlotTimer";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { width: "100%", textAlign: "left",
          background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 12,
          padding: "10px 14px", color: COLORS.soft, fontSize: 13, cursor: "pointer",
          display: "flex", justifyContent: "space-between" } as const;
const __style2 = { marginTop: 4, background: COLORS.bg2, border: `1px solid ${COLORS.border}`,
            borderRadius: 12, overflow: "hidden" } as const;
const __style3 = { width: "100%", textAlign: "left", background: "none", border: "none",
                  borderBottom: `1px solid ${COLORS.border}`, padding: "10px 14px",
                  fontSize: 13, color: COLORS.text, cursor: "pointer" } as const;
const __style4 = { width: "100%", textAlign: "left",
          background: COLORS.panel, border: `1px solid ${COLORS.border}`,
          borderRadius: 12, padding: "11px 14px", color: COLORS.text, fontSize: 14, cursor: "pointer",
          display: "flex", justifyContent: "space-between" } as const;
const __style5 = { color: COLORS.muted } as const;
const __style6 = { display: "flex", gap: 16, marginTop: 8 } as const;
const __style7 = { fontSize: 12, color: COLORS.muted } as const;
const __style8 = { marginBottom: 18 } as const;
const __style9 = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 } as const;
const __style10 = { display: "flex", background: COLORS.panel, border: `1px solid ${COLORS.border}`,
            borderRadius: 8, overflow: "hidden", fontSize: 11 } as const;
const __style11 = { fontSize: 11, color: COLORS.red, marginTop: 5 } as const;
const __style12 = { width: "100%", background: COLORS.panel, border: `1px solid ${COLORS.border}`,
            borderRadius: 12, padding: "11px 14px", color: COLORS.text, fontSize: 14,
            outline: "none", boxSizing: "border-box" } as const;
const __style13 = { display: "flex", gap: 8 } as const;
const __style14 = { marginTop: 10 } as const;
const __style15 = { fontSize: 11, color: COLORS.soft, marginBottom: 6 } as const;
const __style16 = { color: COLORS.teal } as const;
const __style17 = { flexShrink: 0, background: COLORS.greenBg, border: `1px solid ${COLORS.teal}`,
                  borderRadius: 12, padding: "11px 16px", color: COLORS.teal, fontSize: 13,
                  fontWeight: 700, cursor: "pointer" } as const;
const __style18 = { fontSize: 12, color: COLORS.green2, marginTop: 6 } as const;
const __style19 = { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 } as const;
const __style20 = { display: "flex", justifyContent: "center", marginBottom: 4 } as const;
const __style21 = { fontSize: 10, color: COLORS.muted, marginTop: 2 } as const;
const __style22 = { background: COLORS.greenBg2, border: "1px solid #00C9B133",
        borderRadius: 12, padding: "12px 14px", fontSize: 12.5, color: COLORS.soft,
        marginBottom: 22, lineHeight: 1.6 } as const;


export function StepAddress({ region, onChangeRegion, address, setAddress, comment, setComment,
  slot, setSlot, phone, setPhone, deliveryInfo, onNext }) {

  const [smsInput, setSmsInput] = useState("");
  const [smsSent, setSmsSent] = useState(false);
  const [smsVerified, setSmsVerified] = useState(false);
  const [smsError, setSmsError] = useState("");
  const [savedOpen, setSavedOpen] = useState(false);
  const [touched, setTouched] = useState({});
  const [addrMode, setAddrMode] = useState("map"); // "map" | "manual"

  const phoneClean = phone.replace(/\D/g, "");
  const phoneOk = phoneClean.length >= 9;
  const addrOk = address.trim().length >= 5;
  const canNext = addrOk && phoneOk && smsVerified;

  function sendSMS() {
    if (!phoneOk) return;
    setSmsSent(true);
    setSmsError("");
  }
  function verifySMS() {
    if (smsInput === "1234") {
      setSmsVerified(true); setSmsError("");
    } else {
      setSmsError("Неверный код. Попробуйте ещё раз.");
    }
  }

  return (
    <div>
      {/* Сохранённые адреса */}
      <CkField label="Сохранённые адреса">
        <button onClick={() => setSavedOpen((v) => !v)} style={__style1}>
          <span>📋 Выбрать из сохранённых</span>
          <span>{savedOpen ? "▲" : "▼"}</span>
        </button>
        {savedOpen && (
          <div style={__style2}>
            {SAVED_ADDRESSES.map((a) => (
              <button key={a} onClick={() => { setAddress(a); setAddrMode("manual"); setSavedOpen(false); setTouched((t) => ({ ...t, address: true })); }}
                style={__style3}>
                📍 {a}
              </button>
            ))}
          </div>
        )}
      </CkField>

      {/* Регион */}
      <CkField label="Регион доставки">
        <button onClick={onChangeRegion} style={__style4}>
          <span>📍 {region}</span>
          <span style={__style5}>изменить</span>
        </button>
        <div style={__style6}>
          <span style={__style7}>🚚 {formatSum(deliveryInfo.price)}</span>
          <span style={__style7}>⏱ {deliveryInfo.time}</span>
        </div>
      </CkField>

      {/* Адрес — карта или вручную */}
      <div style={__style8}>
        <div style={__style9}>
          <CkLabel>Адрес доставки</CkLabel>
          <div style={__style10}>
            {["map", "manual"].map((m) => (
              <button key={m} onClick={() => setAddrMode(m)}
                style={{ padding: "4px 10px", border: "none", cursor: "pointer",
                  background: addrMode === m ? COLORS.greenBg : "transparent",
                  color: addrMode === m ? COLORS.teal : COLORS.muted, fontWeight: addrMode === m ? 700 : 400 }}>
                {m === "map" ? "🗺️ Карта" : "✏️ Вручную"}
              </button>
            ))}
          </div>
        </div>

        {addrMode === "map" ? (
          <MapPicker region={region} onAddressSelect={(a) => { setAddress(a); setTouched((t) => ({ ...t, address: true })); }} />
        ) : (
          <>
            <input value={address} onChange={(e) => setAddress(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, address: true }))}
              placeholder="Улица, дом, квартира"
              style={{ width: "100%", background: COLORS.panel, outline: "none", boxSizing: "border-box",
                border: `1px solid ${touched.address && !addrOk ? COLORS.red : addrOk ? "#00C9B166" : COLORS.border}`,
                borderRadius: 12, padding: "11px 14px", color: COLORS.text, fontSize: 14 }} />
            {touched.address && !addrOk && (
              <div style={__style11}>Введите полный адрес (мин. 5 символов)</div>
            )}
          </>
        )}
      </div>

      {/* Комментарий */}
      <CkField label="Комментарий курьеру (необязательно)">
        <input value={comment} onChange={(e) => setComment(e.target.value)}
          placeholder="Напр.: домофон не работает, звоните"
          style={__style12} />
      </CkField>

      {/* Телефон + SMS */}
      <CkField label="Номер телефона">
        <div style={__style13}>
          <input value={phone}
            onChange={(e) => { setPhone(e.target.value); setSmsVerified(false); setSmsSent(false); setSmsInput(""); }}
            onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
            placeholder="+998 90 000 00 00"
            style={{ flex: 1, background: COLORS.panel, outline: "none", boxSizing: "border-box",
              border: `1px solid ${touched.phone && !phoneOk ? COLORS.red : smsVerified ? COLORS.green2 : COLORS.border}`,
              borderRadius: 12, padding: "11px 14px", color: COLORS.text, fontSize: 14 }} />
          <button onClick={sendSMS} disabled={!phoneOk || smsSent}
            style={{ flexShrink: 0, background: phoneOk && !smsSent ? COLORS.greenBg : COLORS.panel,
              border: `1px solid ${phoneOk && !smsSent ? COLORS.teal : COLORS.border}`,
              borderRadius: 12, padding: "11px 14px", color: phoneOk && !smsSent ? COLORS.teal : COLORS.muted,
              fontSize: 13, fontWeight: 700, cursor: phoneOk && !smsSent ? "pointer" : "default" }}>
            {smsSent ? "Отправлен" : "Код"}
          </button>
        </div>
        {touched.phone && !phoneOk && (
          <div style={__style11}>Введите номер телефона</div>
        )}
        {smsSent && !smsVerified && (
          <div style={__style14}>
            <div style={__style15}>
              Введите код из SMS (демо: <strong style={__style16}>1234</strong>)
            </div>
            <div style={__style13}>
              <input value={smsInput} onChange={(e) => setSmsInput(e.target.value)}
                maxLength={4} placeholder="_ _ _ _"
                style={{ flex: 1, background: COLORS.panel, border: `1px solid ${smsError ? COLORS.red : COLORS.border}`,
                  borderRadius: 12, padding: "11px 14px", color: COLORS.text, fontSize: 18,
                  fontWeight: 800, letterSpacing: "0.3em", outline: "none", textAlign: "center" }} />
              <button onClick={verifySMS}
                style={__style17}>✓</button>
            </div>
            {smsError && <div style={__style11}>{smsError}</div>}
          </div>
        )}
        {smsVerified && (
          <div style={__style18}>✓ Номер подтверждён</div>
        )}
      </CkField>

      {/* Время доставки */}
      <CkField label="Время доставки">
        <div style={__style19}>
          {TIME_SLOTS.map((s) => (
            <button key={s.id} onClick={() => setSlot(s.id)}
              style={{ background: slot === s.id ? COLORS.greenBg : COLORS.panel,
                border: `1px solid ${slot === s.id ? COLORS.teal : COLORS.border}`,
                borderRadius: 12, padding: "12px 8px", cursor: "pointer", textAlign: "center" }}>
              <div style={__style20}><Sticker e={s.icon} size={30} /></div>
              <div style={{ fontSize: 13, fontWeight: 700, color: slot === s.id ? COLORS.teal : COLORS.text }}>{s.label}</div>
              <div style={__style21}>{s.sub}</div>
            </button>
          ))}
        </div>
        <SlotTimer slotId={slot} />
      </CkField>

      {/* Уведомление о живых рыбах */}
      <div style={__style22}>
        🐠 Живые рыбы — везём в термопакете с кислородом. Курьер снимет видео при передаче.
      </div>

      <button disabled={!canNext} onClick={onNext}
        style={{ width: "100%", background: canNext ? COLORS.teal : COLORS.panel,
          color: canNext ? COLORS.bg : COLORS.muted, border: "none", borderRadius: 14, padding: "14px",
          fontSize: 15, fontWeight: 800, cursor: canNext ? "pointer" : "default",
          boxShadow: canNext ? "0 4px 20px #00C9B144" : "none", transition: "all 0.2s" }}>
        {!smsVerified ? "Подтвердите телефон" : "Далее: способ оплаты →"}
      </button>
    </div>
  );
}

/* ── STEP 2: оплата ───────────────────────────────────────── */
