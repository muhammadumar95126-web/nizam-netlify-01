"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type WaitlistOverlayContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const WaitlistOverlayContext = createContext<WaitlistOverlayContextValue | null>(null);

/** Global controller for the full-screen waitlist overlay, mounted once in the root layout. */
export function WaitlistOverlayProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <WaitlistOverlayContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </WaitlistOverlayContext.Provider>
  );
}

export function useWaitlistOverlay() {
  const ctx = useContext(WaitlistOverlayContext);
  if (!ctx) {
    throw new Error("useWaitlistOverlay must be used within a WaitlistOverlayProvider");
  }
  return ctx;
}
