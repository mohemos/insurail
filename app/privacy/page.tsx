import type { Metadata } from "next";
import { privacyPolicy } from "@/content/legal";
import { socialMetadata } from "@/lib/seo/metadata";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description: privacyPolicy.description,
  ...socialMetadata({ path: "/privacy", title: privacyPolicy.title, description: privacyPolicy.description }),
};

export default function PrivacyPage() {
  return <LegalPage page={privacyPolicy} />;
}
