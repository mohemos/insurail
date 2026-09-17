import type { LegalPage as LegalPageContent } from "@/content/legal";
import { Container } from "@/components/ui/Container";

/** Simple prose layout shared by /privacy and /terms. */
export function LegalPage({ page }: { page: LegalPageContent }) {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Container as="article" className="max-w-3xl py-16 md:py-24">
        <p className="text-eyebrow uppercase text-primary">{page.title}</p>
        <h1 className="mt-3 text-h2 text-fg">{page.title}</h1>
        <p className="mt-3 text-sm text-fg-subtle">Last updated {page.updated}</p>
        <p className="mt-6 text-lead text-fg-muted">{page.intro}</p>
        {page.sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="text-h3 text-fg">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3 leading-relaxed text-fg-muted">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </Container>
    </main>
  );
}
