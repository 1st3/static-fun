import type { Metadata } from "next";
import { tales } from "@/content/tales";
import { CardLink, Eyebrow, Grid, Heading, Lede, Page, Text } from "@/ui";

export const metadata: Metadata = { title: "Tales" };

export default function TalesPage() {
  return (
    <Page>
      <Eyebrow>Tales</Eyebrow>
      <Heading level={1} size="page">Stories from the coast</Heading>
      <Lede mt={14} mb={28} measure="60ch">
        Folklore, history and hard-won lessons, each tied to a real place you can stand in.
      </Lede>
      <Grid>
        {tales.map((t) => (
          <CardLink key={t.slug} href={`/tales/${t.slug}`}>
            <Eyebrow>{t.era}</Eyebrow>
            <Heading level={2} size="card">{t.title}</Heading>
            <Text size="sm" tone="dim" mt={8} mb={12}>{t.excerpt}</Text>
            <Text size="sm" tone="faint" flush>{t.place}</Text>
          </CardLink>
        ))}
      </Grid>
    </Page>
  );
}
