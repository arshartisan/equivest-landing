"use client";

import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

// Four-layer routing path (checklist B8). "Broker / Institutional Clients" is
// intentionally NOT a layer - it is the arrow leaving Layer 4 (Execution Engine).
const LAYERS = [
  {
    title: ["External Liquidity", "Providers"],
    caption: ["Tier 1 banks and non-bank", "sources external venues"],
    external: true,
  },
  {
    title: ["Aggregation", "Engine"],
    caption: ["Smart order routing across", "multiple liquidity venues"],
  },
  {
    title: ["Equivest", "Core"],
    caption: ["Risk management and", "price normalisation"],
  },
  {
    title: ["Execution", "Engine"],
    caption: ["Low latency matching with", "dealing desk oversight"],
  },
];

const BOX_W = 165;
const BOX_H = 90;
const BOX_Y = 50;
const CENTER_Y = BOX_Y + BOX_H / 2; // 95
const X = [20, 225, 430, 635]; // left x of each box
const centerX = (i: number) => X[i] + BOX_W / 2;
const boxRight = (i: number) => X[i] + BOX_W;

export default function LiquidityArchitectureSection() {
  return (
    <section
      id="liquidity"
      className="border-t border-border bg-background px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16 flex flex-col gap-4 text-left md:mb-20 md:mx-auto md:text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease }}
            className="text-3xl font-medium leading-[1.15] tracking-tighter text-foreground md:text-[clamp(2.5rem,3vw,3.5rem)]"
          >
            Unified Pricing <span className="text-gold">Environment</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="max-w-xl text-sm leading-relaxed tracking-tighter text-muted-foreground md:mx-auto md:text-base"
          >
            Equivest aggregates liquidity from multiple institutional providers
            into a unified pricing environment, ensuring optimal execution and
            pricing stability
          </motion.p>
        </div>

        {/* Mobile: vertical stacked flow (avoids horizontal scroll) */}
        <div className="flex flex-col items-stretch gap-0 md:hidden">
          {LAYERS.map((layer, i) => (
            <div key={layer.title.join(" ")} className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                className="flex flex-col gap-1 rounded-xl border bg-[#111827] px-5 py-4"
                style={{
                  borderColor:
                    i === 2 ? "rgba(47,128,237,0.55)" : "rgba(255,255,255,0.10)",
                }}
              >
                {layer.external && (
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-gold">
                    EXTERNAL
                  </span>
                )}
                <span className="text-base font-medium text-white">
                  {layer.title.join(" ")}
                </span>
                <span className="text-sm leading-snug text-[#A0AEC0]">
                  {layer.caption.join(" ")}
                </span>
              </motion.div>

              {/* Downward connector arrow */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.08, ease }}
                className="flex justify-center py-2"
                aria-hidden
              >
                <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
                  <line
                    x1="7"
                    y1="0"
                    x2="7"
                    y2="15"
                    stroke="#2F80ED"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <polygon points="2,13 12,13 7,21" fill="#2F80ED" />
                </svg>
              </motion.div>
            </div>
          ))}

          {/* Final destination node */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.4, ease }}
            className="rounded-xl border border-[rgba(47,128,237,0.55)] bg-[#0d1320] px-5 py-4 text-base font-medium text-white"
          >
            Broker / Institutional Clients
          </motion.div>
        </div>

        {/* Desktop: SVG architecture diagram */}
        <div className="hidden overflow-x-auto px-6 pb-2 md:-mx-6 md:block">
          <svg
            viewBox="0 0 1000 210"
            className="mx-auto aspect-[1000/210] w-full min-w-[680px] max-w-5xl"
            fill="none"
            role="img"
            aria-label="Equivest routing architecture: external liquidity providers route through the aggregation engine, Equivest core, and execution engine, which delivers to broker and institutional clients."
          >
            {/* Blue accent routing line - Layer 1 → Layer 4 */}
            <motion.line
              x1={centerX(0)}
              y1={CENTER_Y}
              x2={centerX(3)}
              y2={CENTER_Y}
              stroke="#2F80ED"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease }}
            />

            {/* Directional arrowheads between consecutive layers */}
            {[0, 1, 2].map((i) => {
              const ax = (boxRight(i) + X[i + 1]) / 2;
              return (
                <motion.polygon
                  key={`arrow-${i}`}
                  points={`${ax - 5},${CENTER_Y - 5} ${ax + 5},${CENTER_Y} ${ax - 5},${CENTER_Y + 5}`}
                  fill="#2F80ED"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.2, ease }}
                />
              );
            })}

            {/* Layer boxes + captions */}
            {LAYERS.map((layer, i) => (
              <motion.g
                key={layer.title.join(" ")}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.12, ease }}
              >
                {/* EXTERNAL tag above Layer 1 */}
                {layer.external && (
                  <text
                    x={centerX(i)}
                    y={BOX_Y - 14}
                    textAnchor="middle"
                    className="fill-gold"
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.18em",
                    }}
                  >
                    EXTERNAL
                  </text>
                )}

                {/* Box */}
                <rect
                  x={X[i]}
                  y={BOX_Y}
                  width={BOX_W}
                  height={BOX_H}
                  rx="10"
                  fill="#111827"
                  stroke={
                    i === 2 ? "rgba(47,128,237,0.55)" : "rgba(255,255,255,0.10)"
                  }
                  strokeWidth="1"
                />

                {/* Box title (2 lines) */}
                <text
                  x={centerX(i)}
                  y={CENTER_Y - 6}
                  textAnchor="middle"
                  className="fill-white"
                  style={{ fontSize: 14, fontWeight: 500 }}
                >
                  {layer.title[0]}
                </text>
                <text
                  x={centerX(i)}
                  y={CENTER_Y + 12}
                  textAnchor="middle"
                  className="fill-white"
                  style={{ fontSize: 14, fontWeight: 500 }}
                >
                  {layer.title[1]}
                </text>

                {/* Caption (2 lines) below the box */}
                <text
                  x={centerX(i)}
                  y={BOX_Y + BOX_H + 22}
                  textAnchor="middle"
                  className="fill-[#A0AEC0]"
                  style={{ fontSize: 12 }}
                >
                  {layer.caption[0]}
                </text>
                <text
                  x={centerX(i)}
                  y={BOX_Y + BOX_H + 37}
                  textAnchor="middle"
                  className="fill-[#A0AEC0]"
                  style={{ fontSize: 12 }}
                >
                  {layer.caption[1]}
                </text>
              </motion.g>
            ))}

            {/* Arrow OUT of Layer 4 → Broker / Institutional Clients */}
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1, ease }}
            >
              <line
                x1={boxRight(3)}
                y1={CENTER_Y}
                x2="868"
                y2={CENTER_Y}
                stroke="#2F80ED"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <polygon
                points={`863,${CENTER_Y - 6} 875,${CENTER_Y} 863,${CENTER_Y + 6}`}
                fill="#2F80ED"
              />
              <text
                x="884"
                y={CENTER_Y - 4}
                className="fill-white"
                style={{ fontSize: 12, fontWeight: 500 }}
              >
                Broker /
              </text>
              <text
                x="884"
                y={CENTER_Y + 13}
                className="fill-white"
                style={{ fontSize: 12, fontWeight: 500 }}
              >
                Institutional Clients
              </text>
            </motion.g>
          </svg>
        </div>

        {/* Bottom annotation */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.2, ease }}
          className="mt-8 text-left text-sm tracking-tighter text-muted-foreground/50 md:text-center md:text-base"
        >
          Continuous aggregation and optimisation across all liquidity tiers
        </motion.p>
      </div>
    </section>
  );
}
