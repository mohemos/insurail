import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/content/site";
import { socialMetadata } from "@/lib/seo/metadata";
import { SkipLink } from "@/components/ui/SkipLink";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/analytics/Analytics";
import { AnalyticsListener } from "@/components/analytics/AnalyticsListener";
import { AnalyticsNotice } from "@/components/analytics/AnalyticsNotice";

/*
 * Self-hosted variable fonts (latin subset only, ~45 KB each), served from this
 * origin and preloaded. Keeping the files in the repo makes builds hermetic and
 * keeps the naira sign (U+20A6, outside the latin subset) from pulling in an
 * extra 85 KB latin-ext file; it renders from the system font instead.
 */
const inter = localFont({
  src: "../assets/fonts/inter-latin-variable.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});

const interTight = localFont({
  src: "../assets/fonts/inter-tight-latin-variable.woff2",
  weight: "100 900",
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  ...socialMetadata({ path: "/" }),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1516" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {/* Scroll-reveal animations start hidden; make sure content shows without JavaScript. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <SkipLink />
        <MotionProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </MotionProvider>
        <Analytics />
        <AnalyticsListener />
        <AnalyticsNotice />
      </body>
    </html>
  );
}
