"use client";

import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";
import { TRUST } from "@/lib/data";

type TrustSecurityProps = { index?: string };

/** Enterprise trust & security posture — no fake certifications, no fake logos. */
export default function TrustSecurity({ index = "06" }: TrustSecurityProps) {
  return (
    <section className="section hairline-t" aria-labelledby="trust-title">
      <div className="mx-auto max-w-[1680px] px-5 py-28 md:px-10 md:py-44">
        <div className="mb-14 flex items-baseline justify-between md:mb-20">
          <p className="eyebrow">( {index} ) — Trust &amp; Security</p>
          <p className="eyebrow eyebrow-accent hidden md:block">Enterprise Ready</p>
        </div>

        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal
            as="h2"
            id="trust-title"
            className="display max-w-3xl text-[clamp(2.4rem,6vw,5.5rem)] md:col-span-8"
          >
            Built to survive
            <br />
            <em className="serif-i text-fog">enterprise scrutiny.</em>
          </Reveal>
          <FadeIn className="md:col-span-4">
            <p className="max-w-sm text-base leading-relaxed text-fog">
              No fake certifications, no fake customer logos. Just the
              architecture and controls a serious operation expects before it
              trusts a platform with its data.
            </p>
          </FadeIn>
        </div>

        <FadeIn
          staggerChildren={0.08}
          className="mt-16 grid gap-px border border-line bg-line md:mt-24 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TRUST.map((item) => (
            <div key={item.index} className="card-glass group bg-background p-7 transition-colors duration-500 hover:bg-coal md:p-9">
              <p className="font-mono text-[0.625rem] tracking-[0.25em] text-accent">/{item.index}</p>
              <h3 className="display mt-10 text-xl md:mt-14 md:text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fog">{item.body}</p>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
