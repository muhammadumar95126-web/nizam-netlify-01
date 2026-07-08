"use client";

import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";
import Magnetic from "@/components/ui/MagneticButton";
import TransitionLink from "@/components/ui/TransitionLink";
import { PRICING } from "@/lib/data";
import { Check } from "lucide-react";
import { useWaitlistOverlay } from "@/lib/waitlist-context";

export default function Pricing() {
  const { open: openWaitlist } = useWaitlistOverlay();
  return (
    <section
      id="pricing"
      data-theme="light"
      className="section"
      aria-labelledby="pricing-title"
    >
      <div className="mx-auto max-w-[1680px] px-5 py-28 md:px-10 md:py-44">
        <div className="mb-14 flex items-baseline justify-between md:mb-20">
          <p className="eyebrow">( 01 ) — Pricing</p>
          <p className="eyebrow hidden md:block">Founding Terms</p>
        </div>

        <div className="mb-16 grid gap-8 md:mb-24 md:grid-cols-12 md:items-end">
          <Reveal
            as="h2"
            id="pricing-title"
            className="display text-[clamp(2.6rem,7vw,6.5rem)] md:col-span-8"
          >
            Serious software.
            <br />
            <em className="serif-i" style={{ color: "var(--grey)" }}>
              Honest pricing.
            </em>
          </Reveal>
          <FadeIn className="md:col-span-4">
            <p className="max-w-sm text-base leading-relaxed" style={{ color: "var(--grey)" }}>
              Waitlist members lock founding pricing for life. No per-module
              surprises: every plan includes the platform, not a fraction
              of it.
            </p>
          </FadeIn>
        </div>

        <FadeIn
          staggerChildren={0.1}
          className="grid gap-px overflow-hidden border border-line-strong bg-line-strong sm:grid-cols-2 xl:grid-cols-4"
        >
          {PRICING.map((tier) => (
            <article
              key={tier.name}
              className={`group relative flex flex-col p-8 transition-colors duration-500 md:p-10 ${
                tier.featured ? "bg-ink text-paper" : "bg-paper text-ink"
              }`}
            >
              {tier.featured && (
                <p className="absolute top-6 right-6 rounded-full border border-accent/50 px-3 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-accent">
                  Most Chosen
                </p>
              )}
              <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.25em]">
                {tier.name}
              </h3>
              <p className="display mt-8 text-5xl md:text-6xl">
                {tier.price}
                {tier.period && (
                  <span
                    className="font-sans text-base font-normal tracking-normal"
                    style={{ color: tier.featured ? "var(--fog)" : "var(--grey)" }}
                  >
                    {tier.period}
                  </span>
                )}
              </p>
              <p
                className="mt-4 text-sm leading-relaxed"
                style={{ color: tier.featured ? "var(--fog)" : "var(--grey)" }}
              >
                {tier.description}
              </p>
              <ul className="mt-8 flex flex-1 flex-col gap-3.5 border-t pt-8" style={{ borderColor: tier.featured ? "rgba(239,237,231,0.12)" : "rgba(11,11,10,0.12)" }}>
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[0.8125rem] leading-snug">
                    <Check size={13} strokeWidth={2.25} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              {tier.ctaType === "demo" ? (
                <Magnetic
                  as={TransitionLink}
                  href="/book-demo"
                  strength={0.2}
                  className={`btn mt-10 w-full ${
                    tier.featured
                      ? "btn-solid !border-paper !bg-paper !text-ink"
                      : "btn-ghost !border-ink/30 !text-ink hover:!text-paper"
                  }`}
                  style={
                    tier.featured
                      ? undefined
                      : ({ "--foreground": "var(--ink)", "--background": "var(--paper)" } as React.CSSProperties)
                  }
                >
                  {tier.cta}
                </Magnetic>
              ) : (
                <Magnetic
                  as="button"
                  type="button"
                  onClick={openWaitlist}
                  strength={0.2}
                  className={`btn mt-10 w-full ${
                    tier.featured
                      ? "btn-solid !border-paper !bg-paper !text-ink"
                      : "btn-ghost !border-ink/30 !text-ink hover:!text-paper"
                  }`}
                  style={
                    tier.featured
                      ? undefined
                      : ({ "--foreground": "var(--ink)", "--background": "var(--paper)" } as React.CSSProperties)
                  }
                >
                  {tier.cta}
                </Magnetic>
              )}
            </article>
          ))}
        </FadeIn>

        <FadeIn className="mt-10">
          <p className="text-center font-mono text-[0.625rem] uppercase tracking-[0.2em]" style={{ color: "var(--grey)" }}>
            All plans launch Q4 2026 · Founding pricing guaranteed for waitlist members ·
            Government institutions are served under the Enterprise program
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
