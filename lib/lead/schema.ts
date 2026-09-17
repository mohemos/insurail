/**
 * Lead form model + validation, shared by the client forms and /api/lead.
 * Option *values* live here; their human labels live in content/site.ts.
 */
export const BUSINESS_TYPES = [
  "fintech",
  "agency-banking",
  "ecommerce",
  "logistics",
  "education",
  "membership",
  "other",
] as const;
export type BusinessType = (typeof BUSINESS_TYPES)[number];

export const VOLUME_RANGES = ["under-10k", "10k-100k", "100k-1m", "over-1m", "not-sure"] as const;
export type VolumeRange = (typeof VOLUME_RANGES)[number];

export type LeadType = "audit" | "developer";

export interface AuditLead {
  type: "audit";
  name: string;
  email: string;
  company: string;
  role: string;
  businessType: BusinessType;
  volume: VolumeRange;
  goal?: string;
}

export interface DeveloperLead {
  type: "developer";
  name: string;
  email: string;
  company: string;
  useCase: string;
}

export type Lead = AuditLead | DeveloperLead;

export type LeadErrors = Partial<Record<string, string>>;

export type ValidationResult = { ok: true; lead: Lead } | { ok: false; errors: LeadErrors };

/** Name of the honeypot field. Humans never see it; bots tend to fill it. */
export const HONEYPOT_FIELD = "website";

export const LIMITS = { short: 120, long: 2000 } as const;

export const messages = {
  required: "This field is required.",
  email: "Enter a valid email address.",
  tooLong: (max: number) => `Keep this under ${max} characters.`,
  choose: "Choose an option.",
  type: "Unknown form type.",
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function requiredText(value: unknown, max: number, errors: LeadErrors, key: string): string {
  const text = str(value);
  if (!text) errors[key] = messages.required;
  else if (text.length > max) errors[key] = messages.tooLong(max);
  return text;
}

function optionalText(value: unknown, max: number, errors: LeadErrors, key: string): string | undefined {
  const text = str(value);
  if (!text) return undefined;
  if (text.length > max) errors[key] = messages.tooLong(max);
  return text;
}

function email(value: unknown, errors: LeadErrors, key: string): string {
  const text = str(value).toLowerCase();
  if (!text) errors[key] = messages.required;
  else if (text.length > LIMITS.short || !EMAIL_RE.test(text)) errors[key] = messages.email;
  return text;
}

function oneOf<T extends string>(value: unknown, options: readonly T[], errors: LeadErrors, key: string): T {
  const text = str(value) as T;
  if (!options.includes(text)) errors[key] = messages.choose;
  return text;
}

/** Validate an unknown payload (form state or JSON body) into a typed Lead. */
export function validateLead(input: unknown): ValidationResult {
  const data = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const errors: LeadErrors = {};
  const type = str(data.type);

  if (type === "audit") {
    const lead: AuditLead = {
      type,
      name: requiredText(data.name, LIMITS.short, errors, "name"),
      email: email(data.email, errors, "email"),
      company: requiredText(data.company, LIMITS.short, errors, "company"),
      role: requiredText(data.role, LIMITS.short, errors, "role"),
      businessType: oneOf(data.businessType, BUSINESS_TYPES, errors, "businessType"),
      volume: oneOf(data.volume, VOLUME_RANGES, errors, "volume"),
      goal: optionalText(data.goal, LIMITS.long, errors, "goal"),
    };
    return Object.keys(errors).length ? { ok: false, errors } : { ok: true, lead };
  }

  if (type === "developer") {
    const lead: DeveloperLead = {
      type,
      name: requiredText(data.name, LIMITS.short, errors, "name"),
      email: email(data.email, errors, "email"),
      company: requiredText(data.company, LIMITS.short, errors, "company"),
      useCase: requiredText(data.useCase, LIMITS.long, errors, "useCase"),
    };
    return Object.keys(errors).length ? { ok: false, errors } : { ok: true, lead };
  }

  return { ok: false, errors: { type: messages.type } };
}

/** True when the honeypot was filled in, which only automated submissions do. */
export function isHoneypotTripped(input: unknown): boolean {
  if (!input || typeof input !== "object") return false;
  const value = (input as Record<string, unknown>)[HONEYPOT_FIELD];
  return typeof value === "string" && value.trim().length > 0;
}
