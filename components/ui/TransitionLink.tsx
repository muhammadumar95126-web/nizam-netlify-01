"use client";

import Link from "next/link";
import { type ComponentPropsWithoutRef, type MouseEvent } from "react";
import { usePageTransition } from "@/components/providers/PageTransition";

/** next/link that routes through the curtain transition. */
export default function TransitionLink({
  href,
  onClick,
  ...rest
}: ComponentPropsWithoutRef<typeof Link>) {
  const { navigate } = usePageTransition();

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
      return;
    const url = typeof href === "string" ? href : (href.pathname ?? "");
    if (url.startsWith("/") && !url.includes("#")) {
      e.preventDefault();
      navigate(url);
    }
  };

  return <Link href={href} onClick={handle} {...rest} />;
}
