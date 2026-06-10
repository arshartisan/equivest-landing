"use client";

import { motion } from "framer-motion";

export default function Legend() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="pointer-events-none absolute bottom-6 left-6 z-20 flex items-center gap-4 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/80 backdrop-blur"
    >
      <span className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[#3ddc84] shadow-[0_0_8px_rgba(61,220,132,0.7)]" />
        Gainers
      </span>
      <span className="h-3 w-px bg-white/15" />
      <span className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[#ff4d4d] shadow-[0_0_8px_rgba(255,77,77,0.7)]" />
        Losers
      </span>
    </motion.div>
  );
}
