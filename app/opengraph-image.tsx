import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { hero, site } from "@/content/site";

export const alt = site.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const MARK_PATH = "M4 11.5H10.5V17C10.5 21 13 23.5 16 25C19 23.5 21.5 21 21.5 17V11.5H28";

/** Static Open Graph image, rendered once at build time. */
export default async function OpenGraphImage() {
  const [interTight, inter] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/InterTight-SemiBold.woff")),
    readFile(join(process.cwd(), "assets/fonts/Inter-Regular.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #0b1f22 0%, #0f5b57 100%)",
          color: "#ffffff",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="60" height="60" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="8" fill="#ffffff" />
            <path d={MARK_PATH} fill="none" stroke="#0f5b57" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ fontFamily: "Inter Tight", fontSize: 52, fontWeight: 600, letterSpacing: "-0.02em" }}>insurail</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontFamily: "Inter Tight",
              fontSize: 74,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.04,
              maxWidth: 1000,
            }}
          >
            {hero.title}
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.3, color: "#b9d6d2", maxWidth: 980 }}>
            {`${site.tagline}, starting in Nigeria.`}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#b9d6d2" }}>
          <span>{site.domain}</span>
          <span>Checkout · POS · USSD · API</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter Tight", data: interTight, weight: 600, style: "normal" },
        { name: "Inter", data: inter, weight: 400, style: "normal" },
      ],
    },
  );
}
