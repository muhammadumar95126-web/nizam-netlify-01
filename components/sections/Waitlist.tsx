"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";

type Status = "idle" | "loading" | "done" | "error";

export default function Waitlist({ index = "01" }: { index?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

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

  return (
    <section id="waitlist" className="section hairline-t overflow-hidden" aria-labelledby="waitlist-title">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 100%, rgba(194,168,120,0.08), transparent 65%)",
        }}
      />
      <div className="relative mx-auto max-w-[1680px] px-5 py-32 md:px-10 md:py-56">
        <div className="mb-16 flex items-baseline justify-between md:mb-24">
          <p className="eyebrow">( {index} ) — Early Access</p>
          <p className="eyebrow hidden md:block">Limited Founding Cohort</p>
        </div>

        <Reveal
          as="h2"
          id="waitlist-title"
          className="display max-w-6xl text-[clamp(3rem,9vw,9rem)]"
        >
          Be first
          <br />
          in <em className="serif-i text-accent">line.</em>
        </Reveal>

        <FadeIn className="mt-10 max-w-lg">
          <p className="text-base leading-relaxed text-fog">
            Founding members get private-beta access, priority onboarding and
            pricing that never expires. One email. No noise, only milestones.
          </p>
        </FadeIn>

        <div className="mt-14 max-w-2xl md:mt-20" aria-live="polite">
          <AnimatePresence mode="wait">
            {status === "done" ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.6, 0.3, 1] }}
                className="border border-accent/40 bg-coal p-10"
              >
                <p className="serif-i text-3xl text-accent md:text-4xl">Welcome to order.</p>
                <p className="mt-4 text-base text-fog">
                  You’re on the founding list. Expect news before anyone else,
                  and nothing you didn’t ask for.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={submit}
                noValidate
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.4 }}
              >
                <label htmlFor="waitlist-email" className="eyebrow mb-3 block">
                  Work email
                </label>
                <div className="flex items-end gap-4">
                  <input
                    id="waitlist-email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@organization.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={status === "error"}
                    aria-describedby={status === "error" ? "waitlist-error" : undefined}
                    className="field text-lg md:text-2xl"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    aria-label="Join the waitlist"
                    className="group flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line-strong transition-colors duration-300 hover:border-accent hover:bg-accent disabled:opacity-60 md:h-16 md:w-16"
                  >
                    {status === "loading" ? (
                      <Loader2 size={18} className="animate-spin text-paper" />
                    ) : (
                      <ArrowRight
                        size={18}
                        className="text-paper transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-ink"
                      />
                    )}
                  </button>
                </div>
                {status === "error" && (
                  <p id="waitlist-error" role="alert" className="mt-3 text-sm text-[#e0a68b]">
                    {error}
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
