"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Magnetic from "@/components/ui/MagneticButton";
import TransitionLink from "@/components/ui/TransitionLink";
import { useWaitlistOverlay } from "@/lib/waitlist-context";
import { prefersReducedMotion } from "@/lib/utils";

const EASE = [0.76, 0, 0.24, 1] as const;

type ComingSoonModalProps = {
  open: boolean;
  onClose: () => void;
  eyebrow?: string;
  title: string;
  description?: string;
};

/**
 * Shared "Apple product launch" style modal — used by the Dashboard Preview
 * launch sequence and the Module Carousel card previews.
 */
export default function ComingSoonModal({
  open,
  onClose,
  eyebrow = "Preview",
  title,
  description = "This is a preview of the next-generation Enterprise Operations Platform. Join the waitlist to receive early access.",
}: ComingSoonModalProps) {
  const { open: openWaitlist } = useWaitlistOverlay();
  const reduced = prefersReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="safe-top safe-bottom safe-x fixed inset-0 z-[350] flex justify-center overflow-y-auto p-5 py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduced ? 0 : 0.3 } }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="coming-soon-title"
        >
          <motion.div
            aria-hidden
            onClick={onClose}
            className="absolute inset-0 bg-ink/88 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 55% 50% at 50% 45%, rgba(194,168,120,0.12), transparent 65%)",
            }}
          />

          <motion.div
            className="relative z-10 m-auto w-full max-w-lg border border-line-strong bg-coal p-8 text-center shadow-[0_80px_160px_-40px_rgba(0,0,0,0.85)] md:p-12"
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.88, filter: "blur(6px)" }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.92, filter: "blur(4px)" }}
            transition={{ duration: reduced ? 0 : 0.6, ease: EASE }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-line-strong text-fog transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              <X size={16} />
            </button>

            <p className="eyebrow eyebrow-accent mb-6">{eyebrow}</p>
            <h2 id="coming-soon-title" className="display text-[clamp(1.9rem,4.5vw,2.8rem)]">
              {title}
            </h2>
            <p className="serif-i mt-2 text-xl text-accent md:text-2xl">Coming Soon</p>
            <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed text-fog">{description}</p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Magnetic
                as="button"
                type="button"
                onClick={() => {
                  onClose();
                  openWaitlist();
                }}
                strength={0.25}
                className="btn btn-solid"
              >
                Join Waitlist
              </Magnetic>
              <Magnetic as={TransitionLink} href="/book-demo" strength={0.25} className="btn btn-ghost">
                Book Demo
              </Magnetic>
              <Magnetic
                as="button"
                type="button"
                onClick={() => {
                  onClose();
                  openWaitlist();
                }}
                strength={0.25}
                className="btn btn-ghost"
              >
                Notify Me
              </Magnetic>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
