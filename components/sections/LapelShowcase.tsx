"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Camera, Link2, MoveHorizontal, ShieldCheck, Shirt, Sparkles } from "lucide-react";
import IPhone from "@/components/ui/IPhone";
import { EASE_OUT, Reveal, SplitWords } from "@/components/motion/primitives";

// Lapel's own palette, matched from its app and website
const page = "#eeece5";
const sheet = "#23211b";
const signal = "#b4402c";

const tech = ["SwiftUI", "SwiftData", "Supabase", "Deno edge functions", "PostgreSQL + RLS", "Gemini", "RevenueCat", "WidgetKit"];

const features = [
  { icon: Camera, title: "One photo is the fitting room", body: "A single full-length photo is cut out and stood on a plain background — no stand-in models." },
  { icon: Link2, title: "Add by photo or link", body: "Photograph what you own, paste a product link, or share into Lapel from any app via the share extension." },
  { icon: Shirt, title: "A closet that labels itself", body: "Brand and category are recognised on upload, with garment masks segmented by Gemini." },
  { icon: Sparkles, title: "A stylist that works from your closet", body: "Daily looks, a style calendar and a Home Screen widget — never padded with things you don't own." },
  { icon: ShieldCheck, title: "Private by design", body: "The app never talks to an AI provider. Every generation goes through authenticated edge functions with RLS on every table." },
];

const phones = [
  { src: "/apps/lapel/home.webp", alt: "Lapel home with today's suggested look", speed: -40 },
  { src: "/apps/lapel/garment.webp", alt: "Lapel garment page with Try it on", speed: 30 },
  { src: "/apps/lapel/closet.webp", alt: "Lapel closet grid", speed: -20 },
  { src: "/apps/lapel/outfit.webp", alt: "Lapel outfit built from the closet", speed: 50 },
];

function LapelMark({ height }: { height: number }) {
  const stroke = Math.max((26.1 * height) / 820, 1.6);
  const line = { vectorEffect: "non-scaling-stroke", strokeWidth: stroke } as const;
  return (
    <svg width={(578 * height) / 820} height={height} viewBox="0 0 578 820" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit={10} aria-hidden>
      <path {...line} d="M31.8212 393.227L13.1851 333.592V13.0499L177.183 16.7772" />
      <path {...line} d="M177.183 20.5044L255.455 162.139L192.092 206.866L236.819 266.502L46.7301 564.68" />
      <path
        {...line}
        d="M177.183 20.5044L31.8212 549.771C16.9123 624.316 13.1851 661.588 13.1851 710.042C13.1851 774.647 34.306 806.95 76.548 806.95H564.815V669.042H151.093V572.134C151.093 534.862 143.638 512.499 136.184 505.044"
      />
    </svg>
  );
}

// drag handle over a before / after pair
function TryOnCompare() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  function update(clientX: number) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }

  return (
    <div
      ref={ref}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => e.buttons === 1 && update(e.clientX)}
      className="relative aspect-[2/3] w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-lg bg-[#ebebeb]"
    >
      <Image src="/apps/lapel/tryon-after.webp" alt="The same model wearing a camel overcoat, tried on in Lapel" fill sizes="(max-width: 1024px) 90vw, 420px" className="object-cover" draggable={false} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src="/apps/lapel/tryon-before.webp" alt="A generated model in a plain t-shirt" fill sizes="(max-width: 1024px) 90vw, 420px" className="object-cover" draggable={false} />
      </div>
      <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-xs font-medium text-[#1b1816]">Your photo</span>
      <span className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium text-white" style={{ background: signal }}>
        Tried on
      </span>
      <div className="absolute inset-y-0 w-px bg-white" style={{ left: `${pos}%` }}>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Compare before and after try-on"
          className="absolute inset-0 h-full w-8 -translate-x-1/2 cursor-ew-resize opacity-0"
        />
        <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1b1816] shadow-lg">
          <MoveHorizontal className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}

function ParallaxPhone({ src, alt, speed, index }: { src: string; alt: string; speed: number; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay: index * 0.08 }}
    >
      <motion.div style={{ y }}>
        <IPhone src={src} alt={alt} sizes="(max-width: 768px) 45vw, 260px" />
      </motion.div>
    </motion.div>
  );
}

export default function LapelShowcase() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-[#d2d0c9] text-[#1b1816]" style={{ background: page }}>
      {/* header + try-on compare */}
      <div className="grid gap-10 px-6 pt-14 md:px-14 md:pt-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2">
              <LapelMark height={34} />
              <span className="text-xl font-semibold tracking-[0.18em]">LAPEL</span>
            </span>
            <span className="rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[1.5px]" style={{ borderColor: `${signal}55`, color: signal }}>
              Coming soon to the App Store
            </span>
          </div>
          <h3 className="mt-8 max-w-3xl font-display text-[clamp(2.25rem,4.6vw,3.5rem)] font-normal leading-[1.08] tracking-[-0.02em]">
            <SplitWords text="Try it on," /> <SplitWords text="before you buy it." delay={0.12} wordClassName="text-[#b4402c]" />
          </h3>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#5f5d58]">
              An AI try-on app for iPhone. Take one full-length photo, add a piece from your closet or paste a link from a
              shop, and Lapel shows it on you — backed by a Supabase backend, authenticated edge functions and a
              provider-agnostic try-on pipeline.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-2">
            {tech.map((t) => (
              <span key={t} className="rounded-full border border-[#d2d0c9] bg-[#fdfbf7] px-3 py-1.5 text-sm text-[#1b1816]">
                {t}
              </span>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mx-auto w-full max-w-[380px]">
          <TryOnCompare />
          <p className="mt-3 text-center text-sm text-[#6c6a65]">Drag to compare · generated model, dressed by Lapel</p>
        </Reveal>
      </div>

      {/* parallax phone row */}
      <div className="mt-16 grid grid-cols-2 gap-4 px-6 md:mt-20 md:grid-cols-4 md:gap-6 md:px-14">
        {phones.map((p, i) => (
          <ParallaxPhone key={p.src} index={i} {...p} />
        ))}
      </div>

      {/* features on the app's dark sheet */}
      <div className="mt-16 px-3 pb-3 md:mt-20">
        <div className="grid gap-px overflow-hidden rounded-lg md:grid-cols-2 lg:grid-cols-5" style={{ background: "#3d3b35" }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="p-6"
              style={{ background: sheet }}
            >
              <f.icon className="h-5 w-5" style={{ color: "#e0876f" }} />
              <h4 className="mt-4 font-medium text-[#fdfbf7]">{f.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-[#a9a69e]">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
