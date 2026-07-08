import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the NizamOps team: general enquiries, partnerships and press. We answer within one business day.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactSection />
    </main>
  );
}
