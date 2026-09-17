import Script from "next/script";
import { analytics } from "@/lib/analytics";

/**
 * Loads Plausible when configured. Renders nothing otherwise, so a bare
 * deployment ships zero third-party script.
 */
export function Analytics() {
  if (!analytics.plausible) return null;

  return (
    <>
      <Script id="plausible-queue" strategy="afterInteractive">
        {`window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}`}
      </Script>
      <Script
        src={`${analytics.plausible.host}/js/script.js`}
        data-domain={analytics.plausible.domain}
        strategy="afterInteractive"
      />
    </>
  );
}
