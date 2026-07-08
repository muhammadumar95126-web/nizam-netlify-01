import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import ImageMarquee from "@/components/sections/ImageMarquee";
import About from "@/components/sections/About";
import Problems from "@/components/sections/Problems";
import { IndustryProvider } from "@/lib/industry-context";

// below-the-fold sections load after the first paint
const WhyNizam = dynamic(() => import("@/components/sections/WhyNizam"));
const Explorer = dynamic(() => import("@/components/sections/Explorer"));
const Workflow = dynamic(() => import("@/components/sections/Workflow"));
const WhoUsesNizam = dynamic(() => import("@/components/sections/WhoUsesNizam"));
const Modules = dynamic(() => import("@/components/sections/Modules"));
const Dashboard = dynamic(() => import("@/components/sections/Dashboard"));
const DashboardPreview = dynamic(() => import("@/components/sections/DashboardPreview"));
const MobileShowcase = dynamic(() => import("@/components/sections/MobileShowcase"));
const TrustSecurity = dynamic(() => import("@/components/sections/TrustSecurity"));
const ModuleCarousel = dynamic(() => import("@/components/sections/ModuleCarousel"));
const Architecture = dynamic(() => import("@/components/sections/Architecture"));
const PWASection = dynamic(() => import("@/components/sections/PWASection"));
const InstallAnywhere = dynamic(() => import("@/components/sections/InstallAnywhere"));
const VideoBand = dynamic(() => import("@/components/VideoBand"));
const AISection = dynamic(() => import("@/components/sections/AISection"));
const CTABand = dynamic(() => import("@/components/ui/CTABand"));

export default function Home() {
  return (
    <main>
      <Hero />
      <ImageMarquee />
      <About />
      <WhyNizam index="05" />
      <Problems />
      {/* Explorer → Modules → Workflow → Dashboard share one live industry selection */}
      <IndustryProvider>
        <Explorer />
        <Workflow index="06" />
        <WhoUsesNizam index="07" />
        <Modules />
        <Dashboard index="08" />
      </IndustryProvider>
      <DashboardPreview index="09" />
      <MobileShowcase index="10" />
      <TrustSecurity index="11" />
      <ModuleCarousel index="12" />
      <Architecture index="13" />
      <PWASection index="14" />
      <InstallAnywhere index="15" />
      <VideoBand />
      <AISection index="16" />
      <CTABand />
    </main>
  );
}
