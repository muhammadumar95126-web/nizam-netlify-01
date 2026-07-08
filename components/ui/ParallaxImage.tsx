"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn, prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ParallaxImageProps = {
  src: string;
  alt: string;
  /** must include an aspect/height class, e.g. "aspect-[16/10]" */
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** parallax intensity, 0 disables */
  speed?: number;
  /** ink duotone treatment for brand consistency */
  duotone?: boolean;
};

/** Image with clip reveal on enter and scrubbed inner parallax. */
export default function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  speed = 1,
  duotone = true,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const img = el.querySelector("[data-parallax-img]");

      gsap.fromTo(
        el,
        { clipPath: "inset(14% 7% 14% 7%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );

      if (img && speed !== 0) {
        gsap.fromTo(
          img,
          { yPercent: -7 * speed },
          {
            yPercent: 7 * speed,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-coal", className)}>
      <Image
        data-parallax-img
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          "scale-[1.16] object-cover will-change-transform",
          duotone && "grayscale-[45%]",
          imgClassName
        )}
      />
      {duotone && (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,11,10,0.3), rgba(11,11,10,0.05) 40%, rgba(11,11,10,0.45))",
          }}
        />
      )}
    </div>
  );
}
