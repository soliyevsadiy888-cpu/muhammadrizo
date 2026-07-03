import React, { useState } from "react";
import { COLORS } from "../../theme";
import { Sticker } from "../../components/ui/Sticker";
import { QUIZ_EXPERIENCE_OPTIONS, QUIZ_GOAL_OPTIONS, QUIZ_VOLUME_OPTIONS } from "../../data/quiz-content";
import { getQuizRecommendations } from "../../lib/quiz";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { animation: "qFadeIn 0.4s ease-out" } as const;
const __style2 = { textAlign: "center", marginBottom: 28 } as const;
const __style3 = {
          width: 72, height: 72, borderRadius: "50%",
          background: "#00C9B122", border: "2px solid #00C9B144",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 32, margin: "0 auto 16px",
          boxShadow: "0 0 28px #00C9B133",
          animation: "qFadeIn 0.5s ease-out 0.1s both",
        } as const;
const __style4 = { fontSize: 21, fontWeight: 900, margin: "0 0 8px", fontFamily: "Georgia, serif", lineHeight: 1.3 } as const;
const __style5 = { display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" } as const;
const __style6 = {
              fontSize: 11, fontWeight: 600,
              background: "#00C9B122", border: "1px solid #00C9B144",
              color: COLORS.teal, borderRadius: 999, padding: "3px 10px",
            } as const;
const __style7 = { textAlign: "center", color: COLORS.muted, padding: "32px 0", fontSize: 14 } as const;
const __style8 = { fontSize: 13, color: COLORS.soft, marginBottom: 16, lineHeight: 1.6 } as const;
const __style9 = { display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 } as const;
const __style10 = { flex: 1, minWidth: 0 } as const;
const __style11 = { fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 2, lineHeight: 1.3 } as const;
const __style12 = { display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 4 } as const;
const __style13 = { fontSize: 10, background: COLORS.panel, color: COLORS.soft, borderRadius: 6, padding: "2px 6px" } as const;
const __style14 = { fontSize: 12, color: COLORS.muted } as const;
const __style15 = { flexShrink: 0, textAlign: "right" } as const;
const __style16 = { fontSize: 14, fontWeight: 800, color: COLORS.amber, marginBottom: 6 } as const;
const __style17 = {
            width: "100%", display: "flex", alignItems: "center", gap: 12,
            textAlign: "left", background: COLORS.greenBg,
            border: "1px solid #00C9B144", borderRadius: 16,
            padding: "14px 16px", cursor: "pointer", marginBottom: 12,
          } as const;
const __style18 = {
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            background: "#00C9B122", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 22,
          } as const;
const __style19 = { flex: 1 } as const;
const __style20 = { fontSize: 13, fontWeight: 800, color: COLORS.teal, marginBottom: 2 } as const;
const __style21 = { fontSize: 12, color: COLORS.soft, lineHeight: 1.4 } as const;
const __style22 = { color: COLORS.teal, fontSize: 18, flexShrink: 0 } as const;
const __style23 = {
            width: "100%", display: "flex", alignItems: "center", gap: 12,
            textAlign: "left", background: COLORS.card,
            border: `1px solid ${COLORS.border}`, borderRadius: 16,
            padding: "14px 16px", cursor: "pointer", marginBottom: 12,
          } as const;
const __style24 = {
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            background: "#F0A93C22", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 22,
          } as const;
const __style25 = { fontSize: 13, fontWeight: 800, color: COLORS.amber, marginBottom: 2 } as const;
const __style26 = { color: COLORS.amber, fontSize: 18, flexShrink: 0 } as const;
const __style27 = {
          width: "100%",
          background: "linear-gradient(135deg, #00C9B1, #00A896)",
          color: COLORS.bg, border: "none", borderRadius: 14,
          padding: "15px", fontSize: 15, fontWeight: 800,
          cursor: "pointer", boxShadow: "0 6px 24px #00C9B144",
          marginBottom: 12,
        } as const;
const __style28 = { textAlign: "center", fontSize: 12, color: COLORS.muted, margin: 0 } as const;


export function QuizResult({ answers, onAddToCart, onGoToCatalog, onOpenConfigurator, onOpenDoctor }) {
  const recs = getQuizRecommendations(answers);
  const volLabel = QUIZ_VOLUME_OPTIONS.find(v => v.id === answers.volume)?.label || "";
  const expLabel = QUIZ_EXPERIENCE_OPTIONS.find(e => e.id === answers.experience)?.label || "";
  const goalLabel = QUIZ_GOAL_OPTIONS.find(g => g.id === answers.goal)?.label || "";

  // "Первый раз" / "Немного есть" — предлагаем не разбираться самим,
  // а доверить сборку AI-конфигуратору. "Опытный" / "Профи" — у них,
  // скорее всего, аквариум уже есть, поэтому уместнее предложить
  // AI-доктора на случай проблем с текущими рыбками.
  const isNewbie = answers.experience === "zero" || answers.experience === "some";
  const hasTankAlready = answers.experience === "medium" || answers.experience === "expert";

  const [added, setAdded] = useState({});

  function handleAdd(fish) {
    setAdded(prev => ({ ...prev, [fish.id]: true }));
    onAddToCart(fish);
  }

  return (
    <div style={__style1}>
      <style>{`@keyframes qFadeIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }`}</style>

      {/* Заголовок результата */}
      <div style={__style2}>
        <div style={__style3}>🎯</div>

        <h2 style={__style4}>
          Ваш стартовый набор готов
        </h2>

        {/* Теги ответов */}
        <div style={__style5}>
          {[
            { label: volLabel, icon: "🪣" },
            { label: expLabel, icon: "🎓" },
            { label: goalLabel, icon: "🎯" },
          ].map(tag => (
            <span key={tag.label} style={__style6}>
              {tag.icon} {tag.label}
            </span>
          ))}
        </div>
      </div>

      {recs.length === 0 ? (
        <div style={__style7}>
          Нет рыб для таких параметров — попробуйте другие ответы
        </div>
      ) : (
        <>
          <p style={__style8}>
            Специально для вас — {recs.length} рыб, которые подойдут под ваш аквариум, опыт и цель:
          </p>
          <div style={__style9}>
            {recs.map((fish, i) => (
              <div
                key={fish.id}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  background: COLORS.card, border: `1px solid ${COLORS.border}`,
                  borderRadius: 16, padding: "14px 14px",
                  animation: `qFadeIn 0.4s ease-out ${0.05 * i + 0.15}s both`,
                }}
              >
                <Sticker e={fish.img} size={56} radius={14} bg={`radial-gradient(circle, ${fish.color}33, #050B12 70%)`} ring />
                <div style={__style10}>
                  <div style={__style11}>
                    {fish.name}
                  </div>
                  <div style={__style12}>
                    {fish.badges.slice(0, 2).map(b => (
                      <span key={b} style={__style13}>{b}</span>
                    ))}
                  </div>
                  <div style={__style14}>
                    ⭐ {fish.rating} · мин. {fish.minVolume} л
                  </div>
                </div>
                <div style={__style15}>
                  <div style={__style16}>
                    {(fish.price / 1000).toFixed(0)}K
                  </div>
                  <button
                    onClick={() => handleAdd(fish)}
                    style={{
                      background: added[fish.id] ? COLORS.greenBg2 : COLORS.teal,
                      color: added[fish.id] ? COLORS.teal : COLORS.bg,
                      border: added[fish.id] ? `1px solid ${COLORS.teal}` : "none",
                      borderRadius: 10, padding: "6px 12px",
                      fontSize: 12, fontWeight: 700, cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {added[fish.id] ? "✓ В корзине" : "+ В корзину"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Персональный переход к AI-инструментам — показываем только тот,
          что реально подходит под ответ про опыт (не обе карточки сразу,
          чтобы не перегружать экран результата). */}
      {isNewbie && onOpenConfigurator && (
        <button
          onClick={onOpenConfigurator}
          style={__style17}
        >
          <div style={__style18}>🤖</div>
          <div style={__style19}>
            <div style={__style20}>
              Не хотите выбирать сами?
            </div>
            <div style={__style21}>
              AI-конфигуратор соберёт весь аквариум под ключ за 30 секунд
            </div>
          </div>
          <span style={__style22}>→</span>
        </button>
      )}

      {hasTankAlready && onOpenDoctor && (
        <button
          onClick={onOpenDoctor}
          style={__style23}
        >
          <div style={__style24}>🩺</div>
          <div style={__style19}>
            <div style={__style25}>
              Аквариум уже есть?
            </div>
            <div style={__style21}>
              Если с рыбками что-то не так — спросите AI-доктора
            </div>
          </div>
          <span style={__style26}>→</span>
        </button>
      )}

      {/* CTA */}
      <button
        onClick={onGoToCatalog}
        style={__style27}
      >
        Перейти в каталог →
      </button>
      <p style={__style28}>
        Каталог уже отфильтрован под ваши параметры
      </p>
    </div>
  );
}

/* Главный компонент квиза */
