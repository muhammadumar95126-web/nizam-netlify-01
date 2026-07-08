"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/utils";
import type Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

type Ctx = { navigate: (href: string) => void };
const TransitionCtx = createContext<Ctx>({ navigate: () => {} });
export const usePageTransition = () => useContext(TransitionCtx);

/**
 * Route curtain: an ink panel with the wordmark sweeps up to cover,
 * the route changes underneath, then it lifts away. Doubles as the
 * first-load intro.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const covering = useRef(false);
  const busy = useRef(false);

  // first-load intro reveal
  useEffect(() => {
    const overlay = overlayRef.current;
    const mark = markRef.current;
    if (!overlay || !mark) return;
    if (prefersReducedMotion()) {
      gsap.set(overlay, { yPercent: -100, visibility: "hidden" });
      return;
    }
    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo(
      mark.children,
      { yPercent: 120 },
      { yPercent: 0, duration: 0.7, stagger: 0.05, ease: "power4.out" }
    )
      .to(mark.children, { yPercent: -120, duration: 0.5, stagger: 0.04, ease: "power3.in" }, "+=0.35")
      .to(overlay, {
        yPercent: -100,
        duration: 0.85,
        ease: "power4.inOut",
        onComplete: () => gsap.set(overlay, { visibility: "hidden" }),
      }, "-=0.15");
    return () => {
      tl.kill();
    };
  }, []);

  const navigate = useCallback(
    (href: string) => {
      if (busy.current) return;
      if (href === pathname) {
        (window as unknown as { __lenis?: Lenis }).__lenis?.scrollTo(0, { duration: 1.2 });
        return;
      }
      const overlay = overlayRef.current;
      const mark = markRef.current;
      if (!overlay || !mark || prefersReducedMotion()) {
        router.push(href);
        return;
      }
      busy.current = true;
      gsap.set(overlay, { visibility: "visible", yPercent: 100 });
      gsap.set(mark.children, { yPercent: 120 });
      const tl = gsap.timeline({
        onComplete: () => {
          covering.current = true;
          router.push(href);
        },
      });
      tl.to(overlay, { yPercent: 0, duration: 0.6, ease: "power3.inOut" }).to(
        mark.children,
        { yPercent: 0, duration: 0.5, stagger: 0.045, ease: "power3.out" },
        "-=0.25"
      );
    },
    [pathname, router]
  );

  // new route mounted beneath the curtain — lift it
  useEffect(() => {
    if (!covering.current) return;
    covering.current = false;
    const overlay = overlayRef.current;
    const mark = markRef.current;

    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);

    const tl = gsap.timeline({ delay: 0.25 });
    if (mark) {
      tl.to(mark.children, { yPercent: -120, duration: 0.45, stagger: 0.04, ease: "power3.in" });
    }
    if (overlay) {
      tl.to(
        overlay,
        {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: () => {
            gsap.set(overlay, { visibility: "hidden" });
            busy.current = false;
            ScrollTrigger.refresh();
          },
        },
        "-=0.1"
      );
    }
  }, [pathname]);

  return (
    <TransitionCtx.Provider value={{ navigate }}>
      {children}
      <div
        ref={overlayRef}
        aria-hidden
        className="fixed inset-0 z-[300] flex items-center justify-center bg-ink"
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 50% 55%, rgba(194,168,120,0.07), transparent 65%)",
          }}
        />
        <div ref={markRef} className="flex overflow-hidden">
          {"NIZAM".split("").map((ch, i) => (
            <span
              key={i}
              className="display inline-block text-[clamp(3rem,8vw,6rem)] tracking-[0.18em] text-paper"
            >
              {ch}
            </span>
          ))}
        </div>
        <p className="eyebrow absolute bottom-10">Built for Every Operation</p>
      </div>
    </TransitionCtx.Provider>
  );
}
