"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp } from "lucide-react";
import Magnetic from "@/components/ui/MagneticButton";
import TransitionLink from "@/components/ui/TransitionLink";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const YEAR = new Date().getFullYear();

const COLUMNS = [
  {
    heading: "Platform",
    links: [
      { label: "Platform", href: "/platform" },
      { label: "Solutions", href: "/solutions" },
      { label: "Industries", href: "/industries" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Roadmap", href: "/roadmap" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const RESOURCES = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Documentation", soon: true },
  { label: "API", soon: true },
];

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
      gsap.fromTo(
        "[data-footer-glow]",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: "[data-wordmark]", start: "top 96%", once: true },
        }
      );
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
        {/* brand statement */}
        <div className="max-w-xl">
          <p className="eyebrow mb-5">NizamOps</p>
          <p className="display text-3xl md:text-4xl">
            One Platform. <em className="serif-i text-fog">Every</em> Operation.
          </p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-fog/80">
            The enterprise operating system for the physical world. Under
            disciplined construction, launching 2026.
          </p>
        </div>

        {/* columns */}
        <div className="mt-20 grid gap-14 sm:grid-cols-2 md:mt-28 lg:grid-cols-4">
          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <p className="eyebrow mb-6">{col.heading}</p>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
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
          ))}

          <nav aria-label="Resources">
            <p className="eyebrow mb-6">Resources</p>
            <ul className="flex flex-col gap-3">
              {RESOURCES.map((r) =>
                r.soon ? (
                  <li key={r.label} className="flex items-center gap-2 text-sm text-fog/50">
                    {r.label}
                    <span className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-grey">
                      Soon
                    </span>
                  </li>
                ) : (
                  <li key={r.label}>
                    <TransitionLink
                      href={r.href!}
                      className="text-sm text-fog transition-colors duration-300 hover:text-accent"
                    >
                      {r.label}
                    </TransitionLink>
                  </li>
                )
              )}
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-6">Contact</p>
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
                {["LinkedIn", "Instagram", "X"].map((s) => (
                  <Magnetic
                    key={s}
                    as="a"
                    href="#top"
                    strength={0.4}
                    data-cursor="glow"
                    aria-label={`NizamOps on ${s} (coming soon)`}
                    className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-grey transition-colors duration-300 hover:text-accent"
                  >
                    {s}
                  </Magnetic>
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
        <div className="relative mt-20 overflow-hidden md:mt-28" aria-hidden>
          <div
            data-footer-glow
            className="pointer-events-none absolute inset-0 opacity-0"
            style={{
              background:
                "radial-gradient(ellipse 55% 70% at 50% 60%, rgba(194,168,120,0.08), transparent 70%)",
            }}
          />
          <p
            data-wordmark
            className="display relative select-none text-center text-[clamp(5rem,19.5vw,21rem)] leading-[0.8] tracking-[-0.02em] text-paper/[0.07]"
          >
            NizamOps
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 md:flex-row">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-grey">
            © {YEAR} NizamOps. All rights reserved.
          </p>
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-grey">
            نظام · Order, in every operation
          </p>
          <div className="flex gap-6">
            <TransitionLink href="/privacy" className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-grey transition-colors hover:text-paper">
              Privacy
            </TransitionLink>
            <TransitionLink href="/terms" className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-grey transition-colors hover:text-paper">
              Terms
            </TransitionLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
