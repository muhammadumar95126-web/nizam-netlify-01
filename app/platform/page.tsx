import type { Metadata } from "next";
import dynamic from "next/dynamic";
import PageHero from "@/components/ui/PageHero";
import PlatformModules from "@/components/sections/PlatformModules";

const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"));
const Dashboard = dynamic(() => import("@/components/sections/Dashboard"));
const AISection = dynamic(() => import("@/components/sections/AISection"));
const CTABand = dynamic(() => import("@/components/ui/CTABand"));

export const metadata: Metadata = {
  title: "Platform",
  description:
    "Nine modules, one discipline: service requests, incidents, maintenance, work orders, assets, field operations, inspections, analytics, and NIZAM AI.",
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
      <Dashboard index="04" />
      <AISection index="05" />
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
