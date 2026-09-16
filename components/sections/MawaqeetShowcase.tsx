"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, CalendarDays, CheckCircle2, Compass, CreditCard, Languages, Network, Sunrise } from "lucide-react";
import { appShowcase, siteConfig } from "@/lib/constants";
import IPhone from "@/components/ui/IPhone";
import ArchitectureModal from "@/components/ui/ArchitectureModal";
import { EASE_OUT, Reveal, SplitWords } from "@/components/motion/primitives";

const project = siteConfig.projects.find((p) => p.id === "mawaqeet")!;
const { prayer, prayerArabic, qibla, tracker } = appShowcase.mawaqeet.screens;

const features = [
  { icon: Sunrise, title: "Prayer engine", body: "ISNA & Umm Al-Qura calculation methods from solar position." },
  { icon: Compass, title: "Qibla compass", body: "CoreMotion heading with live direction to Makkah." },
  { icon: CalendarDays, title: "Hijri calendar", body: "Maghrib-based date transitions with ±2 day correction." },
  { icon: CheckCircle2, title: "Prayer tracker", body: "Mark each prayer complete and review a 7-day trend." },
  { icon: CreditCard, title: "Stripe + Apple Pay", body: "Dockerised Node/Express backend for support payments." },
  { icon: Languages, title: "Arabic / English", body: "Full localisation with right-to-left layouts." },
];

// deterministic star field so server and client render the same markup
const stars = Array.from({ length: 60 }, (_, i) => ({
  left: (i * 53.7) % 100,
  top: (i * 31.3) % 100,
  size: (i % 3) + 1,
  delay: (i % 10) * 0.35,
}));

