import { faq, site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { FaqItem } from "@/components/ui/FaqItem";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Faq() {
  return (
    <section id={faq.id} aria-labelledby={`${faq.id}-heading`} className="bg-surface-2 py-20 md:py-28">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <SectionHeading id={`${faq.id}-heading`} eyebrow={faq.eyebrow} title={faq.title} />
          <p className="mt-6 text-sm text-fg-muted">
            Something else?{" "}
            <a href={`mailto:${site.email}`} className="font-medium text-primary underline-offset-4 hover:underline">
              {site.email}
            </a>
          </p>
        </Reveal>
        <Reveal className="lg:col-span-8" delay={0.05}>
          <div className="divide-y divide-border border-y border-border">
            {faq.items.map((item) => (
              <FaqItem key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
