"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Aperture, Award, ChessKnight, TreePine, Trophy } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { CountUp, EASE_OUT, Eyebrow, Reveal, SectionHeading } from "@/components/motion/primitives";

const interestIcons = [TreePine, Aperture, ChessKnight, Trophy];

const impact = [
  { value: 35, suffix: "%", label: "lower data access latency", where: "Ericsson" },
  { value: 30, suffix: "%", label: "cloud compute spend cut", where: "HAMS.AI" },
  { value: 99.5, suffix: "%", decimals: 1, label: "service uptime on AWS", where: "Moneymoon" },
  { value: 60, suffix: "%", label: "faster provisioning with Terraform", where: "Moneymoon" },
];

export default function AboutSection() {
  const { education, interests } = siteConfig;

  return (
    <section id="about" className="scroll-mt-16 border-t border-hairline bg-surface-soft px-5 py-24 md:px-8">
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        {/* bio */}
        <div>
          <Eyebrow>About me</Eyebrow>
          <SectionHeading className="mt-4" title="Infrastructure first," muted="then all the way up the stack." />
          <Reveal delay={0.1} className="mt-8 space-y-5 text-lg leading-relaxed text-body">
            <p>
              I&apos;m Fahad, a software engineer based in Ottawa. I started on the infrastructure side — standing up
              GKE clusters, writing Terraform modules and wiring monitoring stacks — and kept moving up until I was
              shipping the products themselves.
            </p>
            <p>
              Today I work on Kubernetes and data platforms at Ericsson. Alongside that I design and build iOS products
              like Mrasem and Mawaqeet, owning everything from the SwiftUI screens to the APIs, databases and
              deployments behind them.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-10">
            <p className="text-xs font-medium uppercase tracking-[1.5px] text-muted-soft">Away from the keyboard</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {interests.map((interest, i) => {
                const Icon = interestIcons[i % interestIcons.length];
                return (
                  <li key={interest} className="flex items-center gap-3 rounded-lg border border-hairline bg-canvas px-4 py-3">
                    <Icon className="h-4 w-4 shrink-0 text-coral" />
                    <span className="text-sm text-body">{interest}</span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        {/* education + impact */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="rounded-lg bg-surface-card p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-canvas p-1.5">
                  <Image src="/images/uottawa-favicon.png" alt="University of Ottawa logo" width={40} height={40} className="object-contain" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-ink">{education.university}</h3>
                  <p className="text-sm text-muted">{education.program}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-coral px-3 py-1 text-xs font-medium uppercase tracking-[1.5px] text-white">
                <Award className="h-3.5 w-3.5" />
                {education.honors}
              </span>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-hairline pt-6">
              <div>
                <CountUp to={3.9} decimals={1} className="font-display text-5xl tracking-[-0.02em] text-ink" />
                <p className="mt-1 text-sm text-muted">GPA out of 4.0</p>
              </div>
              <div>
                <p className="font-display text-5xl tracking-[-0.02em] text-ink">{education.graduationDate}</p>
                <p className="mt-1 text-sm text-muted">Graduated</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.08 }}
            className="rounded-lg bg-dark p-8 text-on-dark"
          >
            <p className="text-xs font-medium uppercase tracking-[1.5px] text-on-dark-soft">Measured impact</p>
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8">
              {impact.map((item) => (
                <div key={item.label}>
                  <CountUp
                    to={item.value}
                    decimals={item.decimals ?? 0}
                    suffix={item.suffix}
                    className="font-display text-4xl tracking-[-0.02em] md:text-5xl"
                  />
                  <p className="mt-1 text-sm text-on-dark">{item.label}</p>
                  <p className="font-mono text-xs text-on-dark-soft">{item.where}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
