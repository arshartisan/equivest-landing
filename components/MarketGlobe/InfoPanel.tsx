"use client";

import { motion } from "framer-motion";
import type { Stock } from "./types";
import { sentimentOf } from "./types";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

type Props = {
  stock: Stock;
  onClose: () => void;
};

function formatPrice(p: number): string {
  return p.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function Sparkline({ sentiment }: { sentiment: "up" | "down" | "flat" }) {
  const color = sentiment === "up" ? "#3ddc84" : sentiment === "down" ? "#ff4d4d" : "#888";
  // Deterministic placeholder polyline - to be replaced with real series later.
  const points =
    sentiment === "up"
      ? "0,28 12,22 24,24 36,18 48,20 60,12 72,14 84,8 96,10 108,4 120,6"
      : sentiment === "down"
        ? "0,6 12,10 24,8 36,16 48,14 60,20 72,18 84,24 96,22 108,28 120,26"
        : "0,16 12,14 24,18 36,14 48,18 60,14 72,18 84,14 96,18 108,14 120,16";
  return (
    <svg viewBox="0 0 120 32" className="h-10 w-full" preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export default function InfoPanel({ stock, onClose }: Props) {
  const s = sentimentOf(stock);
  const color = s === "up" ? "#3ddc84" : s === "down" ? "#ff4d4d" : "#A0AEC0";
  const sign = stock.change > 0 ? "+" : "";

  return (
    <motion.aside
      initial={{ x: 380, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 380, opacity: 0 }}
      transition={{ duration: 0.45, ease }}
      className="pointer-events-auto absolute top-6 right-6 z-20 w-[320px] rounded-2xl border border-white/10 bg-[rgba(11,15,20,0.78)] p-5 text-white shadow-[0_10px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-mono text-xs tracking-[0.18em] text-white/55">{stock.ticker}</div>
          <div className="mt-1 text-base font-semibold leading-tight">{stock.name}</div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-white/70 transition hover:bg-white/[0.08]"
        >
          Close
        </button>
      </div>

      <div className="mt-5 flex items-baseline gap-3">
        <span className="text-3xl font-bold tabular-nums tracking-tight">{formatPrice(stock.price)}</span>
        <span className="text-xs uppercase tracking-[0.2em] text-white/45">GBp</span>
      </div>

      <div className="mt-2 flex items-center gap-2 text-sm tabular-nums" style={{ color }}>
        <span>{sign}{stock.change.toFixed(2)}</span>
        <span className="text-white/30">·</span>
        <span>{sign}{stock.changePct.toFixed(2)}%</span>
      </div>

      <div className="mt-5">
        <Sparkline sentiment={s} />
      </div>
    </motion.aside>
  );
}
