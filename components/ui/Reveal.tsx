"use client";

import { useRef, type ReactNode, type ElementType } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

type RevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  stagger?: number;
  start?: string;
  /** animate immediately instead of on scroll (hero) */
  immediate?: boolean;
};

/** Masked line-by-line text reveal. */
export default function Reveal({
  as: Tag = "div",
  children,
  className,
  id,
  delay = 0,
  stagger = 0.09,
  start = "top 85%",
  immediate = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        linesClass: "split-line",
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 115,
            duration: 1.15,
            ease: "power4.out",
            stagger,
            delay,
            ...(immediate
              ? {}
              : {
                  scrollTrigger: { trigger: el, start, once: true },
                }),
          }),
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
