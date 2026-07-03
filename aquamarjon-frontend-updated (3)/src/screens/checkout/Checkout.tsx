import React, { useEffect, useMemo, useState } from "react";
import { COLORS } from "../../theme";
import { TIME_SLOTS } from "../../data/checkout";
import { DELIVERY_RATES } from "../../data/regions";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";
import { markRewardPromoUsed } from "../../lib/achievement-promo";
import { API, tgUser } from "../../lib/api";
import {
  baseDeliveryPrice,
  cartSubtotal,
  cartTotal,
  changeCartQty,
  groupCart,
  removeCartItem,
} from "../../lib/checkout-utils";
import { PromoResult, calcPromoSavings } from "../../lib/promo";
import { CheckoutCartSummary } from "./CheckoutCartSummary";
import { CheckoutLoadingScreen } from "./CheckoutLoadingScreen";
import { CheckoutSteps } from "./CheckoutSteps";
import { OfflinePayWarning } from "./OfflinePayWarning";
import { StepAddress } from "./StepAddress";
import { StepDone } from "./StepDone";
import { StepPayment } from "./StepPayment";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { position: "fixed", inset: 0, background: "rgba(5,10,16,0.7)", zIndex: 180,
        display: "flex", alignItems: "flex-end" } as const;
const __style2 = { background: COLORS.bg, width: "100%", maxHeight: "92vh", overflowY: "auto",
          borderRadius: "20px 20px 0 0", color: COLORS.text, animation: "sheetUp 0.25s ease-out" } as const;
