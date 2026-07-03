import React, { useMemo, useState } from "react";
import { COLORS } from "../../theme";
import { AppleEmoji } from "../../components/ui/AppleEmoji";
import { Sticker } from "../../components/ui/Sticker";
import { FISH_DB } from "../../data/fish";
import { getStock } from "../../lib/catalog-utils";
import { fmtS } from "../../lib/format";
import { S } from "../../lib/seller-styles";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { padding: "0 0 32px" } as const;
const __style2 = { padding: "14px 16px 0" } as const;
const __style3 = { background: "none", border: "none", color: S.soft, fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 12 } as const;
const __style4 = { background: S.card, border: `1px solid ${S.border}`, borderRadius: 14, padding: "14px", marginBottom: 18, display: "flex", gap: 12, alignItems: "center" } as const;
const __style5 = { fontSize: 13.5, fontWeight: 700 } as const;
const __style6 = { fontSize: 12, color: S.muted } as const;
const __style7 = { fontSize: 12, color: S.soft, marginBottom: 8, fontWeight: 600 } as const;
const __style8 = { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 } as const;
const __style9 = { background: COLORS.panel, border: `1px solid ${S.border}`, borderRadius: 12, padding: "10px 14px", marginBottom: 14, fontSize: 12.5, color: S.muted } as const;
const __style10 = { fontSize: 12, color: S.soft, display: "block", marginBottom: 5 } as const;
const __style11 = { width: "100%", background: COLORS.panel, border: `1px solid ${S.border}`, borderRadius: 12, padding: "12px 14px", color: S.text, fontSize: 16, fontWeight: 700, outline: "none", boxSizing: "border-box", marginBottom: 6 } as const;
const __style12 = { fontSize: 11.5, color: S.muted, marginBottom: 18 } as const;
const __style13 = { fontSize: 14, fontWeight: 700, marginBottom: 4 } as const;
const __style14 = { fontSize: 12.5, color: S.muted, marginBottom: 14 } as const;
const __style15 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } as const;
const __style16 = { background: S.card, border: `1px solid ${S.border}`, borderRadius: 14, padding: "12px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center" } as const;
const __style17 = { fontSize: 12.5, fontWeight: 700 } as const;
const __style18 = { fontSize: 11, color: S.muted } as const;
const __style19 = { background: S.card, border: `1px solid ${S.border}`, borderRadius: 14, overflow: "hidden", cursor: "pointer" } as const;
const __style20 = { aspectRatio: "1/1", background: "radial-gradient(circle at 50% 35%, #00C9B122, #050B12 75%)", display: "flex", alignItems: "center", justifyContent: "center" } as const;
const __style21 = { width: "100%", height: "100%", objectFit: "cover" } as const;
const __style22 = { padding: "8px 10px 10px" } as const;


