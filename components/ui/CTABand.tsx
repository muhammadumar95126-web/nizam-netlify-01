"use client";

import { type ReactNode } from "react";
import Meridian from "@/components/canvas/Meridian";
import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";
import Magnetic from "@/components/ui/MagneticButton";
import TransitionLink from "@/components/ui/TransitionLink";

type CTABandProps = {
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: string;
};

/** Closing invitation — shared across pages. */
export default function CTABand({
  eyebrow = "Begin",
  title,
  subtitle = "Private beta opens soon. Founding members get first access, priority onboarding and pricing that never expires.",
}: CTABandProps) {
  return (
    <section className="section hairline-t relative overflow-hidden" aria-label="Get started">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30">
        <Meridian className="h-full w-full" speed={0.6} interactive={false} radiusScale={0.52} />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 100%, rgba(194,168,120,0.09), transparent 65%)",
        }}
      />
      <div className="relative mx-auto max-w-[1680px] px-5 py-32 text-center md:px-10 md:py-48">
        <FadeIn as="p" className="eyebrow eyebrow-accent mb-8">
          {eyebrow}
        </FadeIn>
        <Reveal
          as="h2"
          className="display mx-auto max-w-5xl text-[clamp(2.8rem,7.5vw,7rem)]"
        >
          {title ?? (
            <>
              Bring order to
              <br />
              <em className="serif-i text-fog">your operation.</em>
            </>
          )}
        </Reveal>
        <FadeIn className="mx-auto mt-8 max-w-lg">
          <p className="text-base leading-relaxed text-fog">{subtitle}</p>
        </FadeIn>
        <FadeIn
          staggerChildren={0.06}
          className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {["Priority onboarding", "Founding pricing", "Direct product feedback", "Private beta access"].map(
            (perk) => (
              <span key={perk} className="eyebrow !text-fog/60">
                {perk}
              </span>
            )
          )}
        </FadeIn>
        <FadeIn className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Magnetic as={TransitionLink} href="/book-demo" strength={0.25} className="btn btn-solid">
            Book Demo
          </Magnetic>
          <Magnetic as={TransitionLink} href="/waitlist" strength={0.25} className="btn btn-ghost">
            Join Waitlist
          </Magnetic>
        </FadeIn>
      </div>
    </section>
  );
}
