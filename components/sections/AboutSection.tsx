"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Aperture, ChessKnight, TreePine, Trophy } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { CountUp, EASE_OUT, Eyebrow, Reveal, SplitWords } from "@/components/motion/primitives";
import { cn } from "@/lib/utils";

const interestIcons = [TreePine, Aperture, ChessKnight, Trophy];
const categoryStyles = [
  { card: "bg-sun", chip: "bg-ink/10 text-ink", prompt: "ls ~/languages" },
  { card: "bg-sky", chip: "bg-ink/10 text-ink", prompt: "kubectl get nodes" },
  { card: "bg-mint", chip: "bg-ink/10 text-ink", prompt: "docker compose ps" },
  { card: "bg-plum", chip: "bg-ink/10 text-ink", prompt: "helm list -n monitoring" },
  { card: "bg-ember text-white", chip: "bg-white/20 text-white", prompt: "netstat -tulpn" },
];

function Tile({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay }}
      whileHover={{ y: -6 }}
      className={cn("relative overflow-hidden rounded-[2rem] p-7 md:p-8", className)}
    >
      {children}
    </motion.div>
  );
}

export default function AboutSection() {
  const { education, skillCategories, interests } = siteConfig;

  return (
    <section id="about" className="scroll-mt-20 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow className="text-ember">About</Eyebrow>
        </Reveal>
        <h2 className="mt-5 max-w-4xl font-display text-[clamp(2.5rem,5.5vw,4.75rem)] font-bold leading-[0.92] tracking-[-0.045em]">
          <SplitWords text="Infra brain," /> <SplitWords text="product heart." delay={0.15} wordClassName="font-serif font-normal italic text-ember" />
        </h2>

        <div className="mt-12 grid auto-rows-auto gap-4 md:grid-cols-6">
          {/* education */}
          <Tile className="bg-ink text-paper md:col-span-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5">
                <Image src="/images/uottawa-favicon.png" alt="University of Ottawa logo" width={44} height={44} className="object-contain" />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-sun">Education</p>
                <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{education.university}</h3>
              </div>
            </div>
            <p className="mt-6 text-lg text-paper/70">{education.program}</p>
            <div className="mt-10 flex flex-wrap items-end gap-10">
              <div>
                <CountUp to={3.9} decimals={1} className="font-display text-7xl font-bold tracking-tighter text-sun md:text-8xl" />
                <p className="mt-1 text-sm text-paper/50">GPA out of 4.0</p>
              </div>
              <div>
                <span className="font-display text-7xl font-bold tracking-tighter md:text-8xl">
                  &apos;{education.graduationDate.slice(2)}
                </span>
                <p className="mt-1 text-sm text-paper/50">Graduating {education.graduationDate}</p>
              </div>
            </div>
          </Tile>

          {/* impact stats */}
          <Tile className="flex flex-col justify-between bg-ember text-white md:col-span-2" delay={0.08}>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/80">Impact</p>
            <div className="mt-8 space-y-6">
              <div>
                <CountUp to={35} suffix="%" className="font-display text-6xl font-bold tracking-tighter" />
                <p className="text-sm text-white/80">lower data access latency at Ericsson</p>
              </div>
              <div>
                <CountUp to={30} suffix="%" className="font-display text-6xl font-bold tracking-tighter" />
                <p className="text-sm text-white/80">cloud compute spend cut at HAMS.AI</p>
              </div>
            </div>
          </Tile>

          {/* skills */}
          {skillCategories.map((cat, i) => {
            const style = categoryStyles[i % categoryStyles.length];
            return (
              <Tile
                key={cat.name}
                delay={0.05 * i}
                className={cn(style.card, "text-ink", i < 2 ? "md:col-span-3" : "md:col-span-2")}
              >
                <p className="font-mono text-xs opacity-70">
                  <span className="opacity-60">~ $</span> {style.prompt}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">{cat.name}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {cat.skills.map((skill, j) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.2 + j * 0.035 }}
                      whileHover={{ scale: 1.08, rotate: j % 2 ? 2 : -2 }}
                      className={cn("cursor-default rounded-full px-3 py-1.5 text-sm font-medium", style.chip)}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </Tile>
            );
          })}

          {/* interests */}
          <Tile className="border border-ink/10 bg-paper md:col-span-6" delay={0.1}>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">Off the keyboard</p>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">Interests</h3>
              </div>
              <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:max-w-3xl lg:grid-cols-4">
                {interests.map((interest, i) => {
                  const Icon = interestIcons[i % interestIcons.length];
                  return (
                    <motion.div
                      key={interest}
                      whileHover="hover"
                      className="flex items-center gap-3 rounded-2xl bg-cream px-4 py-3"
                    >
                      <motion.span
                        variants={{ hover: { rotate: [0, -14, 12, -6, 0], scale: 1.15 } }}
                        transition={{ duration: 0.6 }}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink text-sun"
                      >
                        <Icon className="h-4 w-4" />
                      </motion.span>
                      <span className="text-sm text-ink/75">{interest}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Tile>
        </div>
      </div>
    </section>
  );
}
