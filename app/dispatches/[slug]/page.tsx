import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { dispatchBySlug, dispatches } from "@/content/dispatches";
import { Eyebrow, Heading, Page, Prose, Text, TextLink } from "@/ui";

export function generateStaticParams() {
  return dispatches.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const d = dispatchBySlug((await params).slug);
  return { title: d?.title ?? "Dispatch", description: d?.excerpt };
}

export default async function DispatchPage({ params }: { params: Promise<{ slug: string }> }) {
  const d = dispatchBySlug((await params).slug);
  if (!d) notFound();
  const date = new Date(d.date).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });

  return (
    <Page narrow as="article">
      <TextLink href="/dispatches" size="sm">← All dispatches</TextLink>
      <Eyebrow mt={18}>{d.tag}</Eyebrow>
      <Heading level={1} size="page">{d.title}</Heading>
      <Text size="sm" tone="dim" mt={14} mb={30}>
        {d.author}, {d.role} · {date} · {d.readingMinutes} min read
      </Text>
      <Prose>
        {d.body.map((p, i) => <p key={i}>{p}</p>)}
      </Prose>
    </Page>
  );
}
