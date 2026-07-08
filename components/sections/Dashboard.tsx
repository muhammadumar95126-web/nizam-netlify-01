"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, Wrench, ScanLine } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const KPIS = [
  { label: "Open work orders", value: 128, suffix: "", note: "−12% this week" },
  { label: "SLA compliance", value: 98.2, suffix: "%", note: "target 95%" },
  { label: "Assets online", value: 4213, suffix: "", note: "across 14 sites" },
  { label: "Avg. response", value: 11, suffix: "m", note: "door to dispatch" },
];

const FEED = [
  { icon: CheckCircle2, text: "WO-4821 verified · Tower B, HVAC" },
  { icon: Wrench, text: "PPM started · Chiller 07, Plant Room" },
  { icon: ScanLine, text: "Inspection passed · Terminal 2 West" },
  { icon: AlertTriangle, text: "SLA warning · Dock 3 lighting" },
  { icon: CheckCircle2, text: "Asset tagged · Generator G-114" },
  { icon: Wrench, text: "Crew dispatched · Block C elevator" },
];

const ROWS = [
  { id: "WO-4832", title: "Cooling tower vibration", site: "Plant 2", status: "In Progress" },
  { id: "WO-4833", title: "Lobby lighting survey", site: "Tower A", status: "Scheduled" },
  { id: "WO-4829", title: "Fire pump quarterly test", site: "Basement 1", status: "Verified" },
];

/* 30-day work-order volume, hand-tuned for a pleasing line */
const SPARK = [42, 44, 41, 46, 45, 49, 47, 52, 50, 48, 53, 55, 52, 57, 56, 60, 58, 55, 59, 62, 60, 64, 61, 66, 68, 65, 70, 69, 73, 76];

function sparkPath(w: number, h: number, pad = 4) {
  const min = Math.min(...SPARK);
  const max = Math.max(...SPARK);
  const pts = SPARK.map((v, i) => [
    pad + (i / (SPARK.length - 1)) * (w - pad * 2),
    h - pad - ((v - min) / (max - min)) * (h - pad * 2),
  ]);
  const d = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const last = pts[pts.length - 1];
  return { d, area: `${d} L${last[0].toFixed(1)},${h - pad} L${pad},${h - pad} Z`, last };
}

