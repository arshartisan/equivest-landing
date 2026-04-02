"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Layers,
  Shield,
  Zap,
  Users,
} from "lucide-react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const nodes = [
  {
    icon: Building2,
    title: "Tier-1 Liquidity",
    titleAccent: "Providers",
    description:
      "Top-tier institutional banks and non-bank liquidity sources feeding deep order books.",
  },
  {
    icon: Layers,
    title: "Aggregation",
    titleAccent: "Engine",
    description:
      "Smart order routing across multiple venues to surface the best available pricing.",
  },
  {
    icon: Shield,
    title: "Equivest",
    titleAccent: "Core",
    description:
      "Centralised risk management and pricing normalisation layer for consistent execution.",
  },
  {
    icon: Zap,
    title: "Execution Engine",
    titleAccent: "/ Dealing Desk",
    description:
      "Ultra-low-latency matching with institutional-grade dealing desk oversight.",
  },
  {
    icon: Users,
    title: "Broker /",
    titleAccent: "Institutional Clients",
    description:
      "White-label and direct access for brokers, hedge funds, and institutional portfolios.",
  },
];

function FlowConnector() {
  return (
    <svg
      className="mx-auto mt-8 hidden w-full max-w-6xl md:block"
      viewBox="0 0 1000 80"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {/* Horizontal baseline */}
      <motion.line
        x1="100"
        y1="40"
        x2="900"
        y2="40"
        stroke="rgba(47,128,237,0.25)"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
      />

      {/* Node dots and vertical risers */}
      {[100, 300, 500, 700, 900].map((cx, i) => (
        <g key={i}>
          {/* Vertical riser */}
          <motion.line
            x1={cx}
            y1="10"
            x2={cx}
            y2="40"
            stroke="rgba(47,128,237,0.35)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 * i, ease }}
          />

          {/* Glow circle */}
          <motion.circle
            cx={cx}
            cy="10"
            r="4"
            fill="#2F80ED"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 * i + 0.3, ease }}
          />
          <motion.circle
            cx={cx}
            cy="10"
            r="8"
            fill="none"
            stroke="rgba(47,128,237,0.3)"
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 * i + 0.35, ease }}
          />
        </g>
      ))}

      {/* Directional arrows between nodes */}
      {[200, 400, 600, 800].map((x, i) => (
        <motion.polygon
          key={i}
          points={`${x - 4},36 ${x + 4},40 ${x - 4},44`}
          fill="rgba(47,128,237,0.5)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.15 * i + 0.6, ease }}
        />
      ))}

      {/* Bottom caption line */}
      <motion.line
        x1="350"
        y1="70"
        x2="650"
        y2="70"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1, ease }}
      />
    </svg>
  );
}

function MobileFlowConnector() {
  return (
    <svg
      className="mx-auto block w-px md:hidden"
      viewBox="0 0 2 40"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      style={{ height: "40px" }}
    >
      <line
        x1="1"
        y1="0"
        x2="1"
        y2="40"
        stroke="rgba(47,128,237,0.3)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
    </svg>
  );
}

export default function LiquidityArchitectureSection() {
  return (
    <section className="border-t border-border bg-background px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16 flex flex-col gap-6 md:mb-20 md:flex-row md:items-center md:gap-20">
          {/* <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease }}
            className="shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground md:pt-1"
          >
            Liquidity Architecture
          </motion.span> */}

          <div className="flex flex-col gap-4 text-center mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease }}
              className="text-[clamp(2.5rem,3vw,3.5rem)] font-medium leading-[1.15] tracking-tighter text-foreground"
            >
              Unified Pricing{" "}
              <span className="text-gold">Environment</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="max-w-xl text-base leading-relaxed tracking-tighter text-muted-foreground"
            >
              Equivest aggregates liquidity from multiple institutional providers
              into a unified pricing environment, ensuring optimal execution and
              pricing stability.
            </motion.p>
          </div>
        </div>

        {/* Architecture nodes — desktop: row, mobile: column */}
        <div className="grid grid-cols-1 gap-0 md:grid-cols-5 md:gap-0">
          {nodes.map((node, i) => (
            <div key={i} className="flex flex-col items-start">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.1 * i, ease }}
                className="group flex w-full flex-col items-center px-3 tracking-tighter text-center"
              >
                {/* Icon container */}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-card/60">
                  <node.icon
                    className="h-5 w-5 text-primary"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <h3 className="mb-2 text-sm font-medium leading-snug text-foreground">
                  {node.title}{" "}
                  <span className="text-primary hover:text-gold">{node.titleAccent}</span>
                </h3>

                {/* Description */}
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {node.description}
                </p>
              </motion.div>

              {/* Mobile connector between nodes */}
              {i < nodes.length - 1 && <MobileFlowConnector />}
            </div>
          ))}
        </div>

        {/* Desktop flow connector SVG */}
        <FlowConnector />

        {/* Bottom annotation */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.2, ease }}
          className="mt-6 text-center text-base tracking-tighter text-muted-foreground/50"
        >
          Continuous aggregation and optimisation across all liquidity tiers
        </motion.p>
      </div>
    </section>
  );
}
