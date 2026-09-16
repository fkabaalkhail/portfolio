"use client";

import CaseStudyCard from "@/components/ui/CaseStudyCard";
import { siteConfig } from "@/lib/constants";
import { Eyebrow, Reveal, SectionHeading } from "@/components/motion/primitives";

const tags: Record<string, string[]> = {
  "service-site": ["Next.js", "Booking flow", "Light / dark"],
  "memory-game": ["Web game", "Themes & difficulty"],
  ecommerce: ["Storefront", "Filters"],
  analytics: ["Next.js", "Recharts", "Bilingual"],
};

export default function CaseStudyGrid() {
  return (
    <section id="case-studies" className="scroll-mt-16 border-t border-hairline bg-surface-soft px-5 py-24 md:px-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <Eyebrow>Case studies</Eyebrow>
            <SectionHeading className="mt-4" title="Front-end work," muted="designed, tested and live." />
          </div>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-body lg:pb-2">
              Four web projects built around usability heuristics and user-centred design — each one deployed and
              clickable.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {siteConfig.caseStudies.map((study, i) => (
            <Reveal key={study.id} delay={(i % 2) * 0.08}>
              <CaseStudyCard
                title={study.title}
                imageSrc={study.imageSrc}
                imageAlt={study.imageAlt}
                href={study.href}
                tags={tags[study.id] ?? []}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
