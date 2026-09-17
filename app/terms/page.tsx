import type { Metadata } from "next";
import { termsOfUse } from "@/content/legal";
import { socialMetadata } from "@/lib/seo/metadata";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: termsOfUse.title,
  description: termsOfUse.description,
  ...socialMetadata({ path: "/terms", title: termsOfUse.title, description: termsOfUse.description }),
};

export default function TermsPage() {
  return <LegalPage page={termsOfUse} />;
}
