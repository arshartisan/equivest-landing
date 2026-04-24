"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const assetClasses = [
  { number: "01", name: "Forex", icon: "/assets/icons/forex.png" },
  { number: "02", name: "Metals", icon: "/assets/icons/metal.png" },
  { number: "03", name: "Indices", icon: "/assets/icons/indices.png" },
  { number: "04", name: "Commodities", icon: "/assets/icons/commodity.png" },
  { number: "05", name: "Equities", icon: "/assets/icons/equity.png" },
  { number: "06", name: "Derivatives", icon: "/assets/icons/derivatives.png" },
];

export default function LiquiditySolutionsSection() {
  return (
    <section className="border-t border-border bg-background px-6 py-24 md:py-32">
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
            <motion.div
              key={asset.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease }}
              className="group relative border-b border-border"
            >
              {/* Hover fill background */}
              <div className="absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-x-100 rounded-full" />

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
                <div className="relative ml-auto flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:border-gold group-hover:bg-gold">
                  <ArrowUpRight
                    className="hidden h-8 w-8 text-muted-foreground transition-all duration-300 md:block md:group-hover:scale-50 md:group-hover:opacity-0"
                    strokeWidth={2}
                  />
                  <Image
                    src={asset.icon}
                    alt={`${asset.name} icon`}
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain invert transition-all duration-300 md:absolute md:scale-50 md:opacity-0 md:group-hover:scale-100 md:group-hover:opacity-100"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
