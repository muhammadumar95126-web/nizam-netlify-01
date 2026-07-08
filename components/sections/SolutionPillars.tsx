"use client";

import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { SOLUTIONS } from "@/lib/data";

/** Four pillars — alternating editorial image/text movements. */
export default function SolutionPillars() {
  return (
    <section className="section" aria-label="How NIZAM solves it">
      <div className="mx-auto flex max-w-[1680px] flex-col gap-28 px-5 pb-28 md:gap-44 md:px-10 md:pb-44">
        {SOLUTIONS.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <article
              key={s.id}
              className="grid items-center gap-10 lg:grid-cols-12 lg:gap-0"
            >
              <div
                className={`lg:col-span-6 ${flip ? "lg:order-2 lg:col-start-7 lg:pl-16" : "lg:pr-16"}`}
              >
                <FadeIn as="p" className="eyebrow eyebrow-accent">
                  ( 0{i + 3} ) — {s.title}
                </FadeIn>
                <Reveal as="h2" className="display mt-6 text-[clamp(2rem,4.6vw,4rem)]">
                  {s.headline}
                </Reveal>
                <FadeIn className="mt-6 max-w-lg">
                  <p className="text-[0.95rem] leading-relaxed text-fog">{s.body}</p>
                </FadeIn>
                <FadeIn staggerChildren={0.07} className="mt-9 flex flex-col">
                  {s.points.map((p) => (
                    <div
                      key={p}
                      className="flex items-center justify-between border-b border-line py-3.5 text-sm text-paper/85 last:border-b-0"
                    >
                      {p}
                      <span aria-hidden className="h-1 w-1 rounded-full bg-accent/70" />
                    </div>
                  ))}
                </FadeIn>
              </div>

              <ParallaxImage
                src={s.image}
                alt={s.title}
                className={`aspect-[4/3] w-full lg:col-span-6 lg:aspect-[4/5] ${
                  flip ? "lg:order-1 lg:col-start-1" : ""
                }`}
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
