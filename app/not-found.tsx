import type { Metadata } from "next";
import { notFound } from "@/content/site";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: notFound.title,
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Container className="flex flex-col items-start py-24 md:py-32">
        <p className="text-eyebrow uppercase text-primary">404</p>
        <h1 className="mt-3 text-h2 text-fg">{notFound.title}</h1>
        <p className="mt-4 max-w-md text-lead text-fg-muted">{notFound.body}</p>
        <Link href={notFound.cta.href} className={buttonClasses("primary", "md", "mt-8")}>
          {notFound.cta.label}
        </Link>
      </Container>
    </main>
  );
}
