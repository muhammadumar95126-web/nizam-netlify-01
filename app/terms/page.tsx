import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing use of the NizamOps website and waitlist ahead of platform launch.",
};

const SECTIONS = [
  {
    title: "Pre-launch status",
    body: "NizamOps is under active development and has not yet launched as a commercial product. This website exists to share the platform's direction and to collect interest from prospective organizations. No production service is currently being provided.",
  },
  {
    title: "Website use",
    body: "You may browse this site and submit information through the waitlist, demo request or contact forms for legitimate business purposes. You agree not to misuse the site, attempt to disrupt it, or submit false information.",
  },
  {
    title: "Waitlist & founding pricing",
    body: "Joining the waitlist does not create a binding contract. Founding pricing and early-access terms referenced on this site will be confirmed in a separate agreement at the time of onboarding.",
  },
  {
    title: "Intellectual property",
    body: "All NizamOps branding, copy, design and code on this site belong to NizamOps and may not be reproduced without permission.",
  },
  {
    title: "Changes to these terms",
    body: "As the platform moves toward general availability, these terms will be replaced with a full commercial agreement covering subscriptions, data handling and support. Updates will be reflected here.",
  },
  {
    title: "Contact",
    body: "Questions about these terms can be sent to hello@nizam.io.",
  },
];

export default function TermsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Terms"
        title={
          <>
            The terms behind
            <br />
            <em className="serif-i text-fog">this website.</em>
          </>
        }
        description="NizamOps is pre-launch. These terms cover the website and waitlist today, and will be superseded by a full agreement at general availability."
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
