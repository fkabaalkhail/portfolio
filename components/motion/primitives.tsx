"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion, type HTMLMotionProps, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// fades + lifts content in once it scrolls into view
export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  ...rest
}: { delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// headline where each word rises out of a mask, lightly staggered
export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.04,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className={cn("inline-block will-change-transform", wordClassName)}
            initial={{ y: "105%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: delay + i * stagger }}
          >
            {word}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// counts up from 0 when scrolled into view
export function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: EASE_OUT,
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {(reduce ? to : value).toFixed(decimals)}
      {suffix}
    </span>
  );
}

// infinite horizontal ticker (duplicates children so the loop is seamless)
export function Marquee({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("marquee-mask overflow-hidden", className)}>
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <div className="flex shrink-0 gap-3 pr-3">{children}</div>
        <div className="flex shrink-0 gap-3 pr-3" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

// 12px uppercase caption used above section headings
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-xs font-medium uppercase tracking-[1.5px] text-muted", className)}>{children}</p>
  );
}

// serif section heading with an optional muted second clause
export function SectionHeading({
  title,
  muted,
  className,
  mutedClassName = "text-muted-soft",
  as: Tag = "h2",
}: {
  title: string;
  muted?: string;
  className?: string;
  mutedClassName?: string;
  as?: "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "font-display text-[clamp(2.25rem,4.6vw,3.5rem)] font-normal leading-[1.08] tracking-[-0.02em] text-ink",
        className
      )}
    >
      <SplitWords text={title} />
      {muted && (
        <>
          {" "}
          <SplitWords text={muted} delay={0.12} wordClassName={mutedClassName} />
        </>
      )}
    </Tag>
  );
}

// official full-colour brand logo (Devicon / Simple Icons SVG)
export function TechLogo({
  name,
  icon,
  size = 28,
  className,
}: {
  name: string;
  icon: string;
  size?: number;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- tiny static SVGs, no optimisation needed
    <img src={icon} alt={name} width={size} height={size} loading="lazy" className={cn("object-contain", className)} />
  );
}

const rollOut: Variants = { rest: { y: "0%" }, active: { y: "100%" } };
const rollIn: Variants = { rest: { y: "-100%" }, active: { y: "0%" } };
const rollTransition = { duration: 0.3, ease: [0.338, 0.015, 0.395, 0.959] as const };

// label that rolls a duplicate into place on hover (motion.dev "rolling text button")
export function RollingLabel({ children }: { children: string }) {
  return (
    <span className="relative block overflow-hidden" aria-label={children}>
      <motion.span aria-hidden className="block whitespace-nowrap" variants={rollOut} transition={rollTransition}>
        {children}
      </motion.span>
      <motion.span aria-hidden className="absolute inset-0 block whitespace-nowrap" variants={rollIn} transition={rollTransition}>
        {children}
      </motion.span>
    </span>
  );
}

export const rollingParent = { initial: "rest", whileHover: "active", whileFocus: "active" } as const;
