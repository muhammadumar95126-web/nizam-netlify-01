import type { Metadata, Viewport } from "next";
import { Archivo, Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import PageTransition from "@/components/providers/PageTransition";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WaitlistOverlayProvider } from "@/lib/waitlist-context";
import WaitlistOverlay from "@/components/WaitlistOverlay";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nizam.io"),
  title: {
    default: "NizamOps · One Platform. Every Operation.",
    template: "%s · NizamOps",
  },
  description:
    "NizamOps is the enterprise operations platform. Service requests, incidents, maintenance, work orders, assets, field operations, inspections and analytics, unified in one system of record.",
  keywords: [
    "operations platform",
    "facility management software",
    "work order management",
    "asset management",
    "incident management",
    "enterprise SaaS",
    "CAFM",
    "CMMS",
  ],
  openGraph: {
    title: "NizamOps · One Platform. Every Operation.",
    description:
      "One platform for every operation. Service requests, maintenance, assets, field operations and analytics, unified.",
    type: "website",
    locale: "en_US",
    siteName: "NizamOps",
  },
  twitter: {
    card: "summary_large_image",
    title: "NizamOps · One Platform. Every Operation.",
    description:
      "One platform for every operation. Launching soon.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b0b0a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body className="grain">
        <SmoothScroll>
          <PageTransition>
            <WaitlistOverlayProvider>
              <CustomCursor />
              <Navbar />
              {children}
              <Footer />
              <WaitlistOverlay />
            </WaitlistOverlayProvider>
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
