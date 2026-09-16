"use client";

import { motion } from "framer-motion";
import { Accessibility, ArrowUpRight, Eye, MonitorSmartphone } from "lucide-react";
import { EASE_OUT, Eyebrow, Reveal, SplitWords } from "@/components/motion/primitives";

const steps = ["Understand", "Prototype", "Feedback", "Ship", "Iterate"];

const principles = [
  {
    icon: Eye,
    title: "Visual Communication",
    body: "Using color, typography, and spacing to guide users through content and convey meaning without relying on text alone.",
  },
  {
    icon: Accessibility,
    title: "Accessibility",
    body: "Making sure interfaces work for everyone. Proper contrast, keyboard nav, semantic HTML, and screen reader support.",
  },
  {
    icon: MonitorSmartphone,
    title: "Responsive Design",
    body: "Building layouts that work across all screen sizes without breaking.",
  },
];

function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-0.5 font-semibold text-ink underline decoration-ember decoration-2 underline-offset-4 transition-colors hover:text-ember"
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5" />
    </a>
  );
}

export default function WorkflowSection() {
  return (
    <section id="workflow" className="scroll-mt-20 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow className="text-ember">How I work</Eyebrow>
        </Reveal>
        <h2 className="mt-5 max-w-4xl font-display text-[clamp(2.5rem,5.5vw,4.75rem)] font-bold leading-[0.92] tracking-[-0.045em]">
          <SplitWords text="Small loops," /> <SplitWords text="fast feedback." delay={0.15} wordClassName="font-serif font-normal italic text-ember" />
        </h2>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {/* development process */}
          <Reveal className="rounded-[2rem] bg-ink p-8 text-paper md:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-sun">Development Process</p>
            <p className="mt-5 text-lg leading-relaxed text-paper/75">
              I take an iterative approach to building things. I start by understanding the problem, then prototype
              quickly and get feedback early. I use Git for version control, set up CI/CD pipelines for automated
              deployments, and keep environments reproducible with infrastructure-as-code.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-2">
              {steps.map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.2 + i * 0.12 }}
                  className="flex items-center gap-2"
                >
                  <span className="rounded-full border border-paper/15 px-3.5 py-1.5 font-mono text-xs">{step}</span>
                  {i < steps.length - 1 && (
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2 }}
                      className="text-sun"
                    >
                      →
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>
          </Reveal>

          {/* what i'm learning */}
          <Reveal delay={0.1} className="relative overflow-hidden rounded-[2rem] bg-sun p-8 text-ink md:p-10">
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[36px] border-ember/25"
            />
            <p className="relative font-mono text-xs uppercase tracking-[0.2em] text-ink/70">What I&apos;m Learning</p>
            <p className="relative mt-5 text-lg leading-relaxed text-ink/80">
              Currently taking{" "}
              <InlineLink href="https://catalogue.uottawa.ca/en/courses/seg/">
                SEG3125 - Analysis and Design of User Interfaces
              </InlineLink>{" "}
              at uOttawa. Topics include visual communication, usability heuristics, and user-centered design. I also
              reference material from the <InlineLink href="https://www.nngroup.com/">Nielsen Norman Group (NN/g)</InlineLink>{" "}
              for usability research and interaction design best practices.
            </p>
          </Reveal>

          {/* design principles */}
          <div className="grid gap-4 md:grid-cols-3 lg:col-span-2">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: EASE_OUT, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group rounded-[2rem] border border-ink/10 bg-paper p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cream text-ember transition-colors duration-300 group-hover:bg-ember group-hover:text-white">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs text-muted">Design principle 0{i + 1}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
