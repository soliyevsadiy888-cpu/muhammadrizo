import React from "react";
import { COLORS } from "../../theme";
import type { Fish } from "../../types";
import { AppleEmoji } from "../../components/ui/AppleEmoji";
import { formatSum } from "../../lib/catalog-utils";
import { diaryPluralRu } from "../../lib/diary-stats";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { position: "fixed", inset: 0, background: "rgba(5,10,16,0.7)", zIndex: 150, display: "flex", alignItems: "flex-end" } as const;
const __style2 = { background: COLORS.bg2, width: "100%", maxHeight: "88vh", overflowY: "auto", borderRadius: "20px 20px 0 0", color: COLORS.text, animation: "sheetUp 0.25s ease-out" } as const;
const __style3 = { padding: "16px 18px 4px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" } as const;
const __style4 = { fontSize: 18, fontWeight: 800 } as const;
const __style5 = { fontSize: 12, color: COLORS.muted, fontStyle: "italic" } as const;
const __style6 = { fontSize: 12.5, color: COLORS.soft, marginTop: 4 } as const;
const __style7 = { background: "rgba(255,255,255,0.08)", border: "none", color: COLORS.text, borderRadius: 999, width: 32, height: 32, fontSize: 16, cursor: "pointer", flexShrink: 0 } as const;
const __style8 = { padding: "12px 16px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } as const;
const __style9 = { background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, overflow: "hidden", cursor: "pointer" } as const;
const __style10 = { aspectRatio: "1/1", background: "radial-gradient(circle at 50% 35%, #00C9B122, #050B12 75%)", display: "flex", alignItems: "center", justifyContent: "center" } as const;
const __style11 = { width: "100%", height: "100%", objectFit: "cover" } as const;
const __style12 = { padding: "10px 12px 12px" } as const;
const __style13 = { fontSize: 13.5, fontWeight: 700 } as const;
const __style14 = { fontSize: 11.5, color: COLORS.muted, marginTop: 2 } as const;
const __style15 = { fontSize: 14, fontWeight: 800, color: COLORS.amber, marginTop: 6 } as const;


export interface SpeciesVariantGroup {
  variantId: string | undefined;
  variantName: string | null | undefined;
  photo: string | null | undefined;
  sizes: Fish[];
}

export function SpeciesGallery({ speciesId, allFish, onClose, onOpenVariant }: { speciesId: string; allFish: Fish[]; onClose: () => void; onOpenVariant: (fish: Fish) => void }) {
  const items = allFish.filter((f) => f.speciesId === speciesId);
  if (items.length === 0) return null;
  const speciesName = items[0].speciesName || items[0].name;
  const speciesLatin = items[0].latin;
  const byVariant: Record<string, SpeciesVariantGroup> = {};
  for (const f of items) {
    const vId = f.variantId || "base";
    if (!byVariant[vId]) byVariant[vId] = { variantId: f.variantId, variantName: f.variantName, photo: f.photo, sizes: [] };
    byVariant[vId].sizes.push(f);
  }
  const variants = Object.values(byVariant).map((v) => ({
    ...v,
    minPrice: Math.min(...v.sizes.map((s) => s.price)),
    cheapest: v.sizes.slice().sort((a, b) => a.price - b.price)[0],
  }));
  return (
    <div
      style={__style1}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={__style2}
      >
        <div style={__style3}>
          <div>
            <div style={__style4}>{speciesName}</div>
            {speciesLatin && <div style={__style5}>{speciesLatin}</div>}
            <div style={__style6}>{variants.length} {diaryPluralRu(variants.length, "карточка", "карточки", "карточек")} — выберите подходящую</div>
          </div>
          <button onClick={onClose} style={__style7} aria-label="Закрыть">✕</button>
        </div>
        <div style={__style8}>
          {variants.map((v) => (
            <div
              key={v.variantId}
              onClick={() => onOpenVariant(v.cheapest)}
              role="button"
              tabIndex={0}
              aria-label={`Открыть «${v.variantName || speciesName}»`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onOpenVariant(v.cheapest);
                }
              }}
              style={__style9}
            >
              <div style={__style10}>
                {v.photo ? (
                  <img src={v.photo} alt={v.variantName || speciesName} style={__style11} />
                ) : (
                  <AppleEmoji e={items[0].img} size={48} />
                )}
              </div>
              <div style={__style12}>
                <div style={__style13}>{v.variantName}</div>
                <div style={__style14}>
                  {v.sizes.length > 1 ? `${v.sizes.length} ${diaryPluralRu(v.sizes.length, "размер", "размера", "размеров")}` : (v.cheapest.cm ? `${v.cheapest.cm} см` : "")}
                </div>
                <div style={__style15}>
                  {v.sizes.length > 1 ? `от ${formatSum(v.minPrice)}` : formatSum(v.minPrice)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Cart drawer ---------- */
