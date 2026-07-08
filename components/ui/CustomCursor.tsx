"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/utils";

const subscribePointer = (cb: () => void) => {
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** Dot + trailing ring cursor. Desktop pointer devices only. */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const enabled = useSyncExternalStore(
    subscribePointer,
    () => window.matchMedia("(pointer: fine)").matches && !prefersReducedMotion(),
    () => false
  );

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;

    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const glow = t.closest("[data-cursor='glow'], .card-glass");
      const interactive = t.closest("a, button, [data-cursor='hover'], input, textarea, select, [role='button']");
      gsap.to(ring, {
        scale: glow ? 3.4 : interactive ? 2.2 : 1,
        opacity: glow ? 0.22 : interactive ? 0.4 : 1,
        borderColor: glow ? "rgba(194,168,120,0.7)" : "rgba(239,237,231,0.4)",
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(dot, { scale: interactive || glow ? 0.4 : 1, duration: 0.35 });
    };

    const down = () => gsap.to(ring, { scale: 0.85, duration: 0.2 });
    const up = () => gsap.to(ring, { scale: 1, duration: 0.3 });

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <div
        ref={dotRef}
        className="absolute -top-[3px] -left-[3px] h-1.5 w-1.5 rounded-full bg-accent mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="absolute -top-4 -left-4 h-8 w-8 rounded-full border border-paper/40 mix-blend-difference"
      />
    </div>
  );
}
