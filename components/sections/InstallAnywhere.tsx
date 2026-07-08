"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";
import { INSTALL_FLOW } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type InstallAnywhereProps = { index?: string };

/** Install Anywhere — one cloud, connected to every device and every person. */
export default function InstallAnywhere({ index = "11" }: InstallAnywhereProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.fromTo(
        "[data-install-spine]",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: "[data-install-steps]",
            start: "top 70%",
            end: "bottom 65%",
            scrub: 0.5,
          },
        }
      );

      gsap.from("[data-install-node]", {
        opacity: 0,
        x: -24,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-install-steps]", start: "top 78%", once: true },
      });

      gsap.utils.toArray<HTMLElement>("[data-install-connector]").forEach((seg, i) => {
        const dots = seg.querySelectorAll<HTMLElement>("[data-install-particle]");
        dots.forEach((dot, di) => {
          gsap.fromTo(
            dot,
            { yPercent: -10, opacity: 0 },
            {
              yPercent: 110,
              opacity: 1,
              duration: 2.2 + (i % 3) * 0.4,
              ease: "power1.inOut",
              repeat: -1,
              delay: di * 1.1 + i * 0.3,
              scrollTrigger: { trigger: seg, start: "top 90%", end: "bottom 10%", toggleActions: "play pause resume pause" },
            }
          );
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="section hairline-t" aria-labelledby="install-anywhere-title">
      <div className="mx-auto max-w-[1680px] px-5 py-28 md:px-10 md:py-44">
        <div className="mb-14 flex items-baseline justify-between md:mb-20">
          <p className="eyebrow">( {index} ) — Install Anywhere</p>
          <p className="eyebrow hidden md:block">One Cloud, Every Screen</p>
        </div>

        <Reveal as="h2" id="install-anywhere-title" className="display max-w-4xl text-[clamp(2.4rem,6vw,5.5rem)]">
          One cloud.
          <br />
          <em className="serif-i text-fog">Every screen, connected.</em>
        </Reveal>
        <FadeIn className="mt-8 max-w-xl">
          <p className="text-base leading-relaxed text-fog">
            From the backbone to the person holding the phone, NizamOps stays
            the same system, live, on whatever device is nearest.
          </p>
        </FadeIn>

        <div data-install-steps className="relative mx-auto mt-20 max-w-2xl md:mt-28">
          <div aria-hidden className="absolute top-2 bottom-2 left-[3px] w-px bg-line" />
          <div aria-hidden data-install-spine className="absolute top-2 bottom-2 left-[3px] w-px bg-accent" />

          <ol className="flex flex-col">
            {INSTALL_FLOW.map((node, i) => (
              <li key={node.index} className="relative">
                <div data-install-node className="relative flex items-start gap-6 pb-2 pl-10">
                  <span
                    aria-hidden
                    className="absolute top-1.5 left-0 h-[7px] w-[7px] rounded-full bg-accent"
                    style={{ boxShadow: "0 0 12px 2px rgba(194,168,120,0.55)" }}
                  />
                  <div className="flex-1 py-6">
                    <p className="font-mono text-[0.625rem] tracking-[0.25em] text-accent">
                      {node.index}
                    </p>
                    <h3 className="display mt-2 text-xl md:text-2xl">{node.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-fog">{node.body}</p>
                  </div>
                </div>

                {i < INSTALL_FLOW.length - 1 && (
                  <div
                    data-install-connector
                    aria-hidden
                    className="pointer-events-none absolute top-full left-0 h-8 w-2 -translate-x-1/2 md:h-10"
                    style={{ left: "3px" }}
                  >
                    <span
                      data-install-particle
                      className="absolute left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                    />
                    <span
                      data-install-particle
                      className="absolute left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent/70"
                    />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
