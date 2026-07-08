"use client";

import { useRef, type ReactNode, type ElementType, type ComponentPropsWithoutRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/utils";

type MagneticProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  strength?: number;
} & ComponentPropsWithoutRef<T>;

/** Element that leans toward the cursor, then springs back. */
export default function Magnetic<T extends ElementType = "div">({
  as,
  children,
  strength = 0.35,
  ...rest
}: MagneticProps<T>) {
  const Tag = (as || "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    gsap.to(el, { x, y, duration: 0.6, ease: "power3.out" });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.35)" });
  };

  return (
    <Tag ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} {...rest}>
      {children}
    </Tag>
  );
}
