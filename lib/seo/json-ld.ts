/**
 * JSON-LD builders. Rendered once on the home page via components/seo/JsonLd.tsx.
 */
import { faq, site } from "@/content/site";

type JsonLd = Record<string, unknown>;

const orgId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;

export function organizationJsonLd(): JsonLd {
  return {
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    url: site.url,
    logo: `${site.url}/icons/icon-512.png`,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: site.country,
    },
    sameAs: [site.social.linkedin.href, site.social.x.href],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.email,
        availableLanguage: ["en"],
      },
    ],
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    name: site.name,
    url: site.url,
    inLanguage: "en",
    publisher: { "@id": orgId },
  };
}

export function serviceJsonLd(): JsonLd {
  return {
    "@type": "Service",
    "@id": `${site.url}/#service`,
    name: "Insurail embedded microinsurance API",
    serviceType: "Embedded microinsurance API",
    description: site.description,
    url: site.url,
    provider: { "@id": orgId },
    areaServed: { "@type": "Country", name: "Nigeria" },
    audience: {
      "@type": "BusinessAudience",
      audienceType:
        "Fintechs, payment providers, agency-banking networks, e-commerce platforms, logistics companies, schools and membership organisations",
    },
  };
}

export function faqJsonLd(): JsonLd {
  return {
    "@type": "FAQPage",
    "@id": `${site.url}/#faq`,
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Everything the home page publishes, as one @graph. */
export function homeJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationJsonLd(), websiteJsonLd(), serviceJsonLd(), faqJsonLd()],
  };
}

/** Serialise for a <script type="application/ld+json">, escaping "<" so it can't close the tag. */
export function serializeJsonLd(data: JsonLd): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
