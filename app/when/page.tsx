"use client";

import { useState } from "react";
import Link from "next/link";
import { MONTHS, MONTHS_LONG, KIND_LABEL, highlights } from "@/content/highlights";
import { Button, Card, Eyebrow, Grid, Heading, Lede, Page, Pill, PillRow, Text } from "@/ui";

export default function WhenPage() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const now = highlights.filter((h) => h.months.includes(month));
  const peak = now.filter((h) => h.peak.includes(month));

  return (
    <Page>
      <Eyebrow>When to come</Eyebrow>
      <Heading level={1} size="page">What the park is doing in {MONTHS_LONG[month - 1]}</Heading>
      <Lede mt={14} mb={24} measure="60ch">
        Pick a month. Highlighted rows are at their best; the rest are worth planning around.
      </Lede>

      <PillRow role="tablist" aria-label="Month">
        {MONTHS.map((m, i) => (
          <Button
            key={m}
            role="tab"
            aria-selected={month === i + 1}
            variant={month === i + 1 ? "primary" : "ghost"}
            onClick={() => setMonth(i + 1)}
          >{m}</Button>
        ))}
      </PillRow>

      <Grid mt={28}>
        {[...peak, ...now.filter((h) => !peak.includes(h))].map((h) => (
          <Card as="article" key={h.slug} accent={peak.includes(h)}>
            <PillRow>
              <Pill>{KIND_LABEL[h.kind]}</Pill>
              {peak.includes(h) && <Pill tone="accent">Peak</Pill>}
            </PillRow>
            <Heading level={2} size="card" mt={10} mb={6}>{h.name}</Heading>
            <Text size="sm" tone="dim"><strong>Where:</strong> {h.where}</Text>
            <Text size="sm"><strong>How:</strong> {h.how}</Text>
            <details>
              <Text as="summary" size="sm">Why it happens here</Text>
              <Text size="sm" tone="dim" mt={8}>{h.why}</Text>
            </details>
            {h.trails.length > 0 && (
              <Text size="sm" mt={10} mb={0}>
                {h.trails.map((t, i) => (
                  <span key={t}>{i > 0 && " · "}<Link href={`/trails/${t}`}>{t.replace(/-/g, " ")}</Link></span>
                ))}
              </Text>
            )}
          </Card>
        ))}
      </Grid>
    </Page>
  );
}
