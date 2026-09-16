"use client";

import { Eyebrow, Reveal, SectionHeading } from "@/components/motion/primitives";
import MrasemShowcase from "@/components/sections/MrasemShowcase";
import MawaqeetShowcase from "@/components/sections/MawaqeetShowcase";

export default function AppsSection() {
  return (
    <section id="apps" className="scroll-mt-16 px-3 py-24 md:px-6">
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto mb-12 grid max-w-[1200px] gap-6 px-2 md:px-5 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <Eyebrow>Selected apps</Eyebrow>
            <SectionHeading className="mt-4" title="Shipped to real phones," muted="with the backends to match." />
          </div>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-body lg:pb-2">
              Two iOS products I designed and built end to end — native SwiftUI clients, their APIs and data, and the
              admin tooling around them.
            </p>
          </Reveal>
        </div>

        <div className="space-y-4 md:space-y-6">
          <MrasemShowcase />
          <MawaqeetShowcase />
        </div>
      </div>
    </section>
  );
}
