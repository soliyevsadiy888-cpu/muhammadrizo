import React, { useState } from "react";
import { COLORS } from "../../theme";
import { AppleEmoji } from "../../components/ui/AppleEmoji";
import { CLUB_TABS, POST_PHOTO_EMOJIS } from "../../data/club-content";
import { Dp } from "../../lib/doctor-styles";
import type { ClubPostDraft } from "../../types";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { position: "fixed", inset: 0, background: "rgba(5,10,16,0.75)", zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center" } as const;
const __style2 = { background: COLORS.bg2, borderRadius: "20px 20px 0 0", padding: "20px 16px 28px", width: "100%", maxWidth: 420, color: Dp.text } as const;
const __style3 = { fontSize: 16, fontWeight: 800, marginBottom: 14 } as const;
const __style4 = { width: "100%", background: COLORS.panel, border: `1px solid ${Dp.border}`, borderRadius: 10, padding: "11px 12px", color: Dp.text, fontSize: 14, outline: "none", boxSizing: "border-box", marginBottom: 10 } as const;
const __style5 = { width: "100%", background: COLORS.panel, border: `1px solid ${Dp.border}`, borderRadius: 10, padding: "11px 12px", color: Dp.text, fontSize: 13.5, outline: "none", boxSizing: "border-box", marginBottom: 12, resize: "none", fontFamily: "inherit" } as const;
const __style6 = { fontSize: 12, color: Dp.soft, marginBottom: 8 } as const;
const __style7 = { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 } as const;
const __style8 = { display: "flex", gap: 8 } as const;
const __style9 = { flex: 1, background: COLORS.panel, border: `1px solid ${Dp.border}`, color: Dp.soft, borderRadius: 12, padding: 12, fontSize: 14, cursor: "pointer" } as const;


export function ClubComposeModal({ tab, onClose, onSubmit }: { tab: string; onClose: () => void; onSubmit: (post: ClubPostDraft) => void }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [photoEmoji, setPhotoEmoji] = useState<string | null>(null);
  const tagInfo = CLUB_TABS.find((t: any) => t.id === tab);

  function submit() {
    if (!title.trim()) return;
    onSubmit({
      title: title.trim(),
      text: text.trim(),
      tag: { label: tagInfo?.label || "Пост", color: Dp.teal },
      tab,
      photo: photoEmoji ? { emoji: photoEmoji, color: Dp.teal } : undefined,
    });
  }

  return (
    <div style={__style1} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={__style2}>
        <div style={__style3}>Новый пост · {tagInfo?.label}</div>
        <input
          autoFocus value={title} onChange={e => setTitle(e.target.value)} placeholder="Заголовок"
          style={__style4}
        />
        <textarea
          value={text} onChange={e => setText(e.target.value)} placeholder="Расскажите подробнее..." rows={3}
          style={__style5}
        />
        <div style={__style6}>📷 Фото аквариума/рыбы (визуал — важно!)</div>
        <div style={__style7}>
          {POST_PHOTO_EMOJIS.map(e => (
            <button key={e} onClick={() => setPhotoEmoji(photoEmoji === e ? null : e)} style={{ width: 40, height: 40, borderRadius: 10, background: photoEmoji === e ? Dp.teal + "33" : COLORS.panel, border: `1px solid ${photoEmoji === e ? Dp.teal : Dp.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }}><AppleEmoji e={e} size={20} /></button>
          ))}
        </div>
        <div style={__style8}>
          <button onClick={onClose} style={__style9}>Отмена</button>
          <button onClick={submit} disabled={!title.trim()} style={{ flex: 2, background: title.trim() ? Dp.teal : Dp.border, border: "none", color: title.trim() ? COLORS.bg : Dp.muted, borderRadius: 12, padding: 12, fontSize: 14, fontWeight: 700, cursor: title.trim() ? "pointer" : "default" }}>Опубликовать</button>
        </div>
      </div>
    </div>
  );
}

