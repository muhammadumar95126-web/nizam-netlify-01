"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { INDUSTRIES } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/utils";

type IndustryContextValue = {
  active: number;
  interacted: boolean;
  select: (i: number) => void;
  setPaused: (paused: boolean) => void;
};

const IndustryContext = createContext<IndustryContextValue | null>(null);

/**
 * Shared selection state for the Industry Orbit (Explorer) and every
 * section downstream on the homepage (Modules, Workflow, Dashboard) that
 * reacts to the currently selected industry.
 */
export function IndustryProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [paused, setPaused] = useState(false);
  const pulseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (interacted || paused || prefersReducedMotion()) return;
    const id = setInterval(() => setActive((a) => (a + 1) % INDUSTRIES.length), 6000);
    return () => clearInterval(id);
  }, [interacted, paused]);

  useEffect(() => {
    return () => {
      if (pulseTimer.current) clearTimeout(pulseTimer.current);
    };
  }, []);

  const select = (i: number) => {
    setInteracted(true);
    setActive(i);
  };

  return (
    <IndustryContext.Provider value={{ active, interacted, select, setPaused }}>
      {children}
    </IndustryContext.Provider>
  );
}

/** Reads the shared industry selection. Falls back to index 0 if used outside a provider. */
export function useIndustry() {
  const ctx = useContext(IndustryContext);
  if (!ctx) {
    return { active: 0, interacted: false, select: () => {}, setPaused: () => {} };
  }
  return ctx;
}
