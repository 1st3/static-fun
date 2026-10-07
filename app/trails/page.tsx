import type { Metadata } from "next";
import { areaBySlug } from "@/content/park";
import { DIFFICULTY_LABEL, TIDE_LABEL, trails } from "@/content/trails";
import { ParkMap } from "@/components/park-map";
import { CardLink, Eyebrow, Grid, Heading, Lede, Page, Pill, PillRow, Text } from "@/ui";

export const metadata: Metadata = { title: "Trails" };

export default function TrailsPage() {
  return (
    <Page>
      <Eyebrow>Trails</Eyebrow>
      <Heading level={1} size="page">Nine ways into the park</Heading>
      <Lede mt={14} mb={28} measure="60ch">
        Every trail page explains why the ground looks the way it does, flags where the tide
        governs the walk, and pins insider notes to specific kilometre marks.
      </Lede>
      <ParkMap />
      <Grid mt={36}>
        {trails.map((t) => (
          <CardLink key={t.slug} href={`/trails/${t.slug}`}>
            <Eyebrow style={{ color: t.color }}>{areaBySlug(t.area).name}</Eyebrow>
            <Heading level={2} size="card">{t.name}</Heading>
            <PillRow mt={10} mb={10}>
              <Pill>{t.distanceKm} km</Pill>
              <Pill>{DIFFICULTY_LABEL[t.difficulty]}</Pill>
              {t.tide !== "none" && <Pill tone="accent">{TIDE_LABEL[t.tide]}</Pill>}
            </PillRow>
            <Text size="sm" tone="dim" flush>{t.summary}</Text>
          </CardLink>
        ))}
      </Grid>
    </Page>
  );
}
