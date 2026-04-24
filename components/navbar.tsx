"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CTA from "./CTA";

export default function Navbar() {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-2 left-0 right-0 z-50 backdrop-blur-md mx-auto rounded-full overflow-hidden transition-colors duration-300 max-w-sm ${pastHero ? "bg-white/5" : "bg-black/10"}`}
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

        {/* CTA */}
        <div className="shrink-0">
          <CTA text="Request Access" />
        </div>
      </nav>
    </header>
  );
}
