"use client";

import { motion } from "framer-motion";
import { Activity, Check, Gauge, Workflow } from "lucide-react";
import { EASE_OUT, Eyebrow, Reveal, SectionHeading } from "@/components/motion/primitives";

const pipeline = [
  { step: "git push", detail: "feature branch, small PR" },
  { step: "ci", detail: "lint · test · build" },
  { step: "image", detail: "docker build & push" },
  { step: "deploy", detail: "terraform · kubectl rollout" },
  { step: "observe", detail: "grafana dashboards & alerts" },
];

const principles = [
  {
    icon: Workflow,
    title: "Automate the repeatable",
    body: "Infrastructure lives in Terraform and ships through CI/CD — Terraform modules cut provisioning time by 60% at Moneymoon.",
  },
  {
    icon: Activity,
    title: "Observable before it's live",
    body: "Dashboards and alerts go in with the service, not after the first incident — like the VictoriaMetrics and Grafana stack at HAMS.AI.",
  },
  {
    icon: Gauge,
    title: "Measure, then optimise",
    body: "Changes are backed by numbers: 35% lower data access latency, 20% faster APIs, 30% less cloud spend.",
  },
];

export default function WorkflowSection() {
  return (
    <section id="workflow" className="scroll-mt-16 px-5 py-24 md:px-8">
      <div className="mx-auto max-w-[1200px]">
        <Eyebrow>How I work</Eyebrow>
        <SectionHeading className="mt-4 max-w-3xl" title="Small loops," muted="fast feedback, reproducible everything." />

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.25fr_1fr]">
          {/* delivery pipeline */}
          <Reveal className="overflow-hidden rounded-lg bg-dark text-on-dark">
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-3">
              <span className="font-mono text-xs text-on-dark-soft">.github/workflows/deploy.yml</span>
              <span className="flex items-center gap-1.5 font-mono text-xs text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" /> passing
              </span>
            </div>
            <ol className="bg-dark-soft px-6 py-6">
              {pipeline.map((p, i) => (
                <motion.li
                  key={p.step}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.15 + i * 0.18 }}
                  className="relative flex items-center gap-4 py-2.5"
                >
                  {i < pipeline.length - 1 && <span className="absolute left-[11px] top-9 h-5 w-px bg-white/10" />}
                  <motion.span
                    initial={{ scale: 0.4, backgroundColor: "rgba(250,249,245,0.08)" }}
                    whileInView={{ scale: 1, backgroundColor: "rgba(93,184,114,1)" }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.35, delay: 0.35 + i * 0.18 }}
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-dark"
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </motion.span>
                  <span className="w-20 font-mono text-sm text-on-dark">{p.step}</span>
                  <span className="font-mono text-xs text-on-dark-soft">{p.detail}</span>
                </motion.li>
              ))}
            </ol>
            <p className="border-t border-white/5 px-6 py-5 leading-relaxed text-on-dark-soft">
              I start by understanding the problem, prototype quickly and get feedback early. Everything lives in Git,
              ships through CI/CD, and environments stay reproducible with infrastructure-as-code.
            </p>
          </Reveal>

          {/* principles */}
          <div className="grid gap-4">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={0.08 * i} className="rounded-lg bg-surface-card p-7">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-canvas text-accent">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-medium text-ink">{p.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-body">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
