"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const STATS = [
  { value: "09", label: "Unified modules" },
  { value: "11", label: "Industries served" },
  { value: "01", label: "System of record" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // words brighten as the reader scrolls through the statement
      SplitText.create("[data-wordfill]", {
        type: "words",
        autoSplit: true,
        onSplit: (self) =>
          gsap.fromTo(
            self.words,
            { opacity: 0.13 },
            {
              opacity: 1,
              stagger: 0.35,
              ease: "none",
              scrollTrigger: {
                trigger: "[data-wordfill]",
                start: "top 78%",
                end: "bottom 45%",
                scrub: 0.6,
              },
            }
          ),
      });

      gsap.from("[data-stat]", {
        opacity: 0,
        y: 28,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-stats]", start: "top 88%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="about" className="section hairline-t" aria-labelledby="about-title">
      <div className="mx-auto max-w-[1680px] px-5 py-28 md:px-10 md:py-44">
        <div className="mb-16 flex items-baseline justify-between md:mb-24">
          <p className="eyebrow">( 01 ) — The Name</p>
          <p className="eyebrow hidden md:block">About</p>
        </div>

        <FadeIn className="mb-10 md:mb-14">
          <p className="font-serif text-[clamp(1.5rem,3vw,2.6rem)] text-fog">
            Nizam <span className="text-accent">·</span>{" "}
            <span dir="rtl" lang="ar" className="tracking-normal">نظام</span>{" "}
            <span className="text-accent">·</span>{" "}
            <em>Arabic: order, system, arrangement.</em>
          </p>
        </FadeIn>

        <h2 id="about-title" className="sr-only">
          About NizamOps
        </h2>

        <p
          data-wordfill
          className="display max-w-6xl text-[clamp(2.1rem,5.4vw,4.9rem)] leading-[1.06]"
        >
          We kept watching the same scene repeat: a maintenance request lost
          in a WhatsApp thread, a spreadsheet that only one person understood,
          an asset nobody could locate until it broke. Not from a lack of
          effort, but from a lack of a system built for how operations
          actually run. NizamOps exists because that gap was worth closing properly.
        </p>

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12">
          <div className="md:col-span-5 md:col-start-8">
            <Reveal
              as="p"
              className="text-base leading-relaxed text-fog md:text-lg"
              stagger={0.05}
            >
              Our mission is simple to say and hard to build: one powerful
              platform that lets any organization, a ministry or a mall, a
              hospital or a housing society, see, direct and prove every
              operation it runs. Not a suite of disconnected apps. One system.
              One truth.
            </Reveal>
          </div>
        </div>

        <div
          data-stats
          className="mt-20 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-3 md:mt-28"
        >
          {STATS.map((s) => (
            <div key={s.label} data-stat className="bg-background px-8 py-10 md:py-12">
              <p className="display text-[clamp(3rem,6vw,5rem)] text-paper">
                {s.value}
              </p>
              <p className="eyebrow mt-3">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
