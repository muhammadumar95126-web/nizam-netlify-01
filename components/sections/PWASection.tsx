"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import {
  Download,
  Wifi,
  RefreshCw,
  Bell,
  Lock,
  Camera,
  MapPin,
  Smartphone,
  Store,
  Globe,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import FadeIn from "@/components/ui/FadeIn";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FEATURES = [
  { icon: Download, title: "Install From Your Browser", body: "One tap, no store checkout, no account creation." },
  { icon: Store, title: "No App Store Required", body: "Skip Apple's and Google's review queues entirely." },
  { icon: Smartphone, title: "Every Platform", body: "Android, iPhone, Windows and macOS, one codebase." },
  { icon: Wifi, title: "Offline Support", body: "Field teams keep working when signal doesn't reach." },
  { icon: RefreshCw, title: "Automatic Updates", body: "The app updates itself, silently, in the background." },
  { icon: Bell, title: "Push Notifications", body: "Assignment and SLA alerts, even when the app is closed." },
  { icon: Lock, title: "Secure Login", body: "The same enterprise authentication as the full platform." },
  { icon: Camera, title: "Camera & QR", body: "Scan an asset's QR code straight from the device camera." },
  { icon: MapPin, title: "GPS for Field Ops", body: "Location-verified attendance and dispatch, built in." },
];

const INSTALL_PROMPTS = [
  { browser: "Chrome", cue: "Install icon in the address bar" },
  { browser: "Safari", cue: "Share menu → Add to Home Screen" },
  { browser: "Edge", cue: "Apps icon in the address bar" },
  { browser: "Android", cue: "“Add NizamOps to Home screen” banner" },
  { browser: "iPhone", cue: "Share sheet → Add to Home Screen" },
];

function DeviceFrame({
  kind,
  className = "",
}: {
  kind: "desktop" | "laptop" | "tablet" | "android" | "iphone";
  className?: string;
}) {
  const isPhone = kind === "android" || kind === "iphone";
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        className={`overflow-hidden border border-line-strong bg-smoke shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] ${
          kind === "desktop" || kind === "laptop"
            ? "aspect-[16/10] w-full rounded-lg"
            : kind === "tablet"
              ? "aspect-[3/4] w-full rounded-2xl"
              : "aspect-[9/19] w-full rounded-[1.6rem]"
        }`}
      >
        {kind === "iphone" && (
          <div className="mx-auto mt-2 h-4 w-16 rounded-full bg-ink" aria-hidden />
        )}
        {kind === "android" && (
          <div className="mx-auto mt-2 h-1.5 w-1.5 rounded-full bg-ink" aria-hidden />
        )}
        <div className="flex h-full flex-col justify-center px-3 py-3">
          <p className={`font-mono uppercase tracking-[0.14em] text-grey ${isPhone ? "text-[0.4375rem]" : "text-[0.5rem]"}`}>
            SLA Compliance
          </p>
          <p className={`font-display font-medium text-paper ${isPhone ? "text-lg" : "text-2xl"}`}>
            98.6%
          </p>
          <div className="mt-2 h-1 w-full rounded-full bg-line">
            <div className="h-1 w-[86%] rounded-full bg-accent" />
          </div>
        </div>
      </div>
      {kind === "desktop" && <div className="mt-1 h-6 w-16 rounded-b-md bg-line-strong" aria-hidden />}
      {kind === "laptop" && <div className="mt-0.5 h-2 w-[110%] rounded-b-lg bg-line-strong" aria-hidden />}
      <p className="eyebrow mt-4 text-fog/60">{kind[0].toUpperCase() + kind.slice(1)}</p>
    </div>
  );
}

type PWASectionProps = { index?: string };

export default function PWASection({ index = "10" }: PWASectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [promptIdx, setPromptIdx] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setPromptIdx((i) => (i + 1) % INSTALL_PROMPTS.length), 2800);
    return () => clearInterval(id);
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-device]", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-device-row]", start: "top 80%", once: true },
      });
    },
    { scope: ref }
  );

  const current = INSTALL_PROMPTS[promptIdx];

  return (
    <section ref={ref} className="section hairline-t" aria-labelledby="pwa-title">
      <div className="mx-auto max-w-[1680px] px-5 py-28 md:px-10 md:py-44">
        <div className="mb-14 flex items-baseline justify-between md:mb-20">
          <p className="eyebrow">( {index} ) — Progressive Web App</p>
          <p className="eyebrow hidden md:block">Install, Don&rsquo;t Download</p>
        </div>

        <Reveal as="h2" id="pwa-title" className="display max-w-4xl text-[clamp(2.4rem,6.5vw,6rem)]">
          One Platform.
          <br />
          <em className="serif-i text-fog">Every Device.</em>
        </Reveal>
        <FadeIn className="mt-8 max-w-xl">
          <p className="text-base leading-relaxed text-fog">
            NizamOps installs straight from the browser and feels native the
            moment it opens: desktop, tablet, Android or iPhone, always in sync.
          </p>
        </FadeIn>

        {/* device family */}
        <div data-device-row className="mt-20 grid grid-cols-2 items-end gap-6 sm:grid-cols-3 md:mt-28 lg:grid-cols-6 lg:gap-8">
          <div data-device className="col-span-2 sm:col-span-1 lg:col-span-2">
            <DeviceFrame kind="desktop" />
          </div>
          <div data-device>
            <DeviceFrame kind="laptop" />
          </div>
          <div data-device>
            <DeviceFrame kind="tablet" />
          </div>
          <div data-device>
            <DeviceFrame kind="android" />
          </div>
          <div data-device>
            <DeviceFrame kind="iphone" />
          </div>
        </div>

        {/* install prompt mock */}
        <FadeIn className="mx-auto mt-20 flex max-w-md items-center gap-3 rounded-full border border-line-strong bg-coal px-5 py-3 md:mt-28">
          <Globe size={15} className="shrink-0 text-accent" strokeWidth={1.75} />
          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.browser}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-[0.8125rem] text-paper/90">
                  <span className="text-accent">Install NizamOps</span> · {current.browser}
                </p>
                <p className="truncate font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-fog/60">
                  {current.cue}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </FadeIn>

        {/* feature grid */}
        <FadeIn
          staggerChildren={0.06}
          className="mt-20 grid gap-px border border-line bg-line md:mt-28 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((f) => (
            <div key={f.title} className="card-glass group flex items-start gap-4 bg-background p-7">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-strong text-accent">
                <f.icon size={15} strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="text-[0.9375rem] text-paper">{f.title}</h3>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-fog">{f.body}</p>
              </div>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
