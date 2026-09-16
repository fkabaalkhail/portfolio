"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, Database, Layers, Server, Smartphone } from "lucide-react";
import { stackGroups, stackLayers } from "@/lib/constants";
import { EASE_OUT, Eyebrow, Reveal, SectionHeading, TechLogo } from "@/components/motion/primitives";
import { cn } from "@/lib/utils";

const layerIcons = [Smartphone, Server, Database, Layers, Activity];
const shortLabels = ["Client", "API", "Data", "Infra", "Ops"];

export default function StackSection() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  // walk a "request" through each layer until the visitor picks one
  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setActive((i) => (i + 1) % stackLayers.length), 3200);
    return () => clearInterval(id);
  }, [auto]);

  const layer = stackLayers[active];
  const progress = active / (stackLayers.length - 1);

  return (
    <section id="stack" className="scroll-mt-16 px-5 py-24 md:px-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <Eyebrow>The stack</Eyebrow>
            <SectionHeading className="mt-4" title="Full-stack, in production." muted="Every layer I've shipped." />
          </div>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-body lg:pb-2">
              From the tap on a SwiftUI button to the pod that serves it — this is where I&apos;ve done the work, and
              the tools I reach for at each layer.
            </p>
          </Reveal>
        </div>

        {/* architecture walkthrough */}
        <Reveal delay={0.1} className="mt-12 overflow-hidden rounded-xl bg-dark text-on-dark">
          <div className="relative px-5 pb-6 pt-8 md:px-10 md:pt-10">
            <div className="relative grid grid-cols-5 gap-2">
              {/* connector track + accent fill */}
              <div className="absolute left-[10%] right-[10%] top-6 h-px bg-white/10 md:top-7" />
              <motion.div
                className="absolute left-[10%] top-6 h-px origin-left bg-accent md:top-7"
                animate={{ width: `${progress * 80}%` }}
                transition={{ duration: 0.8, ease: EASE_OUT }}
              />
              <motion.span
                className="absolute top-6 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_0_4px_rgba(143,156,255,0.3)] md:top-7"
                animate={{ left: `${10 + progress * 80}%` }}
                transition={{ duration: 0.8, ease: EASE_OUT }}
              />

              {stackLayers.map((l, i) => {
                const Icon = layerIcons[i];
                const isActive = i === active;
                const isPast = i < active;
                return (
                  <button
                    key={l.id}
                    onClick={() => {
                      setAuto(false);
                      setActive(i);
                    }}
                    aria-pressed={isActive}
                    className="group relative flex flex-col items-center text-center"
                  >
                    <span
                      className={cn(
                        "relative z-10 flex h-12 w-12 items-center justify-center rounded-lg border transition-colors duration-500 md:h-14 md:w-14",
                        isActive
                          ? "border-accent bg-accent text-white"
                          : isPast
                            ? "border-accent-soft/40 bg-dark-elevated text-accent-soft"
                            : "border-white/10 bg-dark-elevated text-on-dark-soft group-hover:text-on-dark"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span
                      className={cn(
                        "mt-3 text-xs font-medium transition-colors md:text-sm",
                        isActive ? "text-on-dark" : "text-on-dark-soft"
                      )}
                    >
                      <span className="md:hidden">{shortLabels[i]}</span>
                      <span className="hidden md:inline">{l.label}</span>
                    </span>
                    <span className="mt-0.5 hidden text-xs text-on-dark-soft/70 md:block">{l.summary}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="min-h-[340px] border-t border-white/5 bg-dark-soft px-5 py-8 sm:min-h-[260px] md:min-h-[170px] md:px-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center"
              >
                <div>
                  <p className="text-sm text-on-dark-soft">{layer.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {layer.items.map((item, i) => (
                      <motion.span
                        key={item.name}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + i * 0.05 }}
                        className="flex items-center gap-2 rounded-lg bg-canvas px-3 py-2 text-sm font-medium text-ink"
                      >
                        <TechLogo name={item.name} icon={item.icon} size={20} />
                        {item.name}
                      </motion.span>
                    ))}
                  </div>
                </div>
                <ul className="space-y-3">
                  {layer.work.map((w) => (
                    <li key={w} className="flex gap-3 text-on-dark">
                      <span className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-accent-soft" />
                      <span className="leading-relaxed">{w}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* logo wall */}
        <div className="mt-16 space-y-10">
          {stackGroups.map((group, g) => (
            <div key={group.label} className="grid gap-4 border-t border-hairline pt-6 lg:grid-cols-[220px_1fr]">
              <Reveal>
                <h3 className="text-base font-medium text-ink">{group.label}</h3>
                <p className="text-sm text-muted-soft">{group.items.length} tools</p>
              </Reveal>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {group.items.map((item, i) => (
                  <motion.div
                    key={`${group.label}-${item.name}`}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, ease: EASE_OUT, delay: g * 0.02 + i * 0.03 }}
                    className="flex items-center gap-3 rounded-lg border border-hairline bg-canvas px-3.5 py-3 transition-colors hover:border-muted-soft"
                  >
                    <TechLogo name={item.name} icon={item.icon} size={26} />
                    <span className="text-sm font-medium leading-tight text-ink">{item.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
