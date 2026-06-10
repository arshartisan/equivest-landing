"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import BlurText from "@/components/ui/blur-text";
// import MarketGlobeClient from "@/components/MarketGlobe/MarketGlobeClient";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

// Vertical light beams rising from the bottom, tinted with the Equivest
// blue/gold accents (replaces the reference design's green).
const BEAMS = [
  { left: "6%", w: 70, h: "52%", from: "from-primary/25" },
  { left: "19%", w: 95, h: "72%", from: "from-primary/20" },
  { left: "33%", w: 60, h: "44%", from: "from-gold/15" },
  { left: "49%", w: 120, h: "82%", from: "from-primary/30" },
  { left: "64%", w: 64, h: "50%", from: "from-gold/15" },
  { left: "79%", w: 95, h: "70%", from: "from-primary/20" },
  { left: "92%", w: 70, h: "54%", from: "from-primary/25" },
];

const STATS = [
  { value: "6", label: "Asset classes" },
  { value: "5", label: "Trading platforms" },
];

export default function HeroSection() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-[#05080C]">
      {/* ── Background: radial wash + vertical light beams ─────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-[80%] bg-[radial-gradient(ellipse_at_bottom,rgba(47,128,237,0.20),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-[radial-gradient(ellipse_at_bottom,rgba(200,169,106,0.10),transparent_75%)]" />

        {BEAMS.map((beam, i) => (
          <div
            key={i}
            className={`absolute bottom-0 -translate-x-1/2 rounded-full bg-gradient-to-t ${beam.from} to-transparent blur-2xl`}
            style={{ left: beam.left, width: beam.w, height: beam.h }}
          />
        ))}

        {/* Bottom vignette to ground the beams */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#05080C] to-transparent" />
      </div>

      {/* ── Centered content ──────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-6 pt-24 pb-40">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="flex max-w-4xl flex-col items-center text-center"
        >
          {/* 1. Gold uppercase eyebrow label */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
            }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold shadow-[0_1px_2px_rgba(0,0,0,0.3)] backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            Mauritius FSC-Regulated
          </motion.div>

          {/* 2. Headline - sentence case, weight 500, 72px desktop, -1.5% tracking */}
          <BlurText
            text="Institutional liquidity, aggregated and delivered"
            renderAs="h1"
            className="justify-center text-4xl leading-[1.04] font-medium tracking-[-0.015em] text-white sm:text-5xl lg:text-[72px] lg:leading-[1.0]"
            animateBy="words"
            delay={80}
            direction="bottom"
            stepDuration={0.4}
          />

          {/* 3. Subtext paragraph */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
            }}
            className="mt-6 max-w-xl text-base leading-relaxed tracking-tighter text-white/60 md:text-lg"
          >
            Equivest is a Mauritius FSC-regulated Investment Dealer that
            aggregates institutional liquidity from multiple providers,
            delivering execution and multi-asset market access.
          </motion.p>

          {/* 4 + 5. Primary (pill + arrow) + secondary buttons */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
            }}
            className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
          >
            <a
              href="#contact"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary py-2 pl-6 pr-2 text-base font-medium tracking-tighter text-white transition-colors duration-200 ease-out hover:bg-gold sm:w-auto"
            >
              Request Institutional Access
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#05080C] transition-transform duration-200 ease-out group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </span>
            </a>

            {/*
              Secondary "Download Fact Sheet" button.
              TODO (A8): replace href="#" with the fact-sheet PDF URL once the
              owner provides it, and remove aria-disabled / pointer-events-none.
            */}
            <a
              href="#"
              aria-disabled="true"
              title="Fact sheet coming soon"
              className="pointer-events-none inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-base font-medium tracking-tighter text-white/70 opacity-70 backdrop-blur transition-colors duration-200 ease-out hover:border-white/30 hover:text-white sm:w-auto"
            >
              Download Fact Sheet
            </a>
          </motion.div>

          {/* 6. Thin licence strip */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
            }}
            className="mt-10 max-w-2xl text-[11px] uppercase leading-relaxed tracking-[0.12em] text-white/40"
          >
            GB24203378 &nbsp;|&nbsp; Investment Dealer (Full Service Dealer,
            excluding Underwriting) &nbsp;|&nbsp; FSC Mauritius
          </motion.p>
        </motion.div>
      </div>

      {/* ── Bottom bar: factual stats (left) + scroll cue (right) ──────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-8"
      >
        <div className="flex items-end justify-between">
          <div className="flex gap-10 md:gap-14">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-medium tracking-tighter text-white md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs tracking-tight text-white/50">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <a
            href="#regulation"
            aria-label="Scroll to content"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 backdrop-blur transition-colors duration-200 ease-out hover:border-white/35 hover:text-white"
          >
            <ChevronDown className="h-5 w-5 animate-bounce" strokeWidth={1.5} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
