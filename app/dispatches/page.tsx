import type { Metadata } from "next";
import { dispatches } from "@/content/dispatches";
import { CardLink, Eyebrow, Grid, Heading, Lede, Page, Text } from "@/ui";

export const metadata: Metadata = { title: "Dispatches" };

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });

export default function DispatchesPage() {
  const sorted = [...dispatches].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <Page>
      <Eyebrow>Dispatches</Eyebrow>
      <Heading level={1} size="page">Notes from the park</Heading>
      <Lede mt={14} mb={28} measure="60ch">
        Field notes, surveys and practical advice from the people who work here.
      </Lede>
      <Grid>
        {sorted.map((d) => (
          <CardLink key={d.slug} href={`/dispatches/${d.slug}`}>
            <Eyebrow>{d.tag} · {d.readingMinutes} min</Eyebrow>
            <Heading level={2} size="card">{d.title}</Heading>
            <Text size="sm" tone="dim" mt={8} mb={12}>{d.excerpt}</Text>
            <Text size="sm" tone="faint" flush>{d.author} · {fmt(d.date)}</Text>
          </CardLink>
        ))}
      </Grid>
    </Page>
  );
}
