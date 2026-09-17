import { ArrowRight } from "lucide-react";
import { hero } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CheckoutMock } from "@/components/illustrations/CheckoutMock";
import { ApiCallMock } from "@/components/illustrations/ApiCallMock";

/** Decorative link between the checkout toggle and the API call. */
function RailConnector({ label }: { label: string }) {
  return (
    <div aria-hidden="true" className="flex flex-col items-center justify-center gap-2 lg:flex-row lg:gap-3">
      <span className="h-6 w-px border-l-2 border-dashed border-border-strong/50 lg:h-px lg:w-8 lg:border-l-0 lg:border-t-2" />
      <span className="whitespace-nowrap rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-fg-muted shadow-card">
        {label}
      </span>
      <span className="h-6 w-px border-l-2 border-dashed border-border-strong/50 lg:h-px lg:w-8 lg:border-l-0 lg:border-t-2" />
    </div>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div aria-hidden="true" className="rail-grid pointer-events-none absolute inset-x-0 top-0 h-[44rem]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-14rem] h-[32rem] w-[64rem] -translate-x-1/2 rounded-full bg-primary-soft/80 blur-3xl"
      />

      <Container className="relative pb-16 pt-12 sm:pt-16 md:pb-24 md:pt-20">
        <div className="mx-auto max-w-[52rem] text-center">
          <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-surface/80 px-3.5 py-1.5 text-xs font-medium text-fg-muted shadow-card sm:text-[0.8125rem]">
            <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
            <span>{hero.eyebrow}</span>
          </p>
          <h1 id="hero-heading" className="mt-6 text-display text-fg">
            {hero.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lead text-fg-muted">{hero.subtitle}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              href={hero.primaryCta.href}
              size="lg"
              data-event="cta_click"
              data-event-cta="hero_primary"
              trailingIcon={<ArrowRight aria-hidden="true" className="size-4" />}
            >
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="outline" size="lg" data-event="cta_click" data-event-cta="hero_secondary">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-[minmax(0,1fr)] items-center gap-5 md:mt-20 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-4">
          <div className="flex min-w-0 justify-center animate-fade-up motion-reduce:animate-none lg:justify-end">
            <CheckoutMock />
          </div>
          <RailConnector label={hero.apiCall.connector} />
          <div className="flex min-w-0 justify-center animate-fade-up [animation-delay:150ms] motion-reduce:animate-none lg:justify-start">
            <ApiCallMock />
          </div>
        </div>
      </Container>
    </section>
  );
}
