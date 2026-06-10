"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

// Exact licence values - confirmed (checklist A1/A2).
// Registered Office awaits the Mauritius registered address from the owner (A1).
const FILING_ROWS = [
  { label: "Regulator", value: "Financial Services Commission, Mauritius" },
  { label: "Licence No", value: "GB24203378" },
  {
    label: "Licence Type",
    value: "Investment Dealer (Full Service Dealer, excluding Underwriting)",
  },
  { label: "Legal Entity", value: "Equivest (Mauritius) Limited" },
  { label: "Code", value: "SEC-2.1B" },
  { label: "Issued", value: "29 November 2024" },
  { label: "Registered Office", value: "-", pending: true },
];

export default function RegulationSection() {
  return (
    <section
      id="regulation"
      className="border-t border-border bg-section px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-20">
          {/* Left label */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease }}
            className="shrink-0 md:w-64"
          >
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Regulation
            </span>
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-[1.15] tracking-tighter text-foreground">
              Licence &amp; entity record
            </h2>
          </motion.div>

          {/* Right: filing record table */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease }}
            className="w-full max-w-2xl border-t border-border"
          >
            <dl>
              {FILING_ROWS.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-1 gap-1 border-b border-border py-4 sm:grid-cols-[180px_1fr] sm:gap-6 sm:py-5"
                >
                  <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {row.label}
                  </dt>
                  <dd
                    className={`text-sm tracking-tight md:text-base ${row.pending
                        ? "italic text-muted-foreground/60"
                        : "text-foreground"
                      }`}
                  >
                    {row.pending ? "Awaiting registered address" : row.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/*
              FSC register link.
              TODO (A10): replace href="#" with the exact FSC register URL for
              the Equivest licence record once the owner supplies it.
            */}
            <a
              href="#"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium tracking-tight text-primary transition-colors hover:text-gold"
            >
              View entity on FSC register
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
