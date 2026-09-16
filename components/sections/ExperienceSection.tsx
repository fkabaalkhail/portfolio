"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { siteConfig } from "@/lib/constants";
import { EASE_OUT, Eyebrow, Reveal, SplitWords } from "@/components/motion/primitives";

const accents = ["bg-sky", "bg-sun", "bg-mint"];

export default function ExperienceSection() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="experience" className="scroll-mt-20 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <Eyebrow className="text-ember">Experience</Eyebrow>
          </Reveal>
          <h2 className="mt-5 font-display text-[clamp(2.5rem,5.5vw,4.75rem)] font-bold leading-[0.92] tracking-[-0.045em]">
            <SplitWords text="Where I've" />
            <br />
            <SplitWords text="shipped." delay={0.12} wordClassName="font-serif font-normal italic text-ember" />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
              Kubernetes, data platforms and cloud cost — from a global telecom to early-stage AI startups.
            </p>
          </Reveal>
        </div>

        <ol ref={listRef} className="relative space-y-6 pl-10 md:pl-14">
          {/* track + scroll-drawn line */}
          <span className="absolute bottom-4 left-[11px] top-4 w-[2px] rounded-full bg-ink/10 md:left-[19px]" />
          <motion.span
            style={{ scaleY: lineScale }}
            className="absolute bottom-4 left-[11px] top-4 w-[2px] origin-top rounded-full bg-gradient-to-b from-ember via-sun to-plum md:left-[19px]"
          />

          {siteConfig.experiences.map((exp, i) => (
            <motion.li
              key={exp.company}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
              className="relative"
            >
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.2 }}
                className={`absolute -left-10 top-8 flex h-6 w-6 items-center justify-center rounded-full border-4 border-cream ${accents[i % accents.length]} md:-left-[3.1rem]`}
              />
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group rounded-3xl border border-ink/10 bg-paper p-6 shadow-[0_1px_0_rgba(23,18,13,0.04)] transition-shadow hover:shadow-[0_24px_60px_-24px_rgba(23,18,13,0.25)] md:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {exp.logo && (
                      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-ink/10 bg-white p-1.5">
                        <Image src={exp.logo} alt={`${exp.company} logo`} width={36} height={36} className="object-contain" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-display text-2xl font-bold tracking-tight">{exp.company}</h3>
                      <p className="text-muted">{exp.role}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-3 py-1 font-mono text-xs text-ink ${accents[i % accents.length]}`}>
                    {exp.period}
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  {exp.achievements.map((a) => (
                    <li key={a} className="flex gap-3 leading-relaxed text-ink/75">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
