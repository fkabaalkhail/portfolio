"use client";

import { motion } from "framer-motion";
import CaseStudyCard from "@/components/ui/CaseStudyCard";
import { siteConfig } from "@/lib/constants";
import { EASE_OUT, Eyebrow, Reveal, SplitWords } from "@/components/motion/primitives";

const accents = ["bg-sky text-ink", "bg-sun text-ink", "bg-mint text-ink", "bg-plum text-ink"];

export default function CaseStudyGrid() {
  return (
    <section id="case-studies" className="scroll-mt-20 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <Eyebrow className="text-ember">Case studies · SEG3125</Eyebrow>
            </Reveal>
            <h2 className="mt-5 font-display text-[clamp(2.5rem,5.5vw,4.75rem)] font-bold leading-[0.92] tracking-[-0.045em]">
              <SplitWords text="Designed," /> <SplitWords text="tested, live." delay={0.12} wordClassName="font-serif font-normal italic text-ember" />
            </h2>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-muted">
              Four UI projects built around usability heuristics and user-centred design — each one deployed and
              clickable.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {siteConfig.caseStudies.map((study, i) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: (i % 2) * 0.12 }}
              className={i % 2 === 1 ? "md:mt-16" : ""}
            >
              <CaseStudyCard
                title={study.title}
                imageSrc={study.imageSrc}
                imageAlt={study.imageAlt}
                href={study.href}
                index={i}
                accent={accents[i % accents.length]}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
