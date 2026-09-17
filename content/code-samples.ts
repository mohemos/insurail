/**
 * Code shown on the site. The API is illustrative: keep payloads small and
 * readable, and keep this file in sync with the public docs when they change.
 */
export type CodeLang = "bash" | "javascript" | "python" | "json" | "http";

export interface CodeSnippet {
  lang: CodeLang;
  code: string;
}

/** Animated request/response in the hero. */
export const heroSample = {
  method: "POST",
  path: "/v1/policies",
  request: {
    lang: "json",
    code: `{
  "product": "delivery_protection",
  "customer": { "phone": "+2348012345678" },
  "basis": {
    "order_value": 44000,
    "currency": "NGN"
  },
  "consent": {
    "channel": "checkout_toggle",
    "accepted": true
  }
}`,
  } satisfies CodeSnippet,
  responseStatus: "201 Created",
  response: {
    lang: "json",
    code: `{
  "id": "pol_7Kq2mXa",
  "status": "active",
  "premium": 150,
  "cover_limit": 44000,
  "underwriter": "licensed_partner"
}`,
  } satisfies CodeSnippet,
};

export type LanguageId = "curl" | "javascript" | "python";

export interface LanguageTab {
  id: LanguageId;
  label: string;
}

export const languages: LanguageTab[] = [
  { id: "curl", label: "cURL" },
  { id: "javascript", label: "JavaScript" },
  { id: "python", label: "Python" },
];

export interface IntegrationStep {
  id: string;
  label: string;
  summary: string;
  /** Label shown above the second panel (a response or an event payload). */
  resultLabel: "response" | "event";
  code: Record<LanguageId, CodeSnippet>;
  result: CodeSnippet;
}

