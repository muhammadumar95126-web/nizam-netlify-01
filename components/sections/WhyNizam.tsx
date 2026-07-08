"use client";

import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";
import { WHY_NIZAM } from "@/lib/data";

type WhyNizamProps = { index?: string };

/** Why organizations choose NizamOps over spreadsheets, chat groups and point tools. */
export default function WhyNizam({ index = "02" }: WhyNizamProps) {
  return (
    <section className="section hairline-t" aria-labelledby="why-title">
      <div className="mx-auto max-w-[1680px] px-5 py-28 md:px-10 md:py-44">
        <div className="mb-14 flex items-baseline justify-between md:mb-20">
          <p className="eyebrow">( {index} ) — Why NizamOps</p>
          <p className="eyebrow hidden md:block">The Difference</p>
        </div>

        <Reveal as="h2" id="why-title" className="display max-w-4xl text-[clamp(2.4rem,6vw,5.5rem)]">
          Point tools digitize tasks.
          <br />
          <em className="serif-i text-fog">NizamOps unifies the operation.</em>
        </Reveal>

        <FadeIn
          staggerChildren={0.1}
          className="mt-16 grid gap-px border border-line bg-line md:mt-24 sm:grid-cols-2 lg:grid-cols-3"
        >
          {WHY_NIZAM.map((card) => (
            <div
              key={card.index}
              className="card-glass group bg-background p-8 transition-colors duration-500 hover:bg-coal md:p-10"
            >
              <p className="font-mono text-[0.625rem] tracking-[0.25em] text-accent">/{card.index}</p>
              <h3 className="display mt-12 text-2xl md:mt-16 md:text-3xl">{card.title}</h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-fog">{card.body}</p>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
