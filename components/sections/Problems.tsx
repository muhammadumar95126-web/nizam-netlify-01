"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/ui/Reveal";
import { PROBLEMS } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Paper-white interlude. Problem cards stack and compress as you scroll. */
export default function Problems() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-problem-card]");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, {
          scale: 0.94 - (cards.length - 2 - i) * 0.012,
          opacity: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top+=140",
            scrub: true,
          },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="problems"
      data-theme="light"
      className="section"
      aria-labelledby="problems-title"
    >
      <div className="mx-auto max-w-[1680px] px-5 py-28 md:px-10 md:py-44">
        <div className="mb-14 flex items-baseline justify-between md:mb-20">
          <p className="eyebrow">( 02 ) — The Problem</p>
          <p className="eyebrow hidden md:block">Why We Exist</p>
        </div>

        <Reveal
          as="h2"
          className="display max-w-5xl text-[clamp(2.6rem,7vw,6.5rem)]"
        >
          Operations are the last <em className="serif-i">unsolved</em> layer of
          the enterprise.
        </Reveal>

        <div className="mt-20 flex flex-col gap-6 md:mt-32">
          {PROBLEMS.map((p, i) => (
            <div
              key={p.index}
              data-problem-card
              className="sticky border border-line-strong bg-paper px-6 py-10 will-change-transform md:px-14 md:py-16"
              style={{ top: `calc(96px + ${i * 14}px)` }}
            >
              <div className="grid gap-6 md:grid-cols-12 md:items-baseline">
                <p className="eyebrow md:col-span-2">/ {p.index}</p>
                <h3 className="display text-[clamp(1.9rem,4vw,3.6rem)] md:col-span-4">
                  {p.title}
                </h3>
                <p className="max-w-xl text-base leading-relaxed text-grey md:col-span-6 md:text-lg">
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 md:mt-36">
          <Reveal
            as="p"
            className="display mx-auto max-w-4xl text-center text-[clamp(1.9rem,4.6vw,4rem)]"
          >
            Point solutions digitize tasks.{" "}
            <em className="serif-i text-accent-dim" style={{ color: "var(--accent-dim)" }}>
              NIZAM unifies the operation.
            </em>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
