"use client";

import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import IPhone from "@/components/ui/IPhone";
import { EASE_OUT, SplitWords, TechLogo } from "@/components/motion/primitives";

const dailyStack = [
  { name: "Swift", icon: "/stack/swift.svg" },
  { name: "Next.js", icon: "/stack/nextjs.svg" },
  { name: "Node.js", icon: "/stack/nodejs.svg" },
  { name: "Python", icon: "/stack/python.svg" },
  { name: "PostgreSQL", icon: "/stack/postgresql.svg" },
  { name: "Docker", icon: "/stack/docker.svg" },
  { name: "Kubernetes", icon: "/stack/kubernetes.svg" },
  { name: "AWS", icon: "/stack/aws.svg" },
];

// illustrative snippet in the shape of the Mrasem booking API
const codeLines: { indent: number; tokens: [string, string][] }[] = [
  { indent: 0, tokens: [["text-[#c792ea]", "router"], ["text-on-dark", ".post("], ["text-[#c3e88d]", "\"/bookings\""], ["text-on-dark", ", auth, "], ["text-[#c792ea]", "async"], ["text-on-dark", " (req, res) => {"]] },
  { indent: 1, tokens: [["text-[#c792ea]", "const"], ["text-on-dark", " { venueId, date, guests } = req.body;"]] },
  { indent: 1, tokens: [["text-[#c792ea]", "const"], ["text-on-dark", " { data, error } = "], ["text-[#c792ea]", "await"], ["text-on-dark", " supabase"]] },
  { indent: 2, tokens: [["text-on-dark", ".from("], ["text-[#c3e88d]", "\"bookings\""], ["text-on-dark", ")"]] },
  { indent: 2, tokens: [["text-on-dark", ".insert({ venueId, date, guests })"]] },
  { indent: 2, tokens: [["text-on-dark", ".select().single();"]] },
  { indent: 1, tokens: [["text-[#c792ea]", "if"], ["text-on-dark", " (error) "], ["text-[#c792ea]", "return"], ["text-on-dark", " res.sendStatus("], ["text-amber", "400"], ["text-on-dark", ");"]] },
  { indent: 1, tokens: [["text-on-dark", "res.status("], ["text-amber", "201"], ["text-on-dark", ").json(data);"]] },
  { indent: 0, tokens: [["text-on-dark", "});"]] },
];

const podRows = [
  ["api-7d9f8c6b5-2xkqp", "1/1", "Running"],
  ["api-7d9f8c6b5-8mzt4", "1/1", "Running"],
  ["worker-5c4b9d7f8-q6wrn", "1/1", "Running"],
];

