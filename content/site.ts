/**
 * All site copy lives here. Edit text in this file; components only render it.
 *
 * Conventions
 * - Section `id`s are the anchor targets used by the navigation.
 * - `icon` values must be one of the names in ./icons.ts.
 * - Keep numbers out of the copy unless they are real and approved.
 */
import type { IconName } from "./icons";
import { publicEnv } from "@/lib/env";
import type { BusinessType, VolumeRange } from "@/lib/lead/schema";

export interface LinkItem {
  label: string;
  href: string;
  external?: boolean;
}

export const site = {
  name: "Insurail",
  domain: "insurail.io",
  url: publicEnv.siteUrl,
  docsUrl: publicEnv.docsUrl,
  email: "hello@insurail.io",
  location: "Lagos, Nigeria",
  country: "NG",
  /** <title> — keep under 60 characters. */
  title: "Insurail — Embedded microinsurance API for Africa",
  /** Meta description — keep under 155 characters. */
  description:
    "Insurail is an embedded microinsurance API. Add bespoke, compliant micro-cover to checkout, payments and agent flows across Nigeria and Africa.",
  tagline: "Embedded microinsurance API for Africa",
  keywords: [
    "embedded insurance API",
    "microinsurance API",
    "insurance API Nigeria",
    "embed insurance at checkout",
    "insurtech Africa",
    "insurance API for fintechs",
    "microinsurance API Africa",
    "insurtech Nigeria",
  ],
  ogImageAlt: "Insurail: embedded microinsurance API for Africa, starting in Nigeria",
  social: {
    linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/company/insurail" },
    x: { label: "X (Twitter)", href: "https://x.com/insurail" },
  },
  partnerMailto:
    "mailto:hello@insurail.io?subject=Partnering%20with%20Insurail",
} as const;

export const nav = {
  homeLabel: "Insurail home",
  links: [
    { label: "How it works", href: "/#how-it-works" },
    { label: "Use cases", href: "/#use-cases" },
    { label: "Pricing models", href: "/#pricing-models" },
    { label: "Developers", href: "/#developers" },
    { label: "Compliance", href: "/#compliance" },
    { label: "FAQ", href: "/#faq" },
  ] satisfies LinkItem[],
  cta: { label: "Request a risk audit", href: "/#request-audit" },
  openMenu: "Open menu",
  closeMenu: "Close menu",
  menuTitle: "Menu",
  skipToContent: "Skip to content",
};

export const hero = {
  eyebrow: "Embedded microinsurance API · Built for Africa, starting in Nigeria",
  title: "Embed insurance into what you already sell.",
  subtitle:
    "Insurail is an embedded microinsurance API. Fintechs, marketplaces, agent networks and platforms use it to add bespoke micro-cover to the transactions their customers already make: at checkout, at payment, in the agent flow. One API. Compliant by design. No new product to sell.",
  primaryCta: { label: "Request a risk audit", href: "/#request-audit" },
  secondaryCta: { label: "Get API early access", href: "/#early-access" },
  /** Copy for the illustrative checkout on the left of the hero visual. */
  checkout: {
    ariaLabel: "Illustration of a checkout with an optional delivery cover toggle",
    title: "Checkout",
    orderRef: "Order #48213",
    items: [
      { label: "Wireless earbuds", amount: 42500 },
      { label: "Delivery to Lekki, Lagos", amount: 1500 },
    ],
    cover: {
      premium: 150,
      labelPrefix: "Add",
      labelSuffix: "delivery cover",
      description: "Covers loss, damage and non-delivery. Underwritten by a licensed insurer.",
      lineItem: "Delivery cover",
      switchLabel: "Add delivery cover to this order",
    },
    totalLabel: "Total",
    payLabel: "Pay",
    disclosure: "Cover summary and terms are shown before payment.",
  },
  /** Labels around the animated API call on the right of the hero visual. */
  apiCall: {
    ariaLabel: "Example API request that creates a policy, and its response",
    requestLabel: "Request",
    responseLabel: "Response",
    connector: "One toggle. One API call.",
  },
};

