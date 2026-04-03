"use client";

import { motion } from "framer-motion";
import BlurText from "@/components/ui/blur-text";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const HIGHLIGHT_WORDS = [
  { text: "Investment", className: "text-primary" },
  { text: "Dealer", className: "text-primary" },
  { text: "Global", className: "text-gold" },
  { text: "Business", className: "text-gold" },
  { text: "Licence", className: "text-gold" },
];

export default function RegulationSection() {
  return (
    <section id="regulation" className="border-t border-border bg-section px-6 py-24 md:py-32 md:min-h-screen">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-start justify-center md:gap-20">
          {/* Left label */}
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease }}
            className="shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground md:pt-3"
          >
            Regulation
          </motion.span>

          {/* Right statement with blur-in animation */}
          <BlurText
            text="Licensed by the Financial Services Commission (Mauritius) as an Investment Dealer (Full Service Dealer, excluding underwriting), operating under a Global Business Licence"
            renderAs="h2"
            className="text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[1.15] tracking-tighter text-foreground"
            animateBy="words"
            delay={50}
            direction="bottom"
            stepDuration={0.4}
            highlightWords={HIGHLIGHT_WORDS}
          />
        </div>
      </div>
    </section>
  );
}
