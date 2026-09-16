"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Copy } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { Reveal, RollingLabel, SplitWords, rollingParent } from "@/components/motion/primitives";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${siteConfig.email}`;
    }
  }

  return (
    <section id="contact" className="scroll-mt-16 px-5 pb-24 pt-8 md:px-8">
      <Reveal className="mx-auto max-w-[1200px] rounded-lg bg-accent px-8 py-14 text-white md:px-16 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[1.5px] text-white/80">Get in touch</p>
            <h2 className="mt-4 font-display text-[clamp(2.25rem,4.6vw,3.5rem)] font-normal leading-[1.08] tracking-[-0.02em]">
              <SplitWords text="Have a product to build?" /> <SplitWords text="Let's talk." delay={0.15} />
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-white/85">
              Open to software engineering, DevOps and cloud roles.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <motion.a
              href={`mailto:${siteConfig.email}`}
              {...rollingParent}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-md bg-canvas px-6 text-sm font-medium text-ink transition-colors hover:bg-surface-soft"
            >
              <RollingLabel>Email me</RollingLabel>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.a>
            <button
              onClick={copyEmail}
              aria-live="polite"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/40 px-5 text-sm transition-colors hover:bg-white/10"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "done" : "copy"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center gap-2"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : siteConfig.email}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
