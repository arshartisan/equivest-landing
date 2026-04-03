"use client";

import Image from "next/image";
import Link from "next/link";
const navLinks = [
  { label: "Home", href: "#" },
  { label: "Regulation", href: "#regulation" },
  { label: "Liquidity", href: "#liquidity" },
  { label: "Execution", href: "#execution" },
  { label: "Technology", href: "#technology" },
  { label: "Platforms", href: "#platforms" },
  { label: "Why Equivest", href: "#why-equivest" },
  { label: "Onboarding", href: "#onboarding" },
];

const socialIcons = [
  { src: "/assets/images/icons/icons8-facebook-50.svg", href: "#", label: "Facebook" },
  { src: "/assets/images/icons/icons8-instagram-50.svg", href: "#", label: "Instagram" },
  { src: "/assets/images/icons/icons8-linkedin-50.svg", href: "#", label: "LinkedIn" },
  { src: "/assets/images/icons/icons8-whatsapp-50.svg", href: "#", label: "WhatsApp" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0B0F14] px-6 pb-0 overflow-hidden">
      <div className="mx-auto max-w-7xl border-t border-white/[0.06]" />

      <div className="mx-auto max-w-7xl pt-14 md:pt-20">
        {/* Row 1: Nav links | Contact + socials | Address */}
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Col 1: Navigation */}
          <div>
            <ul className="flex flex-col gap-2.5 tracking-tighter">
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
          </div>

          {/* Col 2: Follow us + contact + social icons */}
          <div className="flex flex-col items-start md:items-center tracking-tighter">
            <h4 className="mb-4 text-sm font-medium text-white">Follow us</h4>
            <a
              href="mailto:hello@equivest.com"
              className="text-sm text-[#A0AEC0]/70 transition-colors duration-200 hover:text-white"
            >
              hello@equivest.com
            </a>
            <a
              href="tel:+35799123456"
              className="mt-1 text-sm text-[#A0AEC0]/70 transition-colors duration-200 hover:text-white"
            >
              +357 99 123 456
            </a>

            {/* Social icons */}
            <div className="mt-5 flex gap-2.5">
              {socialIcons.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] transition-colors duration-200 hover:border-white/20"
                >
                  <Image
                    src={social.src}
                    alt={social.label}
                    width={20}
                    height={20}
                    className="h-5 w-5 invert opacity-60 transition-opacity duration-200 group-hover:opacity-100"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Address */}
          <div className="md:text-right tracking-tighter">
            <h4 className="mb-4 text-sm font-medium text-white">Address</h4>
            <p className="text-sm leading-relaxed text-[#A0AEC0]/70">
              Equivest Ltd
              <br />
              Limassol,
              <br />
              Cyprus.
            </p>
          </div>
        </div>

        {/* Row 2: Copyright | Terms | Privacy */}
        <div className="mt-14 flex flex-col gap-3 border-t border-white/[0.06] py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#A0AEC0]/40">
            &copy; {new Date().getFullYear()} Equivest. All Rights Reserved.
          </p>

          <Link
            href="https://www.focaldive.io/"
            target="_blank"
            className="text-[0.625rem] uppercase tracking-widest text-[#A0AEC0]/40 transition-colors duration-200 hover:text-white"
          >
            Forged By
            <Image
              src="/assets/images/fd.svg"
              alt="Forge"
              width={80}
              height={20}
              className="inline-block h-auto w-16 object-contain ml-2"
            />
          </Link>
        </div>

        {/* Row 3: Giant logo */}
        <div className="relative mt-8 h-20 w-full sm:h-28 md:h-36 lg:h-60">
          <Image
            src="/assets/images/light-logo.png"
            alt="Equivest"
            fill
            sizes="100vw"
            className="object-contain opacity-20"
            priority
          />
        </div>
      </div>
    </footer>
  );
}
