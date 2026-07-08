"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, ScanLine, ClipboardEdit, Camera, CheckCircle2, LayoutDashboard } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";
import { MOBILE_STEPS } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/utils";

const EASE = [0.65, 0.05, 0.18, 1] as const;

const STEP_ICONS = [Smartphone, ScanLine, ClipboardEdit, Camera, CheckCircle2, LayoutDashboard];

type MobileShowcaseProps = { index?: string };

/** Animated phone storyboard — one field job, start to finish. */
export default function MobileShowcase({ index = "08" }: MobileShowcaseProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setStep((s) => (s + 1) % MOBILE_STEPS.length), 3200);
    return () => clearInterval(id);
  }, []);

  const current = MOBILE_STEPS[step];
  const Icon = STEP_ICONS[step % STEP_ICONS.length];

  return (
    <section className="section hairline-t" aria-labelledby="mobile-title">
      <div className="mx-auto max-w-[1680px] px-5 py-28 md:px-10 md:py-44">
        <div className="mb-14 flex items-baseline justify-between md:mb-20">
          <p className="eyebrow">( {index} ) — Mobile Experience</p>
          <p className="eyebrow hidden md:block">One Job, Start to Finish</p>
        </div>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal as="h2" id="mobile-title" className="display max-w-xl text-[clamp(2.4rem,6vw,5.5rem)]">
              Designed for
              <br />
              <em className="serif-i text-fog">the field, first.</em>
            </Reveal>
            <FadeIn className="mt-8 max-w-md">
              <p className="text-base leading-relaxed text-fog">
                A technician's whole job lives on their phone: the task, the
                asset's history, the checklist and the proof, online or off.
              </p>
            </FadeIn>

            {/* step list */}
            <div className="mt-12 flex flex-col gap-1">
              {MOBILE_STEPS.map((s, i) => (
                <button
                  key={s.index}
                  type="button"
                  onClick={() => setStep(i)}
                  className={`flex items-center gap-4 rounded-md border border-transparent px-3 py-3 text-left transition-colors duration-300 ${
                    i === step ? "border-line-strong bg-coal" : "hover:bg-coal/50"
                  }`}
                >
                  <span
                    className={`font-mono text-[0.625rem] tracking-[0.22em] transition-colors duration-300 ${
                      i === step ? "text-accent" : "text-grey"
                    }`}
                  >
                    {s.index}
                  </span>
                  <span
                    className={`text-sm transition-colors duration-300 ${
                      i === step ? "text-paper" : "text-fog/70"
                    }`}
                  >
                    {s.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* phone mockup */}
          <div className="flex items-center justify-center lg:col-span-6">
            <div className="relative w-full max-w-[300px] rounded-[2.2rem] border border-line-strong bg-smoke p-3 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-center gap-2 pb-3 pt-1">
                <span className="h-1 w-10 rounded-full bg-line-strong" />
              </div>
              <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-line bg-coal p-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="flex h-full flex-col"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                        <Icon size={14} strokeWidth={1.75} />
                      </span>
                      <p className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-fog">
                        Step {current.index}
                      </p>
                    </div>
                    <h3 className="display mt-6 text-xl text-paper">{current.title}</h3>
                    <p className="mt-3 text-[0.8125rem] leading-relaxed text-fog">{current.caption}</p>

                    <div className="mt-auto flex flex-col gap-2 pt-6">
                      {step === 1 ? (
                        <div className="flex aspect-square w-full items-center justify-center rounded-lg border border-dashed border-line-strong">
                          <ScanLine size={40} className="text-accent/60" strokeWidth={1} />
                        </div>
                      ) : (
                        <div className="rounded-lg border border-line bg-smoke p-3.5">
                          <div className="flex items-center justify-between">
                            <p className="text-[0.75rem] text-paper/90">WO-4832</p>
                            <span className="rounded-full border border-accent/45 px-2 py-0.5 font-mono text-[0.5rem] uppercase tracking-[0.14em] text-accent">
                              {step >= 4 ? "Complete" : "Active"}
                            </span>
                          </div>
                          <p className="mt-1 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-fog/60">
                            Cooling Tower · Plant 2
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
