import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Pricing from "@/components/sections/Pricing";
import GovernmentBand from "@/components/sections/GovernmentBand";

const FAQ = dynamic(() => import("@/components/sections/FAQ"));
const CTABand = dynamic(() => import("@/components/ui/CTABand"));

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Honest pricing for serious software. Starter from $49/month, Professional $149, Business $299, and tailored Enterprise agreements for governments and nationwide organizations.",
};

export default function PricingPage() {
  return (
    <main>
      <Pricing />
      <GovernmentBand />
      <FAQ />
      <CTABand
        title={
          <>
            Lock founding pricing
            <br />
            <em className="serif-i text-fog">for life.</em>
          </>
        }
      />
    </main>
  );
}