export const designedFor = {
  label: "Designed for",
  categories: [
    { label: "Payment gateways", icon: "credit-card" },
    { label: "Agency banking", icon: "store" },
    { label: "E-commerce", icon: "shopping-cart" },
    { label: "Logistics", icon: "truck" },
    { label: "Schools & memberships", icon: "graduation-cap" },
    { label: "Subscriptions", icon: "repeat" },
  ] satisfies { label: string; icon: IconName }[],
};

export const problem = {
  id: "problem",
  eyebrow: "The problem",
  title: "Insurance doesn't sell when it's pitched. It sells when it's embedded.",
  intro:
    "In our markets, insurance that is solicited gets ignored. Insurance that arrives as a benefit, at the moment it matters, gets a yes.",
  points: [
    {
      title: "The offer never comes",
      body: "Most Africans are uninsured. Not because they don't need cover, but because nobody has offered it at the moment it makes sense.",
    },
    {
      title: "Your customers carry the risk alone",
      body: "Every transaction they make carries risk they absorb themselves: a failed delivery, a stolen device, a hospital bill, an income shock.",
    },
    {
      title: "The gap is yours to close",
      body: "That gap is a trust problem for you. It is also an opportunity to build loyalty, retention and a new margin line, without changing what you sell.",
    },
  ],
};

export const howItWorks = {
  id: "how-it-works",
  eyebrow: "How it works",
  title: "From risk audit to live cover, in four steps.",
  lead: "We don't hand you a product catalogue. We start with your business, then build the cover around it.",
  steps: [
    {
      title: "Risk audit",
      icon: "scan-search",
      body: "We map your customer journey and find the exact transaction moments where risk lives. Then we quantify what doing nothing costs you and your customers.",
    },
    {
      title: "Bespoke cover design",
      icon: "pen-tool",
      body: "We design cover around your business model and your customers' needs, then choose the premium model that protects your margins and your pricing.",
    },
    {
      title: "Integrate",
      icon: "plug",
      body: "Drop cover into your flow with our API, SDKs or no-code embed. Enrolment is digital, disclosed and consent-based.",
    },
    {
      title: "Go live and grow",
      icon: "rocket",
      body: "We handle underwriting partners, claims routing, regulatory reporting and ongoing optimisation. You get a new value line and better retention.",
    },
  ] satisfies { title: string; icon: IconName; body: string }[],
};

export const useCases = {
  id: "use-cases",
  eyebrow: "Use cases",
  title: "Cover that fits the moment.",
  lead: "Every business has transaction moments where risk sits. We find yours and embed cover there, in the channel your customers already use.",
  momentLabel: "Customer moment",
  items: [
    {
      title: "Payments & fintech apps",
      icon: "smartphone",
      body: "Micro life or hospital-cash cover funded by a small slice of a transaction or airtime top-up. Enrol in-app or over USSD.",
      moment: "Wallet top-up · Airtime recharge · Bill payment",
    },
    {
      title: "Agency banking & POS networks",
      icon: "store",
      body: "One-tap personal accident or hospital-cash cover offered by the agent at the point of transaction. Agents earn a commission.",
      moment: "Cash-out · Transfer · Deposit",
    },
    {
      title: "E-commerce & marketplaces",
      icon: "shopping-cart",
      body: "Delivery, damage and non-delivery protection at checkout.",
      moment: "Checkout · Order confirmation",
    },
    {
      title: "Logistics & mobility",
      icon: "truck",
      body: "Cargo, parcel and rider cover attached to each job.",
      moment: "Job accepted · Pickup · Dispatch",
    },
    {
      title: "Schools & memberships",
      icon: "graduation-cap",
      body: "Term life or hospital cover included in fees.",
      moment: "Fee payment · Membership renewal",
    },
    {
      title: "Device & gadget retail",
      icon: "monitor-smartphone",
      body: "Screen and theft protection sold with the device.",
      moment: "Point of sale · Device activation",
    },
  ] satisfies { title: string; icon: IconName; body: string; moment: string }[],
  surfaces: {
    title: "Same cover, every channel.",
    body: "Enrolment happens where the customer already is: a toggle at checkout, a prompt on the agent's POS, or a USSD menu on a feature phone.",
    pos: {
      caption: "Agent POS prompt",
      body: "The agent sees a one-tap prompt after the transaction. The customer confirms with a PIN.",
    },
    ussd: {
      caption: "USSD enrolment",
      body: "No smartphone needed. Customers enrol, check their policy and start a claim from any phone.",
    },
  },
  posMock: {
    ariaLabel: "Illustration of an agent POS terminal offering hospital cash cover after a cash-out",
    header: "Agent terminal",
    status: "Cash-out successful",
    amount: 20000,
    prompt: "Add hospital cash cover?",
    price: "₦100 / week",
    benefit: "Pays a daily cash amount if the customer is admitted to hospital.",
    yes: "1 · Yes",
    no: "2 · No",
    footer: "Customer confirms with PIN · Agent earns a commission",
  },
  ussdMock: {
    ariaLabel: "Illustration of a USSD menu for enrolling in cover from a feature phone",
    title: "Insurail cover",
    lines: [
      "1. Hospital cash ₦100/wk",
      "2. Accident cover ₦150/mo",
      "3. My policy",
      "4. Make a claim",
      "0. Exit",
    ],
    input: "1",
    send: "Send",
    cancel: "Cancel",
  },
};

