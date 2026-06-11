"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileCheck,
  ShieldCheck,
  MonitorCog,
  Workflow,
  Rocket,
  ArrowUpRight,
} from "lucide-react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const steps = [
  {
    number: "01",
    time: "Day 1",
    title: "Application & KYC",
    description:
      "Submit your application with required documentation. Our streamlined KYC process ensures fast verification while maintaining full regulatory compliance",
    icon: FileCheck,
    color: "#2F80ED",
  },
  {
    number: "02",
    time: "Days 2-5",
    title: "Compliance Review",
    description:
      "Our compliance team conducts a thorough review of your application, assessing risk profiles and ensuring all regulatory requirements are met",
    icon: ShieldCheck,
    color: "#C8A96A",
  },
  {
    number: "03",
    time: "Days 3-7",
    title: "Platform Setup",
    description:
      "Configure your trading environment with custom platform settings, user roles, and API integrations tailored to your operational needs",
    icon: MonitorCog,
    color: "#2F80ED",
  },
  {
    number: "04",
    time: "Days 5-10",
    title: "Liquidity Configuration",
    description:
      "Select and configure your liquidity feeds, pricing models, and risk parameters with guidance from our dealing desk specialists",
    icon: Workflow,
    color: "#C8A96A",
  },
  {
    number: "05",
    time: "Day 14+",
    title: "Go Live",
    description:
      "Launch your fully configured platform with ongoing support, real time monitoring, and dedicated account management from day one",
    icon: Rocket,
    color: "#2F80ED",
  },
];

export default function OnboardingSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="onboarding" className="border-t border-white/[0.06] bg-section py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
          className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-primary">
              Onboarding Flow
            </p>
            <h2 className="text-[clamp(1.75rem,3vw+0.5rem,2.75rem)] font-medium leading-[1.15] tracking-tighter text-white">
              From application
              <br />
              to go live
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed tracking-tighter text-[#A0AEC0] md:text-right">
            A structured five step process designed to get you
            operational with minimal friction and maximum support
          </p>
        </motion.div>

        {/* Overall timeline summary */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
          className="mb-8 text-xs font-medium uppercase tracking-[0.16em] text-gold md:mb-10"
        >
          Typical time from application to go-live: 10-14 business days
        </motion.p>

        {/* Mobile: vertical stack */}
        <div className="flex flex-col gap-3 md:hidden">
          {steps.map((step, i) => {
            const isActive = activeIndex === i;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: i * 0.06 }}
                onClick={() => setActiveIndex(i)}
                className="cursor-pointer overflow-hidden rounded-xl border border-white/[0.06] bg-[#111827]"
              >
                <div className="flex items-center gap-4 p-5">
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${step.color}20` }}
                  >
                    <step.icon
                      className="h-5 w-5"
                      style={{ color: step.color }}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-medium tracking-wider"
                        style={{ color: step.color }}
                      >
                        {step.number}
                      </span>
                      <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-gold">
                        {step.time}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium tracking-tight text-white">
                      {step.title}
                    </h3>
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 text-[#A0AEC0] transition-transform duration-200"
                    style={{
                      transform: isActive ? "rotate(90deg)" : "rotate(0deg)",
                    }}
                  />
                </div>

                <div
                  className="grid transition-[grid-template-rows] duration-300"
                  style={{
                    gridTemplateRows: isActive ? "1fr" : "0fr",
                    transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-[#A0AEC0]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Desktop: horizontal expanding strips */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease }}
          className="hidden h-[480px] gap-2 md:flex"
        >
          {steps.map((step, i) => {
            const isActive = activeIndex === i;

            return (
              <div
                key={step.number}
                onMouseEnter={() => setActiveIndex(i)}
                className="relative cursor-pointer overflow-hidden rounded-2xl border border-white/[0.06] transition-[flex,background-color] duration-700"
                style={{
                  flex: isActive ? 2.5 : 1,
                  transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)",
                  backgroundColor: isActive ? step.color : "#111827",
                }}
              >
                {/* Collapsed state - vertical text + icon */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-between py-8"
                  style={{ visibility: isActive ? "hidden" : "visible" }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06]">
                    <step.icon
                      className="h-5 w-5 text-[#A0AEC0]"
                      strokeWidth={1.5}
                    />
                  </div>

                  <span
                    className="text-xl font-medium tracking-tighter text-white"
                    style={{
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                      transform: "rotate(180deg)",
                    }}
                  >
                    {step.title}
                  </span>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1]">
                    <ArrowUpRight className="h-4 w-4 text-[#A0AEC0]" />
                  </div>
                </div>

                {/* Expanded state - full content */}
                <div
                  className="absolute inset-0 flex flex-col justify-between p-8"
                  style={{ visibility: isActive ? "visible" : "hidden" }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                      <step.icon
                        className="h-6 w-6 text-white"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-sm font-medium text-white/60">
                        {step.number}
                      </span>
                      {/* Gold reads on the blue cards; switch to white on the
                          gold-background cards for contrast. */}
                      <span
                        className="text-[10px] font-medium uppercase tracking-[0.14em]"
                        style={{
                          color:
                            step.color === "#C8A96A" ? "#FFFFFF" : "#C8A96A",
                        }}
                      >
                        {step.time}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-2xl font-medium tracking-tighter text-white">
                      {step.title}
                    </h3>
                    <p className="max-w-sm text-base tracking-tighter leading-relaxed text-white/70">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
