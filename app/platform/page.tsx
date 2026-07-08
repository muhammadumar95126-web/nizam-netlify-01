import type { Metadata } from "next";
import dynamic from "next/dynamic";
import PageHero from "@/components/ui/PageHero";
import PlatformModules from "@/components/sections/PlatformModules";

const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"));
const MobileShowcase = dynamic(() => import("@/components/sections/MobileShowcase"));
const Dashboard = dynamic(() => import("@/components/sections/Dashboard"));
const Architecture = dynamic(() => import("@/components/sections/Architecture"));
const AISection = dynamic(() => import("@/components/sections/AISection"));
const CTABand = dynamic(() => import("@/components/ui/CTABand"));

export const metadata: Metadata = {
  title: "Platform",
  description:
    "Nine modules, one discipline: service requests, incidents, maintenance, work orders, assets, field operations, inspections, analytics, and NizamOps AI.",
};

export default function PlatformPage() {
  return (
    <main>
      <PageHero
        eyebrow="01 — Platform"
        meta="Nine Modules · One System"
        title={
          <>
            The operating system
            <br />
            for <em className="serif-i text-fog">physical operations.</em>
          </>
        }
        description="Not a bundle of point tools: one connected system where every module shares the same data, the same discipline and the same source of truth."
      />
      <PlatformModules />
      <HowItWorks />
      <MobileShowcase index="04" />
      <Dashboard index="05" />
      <Architecture index="06" />
      <AISection index="07" />
      <CTABand
        title={
          <>
            See the platform
            <br />
            <em className="serif-i text-fog">on your operation.</em>
          </>
        }
      />
    </main>
  );
}