export default function MawaqeetShowcase() {
  const [archOpen, setArchOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [autoplay, setAutoplay] = useState(true);

  // flip the centre phone between English and Arabic until the visitor picks one
  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => setLang((l) => (l === "en" ? "ar" : "en")), 3200);
    return () => clearInterval(id);
  }, [autoplay]);
  const fanRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: fanRef, offset: ["start end", "center center"] });

  // phones start stacked and fan out as the section scrolls in
  const leftX = useTransform(scrollYProgress, [0, 1], ["45%", "0%"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["-45%", "0%"]);
  const leftRotate = useTransform(scrollYProgress, [0, 1], [0, -8]);
  const rightRotate = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const sideY = useTransform(scrollYProgress, [0, 1], [60, 40]);
  const centerY = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const moonY = useTransform(scrollYProgress, [0, 1], [120, -40]);

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-night via-[#0b2438] to-[#0f2c46] text-[#f8f9fa]">
      {/* star field */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute animate-twinkle rounded-full bg-white"
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
          />
        ))}
      </div>
      {/* moon glow */}
      <motion.div
        aria-hidden
        style={{ y: moonY }}
        className="pointer-events-none absolute right-6 top-6 h-16 w-16 rounded-full bg-gradient-to-br from-[#fff4d8] to-peach opacity-80 shadow-[0_0_80px_24px_rgba(246,169,123,0.35)] md:right-[5%] md:top-10 md:h-44 md:w-44 md:opacity-100"
      />

      <div className="relative px-6 pt-14 md:px-14 md:pt-20">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-display text-3xl tracking-[-0.01em]">
            Mawaqeet <span className="text-peach">مواقيت</span>
          </span>
          <span className="rounded-full border border-peach/30 px-3 py-1 text-xs font-medium uppercase tracking-[1.5px] text-peach">
            02 · Live on the App Store
          </span>
        </div>
        <h3 className="mt-8 max-w-3xl font-display text-[clamp(2.25rem,4.6vw,3.5rem)] font-normal leading-[1.08] tracking-[-0.02em]">
          <SplitWords text="Every prayer," />{" "}
          <SplitWords text="right on time." delay={0.15} wordClassName="text-peach" />
        </h3>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#a8b8ca]">{project.description}</p>
        </Reveal>
      </div>

      {/* fanned phones */}
      <div ref={fanRef} className="relative mx-auto mt-14 flex max-w-4xl items-start justify-center px-4 md:mt-20">
        <motion.div style={{ x: leftX, y: sideY, rotate: leftRotate }} className="relative z-0 w-[31%] max-w-[260px]">
          <IPhone src={qibla} alt="Mawaqeet Qibla compass screen" />
        </motion.div>
        <motion.div style={{ y: centerY }} className="relative z-10 -mx-[3%] w-[35%] max-w-[290px]">
          <IPhone className="shadow-[0_50px_120px_-20px_rgba(246,169,123,0.45)]">
            <AnimatePresence initial={false}>
              <motion.div
                key={lang}
                initial={{ opacity: 0, x: lang === "ar" ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
                className="absolute inset-0"
              >
                <Image
                  src={lang === "en" ? prayer : prayerArabic}
                  alt={lang === "en" ? "Mawaqeet prayer times in English" : "Mawaqeet prayer times in Arabic"}
                  fill
                  sizes="290px"
                  className="object-cover object-top"
                />
              </motion.div>
            </AnimatePresence>
          </IPhone>
        </motion.div>
        <motion.div style={{ x: rightX, y: sideY, rotate: rightRotate }} className="relative z-0 w-[31%] max-w-[260px]">
          <IPhone src={tracker} alt="Mawaqeet prayer tracker screen" />
        </motion.div>

        {/* tilted callout chips */}
        {[
          { icon: Compass, label: "Live Qibla heading", cls: "left-[2%] top-[8%] bg-peach text-night", delay: 0.1 },
          { icon: CalendarDays, label: "Maghrib-based Hijri dates", cls: "right-[0%] top-[4%] bg-[#f8e9c0] text-night", delay: 0.25 },
          { icon: CheckCircle2, label: "Daily prayer tracking", cls: "bottom-[14%] right-[6%] bg-canvas text-night", delay: 0.4 },
        ].map((chip) => (
          <motion.span
            key={chip.label}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: chip.delay }}
            className={`absolute z-20 hidden items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium shadow-xl md:flex ${chip.cls}`}
          >
            <chip.icon className="h-4 w-4" />
            {chip.label}
          </motion.span>
        ))}
      </div>

      {/* EN / AR toggle */}
      <div className="relative mt-10 flex justify-center">
        <div className="flex gap-1 rounded-lg border border-white/10 bg-white/5 p-1 backdrop-blur-xl">
          {(["en", "ar"] as const).map((l) => (
            <button
              key={l}
              onClick={() => {
                setAutoplay(false);
                setLang(l);
              }}
              aria-pressed={lang === l}
              className={`relative rounded-md px-5 py-2 text-sm font-medium transition-colors ${lang === l ? "text-night" : "text-white/60 hover:text-white"}`}
            >
              {lang === l && (
                <motion.span
                  layoutId="mawaqeet-lang"
                  className="absolute inset-0 rounded-md bg-peach"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{l === "en" ? "English" : "العربية"}</span>
            </button>
          ))}
        </div>
      </div>

      {/* feature grid */}
      <div className="relative mt-16 grid gap-3 px-6 sm:grid-cols-2 md:px-14 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            className="group rounded-lg border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors hover:border-peach/40 hover:bg-white/[0.07]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-peach/15 text-peach">
              <f.icon className="h-5 w-5" />
            </div>
            <h4 className="mt-5 text-lg font-medium">{f.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-[#a8b8ca]">{f.body}</p>
          </motion.div>
        ))}
      </div>

      <div className="relative flex flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-14 md:py-16">
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/70">
              {t}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setArchOpen(true)}
            className="inline-flex items-center gap-2 rounded-md border border-peach/40 px-5 h-11 text-sm font-medium text-peach transition-colors hover:bg-peach/10"
          >
            <Network className="h-4 w-4" />
            Architecture
          </button>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-md bg-peach px-5 h-11 text-sm font-medium text-night transition-colors hover:bg-peach/90"
          >
            View source
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <ArchitectureModal open={archOpen} onClose={() => setArchOpen(false)} src={project.imageSrc!} alt={project.imageAlt!} />
    </div>
  );
}
