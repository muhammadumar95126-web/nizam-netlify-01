"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, X } from "lucide-react";
import type Lenis from "lenis";
import Magnetic from "@/components/ui/MagneticButton";
import { useWaitlistOverlay } from "@/lib/waitlist-context";
import { prefersReducedMotion } from "@/lib/utils";

type Status = "idle" | "loading" | "done" | "error";

const EASE = [0.76, 0, 0.24, 1] as const;

/** Full-screen, premium waitlist experience — every "Join Waitlist" trigger on the site opens this. */
export default function WaitlistOverlay() {
  const { isOpen, close } = useWaitlistOverlay();
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const wasOpen = useRef(false);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else if (wasOpen.current) {
      lenis?.start();
      document.body.style.overflow = "";
    }
    wasOpen.current = isOpen;
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  // reset the form a beat after the overlay finishes closing
  useEffect(() => {
    if (isOpen) return;
    const t = setTimeout(() => {
      setStatus("idle");
      setEmail("");
      setError("");
    }, 500);
    return () => clearTimeout(t);
  }, [isOpen]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid work email to join.");
      setStatus("error");
      return;
    }
    setError("");
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setError("Something went wrong. Try again or write to hello@nizam.io.");
      setStatus("error");
    }
  };

  const reduced = prefersReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="safe-top safe-bottom safe-x fixed inset-0 z-[400] flex justify-center overflow-y-auto p-5 py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduced ? 0 : 0.35 } }}
          transition={{ duration: reduced ? 0 : 0.4 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="waitlist-overlay-title"
        >
          {/* layered dimmed + blurred backdrop */}
          <motion.div
            aria-hidden
            onClick={close}
            className="absolute inset-0 bg-ink/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 55% at 50% 40%, rgba(194,168,120,0.1), transparent 65%)",
            }}
          />

          <motion.div
            className="relative z-10 m-auto w-full max-w-xl border border-line-strong bg-coal p-8 shadow-[0_80px_160px_-40px_rgba(0,0,0,0.85)] md:p-14"
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 24 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: reduced ? 0 : 0.55, ease: EASE }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-6 right-6 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-line-strong text-fog transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              <X size={16} />
            </button>

            <p className="eyebrow eyebrow-accent mb-6">Private Beta</p>

            <AnimatePresence mode="wait">
              {status === "done" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <h2 id="waitlist-overlay-title" className="serif-i text-3xl text-accent md:text-4xl">
                    Welcome to order.
                  </h2>
                  <p className="mt-4 max-w-sm text-base leading-relaxed text-fog">
                    You&rsquo;re on the founding list. Expect news before anyone
                    else, and nothing you didn&rsquo;t ask for.
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="btn btn-ghost mt-10"
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
                  <h2
                    id="waitlist-overlay-title"
                    className="display max-w-md text-[clamp(2rem,5vw,3.2rem)] leading-[1.02]"
                  >
                    Be first
                    <br />
                    in <em className="serif-i text-accent">line.</em>
                  </h2>
                  <p className="mt-5 max-w-sm text-sm leading-relaxed text-fog">
                    Founding members get private-beta access, priority
                    onboarding and pricing that never expires. One email. No
                    noise, only milestones.
                  </p>

                  <form onSubmit={submit} noValidate className="mt-10">
                    <label htmlFor="waitlist-overlay-email" className="eyebrow mb-3 block">
                      Work email
                    </label>
                    <div className="flex items-end gap-4">
                      <input
                        id="waitlist-overlay-email"
                        type="email"
                        autoComplete="email"
                        required
                        autoFocus
                        placeholder="you@organization.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={status === "error"}
                        aria-describedby={status === "error" ? "waitlist-overlay-error" : undefined}
                        className="field text-lg md:text-xl"
                      />
                      <Magnetic
                        as="button"
                        type="submit"
                        disabled={status === "loading"}
                        strength={0.3}
                        aria-label="Join the waitlist"
                        className="group flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line-strong transition-colors duration-300 hover:border-accent hover:bg-accent disabled:opacity-60"
                      >
                        {status === "loading" ? (
                          <Loader2 size={18} className="animate-spin text-paper" />
                        ) : (
                          <ArrowRight
                            size={18}
                            className="text-paper transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-ink"
                          />
                        )}
                      </Magnetic>
                    </div>
                    {status === "error" && (
                      <p id="waitlist-overlay-error" role="alert" className="mt-3 text-sm text-[#e0a68b]">
                        {error}
                      </p>
                    )}
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
