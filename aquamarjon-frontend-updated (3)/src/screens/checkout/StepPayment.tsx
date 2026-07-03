import React from "react";
import { COLORS } from "../../theme";
import { PromoField } from "../../components/ui/PromoField";
import { Sticker } from "../../components/ui/Sticker";
import { PAY_METHODS } from "../../data/checkout";
import { formatSum } from "../../lib/catalog-utils";
import { CheckoutGuarantees } from "./CheckoutGuarantees";
import { CkField } from "./CkFields";
import { CourierCard } from "./CourierCard";
import { QRMock } from "./QRMock";
import { UpsellBlock } from "./UpsellBlock";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { display: "flex", flexDirection: "column", gap: 10 } as const;
const __style2 = { flex: 1 } as const;
const __style3 = { fontSize: 11, color: COLORS.muted, marginTop: 2 } as const;
const __style4 = { marginBottom: 20 } as const;
const __style5 = { display: "flex", justifyContent: "space-between", fontSize: 13, color: COLORS.muted, marginBottom: 6 } as const;
const __style6 = { display: "flex", justifyContent: "space-between", fontSize: 13, color: COLORS.green2, marginBottom: 6 } as const;
const __style7 = { display: "flex", justifyContent: "space-between", fontSize: 13, color: COLORS.muted, marginBottom: 2 } as const;
const __style8 = { fontSize: 11, color: COLORS.muted, marginBottom: 10 } as const;
const __style9 = { display: "flex", justifyContent: "space-between", fontSize: 17, fontWeight: 800,
          paddingTop: 12, borderTop: `1px solid ${COLORS.border}` } as const;
const __style10 = { color: COLORS.text } as const;
const __style11 = { color: COLORS.amber } as const;
const __style12 = { display: "flex", gap: 10 } as const;
const __style13 = { flex: "0 0 auto", background: COLORS.panel, color: COLORS.soft,
            border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "13px 18px",
            fontSize: 14, cursor: "pointer" } as const;
const __style14 = { flex: 1, background: COLORS.teal, color: COLORS.bg, border: "none", borderRadius: 14,
            padding: "13px", fontSize: 15, fontWeight: 800, cursor: "pointer",
            boxShadow: "0 4px 20px #00C9B144" } as const;


export function StepPayment({ pay, setPay, promo, setPromo, promoResult, setPromoResult,
  groupedCart, onAddUpsell, onBack, onNext, subtotal, discount, delivery, total, deliveryInfo, region, userId }) {

  return (
    <div>
      <UpsellBlock groupedCart={groupedCart} onAddUpsell={onAddUpsell} />

      {/* Промокод */}
      <PromoField
        subtotal={subtotal}
        userId={userId}
        items={groupedCart.map(i => ({ id: i.id, price: i.price, qty: i.qty }))}
        promoResult={promoResult}
        onApply={(r) => {
          setPromoResult(r);
          setPromo(r?.code ?? "");
        }}
      />

      {/* Способы оплаты */}
      <CkField label="Способ оплаты">
        <div style={__style1}>
          {PAY_METHODS.map((m) => (
            <button key={m.id} onClick={() => setPay(m.id)}
              style={{ display: "flex", alignItems: "center", gap: 12, textAlign: "left",
                background: pay === m.id ? COLORS.greenBg : COLORS.panel,
                border: `2px solid ${pay === m.id ? COLORS.teal : COLORS.border}`,
                borderRadius: 14, padding: "13px 14px", cursor: "pointer", transition: "all 0.15s" }}>
              <Sticker e={m.icon} size={38} />
              <div style={__style2}>
                <div style={{ fontSize: 14, fontWeight: 700, color: pay === m.id ? COLORS.teal : COLORS.text }}>{m.label}</div>
                <div style={__style3}>{m.sub}</div>
              </div>
              <div style={{ width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                border: `2px solid ${pay === m.id ? COLORS.teal : COLORS.border}`,
                background: pay === m.id ? COLORS.teal : "none" }} />
            </button>
          ))}
        </div>
      </CkField>

      <QRMock pay={pay} total={total} />
      <CourierCard info={deliveryInfo} />
      <CheckoutGuarantees />

      <div style={__style4}>
        <div style={__style5}>
          <span>Товары</span><span>{formatSum(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div style={__style6}>
            <span>Скидка ({promoResult?.label})</span><span>−{formatSum(discount)}</span>
          </div>
        )}
        {promoResult?.type === "free_delivery" && (
          <div style={__style6}>
            <span>🚚 Бесплатная доставка</span><span>−{formatSum(deliveryInfo.price)}</span>
          </div>
        )}
        <div style={__style7}>
          <span>🚚 Доставка · {region}</span><span>{formatSum(delivery)}</span>
        </div>
        <div style={__style8}>⏱ {deliveryInfo.time}</div>
        <div style={__style9}>
          <span style={__style10}>К оплате</span>
          <span style={__style11}>{formatSum(total)}</span>
        </div>
      </div>

      <div style={__style12}>
        <button onClick={onBack}
          style={__style13}>← Назад</button>
        <button onClick={onNext}
          style={__style14}>
          Подтвердить · {formatSum(total)}
        </button>
      </div>
    </div>
  );
}

/* ── STEP 3: подтверждение ───────────────────────────────── */
