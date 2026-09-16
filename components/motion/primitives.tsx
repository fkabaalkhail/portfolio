"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// fades + lifts content in once it scrolls into view
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  ...rest
}: { delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// headline where each word slides up out of a mask, staggered
export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  highlight = [],
  highlightClassName,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  highlight?: string[];
  highlightClassName?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={cn(
              "inline-block will-change-transform",
              wordClassName,
              highlight.includes(word.replace(/[^\w&-]/g, "")) && highlightClassName
            )}
            initial={{ y: "110%", rotate: 4 }}
            whileInView={{ y: "0%", rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: delay + i * stagger }}
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
      duration: 1.6,
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

// pulls its child toward the cursor, springs back on leave
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });

  function onMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x, y }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}

// infinite horizontal ticker (duplicates children so the loop is seamless)
export function Marquee({
  children,
  reverse = false,
  className,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("marquee-mask overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        <div className="flex shrink-0 gap-3 pr-3">{children}</div>
        <div className="flex shrink-0 gap-3 pr-3" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

// small uppercase eyebrow label used above section headings
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-current/15 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em]",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+=?";

// cycles through words, scrambling letters between each one
export function ScrambleCycle({
  words,
  interval = 2600,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [text, setText] = useState(words[0]);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || words.length < 2) return;
    let index = 0;
    let frame: ReturnType<typeof setInterval> | undefined;

    const cycle = setInterval(() => {
      index = (index + 1) % words.length;
      const target = words[index];
      let tick = 0;
      clearInterval(frame);
      frame = setInterval(() => {
        tick++;
        const revealed = Math.floor(tick / 2);
        setText(
          target
            .split("")
            .map((ch, i) =>
              ch === " " || i < revealed ? ch : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
            )
            .join("")
        );
        if (revealed >= target.length) clearInterval(frame);
      }, 35);
    }, interval);

    return () => {
      clearInterval(cycle);
      clearInterval(frame);
    };
  }, [words, interval, reduce]);

  return (
    <span className={className} aria-live="off">
      {text}
    </span>
  );
}
