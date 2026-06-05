"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import Image from "next/image";
import CTA from "../CTA";

const ease = [0.23, 1, 0.32, 1] as const;

const PLATFORMS = [
  {
    name: "MetaTrader 5",
    logo: "/assets/images/platforms/meta-trader-5.png",
    span: "col-span-1 row-span-1",
  },
  {
    name: "cTrader",
    logo: "/assets/images/platforms/ctrader_trader.png",
    span: "col-span-1 row-span-1",
  },
  {
    name: "TradeLocker",
    logo: "/assets/images/platforms/trade-locker.png",
    span: "col-span-1 row-span-1",
  },
  {
    name: "Finova",
    logo: "/assets/images/platforms/finova.svg",
    span: "col-span-1 row-span-1",
  },
  {
    name: "Match-Trader",
    logo: "/assets/images/platforms/match_trader.svg",
    span: "col-span-1 row-span-1",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

export default function PlatformsSection() {
  return (
    <section id="platforms" className="border-t border-border bg-section px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Top row — label + title left, description right */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease }}
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground"
            >
              Platform Support
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.05, ease }}
              className="mt-4 text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.1] tracking-tighter text-foreground"
            >
              Multi-Platform
              <br />
              <span className="text-gold">Connectivity</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base tracking-tighter"
          >
            Equivest provides seamless access to the world&apos;s most trusted
            trading platforms, giving traders the flexibility to choose their
            preferred environment.
          </motion.p>
        </div>

        {/* Bento grid — 3 cols x 3 rows on md+, single column on mobile */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4"
        >
          {/* Row 1 / Col 1: Stat card */}
          <motion.div
            variants={cardVariants}
            className="flex flex-col justify-between rounded-2xl border border-border bg-background p-6 md:p-8"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <TrendingUp className="h-5 w-5 text-gold" aria-hidden="true" />
            </div>

            <div className="mt-8">
              <p className="text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-none tracking-tighter text-foreground">
                5
              </p>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground tracking-tighter">
                Supported trading platforms with deep integration, ensuring
                reliable execution and real-time connectivity.
              </p>
            </div>
          </motion.div>

          {/* Row 1 / Col 2: Platform 1 — MetaTrader 5 (blue, large) */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="group relative flex min-h-[160px] items-center justify-center overflow-hidden rounded-2xl border border-primary/20 bg-primary p-8 md:min-h-0 md:p-12"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100" />
            <Image
              src={PLATFORMS[0].logo}
              alt={PLATFORMS[0].name}
              width={250}
              height={60}
              className="relative z-10 h-12 w-auto max-w-[200px] object-contain transition-opacity duration-200 ease-out group-hover:opacity-100 md:h-14"
            />
          </motion.div>

          {/* Row 1 / Col 3: Platform 2 — cTrader (gold) */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="group relative flex min-h-[160px] items-center justify-center overflow-hidden rounded-2xl border border-primary/20 bg-gold p-6 md:min-h-0 md:p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100" />
            <Image
              src={PLATFORMS[1].logo}
              alt={PLATFORMS[1].name}
              width={160}
              height={60}
              className="relative z-10 h-10 w-auto max-w-[200px] object-contain transition-opacity duration-200 ease-out group-hover:opacity-100 md:h-12"
            />
          </motion.div>

          {/* Row 2 / Col 1: Platform 3 — TradeLocker (gold) */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="group relative flex min-h-[160px] items-center justify-center overflow-hidden rounded-2xl border border-primary/20 bg-gold p-6 md:min-h-0 md:p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100" />
            <Image
              src={PLATFORMS[2].logo}
              alt={PLATFORMS[2].name}
              width={160}
              height={60}
              className="relative z-10 h-10 w-auto max-w-[220px] object-contain transition-opacity duration-200 ease-out group-hover:opacity-100 md:h-12"
            />
          </motion.div>

          {/* Row 2 / Col 2: Platform 4 — Finova (blue, large) */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="group relative flex min-h-[160px] items-center justify-center overflow-hidden rounded-2xl border border-primary/20 bg-primary p-8 md:min-h-0 md:p-12"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100" />
            <Image
              src={PLATFORMS[3].logo}
              alt={PLATFORMS[3].name}
              width={250}
              height={60}
              className="relative z-10 h-12 w-auto max-w-[220px] object-contain transition-opacity duration-200 ease-out group-hover:opacity-100 md:h-14"
            />
          </motion.div>

          {/* Row 2 / Col 3: Platform 5 — Match-Trader (gold) */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="group relative flex min-h-[160px] items-center justify-center overflow-hidden rounded-2xl border border-primary/20 bg-gold p-6 md:min-h-0 md:p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100" />
            <Image
              src={PLATFORMS[4].logo}
              alt={PLATFORMS[4].name}
              width={200}
              height={60}
              className="relative z-10 h-10 w-auto max-w-[200px] object-contain transition-opacity duration-200 ease-out group-hover:opacity-100 md:h-12"
            />
          </motion.div>

          {/* Row 3: CTA banner spanning full width on md+ */}
          <motion.div
            variants={cardVariants}
            className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-background p-6 sm:col-span-2 md:col-span-3 md:flex-row md:items-center md:p-8"
          >
            <p className="text-xl font-medium capitalize leading-snug tracking-tighter text-foreground md:text-2xl">
              Powering seamless trading across{" "}
              <span className="text-primary font-semibold">every platform.</span>
            </p>

            <div className="w-full md:w-auto md:shrink-0">
              {/* Mobile fallback */}
              <a
                href="#"
                className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground md:hidden"
              >
                Get Started
              </a>

              {/* CTA on md+ */}
              <div className="hidden md:block">
                <CTA text="Get Started" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
