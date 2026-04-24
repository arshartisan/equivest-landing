"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

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
    <footer className="bg-[#0B0F14] px-6 pb-24 overflow-hidden">
      <div className="mx-auto max-w-7xl border-t border-white/[0.06]" />

      <div className="mx-auto max-w-7xl pt-14 md:pt-20">
        {/* Row 1: Nav links | Contact + socials | Address */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-10 md:grid-cols-3 md:gap-8"
        >
          {/* Col 1: Navigation */}
          <motion.div variants={fadeUp}>
            <ul className="flex flex-col gap-2.5 tracking-tighter">
              {navLinks.map((link, i) => (
                <li
                  key={link.label}
                  style={{
                    opacity: 0,
                    animation: `footerFadeIn 0.4s cubic-bezier(0.25,0.46,0.45,0.94) forwards`,
                    animationDelay: `${i * 50}ms`,
                  }}
                >
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

          {/* Col 2: Follow us + contact + social icons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-start md:items-center tracking-tighter"
          >
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
                  className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] transition-[border-color,transform] duration-200 ease-out hover:border-white/20 active:scale-[0.95]"
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
          </motion.div>

          {/* Col 3: Address */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col md:items-end justify-between tracking-tighter"
          >
            <div>
              <h4 className="mb-4 text-sm font-medium text-white">Address</h4>
              <p className="text-sm leading-relaxed text-[#A0AEC0]/70 md:text-right">
                Equivest Ltd
                <br />
                Limassol,
                <br />
                Cyprus.
              </p>
            </div>
            <Image
              src="/assets/images/light-logo.png"
              alt="Equivest"
              width={120}
              height={32}
              className="mt-8 h-8 w-auto object-contain opacity-60"
              priority
            />
          </motion.div>

        </motion.div>
      </div>
    </footer>
  );
}
