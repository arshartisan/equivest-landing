"use client";

import { motion } from "framer-motion";
import BlurText from "@/components/ui/blur-text";
import CTA from "../CTA";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function HeroChartSection() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-white pt-32 md:pt-36">
      {/* Soft brand glow */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute left-1/2 top-[38%] h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(47,128,237,0.07),transparent_65%)]" />
        <div className="absolute left-1/2 top-[58%] h-[520px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(200,169,106,0.06),transparent_70%)]" />
      </div>

      {/* Subtle grid floor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[55%] opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(11,15,20,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,15,20,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Decorative chart line */}
      <motion.div
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center"
      >
        <svg
          viewBox="0 0 1440 360"
          className="h-[280px] w-full max-w-[1600px] md:h-[360px]"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="hero-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2F80ED" stopOpacity="0" />
              <stop offset="20%" stopColor="#2F80ED" stopOpacity="0.55" />
              <stop offset="65%" stopColor="#2F80ED" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#C8A96A" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hero-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2F80ED" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#2F80ED" stopOpacity="0" />
            </linearGradient>
          </defs>

          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease, delay: 1.2 }}
            d="M0,260 L90,250 L180,255 L260,200 L340,220 L420,170 L500,205 L580,150 L660,190 L740,120 L820,165 L900,95 L980,140 L1060,75 L1140,125 L1220,60 L1300,110 L1380,55 L1440,95 L1440,360 L0,360 Z"
            fill="url(#hero-fill)"
          />
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease, delay: 0.5 }}
            d="M0,260 L90,250 L180,255 L260,200 L340,220 L420,170 L500,205 L580,150 L660,190 L740,120 L820,165 L900,95 L980,140 L1060,75 L1140,125 L1220,60 L1300,110 L1380,55 L1440,95"
            fill="none"
            stroke="url(#hero-line)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-6 pb-[260px] text-center md:pb-[320px]">
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
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#0B0F14]/10 bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0B0F14] shadow-[0_1px_2px_rgba(11,15,20,0.04)] backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Mauritius FSC-Regulated
          </motion.div>

          {/* Headline */}
          <div className="flex flex-col items-center">
            <BlurText
              text="INSTITUTIONAL LIQUIDITY"
              renderAs="h1"
              className="text-5xl leading-[0.95] font-bold uppercase tracking-tighter text-[#0B0F14] md:text-6xl justify-center"
              animateBy="words"
              delay={80}
              direction="bottom"
              stepDuration={0.4}
            />
            <BlurText
              text="AGGREGATED "
              renderAs="h1"
              className="text-5xl leading-[0.95] font-bold uppercase tracking-tighter text-[#0B0F14] md:text-6xl justify-center"
              animateBy="words"
              delay={80}
              direction="bottom"
              stepDuration={0.4}
            />
            <BlurText
              text="DELIVERED"
              renderAs="h1"
              className="text-5xl leading-[0.95] font-bold uppercase tracking-tighter text-[#0B0F14] md:text-6xl justify-center"
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
            className="mx-auto mt-6 max-w-xl text-base tracking-tighter leading-relaxed text-[#64748b] md:text-xl"
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
