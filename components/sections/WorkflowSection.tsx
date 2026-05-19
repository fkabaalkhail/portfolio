"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { ExternalLink } from "lucide-react";

export default function WorkflowSection() {
  return (
    <SectionWrapper id="workflow" className="py-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          How I Work
        </h2>

        <div className="space-y-10">
          {/* Dev process */}
          <div className="rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-8">
            <h3 className="text-lg font-semibold text-white mb-3">Development Process</h3>
            <p className="text-white/55 leading-relaxed text-sm">
              I take an iterative approach to building things. I start by understanding the problem,
              then prototype quickly and get feedback early. I use Git for version control, set up
              CI/CD pipelines for automated deployments, and keep environments reproducible
              with infrastructure-as-code.
            </p>
          </div>

          {/* What im learning */}
          <div className="rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-8">
            <h3 className="text-lg font-semibold text-white mb-3">What I&apos;m Learning</h3>
            <p className="text-white/55 leading-relaxed text-sm">
              Currently taking{" "}
              <a
                href="https://catalogue.uottawa.ca/en/courses/seg/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white/60 transition-colors inline-flex items-center gap-1"
              >
                SEG3125 - Analysis and Design of User Interfaces
                <ExternalLink className="w-3 h-3" />
              </a>{" "}
              at uOttawa. Topics include visual communication, usability heuristics, and user-centered design.
              I also reference material from the{" "}
              <a
                href="https://www.nngroup.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white/60 transition-colors inline-flex items-center gap-1"
              >
                Nielsen Norman Group (NN/g)
                <ExternalLink className="w-3 h-3" />
              </a>{" "}
              for usability research and interaction design best practices.
            </p>
          </div>

          {/* Design principles */}
          <div className="rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-8">
            <h3 className="text-lg font-semibold text-white mb-4">Design Principles</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
                <div>
                  <span className="font-medium text-white/70 text-sm">Visual Communication</span>
                  <p className="text-white/40 mt-1 text-sm">
                    Using color, typography, and spacing to guide users through content and convey meaning without relying on text alone.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
                <div>
                  <span className="font-medium text-white/70 text-sm">Accessibility</span>
                  <p className="text-white/40 mt-1 text-sm">
                    Making sure interfaces work for everyone. Proper contrast, keyboard nav, semantic HTML, and screen reader support.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
                <div>
                  <span className="font-medium text-white/70 text-sm">Responsive Design</span>
                  <p className="text-white/40 mt-1 text-sm">
                    Building layouts that work across all screen sizes without breaking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
