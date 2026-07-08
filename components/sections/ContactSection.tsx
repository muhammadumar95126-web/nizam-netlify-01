"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";
import TransitionLink from "@/components/ui/TransitionLink";

type Status = "idle" | "loading" | "done" | "error";

const CHANNELS = [
  { label: "General", value: "hello@nizam.io", href: "mailto:hello@nizam.io" },
  { label: "Partnerships", value: "partners@nizam.io", href: "mailto:partners@nizam.io" },
  { label: "Press", value: "press@nizam.io", href: "mailto:press@nizam.io" },
];

export default function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    if (!data.name || !data.email || !data.message) {
      setError("Name, email and a message are required.");
      setStatus("error");
      return;
    }
    setError("");
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setError("Something went wrong. Write to hello@nizam.io instead.");
      setStatus("error");
    }
  };

  return (
    <section className="section" aria-labelledby="contact-title">
      <div className="mx-auto max-w-[1680px] px-5 pt-36 pb-28 md:px-10 md:pt-52 md:pb-44">
        <FadeIn immediate delay={0.25} className="mb-14 flex items-baseline justify-between md:mb-20">
          <p className="eyebrow">( 01 ) — Contact</p>
          <p className="eyebrow hidden md:block">One Business Day</p>
        </FadeIn>

        <Reveal
          as="h1"
          immediate
          delay={0.35}
          id="contact-title"
          className="display max-w-5xl text-[clamp(2.8rem,8vw,8rem)]"
        >
          Say it. <em className="serif-i text-fog">We&apos;re listening.</em>
        </Reveal>

        <div className="mt-20 grid gap-16 lg:mt-28 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <FadeIn immediate delay={0.7} className="flex flex-col gap-8">
              {CHANNELS.map((c) => (
                <div key={c.label} className="border-b border-line pb-6">
                  <p className="eyebrow mb-2">{c.label}</p>
                  <a
                    href={c.href}
                    className="group inline-flex items-center gap-2 font-display text-xl font-medium tracking-tight text-paper transition-colors hover:text-accent md:text-2xl"
                  >
                    {c.value}
                    <ArrowUpRight size={16} className="opacity-0 transition-all duration-300 group-hover:opacity-100" />
                  </a>
                </div>
              ))}
              <div>
                <p className="eyebrow mb-2">Prefer a demonstration?</p>
                <TransitionLink
                  href="/book-demo"
                  className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-accent"
                >
                  Book a demo →
                </TransitionLink>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-7 lg:col-start-6" aria-live="polite">
            <AnimatePresence mode="wait">
              {status === "done" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.6, 0.3, 1] }}
                  className="border border-accent/40 bg-coal p-10"
                >
                  <p className="serif-i text-3xl text-accent md:text-4xl">Received.</p>
                  <p className="mt-4 text-base text-fog">
                    Your message is with us. Expect a reply within one business
                    day, from a person, not a bot.
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
                      <label htmlFor="c-name" className="eyebrow mb-2 block">
                        Full name *
                      </label>
                      <input id="c-name" name="name" type="text" autoComplete="name" required placeholder="Amira Khan" className="field" />
                    </div>
                    <div>
                      <label htmlFor="c-email" className="eyebrow mb-2 block">
                        Work email *
                      </label>
                      <input id="c-email" name="email" type="email" autoComplete="email" required placeholder="amira@organization.com" className="field" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="c-subject" className="eyebrow mb-2 block">
                      Subject
                    </label>
                    <input id="c-subject" name="subject" type="text" placeholder="Partnership, procurement, press…" className="field" />
                  </div>
                  <div>
                    <label htmlFor="c-message" className="eyebrow mb-2 block">
                      Message *
                    </label>
                    <textarea
                      id="c-message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Tell us what you're running, and what's in the way."
                      className="field resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <p role="alert" className="text-sm text-[#e0a68b]">
                      {error}
                    </p>
                  )}

                  <div>
                    <button type="submit" disabled={status === "loading"} className="btn btn-solid disabled:opacity-60">
                      {status === "loading" && <Loader2 size={14} className="animate-spin" />}
                      {status === "loading" ? "Sending" : "Send Message"}
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
