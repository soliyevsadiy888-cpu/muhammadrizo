import React from "react";
import { COLORS } from "../../theme";
import { AppleEmoji } from "../../components/ui/AppleEmoji";
import { DPill } from "../../components/ui/DPill";
import { Dp } from "../../lib/doctor-styles";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { background: Dp.card, border: `1px solid ${Dp.border}`, borderRadius: 16, padding: 16, marginBottom: 12 } as const;
const __style2 = { display: "flex", alignItems: "center", gap: 8, marginBottom: 10 } as const;
const __style3 = { width: 32, height: 32, borderRadius: 999, background: COLORS.panel, border: `1px solid ${Dp.border}`, display: "flex", alignItems: "center", justifyContent: "center" } as const;
const __style4 = { flex: 1 } as const;
const __style5 = { fontSize: 13, fontWeight: 700 } as const;
const __style6 = { fontSize: 11, color: Dp.muted } as const;
const __style7 = { fontSize: 14.5, fontWeight: 800, marginBottom: 6, lineHeight: 1.35 } as const;
const __style8 = { display: "flex", alignItems: "center", gap: 16, fontSize: 12, color: Dp.muted } as const;
const __style9 = { marginLeft: "auto", background: "#2A1E00", border: `1px solid ${COLORS.amber}`, color: COLORS.amber, borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" } as const;


export interface ClubPost {
  id: string;
  avatar?: string;
  author: string;
  time: string;
  tag: { label: string; color: string };
  title: string;
  text: string;
  photo?: { color: string; emoji: string } | null;
  likes: number;
  comments: number;
  views?: number | null;
  cta?: string | null;
}

export const ClubPostCard = React.memo(function ClubPostCard({ post }: { post: ClubPost }) {
  return (
    <div style={__style1}>
      <div style={__style2}>
        <div style={__style3}>
          <AppleEmoji e={post.avatar} size={18} />
        </div>
        <div style={__style4}>
          <div style={__style5}>{post.author}</div>
          <div style={__style6}>{post.time}</div>
        </div>
        <DPill text={post.tag.label} color={post.tag.color} />
      </div>
      <div style={__style7}>{post.title}</div>
      <div style={{ fontSize: 13, color: Dp.soft, lineHeight: 1.55, marginBottom: post.photo ? 10 : 12 }}>{post.text}</div>
      {post.photo && (
        <div style={{
          width: "100%", aspectRatio: "16/9", borderRadius: 12, marginBottom: 12,
          background: `linear-gradient(135deg, ${post.photo.color}33, #08131F)`,
          border: `1px solid ${post.photo.color}44`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <AppleEmoji e={post.photo.emoji} size={56} />
        </div>
      )}
      <div style={__style8}>
        <span>❤️ {post.likes}</span>
        <span>💬 {post.comments} ответов</span>
        {post.views != null && <span>👁 {post.views}</span>}
        {post.cta && (
          <button style={__style9}>
            {post.cta}
          </button>
        )}
      </div>
    </div>
  );
});

