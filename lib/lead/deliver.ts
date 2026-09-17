/**
 * Server-side lead delivery. Each transport is enabled by environment variables
 * (see .env.example). Add a CRM by writing another `Transport`.
 */
import type { Lead } from "./schema";

export interface LeadMeta {
  receivedAt: string;
  ip?: string;
  userAgent?: string;
  referer?: string;
}

export interface Transport {
  name: string;
  send(lead: Lead, meta: LeadMeta): Promise<void>;
}

const REQUEST_TIMEOUT_MS = 8000;

async function postJson(url: string, body: unknown, headers: Record<string, string> = {}): Promise<Response> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", ...headers },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`${url} responded ${response.status}`);
  }
  return response;
}

/** Generic JSON webhook: Formspree, Zapier, Make, n8n, HubSpot, your own API. */
export function webhookTransport(url: string, secret?: string): Transport {
  return {
    name: "webhook",
    async send(lead, meta) {
      const headers: Record<string, string> = {};
      if (secret) headers.Authorization = `Bearer ${secret}`;
      // Formspree and most form backends want a flat object; CRMs usually accept nesting.
      await postJson(url, { ...lead, lead, meta }, headers);
    },
  };
}

/** Resend (https://resend.com): emails each lead to your inbox with reply-to set to the visitor. */
export function resendTransport(apiKey: string, to: string, from: string): Transport {
  return {
    name: "resend",
    async send(lead, meta) {
      const subject =
        lead.type === "audit"
          ? `Risk audit request: ${lead.company}`
          : `Developer early access: ${lead.company}`;
      await postJson(
        "https://api.resend.com/emails",
        { from, to: [to], reply_to: lead.email, subject, text: formatLeadText(lead, meta) },
        { Authorization: `Bearer ${apiKey}` },
      );
    },
  };
}

/** Build the transports that are configured in the environment. */
export function configuredTransports(env: NodeJS.ProcessEnv = process.env): Transport[] {
  const transports: Transport[] = [];
  if (env.LEAD_WEBHOOK_URL) {
    transports.push(webhookTransport(env.LEAD_WEBHOOK_URL, env.LEAD_WEBHOOK_SECRET));
  }
  if (env.RESEND_API_KEY && env.LEAD_NOTIFY_TO) {
    transports.push(
      resendTransport(env.RESEND_API_KEY, env.LEAD_NOTIFY_TO, env.LEAD_NOTIFY_FROM || "Insurail Website <leads@insurail.io>"),
    );
  }
  return transports;
}

/** Deliver to every transport; fails if any transport fails so the visitor sees an honest error. */
export async function deliverLead(lead: Lead, meta: LeadMeta, transports: Transport[]): Promise<string[]> {
  await Promise.all(transports.map((transport) => transport.send(lead, meta)));
  return transports.map((transport) => transport.name);
}

/** Plain-text summary used for email notifications and server logs. */
export function formatLeadText(lead: Lead, meta: LeadMeta): string {
  const lines: string[] = [];
  if (lead.type === "audit") {
    lines.push(
      "New risk audit request",
      "",
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      `Company: ${lead.company}`,
      `Role: ${lead.role}`,
      `Business type: ${lead.businessType}`,
      `Monthly volume: ${lead.volume}`,
      `Goal: ${lead.goal ?? "(not provided)"}`,
    );
  } else {
    lines.push(
      "New developer early-access request",
      "",
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      `Company: ${lead.company}`,
      `Use case: ${lead.useCase}`,
    );
  }
  lines.push("", `Received: ${meta.receivedAt}`);
  if (meta.referer) lines.push(`Referer: ${meta.referer}`);
  if (meta.userAgent) lines.push(`User agent: ${meta.userAgent}`);
  return lines.join("\n");
}
