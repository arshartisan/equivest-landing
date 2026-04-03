"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CTA from "../CTA";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function FinalCtaSection() {
  return (
    <section className="bg-background px-6 py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#0a0e17]"
      >
        {/* Aurora gradient at the bottom */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%]"
          style={{
            background:
              "radial-gradient(ellipse 90% 80% at 50% 100%, rgba(47,128,237,0.25) 0%, rgba(100,80,200,0.12) 30%, rgba(47,128,237,0.04) 55%, transparent 75%)",
          }}
        />

        {/* Content */}
        <div className="relative px-6 pt-16 pb-20 text-center md:pt-20 md:pb-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease },
                },
              }}
              className="text-[clamp(1.5rem,3.5vw+0.5rem,3.5rem)] capitalize font-medium leading-[1.2] tracking-tighter text-white"
            >
              Access Institutional Liquidity
            </motion.h2>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease },
                },
              }}
              className="mx-auto mt-4 max-w-sm text-base leading-relaxed tracking-tight text-[#A0AEC0]"
            >
              Connect with our team to configure your trading infrastructure.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease },
                },
              }}
              className="mt-7"
            >
              <CTA text={"Request Access"} />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
