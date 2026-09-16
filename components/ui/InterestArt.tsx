"use client";

import { motion, type Variants } from "framer-motion";

// line illustrations that draw themselves in (motion.dev "path drawing" pattern)
const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: 0.15 + i * 0.18, type: "spring", duration: 1.4, bounce: 0 },
      opacity: { delay: 0.15 + i * 0.18, duration: 0.01 },
    },
  }),
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <motion.svg
      viewBox="0 0 96 96"
      className="h-full w-full overflow-visible"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      role="img"
      aria-label={label}
    >
      {children}
    </motion.svg>
  );
}

export function HikingArt() {
  return (
    <Frame label="Mountains with a winding trail">
      <motion.circle cx="70" cy="22" r="7" {...stroke} variants={draw} custom={0} />
      <motion.path d="M6 78 L34 36 L48 54 L60 40 L90 78" {...stroke} variants={draw} custom={1} />
      <motion.path d="M28 45 L34 36 L40 44" {...stroke} variants={draw} custom={2} />
      {/* winding trail */}
      <motion.path d="M40 78 C44 70 54 70 52 63 C50 57 58 55 60 50" {...stroke} strokeWidth={1.75} variants={draw} custom={3} />
      {/* hiker's flag climbs on hover */}
      <g className="transition-transform duration-700 ease-out group-hover:-translate-y-3 group-hover:-translate-x-1">
        <motion.path d="M60 50 V38 L68 41 L60 44" {...stroke} strokeWidth={1.75} variants={draw} custom={4} />
      </g>
    </Frame>
  );
}

export function PhotographyArt() {
  return (
    <Frame label="Camera">
      <motion.path d="M14 32 H30 L36 24 H60 L66 32 H82 A6 6 0 0 1 88 38 V72 A6 6 0 0 1 82 78 H14 A6 6 0 0 1 8 72 V38 A6 6 0 0 1 14 32 Z" {...stroke} variants={draw} custom={0} />
      <motion.circle cx="48" cy="54" r="15" {...stroke} variants={draw} custom={1} />
      {/* aperture twists on hover */}
      <g className="origin-[48px_54px] transition-transform duration-700 ease-out group-hover:rotate-90">
        <motion.path d="M48 45 L56 58 M40 58 L56 49 M40 49 L48 63" {...stroke} strokeWidth={1.75} variants={draw} custom={2} />
      </g>
      <motion.circle cx="76" cy="42" r="2" {...stroke} variants={draw} custom={3} />
    </Frame>
  );
}

export function ChessArt() {
  return (
    <Frame label="Chess knight">
      <g className="transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:-rotate-6 origin-bottom">
        <motion.path
          d="M32 72 C34 58 40 52 44 46 C38 48 30 50 26 44 C24 40 30 30 38 24 C42 20 46 16 50 14 L52 20 C62 22 70 34 68 52 C67 60 64 66 64 72"
          {...stroke}
          variants={draw}
          custom={0}
        />
        <motion.circle cx="44" cy="30" r="1.8" {...stroke} variants={draw} custom={1} />
      </g>
      <motion.path d="M26 72 H70 M22 82 H74 M26 72 L22 82 M70 72 L74 82" {...stroke} variants={draw} custom={2} />
    </Frame>
  );
}

export function FootballArt() {
  return (
    <Frame label="Football">
      <motion.path d="M22 88 H74" {...stroke} strokeWidth={1.5} variants={draw} custom={3} />
      <g className="origin-[48px_46px] transition-transform duration-700 ease-out group-hover:rotate-[144deg]">
        <motion.circle cx="48" cy="46" r="30" {...stroke} variants={draw} custom={0} />
        <motion.path d="M48 34 L59 42 L55 55 L41 55 L37 42 Z" {...stroke} variants={draw} custom={1} />
        <motion.path d="M48 34 V17 M59 42 L75 36 M55 55 L64 70 M41 55 L32 70 M37 42 L21 36" {...stroke} variants={draw} custom={2} />
      </g>
    </Frame>
  );
}
