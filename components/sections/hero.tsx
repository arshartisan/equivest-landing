"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CTA from "../CTA";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function HeroSection() {
  return (
    <section className="relative h-full overflow-hidden bg-white">
      {/* Content — overlays the video */}
      <div className="absolute inset-x-0 top-0 z-10 flex min-h-screen items-center justify-center px-6 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="mx-auto flex max-w-5xl flex-col items-center"
        >
          {/* Headline */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
            }}
            className="text-5xl leading-[0.95] font-bold uppercase tracking-tighter text-[#0B0F14] md:text-6xl"
          >
            INSTITUTIONAL LIQUIDITY.
            <br />
            AGGREGATED. DELIVERED.
          </motion.h1>

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
            <CTA text="Request Access" />
          </motion.div>
        </motion.div>
      </div>

      {/* Video — flows normally, determines section height */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.5 }}
        className="flex min-h-screen items-end justify-center"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full object-contain"
          poster="/assets/videos/123.gif"
        >
          <source src="/assets/videos/123.webm" type="video/webm" />
          {/* GIF fallback rendered via poster */}
        </video>
      </motion.div>
    </section>
  );
}
