"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import CaseStudyCard from "@/components/ui/CaseStudyCard";
import { siteConfig } from "@/lib/constants";

export default function CaseStudyGrid() {
  return (
    <SectionWrapper id="case-studies" className="px-6 py-16 md:py-24">
      <h2 className="mb-10 text-center text-3xl font-bold text-white">
        Case Studies
      </h2>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        {siteConfig.caseStudies.map((study) => (
          <CaseStudyCard
            key={study.id}
            title={study.title}
            imageSrc={study.imageSrc}
            imageAlt={study.imageAlt}
            href={study.href}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
