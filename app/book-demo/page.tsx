import type { Metadata } from "next";
import Demo from "@/components/sections/Demo";

export const metadata: Metadata = {
  title: "Book a Demo",
  description:
    "Thirty minutes. Your workflows, mapped live onto NizamOps by someone who has run operations, not a slide deck.",
};

export default function BookDemoPage() {
  return (
    <main className="pt-10 md:pt-14">
      <Demo />
    </main>
  );
}
