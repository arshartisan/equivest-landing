"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/contact-form";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

// NOTE (A9/B22): institutional@equivest.com and compliance@equivest.com must be
// live, and the "Request Institutional Access" button should point at the real
// contact form (B22), before launch.
export default function FinalCtaSection() {
  return (
    <section id="contact" className="bg-background px-6 py-16 md:py-20">
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
            className="mx-auto flex max-w-2xl flex-col items-center"
          >
            {/* 1. Eyebrow label */}
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold"
            >
              Institutional Access
            </motion.span>

            {/* 2. Headline (distinct from the hero headline) */}
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
              className="mt-4 text-[clamp(1.75rem,3.5vw+0.5rem,3.5rem)] font-medium leading-[1.2] tracking-tighter text-white"
            >
              Open a counterparty relationship
            </motion.h2>

            {/* 3. Response time line */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
              className="mt-4 text-lg leading-relaxed tracking-tight text-[#A0AEC0]"
            >
              Enquiries responded to within 1 business day
            </motion.p>

            {/* 4. Contact form - its submit button is the primary
                "Request Institutional Access" action (B20 + B22). */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
              className="mt-10 w-full"
            >
              <ContactForm />
            </motion.div>

            {/* 5. Secondary email link */}
            {/* <motion.a
              href="mailto:institutional@equivest.com"
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
              className="mt-6 text-sm font-medium tracking-tight text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              institutional@equivest.com
            </motion.a> */}

            {/* 6. Compliance line */}
            {/* <motion.p
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
              className="mt-8 text-xs tracking-tight text-[#A0AEC0]/70"
            >
              <a
                href="mailto:compliance@equivest.com"
                className="transition-colors hover:text-white"
              >
                compliance@equivest.com
              </a>{" "}
              for regulatory matters
            </motion.p> */}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