export type PremiumSplit = "business" | "customer-optional" | "customer-included" | "blended";

export const premiumModels = {
  id: "pricing-models",
  eyebrow: "Pricing models",
  title: "Four ways to fund the premium. None of them cost you customers.",
  lead: "Cover without hurting your pricing. Each model changes who funds the premium and how it shows up, not whether your customers are protected.",
  whoPaysLabel: "Who funds the premium",
  bestForLabel: "Best for",
  legend: { business: "Business", customer: "Customer" },
  models: [
    {
      name: "Business-absorbed",
      icon: "hand-coins",
      how: "You pay a tiny premium as a cost of doing business. Cover becomes a loyalty and trust feature your competitors don't have.",
      bestFor: "High-margin, retention-focused businesses",
      split: "business",
    },
    {
      name: "Customer-borne, optional",
      icon: "mouse-pointer-click",
      how: "Cover is offered as a low-cost add-on at checkout or payment. The customer chooses, and you earn on every yes.",
      bestFor: "Marketplaces, logistics, e-commerce",
      split: "customer-optional",
    },
    {
      name: "Customer-borne, built-in",
      icon: "layers",
      how: "Cover is baked into the price the customer already pays, so every customer is protected by default.",
      bestFor: "Schools, memberships, closed ecosystems",
      split: "customer-included",
    },
    {
      name: "Price-blended",
      icon: "blend",
      how: "The premium is folded into your existing pricing, so the headline price doesn't rise. Cover comes free.",
      bestFor: "Price-competitive businesses",
      split: "blended",
    },
  ] satisfies { name: string; icon: IconName; how: string; bestFor: string; split: PremiumSplit }[],
  closing: "We model every option against your real numbers so the choice is evidence-based.",
};

export const developers = {
  id: "developers",
  eyebrow: "Developers",
  title: "An API your team can ship in days.",
  lead: "Predictable REST, small payloads, and consent handled inside the flow. Quote, create, confirm, then listen for claim events.",
  features: [
    { label: "REST API with predictable JSON", icon: "braces" },
    { label: "Webhooks for policy and claim events", icon: "webhook" },
    { label: "Sandbox environment", icon: "flask-conical" },
    { label: "SDKs for JavaScript and Python", icon: "package" },
    { label: "No-code embed widget for checkout", icon: "mouse-pointer-click" },
    { label: "Consent and disclosure handled in the flow", icon: "file-check" },
    { label: "Idempotent requests", icon: "repeat" },
  ] satisfies { label: string; icon: IconName }[],
  primaryCta: { label: "Get early API access", href: "/#early-access" },
  secondaryCta: { label: "Read the docs", href: site.docsUrl, external: true } satisfies LinkItem,
  codeLabels: {
    languages: "Language",
    steps: "Integration step",
    copy: "Copy code",
    copied: "Copied",
    response: "Response",
    event: "Event payload",
  },
};

