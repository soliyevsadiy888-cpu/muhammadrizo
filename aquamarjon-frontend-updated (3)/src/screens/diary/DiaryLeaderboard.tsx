import React from "react";
import { COLORS } from "../../theme";
import { AppleEmoji } from "../../components/ui/AppleEmoji";
import { Sticker } from "../../components/ui/Sticker";
import { diaryBuildLeaderboard, diaryLevelName } from "../../lib/diary-stats";
import { Dp } from "../../lib/doctor-styles";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { padding: "2px 0" } as const;
const __style2 = { fontSize: 12, color: Dp.muted, marginBottom: 12, textAlign: "center" } as const;
const __style3 = { width: 26, display: "flex", alignItems: "center", justifyContent: "center" } as const;
const __style4 = { fontSize: 13, fontWeight: 800, color: Dp.muted } as const;
const __style5 = { flex: 1, minWidth: 0 } as const;
const __style6 = { fontSize: 13, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } as const;
const __style7 = { color: Dp.teal } as const;
const __style8 = { fontSize: 11, color: Dp.muted } as const;
const __style9 = { fontSize: 13, fontWeight: 800, color: Dp.amber, whiteSpace: "nowrap" } as const;


export function DiaryLeaderboard({ diaryStats }) {
  const rows = diaryBuildLeaderboard(diaryStats);
  const medals = ["🥇", "🥈", "🥉"];
  return (
    <div style={__style1}>
      {!diaryStats && (
        <div style={__style2}>
          Откройте 📔 Дневник и ведите записи — ваш результат появится здесь
        </div>
      )}
      {rows.map((u, i) => (
        <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 10, background: u.isMe ? COLORS.greenBg : Dp.card, border: `1px solid ${u.isMe ? Dp.teal : Dp.border}`, borderRadius: 14, padding: "10px 12px", marginBottom: 8 }}>
          <div style={__style3}>
            {i < 3 ? <AppleEmoji e={medals[i]} size={18} /> : <span style={__style4}>{`#${i + 1}`}</span>}
          </div>
          <Sticker e={u.avatar} size={34} radius={999} />
          <div style={__style5}>
            <div style={__style6}>
              {u.name}{u.isMe && <span style={__style7}> (вы)</span>}
            </div>
            <div style={__style8}>{diaryLevelName(u.level)} · уровень {u.level}</div>
          </div>
          <div style={__style9}>{u.xp} XP</div>
        </div>
      ))}
    </div>
  );
}

