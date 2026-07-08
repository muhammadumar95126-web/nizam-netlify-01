"use client";

import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";
import type { Industry } from "@/lib/data";

/** Two-column challenge → solution pairing for a single industry. */
export default function ChallengesSolutions({ industry }: { industry: Industry }) {
  return (
    <section className="section hairline-t" aria-labelledby="challenges-title">
      <div className="mx-auto max-w-[1680px] px-5 py-28 md:px-10 md:py-44">
        <div className="mb-14 flex items-baseline justify-between md:mb-20">
          <p className="eyebrow">( 02 ) — Before &amp; After</p>
          <p className="eyebrow hidden md:block">{industry.name}</p>
        </div>

        <Reveal as="h2" id="challenges-title" className="display max-w-4xl text-[clamp(2.4rem,6vw,5.5rem)]">
          What breaks today.
          <br />
          <em className="serif-i text-fog">What NizamOps fixes.</em>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden border border-line bg-line md:mt-24 lg:grid-cols-2">
          <div className="bg-background p-8 md:p-12">
            <p className="eyebrow eyebrow-accent mb-8">The Challenges</p>
            <FadeIn staggerChildren={0.1} className="flex flex-col gap-7">
              {industry.challenges.map((c, i) => (
                <div key={c} className="flex items-start gap-4">
                  <span className="font-mono text-[0.625rem] tracking-[0.22em] text-grey">
                    0{i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-fog">{c}</p>
                </div>
              ))}
            </FadeIn>
          </div>
          <div className="bg-background p-8 md:p-12">
            <p className="eyebrow eyebrow-accent mb-8">The NizamOps Way</p>
            <FadeIn staggerChildren={0.1} className="flex flex-col gap-7">
              {industry.solutions.map((s, i) => (
                <div key={s} className="flex items-start gap-4">
                  <span className="font-mono text-[0.625rem] tracking-[0.22em] text-accent">
                    0{i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-paper/90">{s}</p>
                </div>
              ))}
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
