import type { Metadata } from "next";
import dynamic from "next/dynamic";
import PageHero from "@/components/ui/PageHero";
import About from "@/components/sections/About";
import AboutStory from "@/components/sections/AboutStory";

const CTABand = dynamic(() => import("@/components/ui/CTABand"));

export const metadata: Metadata = {
  title: "About",
  description:
    "Nizam (نظام), Arabic for order, system, arrangement. Why we exist: one powerful platform that brings order to the operations that run the physical world.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About"
        meta="نظام · Order"
        title={
          <>
            We chose a name
            <br />
            that is <em className="serif-i text-fog">a promise.</em>
          </>
        }
        description="Nizam means order: the kind that lets a hospital never miss a critical repair, a city answer every citizen, a factory never stop unplanned. This is the company we are building."
      />
      <About />
      <AboutStory />
      <CTABand
        title={
          <>
            Build the orderly
            <br />
            <em className="serif-i text-fog">world with us.</em>
          </>
        }
        subtitle="Partner with us as a founding customer, or write to us. We answer within one business day."
      />
    </main>
  );
}
