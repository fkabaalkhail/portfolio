"use client";

import Image from "next/image";

interface ExperienceCardProps {
  company: string;
  role: string;
  period: string;
  achievements: string[];
  logo?: string;
}

export default function ExperienceCard({
  company,
  role,
  period,
  achievements,
  logo,
}: ExperienceCardProps) {
  return (
    <div className="group relative pl-8 md:pl-12 pb-12 last:pb-0">
      {/* Timeline line */}
      <div className="absolute left-[11px] md:left-[19px] top-3 bottom-0 w-[1px] bg-gradient-to-b from-white/20 to-white/5 group-last:hidden" />

      {/* Timeline dot */}
      <div className="absolute left-0 md:left-2 top-2 w-[24px] h-[24px] rounded-full border border-white/20 bg-black flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-white/60" />
      </div>

      {/* Card */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300">
        {/* Header with logo */}
        <div className="flex items-start gap-4 mb-4">
          {logo && (
            <div className="shrink-0 w-10 h-10 rounded-lg bg-white/[0.05] border border-white/[0.08] overflow-hidden flex items-center justify-center">
              <Image
                src={logo}
                alt={`${company} logo`}
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <h3 className="text-lg font-bold text-white">{company}</h3>
              <span className="text-xs font-medium text-white/50 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 w-fit">
                {period}
              </span>
            </div>
            <p className="text-sm font-medium text-white/40 mt-1">{role}</p>
          </div>
        </div>

        {/* Achievements */}
        <ul className="space-y-2.5 mt-4">
          {achievements.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-white/40 leading-relaxed">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-white/30 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
