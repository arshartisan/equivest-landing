"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const COUNTERPARTY_TYPES = [
  "CFD broker",
  "Hedge fund",
  "Prop firm",
  "Other",
];

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 transition-colors focus:border-primary focus:outline-none";

const labelClass =
  "mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-white/60";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      // TODO (A9/B22): wire this to a real backend that emails the submission
      // to institutional@equivest.com once that mailbox is live. Until then we
      // just acknowledge on screen so the form is testable.
      // Example once ready:
      //   const res = await fetch("/api/contact", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(data),
      //   });
      //   if (!res.ok) throw new Error("Request failed");
      void data;
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center"
      >
        <h3 className="text-xl font-medium tracking-tighter text-white">
          Thank you - your request has been received.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#A0AEC0]">
          Our team reviews institutional enquiries and responds within 1 business
          day. For regulatory matters, contact compliance@equivest.com.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-primary underline-offset-4 transition-colors hover:text-gold hover:underline"
        >
          Submit another request
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-5 text-left sm:grid-cols-2"
    >
      <div>
        <label htmlFor="fullName" className={labelClass}>
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          autoComplete="name"
          className={inputClass}
          placeholder="Jane Doe"
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
          placeholder="jane@company.com"
        />
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          required
          autoComplete="organization"
          className={inputClass}
          placeholder="Company name"
        />
      </div>

      <div>
        <label htmlFor="role" className={labelClass}>
          Role / Job Title
        </label>
        <input
          id="role"
          name="role"
          type="text"
          required
          className={inputClass}
          placeholder="Head of Trading"
        />
      </div>

      <div>
        <label htmlFor="jurisdiction" className={labelClass}>
          Country / Jurisdiction
        </label>
        <input
          id="jurisdiction"
          name="jurisdiction"
          type="text"
          required
          autoComplete="country-name"
          className={inputClass}
          placeholder="e.g. United Kingdom"
        />
      </div>

      <div>
        <label htmlFor="counterpartyType" className={labelClass}>
          Counterparty Type
        </label>
        <select
          id="counterpartyType"
          name="counterpartyType"
          required
          defaultValue=""
          className={`${inputClass} appearance-none`}
        >
          <option value="" disabled>
            Select type
          </option>
          {COUNTERPARTY_TYPES.map((type) => (
            <option key={type} value={type} className="bg-[#0a0e17]">
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="volume" className={labelClass}>
          Monthly Trading Volume <span className="text-white/30">(optional)</span>
        </label>
        <input
          id="volume"
          name="volume"
          type="text"
          className={inputClass}
          placeholder="e.g. $50M notional"
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className={labelClass}>
          Message <span className="text-white/30">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${inputClass} resize-y`}
          placeholder="Tell us about your requirements"
        />
      </div>

      {status === "error" && (
        <p className="sm:col-span-2 text-sm text-destructive">
          Something went wrong. Please try again or email
          institutional@equivest.com directly.
        </p>
      )}

      <div className="sm:col-span-2 flex justify-center">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-base font-medium tracking-tighter text-white transition-[transform,background-color] duration-160 ease-out hover:bg-gold active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? "Sending…" : "Request Institutional Access"}
        </button>
      </div>
    </form>
  );
}
