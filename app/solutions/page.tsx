import type { Metadata } from "next";
import dynamic from "next/dynamic";
import PageHero from "@/components/ui/PageHero";
import Problems from "@/components/sections/Problems";
import SolutionPillars from "@/components/sections/SolutionPillars";

const CTABand = dynamic(() => import("@/components/ui/CTABand"));

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Fragmentation, invisibility, slow response, asset blindness, unprovable work: the five failures of operations, and how NizamOps ends each one.",
};

export default function SolutionsPage() {
  return (
    <main>
      <PageHero
        eyebrow="01 — Solutions"
        meta="Five Failures · Four Answers"
        title={
          <>
            Operations fail
            <br />
            in <em className="serif-i text-fog">predictable ways.</em>
          </>
        }
        description="We studied how physical operations break down across hundreds of organizations. The failures repeat. So do the fixes, when the system is built for them."
      />
      <Problems />
      <SolutionPillars />
      <CTABand
        title={
          <>
            Stop managing chaos.
            <br />
            <em className="serif-i text-fog">Start running order.</em>
          </>
        }
      />
    </main>
  );
}
