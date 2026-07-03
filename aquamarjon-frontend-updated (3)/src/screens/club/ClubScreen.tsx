import React, { useState } from "react";
import { COLORS } from "../../theme";
import { Bubbles } from "../../components/ui/Bubbles";
import { Sticker } from "../../components/ui/Sticker";
import { CLUB_POSTS, CLUB_TABS } from "../../data/club-content";
import { Dp } from "../../lib/doctor-styles";
import { ClubComposeModal } from "./ClubComposeModal";
import { ClubPostCard } from "./ClubPostCard";
import { ReferralCard } from "./ReferralCard";
import { DiaryLeaderboard } from "../diary/DiaryLeaderboard";
import type { ClubPost, ClubPostDraft } from "../../types";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { minHeight: "100vh", background: Dp.bg, color: Dp.text, paddingBottom: 30 } as const;
const __style2 = { background: Dp.card, borderBottom: `1px solid ${Dp.border}`, padding: "16px 16px 14px", position: "relative", overflow: "hidden" } as const;
const __style3 = { position: "relative", zIndex: 1 } as const;
const __style4 = { background: "none", border: "none", color: Dp.soft, fontSize: 13, cursor: "pointer", marginBottom: 8, padding: 0 } as const;
const __style5 = { fontSize: 11, color: Dp.teal, fontWeight: 700, letterSpacing: 1.5, marginBottom: 4, textTransform: "uppercase" } as const;
const __style6 = { fontSize: 21, fontWeight: 900, letterSpacing: -0.5, marginBottom: 10 } as const;
const __style7 = { width: "100%", background: COLORS.panel, border: `1px solid ${Dp.border}`, borderRadius: 12, padding: "10px 14px", color: Dp.text, fontSize: 13.5, outline: "none", boxSizing: "border-box" } as const;
const __style8 = { display: "flex", gap: 8, padding: "14px 16px 0", overflowX: "auto" } as const;
const __style9 = { fontSize: 11, fontWeight: 700 } as const;
const __style10 = { padding: "16px 16px 0" } as const;
const __style11 = { textAlign: "center", color: Dp.muted, fontSize: 13, marginTop: 30 } as const;
const __style12 = { width: "100%", border: `1px dashed ${Dp.border}`, background: "none", color: Dp.muted, borderRadius: 16, padding: 16, fontSize: 14, cursor: "pointer", marginBottom: 10 } as const;


export interface ClubScreenProps {
  onBack: () => void;
  posts?: ClubPost[];
  diaryStats?: unknown;
  onAddPost?: (post: ClubPostDraft) => void;
}

export function ClubScreen({ onBack, posts, diaryStats, onAddPost }: ClubScreenProps) {
  const [tab, setTab] = useState("forum");
  const [search, setSearch] = useState("");
  const [composeOpen, setComposeOpen] = useState(false);

  const allPosts = posts || CLUB_POSTS;
  const filtered = allPosts.filter(p => {
    if (p.tab !== tab) return false;
    if (search.trim() && !(p.title + p.text).toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={__style1}>
      <div style={__style2}>
        <Bubbles count={10} />
        <div style={__style3}>
          <button onClick={onBack} style={__style4}>← Назад в каталог</button>
          <div style={__style5}>AquaMarjon</div>
          <div style={__style6}>👥 Клуб</div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Поиск в сообществе…"
            style={__style7}
          />
        </div>
      </div>

      <div style={__style8}>
        {CLUB_TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              background: tab === t.id ? COLORS.greenBg : Dp.card,
              border: `1px solid ${tab === t.id ? Dp.teal : Dp.border}`,
              borderRadius: 12, padding: "9px 16px", cursor: "pointer",
              color: tab === t.id ? Dp.teal : Dp.soft,
            }}
          >
            <Sticker e={t.icon} size={33} />
            <span style={__style9}>{t.label}</span>
          </button>
        ))}
      </div>

      <div style={__style10}>
        {tab === "forum" && <ReferralCard />}
        {tab === "rating" ? (
          <DiaryLeaderboard diaryStats={diaryStats} />
        ) : filtered.length > 0 ? (
          filtered.map(post => <ClubPostCard key={post.id} post={post} />)
        ) : (
          <div style={__style11}>
            Пока нет постов в этой категории — будьте первым!
          </div>
        )}
        {tab !== "rating" && (
          <button onClick={() => setComposeOpen(true)} style={__style12}>
            + Создать пост
          </button>
        )}
      </div>
      {composeOpen && (
        <ClubComposeModal
          tab={tab}
          onClose={() => setComposeOpen(false)}
          onSubmit={(payload) => { onAddPost && onAddPost(payload); setComposeOpen(false); }}
        />
      )}
    </div>
  );
}

/* ---- Компактная лендинг-шапка для главной страницы ---- */
/* ============================================================
   🏠 ГЛАВНАЯ СТРАНИЦА — поиск + избранное, баннеры, важные категории,
   нижняя навигация: Главная · Каталог · Корзина · Профиль
   ============================================================ */

