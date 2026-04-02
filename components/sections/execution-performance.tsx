"use client";

import { motion } from "framer-motion";
import { Zap, Waves, Shield, TrendingDown } from "lucide-react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const metrics = [
  {
    number: "01.",
    icon: Zap,
    title: "Execution Speed",
    description:
      "Low-latency infrastructure purpose-built for institutional-grade order execution across all asset classes.",
    bg: "bg-[#1b4c8e]",
  },
  {
    number: "02.",
    icon: Waves,
    title: "Liquidity Depth",
    description:
      "Multi-provider aggregation sourcing deep liquidity from Tier-1 banks and non-bank market makers.",
    bg: "bg-[#2059a5]",
  },
  {
    number: "03.",
    icon: Shield,
    title: "Uptime",
    description:
      "High-availability infrastructure with redundant failover ensuring continuous market access.",
    bg: "bg-[#2466bd]",
  },
  {
    number: "04.",
    icon: TrendingDown,
    title: "Pricing",
    description:
      "Aggregated spreads and commissions optimised through smart order routing and venue selection.",
    bg: "bg-[#2973d5]",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease,
    },
  }),
};

export default function ExecutionPerformanceSection() {
  return (
    <section className="border-t border-border bg-section px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16 flex flex-col gap-4 text-center mx-auto md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease }}
            className="text-[clamp(3.5rem,3vw,3.5rem)] font-medium leading-[1.15] tracking-tighter text-foreground"
          >
            Execution{" "}
            <span className="text-gold">Performance</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="mx-auto max-w-xl text-lg leading-relaxed tracking-tighter text-muted-foreground"
          >
            Infrastructure engineered for speed, reliability, and
            cost-efficiency - every metric optimised for institutional demands.
          </motion.p>
        </div>

        {/* Metric cards grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className={`group relative flex aspect-3/4 cursor-pointer flex-col overflow-hidden rounded-3xl ${metric.bg} p-6`}
            >
              {/* Icon — top left */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/15">
                <metric.icon
                  className="h-6 w-6 text-gold"
                  strokeWidth={1.5}
                />
              </div>

              {/* Bottom content — slides up on hover to reveal description */}
              <div className="mt-auto flex flex-col">
                {/* Title block — slides up on hover */}
                <div className="transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:-translate-y-2">
                  <span className="mb-1.5 block text-xs font-medium text-gold">
                    {metric.number}
                  </span>
                  <h3 className="text-3xl font-semibold leading-tight text-white tracking-tighter">
                    {metric.title}
                  </h3>
                </div>

                {/* Description + divider — hidden by default, revealed on hover */}
                <div className="grid grid-rows-[0fr] transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <div className="pt-">
                      <div className="mb-3 h-px w-full bg-black/15" />
                      <p className="text-base leading-relaxed text-gray-300 tracking-tighter">
                        {metric.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
