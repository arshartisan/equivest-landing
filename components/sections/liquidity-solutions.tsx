"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const assetClasses = [
  { number: "01", name: "Forex", icon: "/assets/images/liquidity/forex.svg" },
  { number: "02", name: "Metals", icon: "/assets/images/liquidity/metal.svg" },
  { number: "03", name: "Indices", icon: "/assets/images/liquidity/indices.svg" },
  { number: "04", name: "Commodities", icon: "/assets/images/liquidity/commodity.svg" },
  { number: "05", name: "Equities", icon: "/assets/images/liquidity/equity.svg" },
  { number: "06", name: "Derivatives", icon: "/assets/images/liquidity/derivatives.svg" },
];

function AssetRow({
  asset,
  index,
}: {
  asset: (typeof assetClasses)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative border-b border-border"
    >
      {/* Hover fill — wipes left→right. Driven by Framer Motion (JS) rather than
          a CSS transition on scale-x-*: Tailwind v4's scale utilities flip a
          non-interpolable `syntax:"*"` variable (snaps), and the global
          prefers-reduced-motion rule in globals.css zeroes out CSS transition
          durations site-wide. A JS-animated scaleX sidesteps both. */}
      <motion.div
        aria-hidden
        initial={false}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease }}
        style={{ originX: 0 }}
        className="absolute inset-0 rounded-full bg-foreground"
      />

      {/* Row content */}
      <div className="relative flex items-center gap-6 px-2 py-4 md:gap-10 md:px-4 md:py-6">
        {/* Number */}
        <span className="w-8 shrink-0 text-sm font-medium tabular-nums text-muted-foreground transition-colors duration-300 group-hover:text-background/60 md:w-10">
          {asset.number}
        </span>

        {/* Name */}
        <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-gold md:text-3xl">
          {asset.name}
        </h3>

        {/* Arrow / asset icon — right aligned */}
        <div className="relative ml-auto flex h-16 w-16 shrink-0 items-center justify-center md:h-20 md:w-20">
          {/* Default state: bordered circle with arrow */}
          <motion.div
            initial={false}
            animate={{ scale: hovered ? 0.75 : 1, opacity: hovered ? 0 : 1 }}
            transition={{ duration: 0.35, ease }}
            className="absolute inset-0 flex items-center justify-center rounded-full border border-border"
          >
            <ArrowUpRight className="h-8 w-8 text-muted-foreground" strokeWidth={2} />
          </motion.div>

          {/* Hover state: 3D icon with gentle float — enters from scale 0.9, never 0 */}
          <motion.div
            initial={false}
            animate={{ scale: hovered ? 1 : 0.9, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.35, ease }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, -4, 0], rotate: [-1.5, 1.5, -1.5] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              className="drop-shadow-[0_10px_24px_rgba(56,189,248,0.35)]"
            >
              <Image
                src={asset.icon}
                alt={`${asset.name} icon`}
                width={80}
                height={80}
                className="h-16 w-16 object-contain md:h-20 md:w-20"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function LiquiditySolutionsSection() {
  return (
    <section className="border-t border-border bg-section px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Section header — split layout */}
        <div className="mb-16 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease }}
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground"
            >
              Liquidity Solutions
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease }}
              className="text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.1] tracking-tighter text-foreground"
            >
              Multi-Asset
              <br />
              <span className="text-gold">Liquidity</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="max-w-sm text-base leading-relaxed tracking-tighter text-muted-foreground md:text-right"
          >
            Access institutional liquidity across six major asset classes,
            aggregated from Tier-1 providers with deep order books.
          </motion.p>
        </div>

        {/* Asset list rows */}
        <div className="border-t border-border grid md:grid-cols-2">
          {assetClasses.map((asset, i) => (
            <AssetRow key={asset.name} asset={asset} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
