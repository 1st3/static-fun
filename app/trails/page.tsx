import Link from "next/link";
import type { Metadata } from "next";
import { areaBySlug } from "@/content/park";
import { DIFFICULTY_LABEL, TIDE_LABEL, trails } from "@/content/trails";
import { ParkMap } from "@/components/park-map";

export const metadata: Metadata = { title: "Trails" };

export default function TrailsPage() {
  return (
    <div className="wrap section">
      <p className="eyebrow">Trails</p>
      <h1 className="h-page">Nine ways into the park</h1>
      <p className="lede" style={{ margin: "14px 0 28px", maxWidth: "60ch" }}>
        Every trail page explains why the ground looks the way it does, flags where the tide
        governs the walk, and pins insider notes to specific kilometre marks.
      </p>
      <ParkMap />
      <div className="grid" style={{ marginTop: 36 }}>
        {trails.map((t) => (
          <Link key={t.slug} href={`/trails/${t.slug}`} className="card card-link">
            <p className="eyebrow" style={{ color: t.color }}>{areaBySlug(t.area).name}</p>
            <h2 className="h-card">{t.name}</h2>
            <div className="pill-row" style={{ margin: "10px 0" }}>
              <span className="pill">{t.distanceKm} km</span>
              <span className="pill">{DIFFICULTY_LABEL[t.difficulty]}</span>
              {t.tide !== "none" && <span className="pill pill-accent">{TIDE_LABEL[t.tide]}</span>}
            </div>
            <p className="small dim" style={{ margin: 0 }}>{t.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
