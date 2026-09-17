import Script from "next/script";
import { analytics } from "@/lib/analytics";

/**
 * Loads the enabled analytics providers. Renders nothing when none are
 * configured, so a bare deployment ships zero third-party script.
 */
export function Analytics() {
  if (!analytics.enabled) return null;

  return (
    <>
      {analytics.plausible ? (
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
      ) : null}
      {analytics.vercel ? (
        <>
          <Script id="vercel-analytics-queue" strategy="afterInteractive">
            {`window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)}`}
          </Script>
          <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
        </>
      ) : null}
    </>
  );
}
