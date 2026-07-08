"use client";

import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";
import { ROLES } from "@/lib/data";

type WhoUsesNizamProps = { index?: string };

/** Every role in the operation, and what NizamOps gives each one. */
export default function WhoUsesNizam({ index = "05" }: WhoUsesNizamProps) {
  return (
    <section className="section hairline-t" aria-labelledby="roles-title">
      <div className="mx-auto max-w-[1680px] px-5 py-28 md:px-10 md:py-44">
        <div className="mb-14 flex items-baseline justify-between md:mb-20">
          <p className="eyebrow">( {index} ) — Who Uses NizamOps</p>
          <p className="eyebrow hidden md:block">Every Seat, One System</p>
        </div>

        <Reveal as="h2" id="roles-title" className="display max-w-4xl text-[clamp(2.4rem,6vw,5.5rem)]">
          From the front line
          <br />
          <em className="serif-i text-fog">to the boardroom.</em>
        </Reveal>

        <FadeIn
          staggerChildren={0.08}
          className="mt-16 grid gap-px border border-line bg-line md:mt-24 sm:grid-cols-2 lg:grid-cols-4"
        >
          {ROLES.map((role, i) => (
            <div key={role.id} className="card-glass group bg-background p-7 transition-colors duration-500 hover:bg-coal md:p-9">
              <p className="font-mono text-[0.625rem] tracking-[0.25em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="display mt-10 text-xl md:mt-14 md:text-2xl">{role.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fog">{role.body}</p>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
