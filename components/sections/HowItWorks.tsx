"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STEPS = [
  {
    n: "01",
    name: "Intake",
    body: "Every request enters through one front door: portal, mobile, QR code or email, and is classified the moment it arrives.",
  },
  {
    n: "02",
    name: "Triage",
    body: "Severity, zone and skill decide the route. SLAs start counting. Nothing waits for someone to notice.",
  },
  {
    n: "03",
    name: "Execute",
    body: "Work orders land in the field app with the asset, the history and the checklist. Offline or online.",
  },
  {
    n: "04",
    name: "Verify",
    body: "Photo proof, signatures and inspections close the loop. Work isn't done until it's proven done.",
  },
  {
    n: "05",
    name: "Learn",
    body: "Every closed loop feeds the analytics, and soon, the AI that will run your operation ahead of failure.",
  },
];

/** The operating loop — five acts on a paper interlude. */
export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);

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
            trigger: "[data-steps]",
            start: "top 80%",
            end: "bottom 65%",
            scrub: 0.5,
          },
        }
      );

      gsap.from("[data-step]", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-steps]", start: "top 80%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} data-theme="light" className="section" aria-labelledby="how-title">
      <div className="mx-auto max-w-[1680px] px-5 py-28 md:px-10 md:py-44">
        <div className="mb-14 flex items-baseline justify-between md:mb-20">
          <p className="eyebrow">( 03 ) — The Loop</p>
          <p className="eyebrow hidden md:block">How NIZAM Runs</p>
        </div>

        <Reveal as="h2" id="how-title" className="display max-w-4xl text-[clamp(2.4rem,6vw,5.5rem)]">
          Five acts. <em className="serif-i" style={{ color: "var(--grey)" }}>Every operation.</em>
        </Reveal>

        <div data-steps className="relative mt-20 md:mt-28">
          <div aria-hidden className="absolute top-[3px] right-0 left-0 hidden h-px bg-line lg:block" />
          <div aria-hidden data-flow-line className="absolute top-[3px] right-0 left-0 hidden h-px lg:block" style={{ background: "var(--accent-dim)" }} />

          <ol className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            {STEPS.map((s, i) => (
              <li key={s.n} data-step className="relative lg:pt-10">
                <span
                  aria-hidden
                  className={`absolute top-0 left-0 hidden h-[7px] w-[7px] -translate-y-1/2 rounded-full lg:block ${
                    i === STEPS.length - 1 ? "bg-accent" : "bg-grey"
                  }`}
                  style={{ top: "3.5px" }}
                />
                <p className="font-mono text-[0.6875rem] tracking-[0.25em]" style={{ color: "var(--accent-dim)" }}>
                  {s.n}
                </p>
                <h3 className="display mt-3 text-2xl md:text-3xl">{s.name}</h3>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--grey)" }}>
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <FadeIn className="mt-24 md:mt-32">
          <p className="display mx-auto max-w-3xl text-center text-[clamp(1.7rem,3.8vw,3.2rem)]">
            Then it repeats,{" "}
            <em className="serif-i" style={{ color: "var(--accent-dim)" }}>
              a little smarter every time.
            </em>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
