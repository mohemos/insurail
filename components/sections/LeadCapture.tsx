import { leadCapture, site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadFormsLazy as LeadForms } from "@/components/forms/LeadForms.lazy";

export function LeadCapture() {
  return (
    <section id={leadCapture.id} aria-labelledby={`${leadCapture.id}-heading`} className="bg-cta py-20 text-cta-fg md:py-28">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionHeading
              id={`${leadCapture.id}-heading`}
              eyebrow={leadCapture.eyebrow}
              title={leadCapture.title}
              lead={leadCapture.lead}
              tone="cta"
            />
            <p className="mt-8 text-sm text-cta-fg-muted">
              Prefer email?{" "}
              <a href={`mailto:${site.email}`} className="font-medium text-cta-fg underline-offset-4 hover:underline">
                {site.email}
              </a>
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          {/* Anchor for "Get API early access" links; LeadForms switches to the developer form on this hash. */}
          <div id={leadCapture.developerAnchor} className="scroll-mt-28" />
          <Reveal delay={0.1}>
            <LeadForms />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
