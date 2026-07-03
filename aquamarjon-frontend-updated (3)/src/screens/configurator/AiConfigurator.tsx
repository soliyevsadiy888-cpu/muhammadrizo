import React, { useState } from "react";
import { COLORS } from "../../theme";
import { Sticker } from "../../components/ui/Sticker";
import { EXPERIENCE_OPTIONS, GOAL_OPTIONS } from "../../data/quiz-content";
import { buildAiPlan } from "../../lib/ai-configurator";
import { formatSum } from "../../lib/catalog-utils";
import { disabledBtn, ghostBtn, primaryBtn } from "../../lib/seller-styles";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = {
        position: "fixed",
        inset: 0,
        background: COLORS.bg,
        zIndex: 170,
        overflowY: "auto",
        color: COLORS.text,
      } as const;
const __style2 = { padding: "16px 18px 40px", maxWidth: 480, margin: "0 auto" } as const;
const __style3 = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 } as const;
const __style4 = { fontSize: 13, color: COLORS.soft } as const;
const __style5 = { background: "none", border: "none", color: COLORS.soft, fontSize: 18, cursor: "pointer" } as const;
const __style6 = { display: "flex", gap: 6, margin: "10px 0 24px" } as const;
const __style7 = { fontSize: 20, fontWeight: 800, margin: "0 0 4px" } as const;
const __style8 = { fontSize: 13, color: COLORS.muted, marginBottom: 16 } as const;
const __style9 = { display: "flex", gap: 6, marginBottom: 18, background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 4 } as const;
const __style10 = { textAlign: "center", fontSize: 40, fontWeight: 800, color: COLORS.teal, marginBottom: 6 } as const;
const __style11 = { width: "100%", marginBottom: 8, accentColor: COLORS.teal } as const;
const __style12 = { display: "flex", justifyContent: "space-between", fontSize: 11, color: COLORS.muted, marginBottom: 30 } as const;
const __style13 = { fontSize: 12, color: COLORS.muted, marginBottom: 14 } as const;
const __style14 = { display: "flex", gap: 8, marginBottom: 10 } as const;
const __style15 = { flex: 1 } as const;
const __style16 = { fontSize: 10.5, color: COLORS.muted, display: "block", marginBottom: 4 } as const;
const __style17 = { width: "100%", background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "9px 8px", color: COLORS.text, fontSize: 14, fontWeight: 700, textAlign: "center", outline: "none" } as const;
const __style18 = { textAlign: "center", background: COLORS.greenBg, border: "1px solid #00C9B144", borderRadius: 12, padding: "12px", marginBottom: 18 } as const;
const __style19 = { fontSize: 11, color: COLORS.muted, marginBottom: 2 } as const;
const __style20 = { fontSize: 28, fontWeight: 800, color: COLORS.teal } as const;
const __style21 = { fontSize: 10.5, color: COLORS.muted, marginTop: 2 } as const;
const __style22 = { ...primaryBtn, marginBottom: 30, background: COLORS.greenBg, color: COLORS.teal, border: `1px solid ${COLORS.teal}` } as const;
const __style23 = { fontSize: 13, color: COLORS.muted, marginBottom: 20 } as const;
const __style24 = { display: "flex", flexDirection: "column", gap: 10, marginBottom: 26 } as const;
const __style25 = { fontSize: 14, fontWeight: 700 } as const;
const __style26 = { fontSize: 12, color: COLORS.muted } as const;
const __style27 = { fontSize: 13, color: COLORS.muted, marginBottom: 18 } as const;
const __style28 = { display: "flex", gap: 8, marginBottom: 24 } as const;
const __style29 = { fontSize: 10.5, color: COLORS.muted, fontWeight: 400, marginTop: 2 } as const;
const __style30 = { fontSize: 12, color: COLORS.soft, display: "block", marginBottom: 6 } as const;
const __style31 = { textAlign: "center", fontSize: 26, fontWeight: 800, color: COLORS.amber, marginBottom: 6 } as const;
const __style32 = { width: "100%", marginBottom: 8, accentColor: COLORS.amber } as const;
const __style33 = { textAlign: "center", padding: "60px 0", color: COLORS.soft, fontSize: 14 } as const;
const __style34 = { fontSize: 19, fontWeight: 800, margin: "0 0 4px" } as const;
const __style35 = { fontSize: 13, fontWeight: 700, color: COLORS.soft, marginBottom: 8 } as const;
const __style36 = {
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      background: COLORS.card,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 12,
                      padding: "10px 12px",
                      marginBottom: 8,
                    } as const;
