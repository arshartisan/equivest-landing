"use client";

import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

// Three execution blocks (checklist B13). The old "internal dealing
// capabilities" claim has been removed.
// NOTE (A4): copy is written neutrally pending the owner's written decision on
// whether Equivest internalises trades or only routes externally. Revisit the
// "External Execution" / "Dealing Desk" wording once that is confirmed.
const BLOCKS = [
  {
    label: "Smart-Order Routing",
    description:
      "Orders are routed intelligently across connected venues to capture the best available price at the moment of execution.",
  },
  {
    label: "External Execution",
    description:
      "Trades are passed to external institutional liquidity providers, sourcing depth from multiple venues rather than a single book.",
  },
  {
    label: "Dealing Desk",
    description:
      "A dedicated dealing desk provides human oversight, real-time monitoring, and risk management across order flow.",
  },
];

export default function ExecutionModelSection() {
  return (
    <section
      id="execution"
      className="border-t border-border bg-background px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 md:flex-row md:gap-20">
          {/* Left label */}
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease }}
            className="shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground md:w-64 md:pt-2"
          >
            Institutional Execution Model
          </motion.span>

          {/* Right: three labelled blocks */}
          <div className="w-full max-w-3xl border-t border-border">
            {BLOCKS.map((block, i) => (
              <motion.div
                key={block.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07, ease }}
                className="group relative grid grid-cols-1 gap-3 border-b border-border py-8 transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] md:grid-cols-[200px_1fr] md:gap-10 md:hover:bg-white/[0.015]"
              >
                {/* Reading-guide accent: grows from the top edge on hover.
                    Origin-top scaleY keeps it anchored to the row's start. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -left-px top-0 hidden h-full w-px origin-top scale-y-0 bg-gold transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] md:block md:group-hover:scale-y-100"
                />

                <h3 className="flex items-baseline gap-2 text-xs font-medium uppercase tracking-[0.16em] text-gold transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] md:group-hover:translate-x-1">
                  <span className="tabular-nums text-gold/40 transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] md:group-hover:text-gold/70">
                    0{i + 1}
                  </span>
                  {block.label}
                </h3>
                <p className="text-base leading-relaxed tracking-tight text-foreground md:text-lg">
                  {block.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
