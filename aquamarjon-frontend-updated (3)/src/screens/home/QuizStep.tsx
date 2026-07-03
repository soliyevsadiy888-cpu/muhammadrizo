import React from "react";
import { COLORS } from "../../theme";
import { AppleEmoji } from "../../components/ui/AppleEmoji";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { animation: "qFadeIn 0.3s ease-out" } as const;
const __style2 = { marginBottom: 24 } as const;
const __style3 = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 } as const;
const __style4 = { fontSize: 11, color: COLORS.muted, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" } as const;
const __style5 = { fontSize: 11, color: COLORS.teal, fontWeight: 700 } as const;
const __style6 = { height: 3, background: COLORS.border, borderRadius: 2, overflow: "hidden" } as const;
const __style7 = { fontSize: 22, fontWeight: 900, margin: "0 0 6px", letterSpacing: "-0.02em", fontFamily: "Georgia, serif", lineHeight: 1.25 } as const;
const __style8 = { fontSize: 13, color: COLORS.muted, margin: "0 0 24px", lineHeight: 1.5 } as const;
const __style9 = { display: "flex", flexDirection: "column", gap: 10 } as const;
const __style10 = { flex: 1 } as const;
const __style11 = { fontSize: 12, color: COLORS.muted, lineHeight: 1.4 } as const;


export interface QuizOption {
  id: string;
  label: string;
  sub?: string;
  icon?: string;
  min?: number;
  max?: number;
  difficulty?: string[];
  [key: string]: any;
}

export interface QuizStepProps {
  stepNum: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  options: QuizOption[];
  selected: string | string[] | null;
  onSelect: (id: string) => void;
}

export function QuizStep({ stepNum, totalSteps, title, subtitle, options, selected, onSelect }: QuizStepProps) {
  return (
    <div style={__style1}>
      <style>{`
        @keyframes qFadeIn { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes qPop { 0%{transform:scale(1)} 40%{transform:scale(0.96)} 100%{transform:scale(1)} }
      `}</style>

      {/* Прогресс */}
      <div style={__style2}>
        <div style={__style3}>
          <span style={__style4}>
            Шаг {stepNum} из {totalSteps}
          </span>
          <span style={__style5}>
            {Math.round((stepNum / totalSteps) * 100)}%
          </span>
        </div>
        <div style={__style6}>
          <div style={{
            height: "100%", borderRadius: 2,
            width: `${(stepNum / totalSteps) * 100}%`,
            background: "linear-gradient(90deg, #00C9B1, #4DE8D5)",
            transition: "width 0.5s ease"
          }} />
        </div>
      </div>

      <h2 style={__style7}>
        {title}
      </h2>
      <p style={__style8}>{subtitle}</p>

      <div style={__style9}>
        {options.map(opt => {
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              style={{
                display: "flex", alignItems: "center", gap: 14, textAlign: "left",
                background: isSelected ? COLORS.greenBg : COLORS.panel,
                border: `2px solid ${isSelected ? COLORS.teal : COLORS.border}`,
                borderRadius: 16, padding: "14px 16px", cursor: "pointer",
                transition: "all 0.15s",
                animation: isSelected ? "qPop 0.2s ease" : "none",
                boxShadow: isSelected ? "0 0 0 3px #00C9B122" : "none",
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                background: isSelected ? "#00C9B122" : COLORS.bg2,
                border: `1px solid ${isSelected ? "#00C9B144" : COLORS.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.15s",
              }}>
                <AppleEmoji e={opt.icon} size={26} />
              </div>
              <div style={__style10}>
                <div style={{ fontSize: 15, fontWeight: 700, color: isSelected ? COLORS.teal : COLORS.text, marginBottom: 2 }}>
                  {opt.label}
                </div>
                <div style={__style11}>{opt.sub}</div>
              </div>
              <div style={{
                width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                border: `2px solid ${isSelected ? COLORS.teal : COLORS.border}`,
                background: isSelected ? COLORS.teal : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, color: COLORS.bg, transition: "all 0.15s",
              }}>
                {isSelected ? "✓" : ""}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* Экран результата квиза */
