import type { Metadata } from "next";
import { park } from "@/content/park";
import { FloorWindows, TideDial, TideReadout } from "@/components/tide";
import { TideCalendar } from "@/components/tide-calendar";
import { Card, Eyebrow, Grid, Heading, Lede, Page, Panel, Text } from "@/ui";

export const metadata: Metadata = { title: "Tide" };

export default function TidePage() {
  return (
    <Page>
      <Eyebrow>The tide</Eyebrow>
      <Heading level={1} size="page">Twelve metres, twice a day</Heading>
      <Lede mt={14} mb={28} measure="60ch">{park.tideNote}</Lede>

      <Grid variant="split">
        <Card><TideReadout /></Card>
        <Card><TideDial /></Card>
      </Grid>

      <Heading level={2} size="section" mt={44} mb={16}>Sea-floor windows</Heading>
      <FloorWindows />

      <Heading level={2} size="section" mt={44} mb={16}>This month</Heading>
      <TideCalendar />

      <Panel accent mt={40}>
        <Eyebrow>Read this before you go below the line</Eyebrow>
        <Text mb={10}>
          This clock is a teaching model. It shows the shape of a Fundy tide, not a surveyed
          prediction, and it knows nothing about wind, surge or air pressure.
        </Text>
        <Text flush>
          Before any walk on the shore, check the official{" "}
          <a href="https://www.tides.gc.ca/" target="_blank" rel="noopener noreferrer">Canadian Hydrographic Service</a>{" "}
          predictions, start on a falling tide, and never let the water get between you and your way up.
        </Text>
      </Panel>
    </Page>
  );
}
