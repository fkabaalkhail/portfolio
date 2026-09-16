"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface CaseStudyCardProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  index: number;
  accent: string;
}

export default function CaseStudyCard({ title, imageSrc, imageAlt, href, index, accent }: CaseStudyCardProps) {
  const isExternal = /^https?:\/\//.test(href);
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // 3D tilt + cursor-following "view" badge
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 });
  const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const badgeX = useSpring(useTransform(px, (v) => `${v * 100}%`), { stiffness: 300, damping: 30 });
  const badgeY = useSpring(useTransform(py, (v) => `${v * 100}%`), { stiffness: 300, damping: 30 });

  function onMove(e: React.MouseEvent) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }

  const card = (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        px.set(0.5);
        py.set(0.5);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="group relative"
    >
      <div className={`relative overflow-hidden rounded-[2rem] p-3 ${accent}`}>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-ink/10">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <motion.span
            style={{ left: badgeX, top: badgeY }}
            animate={{ scale: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="pointer-events-none absolute z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper shadow-xl md:flex"
          >
            {isExternal ? "Visit" : "Open"}
            <ArrowUpRight className="h-4 w-4" />
          </motion.span>
        </div>
        <div className="flex items-center justify-between px-3 pb-2 pt-4">
          <div>
            <span className="font-mono text-xs opacity-60">0{index + 1}</span>
            <h3 className="font-display text-2xl font-bold tracking-tight">{title}</h3>
          </div>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>
      </div>
      <span className="sr-only">{isExternal ? "View live site" : "View case study"}</span>
    </motion.div>
  );

  const linkClass = "block rounded-[2rem] focus:outline-none focus-visible:ring-4 focus-visible:ring-ember/50";

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {card}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClass}>
      {card}
    </Link>
  );
}
