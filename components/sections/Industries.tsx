"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";
import Marquee from "@/components/ui/Marquee";
import TransitionLink from "@/components/ui/TransitionLink";
import { INDUSTRIES } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/utils";

const EASE = [0.76, 0, 0.24, 1] as const;

export default function Industries() {
  const [active, setActive] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const moveX = useRef<((v: number) => void) | null>(null);
  const moveY = useRef<((v: number) => void) | null>(null);

  useEffect(() => {
    const el = previewRef.current;
    if (!el || prefersReducedMotion()) return;
    gsap.set(el, { xPercent: -112, yPercent: -50 });
    moveX.current = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3.out" });
    moveY.current = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3.out" });
  }, []);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    gsap.to(el, {
      opacity: active !== null ? 1 : 0,
      scale: active !== null ? 1 : 0.92,
      rotate: active !== null ? -2.5 : 0,
      duration: 0.45,
      ease: "power3.out",
    });
  }, [active]);

  const onMove = (e: React.MouseEvent) => {
    moveX.current?.(e.clientX);
    moveY.current?.(e.clientY);
  };

  return (
    <section id="industries" className="section" aria-labelledby="industries-title">
      {/* cursor-following preview (desktop) */}
      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-40 hidden h-[220px] w-[320px] overflow-hidden rounded-sm opacity-0 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] lg:block"
      >
        {INDUSTRIES.map((it, i) => (
          <Image
            key={it.id}
            src={it.image}
            alt=""
            fill
            sizes="320px"
            className={`object-cover transition-opacity duration-500 ${
              active === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div aria-hidden className="absolute inset-0 bg-ink/20" />
      </div>

      <div className="mx-auto max-w-[1680px] px-5 pt-36 pb-28 md:px-10 md:pt-52 md:pb-44">
        <FadeIn immediate delay={0.25} className="mb-14 flex items-baseline justify-between md:mb-20">
          <p className="eyebrow">( 01 ) — Industries</p>
          <p className="eyebrow hidden md:block">Wherever Operations Run</p>
        </FadeIn>

        <Reveal
          as="h1"
          immediate
          delay={0.35}
          id="industries-title"
          className="display max-w-5xl text-[clamp(2.8rem,8vw,8rem)]"
        >
          One platform. <em className="serif-i text-fog">Eleven worlds.</em>
        </Reveal>

        <FadeIn immediate delay={0.8} className="mt-8 max-w-xl md:mt-10">
          <p className="text-base leading-relaxed text-fog">
            NizamOps is operation-agnostic by design. The same disciplined core,
            configured to the rhythm of each industry it serves. Hover to
            glimpse a world, then select one to see how it runs on NizamOps.
          </p>
        </FadeIn>

        <ul
          className="mt-16 border-t border-line md:mt-24"
          onMouseLeave={() => setActive(null)}
          onMouseMove={onMove}
        >
          {INDUSTRIES.map((ind, i) => {
            const isActive = active === i;
            return (
              <li key={ind.id} className="relative overflow-hidden border-b border-line">
                {/* invert wash */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-paper"
                  initial={false}
                  animate={{ y: isActive ? "0%" : "101%" }}
                  transition={{ duration: 0.55, ease: EASE }}
                />
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(isActive ? null : i)}
                  aria-expanded={isActive}
                  className="group relative block w-full cursor-pointer text-left"
                >
                  <div className="relative grid grid-cols-12 items-center gap-3 px-1 py-6 md:py-8">
                    <span
                      className={`eyebrow col-span-2 transition-colors duration-300 md:col-span-1 ${
                        isActive ? "!text-grey" : ""
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`display col-span-10 text-[clamp(1.6rem,4.4vw,3.9rem)] transition-colors duration-300 md:col-span-5 ${
                        isActive ? "text-ink" : "text-paper"
                      }`}
                    >
                      {ind.name}
                    </span>
                    <span
                      className={`hidden text-sm leading-snug transition-colors duration-300 md:col-span-4 md:block ${
                        isActive ? "text-grey" : "text-fog/60"
                      }`}
                    >
                      {ind.headline}
                    </span>
                    <span
                      className={`hidden text-right text-sm leading-snug transition-colors duration-300 md:col-span-2 md:block ${
                        isActive ? "text-grey" : "text-fog/50"
                      }`}
                    >
                      {ind.benefit}
                    </span>
                  </div>
                </button>

                {/* expanded detail */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="relative overflow-hidden"
                    >
                      <div className="grid gap-6 px-1 pb-8 md:grid-cols-12">
                        <div className="relative hidden h-36 overflow-hidden rounded-sm md:col-span-3 md:col-start-2 md:block">
                          <Image
                            src={ind.image}
                            alt={ind.name}
                            fill
                            sizes="25vw"
                            className="object-cover"
                          />
                        </div>
                        <div className="md:col-span-4">
                          <p className="text-sm leading-relaxed text-grey">{ind.description}</p>
                          <p className="mt-3 text-sm leading-relaxed text-grey/80">{ind.useCase}</p>
                          <p className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-grey/80">
                            {ind.flow.join("  →  ")}
                          </p>
                        </div>
                        <div className="flex flex-col gap-4 md:col-span-3 md:col-start-10">
                          <div className="flex flex-wrap content-start items-start gap-2">
                            {ind.modules.map((m) => (
                              <span
                                key={m}
                                className="rounded-full border border-ink/25 px-3.5 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink"
                              >
                                {m}
                              </span>
                            ))}
                          </div>
                          <TransitionLink
                            href={`/industries/${ind.id}`}
                            className="group/link inline-flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink"
                          >
                            Full industry page
                            <ArrowUpRight
                              size={12}
                              className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                            />
                          </TransitionLink>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="hairline-t py-6 md:py-8">
        <Marquee duration={55} pauseOnHover={false}>
          {INDUSTRIES.map((ind) => (
            <span key={ind.id} className="flex items-center">
              <span className="display px-6 text-[clamp(1.4rem,2.6vw,2.2rem)] text-fog/45 md:px-10">
                {ind.name}
              </span>
              <span aria-hidden className="text-accent/60">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
