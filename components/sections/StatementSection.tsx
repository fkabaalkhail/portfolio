"use client";

import { Fragment, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

// adapted from motion.dev's "scroll word reveal" example
const STATEMENT =
  "I don't pick a lane. I write the service, design the data model, automate the infrastructure, and keep it healthy in production.";
const START_OPACITY = 0.14;
const SPREAD = 0.8;
const WORD_DURATION = 0.2;

function Word({ children, progress, index, count }: { children: string; progress: MotionValue<number>; index: number; count: number }) {
  const start = count <= 1 ? 0 : (index / (count - 1)) * SPREAD;
  const end = Math.min(1, start + WORD_DURATION);
  const opacity = useTransform(progress, [start, end], [START_OPACITY, 1]);
  return (
    <motion.span aria-hidden style={{ opacity }}>
      {children}
    </motion.span>
  );
}

export default function StatementSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const words = STATEMENT.split(" ");

  if (reduce) {
    return (
      <section ref={ref} className="px-5 py-24 md:px-8">
        <p className="mx-auto max-w-[1000px] font-display text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.12] tracking-[-0.02em] text-ink">
          {STATEMENT}
        </p>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen items-center px-5 md:px-8">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-[1px_1fr] gap-8 md:gap-12">
          <div className="relative mt-3 h-28 w-px overflow-hidden bg-hairline">
            <motion.span style={{ scaleY: scrollYProgress }} className="absolute inset-0 origin-top bg-accent" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[1.5px] text-muted">How I think about it</p>
            <p
              aria-label={STATEMENT}
              className="mt-8 max-w-[24ch] font-display text-[clamp(2.1rem,4.8vw,4rem)] leading-[1.1] tracking-[-0.02em] text-ink [text-wrap:balance]"
            >
              {words.map((word, i) => (
                <Fragment key={`${word}-${i}`}>
                  <Word progress={scrollYProgress} index={i} count={words.length}>
                    {word}
                  </Word>
                  {i < words.length - 1 ? " " : null}
                </Fragment>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
