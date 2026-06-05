"use client";

import { motion } from "framer-motion";
import BlurText from "@/components/ui/blur-text";
import CTA from "../CTA";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

// height (% of pillar layer), opacity, accent flag (true = gold, false = blue)
const PILLARS: { h: number; o: number; g: boolean }[] = [
  { h: 38, o: 0.32, g: false },
  { h: 55, o: 0.42, g: false },
  { h: 68, o: 0.50, g: false },
  { h: 52, o: 0.38, g: false },
  { h: 74, o: 0.55, g: true },
  { h: 82, o: 0.60, g: false },
  { h: 64, o: 0.48, g: false },
  { h: 92, o: 0.70, g: true },
  { h: 88, o: 0.65, g: false },
  { h: 100, o: 0.78, g: false },
  { h: 86, o: 0.62, g: false },
  { h: 96, o: 0.72, g: true },
  { h: 78, o: 0.58, g: false },
  { h: 66, o: 0.48, g: false },
  { h: 58, o: 0.42, g: false },
  { h: 50, o: 0.38, g: false },
  { h: 44, o: 0.34, g: false },
  { h: 36, o: 0.28, g: false },
];

export default function HeroSection() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-[#05080C] pt-32 md:pt-36">
      {/* Ambient backdrop wash */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(ellipse_at_bottom,rgba(47,128,237,0.18),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-[radial-gradient(ellipse_at_bottom,rgba(200,169,106,0.10),transparent_75%)]" />
      </div>

      {/* Pillar wall — sharp layer */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex h-[78%] items-end gap-[6px] px-[2px] sm:gap-2 sm:px-2">
        {PILLARS.map((p, i) => (
          <motion.div
            key={`sharp-${i}`}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: p.o }}
            transition={{
              duration: 1.4,
              ease,
              delay: 0.25 + (i % 8) * 0.06 + Math.floor(i / 8) * 0.04,
            }}
            style={{
              height: `${p.h}%`,
              transformOrigin: "bottom",
              background: p.g
                ? "linear-gradient(to top, rgba(200,169,106,0.95) 0%, rgba(200,169,106,0.35) 35%, transparent 100%)"
                : "linear-gradient(to top, rgba(47,128,237,0.95) 0%, rgba(47,128,237,0.35) 35%, transparent 100%)",
            }}
            className="flex-1 rounded-t-[2px]"
          />
        ))}
      </div>

      {/* Pillar wall — soft glow layer (mirrors the sharp layer with blur) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex h-[78%] items-end gap-[6px] px-[2px] blur-[14px] sm:gap-2 sm:px-2">
        {PILLARS.map((p, i) => (
          <motion.div
            key={`glow-${i}`}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: p.o * 0.9 }}
            transition={{
              duration: 1.4,
              ease,
              delay: 0.25 + (i % 8) * 0.06 + Math.floor(i / 8) * 0.04,
            }}
            style={{
              height: `${p.h}%`,
              transformOrigin: "bottom",
              background: p.g
                ? "linear-gradient(to top, rgba(200,169,106,1) 0%, transparent 100%)"
                : "linear-gradient(to top, rgba(47,128,237,1) 0%, transparent 100%)",
            }}
            className="flex-1"
          />
        ))}
      </div>

      {/* Top fade for text legibility */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[55%] bg-gradient-to-b from-[#05080C] via-[#05080C]/85 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-6 pb-[220px] text-center md:pb-[280px]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="mx-auto flex max-w-5xl flex-col items-center"
        >
          {/* Eyebrow pill */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
            }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.3)] backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Mauritius FSC-Regulated
          </motion.div>

          {/* Headline */}
          <div className="flex flex-col items-center">
            <BlurText
              text="INSTITUTIONAL LIQUIDITY"
              renderAs="h1"
              className="text-5xl leading-[0.95] font-bold uppercase tracking-tighter text-white md:text-6xl justify-center"
              animateBy="words"
              delay={80}
              direction="bottom"
              stepDuration={0.4}
            />
            <BlurText
              text="AGGREGATED "
              renderAs="h1"
              className="text-5xl leading-[0.95] font-bold uppercase tracking-tighter text-white md:text-6xl justify-center"
              animateBy="words"
              delay={80}
              direction="bottom"
              stepDuration={0.4}
            />
            <BlurText
              text="DELIVERED"
              renderAs="h1"
              className="text-5xl leading-[0.95] font-bold uppercase tracking-tighter text-white md:text-6xl justify-center"
              animateBy="words"
              delay={80}
              direction="bottom"
              stepDuration={0.4}
            />
          </div>

          {/* Subtitle */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
            }}
            className="mx-auto mt-6 max-w-xl text-base tracking-tighter leading-relaxed text-white/60 md:text-xl"
          >
            Equivest is a Mauritius FSC-regulated Investment Dealer providing Prime-of-Prime liquidity, execution, and multi-asset market access. .
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
            }}
            className="mt-8"
          >
            <CTA text="Contact Us" mobile />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
