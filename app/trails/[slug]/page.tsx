import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { areaBySlug } from "@/content/park";
import { DIFFICULTY_LABEL, TIDE_LABEL, trailBySlug, trails } from "@/content/trails";
import { highlightBySlug } from "@/content/highlights";
import { tips, CATEGORY_LABEL } from "@/content/tips";
import { PostList } from "@/components/register-view";
import { ParkMap } from "@/components/park-map";
import {
  Box, ButtonLink, Card, Eyebrow, Grid, Heading, Lede, Page, Panel, Pill, PillRow, Prose, Quote, Row, Stack, Text, TextLink,
} from "@/ui";
import styles from "./trail.module.css";

export function generateStaticParams() {
  return trails.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const t = trailBySlug((await params).slug);
  return { title: t?.name ?? "Trail", description: t?.summary };
}

export default async function TrailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = trailBySlug(slug);
  if (!t) notFound();

  const area = areaBySlug(t.area);
  const trailTips = tips.filter((x) => x.trail === t.slug);
  const marks = t.highlights.map((h) => highlightBySlug(h)).filter(Boolean);

  return (
    <Page>
      <TextLink href="/trails" size="sm">← All trails</TextLink>
      <Eyebrow mt={18}>{area.name}</Eyebrow>
      <Heading level={1} size="page">{t.name}</Heading>
      <Lede mt={14} mb={20} measure="60ch">{t.summary}</Lede>

      <PillRow>
        <Pill>{t.distanceKm} km {t.shape}</Pill>
        <Pill>{DIFFICULTY_LABEL[t.difficulty]}</Pill>
        <Pill>{t.hours} h</Pill>
        <Pill>+{t.gainM} m</Pill>
        {t.tide !== "none" && <Pill tone="accent">{TIDE_LABEL[t.tide]}</Pill>}
      </PillRow>

      {t.tideNote && (
        <Panel accent mt={24}>
          <Eyebrow>Tide</Eyebrow>
          <Text flush>{t.tideNote}</Text>
          <Text size="sm" mt={10} mb={0}><Link href="/tide">Check the tide clock →</Link></Text>
        </Panel>
      )}

      <Grid variant="split" mt={36}>
        <Stack gap={28}>
          <section>
            <Heading level={2} size="card">Why the ground looks like this</Heading>
            <Prose as="p" mt={10}>{t.ground}</Prose>
          </section>
          <section>
            <Heading level={2} size="card">Along the way</Heading>
            <ol className={styles.waypoints}>
              {t.waypoints.map((w) => (
                <li key={w.km}>
                  <span className={styles.km}>km {w.km}</span>
                  <div>
                    <strong>{w.name}</strong>
                    <Text tone="dim" mt={4} mb={0}>{w.note}</Text>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </Stack>

        <Stack as="aside" gap={16}>
          <Card>
            <dl className={styles.facts}>
              <dt>Trailhead</dt><dd>{t.trailhead}</dd>
              <dt>Parking</dt><dd>{t.parking}</dd>
              <dt>Footing</dt><dd>{t.footing}</dd>
              <dt>Best time</dt><dd>{t.bestTime}</dd>
              <dt>Access</dt><dd>{t.accessibility}</dd>
            </dl>
          </Card>
          {marks.length > 0 && (
            <Panel>
              <Eyebrow>Look for</Eyebrow>
              <ul className={styles.plain}>
                {marks.map((h) => (
                  <li key={h!.slug}>
                    <strong>{h!.name}</strong>
                    <br />
                    <Text as="span" size="sm" tone="dim">{h!.where}</Text>
                  </li>
                ))}
              </ul>
            </Panel>
          )}
        </Stack>
      </Grid>

      {trailTips.length > 0 && (
        <Box as="section" mt={48}>
          <Heading level={2} size="section">Insider tips</Heading>
          <Grid mt={18}>
            {trailTips.map((x) => (
              <Card as="figure" key={x.id}>
                <Pill>{CATEGORY_LABEL[x.category]}</Pill>
                <Quote>{x.text}</Quote>
                <Text as="figcaption" size="sm" tone="dim">{x.author}, {x.role}</Text>
              </Card>
            ))}
          </Grid>
        </Box>
      )}

      <Box as="section" mt={48}>
        <Row variant="between">
          <Heading level={2} size="section">From the register</Heading>
          <ButtonLink variant="ghost" href={`/register?trail=${t.slug}#new`}>Post about this trail</ButtonLink>
        </Row>
        <Stack gap={12} mt={18}>
          <PostList trail={t.slug} />
        </Stack>
      </Box>

      <Box as="section" mt={48}>
        <ParkMap initial={t.slug} />
      </Box>
    </Page>
  );
}
