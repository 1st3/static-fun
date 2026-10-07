import { Suspense } from "react";
import type { Metadata } from "next";
import { RegisterView } from "@/components/register-view";
import { Eyebrow, Heading, Lede, Page } from "@/ui";

export const metadata: Metadata = { title: "Trail register" };

export default function RegisterPage() {
  return (
    <Page>
      <Eyebrow>Trail register</Eyebrow>
      <Heading level={1} size="page">The logbook at the trailhead</Heading>
      <Lede mt={14} mb={24} measure="60ch">
        No accounts, just a name. Sightings, conditions, questions and tide reports from people who
        were out there. For a hazard, call the visitor centre as well.
      </Lede>
      <Suspense fallback={null}>
        <RegisterView />
      </Suspense>
    </Page>
  );
}
