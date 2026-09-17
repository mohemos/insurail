import type { Metadata } from "next";
import { site } from "@/content/site";

/** Open Graph / Twitter fields shared by every page (pages add their own url/title). */
export function socialMetadata(overrides: { path: string; title?: string; description?: string }): Pick<Metadata, "openGraph" | "twitter" | "alternates"> {
  const title = overrides.title ?? site.title;
  const description = overrides.description ?? site.description;
  return {
    alternates: { canonical: overrides.path },
    openGraph: {
      type: "website",
      url: overrides.path,
      siteName: site.name,
      title,
      description,
      locale: "en_NG",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
