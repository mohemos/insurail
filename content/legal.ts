/**
 * Placeholder legal copy for /privacy and /terms.
 * Review with counsel before launch; these pages describe what the site does
 * today (a contact form and optional cookie-free analytics) and nothing more.
 */
export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface LegalPage {
  slug: string;
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export const privacyPolicy: LegalPage = {
  slug: "privacy",
  title: "Privacy Policy",
  description: "How Insurail collects, uses and protects the information you share through insurail.io.",
  updated: "17 September 2026",
  intro:
    "This policy explains what information insurail.io collects, why, and how it is handled. It covers this website only. Insurance products distributed through the Insurail API have their own disclosures, shown to customers at the point of enrolment.",
  sections: [
    {
      heading: "What we collect",
      paragraphs: [
        "When you submit a form on this site we collect the details you enter: your name, work email, company, role, and anything you write in the free-text fields. We use them only to respond to your request.",
        "If analytics are enabled on this site, we use a cookie-free analytics service that records aggregate page views and events (such as a button click). It does not use cookies, does not store personal data, and does not track you across other sites.",
      ],
    },
    {
      heading: "How we use it",
      paragraphs: [
        "Form submissions are forwarded to our team so we can reply, schedule a call, or grant developer access. We do not sell your data and we do not add you to marketing lists without asking.",
      ],
    },
    {
      heading: "Where it goes",
      paragraphs: [
        "Submissions are delivered to the tools we use to manage enquiries (for example an email inbox or a CRM). These providers process data on our behalf under their own security commitments.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        "Insurail is aligned with the Nigeria Data Protection Act (NDPA). You can ask us to show, correct or delete the information you have shared by emailing hello@insurail.io.",
      ],
    },
    {
      heading: "Changes",
      paragraphs: [
        "We will update this page when our practices change and note the date at the top.",
      ],
    },
  ],
};

export const termsOfUse: LegalPage = {
  slug: "terms",
  title: "Terms of Use",
  description: "The terms that apply to your use of the insurail.io website.",
  updated: "17 September 2026",
  intro:
    "These terms apply to your use of insurail.io. Using the Insurail API or any insurance programme is governed by separate agreements.",
  sections: [
    {
      heading: "Information on this site",
      paragraphs: [
        "The content on this site is for general information about Insurail's services. It is not insurance advice and it is not an offer of insurance. Cover distributed through Insurail is underwritten by licensed insurers and is subject to the terms disclosed at enrolment.",
      ],
    },
    {
      heading: "Illustrations and code samples",
      paragraphs: [
        "Product screens, prices and API responses shown on this site are illustrative. Actual products, pricing and API behaviour are defined in the documentation and the agreement for each programme.",
      ],
    },
    {
      heading: "Acceptable use",
      paragraphs: [
        "Do not use this site to send spam, probe for vulnerabilities, or submit false information. We may block traffic that abuses the forms or the API endpoints behind them.",
      ],
    },
    {
      heading: "Liability",
      paragraphs: [
        "The site is provided as is. To the extent permitted by law, Insurail is not liable for loss arising from reliance on the information published here.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: ["Questions about these terms: hello@insurail.io."],
    },
  ],
};
