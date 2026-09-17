import { NextResponse } from "next/server";
import { isProduction } from "@/lib/env";
import { configuredTransports, deliverLead, formatLeadText, type LeadMeta } from "@/lib/lead/deliver";
import { isHoneypotTripped, validateLead } from "@/lib/lead/schema";

/**
 * POST /api/lead
 * Accepts JSON from the two lead forms, validates it with the same rules as the
 * client, then forwards it to whichever transports are configured in the
 * environment (webhook, Resend). See .env.example and README.md.
 */

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16_000;

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return json({ ok: false, error: "unsupported_media_type" }, 415);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, error: "payload_too_large" }, 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  // Bots fill the hidden field. Pretend it worked so they don't adapt.
  if (isHoneypotTripped(body)) {
    return json({ ok: true });
  }

  const result = validateLead(body);
  if (!result.ok) {
    return json({ ok: false, error: "validation_failed", errors: result.errors }, 400);
  }

  const meta: LeadMeta = {
    receivedAt: new Date().toISOString(),
    ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined,
    userAgent: request.headers.get("user-agent") ?? undefined,
    referer: request.headers.get("referer") ?? undefined,
  };

  const transports = configuredTransports();
  if (transports.length === 0) {
    if (!isProduction) {
      console.info(`[lead] No transport configured; logging instead.\n${formatLeadText(result.lead, meta)}`);
      return json({ ok: true, delivered: [] });
    }
    console.error("[lead] No lead transport configured. Set LEAD_WEBHOOK_URL or RESEND_API_KEY.");
    return json({ ok: false, error: "not_configured" }, 503);
  }

  try {
    const delivered = await deliverLead(result.lead, meta, transports);
    return json({ ok: true, delivered });
  } catch (error) {
    console.error("[lead] Delivery failed:", error);
    return json({ ok: false, error: "delivery_failed" }, 502);
  }
}
