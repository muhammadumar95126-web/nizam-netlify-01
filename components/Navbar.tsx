"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";
import Magnetic from "@/components/ui/MagneticButton";
import TransitionLink from "@/components/ui/TransitionLink";
import type Lenis from "lenis";

const EASE = [0.76, 0, 0.24, 1] as const;

const MENU_LINKS = [
  { label: "Home", href: "/" },
  ...NAV_LINKS,
  { label: "Book Demo", href: "/book-demo" },
  { label: "Join Waitlist", href: "/waitlist" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 120 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (open) lenis?.stop();
    else lenis?.start();
    return () => lenis?.start();
  }, [open]);

  // close menu whenever the route settles
  useEffect(() => {
    const raf = requestAnimationFrame(() => setOpen(false));
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  const close = () => setOpen(false);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[100] mix-blend-difference"
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="flex items-center justify-between px-5 py-5 md:px-10 md:py-6">
          <TransitionLink
            href="/"
            aria-label="NizamOps home"
            className="font-display text-lg font-semibold tracking-[0.32em] text-white"
          >
            NizamOps
          </TransitionLink>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <TransitionLink
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative font-mono text-[0.6875rem] uppercase tracking-[0.22em] transition-colors duration-300 ${
                    active ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px w-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                      active
                        ? "scale-x-100"
                        : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100"
                    }`}
                  />
                </TransitionLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-6">
            <Magnetic
              as={TransitionLink}
              href="/book-demo"
              strength={0.3}
              className="group hidden items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-white md:inline-flex"
            >
              Book Demo
              <ArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Magnetic>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative flex h-11 w-11 cursor-pointer items-center justify-center"
            >
              <span
                className={`absolute h-px w-6 bg-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  open ? "rotate-45" : "-translate-y-[4px]"
                }`}
              />
              <span
                className={`absolute h-px w-6 bg-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  open ? "-rotate-45" : "translate-y-[4px]"
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col justify-between overflow-y-auto bg-ink px-5 pt-24 pb-8 md:px-10 md:pt-28 md:pb-10"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.85, ease: EASE }}
          >
            <nav aria-label="Menu" className="flex flex-col">
              {MENU_LINKS.map((l, i) => (
                <div key={l.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "110%", transition: { duration: 0.4, ease: EASE } }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.12 + i * 0.05 }}
                  >
                    <TransitionLink
                      href={l.href}
                      onClick={close}
                      className="group flex items-baseline gap-4 py-0.5 text-paper"
                    >
                      <span className="font-mono text-[0.625rem] tracking-[0.25em] text-grey">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`display text-[clamp(1.9rem,5.8vw,4.2rem)] transition-colors duration-300 ${
                          pathname === l.href ? "text-accent" : "group-hover:text-accent"
                        }`}
                      >
                        {l.label}
                      </span>
                    </TransitionLink>
                  </motion.div>
                </div>
              ))}
            </nav>

            <motion.div
              className="mt-8 flex flex-col gap-3 border-t border-line pt-6 md:flex-row md:items-end md:justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <p className="eyebrow">One Platform. Every Operation.</p>
              <a
                href="mailto:hello@nizam.io"
                className="font-sans text-sm text-fog transition-colors hover:text-paper"
              >
                hello@nizam.io
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
