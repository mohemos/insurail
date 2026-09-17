import { homeJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { DesignedFor } from "@/components/sections/DesignedFor";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { UseCases } from "@/components/sections/UseCases";
import { PremiumModels } from "@/components/sections/PremiumModels";
import { Developers } from "@/components/sections/Developers";
import { Compliance } from "@/components/sections/Compliance";
import { WhyInsurail } from "@/components/sections/WhyInsurail";
import { Faq } from "@/components/sections/Faq";
import { LeadCapture } from "@/components/sections/LeadCapture";

/** The single marketing page. Section order mirrors the brief; copy lives in content/site.ts. */
export default function HomePage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <JsonLd data={homeJsonLd()} />
      <Hero />
      <DesignedFor />
      <Problem />
      <HowItWorks />
      <UseCases />
      <PremiumModels />
      <Developers />
      <Compliance />
      <WhyInsurail />
      <Faq />
      <LeadCapture />
    </main>
  );
}