const __style3 = { position: "sticky", top: 0, zIndex: 10,
          background: "rgba(8,19,31,0.92)", backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${COLORS.border}`, padding: "14px 18px",
          display: "flex", alignItems: "center", gap: 12 } as const;
const __style4 = { flex: 1 } as const;
const __style5 = { fontSize: 10, color: COLORS.muted, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.06em" } as const;
const __style6 = { fontSize: 16, fontWeight: 800, color: COLORS.text } as const;
const __style7 = { fontSize: 11, fontWeight: 700, padding: "2px 9px", borderRadius: 999,
            background: "#00C9B122", color: COLORS.teal, border: "1px solid #00C9B144" } as const;
const __style8 = { background: "none", border: "none", color: COLORS.soft, fontSize: 18, cursor: "pointer", padding: 0 } as const;
const __style9 = { padding: "24px 18px 36px" } as const;


export function Checkout({ region, cart, setCart, onClose, onDone, onChangeRegion }) {
  const [step, setStep] = useState(1); // 1 адрес, 2 оплата, 3 готово
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [slot, setSlot] = useState("day");
  const [phone, setPhone] = useState("");
  const [pay, setPay] = useState("cash");
  const [promo, setPromo] = useState("");                              // код для отправки в /orders
  const [promoResult, setPromoResult] = useState<PromoResult | null>(null);

  // Разовое предупреждение об офлайне при попытке оплаты: показываем один раз
  // за сессию оформления заказа (не при каждом клике), пока связь не появится
  // и не пропадёт снова — тогда предупредим ещё раз.
  const { online } = useOnlineStatus();
  const [showOfflinePayWarning, setShowOfflinePayWarning] = useState(false);
  const [offlineAcknowledged, setOfflineAcknowledged] = useState(false);
  useEffect(() => { if (online) setOfflineAcknowledged(false); }, [online]);

  const orderId = useMemo(() => Math.floor(1000 + Math.random() * 9000), []);
  const deliveryInfo = DELIVERY_RATES[region] || { price: 35000, time: "сегодня", courier: "Курьер", phone: "", rating: 4.8, trips: 0 };

  const groupedCart = useMemo(() => groupCart(cart), [cart]);
  const subtotal = cartSubtotal(cart);
  const baseDelivery = baseDeliveryPrice(cart, deliveryInfo.price);
  const { discount, delivery } = calcPromoSavings(promoResult, subtotal, baseDelivery);
  const total = cartTotal(subtotal, discount, delivery);

  function handleQtyChange(id, delta) {
    setCart((c) => changeCartQty(c, id, delta));
  }
  function handleRemove(id) {
    setCart((c) => removeCartItem(c, id));
  }
  function handleAddUpsell(u) {
    setCart((c) => [...c, { ...u }]);
  }

  function goToConfirm() {
    // Оплата картой/Click/Payme объективно требует сеть; наличные при курьере
    // мы готовы принять офлайн, но всё равно предупреждаем один раз, чтобы
    // человек не удивился потом, почему заказ долго не подтверждался.
    if (!online && !offlineAcknowledged) {
      setShowOfflinePayWarning(true);
      return;
    }
    setLoading(true);
  }
  async function handleDone() {
    // Если применённый промокод — личная награда за бейдж дневника, гасим его
    // здесь же, при подтверждённом оформлении заказа: это единственная точка,
    // где мы точно знаем, что заказ состоялся, поэтому одноразовость надёжна
    // и для офлайн-фолбэка (когда бэкенд недоступен), и для онлайн-пути.
    if (promoResult && promoResult.label.includes("награда за достижение")) {
      markRewardPromoUsed(promoResult.code);
    }
    try {
      const items = groupedCart.map(([item, qty]: [any, number]) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        qty,
      }));
      const slotObj = TIME_SLOTS.find((s: any) => s.id === slot);
      const res = await fetch(`${API}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          region,
          address,
          comment,
          delivery_slot: slotObj ? `${slotObj.label} · ${slotObj.sub}` : slot,
          pay_method: pay,
          promo_code: promo || undefined,
          promo_type: promoResult?.type || undefined,
          items,
          buyer_name: tgUser?.first_name,
          telegram_user: tgUser,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка сервера");

      const order = {
        id: data.order_id || orderId,
        date: new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long" }),
        items: cart,
        total,
        address,
        slot: slotObj ? `${slotObj.label} · ${slotObj.sub}` : slot,
        pay,
        region,
        deliveryInfo,
        status: "accepted",
      };
      onDone(order);
    } catch (err: any) {
      // Если бэкенд недоступен — всё равно показываем подтверждение
      const slotObj = TIME_SLOTS.find((s: any) => s.id === slot);
      const order = {
        id: orderId,
        date: new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long" }),
        items: cart,
        total,
        address,
        slot: slotObj ? `${slotObj.label} · ${slotObj.sub}` : slot,
        pay,
        region,
        deliveryInfo,
        status: "accepted",
      };
      onDone(order);
      console.warn("Backend unavailable, order shown locally:", err.message);
    }
  }

  const stepLabel = step === 1 ? "Адрес и время" : step === 2 ? "Способ оплаты" : "Заказ оформлен";

  return (
    <div
      style={__style1}
      onClick={step !== 3 && !loading ? onClose : undefined}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={__style2}
      >
        {/* Заголовок */}
        <div style={__style3}>
          <button onClick={() => { if (step === 2) setStep(1); }}
            style={{ background: "none", border: "none",
              color: step === 2 ? COLORS.soft : "transparent",
              fontSize: 18, cursor: step === 2 ? "pointer" : "default", padding: 0, lineHeight: 1 }}>←</button>
          <div style={__style4}>
            <div style={__style5}>{stepLabel}</div>
            <div style={__style6}>🐠 AquaMarjon · Оформление</div>
          </div>
          <span style={__style7}>#{orderId}</span>
          <button onClick={onClose} style={__style8} aria-label="Закрыть">✕</button>
        </div>

        {/* Тело */}
        <div style={__style9}>
          {step < 3 && !loading && <CheckoutSteps current={step} onStepClick={(n) => setStep(n)} />}

          {step < 3 && !loading && (
            <CheckoutCartSummary
              groupedCart={groupedCart} onQtyChange={handleQtyChange} onRemove={handleRemove}
              subtotal={subtotal} discount={discount}
              delivery={delivery} total={total}
              deliveryInfo={deliveryInfo} collapsed={step === 2} />
          )}

          {loading && (
            <CheckoutLoadingScreen
              pay={pay}
              onDone={() => { setLoading(false); setStep(3); }}
              onPaymentIssue={() => { setLoading(false); setStep(2); }}
            />
          )}

          {!loading && step === 1 && (
            <StepAddress
              region={region} onChangeRegion={onChangeRegion}
              address={address} setAddress={setAddress}
              comment={comment} setComment={setComment}
              slot={slot} setSlot={setSlot}
              phone={phone} setPhone={setPhone}
              deliveryInfo={deliveryInfo}
              onNext={() => setStep(2)} />
          )}

          {!loading && step === 2 && (
            <StepPayment
              pay={pay} setPay={setPay}
              promo={promo} setPromo={setPromo}
              promoResult={promoResult} setPromoResult={setPromoResult}
              groupedCart={groupedCart} onAddUpsell={handleAddUpsell}
              onBack={() => setStep(1)} onNext={goToConfirm}
              subtotal={subtotal} discount={discount}
              delivery={delivery} total={total}
              deliveryInfo={deliveryInfo} region={region}
              userId={tgUser?.id} />
          )}

          {!loading && step === 3 && (
            <StepDone
              orderId={orderId} address={address}
              slot={slot} pay={pay} groupedCart={groupedCart}
              deliveryInfo={deliveryInfo} region={region}
              onDone={handleDone} />
          )}
        </div>
      </div>

      {showOfflinePayWarning && (
        <OfflinePayWarning
          pay={pay}
          onCancel={() => setShowOfflinePayWarning(false)}
          onConfirm={() => {
            setOfflineAcknowledged(true);
            setShowOfflinePayWarning(false);
            setLoading(true);
          }}
        />
      )}
    </div>
  );
}

/* ---------- DeliveryTracker (экран отслеживания для клиента) ---------- */
