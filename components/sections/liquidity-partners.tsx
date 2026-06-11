"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const ease = [0.23, 1, 0.32, 1] as const;

const PARTNERS = [
  { name: "LMAX", logo: "/assets/images/partners/lmax.png" },
  { name: "Finalto", logo: "/assets/images/partners/finalto.png" },
  { name: "ISAM", logo: "/assets/images/partners/isam2.png" },
  { name: "GBE", logo: "/assets/images/partners/gbe.svg" },
  { name: "26 Degrees", logo: "/assets/images/partners/26.avif" },
];

const PILLARS = [
  "Deep Institutional Liquidity",
  "Tight Spreads",
  "Fast Execution",
  "Trusted Global Partners",
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

export default function LiquidityPartnersSection() {
  return (
    <section
      id="liquidity-partners"
      className="border-t border-border bg-section px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header - title left, contact link right */}
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            {/* <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease }}
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground"
            >
              Liquidity Partners
            </motion.span> */}

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.05, ease }}
              className="mt-4 text-[clamp(2.25rem,5.5vw,3.5rem)] font-medium leading-[1.05] tracking-tighter text-foreground"
            >
              Aggregating World Class
              <br />
              <span className="text-gold">Liquidity</span>{" "}
              <span className="text-primary">Delivering</span>
              <br />
              <span className="text-primary">Superior Execution</span>
            </motion.h2>
          </div>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="group inline-flex shrink-0 items-center gap-3 border-b border-foreground/40 pb-2 text-base text-foreground transition-colors hover:border-primary md:text-lg"
          >
            <span className="tracking-tight">Become a Partner</span>
            <ArrowUpRight
              className="h-5 w-5 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.5}
            />
          </motion.a>
        </div>

        {/* Body copy */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16"
        >
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base tracking-tight">
            We aggregate liquidity from a carefully selected network of
            industry leading global liquidity providers, giving our clients
            access to deep institutional liquidity, competitive pricing, tight
            spreads, and fast, reliable trade execution
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base tracking-tight">
            Our advanced liquidity aggregation technology connects with top tier
            financial institutions and liquidity partners, creating a robust
            trading environment built for institutional clients and professional
            counterparties. By combining multiple liquidity sources into a single
            pool, we help ensure greater market depth, improved pricing, and
            enhanced trading conditions across global markets
          </p>
        </motion.div>

        {/* Logo grid label */}
        {/* <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
          className="mt-20 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground"
        >
          Our Trusted Liquidity Partners
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-6 grid grid-cols-2 border-l border-t border-border/70 md:grid-cols-3 lg:grid-cols-3"
        >
          {PARTNERS.map((partner) => (
            <motion.div
              key={partner.name}
              variants={itemVariants}
              className="group relative flex items-center justify-center border-b border-r border-border/70 px-6 py-14 transition-colors duration-300 hover:bg-section md:py-20"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={180}
                height={56}
                className="h-8 w-auto max-w-[140px] object-contain brightness-0 invert opacity-75 transition-all duration-300 ease-out group-hover:opacity-100 md:h-10 md:max-w-[160px]"
              />
            </motion.div>
          ))}

          <motion.div
            variants={itemVariants}
            className="hidden border-b border-r border-border/70 px-6 py-14 md:py-20 lg:flex lg:items-center lg:justify-center"
          >
            <a
              href="#contact"
              className="text-sm font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground"
            >
              View more →
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="hidden border-b border-r border-border/70 px-6 py-14 md:py-20 md:flex md:items-center md:justify-center lg:hidden"
          >
            <a
              href="#contact"
              className="text-sm font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground"
            >
              View more →
            </a>
          </motion.div>
        </motion.div> */}

        {/* Pillars / value props */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="mt-16 flex flex-col flex-wrap items-start gap-x-10 gap-y-4 sm:flex-row sm:items-center"
        >
          {PILLARS.map((pillar, idx) => (
            <div key={pillar} className="flex items-center gap-10">
              <span className="text-sm font-medium tracking-tight text-foreground md:text-base">
                {pillar}
              </span>
              {idx < PILLARS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden h-1 w-1 rounded-full bg-gold sm:inline-block"
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
