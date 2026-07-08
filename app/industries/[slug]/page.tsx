import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import PageHero from "@/components/ui/PageHero";
import ChallengesSolutions from "@/components/sections/ChallengesSolutions";
import { INDUSTRIES } from "@/lib/data";

const Workflow = dynamic(() => import("@/components/sections/Workflow"));
const Modules = dynamic(() => import("@/components/sections/Modules"));
const Dashboard = dynamic(() => import("@/components/sections/Dashboard"));
const WhoUsesNizam = dynamic(() => import("@/components/sections/WhoUsesNizam"));
const CTABand = dynamic(() => import("@/components/ui/CTABand"));

export function generateStaticParams() {
  return INDUSTRIES.map((ind) => ({ slug: ind.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = INDUSTRIES.find((ind) => ind.id === slug);
  if (!industry) return {};
  return {
    title: industry.name,
    description: `${industry.description} ${industry.benefit}`,
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = INDUSTRIES.find((ind) => ind.id === slug);
  if (!industry) notFound();

  return (
    <main>
      <PageHero
        eyebrow="Industries"
        meta={industry.essence}
        backdropImage={industry.image}
        title={industry.headline}
        description={industry.description}
      >
        <div className="mt-8 max-w-xl md:mt-12">
          <p className="text-sm leading-relaxed text-fog/70">{industry.useCase}</p>
        </div>
      </PageHero>

      <ChallengesSolutions industry={industry} />
      <Workflow index="03" industryName={industry.name} />
      <Modules industry={industry} />
      <Dashboard index="05" industry={industry} />
      <WhoUsesNizam index="06" />
      <CTABand
        title={
          <>
            See NizamOps for
            <br />
            <em className="serif-i text-fog">{industry.name}.</em>
          </>
        }
        subtitle={`Book a demo scoped to ${industry.name.toLowerCase()}, or join the waitlist for founding access.`}
      />
    </main>
  );
}
