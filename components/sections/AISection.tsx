"use client";

import Meridian from "@/components/canvas/Meridian";
import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";
import TransitionLink from "@/components/ui/TransitionLink";

const CAPABILITIES = [
  {
    index: "A1",
    name: "Predictive Maintenance",
    body: "Failure patterns detected before they become failures. NIZAM schedules the fix while the asset still works.",
  },
  {
    index: "A2",
    name: "Intelligent Triage",
    body: "Every incoming request classified, prioritized and routed in milliseconds, trained on your operation rather than a generic model.",
  },
  {
    index: "A3",
    name: "Anomaly Detection",
    body: "Consumption spikes, response drift, silent degradation. The system notices what people are too busy to see.",
  },
  {
    index: "A4",
    name: "Ask NIZAM",
    body: "“Which assets cost us the most last quarter?” Plain language in, operational truth out.",
  },
];

export default function AISection({ index = "06" }: { index?: string }) {
  return (
    <section id="ai" className="section hairline-t overflow-hidden" aria-labelledby="ai-title">
      {/* faint core behind everything */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.22]">
        <Meridian className="h-full w-full" speed={0.5} activity={1.6} interactive={false} radiusScale={0.42} />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 50% 45%, rgba(194,168,120,0.06), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1680px] px-5 py-32 md:px-10 md:py-52">
        <div className="mb-16 flex items-baseline justify-between md:mb-24">
          <p className="eyebrow">( {index} ) — Intelligence</p>
          <p className="eyebrow eyebrow-accent">Coming 2027</p>
        </div>

        <div className="text-center">
          <FadeIn as="p" className="eyebrow mb-6">
            NIZAM AI
          </FadeIn>
          <Reveal
            as="h2"
            id="ai-title"
            className="display mx-auto max-w-5xl text-[clamp(2.8rem,8vw,7.5rem)]"
          >
            <span className="text-shimmer">Operations that</span>
            <br />
            <em className="serif-i text-paper">think ahead.</em>
          </Reveal>
          <FadeIn className="mx-auto mt-8 max-w-xl">
            <p className="text-base leading-relaxed text-fog">
              The platform already sees everything. Next, it learns. NIZAM AI
              turns your operational history into foresight, quietly, safely,
              and on your terms.
            </p>
          </FadeIn>
        </div>

        <FadeIn
          staggerChildren={0.12}
          className="mx-auto mt-20 grid max-w-5xl gap-px border border-line bg-line md:mt-28 md:grid-cols-2"
        >
          {CAPABILITIES.map((c) => (
            <div key={c.index} className="group bg-ink/90 p-8 backdrop-blur-sm transition-colors duration-500 hover:bg-coal md:p-12">
              <p className="font-mono text-[0.625rem] tracking-[0.25em] text-accent">/{c.index}</p>
              <h3 className="display mt-5 text-2xl md:text-3xl">{c.name}</h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-fog">{c.body}</p>
            </div>
          ))}
        </FadeIn>

        <FadeIn className="mt-16 text-center md:mt-20">
          <TransitionLink href="/waitlist" className="btn btn-ghost">
            Reserve Early Access
          </TransitionLink>
        </FadeIn>
      </div>
    </section>
  );
}
