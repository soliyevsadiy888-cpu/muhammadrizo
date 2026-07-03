import React from "react";
import { COLORS } from "../../theme";

/* ---- hoisted static styles (perf: avoid re-allocating on every render) ---- */
const __style1 = { fontSize: 11, fontWeight: 700, letterSpacing: "0.07em",
    textTransform: "uppercase", color: COLORS.muted, marginBottom: 8 } as const;
const __style2 = { marginBottom: 18 } as const;


export function CkLabel({ children }: { children: React.ReactNode }) {
  return <div style={__style1}>{children}</div>;
}

export function CkField({ label, children }: { label?: React.ReactNode; children: React.ReactNode }) {
  return <div style={__style2}>{label && <CkLabel>{label}</CkLabel>}{children}</div>;
}

/* ── группировка flat-корзины в qty-вид и обратно ───────── */
