"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * A single cinematic looping video moment — real work, real operations.
 * Lazy: the video source is only attached once the band nears the viewport.
 */
export default function VideoBand() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-video-frame]",
        { clipPath: "inset(10% 5% 10% 5%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-video-frame]", start: "top 85%", once: true },
        }
      );
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          video.src = "/videos/signature-loop.mp4";
          video.play().catch(() => {});
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section hairline-t relative" aria-label="Real work, real operations">
      <div
        data-video-frame
        className="relative aspect-[16/9] w-full overflow-hidden bg-coal md:aspect-[21/9]"
      >
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster="/images/field-engineer.jpg"
          className="h-full w-full object-cover"
          aria-hidden
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,11,10,0.55) 0%, rgba(11,11,10,0.15) 35%, rgba(11,11,10,0.65) 100%)",
          }}
        />
        <div className="relative z-10 flex h-full w-full items-end">
          <div className="mx-auto w-full max-w-[1680px] px-5 pb-12 md:px-10 md:pb-16">
            <FadeIn as="p" className="eyebrow eyebrow-accent mb-4">
              Real Work, Real Operations
            </FadeIn>
            <Reveal
              as="p"
              className="display max-w-2xl text-[clamp(1.8rem,4.5vw,3.6rem)] text-paper"
            >
              Behind every ticket, <em className="serif-i text-fog">a person doing the work.</em>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
