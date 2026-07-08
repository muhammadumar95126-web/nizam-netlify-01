"use client";

import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { VALUES } from "@/lib/data";

/** Values, principles and the long view — the page after the mission statement. */
export default function AboutStory() {
  return (
    <>
      {/* the long view */}
      <section className="section hairline-t" aria-labelledby="view-title">
        <div className="mx-auto max-w-[1680px] px-5 py-28 md:px-10 md:py-44">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-10">( 02 ) — The Long View</p>
              <Reveal as="h2" id="view-title" className="display text-[clamp(2.2rem,5vw,4.5rem)]">
                Cities are getting
                <br />
                <em className="serif-i text-fog">smarter. Their operations aren&apos;t.</em>
              </Reveal>
              <FadeIn className="mt-8 max-w-md">
                <p className="text-[0.95rem] leading-relaxed text-fog">
                  The built world is expanding faster than the discipline that
                  maintains it. Every new tower, terminal and campus adds
                  thousands of assets, and inherits decades-old ways of caring
                  for them. NIZAM exists to close that gap: infrastructure-grade
                  software for the people who keep the physical world running.
                </p>
              </FadeIn>
            </div>
            <ParallaxImage
              src="/images/city-night.jpg"
              alt="City grid glowing at night from above"
              className="aspect-[16/10] w-full lg:col-span-7"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
        </div>
      </section>

      {/* values */}
      <section className="section hairline-t" data-theme="light" aria-labelledby="values-title">
        <div className="mx-auto max-w-[1680px] px-5 py-28 md:px-10 md:py-44">
          <div className="mb-14 flex items-baseline justify-between md:mb-20">
            <p className="eyebrow">( 03 ) — What We Hold</p>
            <p className="eyebrow hidden md:block">Four Values</p>
          </div>
          <Reveal as="h2" id="values-title" className="display max-w-4xl text-[clamp(2.4rem,6vw,5.5rem)]">
            Built the way we ask
            <br />
            <em className="serif-i" style={{ color: "var(--grey)" }}>
              you to operate.
            </em>
          </Reveal>

          <FadeIn
            staggerChildren={0.1}
            className="mt-20 grid gap-px overflow-hidden border border-line-strong bg-line-strong sm:grid-cols-2 md:mt-28 xl:grid-cols-4"
          >
            {VALUES.map((v, i) => (
              <div key={v.title} className="group bg-paper p-8 transition-colors duration-500 hover:bg-ink md:p-10">
                <p className="font-mono text-[0.625rem] tracking-[0.25em] transition-colors duration-500 group-hover:text-accent" style={{ color: "var(--accent-dim)" }}>
                  0{i + 1}
                </p>
                <h3 className="display mt-16 text-3xl transition-colors duration-500 group-hover:text-paper md:mt-24 md:text-4xl">
                  {v.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed transition-colors duration-500 group-hover:text-fog" style={{ color: "var(--grey)" }}>
                  {v.body}
                </p>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>
    </>
  );
}