// layer that floats gently and shifts with the pointer by `depth`
function Layer({
  children,
  className,
  depth,
  sx,
  sy,
  floatY,
  duration,
  delay,
}: {
  children: React.ReactNode;
  className: string;
  depth: number;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  floatY: number;
  duration: number;
  delay: number;
}) {
  const x = useTransform(sx, (v) => v * depth);
  const y = useTransform(sy, (v) => v * depth);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: EASE_OUT, delay }}
      className={className}
    >
      <motion.div style={{ x, y }}>
        <motion.div
          animate={{ y: [0, floatY, 0] }}
          transition={{ duration, repeat: Infinity, ease: "easeInOut", delay: delay + 1 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      className="relative overflow-hidden"
    >
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-5 pb-20 pt-12 md:px-8 md:pt-16 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-2 lg:gap-10 lg:pb-24">
        {/* copy */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className="flex items-center gap-4 text-sm"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.1 }}
              className="h-px w-10 origin-left bg-ink"
            />
            <span className="font-medium text-ink">{siteConfig.role}</span>
            <span className="font-mono text-xs text-muted-soft">45.42° N, 75.70° W</span>
          </motion.div>

          <h1 className="mt-6 font-display text-[clamp(2.5rem,5.6vw,4.25rem)] font-normal leading-[1.04] tracking-[-0.025em] text-ink">
            <SplitWords text="I build products end to end," delay={0.1} />{" "}
            <SplitWords text="from the screen to the cluster." delay={0.3} wordClassName="text-muted-soft" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.55 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-body"
          >
            {siteConfig.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.65 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#about"
              className="group inline-flex h-11 items-center gap-2 rounded-md bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent-active"
            >
              About me
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center rounded-md border border-hairline bg-canvas px-5 text-sm font-medium text-ink transition-colors hover:border-muted-soft"
            >
              GitHub
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-12 border-t border-hairline pt-6"
          >
            <p className="text-xs font-medium uppercase tracking-[1.5px] text-muted-soft">Daily stack</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {dailyStack.map((t) => (
                <span
                  key={t.name}
                  title={t.name}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-hairline bg-canvas"
                >
                  <TechLogo name={t.name} icon={t.icon} size={24} />
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* layered full-stack scene */}
        <motion.div style={{ y: sceneY }} className="relative mx-auto aspect-[1/1.08] w-full max-w-[560px]">
          {/* API code window */}
          <Layer className="absolute left-0 top-[5%] z-10 w-[68%]" depth={-10} sx={sx} sy={sy} floatY={-6} duration={7} delay={0.3}>
            <div className="overflow-hidden rounded-lg bg-dark shadow-[0_30px_60px_-30px_rgba(20,20,19,0.55)]">
              <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-3 rounded-md bg-dark-elevated px-2.5 py-1 font-mono text-[11px] text-on-dark">
                  routes/bookings.ts
                </span>
              </div>
              <div className="bg-dark-soft px-4 py-4 font-mono text-[9px] leading-[1.8] sm:text-[11px]">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.9 + i * 0.12 }}
                    className="flex whitespace-pre"
                  >
                    <span className="mr-3 w-3 select-none text-right text-muted">{i + 1}</span>
                    <span style={{ paddingLeft: `${line.indent * 1.25}em` }}>
                      {line.tokens.map(([cls, txt], j) => (
                        <span key={j} className={cls}>
                          {txt}
                        </span>
                      ))}
                    </span>
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center justify-between bg-dark-elevated px-4 py-1.5 font-mono text-[10px] text-on-dark-soft">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal" /> POST /bookings
                </span>
                <span>201 Created · 42ms</span>
              </div>
            </div>
          </Layer>

          {/* Mawaqeet phone (back) */}
          <Layer className="absolute right-0 top-0 z-0 w-[31%]" depth={14} sx={sx} sy={sy} floatY={10} duration={8} delay={0.45}>
            <div className="rotate-[5deg]">
              <IPhone src="/apps/mawaqeet/prayer.webp" alt="Mawaqeet prayer times in Night Mode" priority sizes="200px" />
            </div>
          </Layer>

          {/* Mrasem phone (front) */}
          <Layer className="absolute right-[9%] top-[31%] z-20 w-[34%]" depth={26} sx={sx} sy={sy} floatY={-12} duration={6.5} delay={0.6}>
            <div className="-rotate-[3deg]">
              <IPhone src="/apps/mrasem/categories.webp" alt="Mrasem category home screen" priority sizes="220px" />
            </div>
          </Layer>

          {/* deploy terminal */}
          <Layer className="absolute bottom-[4%] left-[3%] z-30 w-[52%]" depth={36} sx={sx} sy={sy} floatY={8} duration={7.5} delay={0.75}>
            <div className="overflow-hidden rounded-lg border border-white/10 bg-dark/95 shadow-[0_30px_60px_-24px_rgba(20,20,19,0.6)] backdrop-blur">
              <div className="border-b border-white/5 px-3.5 py-2 font-mono text-[10px] text-on-dark-soft">zsh — prod</div>
              <div className="px-3.5 py-3 font-mono text-[10px] leading-[1.8] text-on-dark sm:text-[11px]">
                <p>
                  <span className="text-accent-soft">$</span> kubectl get pods -n api
                </p>
                <p className="text-muted-soft">NAME{"                    "}READY STATUS</p>
                {podRows.map(([name, ready, status], i) => (
                  <motion.p
                    key={name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.1 + i * 0.25 }}
                    className="whitespace-pre"
                  >
                    {name.padEnd(24, " ")}
                    {ready}
                    {"   "}
                    <span className="text-success">{status}</span>
                  </motion.p>
                ))}
                <p className="mt-1 flex items-center">
                  <span className="text-accent-soft">$</span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="ml-1.5 inline-block h-3 w-1.5 bg-on-dark"
                  />
                </p>
              </div>
            </div>
          </Layer>
        </motion.div>
      </div>
    </section>
  );
}
