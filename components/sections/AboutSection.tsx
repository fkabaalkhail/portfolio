"use client";

import { Mail, TreePine, Aperture, ChessKnight, Trophy } from "lucide-react";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ExperienceCard from "@/components/ui/ExperienceCard";
import { siteConfig } from "@/lib/constants";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function AboutSection() {
  const { education, experiences, skillCategories, interests, github, email } = siteConfig;

  const interestIcons = [
    <TreePine key="hiking" className="h-5 w-5 text-white/50 shrink-0" />,
    <Aperture key="photo" className="h-5 w-5 text-white/50 shrink-0" />,
    <ChessKnight key="chess" className="h-5 w-5 text-white/50 shrink-0" />,
    <Trophy key="football" className="h-5 w-5 text-white/50 shrink-0" />,
  ];

  return (
    <SectionWrapper id="about" className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-4xl space-y-20">

        {/* Education */}
        <div>
          <h2 className="text-center text-2xl font-bold text-white md:text-3xl mb-8">Education</h2>
          <div className="rounded-xl border border-white/[0.08] bg-[#0a0a0a] p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg overflow-hidden bg-white/[0.05] p-1">
                <Image
                  src="/images/uottawa-favicon.png"
                  alt="University of Ottawa logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{education.university}</h3>
                <p className="mt-1 text-white/60 font-medium">{education.program}</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <span className="inline-flex items-center rounded-full bg-white/[0.04] px-3 py-1 text-sm font-medium text-white/50 border border-white/[0.08]">
                    GPA: {education.gpa}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-white/[0.04] px-3 py-1 text-sm font-medium text-white/50 border border-white/[0.08]">
                    Graduating {education.graduationDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div>
          <h2 className="text-center text-2xl font-bold text-white md:text-3xl mb-10">Experience</h2>
          <div className="max-w-3xl mx-auto">
            {experiences.map((exp) => (
              <ExperienceCard
                key={exp.company}
                company={exp.company}
                role={exp.role}
                period={exp.period}
                achievements={exp.achievements}
                logo={exp.logo}
              />
            ))}
          </div>
        </div>

        {/* Skills - Terminal style */}
        <div>
          <h2 className="text-center text-2xl font-bold text-white md:text-3xl mb-8">Skills</h2>
          <div className="rounded-xl border border-white/[0.08] bg-[#0a0a0a] overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#111] border-b border-white/[0.08]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="ml-3 text-xs font-mono text-white/40">fahad@dev:~</span>
            </div>
            {/* Terminal content */}
            <div className="p-6 md:p-8 font-mono text-sm space-y-5">
              {/* Languages */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#28c840]">~</span>
                  <span className="text-white/70">ls ~/languages/</span>
                </div>
                <div className="pl-4 flex flex-wrap gap-1.5">
                  {skillCategories[0]?.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block rounded bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 text-xs text-white/55 hover:border-white/[0.15] hover:text-white/80 transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cloud & DevOps */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#28c840]">~</span>
                  <span className="text-white/70">kubectl get nodes -o wide</span>
                </div>
                <div className="pl-4 flex flex-wrap gap-1.5">
                  {skillCategories[1]?.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block rounded bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 text-xs text-[#87d65a]/70 hover:text-[#87d65a] transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#28c840]">~</span>
                  <span className="text-white/70">docker compose ps --services</span>
                </div>
                <div className="pl-4 flex flex-wrap gap-1.5">
                  {skillCategories[2]?.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block rounded bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 text-xs text-[#61afef]/70 hover:text-[#61afef] transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Monitoring */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#28c840]">~</span>
                  <span className="text-white/70">helm list -n monitoring</span>
                </div>
                <div className="pl-4 flex flex-wrap gap-1.5">
                  {skillCategories[3]?.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block rounded bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 text-xs text-[#e5c07b]/70 hover:text-[#e5c07b] transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Networking */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#28c840]">~</span>
                  <span className="text-white/70">netstat -tulpn | grep LISTEN</span>
                </div>
                <div className="pl-4 flex flex-wrap gap-1.5">
                  {skillCategories[4]?.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block rounded bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 text-xs text-[#c678dd]/70 hover:text-[#c678dd] transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Blinking cursor */}
              <div className="flex items-center gap-2 pt-2">
                <span className="text-[#28c840]">~</span>
                <span className="w-2 h-4 bg-[#28c840]/70 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Interests */}
        <div>
          <h2 className="text-center text-2xl font-bold text-white md:text-3xl mb-8">Interests</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {interests.map((interest, i) => (
              <div
                key={interest}
                className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-[#0a0a0a] px-5 py-4 hover:border-white/[0.12] transition-colors"
              >
                {interestIcons[i]}
                <span className="text-white/50 text-sm">{interest}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="flex justify-center gap-4">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-[#0a0a0a] px-5 py-3 text-white/50 hover:border-white/[0.15] hover:text-white transition-all duration-200"
          >
            <GithubIcon className="h-5 w-5" />
            <span className="font-medium">GitHub</span>
          </a>
          <a
            href={`mailto:${email}`}
            aria-label="Send email"
            className="inline-flex items-center gap-2 rounded-lg border border-white/[0.15] bg-white/[0.06] px-5 py-3 text-white/70 hover:bg-white/[0.1] hover:text-white transition-all duration-200"
          >
            <Mail className="h-5 w-5" />
            <span className="font-medium">Email</span>
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
