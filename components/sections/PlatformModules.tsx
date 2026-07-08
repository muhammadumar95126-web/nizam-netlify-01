"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeIn from "@/components/ui/FadeIn";
import { MODULES } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** The nine modules, at full depth — an editorial ledger with a drawing spine. */
export default function PlatformModules() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.fromTo(
        "[data-spine]",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: "[data-ledger]",
            start: "top 75%",
            end: "bottom 70%",
            scrub: 0.5,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>("[data-module-row]").forEach((row) => {
        gsap.from(row.children, {
          opacity: 0,
          y: 40,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 85%", once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="section hairline-t" aria-label="Platform modules">
      <div className="mx-auto max-w-[1680px] px-5 py-28 md:px-10 md:py-40">
        <FadeIn className="mb-16 flex items-baseline justify-between md:mb-24">
          <p className="eyebrow">( 02 ) — The Modules</p>
          <p className="eyebrow hidden md:block">Complete Alone · Exponential Together</p>
        </FadeIn>

        <div data-ledger className="relative">
          <div aria-hidden className="absolute top-0 bottom-0 left-0 hidden w-px bg-line lg:block" />
          <div aria-hidden data-spine className="absolute top-0 bottom-0 left-0 hidden w-px bg-accent lg:block" />

          <div className="flex flex-col">
            {MODULES.map((m) => (
              <article
                key={m.index}
                data-module-row
                className="group grid gap-6 border-b border-line py-14 transition-colors duration-500 first:border-t md:py-20 lg:grid-cols-12 lg:pl-12"
              >
                <div className="lg:col-span-2">
                  <p className="font-mono text-[0.6875rem] tracking-[0.25em] text-accent">/{m.index}</p>
                  {m.status === "soon" && (
                    <p className="mt-3 inline-block rounded-full border border-accent/40 px-3 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-accent">
                      Coming Soon
                    </p>
                  )}
                </div>

                <div className="lg:col-span-6">
                  <h2 className="display text-[clamp(2rem,4.5vw,3.8rem)] transition-colors duration-500 group-hover:text-accent">
                    {m.name}
                  </h2>
                  <p className="serif-i mt-2 text-xl text-fog">{m.tagline}</p>
                  <p className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-fog/85">
                    {m.description}
                  </p>
                </div>

                <ul className="flex flex-col lg:col-span-4 lg:col-start-9">
                  {m.capabilities.map((c) => (
                    <li
                      key={c}
                      className="flex items-center justify-between border-b border-line py-3.5 text-sm text-paper/85 last:border-b-0"
                    >
                      {c}
                      <span aria-hidden className="h-1 w-1 rounded-full bg-accent/70" />
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
