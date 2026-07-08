"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  Wrench,
  FileText,
  BarChart3,
  ScanLine,
  FileBarChart,
  Boxes,
  Truck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";
import FloatingPanel from "@/components/ui/FloatingPanel";
import ComingSoonModal from "@/components/ComingSoonModal";
import { FUTURE_MODULES } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/utils";

const ICONS: LucideIcon[] = [
  LayoutDashboard,
  ClipboardList,
  Package,
  Wrench,
  FileText,
  BarChart3,
  ScanLine,
  FileBarChart,
  Boxes,
  Truck,
  Sparkles,
];

function ModuleCard({ index, name, body, Icon }: { index: string; name: string; body: string; Icon: LucideIcon }) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const quick = useRef<{ x?: (v: number) => void; y?: (v: number) => void }>({});
  const [open, setOpen] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion() || !cardRef.current) return;
    if (!quick.current.x) {
      quick.current.x = gsap.quickTo(cardRef.current, "rotateY", { duration: 0.4, ease: "power3.out" });
      quick.current.y = gsap.quickTo(cardRef.current, "rotateX", { duration: 0.4, ease: "power3.out" });
    }
    const r = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    quick.current.x(px * 10);
    quick.current.y?.(-py * 10);
  };

  const onLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
  };

  return (
    <>
      <button
        ref={cardRef}
        type="button"
        onClick={() => setOpen(true)}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ transformStyle: "preserve-3d" }}
        className="card-glass group relative flex w-[260px] shrink-0 snap-start flex-col justify-between border border-line bg-coal p-7 text-left transition-colors duration-500 hover:border-accent/50 md:w-[300px]"
      >
        <div>
          <div className="flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-accent">
              <Icon size={16} strokeWidth={1.75} />
            </span>
            <span className="font-mono text-[0.5625rem] tracking-[0.2em] text-grey">/{index}</span>
          </div>
          <h3 className="display mt-8 text-xl md:text-2xl">{name}</h3>
          <p className="mt-3 text-[0.8125rem] leading-relaxed text-fog">{body}</p>
        </div>
        <span className="mt-8 inline-block rounded-full border border-accent/40 px-3 py-1 self-start font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-accent">
          Coming Soon
        </span>
      </button>

      <ComingSoonModal open={open} onClose={() => setOpen(false)} eyebrow="Module Preview" title={name} />
    </>
  );
}

type ModuleCarouselProps = { index?: string };

export default function ModuleCarousel({ index = "08" }: ModuleCarouselProps) {
  return (
    <section className="section hairline-t relative overflow-hidden" aria-labelledby="module-carousel-title">
      <div className="mx-auto max-w-[1680px] px-5 py-28 md:px-10 md:py-44">
        <div className="mb-14 flex items-baseline justify-between md:mb-20">
          <p className="eyebrow">( {index} ) — What's Next</p>
          <p className="eyebrow eyebrow-accent hidden md:block">Drag to Explore</p>
        </div>

        <div className="mb-12 grid gap-8 md:mb-16 md:grid-cols-12 md:items-end">
          <Reveal
            as="h2"
            id="module-carousel-title"
            className="display text-[clamp(2.4rem,6.5vw,6rem)] md:col-span-8"
          >
            Eleven modules.
            <br />
            <em className="serif-i text-fog">Every one coming to life.</em>
          </Reveal>
          <FadeIn className="md:col-span-4">
            <p className="max-w-sm text-base leading-relaxed text-fog">
              Each module ships as its own milestone. Tap a card for an early
              look at what&rsquo;s coming next.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="relative">
        <FadeIn
          staggerChildren={0.06}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-8 md:px-10"
          style={{ perspective: 1000 }}
        >
          {FUTURE_MODULES.map((m, i) => (
            <ModuleCard key={m.index} index={m.index} name={m.name} body={m.body} Icon={ICONS[i % ICONS.length]} />
          ))}
          <div aria-hidden className="w-1 shrink-0" />
        </FadeIn>

        <FloatingPanel variant="work-order" className="hidden xl:flex -top-6 right-16 w-52" duration={7} />
        <FloatingPanel variant="task-card" className="hidden xl:flex -bottom-4 left-16 w-52" duration={6.5} delay={0.8} />
      </div>
    </section>
  );
}
