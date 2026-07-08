import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Roadmap from "@/components/sections/Roadmap";

const AISection = dynamic(() => import("@/components/sections/AISection"));
const Waitlist = dynamic(() => import("@/components/sections/Waitlist"));

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "Watch NizamOps being built in the open: development progress, planned features, the AI horizon and the road to general availability in Q4 2026.",
};

export default function RoadmapPage() {
  return (
    <main className="pt-10 md:pt-14">
      <Roadmap />
      <AISection index="02" />
      <Waitlist index="03" />
    </main>
  );
}
