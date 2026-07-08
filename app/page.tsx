import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import ImageMarquee from "@/components/sections/ImageMarquee";
import About from "@/components/sections/About";
import Problems from "@/components/sections/Problems";

// below-the-fold sections load after the first paint
const Explorer = dynamic(() => import("@/components/sections/Explorer"));
const Modules = dynamic(() => import("@/components/sections/Modules"));
const Dashboard = dynamic(() => import("@/components/sections/Dashboard"));
const AISection = dynamic(() => import("@/components/sections/AISection"));
const CTABand = dynamic(() => import("@/components/ui/CTABand"));

export default function Home() {
  return (
    <main>
      <Hero />
      <ImageMarquee />
      <About />
      <Problems />
      <Explorer />
      <Modules />
      <Dashboard />
      <AISection />
      <CTABand />
    </main>
  );
}
