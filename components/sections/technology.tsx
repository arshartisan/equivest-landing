"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ease = [0.23, 1, 0.32, 1] as const;

const PARTNERS = [
  { name: "oneZero", logo: "/assets/images/logos/oz.webp" },
  { name: "YourBourse", logo: "/assets/images/logos/yourbourse_logo.svg" },
  { name: "FXCubic", logo: "/assets/images/logos/fxcubic-logo.svg" },
  { name: "Centroid", logo: "/assets/images/logos/centroid.svg" },
  { name: "PrimeXM", logo: "/assets/images/logos/primexm.svg" },
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
    transition: { duration: 0.45, ease },
  },
};

export default function TechnologySection() {
  return (
    <section id="technology" className="border-t border-border bg-background px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_2fr] lg:gap-20">
          {/* Left — text content */}
          <div className="flex flex-col items-start gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease }}
              className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.15] tracking-tighter text-foreground"
            >
              Connectivity &{" "}
              <span className="text-primary">Infrastructure</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="max-w-sm text-base leading-relaxed tracking-tighter text-muted-foreground "
            >
              Equivest integrates with industry-standard bridge and aggregation technologies, ensuring
              seamless execution and connectivity.
            </motion.p>
          </div>

          {/* Right — logo grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-3 border-l border-t border-border/80"
          >
            {PARTNERS.map((partner) => (
              <motion.div
                key={partner.name}
                variants={itemVariants}
                className="group flex items-center justify-center border-b border-r border-border/80 px-6 py-12 md:py-16"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={160}
                  height={48}
                  className="h-7 w-auto max-w-[120px] object-contain transition-opacity duration-200 ease-out group-hover:opacity-90 md:h-9 md:max-w-[150px]"
                />
              </motion.div>
            ))}

            {/* Empty cell to complete the 2×3 grid */}
            <motion.div
              variants={itemVariants}
              className="hidden sm:flex items-center justify-center border-b border-r border-border/50 px-6 py-12 md:py-16"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