const __style37 = { fontSize: 13.5, fontWeight: 600 } as const;
const __style38 = { fontSize: 11.5, color: COLORS.muted } as const;
const __style39 = { fontSize: 13, fontWeight: 700, color: COLORS.amber } as const;
const __style40 = { fontSize: 13, color: COLORS.muted, marginBottom: 12 } as const;
const __style41 = { fontSize: 13, fontWeight: 700, color: COLORS.soft, margin: "16px 0 8px" } as const;
const __style42 = { display: "flex", justifyContent: "space-between", fontSize: 13, color: COLORS.soft2, padding: "5px 2px" } as const;
const __style43 = { borderTop: `1px solid ${COLORS.border}`, marginTop: 14, paddingTop: 12 } as const;
const __style44 = { display: "flex", justifyContent: "space-between", fontSize: 13, color: COLORS.soft, marginBottom: 4 } as const;
const __style45 = { display: "flex", justifyContent: "space-between", fontSize: 13, color: COLORS.soft, marginBottom: 8 } as const;
const __style46 = { display: "flex", justifyContent: "space-between", fontSize: 17, fontWeight: 800 } as const;
const __style47 = { color: COLORS.amber } as const;
const __style48 = {
                    background: COLORS.greenBg,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 10,
                    padding: "10px 12px",
                    fontSize: 12.5,
                    color: COLORS.soft,
                    margin: "14px 0",
                  } as const;
const __style49 = { ...ghostBtn, marginTop: 8 } as const;


