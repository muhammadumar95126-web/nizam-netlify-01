"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, ShieldCheck } from "lucide-react";
import type Lenis from "lenis";
import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";
import Magnetic from "@/components/ui/MagneticButton";
import FloatingPanel from "@/components/ui/FloatingPanel";
import ComingSoonModal from "@/components/ComingSoonModal";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EASE = [0.76, 0, 0.24, 1] as const;

const SNAPSHOT_KPIS = [
  { label: "Open work orders", value: "142" },
  { label: "SLA compliance", value: "98.6%" },
  { label: "Assets online", value: "5,204" },
];

const SNAPSHOT_ROWS = [
  { id: "WO-5102", title: "Rooftop unit inspection", status: "In Progress" },
  { id: "WO-5098", title: "Lobby access control", status: "Scheduled" },
  { id: "WO-5091", title: "Fire pump certification", status: "Verified" },
];

type Phase = "idle" | "launching" | "loading" | "modal";

function BrowserFrame({ scale = 1 }: { scale?: number }) {
  return (
    <div
      className="overflow-hidden rounded-xl border border-line-strong bg-smoke shadow-[0_60px_120px_-40px_rgba(0,0,0,0.8)]"
      style={{ transform: `scale(${scale})` }}
    >
      <div className="flex items-center gap-4 border-b border-line px-5 py-3.5 md:px-7">
        <div aria-hidden className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-grey/50" />
          <span className="h-2 w-2 rounded-full bg-grey/35" />
          <span className="h-2 w-2 rounded-full bg-grey/25" />
        </div>
        <div className="flex-1 rounded-full border border-line bg-coal px-4 py-1.5 text-center font-mono text-[0.625rem] tracking-[0.1em] text-fog/70">
          app.nizamops.io
        </div>
      </div>
      <div className="grid grid-cols-1 gap-px border-b border-line bg-line sm:grid-cols-3">
        {SNAPSHOT_KPIS.map((k) => (
          <div key={k.label} className="bg-smoke px-5 py-6 md:px-7">
            <p className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-grey">{k.label}</p>
            <p className="mt-3 font-display text-2xl font-medium tracking-tight text-paper md:text-3xl">
              {k.value}
            </p>
          </div>
        ))}
      </div>
      <div className="p-5 md:p-7">
        {SNAPSHOT_ROWS.map((r) => (
          <div key={r.id} className="flex items-center justify-between gap-3 border-b border-line py-3 last:border-b-0">
            <p className="font-mono text-[0.625rem] tracking-[0.14em] text-grey">{r.id}</p>
            <p className="flex-1 truncate text-[0.8125rem] text-paper/90">{r.title}</p>
            <span
              className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.14em] ${
                r.status === "Verified" ? "border-accent/45 text-accent" : "border-line-strong text-fog"
              }`}
            >
              {r.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPreview({ index = "09" }: { index?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
    };
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-preview-frame]",
        { clipPath: "inset(10% 5% 10% 5%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-preview-frame]", start: "top 85%", once: true },
        }
      );
    },
    { scope: ref }
  );

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (phase !== "idle") {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [phase]);

  const launch = () => {
    setPhase("launching");
    timers.current.push(setTimeout(() => setPhase("loading"), 700));
    timers.current.push(setTimeout(() => setPhase("modal"), 1900));
  };

  const close = () => setPhase("idle");
  const reduced = prefersReducedMotion();

  return (
    <section ref={ref} className="section hairline-t relative" aria-labelledby="dashboard-preview-title">
      <div className="mx-auto max-w-[1680px] px-5 py-28 md:px-10 md:py-44">
        <div className="mb-14 flex items-baseline justify-between md:mb-20">
          <p className="eyebrow">( {index} ) — Dashboard Preview</p>
          <p className="eyebrow eyebrow-accent hidden md:block">Coming Soon</p>
        </div>

        <div className="mb-16 grid gap-8 md:mb-24 md:grid-cols-12 md:items-end">
          <Reveal
            as="h2"
            id="dashboard-preview-title"
            className="display text-[clamp(2.6rem,7vw,6.5rem)] md:col-span-8"
          >
            Step inside the
            <br />
            <em className="serif-i text-fog">Command Center.</em>
          </Reveal>
          <FadeIn className="md:col-span-4">
            <p className="max-w-sm text-base leading-relaxed text-fog">
              A first look at the live NizamOps Dashboard, launching to
              founding members before anyone else.
            </p>
          </FadeIn>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div data-preview-frame className="relative">
            <BrowserFrame />
            <div className="absolute inset-0 flex items-center justify-center bg-ink/25">
              <Magnetic
                as="button"
                type="button"
                onClick={launch}
                strength={0.3}
                className="btn btn-solid inline-flex items-center gap-2"
              >
                <Rocket size={15} strokeWidth={1.75} />
                Launch Live Dashboard
              </Magnetic>
            </div>
          </div>

          <FloatingPanel
            variant="notification"
            className="hidden lg:flex -left-16 top-10 w-56"
            duration={7}
          />
          <FloatingPanel
            variant="chart"
            className="hidden lg:flex -right-14 top-1/3 w-52"
            duration={8}
            delay={0.6}
          />
          <FloatingPanel
            variant="approval"
            className="hidden lg:flex -left-10 bottom-8 w-52"
            duration={6.5}
            delay={1.1}
          />
        </div>
      </div>

      {/* launch sequence overlay */}
      <AnimatePresence>
        {phase !== "idle" && phase !== "modal" && (
          <motion.div
            className="safe-top safe-bottom safe-x fixed inset-0 z-[340] flex justify-center overflow-y-auto p-6 py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.4 }}
          >
            <div aria-hidden className="absolute inset-0 bg-ink/92 backdrop-blur-lg" />
            <motion.div
              className="relative z-10 m-auto w-full max-w-3xl"
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.82 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              transition={{ duration: reduced ? 0 : 0.7, ease: EASE }}
            >
              <BrowserFrame />
              <AnimatePresence>
                {phase === "loading" && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-8 flex flex-col items-center gap-4"
                  >
                    <ShieldCheck size={20} className="text-accent" strokeWidth={1.5} />
                    <p className="eyebrow">Preparing your preview…</p>
                    <div className="h-px w-64 overflow-hidden bg-line">
                      <motion.div
                        className="h-px bg-accent"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.1, ease: "easeInOut" }}
                        style={{ transformOrigin: "left center" }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ComingSoonModal
        open={phase === "modal"}
        onClose={close}
        eyebrow="Command Center"
        title="NizamOps Dashboard"
      />
    </section>
  );
}