export const integrationSteps: IntegrationStep[] = [
  {
    id: "quote",
    label: "Quote",
    summary: "Price cover for a specific transaction.",
    resultLabel: "response",
    code: {
      curl: {
        lang: "bash",
        code: `# 1. Get a quote for a single delivery
curl https://api.insurail.io/v1/quotes \\
  -H "Authorization: Bearer sk_test_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "product": "delivery_protection",
    "currency": "NGN",
    "basis": { "order_value": 44000 },
    "customer": { "reference": "cus_8f21" }
  }'`,
      },
      javascript: {
        lang: "javascript",
        code: `import Insurail from "@insurail/sdk";

const insurail = new Insurail(process.env.INSURAIL_KEY);

// 1. Get a quote for a single delivery
const quote = await insurail.quotes.create({
  product: "delivery_protection",
  currency: "NGN",
  basis: { orderValue: 44000 },
  customer: { reference: "cus_8f21" },
});`,
      },
      python: {
        lang: "python",
        code: `import os
import insurail

client = insurail.Client(os.environ["INSURAIL_KEY"])

# 1. Get a quote for a single delivery
quote = client.quotes.create(
    product="delivery_protection",
    currency="NGN",
    basis={"order_value": 44000},
    customer={"reference": "cus_8f21"},
)`,
      },
    },
    result: {
      lang: "json",
      code: `{
  "id": "qt_3Hb9",
  "premium": 150,
  "currency": "NGN",
  "cover_limit": 44000,
  "expires_at": "2026-09-17T11:12:00Z"
}`,
    },
  },
  {
    id: "policy",
    label: "Create policy",
    summary: "Turn the quote into a policy the moment the customer opts in.",
    resultLabel: "response",
    code: {
      curl: {
        lang: "bash",
        code: `# 2. Create the policy from the quote (safe to retry)
curl https://api.insurail.io/v1/policies \\
  -H "Authorization: Bearer sk_test_xxx" \\
  -H "Idempotency-Key: order_48213" \\
  -H "Content-Type: application/json" \\
  -d '{
    "quote": "qt_3Hb9",
    "customer": {
      "name": "Ada Okafor",
      "phone": "+2348012345678"
    },
    "consent": {
      "channel": "checkout_toggle",
      "disclosure_version": "2026-01"
    }
  }'`,
      },
      javascript: {
        lang: "javascript",
        code: `// 2. Create the policy from the quote (safe to retry)
const policy = await insurail.policies.create(
  {
    quote: quote.id,
    customer: { name: "Ada Okafor", phone: "+2348012345678" },
    consent: {
      channel: "checkout_toggle",
      disclosureVersion: "2026-01",
    },
  },
  { idempotencyKey: "order_48213" },
);`,
      },
      python: {
        lang: "python",
        code: `# 2. Create the policy from the quote (safe to retry)
policy = client.policies.create(
    quote=quote.id,
    customer={"name": "Ada Okafor", "phone": "+2348012345678"},
    consent={
        "channel": "checkout_toggle",
        "disclosure_version": "2026-01",
    },
    idempotency_key="order_48213",
)`,
      },
    },
    result: {
      lang: "json",
      code: `{
  "id": "pol_7Kq2mXa",
  "status": "awaiting_consent",
  "premium": 150,
  "disclosure_url": "https://pay.insurail.io/d/7Kq2mXa"
}`,
    },
  },
  {
    id: "consent",
    label: "Confirm consent",
    summary: "Record explicit consent by OTP, checkbox or agent PIN.",
    resultLabel: "response",
    code: {
      curl: {
        lang: "bash",
        code: `# 3. Confirm consent (OTP, checkbox or agent PIN)
curl https://api.insurail.io/v1/policies/pol_7Kq2mXa/consent \\
  -H "Authorization: Bearer sk_test_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{ "method": "otp", "code": "482913" }'`,
      },
      javascript: {
        lang: "javascript",
        code: `// 3. Confirm consent (OTP, checkbox or agent PIN)
const active = await insurail.policies.confirmConsent(policy.id, {
  method: "otp",
  code: "482913",
});

console.log(active.status); // "active"`,
      },
      python: {
        lang: "python",
        code: `# 3. Confirm consent (OTP, checkbox or agent PIN)
active = client.policies.confirm_consent(
    policy.id,
    method="otp",
    code="482913",
)

print(active.status)  # "active"`,
      },
    },
    result: {
      lang: "json",
      code: `{
  "id": "pol_7Kq2mXa",
  "status": "active",
  "starts_at": "2026-09-17T10:42:00Z",
  "certificate_url": "https://pay.insurail.io/c/7Kq2mXa"
}`,
    },
  },
  {
    id: "webhook",
    label: "Claim webhook",
    summary: "Get notified when a claim is opened, approved or paid.",
    resultLabel: "event",
    code: {
      curl: {
        lang: "http",
        code: `# 4. What Insurail sends to your endpoint on a claim event
POST /webhooks/insurail HTTP/1.1
Host: yourapp.example
Insurail-Signature: t=1758105720,v1=5f1c9d...
Content-Type: application/json

# Verify the signature, then respond 200 within 5 seconds.`,
      },
      javascript: {
        lang: "javascript",
        code: `// 4. Receive claim events (Express)
const rawBody = express.raw({ type: "*/*" });

app.post("/webhooks/insurail", rawBody, (req, res) => {
  const event = insurail.webhooks.verify(
    req.body,
    req.headers["insurail-signature"],
  );

  if (event.type === "claim.approved") {
    notifyCustomer(event.data.policy, event.data.amount);
  }

  res.sendStatus(200);
});`,
      },
      python: {
        lang: "python",
        code: `# 4. Receive claim events (Flask)
@app.post("/webhooks/insurail")
def insurail_webhook():
    event = client.webhooks.verify(
        request.data,
        request.headers["Insurail-Signature"],
    )

    if event.type == "claim.approved":
        notify_customer(
            event.data["policy"],
            event.data["amount"],
        )

    return "", 200`,
      },
    },
    result: {
      lang: "json",
      code: `{
  "id": "evt_9Lm4",
  "type": "claim.approved",
  "data": {
    "claim": "clm_2Xa8",
    "policy": "pol_7Kq2mXa",
    "amount": 44000,
    "currency": "NGN"
  }
}`,
    },
  },
];
