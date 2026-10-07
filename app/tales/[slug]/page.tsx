import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { taleBySlug, tales } from "@/content/tales";
import { trailBySlug } from "@/content/trails";
import { ButtonLink, Eyebrow, Heading, Page, Prose, Text, TextLink } from "@/ui";

export function generateStaticParams() {
  return tales.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const t = taleBySlug((await params).slug);
  return { title: t?.title ?? "Tale", description: t?.excerpt };
}

export default async function TalePage({ params }: { params: Promise<{ slug: string }> }) {
  const t = taleBySlug((await params).slug);
  if (!t) notFound();
  const trail = t.trail ? trailBySlug(t.trail) : undefined;

  return (
    <Page narrow as="article">
      <TextLink href="/tales" size="sm">← All tales</TextLink>
      <Eyebrow mt={18}>{t.era}</Eyebrow>
      <Heading level={1} size="page">{t.title}</Heading>
      <Text size="sm" tone="dim" mt={14} mb={30}>
        Told by {t.teller}, {t.tellerRole} · {t.place}
      </Text>
      <Prose>
        {t.body.map((p, i) => <p key={i}>{p}</p>)}
      </Prose>
      {trail && (
        <Text mt={32}>
          <ButtonLink variant="ghost" href={`/trails/${trail.slug}`}>Walk it: {trail.name}</ButtonLink>
        </Text>
      )}
    </Page>
  );
}
