import { serializeJsonLd } from "@/lib/seo/json-ld";

/** Emits a JSON-LD <script>. Plain <script> on purpose: it is data, not executable code. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
