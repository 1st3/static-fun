import { Suspense } from "react";
import type { Metadata } from "next";
import { RegisterView } from "@/components/register-view";

export const metadata: Metadata = { title: "Trail register" };

export default function RegisterPage() {
  return (
    <div className="wrap section">
      <p className="eyebrow">Trail register</p>
      <h1 className="h-page">The logbook at the trailhead</h1>
      <p className="lede" style={{ margin: "14px 0 24px", maxWidth: "60ch" }}>
        No accounts, just a name. Sightings, conditions, questions and tide reports from people who
        were out there. For a hazard, call the visitor centre as well.
      </p>
      <Suspense fallback={null}>
        <RegisterView />
      </Suspense>
    </div>
  );
}
