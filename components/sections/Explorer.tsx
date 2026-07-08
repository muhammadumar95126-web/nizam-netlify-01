"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Landmark,
  Building2,
  Hotel,
  HeartPulse,
  GraduationCap,
  ShoppingBag,
  PlaneTakeoff,
  Factory,
  Warehouse,
  ClipboardCheck,
  Building,
  type LucideIcon,
} from "lucide-react";
import Meridian from "@/components/canvas/Meridian";
import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";
import TransitionLink from "@/components/ui/TransitionLink";
import { INDUSTRIES } from "@/lib/data";
import { useIndustry } from "@/lib/industry-context";

const STEP = 360 / INDUSTRIES.length;
const EASE = [0.65, 0.05, 0.18, 1] as const;
// slight overshoot-and-settle — used identically on the ring and its
// counter-rotating nodes so they stay perfectly locked together
const ORBIT_EASE = [0.34, 1.42, 0.42, 1] as const;
const RING_TILT = 54; // degrees — how far the orbit plane leans away from the viewer

const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  government: Landmark,
  housing: Building2,
  hotels: Hotel,
  hospitals: HeartPulse,
  universities: GraduationCap,
  malls: ShoppingBag,
  airports: PlaneTakeoff,
  factories: Factory,
  industrial: Warehouse,
  fm: ClipboardCheck,
  enterprise: Building,
};

/**
 * The Operations Explorer — NizamOps's signature interaction.
 * A rotating 3D-tilted ring of eleven worlds around one ordered core;
 * selecting a world sends a pulse through the system and shifts the
 * whole scene — plus every downstream section on the page.
 */
