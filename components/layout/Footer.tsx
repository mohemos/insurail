import Link from "next/link";
import { MapPin } from "lucide-react";
import { footer, nav, site } from "@/content/site";
import { Wordmark } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg">
      <Container className="py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,minmax(0,1fr))] md:gap-8">
          <div>
            <Link href="/" aria-label={nav.homeLabel} className="inline-block rounded-md text-fg">
              <Wordmark />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">{footer.description}</p>
            <p className="mt-4 flex items-center gap-1.5 text-sm text-fg-subtle">
              <MapPin aria-hidden="true" className="size-4" />
              {footer.location}
            </p>
          </div>

          {footer.columns.map((column) => {
            const headingId = `footer-${column.title.toLowerCase()}`;
            return (
              <nav key={column.title} aria-labelledby={headingId}>
                <p id={headingId} className="text-sm font-semibold text-fg">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      {link.href.startsWith("/") && !link.href.includes("#") ? (
                        <Link href={link.href} className="text-sm text-fg-muted transition-colors hover:text-fg">
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="text-sm text-fg-muted transition-colors hover:text-fg"
                          {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {footer.copyrightName}. {footer.location}.
          </p>
          <ul className="flex gap-2" aria-label={footer.socialLabel}>
            {(["linkedin", "x"] as const).map((network) => (
              <li key={network}>
                <a
                  href={site.social[network].href}
                  aria-label={site.social[network].label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-9 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
                >
                  <SocialIcon network={network} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
