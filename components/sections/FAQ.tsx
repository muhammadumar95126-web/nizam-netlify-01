"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";
import { FAQ as FAQ_ITEMS } from "@/lib/data";

const EASE = [0.76, 0, 0.24, 1] as const;

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section hairline-t" aria-labelledby="faq-title">
      <div className="mx-auto max-w-[1680px] px-5 py-28 md:px-10 md:py-44">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow mb-10">( 03 ) — FAQ</p>
              <Reveal as="h2" id="faq-title" className="display text-[clamp(2.4rem,5vw,4.5rem)]">
                Fair
                <br />
                <em className="serif-i text-fog">questions.</em>
              </Reveal>
              <FadeIn className="mt-8">
                <p className="max-w-xs text-base leading-relaxed text-fog">
                  Everything else, ask us directly. We answer within one
                  business day.
                </p>
                <a
                  href="mailto:hello@nizam.io"
                  className="mt-4 inline-block font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-accent"
                >
                  hello@nizam.io
                </a>
              </FadeIn>
            </div>
          </div>

          <div className="lg:col-span-8">
            <FadeIn staggerChildren={0.07} className="border-t border-line">
              {FAQ_ITEMS.map((item, i) => {
                const isOpen = open === i;
                return (
                  <div key={item.q} className="border-b border-line">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="group flex w-full cursor-pointer items-center justify-between gap-6 py-7 text-left md:py-8"
                    >
                      <span className="flex items-baseline gap-5">
                        <span className="font-mono text-[0.625rem] tracking-[0.2em] text-grey">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`font-display text-lg font-medium tracking-tight transition-colors duration-300 md:text-2xl ${
                            isOpen ? "text-accent" : "text-paper group-hover:text-accent"
                          }`}
                        >
                          {item.q}
                        </span>
                      </span>
                      <span aria-hidden className="relative h-3.5 w-3.5 shrink-0">
                        <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-paper transition-colors duration-300" />
                        <span
                          className={`absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-paper transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                            isOpen ? "scale-y-0" : "scale-y-100"
                          }`}
                        />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl pb-8 pl-9 text-[0.95rem] leading-relaxed text-fog md:pl-10">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
