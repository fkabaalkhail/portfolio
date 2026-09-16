"use client";

import { Eyebrow, Reveal, SplitWords } from "@/components/motion/primitives";
import MrasemShowcase from "@/components/sections/MrasemShowcase";
import MawaqeetShowcase from "@/components/sections/MawaqeetShowcase";

export default function AppsSection() {
  return (
    <section id="apps" className="scroll-mt-20 px-3 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 px-3 md:mb-16 md:px-8">
          <Reveal>
            <Eyebrow className="text-ember">Selected apps</Eyebrow>
          </Reveal>
          <h2 className="mt-5 max-w-4xl font-display text-[clamp(2.5rem,6.5vw,5.75rem)] font-bold leading-[0.92] tracking-[-0.045em]">
            <SplitWords text="Shipped to real phones," />{" "}
            <SplitWords text="not just Figma." delay={0.2} wordClassName="font-serif font-normal italic text-ember" />
          </h2>
        </div>

        <div className="space-y-6 md:space-y-10">
          <MrasemShowcase />
          <MawaqeetShowcase />
        </div>
      </div>
    </section>
  );
}