export default function Dashboard({ index = "05" }: { index?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [feedIdx, setFeedIdx] = useState(3);
  const { d, area, last } = sparkPath(560, 180);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setFeedIdx((i) => i + 1), 2600);
    return () => clearInterval(id);
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // console rises and flattens out of perspective
      gsap.fromTo(
        "[data-console]",
        { rotateX: 24, y: 90, scale: 0.92, opacity: 0.4 },
        {
          rotateX: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-console-wrap]",
            start: "top 85%",
            end: "top 25%",
            scrub: 0.6,
          },
        }
      );

      // count-up KPIs — trigger on the untransformed wrapper so the
      // console's entrance offset doesn't skew the measured start
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = parseFloat(el.dataset.count || "0");
        const decimals = target % 1 !== 0 ? 1 : 0;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: "[data-console-wrap]", start: "top 60%", once: true },
          onUpdate: () => {
            el.textContent = obj.v.toLocaleString("en-US", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            });
          },
        });
      });

      // draw the line
      const path = document.querySelector<SVGPathElement>("[data-spark-line]");
      if (path) {
        const len = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power2.inOut",
            scrollTrigger: { trigger: "[data-console-wrap]", start: "top 55%", once: true },
          }
        );
      }
      gsap.from("[data-spark-fill]", {
        opacity: 0,
        duration: 1.4,
        delay: 0.9,
        scrollTrigger: { trigger: "[data-console-wrap]", start: "top 55%", once: true },
      });
    },
    { scope: ref }
  );

  const visibleFeed = Array.from({ length: 4 }, (_, k) => {
    const i = (feedIdx - 3 + k + FEED.length * 10) % FEED.length;
    return { ...FEED[i], key: feedIdx - 3 + k };
  }).reverse();

  return (
    <section ref={ref} id="dashboard" className="section hairline-t" aria-labelledby="dashboard-title">
      <div className="mx-auto max-w-[1680px] px-5 py-28 md:px-10 md:py-44">
        <div className="mb-14 flex items-baseline justify-between md:mb-20">
          <p className="eyebrow">( {index} ) — Command Center</p>
          <p className="eyebrow hidden md:block">Representative Preview</p>
        </div>

        <div className="mb-16 grid gap-8 md:mb-24 md:grid-cols-12 md:items-end">
          <Reveal
            as="h2"
            id="dashboard-title"
            className="display text-[clamp(2.6rem,7vw,6.5rem)] md:col-span-8"
          >
            Every operation.
            <br />
            <em className="serif-i text-fog">One pane of glass.</em>
          </Reveal>
          <FadeIn className="md:col-span-4">
            <p className="max-w-sm text-base leading-relaxed text-fog">
              Live work, live assets, live accountability. The command center
              your operation has been missing, designed to be read at a
              glance and trusted at a board meeting.
            </p>
          </FadeIn>
        </div>

        <div data-console-wrap style={{ perspective: "1600px" }}>
          <div
            data-console
            aria-label="Representative preview of the NIZAM operations dashboard"
            className="overflow-hidden rounded-xl border border-line-strong bg-smoke shadow-[0_60px_120px_-40px_rgba(0,0,0,0.8)] will-change-transform"
          >
            {/* window chrome */}
            <div className="flex items-center justify-between border-b border-line px-5 py-3.5 md:px-7">
              <div className="flex items-center gap-4">
                <div aria-hidden className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-grey/50" />
                  <span className="h-2 w-2 rounded-full bg-grey/35" />
                  <span className="h-2 w-2 rounded-full bg-grey/25" />
                </div>
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-fog">
                  NIZAM · Operations Command
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-fog">Live</p>
              </div>
            </div>

            {/* KPI tiles */}
            <div className="grid grid-cols-2 gap-px border-b border-line bg-line lg:grid-cols-4">
              {KPIS.map((k) => (
                <div key={k.label} className="bg-smoke px-5 py-6 md:px-7 md:py-8">
                  <p className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-grey">
                    {k.label}
                  </p>
                  <p className="mt-3 font-display text-3xl font-medium tracking-tight text-paper tabular-nums md:text-4xl">
                    <span data-count={k.value}>0</span>
                    {k.suffix}
                  </p>
                  <p className="mt-2 font-mono text-[0.5625rem] tracking-[0.12em] text-fog/70">
                    {k.note}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3">
              {/* volume chart */}
              <div className="border-b border-line p-5 md:p-7 lg:col-span-2 lg:border-r lg:border-b-0">
                <div className="mb-5 flex items-baseline justify-between">
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-fog">
                    Work-order volume · 30 days
                  </p>
                  <p className="font-mono text-[0.625rem] tracking-[0.12em] text-accent tabular-nums">
                    76 today
                  </p>
                </div>
                <svg
                  viewBox="0 0 560 180"
                  className="h-auto w-full"
                  role="img"
                  aria-label="Line chart: work-order volume rising from 42 to 76 over 30 days"
                >
                  {[45, 90, 135].map((y) => (
                    <line key={y} x1="4" x2="556" y1={y} y2={y} stroke="var(--line)" strokeWidth="1" />
                  ))}
                  <defs>
                    <linearGradient id="sparkfill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(194,168,120,0.22)" />
                      <stop offset="100%" stopColor="rgba(194,168,120,0)" />
                    </linearGradient>
                  </defs>
                  <path data-spark-fill d={area} fill="url(#sparkfill)" />
                  <path
                    data-spark-line
                    d={d}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx={last[0]} cy={last[1]} r="3.5" fill="var(--accent)" />
                </svg>

                {/* mini table */}
                <div className="mt-6 border-t border-line">
                  {ROWS.map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center justify-between gap-3 border-b border-line py-3 last:border-b-0"
                    >
                      <p className="font-mono text-[0.625rem] tracking-[0.14em] text-grey tabular-nums">
                        {r.id}
                      </p>
                      <p className="flex-1 truncate text-[0.8125rem] text-paper/90">{r.title}</p>
                      <p className="hidden font-mono text-[0.625rem] tracking-[0.14em] text-fog/70 sm:block">
                        {r.site}
                      </p>
                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.14em] ${
                          r.status === "Verified"
                            ? "border-accent/45 text-accent"
                            : "border-line-strong text-fog"
                        }`}
                      >
                        {r.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* live feed */}
              <div className="p-5 md:p-7">
                <p className="mb-5 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-fog">
                  Live activity
                </p>
                <div className="flex min-h-[220px] flex-col gap-2.5" aria-hidden>
                  <AnimatePresence initial={false}>
                    {visibleFeed.map((f) => (
                      <motion.div
                        key={f.key}
                        layout
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.25, 0.6, 0.3, 1] }}
                        className="flex items-center gap-3 rounded-md border border-line bg-coal px-4 py-3.5"
                      >
                        <f.icon size={14} className="shrink-0 text-accent" strokeWidth={1.75} />
                        <p className="truncate text-[0.8125rem] text-paper/85">{f.text}</p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* SLA arc */}
                <div className="mt-6 flex items-center gap-5 border-t border-line pt-6">
                  <svg viewBox="0 0 80 80" className="h-16 w-16 shrink-0" role="img" aria-label="SLA gauge at 98.2 percent">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="var(--line)" strokeWidth="4" />
                    <circle
                      cx="40" cy="40" r="34" fill="none"
                      stroke="var(--accent)" strokeWidth="4" strokeLinecap="round"
                      strokeDasharray={`${0.982 * 213.6} 213.6`}
                      transform="rotate(-90 40 40)"
                    />
                    <text
                      x="40" y="44" textAnchor="middle"
                      className="fill-paper"
                      style={{ font: "600 13px var(--font-archivo), sans-serif" }}
                    >
                      98%
                    </text>
                  </svg>
                  <div>
                    <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-fog">
                      SLA this month
                    </p>
                    <p className="mt-1 text-[0.8125rem] leading-snug text-fog/80">
                      Evidence-backed, exportable, board-ready.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="eyebrow mt-6 text-center text-fog/50">
            Interface preview. The real thing ships 2026
          </p>
        </div>
      </div>
    </section>
  );
}
