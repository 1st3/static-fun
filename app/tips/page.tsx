"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CATEGORY_LABEL, tips, type TipCategory } from "@/content/tips";
import { trails } from "@/content/trails";
import { MONTHS_LONG } from "@/content/highlights";
import { Button, Card, Eyebrow, Grid, Heading, Lede, Page, Pill, PillRow, Quote, Row, Select, Text, VisuallyHidden } from "@/ui";

export default function TipsPage() {
  const [cat, setCat] = useState<TipCategory | "all">("all");
  const [trail, setTrail] = useState("all");

  const shown = useMemo(
    () => tips.filter((t) => (cat === "all" || t.category === cat) && (trail === "all" || t.trail === trail)),
    [cat, trail],
  );

  return (
    <Page>
      <Eyebrow>Insider tips</Eyebrow>
      <Heading level={1} size="page">What the people who work here tell their friends</Heading>
      <Lede mt={14} mb={24} measure="60ch">
        Rangers, wardens, guides and trail crew, with their seasons on the job.
      </Lede>

      <Row mb={14}>
        <PillRow>
          {(["all", ...Object.keys(CATEGORY_LABEL)] as (TipCategory | "all")[]).map((c) => (
            <Button key={c} variant={cat === c ? "primary" : "ghost"} onClick={() => setCat(c)}>
              {c === "all" ? "All" : CATEGORY_LABEL[c]}
            </Button>
          ))}
        </PillRow>
        <VisuallyHidden as="label" htmlFor="trailf">Filter by trail</VisuallyHidden>
        <Select inline id="trailf" value={trail} onChange={(e) => setTrail(e.target.value)}>
          <option value="all">Any trail</option>
          {trails.map((t) => <option key={t.slug} value={t.slug}>{t.name}</option>)}
        </Select>
      </Row>

      <Grid mt={20}>
        {shown.map((t) => (
          <Card as="figure" key={t.id}>
            <PillRow>
              <Pill>{CATEGORY_LABEL[t.category]}</Pill>
              {t.months.length > 0 && (
                <Pill>{MONTHS_LONG[t.months[0] - 1].slice(0, 3)}–{MONTHS_LONG[t.months[t.months.length - 1] - 1].slice(0, 3)}</Pill>
              )}
            </PillRow>
            <Quote>{t.text}</Quote>
            <Text as="figcaption" size="sm" tone="dim">
              <strong>{t.author}</strong>, {t.role} · {t.seasons} seasons
              {t.trail && <> · <Link href={`/trails/${t.trail}`}>{trails.find((x) => x.slug === t.trail)?.name}</Link></>}
            </Text>
          </Card>
        ))}
        {shown.length === 0 && <Text tone="dim">No tips match that combination yet.</Text>}
      </Grid>
    </Page>
  );
}