export function SellerStockFlow({ onBack, onPublish }) {
  const [step, setStep] = useState(1); // 1=вид, 2=карточка, 3=размер+остаток
  const [speciesId, setSpeciesId] = useState(null);
  const [variantId, setVariantId] = useState(null);
  const [sizeId, setSizeId] = useState(null);
  const [qty, setQty] = useState("");

  // Каталог ведёт админ — продавец только читает готовые карточки
  const fishItems = FISH_DB.filter((f) => f.type === "fish");
  const speciesList = useMemo(() => {
    const map = {};
    for (const f of fishItems) {
      if (!map[f.speciesId]) map[f.speciesId] = { speciesId: f.speciesId, name: f.speciesName || f.name, img: f.img, sample: f, count: 0 };
      map[f.speciesId].count++;
    }
    return Object.values(map);
  }, []);

  const variants = useMemo(() => {
    if (!speciesId) return [];
    const map = {};
    for (const f of fishItems.filter((f) => f.speciesId === speciesId)) {
      const vId = f.variantId || "base";
      if (!map[vId]) map[vId] = { variantId: vId, name: f.variantName || f.name, photo: f.photo, img: f.img, sizes: [] };
      map[vId].sizes.push(f);
    }
    return Object.values(map);
  }, [speciesId]);

  const activeVariant = variants.find((v) => v.variantId === variantId);
  const activeSize = activeVariant ? (activeVariant.sizes.find((s) => s.sizeId === sizeId) || activeVariant.sizes[0]) : null;
  const currentStock = activeSize ? getStock(activeSize) : 0;

  if (step === 3 && activeSize) {
    return (
      <div style={__style1}>
        <div style={__style2}>
          <button onClick={() => setStep(2)} style={__style3}>← Назад к карточкам</button>
          <div style={__style4}>
            <Sticker e={activeSize.img} photo={activeSize.photo} size={52} radius={12} bg={`radial-gradient(circle, ${activeSize.color}33, #050B12)`} />
            <div>
              <div style={__style5}>{activeVariant.name}</div>
              <div style={__style6}>{activeSize.speciesName}{activeSize.cm ? ` · ${activeSize.cm} см` : ""}</div>
            </div>
          </div>

          {activeVariant.sizes.length > 1 && (
            <>
              <div style={__style7}>Размер</div>
              <div style={__style8}>
                {activeVariant.sizes.map((s) => (
                  <button key={s.sizeId} onClick={() => setSizeId(s.sizeId)} style={{
                    background: (sizeId || activeVariant.sizes[0].sizeId) === s.sizeId ? S.teal : COLORS.panel,
                    color: (sizeId || activeVariant.sizes[0].sizeId) === s.sizeId ? COLORS.bg : S.soft,
                    border: `1px solid ${S.teal}`, borderRadius: 10, padding: "8px 12px", fontSize: 12.5, fontWeight: 700, cursor: "pointer",
                  }}>
                    {s.cm ? `${s.cm} см` : "стандарт"} · {fmtS(s.price)}
                  </button>
                ))}
              </div>
            </>
          )}

          <div style={__style9}>
            💡 Цену и фото этой карточки задаёт администратор — вы указываете только остаток на складе.
          </div>

          <label style={__style10}>Остаток на складе (шт) *</label>
          <input type="number" min="0" value={qty} onChange={(e) => setQty(e.target.value)} placeholder={String(currentStock)}
            style={__style11} />
          <div style={__style12}>Сейчас в системе: {currentStock} шт</div>

          <button disabled={qty === ""} onClick={() => onPublish(activeSize, parseInt(qty, 10) || 0)} style={{
            width: "100%", background: qty !== "" ? S.teal : COLORS.border, color: qty !== "" ? COLORS.bg : S.muted,
            border: "none", borderRadius: 12, padding: "13px", fontSize: 15, fontWeight: 700, cursor: qty !== "" ? "pointer" : "default",
          }}>
            ✅ Сохранить остаток
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={__style1}>
      <div style={__style2}>
        {step === 1 && (
          <>
            <div style={__style13}>Выберите вид рыбы</div>
            <div style={__style14}>Карточки и цены ведёт администратор — вы укажете только остаток</div>
            <div style={__style15}>
              {speciesList.map((sp) => (
                <div key={sp.speciesId} onClick={() => { setSpeciesId(sp.speciesId); setVariantId(null); setSizeId(null); setStep(2); }}
                  style={__style16}>
                  <Sticker e={sp.img} size={44} radius={12} />
                  <div style={__style17}>{sp.name}</div>
                  <div style={__style18}>{sp.count > 1 ? `${sp.count} карточек` : "1 карточка"}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <button onClick={() => setStep(1)} style={__style3}>← Назад к видам</button>
            <div style={__style13}>Выберите карточку</div>
            <div style={__style14}>Окрас / порода, заведённые администратором</div>
            <div style={__style15}>
              {variants.map((v) => (
                <div key={v.variantId} onClick={() => { setVariantId(v.variantId); setSizeId(v.sizes[0].sizeId); setStep(3); }}
                  style={__style19}>
                  <div style={__style20}>
                    {v.photo ? <img src={v.photo} alt={v.name || "Фото карточки"} style={__style21} /> : <AppleEmoji e={v.img} size={40} />}
                  </div>
                  <div style={__style22}>
                    <div style={__style17}>{v.name}</div>
                    <div style={__style18}>{v.sizes.length > 1 ? `${v.sizes.length} размера` : (v.sizes[0].cm ? `${v.sizes[0].cm} см` : "")}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ---- Главный кабинет продавца ---- */
