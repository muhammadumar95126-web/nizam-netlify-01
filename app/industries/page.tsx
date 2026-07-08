import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Industries from "@/components/sections/Industries";

const Explorer = dynamic(() => import("@/components/sections/Explorer"));
const CTABand = dynamic(() => import("@/components/ui/CTABand"));

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Government, housing, hotels, hospitals, universities, malls, airports, factories, industrial estates, facility management and large enterprises: one platform for all of them.",
};

export default function IndustriesPage() {
  return (
    <main>
      <Industries />
      <Explorer />
      <CTABand
        title={
          <>
            Your industry.
            <br />
            <em className="serif-i text-fog">Your order.</em>
          </>
        }
        subtitle="Book a demo and we will map NIZAM onto your operation: your sites, your teams, your workflows."
      />
    </main>
  );
}
