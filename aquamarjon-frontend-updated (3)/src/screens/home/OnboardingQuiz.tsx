import React, { useState } from "react";
import { COLORS } from "../../theme";
import { QUIZ_EXPERIENCE_OPTIONS, QUIZ_GOAL_OPTIONS, QUIZ_VOLUME_OPTIONS } from "../../data/quiz-content";
import { QuizResult } from "./QuizResult";
import { QuizStep } from "./QuizStep";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = {
      minHeight: "100vh",
      background: "radial-gradient(ellipse at top, #0E2235 0%, #08131F 70%)",
      color: COLORS.text,
      fontFamily: "system-ui, -apple-system, sans-serif",
      display: "flex", flexDirection: "column",
    } as const;
const __style2 = {
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 20px",
        borderBottom: `1px solid ${COLORS.border}`,
      } as const;
const __style3 = { display: "flex", alignItems: "center", gap: 8 } as const;
const __style4 = { fontSize: 20 } as const;
const __style5 = { fontSize: 16, fontWeight: 900, color: COLORS.teal, letterSpacing: "-0.03em" } as const;
const __style6 = { background: "none", border: "none", color: COLORS.muted, fontSize: 12, cursor: "pointer" } as const;
const __style7 = { flex: 1, padding: "28px 20px 24px", overflowY: "auto", maxWidth: 480, width: "100%", margin: "0 auto", boxSizing: "border-box" } as const;
const __style8 = {
                  width: "100%", display: "flex", alignItems: "center", gap: 12,
                  textAlign: "left", background: COLORS.greenBg,
                  border: "1px dashed #00C9B166", borderRadius: 16,
                  padding: "13px 16px", cursor: "pointer", marginTop: 14,
                  animation: "qFadeIn 0.3s ease-out",
                } as const;
const __style9 = { fontSize: 20, flexShrink: 0 } as const;
const __style10 = { flex: 1, fontSize: 12.5, color: COLORS.soft, lineHeight: 1.4 } as const;
const __style11 = { color: COLORS.teal } as const;
const __style12 = { color: COLORS.teal, fontSize: 16, flexShrink: 0 } as const;
const __style13 = {
          padding: "16px 20px",
          borderTop: `1px solid ${COLORS.border}`,
          background: COLORS.bg,
          display: "flex", gap: 10,
        } as const;
const __style14 = {
                flex: "0 0 auto", background: COLORS.panel, color: COLORS.soft,
                border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "13px 18px",
                fontSize: 14, cursor: "pointer",
              } as const;


export function OnboardingQuiz({ onDone, onOpenConfigurator, onOpenDoctor }) {
  const [step, setStep] = useState(1); // 1 | 2 | 3 | "result"
  const [answers, setAnswers] = useState({ volume: null, experience: null, goal: null });
  const [pendingCart, setPendingCart] = useState([]);

  const STEPS = [
    {
      key: "volume",
      title: "Какой у вас аквариум?",
      subtitle: "Подберём рыб, которые точно не будут тесниться",
      options: QUIZ_VOLUME_OPTIONS,
    },
    {
      key: "experience",
      title: "Какой у вас опыт?",
      subtitle: "Выберем рыб под ваш уровень — без лишнего стресса",
      options: QUIZ_EXPERIENCE_OPTIONS,
    },
    {
      key: "goal",
      title: "Что хотите от аквариума?",
      subtitle: "Определим характер и назначение рыб",
      options: QUIZ_GOAL_OPTIONS,
    },
  ];

  const currentStep = STEPS[step - 1];
  const currentAnswer = currentStep ? answers[currentStep.key] : null;
  const canNext = currentAnswer !== null;

  function handleSelect(id) {
    setAnswers(prev => ({ ...prev, [currentStep.key]: id }));
  }

  function handleNext() {
    if (step < 3) setStep(s => s + 1);
    else setStep("result");
  }

  function handleBack() {
    if (step === "result") setStep(3);
    else if (step > 1) setStep(s => s - 1);
  }

  function handleGoToCatalog() {
    // Передаём ответы квиза как фильтр + рыб из корзины
    const volOpt = QUIZ_VOLUME_OPTIONS.find(v => v.id === answers.volume);
    const expOpt = QUIZ_EXPERIENCE_OPTIONS.find(e => e.id === answers.experience);
    const goalOpt = QUIZ_GOAL_OPTIONS.find(g => g.id === answers.goal);
    onDone({
      quizAnswers: answers,
      cartItems: pendingCart,
      quizFilter: { maxVolume: volOpt?.max, difficulties: expOpt?.difficulty, goals: goalOpt?.goals },
    });
  }

  return (
    <div style={__style1}>
      {/* Шапка */}
      <div style={__style2}>
        <div style={__style3}>
          <span style={__style4}>🐠</span>
          <span style={__style5}>AquaMarjon</span>
        </div>
        <button
          onClick={handleGoToCatalog}
          style={__style6}
        >
          Пропустить →
        </button>
      </div>

      {/* Контент */}
      <div style={__style7}>
        {step !== "result" ? (
          <>
            <QuizStep
              key={step}
              stepNum={step}
              totalSteps={3}
              title={currentStep.title}
              subtitle={currentStep.subtitle}
              options={currentStep.options}
              selected={currentAnswer}
              onSelect={handleSelect}
            />
            {/* Быстрый выход для новичков прямо на шаге «Опыт»:
                если человек никогда не держал рыб, не заставляем его
                идти через весь квиз — сразу предлагаем AI-конфигуратор. */}
            {currentStep.key === "experience" && currentAnswer === "zero" && onOpenConfigurator && (
              <button
                onClick={onOpenConfigurator}
                style={__style8}
              >
                <span style={__style9}>🤖</span>
                <span style={__style10}>
                  <b style={__style11}>Первый аквариум?</b> Можем собрать всё
                  за вас — не нужно отвечать на остальные вопросы
                </span>
                <span style={__style12}>→</span>
              </button>
            )}
          </>
        ) : (
          <QuizResult
            answers={answers}
            onAddToCart={(fish) => setPendingCart(prev => [...prev, fish])}
            onGoToCatalog={handleGoToCatalog}
            onOpenConfigurator={onOpenConfigurator}
            onOpenDoctor={onOpenDoctor}
          />
        )}
      </div>

      {/* Нижняя навигация — только на шагах 1-3 */}
      {step !== "result" && (
        <div style={__style13}>
          {step > 1 && (
            <button
              onClick={handleBack}
              style={__style14}
            >
              ← Назад
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canNext}
            style={{
              flex: 1,
              background: canNext ? "linear-gradient(135deg, #00C9B1, #00A896)" : COLORS.panel,
              color: canNext ? COLORS.bg : COLORS.muted,
              border: "none", borderRadius: 14, padding: "14px",
              fontSize: 15, fontWeight: 800, cursor: canNext ? "pointer" : "default",
              boxShadow: canNext ? "0 6px 24px #00C9B144" : "none",
              transition: "all 0.2s",
            }}
          >
            {step < 3 ? "Далее →" : "Посмотреть подборку 🎯"}
          </button>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   🔐 ГЛОБАЛЬНАЯ СИСТЕМА АККАУНТОВ (логин / пароль)
   Курьеры и продавцы входят через логин + пароль.
   Admin видит все аккаунты, сбрасывает пароли.
   ============================================================ */

// Генератор временного пароля
