import React, { useEffect, useRef, useState } from "react";
import { fetchStories, saveStoriesRemote } from "../../../lib/api";
import { A } from "../../../lib/admin-styles";
import { AdminToggle } from "../../../components/ui/AdminControls";
import { COLORS } from "../../../theme";
import type { Story } from "../../../types";
import { STORIES_KEY, SEED_STORIES, uid } from "../../../data/stories";
import { useLocalStorageState } from "../../../hooks/useLocalStorageState";
import { __style11 } from "../admin-panel-shared-styles";

/* ---- локальные стили вкладки ---- */
const __sTitle = { fontWeight: 700, fontSize: 14, marginBottom: 4, color: A.text } as const;
const __sSub = { fontSize: 12, color: A.muted, marginBottom: 14 } as const;
const __sFormCard = { background: A.card, border: `1px solid ${A.border}`, borderRadius: 14, padding: 14, marginBottom: 14 } as const;
const __sFormLabel = { fontSize: 12, fontWeight: 700, color: A.soft, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 } as const;
const __sUpload = { width: 64, height: 64, borderRadius: 12, flexShrink: 0, cursor: "pointer", background: COLORS.panel, border: `1px dashed ${A.border}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", fontSize: 22, color: A.muted } as const;
const __sInput = { background: COLORS.panel, border: `1px solid ${A.border}`, borderRadius: 10, padding: "9px 12px", color: A.text, fontSize: 13, outline: "none" } as const;

export function AdminStoriesTab() {
  const [stories, setStories] = useLocalStorageState<Story[]>(STORIES_KEY, SEED_STORIES);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"" | "saving" | "saved" | "error">("");

  // Загружаем актуальный список с сервера (а не только локальный кэш).
  useEffect(() => {
    fetchStories().then((remote) => { if (remote.length > 0) setStories(remote); }).catch(() => { /* офлайн — локальный кэш */ });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Меняем список и сразу отправляем его на сервер, чтобы его увидели клиенты.
  function update(fn: (prev: Story[]) => Story[]) {
    const next = fn(stories).map((s, i) => ({ ...s, order: i }));
    setStories(next);
    setStatus("saving");
    saveStoriesRemote(next).then(() => setStatus("saved")).catch(() => setStatus("error"));
  }

  function resetForm() { setEditingId(null); setTitle(""); setCover(""); }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    // Сжимаем до 720px JPEG — иначе фото с телефона (несколько МБ) не пройдёт на сервер.
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const k = Math.min(1, 720 / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
        setCover(c.toDataURL("image/jpeg", 0.82));
      };
      img.src = String(ev.target?.result || "");
    };
    reader.readAsDataURL(file);
  }

  function handleSave() {
    if (!title.trim() || !cover) return;
    if (editingId) {
      update((prev) => prev.map((s) => (s.id === editingId ? { ...s, title, cover } : s)));
    } else {
      update((prev) => [...prev, { id: uid(), title, cover, active: true, order: prev.length }]);
    }
    resetForm();
  }

  function startEdit(s: Story) { setEditingId(s.id); setTitle(s.title); setCover(s.cover); }
  function remove(id: string) { update((prev) => prev.filter((s) => s.id !== id)); if (editingId === id) resetForm(); }
  function toggleActive(id: string) { update((prev) => prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))); }
  function move(id: string, dir: -1 | 1) {
    update((prev) => {
      const i = prev.findIndex((s) => s.id === id);
      const j = i + dir;
      if (j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  return (
    <div style={__style11}>
      <div style={__sTitle}>Сторис на главной ({stories.length})</div>
      <div style={__sSub}>
        Кружочки над поиском на главной. Порядок здесь = порядок слева направо там.
        {status === "saving" && " · сохраняю…"}
        {status === "saved" && " · ✅ сохранено, клиенты видят"}
        {status === "error" && " · ⚠️ не удалось сохранить на сервер"}
      </div>

      <div style={__sFormCard}>
        <div style={__sFormLabel}>
          {editingId ? "Редактировать сторис" : "Новая сторис"}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => fileRef.current?.click()} style={__sUpload}>
            {cover ? <img src={cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "＋"}
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Название, напр. «Скидки недели»"
              style={__sInput}
            />
            <input
              value={cover.startsWith("data:") ? "" : cover}
              onChange={(e) => setCover(e.target.value)}
              placeholder="или вставьте ссылку на картинку"
              style={__sInput}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <button
            onClick={handleSave}
            disabled={!title.trim() || !cover}
            style={{
              flex: 1, background: (!title.trim() || !cover) ? A.border : A.teal,
              color: (!title.trim() || !cover) ? A.muted : COLORS.bg, border: "none", borderRadius: 10,
              padding: "10px 0", fontSize: 13, fontWeight: 700, cursor: (!title.trim() || !cover) ? "default" : "pointer",
            }}
          >
            {editingId ? "✅ Сохранить" : "＋ Добавить"}
          </button>
          {editingId && (
            <button
              onClick={resetForm}
              style={{ flex: 1, background: COLORS.panel, color: A.soft, border: `1px solid ${A.border}`, borderRadius: 12, padding: 10, fontSize: 13, cursor: "pointer" }}
            >Отмена</button>
          )}
        </div>
      </div>

      {stories.map((s, i) => (
        <div
          key={s.id}
          style={{ display: "flex", alignItems: "center", gap: 10, padding: 10, background: A.card, border: `1px solid ${A.border}`, borderRadius: 12, marginBottom: 8, opacity: s.active ? 1 : 0.5 }}
        >
          <div style={{ width: 48, height: 48, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: `2px solid ${s.active ? A.teal : A.border}` }}>
            <img src={s.cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.title}</div>
            <div style={{ fontSize: 11, color: A.muted }}>{s.active ? "Показывается на главной" : "Скрыта"}</div>
          </div>
          <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
            <IconBtn onClick={() => move(s.id, -1)} disabled={i === 0}>↑</IconBtn>
            <IconBtn onClick={() => move(s.id, 1)} disabled={i === stories.length - 1}>↓</IconBtn>
            <AdminToggle value={s.active} onChange={() => toggleActive(s.id)} />
            <IconBtn onClick={() => startEdit(s)}>✏️</IconBtn>
            <IconBtn onClick={() => remove(s.id)} danger>🗑</IconBtn>
          </div>
        </div>
      ))}
      {stories.length === 0 && (
        <div style={{ textAlign: "center", color: A.muted, fontSize: 13, padding: 24 }}>Список пуст — добавьте первую сторис выше</div>
      )}
    </div>
  );
}

function IconBtn({ children, onClick, disabled, danger }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ width: 28, height: 28, borderRadius: 8, border: "none", cursor: disabled ? "default" : "pointer", background: "transparent", color: disabled ? "#3A4750" : danger ? A.red : A.soft, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {children}
    </button>
  );
}
