"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import CTA from "./CTA";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Benefits", href: "#benefits" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#blog" },
  { label: "Contact Us", href: "#contact" },
];

const SCROLL_THRESHOLD = 50;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const collapsed = scrolled && !hovered;

  return (
    <motion.header
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        width: collapsed ? "fit-content" : "896px",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-2 left-0 right-0 z-50 bg-black/10 backdrop-blur-md mx-auto rounded-full overflow-hidden"
    >
      <nav className="relative mx-auto flex h-16 items-center justify-between p-1.5">
        {/* Logo */}
        <Link href="/" className="shrink-0 mx-4">
          <Image
            src="/assets/images/logo.png"
            alt="Equivest"
            width={140}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Navigation Links — centered, visible when expanded */}
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
                    className="text-base tracking-tighter font-medium text-[#0B0F14]/70 transition-colors duration-150 hover:text-[#0B0F14]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* CTA */}
        <div className="shrink-0">
          <CTA text="Request Access" />
        </div>
      </nav>
    </motion.header>
  );
}