export const compliance = {
  id: "compliance",
  eyebrow: "Compliance & trust",
  title: "Compliant by design.",
  lead: "Digital enrolment, clear disclosure, explicit consent. Built to fit how insurance is regulated in Nigeria, not to work around it.",
  tiles: [
    {
      title: "Digital-only enrolment",
      icon: "clipboard-check",
      body: "Clear disclosure and explicit consent captured in the flow. No physical solicitation, no dark patterns.",
    },
    {
      title: "Aligned with Nigerian insurance regulation (NAICOM)",
      icon: "landmark",
      body: "We work with licensed underwriters and design within the rules for digital and agent-assisted distribution.",
    },
    {
      title: "Data protection (NDPA)",
      icon: "lock",
      body: "We minimise the data we collect, encrypt it, and never sell it. Processing is aligned with the Nigeria Data Protection Act.",
    },
    {
      title: "Licensed underwriting partners",
      icon: "shield-check",
      body: "Cover is underwritten by regulated insurers. Insurail is the distribution and technology layer.",
    },
  ] satisfies { title: string; icon: IconName; body: string }[],
  partners: {
    text: "Built for regulators and insurers too. We share product documentation, consent records and reporting on request.",
    cta: { label: "Partner with us", href: site.partnerMailto },
  },
};

export const whyInsurail = {
  id: "why-insurail",
  eyebrow: "Why Insurail",
  title: "Insurance your customers actually say yes to.",
  points: [
    {
      title: "Consulting-led",
      icon: "compass",
      body: "We start with your business, not a product catalogue. The risk audit comes first. The cover comes after.",
    },
    {
      title: "Bespoke, never off-the-shelf",
      icon: "ruler",
      body: "Cover designed to fit your customers and your flow. That is why it sells.",
    },
    {
      title: "Edge-preserving",
      icon: "trending-up",
      body: "We never ask you to raise prices in a way that costs you customers. Your competitive position is part of the design brief.",
    },
  ] satisfies { title: string; icon: IconName; body: string }[],
};

export const faq = {
  id: "faq",
  eyebrow: "FAQ",
  title: "Questions, answered plainly.",
  items: [
    {
      question: "Do we need an insurance licence?",
      answer:
        "No. Cover is underwritten by licensed insurers, and Insurail operates as the technology and distribution layer. We structure each programme within Nigerian insurance regulation so you don't take on obligations you aren't set up for. We walk through the exact structure during the risk audit.",
    },
    {
      question: "Who underwrites the cover?",
      answer:
        "Regulated insurers licensed by NAICOM. We match an underwriting partner to each programme, and the underwriter is named in the disclosure your customers see.",
    },
    {
      question: "How are claims handled?",
      answer:
        "Digitally, and where possible in the same channel the customer enrolled in. Insurail routes each claim to the underwriter, tracks it, and sends you a webhook at every status change so you can keep your customer informed. Service standards are agreed per programme.",
    },
    {
      question: "What does integration take?",
      answer:
        "Most teams need one API call to create a policy and one webhook to listen for events. Our SDKs and no-code embed shorten it further. You get a sandbox, test data and direct support from our engineers.",
    },
    {
      question: "Can our customers opt out?",
      answer:
        "Yes. Optional cover is always opt-in with explicit consent. Where cover is built into a price or fee, it is disclosed clearly and there is a cancellation path, in line with regulation.",
    },
    {
      question: "Which countries do you support?",
      answer:
        "We launch in Nigeria and are expanding across Africa. If you operate elsewhere, tell us your market and we will be honest about timing.",
    },
    {
      question: "How is pricing set?",
      answer:
        "Premiums are set with the underwriter based on the risk, the cover limits and the expected volume. We model each premium model against your real numbers so you can see the effect on margin and conversion before you decide.",
    },
    {
      question: "How do you handle customer data?",
      answer:
        "We collect the minimum needed to issue and service a policy, encrypt it in transit and at rest, and never sell it. Processing is aligned with the Nigeria Data Protection Act (NDPA), and consent is captured explicitly in the flow.",
    },
  ],
};

