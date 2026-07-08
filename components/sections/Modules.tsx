"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { MODULES } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Pinned horizontal gallery — nine modules travel across the viewport. */
export default function Modules() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const track = trackRef.current;
      const section = ref.current;
      if (!track || !section) return;

      const getDistance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      gsap.to("[data-modules-progress]", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 0.7,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
      };
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="modules" className="section hairline-t overflow-hidden" aria-labelledby="modules-title">
      <div className="flex h-svh flex-col justify-center">
        <div className="mx-auto mb-10 flex w-full max-w-[1680px] items-baseline justify-between px-5 md:mb-14 md:px-10">
          <p className="eyebrow">( 04 ) — The Platform</p>
          <p className="eyebrow hidden md:block">Drag Through the System</p>
        </div>

        <div ref={trackRef} className="flex w-max items-stretch gap-4 px-5 will-change-transform md:gap-6 md:px-10">
          {/* intro panel */}
          <div className="flex w-[82vw] shrink-0 flex-col justify-center pr-6 md:w-[38vw]">
            <h2 id="modules-title" className="display text-[clamp(2.4rem,5.5vw,5.2rem)]">
              Nine modules.
              <br />
              <em className="serif-i text-fog">One discipline.</em>
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-fog">
              Each module is complete on its own, and exponentially more
              powerful together. Data flows natively between them, because they
              were born in the same system.
            </p>
            <p className="eyebrow mt-10 flex items-center gap-3">
              Scroll to explore <ArrowRight size={12} aria-hidden />
            </p>
          </div>

          {MODULES.map((m) => (
            <article
              key={m.index}
              className="group relative flex w-[78vw] shrink-0 flex-col justify-between overflow-hidden border border-line bg-coal p-7 transition-colors duration-500 hover:border-line-strong sm:w-[420px] md:p-9"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                style={{ background: "rgba(194,168,120,0.14)" }}
              />
              <div>
                <div className="flex items-start justify-between">
                  <p className="font-mono text-[0.6875rem] tracking-[0.25em] text-grey">
                    /{m.index}
                  </p>
                  {m.status === "soon" && (
                    <span className="rounded-full border border-accent/40 px-3 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-accent">
                      Coming Soon
                    </span>
                  )}
                </div>
                <h3 className="display mt-14 text-[clamp(1.8rem,3vw,2.6rem)] md:mt-20">
                  {m.name}
                </h3>
                <p className="serif-i mt-2 text-lg text-fog">{m.tagline}</p>
                <p className="mt-6 text-sm leading-relaxed text-fog/80">
                  {m.description}
                </p>
              </div>
              <ul className="mt-10 flex flex-wrap gap-2">
                {m.capabilities.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-fog transition-colors duration-300 group-hover:border-line-strong"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </article>
          ))}

          {/* outro panel */}
          <div className="flex w-[70vw] shrink-0 flex-col items-start justify-center pl-6 md:w-[30vw]">
            <p className="display text-[clamp(1.8rem,3.4vw,3rem)] text-fog">
              And the platform is
              <br />
              <em className="serif-i text-paper">built to grow.</em>
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-fog/80">
              New modules join the system without integration projects. Your
              platform expands the day we ship.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 w-full max-w-[1680px] px-5 md:mt-16 md:px-10">
          <div className="h-px w-full bg-line">
            <div
              data-modules-progress
              className="h-px origin-left scale-x-0 bg-accent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
