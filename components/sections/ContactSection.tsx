"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { Magnetic, SplitWords } from "@/components/motion/primitives";

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
    <section id="contact" className="scroll-mt-20 px-3 pb-6 pt-10 md:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-ember px-6 py-20 text-white md:rounded-[3rem] md:px-14 md:py-28">
        <motion.div
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-[conic-gradient(from_0deg,#ffc857,#b792f2,#ff5b2e,#ffc857)] opacity-50 blur-3xl"
        />
        <div className="relative">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/80">Get in touch</p>
          <h2 className="mt-5 max-w-5xl font-display text-[clamp(3rem,9vw,8.5rem)] font-bold leading-[0.88] tracking-[-0.05em]">
            <SplitWords text="Let's build" />
            <br />
            <SplitWords text="something good." delay={0.15} wordClassName="font-serif font-normal italic" />
          </h2>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href={`mailto:${siteConfig.email}`}
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-lg font-semibold text-paper"
              >
                <Mail className="h-5 w-5" />
                Email me
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-4 font-mono text-sm transition-colors hover:bg-white/10"
              aria-live="polite"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "done" : "copy"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center gap-2"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : siteConfig.email}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
