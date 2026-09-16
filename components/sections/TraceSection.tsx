"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { stackLayers } from "@/lib/constants";
import { EASE_OUT, TechLogo } from "@/components/motion/primitives";
import { cn } from "@/lib/utils";

// one request followed through every layer, told as a tracing waterfall
const steps = [
  {
    layer: "client",
    headline: "It starts with a tap.",
    body: "A SwiftUI screen fires the request — the kind of native client I build for Mrasem, Lapel and Mawaqeet.",
  },
  {
    layer: "api",
    headline: "It hits an API I wrote.",
    body: "Authenticated Node.js and FastAPI services, with JWT auth and rate limiting that cut API latency 20% at Moneymoon.",
  },
  {
    layer: "data",
    headline: "It lands in a schema I designed.",
    body: "PostgreSQL and Supabase with row-level security — and petabyte-scale workloads moved to S3 with zero data loss at Ericsson.",
  },
  {
    layer: "infra",
    headline: "On infrastructure I provisioned.",
    body: "Kubernetes with autoscaling and ingress at Ericsson, and production GKE built from scratch with Terraform at HAMS.AI.",
  },
  {
    layer: "ops",
    headline: "And it shows up on my dashboards.",
    body: "VictoriaMetrics, Prometheus and Grafana — measured, alerting, and 30% cheaper to run after right-sizing.",
  },
];

// illustrative trace: start and duration in ms, grouped by the step that reveals them
const TOTAL_MS = 184;
const spans = [
  { step: 0, depth: 0, service: "ios-app", op: "BookingView.confirm()", start: 0, dur: 184 },
  { step: 3, depth: 1, service: "ingress", op: "nginx → api-svc", start: 12, dur: 160 },
  { step: 1, depth: 2, service: "api", op: "POST /bookings", start: 18, dur: 148 },
  { step: 1, depth: 3, service: "api", op: "auth.verifySession", start: 22, dur: 16 },
  { step: 2, depth: 3, service: "postgres", op: "INSERT INTO bookings", start: 42, dur: 71 },
  { step: 2, depth: 3, service: "redis", op: "SET availability:*", start: 118, dur: 9 },
  { step: 4, depth: 1, service: "metrics", op: "http_request_duration_seconds", start: 168, dur: 12 },
];

const layerColor: Record<string, string> = {
  client: "bg-[#8f9cff]",
  api: "bg-[#5db8a6]",
  data: "bg-[#e8a55a]",
  infra: "bg-[#c792ea]",
  ops: "bg-[#5db872]",
};

function SpanBar({ span, progress }: { span: (typeof spans)[number]; progress: MotionValue<number> }) {
  const from = span.step / steps.length;
  const to = (span.step + 0.7) / steps.length;
  const scaleX = useTransform(progress, [from, to], [0, 1]);
  const opacity = useTransform(progress, [from, from + 0.02], [0.25, 1]);
  const layer = steps[span.step].layer;

  return (
    <div className="grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.45fr)] items-center gap-3 py-[7px] md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
      <motion.div style={{ opacity }} className="flex min-w-0 items-center gap-2">
        <span style={{ width: span.depth * 10 }} className="hidden shrink-0 sm:block" />
        <span className={cn("h-2 w-2 shrink-0 rounded-full", layerColor[layer])} />
        <span className="truncate font-mono text-[11px] text-on-dark md:text-xs">
          <span className="text-on-dark-soft">{span.service}</span> {span.op}
        </span>
      </motion.div>
      <div className="relative h-4">
        <motion.div
          style={{ left: `${(span.start / TOTAL_MS) * 100}%`, width: `${(span.dur / TOTAL_MS) * 100}%`, scaleX }}
          className={cn("absolute top-0 h-full origin-left rounded-[3px]", layerColor[layer])}
        />
        <motion.span
          style={{ opacity, left: `calc(${((span.start + span.dur) / TOTAL_MS) * 100}% + 6px)` }}
          className="absolute top-1/2 hidden -translate-y-1/2 font-mono text-[10px] text-on-dark-soft lg:block"
        >
          {span.dur}ms
        </motion.span>
      </div>
    </div>
  );
}

