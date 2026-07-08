"use client";

import { type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";

type PageHeroProps = {
  eyebrow: string;
  meta?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  compact?: boolean;
};

/** Standard inner-page opener — massive editorial title with entrance reveals. */
export default function PageHero({
  eyebrow,
  meta,
  title,
  description,
  children,
  compact = false,
}: PageHeroProps) {
  return (
    <section className={`section ${compact ? "pt-32 pb-16 md:pt-44 md:pb-24" : "pt-36 pb-20 md:pt-52 md:pb-32"}`}>
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <FadeIn immediate delay={0.25} className="mb-10 flex items-baseline justify-between md:mb-16">
          <p className="eyebrow">( {eyebrow} )</p>
          {meta && <p className="eyebrow eyebrow-accent hidden md:block">{meta}</p>}
        </FadeIn>

        <Reveal
          as="h1"
          immediate
          delay={0.35}
          className="display max-w-6xl text-[clamp(3rem,8.5vw,8.5rem)]"
        >
          {title}
        </Reveal>

        {description && (
          <FadeIn immediate delay={0.8} className="mt-8 max-w-xl md:mt-12">
            <p className="text-base leading-relaxed text-muted md:text-lg">{description}</p>
          </FadeIn>
        )}

        {children}
      </div>
    </section>
  );
}