export default function Explorer() {
  const { active, interacted, select: ctxSelect, setPaused } = useIndustry();
  const [pulse, setPulse] = useState(0);
  const pulseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ind = INDUSTRIES[active];

  useEffect(() => {
    return () => {
      if (pulseTimer.current) clearTimeout(pulseTimer.current);
    };
  }, []);

  const select = (i: number) => {
    if (i === active) {
      ctxSelect(i);
      return;
    }
    ctxSelect(i);
    setPulse((p) => p + 1);
    if (pulseTimer.current) clearTimeout(pulseTimer.current);
    pulseTimer.current = setTimeout(() => setPulse(0), 900);
  };

  return (
    <section id="explorer" className="section hairline-t relative overflow-hidden" aria-labelledby="explorer-title">
      {/* atmospheric backdrop reacting to the selected world */}
      <AnimatePresence>
        <motion.div
          key={ind.id}
          aria-hidden
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        >
          <Image
            src={ind.image}
            alt=""
            fill
            sizes="100vw"
            className="scale-105 object-cover opacity-[0.13] grayscale"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 30% 45%, rgba(11,11,10,0.55), rgba(11,11,10,0.94) 75%)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative mx-auto max-w-[1680px] px-5 py-28 md:px-10 md:py-44">
        <div className="mb-14 flex items-baseline justify-between md:mb-20">
          <p className="eyebrow">( 03 ) — Operations Explorer</p>
          <p className="eyebrow eyebrow-accent hidden md:block">Signature</p>
        </div>

        <Reveal as="h2" id="explorer-title" className="display max-w-5xl text-[clamp(2.6rem,7vw,6.5rem)]">
          Choose a world.{" "}
          <em className="serif-i text-fog">Watch it come to order.</em>
        </Reveal>
        <FadeIn className="mt-8 max-w-xl">
          <p className="text-base leading-relaxed text-fog">
            Eleven industries orbit one core. Select one, or let the system
            rotate, and see how NizamOps shapes itself to that operation.
          </p>
        </FadeIn>

        {/* mobile industry picker */}
        <div className="mt-14 flex gap-2 overflow-x-auto pb-3 lg:hidden" role="tablist" aria-label="Industries">
          {INDUSTRIES.map((it, i) => (
            <button
              key={it.id}
              role="tab"
              aria-selected={i === active}
              onClick={() => select(i)}
              className={`shrink-0 cursor-pointer rounded-full border px-4 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.18em] transition-colors duration-300 ${
                i === active
                  ? "border-accent bg-accent text-ink"
                  : "border-line text-fog hover:border-line-strong"
              }`}
            >
              {it.name}
            </button>
          ))}
        </div>

        <div className="mt-6 grid items-center gap-14 lg:mt-20 lg:grid-cols-2 lg:gap-10">
          {/* ——— The Dial ——— */}
          <div
            className="relative mx-auto hidden w-full max-w-[620px] lg:block"
            style={{ perspective: 1400 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative aspect-square">
              {/* tilted orbit plane — guide rings + nodes live in 3D space, the core stays flat/upright */}
              <div
                className="absolute inset-0"
                style={{ transformStyle: "preserve-3d", transform: `rotateX(${RING_TILT}deg)` }}
              >
                <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="49.6" fill="none" stroke="var(--line)" strokeWidth="0.15" />
                  <circle
                    cx="50" cy="50" r="43" fill="none"
                    stroke="var(--line-strong)" strokeWidth="0.18"
                    strokeDasharray="0.28 1.9"
                  />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="var(--line)" strokeWidth="0.15" />
                </svg>

                {/* rotating wheel of labels */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: -active * STEP }}
                  transition={{ duration: 1.35, ease: ORBIT_EASE }}
                >
                  {INDUSTRIES.map((it, i) => {
                    const Icon = INDUSTRY_ICONS[it.id];
                    const rel = (((i - active) * STEP + 180) % 360 + 360) % 360 - 180;
                    const depth = Math.cos((rel * Math.PI) / 180); // 1 = front, -1 = back
                    const scale = 0.78 + 0.28 * ((depth + 1) / 2);
                    const nodeOpacity = 0.4 + 0.6 * ((depth + 1) / 2);
                    return (
                      <div
                        key={it.id}
                        className="pointer-events-none absolute inset-0"
                        style={{ transform: `rotate(${i * STEP}deg)` }}
                      >
                        <motion.button
                          onClick={() => select(i)}
                          aria-label={`Explore ${it.name}`}
                          aria-pressed={i === active}
                          className="pointer-events-auto absolute top-1/2 right-0 flex -translate-y-1/2 translate-x-1/3 cursor-pointer items-center gap-2 p-2"
                          animate={{ rotate: (active - i) * STEP, scale, opacity: nodeOpacity }}
                          transition={{
                            rotate: { duration: 1.35, ease: ORBIT_EASE },
                            scale: { duration: 1.35, ease: EASE },
                            opacity: { duration: 1.35, ease: EASE },
                          }}
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          <span
                            className={`flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-500 ${
                              i === active
                                ? "border-accent bg-accent/15 text-accent"
                                : "border-line-strong text-grey"
                            }`}
                          >
                            <Icon size={12} strokeWidth={1.75} aria-hidden />
                          </span>
                          <span
                            className={`font-mono text-[0.625rem] uppercase tracking-[0.18em] whitespace-nowrap transition-colors duration-500 ${
                              i === active ? "text-accent" : "text-fog/55 hover:text-paper"
                            }`}
                          >
                            {it.name}
                          </span>
                        </motion.button>
                      </div>
                    );
                  })}
                </motion.div>
              </div>

              {/* selection pointer at 3 o'clock */}
              <div aria-hidden className="absolute top-1/2 -right-1 h-px w-10 -translate-y-1/2 bg-accent" />

              {/* selection ripple */}
              <AnimatePresence>
                {pulse > 0 && (
                  <motion.div
                    key={pulse}
                    aria-hidden
                    className="pointer-events-none absolute inset-[17%] rounded-full border border-accent/50"
                    initial={{ scale: 0.6, opacity: 0.7 }}
                    animate={{ scale: 1.35, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                  />
                )}
              </AnimatePresence>

              {/* the core — flat, upright, facing the viewer */}
              <div className="pointer-events-none absolute inset-[17%]">
                <Meridian
                  className="h-full w-full"
                  radiusScale={0.46}
                  speed={1.4}
                  activity={pulse > 0 ? 2.4 : 1}
                  interactive={false}
                />
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={ind.id}
                      initial={{ opacity: 0, y: 14, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -14, scale: 0.98 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="text-center"
                    >
                      <p className="display max-w-[190px] text-2xl leading-snug text-paper">{ind.essence}</p>
                      <p className="eyebrow mt-3 max-w-[200px]">{ind.name}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
            <p className="eyebrow mt-6 text-center text-fog/50">
              {interacted ? "Manual control" : "Auto-orbit. Select to take control"}
            </p>
          </div>

          {/* ——— The Story Panel ——— */}
          <div aria-live="polite" className="relative min-h-[560px] lg:pl-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                {/* world image */}
                <div className="relative mb-8 h-44 overflow-hidden rounded-sm md:h-52">
                  <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.12 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.3, ease: EASE }}
                  >
                    <Image
                      src={ind.image}
                      alt={ind.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover grayscale-[35%]"
                    />
                  </motion.div>
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-ink/25"
                  />
                  <div className="absolute bottom-4 left-5 flex items-baseline gap-3">
                    <span className="font-mono text-[0.625rem] tracking-[0.22em] text-accent">
                      {String(active + 1).padStart(2, "0")} / {INDUSTRIES.length}
                    </span>
                    <span className="eyebrow !text-paper">{ind.name}</span>
                  </div>
                </div>

                <h3 className="display max-w-lg text-[clamp(1.9rem,3.6vw,3.2rem)]">
                  {ind.headline}
                </h3>
                <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-fog">
                  {ind.description}
                </p>
                <p className="mt-3 max-w-md text-[0.875rem] leading-relaxed text-fog/70">
                  {ind.useCase}
                </p>

                {/* operation flow */}
                <div className="mt-9">
                  <p className="eyebrow mb-5">A live operation, end to end</p>
                  <ol className="relative flex flex-col gap-0 border-l border-line pl-6">
                    {ind.flow.map((step, i) => (
                      <motion.li
                        key={step}
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.13, duration: 0.5, ease: EASE }}
                        className="relative pb-5 last:pb-0"
                      >
                        <span
                          className={`absolute top-1.5 -left-[27.5px] h-[7px] w-[7px] rounded-full ${
                            i === ind.flow.length - 1 ? "bg-accent" : "bg-grey"
                          }`}
                        />
                        <span className="font-mono text-[0.625rem] tracking-[0.22em] text-grey">
                          0{i + 1}
                        </span>
                        <span className="ml-4 font-sans text-[0.95rem] text-paper">{step}</span>
                      </motion.li>
                    ))}
                  </ol>
                </div>

                {/* modules in play */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {ind.modules.map((m, i) => (
                    <motion.span
                      key={m}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.09, duration: 0.4 }}
                      className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-fog"
                    >
                      {m}
                    </motion.span>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.85, duration: 0.5 }}
                  className="mt-9"
                >
                  <TransitionLink
                    href="/book-demo"
                    className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-accent"
                  >
                    See NizamOps for {ind.name}
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </TransitionLink>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
