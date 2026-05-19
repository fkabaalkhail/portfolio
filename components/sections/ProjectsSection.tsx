"use client";

import { useState } from "react";
import { ExternalLink, X } from "lucide-react";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { GridCard } from "@/components/ui/GridCard";
import { siteConfig } from "@/lib/constants";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function ProjectsSection() {
  const [expandedImg, setExpandedImg] = useState<string | null>(null);

  return (
    <SectionWrapper id="projects" className="px-6 py-16 md:py-24">
      <h2 className="text-center text-2xl font-bold text-white md:text-3xl mb-10">Projects</h2>

      <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-2">
        {siteConfig.projects.map((project) => (
          <GridCard key={project.id} className="p-6">
            <div className="relative z-10 flex flex-col h-full">
            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-white/45 text-sm leading-relaxed mb-4 flex-1">
              {project.description}
            </p>

            {project.imageSrc && (
              <button
                onClick={() => setExpandedImg(project.imageSrc || null)}
                className="relative w-full rounded-lg overflow-hidden border border-white/[0.08] hover:border-white/[0.15] transition-colors cursor-zoom-in mb-4"
              >
                <Image
                  src={project.imageSrc}
                  alt={project.imageAlt || `${project.title} architecture`}
                  width={600}
                  height={340}
                  className="w-full h-auto"
                />
              </button>
            )}

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.map((t) => (
                <span key={t} className="inline-block rounded bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 text-xs text-white/50">
                  {t}
                </span>
              ))}
            </div>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors w-fit"
            >
              <GithubIcon className="h-4 w-4" />
              <span>View Source</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        ))}
      </div>

      {/* Fullscreen image modal */}
      {expandedImg && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setExpandedImg(null)}
        >
          <button
            onClick={() => setExpandedImg(null)}
            className="absolute top-6 right-6 text-white/60 hover:text-white"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <Image
            src={expandedImg}
            alt="Architecture diagram"
            width={1400}
            height={800}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      )}
    </SectionWrapper>
  );
}
