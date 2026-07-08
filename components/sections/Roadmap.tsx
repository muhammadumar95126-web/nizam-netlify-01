"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";
import { ROADMAP } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STATUS_LABEL: Record<string, string> = {
  complete: "Complete",
  current: "In Progress",
  upcoming: "Upcoming",
};

const CURRENT_INDEX = ROADMAP.findIndex((s) => s.status === "current");

export default function Roadmap() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // spine draws down as you travel the timeline, stopping at the current stage
      gsap.fromTo(
        "[data-spine]",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: "[data-timeline]",
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>("[data-stage]").forEach((node) => {
        gsap.from(node, {
          opacity: 0,
          x: 24,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 85%", once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="roadmap" className="section hairline-t" aria-labelledby="roadmap-title">
      <div className="mx-auto max-w-[1680px] px-5 py-28 md:px-10 md:py-44">
        <div className="mb-14 flex items-baseline justify-between md:mb-20">
          <p className="eyebrow">( 01 ) — Roadmap</p>
          <p className="eyebrow hidden md:block">Watch It Being Built</p>
        </div>

        <div className="grid gap-16 lg:grid-cols-12">
          {/* sticky intro */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal as="h2" id="roadmap-title" className="display text-[clamp(2.6rem,6vw,5.5rem)]">
                Built in the open.
                <br />
                <em className="serif-i text-fog">Launched with intent.</em>
              </Reveal>
              <FadeIn className="mt-8 max-w-md">
                <p className="text-base leading-relaxed text-fog">
                  No vaporware, no invented completion percentages: this is
                  the actual sequence NizamOps is following, stage by stage,
                  from the site you're looking at now to a full smart-city
                  platform.
                </p>
              </FadeIn>
              <FadeIn className="mt-12 border-t border-line pt-10">
                <p className="eyebrow mb-4">Current stage</p>
                <p className="display text-[clamp(2rem,4vw,3.2rem)] leading-tight text-paper">
                  {ROADMAP[CURRENT_INDEX]?.title ?? ROADMAP[0].title}
                </p>
              </FadeIn>
            </div>
          </div>

          {/* timeline */}
          <div data-timeline className="relative lg:col-span-7">
            <div aria-hidden className="absolute top-0 bottom-0 left-[3px] w-px bg-line" />
            <div aria-hidden data-spine className="absolute top-0 bottom-0 left-[3px] w-px bg-accent" />

            <ol className="flex flex-col gap-16 pl-10 md:gap-20">
              {ROADMAP.map((stage) => (
                <li key={stage.index} data-stage className="relative">
                  <span
                    aria-hidden
                    className={`absolute top-2 -left-[36.5px] h-[7px] w-[7px] rounded-full ${
                      stage.status === "upcoming" ? "bg-grey" : "bg-accent"
                    }`}
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <p className="font-mono text-xs tracking-[0.25em] text-accent">
                      {stage.index}
                    </p>
                    <p
                      className={`rounded-full border px-3 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.18em] ${
                        stage.status === "current"
                          ? "border-accent/50 text-accent"
                          : stage.status === "complete"
                            ? "border-line-strong text-fog"
                            : "border-line text-grey"
                      }`}
                    >
                      {STATUS_LABEL[stage.status]}
                    </p>
                  </div>
                  <h3 className="display mt-3 text-3xl md:text-5xl">{stage.title}</h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-fog">
                    {stage.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
