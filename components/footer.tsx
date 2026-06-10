"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

// Lucide dropped brand icons from the published package (lucide-react ^1.17.0),
// so we inline the Instagram (stroke) and X / Twitter (filled glyph) marks.
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Regulation", href: "#regulation" },
  { label: "Liquidity", href: "#liquidity" },
  { label: "Execution", href: "#execution" },
  { label: "Technology", href: "#technology" },
  { label: "Platforms", href: "#platforms" },
  { label: "Why Equivest", href: "#why-equivest" },
  { label: "Onboarding", href: "#onboarding" },
  { label: "Contact", href: "#contact" },
];

// Six legal documents (checklist A7/B21). The owner must create these and supply
// URLs - links stay as "#" placeholders until then.
const legalLinks = [
  { label: "Terms of Business", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Cookie Policy", href: "#" },
  { label: "Complaints Procedure", href: "#" },
  { label: "Best Execution Policy", href: "#" },
  { label: "Conflicts of Interest Policy", href: "#" },
];

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-[#0B0F14] px-6 pb-12">
      <div className="mx-auto max-w-7xl border-t border-white/[0.06]" />

      <div className="mx-auto max-w-7xl pt-14 md:pt-20">
        {/* Four columns */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-4"
        >
          {/* Col 1: About */}
          <motion.div variants={fadeUp} className="tracking-tighter">
            <Image
              src="/assets/images/light-logo.png"
              alt="Equivest"
              width={120}
              height={32}
              className="h-8 w-auto object-contain"
              priority
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#A0AEC0]/70">
              Mauritius FSC-regulated Investment Dealer aggregating institutional
              liquidity for professional counterparties.
            </p>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="LinkedIn"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] transition-[border-color,transform] duration-200 ease-out hover:border-white/20 active:scale-[0.95]"
              >
                <Image
                  src="/assets/images/icons/icons8-linkedin-50.svg"
                  alt="LinkedIn"
                  width={20}
                  height={20}
                  className="h-5 w-5 opacity-60 invert transition-opacity duration-200 group-hover:opacity-100"
                />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] text-white/60 transition-[border-color,color,transform] duration-200 ease-out hover:border-white/20 hover:text-white active:scale-[0.95]"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="X (Twitter)"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] text-white/60 transition-[border-color,color,transform] duration-200 ease-out hover:border-white/20 hover:text-white active:scale-[0.95]"
              >
                <XIcon className="h-[18px] w-[18px]" />
              </a>
            </div>
          </motion.div>

          {/* Col 2: Navigate */}
          <motion.div variants={fadeUp} className="tracking-tighter">
            <h4 className="mb-4 text-sm font-medium text-white">Navigate</h4>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#A0AEC0]/70 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3: Legal */}
          <motion.div variants={fadeUp} className="tracking-tighter">
            <h4 className="mb-4 text-sm font-medium text-white">Legal</h4>
            <ul className="flex flex-col gap-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#A0AEC0]/70 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4: Contact */}
          <motion.div variants={fadeUp} className="tracking-tighter">
            <h4 className="mb-4 text-sm font-medium text-white">Contact</h4>
            <div className="flex flex-col gap-2.5">
              {/* NOTE (A9): these mailboxes must be set up by the owner. */}
              <a
                href="mailto:institutional@equivest.com"
                className="text-sm text-[#A0AEC0]/70 transition-colors duration-200 hover:text-white"
              >
                institutional@equivest.com
              </a>
              <a
                href="mailto:compliance@equivest.com"
                className="text-sm text-[#A0AEC0]/70 transition-colors duration-200 hover:text-white"
              >
                compliance@equivest.com
              </a>

              {/* NOTE (A1): Mauritius registered address pending from owner.
                  The previous Cyprus address has been removed (A1 conflict). */}
              <address className="mt-3 text-sm not-italic leading-relaxed text-[#A0AEC0]/70">
                Equivest (Mauritius) Limited
                <br />
                <span className="italic text-[#A0AEC0]/50">
                  Registered office address to be confirmed
                </span>
              </address>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-white/[0.06] pt-8">
          <div className="flex flex-col gap-3 text-xs leading-relaxed tracking-tight text-[#A0AEC0]/55">
            {/* Regulatory line - licence number confirmed (A2) */}
            <p>
              Equivest (Mauritius) Limited is licensed by the Financial Services
              Commission, Mauritius as an Investment Dealer (Full Service Dealer,
              excluding Underwriting). Licence No. GB24203378.
            </p>

            {/* Audience statement */}
            <p>For institutional counterparties only. Not for retail investors.</p>

            {/* Risk warning - pending compliance sign-off (A6) */}
            <p>
              Trading in financial instruments and derivatives carries a high
              level of risk and may result in the loss of all invested capital.
              It may not be suitable for all participants.
            </p>

            {/* Restricted jurisdictions - list pending from owner (A5) */}
            <p>
              Services are not available in certain restricted jurisdictions
              <span className="italic text-[#A0AEC0]/40">
                {" "}
                (list to be confirmed)
              </span>
              .
            </p>

            {/* Copyright - auto-generated year (C7) */}
            <p className="pt-2 text-[#A0AEC0]/70">
              © {new Date().getFullYear()} Equivest (Mauritius) Limited. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
