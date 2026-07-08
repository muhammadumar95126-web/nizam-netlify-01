"use client";

import { useRef, type ReactNode, type ElementType } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type FadeInProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  delay?: number;
  y?: number;
  duration?: number;
  start?: string;
  /** stagger direct children instead of animating the wrapper */
  staggerChildren?: number;
  immediate?: boolean;
};

/** Soft rise + fade on scroll. Set staggerChildren to cascade direct children. */
export default function FadeIn({
  as: Tag = "div",
  children,
  className,
  id,
  style,
  delay = 0,
  y = 36,
  duration = 1,
  start = "top 88%",
  staggerChildren,
  immediate = false,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const targets = staggerChildren ? Array.from(el.children) : el;

      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        delay,
        ease: "power3.out",
        stagger: staggerChildren ?? 0,
        ...(immediate
          ? {}
          : { scrollTrigger: { trigger: el, start, once: true } }),
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} id={id} style={style} className={className}>
      {children}
    </Tag>
  );
}
