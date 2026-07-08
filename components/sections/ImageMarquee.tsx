"use client";

import Image from "next/image";
import Marquee from "@/components/ui/Marquee";
import TransitionLink from "@/components/ui/TransitionLink";
import { INDUSTRIES } from "@/lib/data";

/** Living strip of the worlds NizamOps serves — hover restores color. */
export default function ImageMarquee() {
  return (
    <section className="section hairline-t py-6 md:py-8" aria-label="Industries NizamOps serves">
      <Marquee duration={80}>
        {INDUSTRIES.map((ind) => (
          <TransitionLink
            key={ind.id}
            href="/industries"
            aria-label={`Explore ${ind.name}`}
            className="group relative mx-2 block h-[180px] w-[280px] shrink-0 overflow-hidden rounded-sm md:mx-2.5 md:h-[220px] md:w-[360px]"
          >
            <Image
              src={ind.image}
              alt={ind.name}
              fill
              sizes="360px"
              className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/30 transition-opacity duration-500 group-hover:opacity-60"
            />
            <div className="absolute bottom-4 left-4 flex items-baseline gap-3">
              <span className="font-mono text-[0.5625rem] tracking-[0.2em] text-accent">
                {String(INDUSTRIES.indexOf(ind) + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-lg font-medium tracking-tight text-paper">
                {ind.name}
              </span>
            </div>
          </TransitionLink>
        ))}
      </Marquee>
    </section>
  );
}
