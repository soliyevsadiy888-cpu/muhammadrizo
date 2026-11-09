import React, { useEffect, useRef, useState } from "react";
import { COLORS } from "../../theme";
import type { Story } from "../../types";
import { STORIES_KEY, STORIES_VIEWED_KEY, SEED_STORIES } from "../../data/stories";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { fetchStories } from "../../lib/api";

const STORY_DURATION_MS = 4500;

/** Ряд кружочков сторис между шапкой и поиском на главной.
 * Список сторис редактируется в админке (AdminStoriesTab) и хранится
 * в localStorage — этот компонент читает тот же ключ, поэтому изменения
 * видны при следующем открытии главной. */
export function HomeStories() {
  const [stories, setStories] = useLocalStorageState<Story[]>(STORIES_KEY, SEED_STORIES);
  const [viewedIds, setViewedIds] = useLocalStorageState<string[]>(STORIES_VIEWED_KEY, []);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Источник истины — бэкенд (видят все клиенты). localStorage остаётся
  // кэшем на случай, если сервер недоступен.
  useEffect(() => {
    let cancelled = false;
    fetchStories()
      .then((remote) => { if (!cancelled && remote.length > 0) setStories(remote); })
      .catch(() => { /* офлайн — показываем кэш */ });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const active = stories.filter((s) => s.active);
  if (active.length === 0) return null;

  function markViewed(id: string) {
    setViewedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  return (
    <div style={{ padding: "4px 0 14px" }}>
      <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 2, scrollbarWidth: "none" }}>
        {active.map((s, i) => {
          const viewed = viewedIds.includes(s.id);
          return (
            <button
              key={s.id}
              onClick={() => { setOpenIndex(i); markViewed(s.id); }}
              aria-label={`Открыть сторис «${s.title}»`}
              style={{
                background: "none", border: "none", padding: 0, cursor: "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                flexShrink: 0, width: 88,
              }}
            >
              <div
                style={{
                  width: 84, height: 84, borderRadius: "50%", padding: 3,
                  background: viewed ? COLORS.border : `conic-gradient(from 45deg, ${COLORS.teal}, ${COLORS.amber}, ${COLORS.teal})`,
                }}
              >
                <div style={{ width: "100%", height: "100%", borderRadius: "50%", padding: 2, background: COLORS.bg }}>
                  <img src={s.cover} alt="" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", display: "block" }} />
                </div>
              </div>
              <span
                style={{
                  color: COLORS.soft, fontSize: 13, fontWeight: 600, maxWidth: 88,
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}
              >
                {s.title}
              </span>
            </button>
          );
        })}
      </div>

      {openIndex !== null && (
        <StoryViewer
          stories={active}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onIndexChange={(i) => { setOpenIndex(i); markViewed(active[i].id); }}
        />
      )}
    </div>
  );
}

function StoryViewer({
  stories, index, onClose, onIndexChange,
}: { stories: Story[]; index: number; onClose: () => void; onIndexChange: (i: number) => void }) {
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    timerRef.current = setInterval(() => {
      const pct = Math.min(100, ((Date.now() - start) / STORY_DURATION_MS) * 100);
      setProgress(pct);
      if (pct >= 100) {
        if (timerRef.current) clearInterval(timerRef.current);
        if (index < stories.length - 1) onIndexChange(index + 1);
        else onClose();
      }
    }, 40);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const story = stories[index];
  if (!story) return null;

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "#000", zIndex: 200,
        display: "flex", flexDirection: "column",
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Сторис «${story.title}»`}
    >
      <div style={{ display: "flex", gap: 4, padding: "14px 10px 0" }}>
        {stories.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.25)", overflow: "hidden" }}>
            <div
              style={{
                height: "100%", background: COLORS.text,
                width: i < index ? "100%" : i === index ? `${progress}%` : "0%",
                transition: i === index ? "none" : "width 0.2s",
              }}
            />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", color: COLORS.text }}>
        <div style={{ width: 26, height: 26, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
          <img src={story.cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <span style={{ fontSize: 14, fontWeight: 700, flex: 1 }}>{story.title}</span>
        <button
          onClick={onClose}
          aria-label="Закрыть сторис"
          style={{ background: "none", border: "none", color: COLORS.text, cursor: "pointer", padding: 6, fontSize: 20 }}
        >✕</button>
      </div>
      <div style={{ position: "relative", flex: 1 }}>
        <img src={story.cover} alt={story.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div
          onClick={() => index > 0 && onIndexChange(index - 1)}
          style={{ position: "absolute", left: 0, top: 0, width: "35%", height: "100%", cursor: "pointer" }}
        />
        <div
          onClick={() => (index < stories.length - 1 ? onIndexChange(index + 1) : onClose())}
          style={{ position: "absolute", right: 0, top: 0, width: "65%", height: "100%", cursor: "pointer" }}
        />
      </div>
    </div>
  );
}