export const leadCapture = {
  id: "request-audit",
  /** Anchor that opens the developer form (used by "Get API early access" links). */
  developerAnchor: "early-access",
  eyebrow: "Get started",
  title: "Find out what risk is sitting in your customer journey.",
  lead: "A 45-minute call. We map your flow, find the embed points, and show you the numbers. No obligation.",
  modeLabel: "Choose a form",
  modes: {
    audit: "Request a risk audit",
    developer: "Developer early access",
  },
  audit: {
    fields: {
      name: { label: "Full name", placeholder: "Ada Okafor", autoComplete: "name" },
      email: { label: "Work email", placeholder: "you@company.com", autoComplete: "email" },
      company: { label: "Company", placeholder: "Company name", autoComplete: "organization" },
      role: { label: "Role", placeholder: "Head of Product", autoComplete: "organization-title" },
      businessType: { label: "Business type", placeholder: "Select one" },
      volume: { label: "Approx. monthly transactions or customers", placeholder: "Select a range" },
      goal: {
        label: "What are you hoping to solve?",
        placeholder: "Optional. A sentence or two about your flow and what you want cover to do.",
        optionalLabel: "Optional",
      },
    },
    submit: "Request a risk audit",
    submitting: "Sending…",
  },
  developer: {
    intro: "Early access to the sandbox, SDKs and docs. Tell us what you are building.",
    fields: {
      name: { label: "Name", placeholder: "Ada Okafor", autoComplete: "name" },
      email: { label: "Email", placeholder: "you@company.com", autoComplete: "email" },
      company: { label: "Company", placeholder: "Company or project", autoComplete: "organization" },
      useCase: {
        label: "Use case",
        placeholder: "e.g. Delivery protection at checkout for our marketplace",
      },
    },
    submit: "Request early access",
    submitting: "Sending…",
  },
  businessTypeLabels: {
    fintech: "Fintech / Payments",
    "agency-banking": "Agency banking / POS",
    ecommerce: "E-commerce / Marketplace",
    logistics: "Logistics",
    education: "Education",
    membership: "Membership / Subscription",
    other: "Other",
  } satisfies Record<BusinessType, string>,
  volumeLabels: {
    "under-10k": "Under 10,000",
    "10k-100k": "10,000 – 100,000",
    "100k-1m": "100,000 – 1 million",
    "over-1m": "Over 1 million",
    "not-sure": "Not sure yet",
  } satisfies Record<VolumeRange, string>,
  privacyNote: "We only use your details to respond to this request.",
  success: {
    title: "Thanks, we have it.",
    body: "We will be in touch shortly. If it is urgent, email",
    reset: "Send another request",
  },
  error: {
    title: "We couldn't send that.",
    body: "Please try again in a moment, or email",
    validation: "Please check the highlighted fields.",
  },
};

export const footer = {
  description: "Embedded microinsurance API. Built for Africa, starting in Nigeria.",
  columns: [
    { title: "Product", links: nav.links },
    {
      title: "Company",
      links: [
        { label: "Contact", href: `mailto:${site.email}` },
        { label: "Docs", href: site.docsUrl, external: true },
        { label: "Partner with us", href: site.partnerMailto },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
      ],
    },
  ] satisfies { title: string; links: LinkItem[] }[],
  contactLabel: "Contact",
  copyrightName: "Insurail",
  location: site.location,
  socialLabel: "Follow Insurail",
};

export const analyticsNotice = {
  text: "This site uses cookie-free analytics to understand which pages are useful. No cookies, no personal data.",
  dismiss: "Got it",
  ariaLabel: "Analytics notice",
};

export const notFound = {
  title: "Page not found",
  body: "That page doesn't exist. The whole site lives on one page, so head back home.",
  cta: { label: "Back to home", href: "/" },
};
