"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";
import { WORKFLOW, INDUSTRIES } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/utils";
import { useIndustry } from "@/lib/industry-context";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type WorkflowProps = { index?: string; industryName?: string };

/** The full lifecycle of a single issue, start to notification. */
export default function Workflow({ index = "04", industryName }: WorkflowProps) {
  const ref = useRef<HTMLElement>(null);
  const { active } = useIndustry();
  const shownFor = industryName ?? INDUSTRIES[active].name;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.fromTo(
        "[data-flow-line]",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          ease: "none",
          scrollTrigger: {
            trigger: "[data-workflow-steps]",
            start: "top 78%",
            end: "bottom 55%",
            scrub: 0.5,
          },
        }
      );

      gsap.from("[data-workflow-step]", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-workflow-steps]", start: "top 80%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="section hairline-t" aria-labelledby="workflow-title">
      <div className="mx-auto max-w-[1680px] px-5 py-28 md:px-10 md:py-44">
        <div className="mb-14 flex items-baseline justify-between md:mb-20">
          <p className="eyebrow">( {index} ) — How It Works</p>
          <p className="eyebrow hidden md:block">
            Shown for <span className="eyebrow-accent">{shownFor}</span>
          </p>
        </div>

        <Reveal as="h2" id="workflow-title" className="display max-w-4xl text-[clamp(2.4rem,6vw,5.5rem)]">
          Eight steps.
          <br />
          <em className="serif-i text-fog">Zero blind spots.</em>
        </Reveal>
        <FadeIn className="mt-8 max-w-xl">
          <p className="text-base leading-relaxed text-fog">
            Every issue at a {shownFor.toLowerCase()} operation follows the
            same disciplined path in NizamOps, from the first report to the
            moment the person who raised it knows it's done.
          </p>
        </FadeIn>

        <div data-workflow-steps className="relative mt-20 md:mt-28">
          <div aria-hidden className="absolute top-[3px] right-0 left-0 hidden h-px bg-line lg:block" />
          <div
            aria-hidden
            data-flow-line
            className="absolute top-[3px] right-0 left-0 hidden h-px lg:block"
            style={{ background: "var(--accent-dim)" }}
          />

          <ol className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {WORKFLOW.map((step, i) => (
              <li key={step.index} data-workflow-step className="relative lg:pt-10">
                <span
                  aria-hidden
                  className={`absolute top-0 left-0 hidden h-[7px] w-[7px] -translate-y-1/2 rounded-full lg:block ${
                    i === WORKFLOW.length - 1 ? "bg-accent" : "bg-grey"
                  }`}
                  style={{ top: "3.5px" }}
                />
                <p className="font-mono text-[0.6875rem] tracking-[0.25em]" style={{ color: "var(--accent-dim)" }}>
                  {step.index}
                </p>
                <h3 className="display mt-3 text-xl md:text-2xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fog">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