export default function TraceSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  const complete = useMotionValue(1);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(steps.length - 1, Math.floor(v * steps.length)));
  });

  const step = reduce ? steps[steps.length - 1] : steps[active];
  const layer = stackLayers.find((l) => l.id === step.layer)!;
  const done = reduce || active === steps.length - 1;

  return (
    <section ref={ref} aria-label="Anatomy of a request" className={cn("relative", reduce ? "" : "h-[380vh]")}>
      <div className={cn("flex items-center px-5 md:px-8", reduce ? "py-24" : "sticky top-0 h-screen")}>
        <div className="mx-auto grid w-full max-w-[1200px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          {/* narrative */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[1.5px] text-muted">Anatomy of a request</p>

            <div className="mt-5 flex gap-1.5" aria-hidden>
              {steps.map((s, i) => (
                <span key={s.layer} className="relative h-1 w-10 overflow-hidden rounded-full bg-hairline">
                  <motion.span
                    className="absolute inset-0 origin-left bg-accent"
                    animate={{ scaleX: reduce || i <= active ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: EASE_OUT }}
                  />
                </span>
              ))}
            </div>

            <div className="relative mt-6 min-h-[270px] md:min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.layer}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                >
                  <h2 className="font-display text-[clamp(2.1rem,4.4vw,3.5rem)] font-normal leading-[1.06] tracking-[-0.02em] text-ink">
                    {step.headline}
                  </h2>
                  <p className="mt-5 max-w-md text-lg leading-relaxed text-body">{step.body}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {layer.items.map((item) => (
                      <span
                        key={item.name}
                        className="inline-flex items-center gap-2 rounded-md border border-hairline bg-canvas px-2.5 py-1.5 text-sm font-medium text-ink"
                      >
                        <TechLogo name={item.name} icon={item.icon} size={18} />
                        {item.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* trace waterfall */}
          <div className="overflow-hidden rounded-xl bg-dark text-on-dark shadow-[0_40px_80px_-40px_rgba(20,20,19,0.6)]">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 px-5 py-3">
              <span className="font-mono text-xs text-on-dark">
                trace <span className="text-on-dark-soft">·</span> POST /bookings
              </span>
              <span className="flex items-center gap-3 font-mono text-[11px] text-on-dark-soft">
                <span>{spans.length} spans</span>
                <span>{TOTAL_MS} ms</span>
                <span className="flex items-center gap-1.5">
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full"
                    animate={{ backgroundColor: done ? "#5db872" : "#e8a55a" }}
                  />
                  {done ? "201 Created" : "in flight"}
                </span>
              </span>
            </div>

            {/* time axis */}
            <div className="grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.45fr)] gap-3 border-b border-white/5 px-5 py-2 font-mono text-[10px] text-on-dark-soft md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
              <span>service · operation</span>
              <span className="flex justify-between">
                <span>0ms</span>
                <span>{Math.round(TOTAL_MS / 2)}ms</span>
                <span>{TOTAL_MS}ms</span>
              </span>
            </div>

            <div className="bg-dark-soft px-5 py-3">
              {spans.map((s, i) => (
                <SpanBar key={i} span={s} progress={reduce ? complete : scrollYProgress} />
              ))}
            </div>

            <div className="grid grid-cols-3 border-t border-white/5 font-mono text-[11px]">
              {[
                ["p95", "42 ms"],
                ["errors", "0.00%"],
                ["pods", "3/3 ready"],
              ].map(([k, v], i) => (
                <motion.div
                  key={k}
                  animate={{ opacity: done ? 1 : 0.35 }}
                  transition={{ duration: 0.4, delay: done ? i * 0.08 : 0 }}
                  className="border-r border-white/5 px-5 py-3 last:border-r-0"
                >
                  <span className="block text-on-dark-soft">{k}</span>
                  <span className="text-on-dark">{v}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
