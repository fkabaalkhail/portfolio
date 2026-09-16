"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { siteConfig } from "@/lib/constants";
import { EASE_OUT, Eyebrow, Reveal, SectionHeading } from "@/components/motion/primitives";

export default function ExperienceSection() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="experience" className="scroll-mt-16 border-t border-hairline bg-surface-soft px-5 py-24 md:px-8">
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>Experience</Eyebrow>
          <SectionHeading className="mt-4" title="Where I've" muted="shipped." />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-body">
              Kubernetes, data platforms, APIs and cloud cost — from a global telecom to early-stage startups.
            </p>
          </Reveal>
        </div>

        <ol ref={listRef} className="relative space-y-4 pl-8 md:pl-10">
          <span className="absolute bottom-6 left-[7px] top-6 w-px bg-hairline md:left-[11px]" />
          <motion.span
            style={{ scaleY: lineScale }}
            className="absolute bottom-6 left-[7px] top-6 w-px origin-top bg-accent md:left-[11px]"
          />

          {siteConfig.experiences.map((exp, i) => (
            <motion.li
              key={exp.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: i * 0.05 }}
              className="relative"
            >
              <span className="absolute -left-8 top-9 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-accent bg-canvas md:-left-10 md:h-[23px] md:w-[23px]">
                <span className="h-[5px] w-[5px] rounded-full bg-accent md:h-[7px] md:w-[7px]" />
              </span>
              <div className="rounded-lg border border-hairline bg-canvas p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {exp.logo && (
                      <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg border border-hairline bg-white p-1.5">
                        <Image src={exp.logo} alt={`${exp.company} logo`} width={32} height={32} className="object-contain" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-display text-2xl tracking-[-0.01em] text-ink">{exp.company}</h3>
                      <p className="text-sm text-muted">{exp.role}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-surface-card px-3 py-1 text-[13px] font-medium text-ink">{exp.period}</span>
                </div>
                <ul className="mt-6 space-y-3 border-t border-hairline-soft pt-5">
                  {exp.achievements.map((a) => (
                    <li key={a} className="flex gap-3 leading-relaxed text-body">
                      <span className="mt-[11px] h-px w-3 shrink-0 bg-accent" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
