import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  duration?: number;
  pauseOnHover?: boolean;
};

/** Infinite horizontal ticker. Content is duplicated for a seamless loop. */
export default function Marquee({
  children,
  className,
  duration = 40,
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={cn("overflow-hidden", pauseOnHover && "marquee-paused", className)}
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
    >
      <div className="marquee-track">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
