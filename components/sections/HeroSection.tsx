"use client";

import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import IPhone from "@/components/ui/IPhone";
import { EASE_OUT, Magnetic, Marquee, ScrambleCycle, SplitWords } from "@/components/motion/primitives";

const roles = ["SOFTWARE ENGINEER", "iOS DEVELOPER", "DEVOPS ENGINEER", "BACKEND ENGINEER"];

const pillColors = [
  "bg-sun text-ink",
  "bg-ink text-paper",
  "bg-sky text-ink",
  "bg-paper text-ink border border-ink/10",
  "bg-mint text-ink",
  "bg-ember text-white",
  "bg-plum text-ink",
];

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // pointer parallax for the floating phones
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  const backX = useTransform(sx, (v) => v * -18);
  const backY = useTransform(sy, (v) => v * -18);
  const frontX = useTransform(sx, (v) => v * 26);
  const frontY = useTransform(sy, (v) => v * 26);
  const rotY = useTransform(sx, (v) => v * 10);
  const rotX = useTransform(sy, (v) => v * -8);

  // scroll: phones drift apart and the copy lifts away
  const backScrollY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const frontScrollY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const allSkills = siteConfig.skillCategories.flatMap((c) => c.skills);
  const half = Math.ceil(allSkills.length / 2);

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      className="relative isolate overflow-hidden pt-28 md:pt-32"
    >
      {/* animated colour blobs */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ x: [0, 60, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.15, 0.95, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-sun/60 blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, -50, 40, 0], y: [0, 50, -20, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-10rem] top-10 h-[36rem] w-[36rem] rounded-full bg-ember/40 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, 40, -40, 0], y: [0, -30, 40, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full bg-plum/40 blur-[120px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(23,18,13,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(23,18,13,0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div style={{ y: copyY, opacity: copyOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.3 }}
            className="mb-7 flex flex-wrap items-center gap-2"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper/70 px-3 py-1.5 text-sm font-medium backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
              </span>
              {siteConfig.name}
            </span>
            <span className="inline-flex min-w-[11.5rem] items-center rounded-full bg-ink px-3 py-1.5 font-mono text-xs tracking-wider text-sun">
              <ScrambleCycle words={roles} />
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-paper/70 px-3 py-1.5 text-sm text-muted backdrop-blur">
              <MapPin className="h-3.5 w-3.5" />
              {siteConfig.location}
            </span>
          </motion.div>

          <h1 className="font-display text-[clamp(2.75rem,7.2vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.045em] text-ink">
            <SplitWords text="I build cloud systems" delay={0.35} />
            <br />
            <SplitWords text="&" delay={0.6} wordClassName="font-serif font-normal italic text-ember" />{" "}
            <SplitWords
              text="iOS apps"
              delay={0.66}
              wordClassName="font-serif font-normal italic tracking-[-0.02em] text-ember"
            />
            <br />
            <SplitWords text="people love." delay={0.8} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.05 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
          >
            {siteConfig.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.2 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a
                href="#apps"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-semibold text-paper shadow-[0_12px_30px_-10px_rgba(23,18,13,0.6)]"
              >
                See my iOS apps
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper/60 px-6 py-3.5 font-semibold text-ink backdrop-blur"
              >
                GitHub
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* floating device stack */}
        <div className="relative mx-auto h-[520px] w-full max-w-[460px] [perspective:1400px] sm:h-[600px]">
          <motion.div
            initial={{ opacity: 0, y: 120, rotate: -14 }}
            animate={{ opacity: 1, y: 0, rotate: -9 }}
            transition={{ duration: 1.3, ease: EASE_OUT, delay: 0.5 }}
            className="absolute left-0 top-6 w-[52%]"
          >
            <motion.div style={{ x: backX, y: backY, rotateX: rotX, rotateY: rotY }}>
              <motion.div style={{ y: backScrollY }}>
                <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                  <IPhone src="/apps/mawaqeet/prayer.webp" alt="Mawaqeet prayer times screen" priority />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 160, rotate: 14 }}
            animate={{ opacity: 1, y: 0, rotate: 7 }}
            transition={{ duration: 1.3, ease: EASE_OUT, delay: 0.7 }}
            className="absolute right-0 top-20 w-[56%]"
          >
            <motion.div style={{ x: frontX, y: frontY, rotateX: rotX, rotateY: rotY }}>
              <motion.div style={{ y: frontScrollY }}>
                <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
                  <IPhone src="/apps/mrasem/categories.webp" alt="Mrasem category home screen" priority />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* floating labels */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 14, delay: 1.4 }}
            className="absolute left-[-4%] bottom-24 z-10 rotate-[-6deg] rounded-2xl bg-night px-4 py-2.5 text-sm font-semibold text-peach shadow-xl"
          >
            🌙 Mawaqeet
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 14, delay: 1.55 }}
            className="absolute right-[-2%] top-8 z-10 rotate-[5deg] rounded-2xl bg-espresso px-4 py-2.5 text-sm font-semibold text-gold shadow-xl"
          >
            ✦ Mrasem
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 1.7 }}
            className="absolute bottom-2 right-6 z-10 rounded-full border border-ink/10 bg-paper/80 px-4 py-2 font-mono text-xs text-ink backdrop-blur"
          >
            SwiftUI · shipped to real users
          </motion.div>
        </div>
      </div>

      {/* skills ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="mt-10 space-y-3 pb-16 md:mt-4"
      >
        <Marquee>
          {allSkills.slice(0, half).map((skill, i) => (
            <span
              key={skill}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 font-display text-lg font-semibold ${pillColors[i % pillColors.length]}`}
            >
              {skill}
            </span>
          ))}
        </Marquee>
        <Marquee reverse>
          {allSkills.slice(half).map((skill, i) => (
            <span
              key={skill}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 font-display text-lg font-semibold ${pillColors[(i + 3) % pillColors.length]}`}
            >
              {skill}
            </span>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}
