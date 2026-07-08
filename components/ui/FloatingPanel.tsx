"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Bell, TrendingUp, Wrench, CheckSquare, CheckCircle2 } from "lucide-react";
import { prefersReducedMotion } from "@/lib/utils";

type Variant = "notification" | "chart" | "work-order" | "task-card" | "approval";

type FloatingPanelProps = {
  variant: Variant;
  className?: string;
  /** drift distance in px */
  drift?: number;
  /** seconds per drift cycle */
  duration?: number;
  delay?: number;
};

const CONTENT: Record<Variant, { icon: typeof Bell; label: string; sub: string }> = {
  notification: { icon: Bell, label: "New work order assigned", sub: "Tower B · HVAC" },
  chart: { icon: TrendingUp, label: "SLA trending up", sub: "+4.2% this week" },
  "work-order": { icon: Wrench, label: "WO-5021", sub: "Chiller inspection" },
  "task-card": { icon: CheckSquare, label: "Inspect Chiller 07", sub: "Due today" },
  approval: { icon: CheckCircle2, label: "Approved", sub: "J. Khan · 2m ago" },
};

/** Small decorative "product teaser" panel — drifts gently, purely ambient. */
export default function FloatingPanel({
  variant,
  className = "",
  drift = 14,
  duration = 6,
  delay = 0,
}: FloatingPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { icon: Icon, label, sub } = CONTENT[variant];

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      gsap.to(ref.current, {
        y: `-=${drift}`,
        rotate: variant === "chart" ? -1.5 : 1.5,
        duration,
        delay,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute flex items-center gap-3 rounded-lg border border-line-strong bg-coal/90 px-4 py-3 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-sm ${className}`}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
        <Icon size={13} strokeWidth={1.75} />
      </span>
      <div>
        <p className="text-[0.75rem] leading-tight text-paper/90">{label}</p>
        <p className="mt-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-fog/60">{sub}</p>
      </div>
    </div>
  );
}
