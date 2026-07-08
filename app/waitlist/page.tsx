import type { Metadata } from "next";
import Waitlist from "@/components/sections/Waitlist";
import WaitlistPerks from "@/components/sections/WaitlistPerks";

export const metadata: Metadata = {
  title: "Join the Waitlist",
  description:
    "Founding members get private-beta access, priority onboarding and pricing that never expires. One email, no noise, only milestones.",
};

export default function WaitlistPage() {
  return (
    <main className="pt-10 md:pt-14">
      <Waitlist />
      <WaitlistPerks />
    </main>
  );
}
