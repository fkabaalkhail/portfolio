"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, LayoutGrid, Network, Star, Ticket, Zap } from "lucide-react";
import { appShowcase, siteConfig } from "@/lib/constants";
import IPhone from "@/components/ui/IPhone";
import ArchitectureModal from "@/components/ui/ArchitectureModal";
import { EASE_OUT, Reveal, SplitWords } from "@/components/motion/primitives";

const project = siteConfig.projects.find((p) => p.id === "mrasem")!;
const { features, gallery } = appShowcase.mrasem;
const tabs = ["Explore", "Discover", "Book", "Wallet"];
const chips = [
  { icon: LayoutGrid, label: "4 luxury categories" },
  { icon: Star, label: "Michelin-tagged venues" },
  { icon: Zap, label: "3-step booking" },
  { icon: Ticket, label: "Apple Wallet pass" },
];

export default function MrasemShowcase() {
  const [active, setActive] = useState(0);
  const [archOpen, setArchOpen] = useState(false);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const galleryRef = useRef<HTMLDivElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: dashProgress } = useScroll({ target: dashRef, offset: ["start end", "center center"] });
  const dashRotate = useTransform(dashProgress, [0, 1], [28, 0]);
  const dashScale = useTransform(dashProgress, [0, 1], [0.86, 1]);
  const dashOpacity = useTransform(dashProgress, [0, 0.4], [0.2, 1]);

  return (
    <div className="relative overflow-clip rounded-xl bg-espresso text-on-dark">
      {/* warm glow */}
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-gold/10 blur-[140px]" />

      {/* header */}
      <div className="relative px-6 pt-14 md:px-14 md:pt-20">
        <div className="flex flex-wrap items-center gap-3">
          <Image src="/apps/mrasem/logo.png" alt="Mrasem logo" width={120} height={48} className="h-10 w-auto" />
          <span className="rounded-full border border-gold/30 px-3 py-1 text-xs font-medium uppercase tracking-[1.5px] text-gold">
            01 · iOS + Admin + API
          </span>
        </div>
        <h3 className="mt-8 max-w-3xl font-display text-[clamp(2.25rem,4.6vw,3.5rem)] font-normal leading-[1.08] tracking-[-0.02em]">
          <SplitWords text="Luxury concierge," />{" "}
          <SplitWords text="exclusively Saudi." delay={0.15} wordClassName="text-gold" />
        </h3>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-dark/65">{project.description}</p>
        </Reveal>
      </div>

      {/* sticky scrollytelling */}
      <div className="relative mt-10 grid gap-10 px-6 md:mt-4 md:px-14 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              onViewportEnter={() => setActive(i)}
              viewport={{ amount: 0.6 }}
              className="flex min-h-[46vh] flex-col justify-center py-8 lg:min-h-[78vh]"
            >
              <motion.div
                animate={{ opacity: active === i ? 1 : 0.35 }}
                transition={{ duration: 0.5 }}
                className="max-w-md"
              >
                <span className="font-mono text-sm text-gold">0{i + 1} / 0{features.length}</span>
                <h4 className="mt-3 font-display text-3xl font-normal tracking-[-0.01em] md:text-4xl">{f.title}</h4>
                <p className="mt-4 text-lg leading-relaxed text-on-dark/60">{f.body}</p>
                {/* inline phone on small screens, where the sticky one is hidden */}
                <div className="mt-8 w-[62%] max-w-[260px] lg:hidden">
                  <IPhone src={f.screen} alt={f.title} />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="order-1 hidden lg:order-2 lg:block">
          <div className="sticky top-0 flex h-screen items-center justify-center pb-10">
            <div className="relative w-[300px] xl:w-[330px]">
              <div className="absolute inset-[-12%] -z-0 rounded-full bg-gold/15 blur-3xl" />
              <IPhone>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={features[active].screen}
                    initial={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={features[active].screen}
                      alt={features[active].title}
                      fill
                      sizes="330px"
                      className="object-cover object-top"
                    />
                  </motion.div>
                </AnimatePresence>
              </IPhone>

              {/* callout chip for the active feature */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={chips[active].label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="absolute -right-28 top-[22%] z-20 flex items-center gap-2 whitespace-nowrap rounded-lg bg-gold px-3.5 py-2.5 text-sm font-medium text-espresso shadow-xl"
                >
                  {(() => {
                    const ChipIcon = chips[active].icon;
                    return <ChipIcon className="h-4 w-4" />;
                  })()}
                  {chips[active].label}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* pill tabs with sliding highlight (Flighty / Apple-style) */}
            <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-1 rounded-lg border border-on-dark/10 bg-espresso/80 p-1 backdrop-blur-xl">
              {features.map((f, i) => (
                <button
                  key={f.title}
                  onClick={() => stepRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                  className={`relative rounded-md px-4 py-2 text-sm font-medium transition-colors ${active === i ? "text-espresso" : "text-on-dark/60 hover:text-on-dark"}`}
                >
                  {active === i && (
                    <motion.span
                      layoutId="mrasem-tab"
                      className="absolute inset-0 rounded-md bg-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{tabs[i]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* draggable design gallery */}
      <div className="relative mt-10 md:mt-16">
        <div className="flex flex-wrap items-end justify-between gap-4 px-6 md:px-14">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[1.5px] text-gold">Design system</p>
            <h4 className="mt-2 font-display text-3xl font-normal tracking-[-0.01em] md:text-4xl">
              Every screen, bilingual EN / AR
            </h4>
          </Reveal>
          <p className="font-mono text-xs text-on-dark/40">← drag to explore →</p>
        </div>
        <div ref={galleryRef} className="mt-8 overflow-hidden px-6 pb-4 md:px-14">
          <motion.div
            drag="x"
            dragConstraints={galleryRef}
            dragElastic={0.12}
            className="flex w-max cursor-grab gap-5 active:cursor-grabbing"
          >
            {gallery.map((g, i) => (
              <motion.figure
                key={g.src}
                initial={{ opacity: 0, y: 60, rotate: i % 2 ? 3 : -3 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: EASE_OUT, delay: i * 0.07 }}
                whileHover={{ y: -12 }}
                className="w-[180px] shrink-0 select-none md:w-[220px]"
              >
                <div className="pointer-events-none overflow-hidden rounded-xl border border-on-dark/10 shadow-2xl">
                  <Image
                    src={g.src}
                    alt={`Mrasem ${g.label} screen`}
                    width={440}
                    height={952}
                    draggable={false}
                    className="h-auto w-full"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-on-dark/55">{g.label}</figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>
      </div>

      {/* admin dashboard tilting in */}
      <div ref={dashRef} className="relative mt-16 px-6 [perspective:1600px] md:px-14">
        <motion.div
          style={{ rotateX: dashRotate, scale: dashScale, opacity: dashOpacity }}
          className="mx-auto max-w-5xl origin-bottom overflow-hidden rounded-lg border border-on-dark/10 bg-[#1c130e] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.7)]"
        >
          <div className="flex items-center gap-2 border-b border-on-dark/10 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="mx-auto rounded-md bg-on-dark/5 px-6 py-1 font-mono text-xs text-on-dark/40">
              admin.mrasem · Next.js
            </span>
          </div>
          <Image
            src="/apps/mrasem/admin-dashboard.webp"
            alt="Mrasem admin dashboard built with Next.js"
            width={1600}
            height={1000}
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="h-auto w-full"
          />
        </motion.div>
      </div>

      {/* footer: stack + links */}
      <div className="relative flex flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-14 md:py-16">
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="rounded-full border border-on-dark/15 px-3 py-1.5 text-sm text-on-dark/70">
              {t}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setArchOpen(true)}
            className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-5 h-11 text-sm font-medium text-gold transition-colors hover:bg-gold/10"
          >
            <Network className="h-4 w-4" />
            Architecture
          </button>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-md bg-gold px-5 h-11 text-sm font-medium text-espresso transition-colors hover:bg-gold/90"
          >
            View source
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <ArchitectureModal
        open={archOpen}
        onClose={() => setArchOpen(false)}
        src={project.imageSrc!}
        alt={project.imageAlt!}
      />
    </div>
  );
}
