import { park } from "@/content/park";
import { trails } from "@/content/trails";
import { tales } from "@/content/tales";
import { tips } from "@/content/tips";
import { dispatches } from "@/content/dispatches";
import { PostList } from "@/components/register-view";
import { FloorWindows, TideDial, TideReadout } from "@/components/tide";
import { ParkMap } from "@/components/park-map";
import {
  Box, ButtonLink, Card, CardLink, Container, Eyebrow, Grid, Heading, Lede, Panel, Prose, Row, Section, Stack, Text, TextLink, TideLine,
} from "@/ui";
import styles from "./home.module.css";

export default function Home() {
  const tip = tips[new Date().getDate() % tips.length];

  return (
    <>
      <section className={styles.hero}>
        <Container className={styles.heroGrid}>
          <div>
            <Eyebrow>{park.name} · {park.province}</Eyebrow>
            <Heading level={1} size="hero">{park.tagline}</Heading>
            <Lede mt={18} measure="52ch">{park.blurb}</Lede>
            <Row variant="buttons" mt={26}>
              <ButtonLink href="/tide">Read today&rsquo;s tide</ButtonLink>
              <ButtonLink variant="ghost" href="/trails">Browse {trails.length} trails</ButtonLink>
            </Row>
          </div>
          <Card raised>
            <TideReadout />
            <Box mt={18}><TideDial /></Box>
          </Card>
        </Container>
      </section>

      <TideLine />

      <Section>
        <Container>
          <Grid variant="split">
            <div>
              <Eyebrow>The sea floor</Eyebrow>
              <Heading level={2} size="section">Is it open right now?</Heading>
              <Text tone="dim" mt={12}>
                Three places where the bay hands back its floor, and when each one is walkable.
                Plan to be back above the wrack line well before the turn.
              </Text>
            </div>
            <FloorWindows />
          </Grid>
        </Container>
      </Section>

      <Section tight>
        <Container>
          <Eyebrow>Park map</Eyebrow>
          <Heading level={2} size="section" mb={20}>{trails.length} trails, one coast</Heading>
          <ParkMap />
        </Container>
      </Section>

      <Section>
        <Container>
          <Grid variant="split">
            <Panel>
              <Eyebrow>Insider tip · today</Eyebrow>
              <Prose as="p">&ldquo;{tip.text}&rdquo;</Prose>
              <Text size="sm" tone="dim" mt={14}>
                {tip.author}, {tip.role} · {tip.seasons} seasons
              </Text>
              <TextLink href="/tips" size="sm">All tips →</TextLink>
            </Panel>
            <Stack gap={12}>
              <Eyebrow>From the register</Eyebrow>
              <PostList limit={3} />
              <TextLink href="/register" size="sm">Open the register →</TextLink>
            </Stack>
          </Grid>
        </Container>
      </Section>

      <Section tight>
        <Container>
          <Row variant="between" mb={20}>
            <Heading level={2} size="section">Tales &amp; dispatches</Heading>
          </Row>
          <Grid>
            {tales.slice(0, 2).map((t) => (
              <CardLink key={t.slug} href={`/tales/${t.slug}`}>
                <Eyebrow>Tale · {t.era}</Eyebrow>
                <Heading level={3} size="card">{t.title}</Heading>
                <Text size="sm" tone="dim" mt={8}>{t.excerpt}</Text>
              </CardLink>
            ))}
            {dispatches.slice(0, 1).map((d) => (
              <CardLink key={d.slug} href={`/dispatches/${d.slug}`}>
                <Eyebrow>{d.tag} · {d.readingMinutes} min</Eyebrow>
                <Heading level={3} size="card">{d.title}</Heading>
                <Text size="sm" tone="dim" mt={8}>{d.excerpt}</Text>
              </CardLink>
            ))}
          </Grid>
        </Container>
      </Section>
    </>
  );
}
