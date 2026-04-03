"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import CTA from "./CTA";

const navLinks = [
  { label: "Regulation", href: "#regulation" },
  { label: "Liquidity", href: "#liquidity" },
  { label: "Technology", href: "#technology" },
  { label: "Platforms", href: "#platforms" },
  { label: "Why Equivest", href: "#why-equivest" },
];

const SCROLL_THRESHOLD = 50;

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
      setPastHero(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const collapsed = scrolled && !hovered;

  return (
    <>
      <motion.header
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{
          width: collapsed ? "fit-content" : "896px",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-2 left-0 right-0 z-50 backdrop-blur-md mx-auto rounded-full overflow-hidden transition-colors duration-300 max-md:!w-[calc(100%-1rem)] max-w-[calc(100%-1rem)] ${pastHero ? "bg-white/5" : "bg-black/10"}`}
      >
        <nav className="relative mx-auto flex h-16 items-center justify-between p-1.5">
          {/* Logo */}
          <Link href="/" className="shrink-0 mx-4 relative h-8 w-[140px]">
            <Image
              src="/assets/images/logo.png"
              alt="Equivest"
              width={140}
              height={32}
              className={`absolute inset-0 h-8 w-auto transition-opacity duration-300 ${pastHero ? "opacity-0" : "opacity-100"}`}
              priority
            />
            <Image
              src="/assets/images/light-logo.png"
              alt="Equivest"
              width={140}
              height={32}
              className={`absolute inset-0 h-8 w-auto transition-opacity duration-300 ${pastHero ? "opacity-100" : "opacity-0"}`}
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <AnimatePresence>
            {!collapsed && (
              <motion.ul
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute left-1/2 -translate-x-1/2 hidden items-center gap-8 md:flex overflow-hidden whitespace-nowrap"
              >
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`text-base tracking-tighter font-medium transition-colors duration-150 ${pastHero ? "text-white/70 hover:text-white" : "text-[#0B0F14]/70 hover:text-[#0B0F14]"}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          {/* Desktop CTA */}
          <div className="hidden shrink-0 md:block">
            <CTA text="Request Access" />
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="mr-4 flex h-10 w-10 items-center justify-center md:hidden"
            aria-label="Open menu"
          >
            <div className="flex flex-col gap-[5px]">
              <span
                className={`block h-[2px] w-5 transition-colors duration-200 ${pastHero ? "bg-white" : "bg-[#0B0F14]"}`}
              />
              <span
                className={`block h-[2px] w-5 transition-colors duration-200 ${pastHero ? "bg-white" : "bg-[#0B0F14]"}`}
              />
            </div>
          </button>
        </nav>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="fixed inset-0 z-[60] flex flex-col bg-[#0B0F14] md:hidden"
          >
            {/* Close button */}
            <div className="flex justify-start px-6 pt-6">
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-colors duration-200 hover:border-white/30"
                aria-label="Close menu"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-white"
                >
                  <path
                    d="M12 4L4 12M4 4l8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-1 flex-col justify-center px-8">
              <ul className="space-y-2">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.1 + i * 0.05,
                      ease,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 text-2xl font-medium tracking-tight text-white transition-colors duration-200 hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + navLinks.length * 0.05,
                  ease,
                }}
                className="mt-6"
              >
                <CTA text="Request Access" mobile />
              </motion.div>
            </nav>

            {/* Bottom contact info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4, ease }}
              className="border-t border-white/10 px-8 py-8"
            >
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-white/40">
                Contact
              </p>
              <a
                href="mailto:info@equivest.com"
                className="block text-sm text-gold transition-colors duration-200 hover:text-gold/80"
              >
                info@equivest.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
