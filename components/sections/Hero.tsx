"use client";

import { useMemo, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Meridian from "@/components/canvas/Meridian";
import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";
import Magnetic from "@/components/ui/MagneticButton";
import TransitionLink from "@/components/ui/TransitionLink";
import { prefersReducedMotion } from "@/lib/utils";
import { useWaitlistOverlay } from "@/lib/waitlist-context";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PARTICLE_COUNT = 16;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const moveX = useRef<((v: number) => void) | null>(null);
  const moveY = useRef<((v: number) => void) | null>(null);
  const { open: openWaitlist } = useWaitlistOverlay();

  // stable random particle field, computed once per mount
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        left: 40 + Math.random() * 58,
        top: 8 + Math.random() * 84,
        size: 2 + Math.random() * 3,
        duration: 7 + Math.random() * 8,
        delay: Math.random() * 6,
      })),
    []
  );

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from("[data-hero-canvas]", {
        opacity: 0,
        scale: 0.86,
        duration: 2.2,
        ease: "power3.out",
        delay: 0.3,
      });

      // gentle parallax exit while scrolling away
      gsap.to("[data-hero-inner]", {
        yPercent: -12,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to("[data-hero-canvas]", {
        yPercent: 14,
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from("[data-hero-line]", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.6,
        ease: "power4.inOut",
        delay: 1.1,
      });

      // mouse-driven parallax on the Meridian layer
      const canvasEl = ref.current?.querySelector<HTMLElement>("[data-hero-canvas]");
      if (canvasEl) {
        moveX.current = gsap.quickTo(canvasEl, "x", { duration: 1.1, ease: "power3.out" });
        moveY.current = gsap.quickTo(canvasEl, "y", { duration: 1.1, ease: "power3.out" });
      }

      // soft diagonal light sweep, looping
      gsap.fromTo(
        "[data-light-sweep]",
        { xPercent: -130, yPercent: -30 },
        {
          xPercent: 130,
          yPercent: 30,
          duration: 9,
          ease: "sine.inOut",
          repeat: -1,
          repeatDelay: 2.5,
        }
      );

      // floating particles drift and pulse
      gsap.utils.toArray<HTMLElement>("[data-particle]").forEach((p) => {
        gsap.to(p, {
          y: `-=${18 + Math.random() * 26}`,
          opacity: () => 0.15 + Math.random() * 0.35,
          duration: () => 4 + Math.random() * 4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: Number(p.dataset.delay || 0),
        });
      });
    },
    { scope: ref }
  );

  const onPointerMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const relX = (e.clientX - r.left) / r.width - 0.5;
    const relY = (e.clientY - r.top) / r.height - 0.5;
    moveX.current?.(relX * 22);
    moveY.current?.(relY * 22);
  };

  return (
    <section
      ref={ref}
      id="top"
      onMouseMove={onPointerMove}
      className="section relative flex min-h-svh flex-col overflow-hidden"
      aria-label="NizamOps: One Platform. Every Operation."
    >
      {/* ambient light */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 62% 55% at 72% 42%, rgba(194,168,120,0.075), transparent 65%), radial-gradient(ellipse 45% 40% at 20% 85%, rgba(239,237,231,0.035), transparent 70%)",
        }}
      />

      {/* soft diagonal light sweep */}
      <div
        aria-hidden
        data-light-sweep
        className="pointer-events-none absolute -inset-y-1/2 left-1/3 w-1/3 opacity-40 mix-blend-screen"
        style={{
          background:
            "linear-gradient(115deg, transparent 20%, rgba(194,168,120,0.12) 48%, transparent 78%)",
        }}
      />

      {/* floating data particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <span
            key={p.id}
            data-particle
            data-delay={p.delay}
            className="absolute rounded-full bg-accent/50"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>

      {/* the Meridian */}
      <div
        data-hero-canvas
        className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-60 md:w-[62%] md:opacity-100"
      >
        <Meridian className="h-full w-full" />
      </div>

      <div
        data-hero-inner
        className="relative z-10 mx-auto flex w-full max-w-[1680px] flex-1 flex-col justify-end px-5 pt-32 pb-10 md:px-10 md:pb-14"
      >
        <FadeIn immediate delay={0.9} className="mb-6 flex items-center gap-3 md:mb-8">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <p className="eyebrow">
            Enterprise Operations Platform · <span className="eyebrow-accent">Launching 2026</span>
          </p>
        </FadeIn>

        <h1 className="display">
          <Reveal
            as="span"
            immediate
            delay={0.25}
            className="block text-[clamp(4.6rem,17.5vw,17rem)] leading-[0.88] tracking-[-0.045em]"
          >
            NizamOps
          </Reveal>
          <Reveal
            as="span"
            immediate
            delay={0.6}
            className="mt-3 block text-[clamp(1.7rem,4.2vw,3.8rem)] font-normal tracking-[-0.02em] text-fog md:mt-5"
          >
            One Platform. <em className="serif-i text-paper">Every</em> Operation.
          </Reveal>
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
          <FadeIn immediate delay={1} className="max-w-md">
            <p className="text-[0.95rem] leading-relaxed text-fog md:text-base">
              One platform for service requests, maintenance, assets, field
              operations and intelligence. The operating system for
              organizations that run the physical world.
            </p>
          </FadeIn>

          <FadeIn immediate delay={1.15} className="flex flex-wrap items-center gap-4">
            <Magnetic as={TransitionLink} href="/book-demo" strength={0.25} className="btn btn-solid">
              Book Demo
            </Magnetic>
            <Magnetic as="button" type="button" onClick={openWaitlist} strength={0.25} className="btn btn-ghost">
              Join Early Access
            </Magnetic>
          </FadeIn>
        </div>

        <div data-hero-line className="mt-10 h-px w-full bg-line md:mt-14" />

        <div className="mt-5 flex items-center justify-between">
          <FadeIn immediate delay={1.5} as="p" className="eyebrow">
            ( Scroll )
          </FadeIn>
          <FadeIn immediate delay={1.6} as="p" className="eyebrow hidden md:block">
            One Platform · Every Operation
          </FadeIn>
          <FadeIn immediate delay={1.7} as="p" className="eyebrow">
            Private Beta Q3 ’26
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
