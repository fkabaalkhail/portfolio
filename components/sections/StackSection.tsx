"use client";

import { motion } from "framer-motion";
import { stackGroups } from "@/lib/constants";
import { EASE_OUT, Eyebrow, Reveal, SectionHeading, TechLogo } from "@/components/motion/primitives";

export default function StackSection() {
  return (
    <section id="stack" className="scroll-mt-16 px-5 py-24 md:px-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <Eyebrow>The stack</Eyebrow>
            <SectionHeading className="mt-4" title="The toolbox." muted="What I reach for, layer by layer." />
          </div>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-body lg:pb-2">
              Languages, frameworks, cloud and tooling I&apos;ve used in production at work and in my own projects.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 space-y-10">
          {stackGroups.map((group, g) => (
            <div key={group.label} className="grid gap-4 border-t border-hairline pt-6 lg:grid-cols-[220px_1fr]">
              <Reveal>
                <h3 className="text-base font-medium text-ink">{group.label}</h3>
                <p className="text-sm text-muted-soft">{group.items.length} tools</p>
              </Reveal>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {group.items.map((item, i) => (
                  <motion.div
                    key={`${group.label}-${item.name}`}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, ease: EASE_OUT, delay: g * 0.02 + i * 0.03 }}
                    className="flex items-center gap-3 rounded-lg border border-hairline bg-canvas px-3.5 py-3 transition-colors hover:border-muted-soft"
                  >
                    <TechLogo name={item.name} icon={item.icon} size={26} />
                    <span className="text-sm font-medium leading-tight text-ink">{item.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