export function AiConfigurator({ onClose, onApply }) {
  const [step, setStep] = useState(1);
  const [volume, setVolume] = useState(100);
  const [goal, setGoal] = useState(null);
  const [experience, setExperience] = useState(null);
  const [budget, setBudget] = useState(500000);
  const [plan, setPlan] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [calcMode, setCalcMode] = useState(false); // переключатель: ползунок vs калькулятор по размерам
  const [dimL, setDimL] = useState(60);
  const [dimW, setDimW] = useState(30);
  const [dimH, setDimH] = useState(35);
  const calcVolume = Math.round((dimL * dimW * dimH) / 1000); // см³ → литры

  function applyCalcVolume() {
    const v = Math.max(20, Math.min(350, calcVolume || 20));
    setVolume(v);
    setCalcMode(false);
  }

  function goNext() {
    if (step === 3) {
      setGenerating(true);
      setStep(4);
      setTimeout(() => {
        setPlan(buildAiPlan({ volume, goal, experience, budget }));
        setGenerating(false);
      }, 900);
    } else {
      setStep((s) => s + 1);
    }
  }

  return (
    <div
      style={__style1}
    >
      <div style={__style2}>
        <div style={__style3}>
          <span style={__style4}>🤖 AI-конфигуратор</span>
          <button onClick={onClose} style={__style5} aria-label="Закрыть">✕</button>
        </div>

        {step <= 3 && (
          <div style={__style6}>
            {[1, 2, 3].map((n) => (
              <div key={n} style={{ flex: 1, height: 3, borderRadius: 2, background: n <= step ? COLORS.teal : COLORS.border }} />
            ))}
          </div>
        )}

        {/* Step 1 — объём */}
        {step === 1 && (
          <>
            <h2 style={__style7}>Какой у вас объём?</h2>
            <p style={__style8}>
              Или сколько литров планируете — точность не важна
            </p>

            <div style={__style9}>
              <button
                onClick={() => setCalcMode(false)}
                style={{ flex: 1, background: !calcMode ? COLORS.teal : "transparent", color: !calcMode ? COLORS.bg : COLORS.soft, border: "none", borderRadius: 9, padding: "8px 6px", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}
              >🎚 Знаю литраж</button>
              <button
                onClick={() => setCalcMode(true)}
                style={{ flex: 1, background: calcMode ? COLORS.teal : "transparent", color: calcMode ? COLORS.bg : COLORS.soft, border: "none", borderRadius: 9, padding: "8px 6px", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}
              >📐 Посчитать по размерам</button>
            </div>

            {!calcMode && (
              <>
                <div style={__style10}>
                  {volume} л
                </div>
                <input
                  type="range"
                  min={20}
                  max={350}
                  step={10}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  style={__style11}
                />
                <div style={__style12}>
                  <span>20 л — нано</span><span>350+ л — большой</span>
                </div>
              </>
            )}

            {calcMode && (
              <>
                <p style={__style13}>
                  Измерьте аквариум изнутри (или возьмите размеры с коробки) — посчитаем литраж автоматически.
                </p>
                <div style={__style14}>
                  {[
                    { label: "Длина, см", val: dimL, set: setDimL },
                    { label: "Ширина, см", val: dimW, set: setDimW },
                    { label: "Высота, см", val: dimH, set: setDimH },
                  ].map((d) => (
                    <div key={d.label} style={__style15}>
                      <label style={__style16}>{d.label}</label>
                      <input
                        type="number"
                        min={5}
                        max={300}
                        value={d.val}
                        onChange={(e) => d.set(Math.max(0, Number(e.target.value)))}
                        style={__style17}
                      />
                    </div>
                  ))}
                </div>
                <div style={__style18}>
                  <div style={__style19}>Объём по формуле Д×Ш×В</div>
                  <div style={__style20}>≈ {calcVolume} л</div>
                  <div style={__style21}>фактический объём воды обычно на 10–15% меньше (грунт, декор, уровень воды)</div>
                </div>
                <button onClick={applyCalcVolume} style={__style22}>
                  Использовать {Math.max(20, Math.min(350, calcVolume || 20))} л
                </button>
              </>
            )}

            <button onClick={goNext} style={primaryBtn}>Далее →</button>
          </>
        )}

        {/* Step 2 — цель */}
        {step === 2 && (
          <>
            <h2 style={__style7}>Для чего аквариум?</h2>
            <p style={__style23}>Это определит каких рыб предложим</p>
            <div style={__style24}>
              {GOAL_OPTIONS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGoal(g.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    textAlign: "left",
                    background: goal === g.id ? COLORS.greenBg : COLORS.panel,
                    border: `1px solid ${goal === g.id ? COLORS.teal : COLORS.border}`,
                    borderRadius: 14,
                    padding: "14px",
                    color: COLORS.text,
                    cursor: "pointer",
                  }}
                >
                  <Sticker e={g.icon} size={40} />
                  <span>
                    <div style={__style25}>{g.label}</div>
                    <div style={__style26}>{g.hint}</div>
                  </span>
                </button>
              ))}
            </div>
            <button onClick={goNext} disabled={!goal} style={goal ? primaryBtn : disabledBtn}>Далее →</button>
          </>
        )}

        {/* Step 3 — опыт + бюджет */}
        {step === 3 && (
          <>
            <h2 style={__style7}>Опыт и бюджет</h2>
            <p style={__style27}>Чтобы не предложить слишком сложных рыб</p>

            <div style={__style28}>
              {EXPERIENCE_OPTIONS.map((e) => (
                <button
                  key={e.id}
                  onClick={() => setExperience(e.id)}
                  style={{
                    flex: 1,
                    background: experience === e.id ? COLORS.greenBg : COLORS.panel,
                    border: `1px solid ${experience === e.id ? COLORS.teal : COLORS.border}`,
                    borderRadius: 12,
                    padding: "12px 6px",
                    color: COLORS.text,
                    fontSize: 12.5,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {e.label}
                  <div style={__style29}>{e.hint}</div>
                </button>
              ))}
            </div>

            <label style={__style30}>
              Бюджет на старт (рыбы + оборудование)
            </label>
            <div style={__style31}>
              {formatSum(budget)}
            </div>
            <input
              type="range"
              min={150000}
              max={3000000}
              step={50000}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              style={__style32}
            />
            <div style={__style12}>
              <span>150 000</span><span>3 000 000+</span>
            </div>

            <button onClick={goNext} disabled={!experience} style={experience ? primaryBtn : disabledBtn}>
              🤖 Сгенерировать план
            </button>
          </>
        )}

        {/* Step 4 — результат */}
        {step === 4 && (
          <>
            {generating && (
              <div style={__style33}>
                🤖 AI подбирает рыб под {volume} л и {formatSum(budget)}…
              </div>
            )}
            {plan && !generating && (
              <>
                <h2 style={__style34}>🎉 Ваш план готов</h2>
                <p style={__style27}>
                  Аквариум {volume} л · {GOAL_OPTIONS.find((g) => g.id === goal)?.label}
                </p>

                <div style={__style35}>🐠 Рыбы</div>
                {plan.fish.map((f) => (
                  <div
                    key={f.id}
                    style={__style36}
                  >
                    <Sticker e={f.img} size={42} />
                    <span style={__style15}>
                      <div style={__style37}>{f.name} {f.qty > 1 ? `×${f.qty}` : ""}</div>
                      <div style={__style38}>{formatSum(f.price)} / шт</div>
                    </span>
                    <span style={__style39}>{formatSum(f.price * f.qty)}</span>
                  </div>
                ))}
                {plan.fish.length === 0 && (
                  <div style={__style40}>
                    Под такой объём пока нет подходящих видов — попробуйте увеличить литраж.
                  </div>
                )}

                <div style={__style41}>🛠 Оборудование</div>
                {plan.equipment.map((e) => (
                  <div key={e.name} style={__style42}>
                    <span>{e.name}</span><span>{formatSum(e.price)}</span>
                  </div>
                ))}

                <div style={__style43}>
                  <div style={__style44}>
                    <span>Рыбы</span><span>{formatSum(plan.fishTotal)}</span>
                  </div>
                  <div style={__style45}>
                    <span>Оборудование</span><span>{formatSum(plan.equipTotal)}</span>
                  </div>
                  <div style={__style46}>
                    <span>Итого старт</span><span style={__style47}>{formatSum(plan.grandTotal)}</span>
                  </div>
                </div>

                <div
                  style={__style48}
                >
                  ✅ Все рыбы в плане проверены AI на совместимость друг с другом
                </div>

                <button onClick={() => onApply(plan.fish)} style={primaryBtn}>
                  🐠 Добавить рыб в корзину
                </button>
                <button onClick={() => setStep(1)} style={__style49}>
                  Пересоздать план
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

