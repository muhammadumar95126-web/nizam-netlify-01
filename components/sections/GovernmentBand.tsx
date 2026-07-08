"use client";

import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";
import Magnetic from "@/components/ui/MagneticButton";
import TransitionLink from "@/components/ui/TransitionLink";
import ParallaxImage from "@/components/ui/ParallaxImage";

const POINTS = [
  "Sovereign cloud or on-premise deployment",
  "Citizen-facing service portals",
  "Full audit trails & compliance evidence",
  "Procurement-ready contracting",
  "Local deployment & support partners",
  "Training and certified onboarding",
];

/** Government is served as a partnership under Enterprise — never a price card. */
export default function GovernmentBand() {
  return (
    <section className="section hairline-t" aria-labelledby="gov-title">
      <div className="mx-auto max-w-[1680px] px-5 py-28 md:px-10 md:py-44">
        <div className="mb-14 flex items-baseline justify-between md:mb-20">
          <p className="eyebrow">( 02 ) — Government</p>
          <p className="eyebrow hidden md:block">Enterprise Program</p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal as="h2" id="gov-title" className="display text-[clamp(2.4rem,5.5vw,5rem)]">
              For the public sector,
              <br />
              <em className="serif-i text-fog">a partnership, not a price tag.</em>
            </Reveal>
            <FadeIn className="mt-8 max-w-md">
              <p className="text-base leading-relaxed text-fog">
                Ministries, municipalities and public authorities operate under
                mandates that no fixed plan can honor. Government engagements
                run under our Enterprise program, scoped in consultation and
                priced to your procurement reality.
              </p>
            </FadeIn>
            <FadeIn staggerChildren={0.08} className="mt-10 grid gap-3 sm:grid-cols-2">
              {POINTS.map((p) => (
                <div key={p} className="flex items-baseline gap-3 text-sm text-fog">
                  <span aria-hidden className="text-accent">—</span>
                  {p}
                </div>
              ))}
            </FadeIn>
            <FadeIn className="mt-12">
              <Magnetic as={TransitionLink} href="/contact" strength={0.25} className="btn btn-solid">
                Start a Consultation
              </Magnetic>
            </FadeIn>
          </div>

          <ParallaxImage
            src="/images/government.jpg"
            alt="Government building with classical columns"
            className="aspect-[4/5] w-full lg:aspect-[3/4]"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>
      </div>
    </section>
  );
}
