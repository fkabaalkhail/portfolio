"use client";

import { Eyebrow, Reveal, SectionHeading } from "@/components/motion/primitives";
import MrasemShowcase from "@/components/sections/MrasemShowcase";
import LapelShowcase from "@/components/sections/LapelShowcase";
import MawaqeetShowcase from "@/components/sections/MawaqeetShowcase";

export default function AppsSection() {
  return (
    <section id="apps" className="scroll-mt-16 px-3 py-24 md:px-6">
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto mb-12 grid max-w-[1200px] gap-6 px-2 md:px-5 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <Eyebrow>Side projects</Eyebrow>
            <SectionHeading className="mt-4" title="Built on the side," muted="shipped like production." />
          </div>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-body lg:pb-2">
              iOS apps I build in my own time. Each one gets the full treatment — its own API, database, auth and
              deployment — which keeps my backend and infrastructure skills sharp outside work.
            </p>
          </Reveal>
        </div>

        <div className="space-y-4 md:space-y-6">
          <MrasemShowcase />
          <LapelShowcase />
          <MawaqeetShowcase />
        </div>
      </div>
    </section>
  );
}
