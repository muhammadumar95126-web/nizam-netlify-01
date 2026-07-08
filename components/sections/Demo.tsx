"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";
import { INDUSTRIES } from "@/lib/data";

type Status = "idle" | "loading" | "done" | "error";

export default function Demo() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (!data.name || !data.email || !data.organization) {
      setError("Name, email and organization are required.");
      setStatus("error");
      return;
    }
    setError("");
    setStatus("loading");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setError("Something went wrong. Try again or write to hello@nizam.io.");
      setStatus("error");
    }
  };

  return (
    <section
      id="demo"
      data-theme="light"
      className="section"
      aria-labelledby="demo-title"
    >
      <div id="contact" className="mx-auto max-w-[1680px] scroll-mt-24 px-5 py-28 md:px-10 md:py-44">
        <div className="mb-14 flex items-baseline justify-between md:mb-20">
          <p className="eyebrow">( 01 ) — Book a Demo</p>
          <p className="eyebrow hidden md:block">Contact</p>
        </div>

        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal as="h2" id="demo-title" className="display text-[clamp(2.6rem,6vw,5.5rem)]">
                See your operation
                <br />
                <em className="serif-i" style={{ color: "var(--grey)" }}>
                  in order.
                </em>
              </Reveal>
              <FadeIn className="mt-8 max-w-md">
                <p className="text-base leading-relaxed" style={{ color: "var(--grey)" }}>
                  Thirty minutes. Your workflows, mapped live onto NIZAM by
                  someone who has run operations, not a slide deck.
                </p>
              </FadeIn>

              <FadeIn className="mt-14 flex flex-col gap-6 border-t pt-10" style={{ borderColor: "var(--line)" }}>
                <div>
                  <p className="eyebrow mb-1.5">General</p>
                  <a href="mailto:hello@nizam.io" className="font-display text-xl font-medium tracking-tight transition-colors hover:text-accent md:text-2xl">
                    hello@nizam.io
                  </a>
                </div>
                <div>
                  <p className="eyebrow mb-1.5">Partnerships</p>
                  <a href="mailto:partners@nizam.io" className="font-display text-xl font-medium tracking-tight transition-colors hover:text-accent md:text-2xl">
                    partners@nizam.io
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7" aria-live="polite">
            <AnimatePresence mode="wait">
              {status === "done" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.6, 0.3, 1] }}
                  className="border p-10"
                  style={{ borderColor: "var(--accent-dim)" }}
                >
                  <p className="serif-i text-3xl md:text-4xl" style={{ color: "var(--accent-dim)" }}>
                    Consider it scheduled.
                  </p>
                  <p className="mt-4 text-base" style={{ color: "var(--grey)" }}>
                    We’ll reach out within one business day to find a time that
                    suits you. Bring your hardest workflow.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  noValidate
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-8"
                >
                  <div className="grid gap-8 sm:grid-cols-2">
                    <div>
                      <label htmlFor="demo-name" className="eyebrow mb-2 block">
                        Full name *
                      </label>
                      <input id="demo-name" name="name" type="text" autoComplete="name" required placeholder="Amira Khan" className="field" />
                    </div>
                    <div>
                      <label htmlFor="demo-email" className="eyebrow mb-2 block">
                        Work email *
                      </label>
                      <input id="demo-email" name="email" type="email" autoComplete="email" required placeholder="amira@organization.com" className="field" />
                    </div>
                  </div>
                  <div className="grid gap-8 sm:grid-cols-2">
                    <div>
                      <label htmlFor="demo-org" className="eyebrow mb-2 block">
                        Organization *
                      </label>
                      <input id="demo-org" name="organization" type="text" autoComplete="organization" required placeholder="Ministry of Works" className="field" />
                    </div>
                    <div>
                      <label htmlFor="demo-industry" className="eyebrow mb-2 block">
                        Industry
                      </label>
                      <select id="demo-industry" name="industry" className="field cursor-pointer" defaultValue="">
                        <option value="" disabled>
                          Select industry
                        </option>
                        {INDUSTRIES.map((i) => (
                          <option key={i.id} value={i.id}>
                            {i.name}
                          </option>
                        ))}
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="demo-message" className="eyebrow mb-2 block">
                      What should we prepare for?
                    </label>
                    <textarea
                      id="demo-message"
                      name="message"
                      rows={3}
                      placeholder="Tell us about your operation: sites, teams, current tools…"
                      className="field resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <p role="alert" className="text-sm" style={{ color: "#8a3b22" }}>
                      {error}
                    </p>
                  )}

                  <div>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="btn btn-ghost !border-ink/40 disabled:opacity-60"
                      style={{ "--foreground": "var(--ink)", "--background": "var(--paper)" } as React.CSSProperties}
                    >
                      {status === "loading" && <Loader2 size={14} className="animate-spin" />}
                      {status === "loading" ? "Sending" : "Request Demo"}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
