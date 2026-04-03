"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ShieldCheck,
  Layers,
  SlidersHorizontal,
  Building2,
  UsersRound,
  MonitorSmartphone,
  ArrowUpRight,
} from "lucide-react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const reasons = [
  {
    icon: ShieldCheck,
    title: "Regulated infrastructure",
    description:
      "Fully compliant frameworks ensuring institutional-grade security and regulatory adherence across all operations.",
  },
  {
    icon: Layers,
    title: "Aggregated liquidity",
    description:
      "Deep liquidity pools sourced from top-tier providers, delivering tighter spreads and superior execution quality.",
  },
  {
    icon: SlidersHorizontal,
    title: "Flexible pricing models",
    description:
      "Customisable fee structures tailored to your trading volume, strategy, and operational requirements.",
  },
  {
    icon: Building2,
    title: "Institutional onboarding",
    description:
      "Streamlined KYC/AML processes and dedicated account management for fast, frictionless integration.",
  },
  {
    icon: UsersRound,
    title: "Dealing desk oversight",
    description:
      "Expert dealing desk support providing real-time monitoring, risk management, and trade execution assistance.",
  },
  {
    icon: MonitorSmartphone,
    title: "Multi-platform compatibility",
    description:
      "Seamless connectivity across MT4, MT5, and proprietary platforms with unified reporting and analytics.",
    featured: true,
  },
];

function ReasonCard({ reason }: { reason: (typeof reasons)[number] }) {
  const isFeatured = "featured" in reason && reason.featured;

  return (
    <div
      className={`group relative flex h-[400px] w-[320px] flex-shrink-0 flex-col justify-between overflow-hidden rounded-2xl border p-7 transition-colors duration-200 md:h-[350px] md:w-[350px] bg-primary`}>
      <div>
        <div
          className={`mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white `}
        >
          <reason.icon className="h-5 w-5" strokeWidth={1.5} />
        </div>

        <h3 className="text-2xl font-medium tracking-tighter text-white">
          {reason.title}
        </h3>
      </div>

      <p
        className={`text-sm tracking-tighter leading-relaxed ${isFeatured ? "text-white/75" : "text-[#e7e7e8]"
          }`}
      >
        {reason.description}
      </p>
    </div>
  );
}

export default function WhyEquivestSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    function measure() {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      setMaxScroll(trackWidth - viewportWidth + 48); // 48px right padding
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);

  return (
    // The outer wrapper is tall to create vertical scroll distance.
    // height = 100vh (sticky viewport) + extra scroll runway for the cards.
    <section
      id="why-equivest"
      ref={sectionRef}
      className="relative border-t border-white/[0.06] bg-[#0B0F14]"
      style={{ height: "250vh" }}
    >
      {/* Sticky container — pins to viewport while user scrolls */}
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* Header */}
        <div className="mx-auto w-full max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end"
          >
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#2F80ED]">
                Why Equivest
              </p>
              <h2 className="text-[clamp(1.75rem,3vw+0.5rem,2.75rem)] font-semibold leading-[1.15] tracking-tighter text-white">
                Purpose-built for
                <br />
                institutional scale
              </h2>
            </div>
            <p className="mt-4 text-base leading-relaxed text-[#A0AEC0] tracking-tighter max-w-md md:text-right">
              Whether you&apos;re expanding into new markets or optimising
              existing operations, our infrastructure is here to support every
              step.
            </p>
          </motion.div>
        </div>

        {/* Horizontal scroll track */}
        <div className="relative mt-12 md:mt-14">
          {/* Fade masks */}
          {/* <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0B0F14] to-transparent md:w-24" /> */}
          {/* <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0B0F14] to-transparent md:w-24" /> */}

          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-5 pl-6 md:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
          >
            {reasons.map((reason) => (
              <ReasonCard key={reason.title} reason={reason} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
