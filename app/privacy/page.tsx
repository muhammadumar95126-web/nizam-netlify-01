import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How NizamOps collects, uses and protects information before and after launch.",
};

const SECTIONS = [
  {
    title: "What we collect",
    body: "Today, before general availability, NizamOps collects only what you give us directly: your name, email and organization when you join the waitlist, request a demo or contact us. We do not collect usage data from a live product because the product has not launched.",
  },
  {
    title: "How we use it",
    body: "Waitlist and demo information is used to reach out about early access, onboarding and founding-customer pricing. Contact form submissions are used to respond to your inquiry. We do not sell or rent your information to third parties.",
  },
  {
    title: "Data storage & security",
    body: "Information you submit is stored on secure, access-controlled infrastructure. As NizamOps moves from beta to general availability, this policy will be expanded to cover platform data: role-based access, audit logging, encryption in transit and at rest, and data isolation between organizations.",
  },
  {
    title: "Your choices",
    body: "You can ask us to update or remove any information you've submitted at any time by writing to hello@nizam.io.",
  },
  {
    title: "Changes to this policy",
    body: "As the product evolves toward launch, this policy will be updated to reflect the platform's actual data practices. Material changes will be reflected here with an updated date.",
  },
];

export default function PrivacyPage() {
  return (
    <main>
      <PageHero
        eyebrow="Privacy"
        title={
          <>
            How we handle
            <br />
            <em className="serif-i text-fog">your information.</em>
          </>
        }
        description="NizamOps is pre-launch. This policy reflects the site and waitlist today, and will expand as the platform ships."
      />
      <section className="section hairline-t">
        <div className="mx-auto max-w-[900px] px-5 pb-28 md:px-10 md:pb-40">
          <div className="flex flex-col gap-14">
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h2 className="display text-2xl md:text-3xl">{s.title}</h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-fog">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
