"use client";

import FadeIn from "@/components/ui/FadeIn";
import Reveal from "@/components/ui/Reveal";

const PERKS = [
  {
    n: "01",
    title: "Private beta access",
    body: "Selected waitlist organizations enter the beta in Q3 2026, months before general availability.",
  },
  {
    n: "02",
    title: "Founding pricing, forever",
    body: "The price you lock at signup never expires. Not at renewal. Not ever.",
  },
  {
    n: "03",
    title: "Priority onboarding",
    body: "White-glove migration of your sites, assets and teams, handled with you rather than handed to you.",
  },
];

export default function WaitlistPerks() {
  return (
    <section className="section hairline-t" aria-labelledby="perks-title">
      <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-10 md:py-36">
        <div className="mb-14 flex items-baseline justify-between md:mb-20">
          <p className="eyebrow">( 02 ) — Why Join Early</p>
          <p className="eyebrow hidden md:block">Founding Cohort</p>
        </div>
        <Reveal as="h2" id="perks-title" className="display max-w-4xl text-[clamp(2.2rem,5.5vw,5rem)]">
          Early has <em className="serif-i text-fog">privileges.</em>
        </Reveal>

        <FadeIn staggerChildren={0.12} className="mt-16 grid gap-px border border-line bg-line md:mt-24 md:grid-cols-3">
          {PERKS.map((p) => (
            <div key={p.n} className="group bg-background p-8 transition-colors duration-500 hover:bg-coal md:p-12">
              <p className="font-mono text-[0.625rem] tracking-[0.25em] text-accent">/{p.n}</p>
              <h3 className="display mt-14 text-2xl md:mt-20 md:text-3xl">{p.title}</h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-fog">{p.body}</p>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
