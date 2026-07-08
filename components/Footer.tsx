"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp } from "lucide-react";
import Magnetic from "@/components/ui/MagneticButton";
import TransitionLink from "@/components/ui/TransitionLink";
import { NAV_LINKS } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const YEAR = new Date().getFullYear();

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-wordmark]", {
        yPercent: 55,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: { trigger: "[data-wordmark]", start: "top 96%", once: true },
      });
    },
    { scope: ref }
  );

  const toTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={ref} className="section hairline-t overflow-hidden" aria-label="Footer">
      <div className="mx-auto max-w-[1680px] px-5 pt-20 pb-8 md:px-10 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow mb-4">NIZAM</p>
            <p className="display max-w-sm text-2xl md:text-3xl">
              Built for <em className="serif-i text-fog">Every</em> Operation.
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-fog/80">
              The enterprise operations platform. Under disciplined
              construction, launching 2026.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="eyebrow mb-6">Explore</p>
            <ul className="flex flex-col gap-3">
              {[
                ...NAV_LINKS,
                { label: "Book Demo", href: "/book-demo" },
                { label: "Join Waitlist", href: "/waitlist" },
              ].map((l) => (
                <li key={l.href}>
                  <TransitionLink
                    href={l.href}
                    className="text-sm text-fog transition-colors duration-300 hover:text-accent"
                  >
                    {l.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="eyebrow mb-6">Reach Us</p>
            <ul className="flex flex-col gap-3 text-sm text-fog">
              <li>
                <a href="mailto:hello@nizam.io" className="transition-colors duration-300 hover:text-accent">
                  hello@nizam.io
                </a>
              </li>
              <li>
                <a href="mailto:partners@nizam.io" className="transition-colors duration-300 hover:text-accent">
                  partners@nizam.io
                </a>
              </li>
              <li className="mt-4 flex gap-5">
                {["LinkedIn", "X", "Instagram"].map((s) => (
                  <a
                    key={s}
                    href="#top"
                    aria-label={`NIZAM on ${s} (coming soon)`}
                    className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-grey transition-colors duration-300 hover:text-paper"
                  >
                    {s}
                  </a>
                ))}
              </li>
            </ul>
            <Magnetic
              as="button"
              onClick={toTop}
              strength={0.3}
              aria-label="Back to top"
              className="mt-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-line-strong text-paper transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              <ArrowUp size={16} />
            </Magnetic>
          </div>
        </div>

        {/* colossal wordmark */}
        <div className="mt-20 overflow-hidden md:mt-28" aria-hidden>
          <p
            data-wordmark
            className="display select-none text-center text-[clamp(5rem,19.5vw,21rem)] leading-[0.8] tracking-[-0.02em] text-paper/[0.07]"
          >
            NIZAM
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 md:flex-row">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-grey">
            © {YEAR} NIZAM. All rights reserved.
          </p>
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-grey">
            نظام · Order, in every operation
          </p>
          <div className="flex gap-6">
            <a href="#top" className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-grey transition-colors hover:text-paper">
              Privacy
            </a>
            <a href="#top" className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-grey transition-colors hover:text-paper">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
