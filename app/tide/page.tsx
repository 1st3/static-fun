import type { Metadata } from "next";
import { park } from "@/content/park";
import { FloorWindows, TideDial, TideReadout } from "@/components/tide";
import { TideCalendar } from "@/components/tide-calendar";

export const metadata: Metadata = { title: "Tide" };

export default function TidePage() {
  return (
    <div className="wrap section">
      <p className="eyebrow">The tide</p>
      <h1 className="h-page">Twelve metres, twice a day</h1>
      <p className="lede" style={{ margin: "14px 0 28px", maxWidth: "60ch" }}>{park.tideNote}</p>

      <div className="grid-2">
        <div className="card"><TideReadout /></div>
        <div className="card"><TideDial /></div>
      </div>

      <h2 className="h-sect" style={{ margin: "44px 0 16px" }}>Sea-floor windows</h2>
      <FloorWindows />

      <h2 className="h-sect" style={{ margin: "44px 0 16px" }}>This month</h2>
      <TideCalendar />

      <div className="panel" style={{ marginTop: 40, borderColor: "var(--accent)" }}>
        <p className="eyebrow">Read this before you go below the line</p>
        <p style={{ margin: "0 0 10px" }}>
          This clock is a teaching model. It shows the shape of a Fundy tide, not a surveyed
          prediction, and it knows nothing about wind, surge or air pressure.
        </p>
        <p style={{ margin: 0 }}>
          Before any walk on the shore, check the official{" "}
          <a href="https://www.tides.gc.ca/" target="_blank" rel="noopener noreferrer">Canadian Hydrographic Service</a>{" "}
          predictions, start on a falling tide, and never let the water get between you and your way up.
        </p>
      </div>
    </div>
  );
}
