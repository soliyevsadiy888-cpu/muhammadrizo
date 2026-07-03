import React from "react";
import { COLORS } from "../../theme";
import { AppleEmoji } from "../../components/ui/AppleEmoji";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = {
      position: "fixed", inset: 0, background: COLORS.bg,
      color: COLORS.text, zIndex: 200, overflowY: "auto",
      fontFamily: "system-ui, sans-serif",
    } as const;
const __style2 = {
        background: "linear-gradient(135deg, #071C14, #08131F)",
        borderBottom: `1px solid ${COLORS.border}`,
        padding: "20px 18px 16px",
      } as const;
const __style3 = { display: "flex", justifyContent: "space-between", alignItems: "flex-start" } as const;
const __style4 = { fontSize: 11, color: COLORS.teal, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 } as const;
const __style5 = { fontSize: 22, fontWeight: 900, margin: "0 0 4px", letterSpacing: "-0.02em" } as const;
const __style6 = { fontSize: 13, color: COLORS.muted } as const;
const __style7 = { background: "none", border: "none", color: COLORS.muted, fontSize: 22, cursor: "pointer" } as const;
const __style8 = { display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" } as const;
const __style9 = {
                background: COLORS.panel, border: `1px solid ${COLORS.border}`,
                borderRadius: 999, padding: "4px 10px",
                display: "flex", alignItems: "center", gap: 5,
                fontSize: 12,
              } as const;
const __style10 = { color: COLORS.soft } as const;
const __style11 = { padding: "20px 18px 40px" } as const;
const __style12 = { display: "flex", gap: 14, marginBottom: 20 } as const;
const __style13 = { display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 } as const;
const __style14 = {
                width: 44, height: 44, borderRadius: 12,
                background: "#0D2030", border: `1px solid ${COLORS.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22,
              } as const;
const __style15 = { width: 1, flex: 1, background: COLORS.border, margin: "6px 0", minHeight: 16 } as const;
const __style16 = { paddingTop: 6, flex: 1 } as const;
const __style17 = { display: "flex", alignItems: "center", gap: 8, marginBottom: 4 } as const;
const __style18 = { fontSize: 14, fontWeight: 700 } as const;
const __style19 = {
                  fontSize: 10, background: COLORS.panel, color: COLORS.muted,
                  borderRadius: 6, padding: "2px 7px", whiteSpace: "nowrap",
                } as const;
const __style20 = { fontSize: 13, color: "#8BABB5", lineHeight: 1.6 } as const;
const __style21 = {
          background: "linear-gradient(135deg, #071C14, #0D2030)",
          border: "1px solid #00C9B133",
          borderRadius: 16, padding: "16px",
          textAlign: "center",
        } as const;
const __style22 = { fontSize: 24, marginBottom: 6 } as const;
const __style23 = { fontSize: 14, fontWeight: 700, marginBottom: 4 } as const;
const __style24 = { fontSize: 12, color: COLORS.muted } as const;
const __style25 = {
              width: "100%", marginTop: 16,
              background: "linear-gradient(135deg, #00C9B1, #00A693)", color: COLORS.bg,
              border: "none", borderRadius: 14, padding: "14px",
              fontSize: 14.5, fontWeight: 800, cursor: "pointer",
            } as const;
const __style26 = {
            width: "100%", marginTop: 10,
            background: COLORS.panel, color: COLORS.soft,
            border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "14px",
            fontSize: 15, fontWeight: 700, cursor: "pointer",
          } as const;


export function PostOrderScreen({ cart, onClose, onCreateDiary }) {
  const fishItems = cart.filter(f => f.type === "fish");
  const maxTemp = fishItems.length > 0 ? Math.max(...fishItems.map(f => f.temp[1])) : 26;
  const minTemp = fishItems.length > 0 ? Math.min(...fishItems.map(f => f.temp[0])) : 22;
  const steps = [
    {
      icon: "🌡️",
      title: "Настройте температуру воды",
      desc: `Установите обогреватель на ${Math.round((maxTemp + minTemp) / 2)}°C — оптимум для ваших рыб (диапазон ${minTemp}–${maxTemp}°C).`,
      time: "Сейчас",
    },
    {
      icon: "💧",
      title: "Отстойте воду 24 часа",
      desc: "Налейте воду и дайте хлору испариться. Или используйте кондиционер «Антихлор» — он нейтрализует хлор за 5 минут.",
      time: "Сейчас",
    },
    {
      icon: "⚙️",
      title: "Запустите фильтр и компрессор",
      desc: "Дайте оборудованию поработать минимум 1–2 часа до прибытия рыб. Полезные бактерии начнут заселяться.",
      time: "За 2 часа",
    },
    {
      icon: "🛍️",
      title: "Приём пакета с рыбой",
      desc: "Не вскрывайте пакет сразу! Положите его на поверхность воды на 15–20 минут — рыба привыкнет к температуре.",
      time: "При получении",
    },
    {
      icon: "🐠",
      title: "Аккуратно выпустите рыб",
      desc: "Наклоните пакет и дайте рыбам самим выплыть. Воду из пакета в аквариум не добавляйте — там может быть стресс-гормон.",
      time: "При получении",
    },
    {
      icon: "🌑",
      title: "Первые 2 часа — темнота",
      desc: "Приглушите свет и не тревожьте рыб. Они осваивают новый дом. Кормить только через 24 часа.",
      time: "После запуска",
    },
  ];
  return (
    <div style={__style1}>
      {/* Header */}
      <div style={__style2}>
        <div style={__style3}>
          <div>
            <div style={__style4}>
              ✅ Заказ оформлен
            </div>
            <h2 style={__style5}>
              Пока везут рыб —<br />подготовьте аквариум
            </h2>
            <div style={__style6}>
              {fishItems.length > 0 ? `${fishItems.length} вид${fishItems.length > 1 ? "а" : ""} · оптимальная t° ${minTemp}–${maxTemp}°C` : "Следуйте инструкции"}
            </div>
          </div>
          <button onClick={onClose} style={__style7} aria-label="Закрыть">✕</button>
        </div>
        {/* Fish pills */}
        {fishItems.length > 0 && (
          <div style={__style8}>
            {fishItems.map(f => (
              <div key={f.id} style={__style9}>
                <AppleEmoji e={f.img} size={14} />
                <span style={__style10}>{f.name.split(" ")[0]}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Steps */}
      <div style={__style11}>
        {steps.map((s, i) => (
          <div key={i} style={__style12}>
            <div style={__style13}>
              <div style={__style14}>{s.icon}</div>
              {i < steps.length - 1 && (
                <div style={__style15} />
              )}
            </div>
            <div style={__style16}>
              <div style={__style17}>
                <div style={__style18}>{s.title}</div>
                <span style={__style19}>{s.time}</span>
              </div>
              <div style={__style20}>{s.desc}</div>
            </div>
          </div>
        ))}

        <div style={__style21}>
          <div style={__style22}>🎉</div>
          <div style={__style23}>Рыбы готовы — Удачи!</div>
          <div style={__style24}>Гарантия 48 часов. Если что-то пошло не так — напишите нам</div>
        </div>

        {onCreateDiary && fishItems.length > 0 && (
          <button
            onClick={() => onCreateDiary(fishItems)}
            style={__style25}
          >📔 Создать дневник для этого аквариума</button>
        )}

        <button
          onClick={onClose}
          style={__style26}
        >← Вернуться в каталог</button>
      </div>
    </div>
  );
}

/* ============================================================
   UX: AI Чат-поддержка — плавающая кнопка + чат
   ============================================================ */
