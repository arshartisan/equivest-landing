"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Benefits", href: "#benefits" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#blog" },
  { label: "Contact Us", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed top-4 left-0 right-0 z-50 bg-black/10 backdrop-blur-md max-w-4xl mx-auto rounded-full">
      <nav className="mx-auto flex h-16 items-center justify-between p-1.5">
        {/* Logo */}
        <Link href="/" className="shrink-0 ml-4">
          <Image
            src="/assets/images/logo.png"
            alt="Equivest"
            width={140}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Navigation Links */}
        <ul className="hidden items-center gap-8 md:flex">
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
        </ul>

        {/* CTA */}
        <Button className="hidden rounded-full bg-[#0B0F14] p-6 text-base capitalize font-medium text-white transition-transform duration-160 ease-out hover:bg-primary/90 active:scale-[0.97] md:inline-flex tracking-tighter">
          Get started
        </Button>
      </nav>
    </header>
  );
}
