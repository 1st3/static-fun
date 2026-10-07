import Link from "next/link";
import type { Metadata } from "next";
import { dispatches } from "@/content/dispatches";

export const metadata: Metadata = { title: "Dispatches" };

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });

export default function DispatchesPage() {
  const sorted = [...dispatches].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div className="wrap section">
      <p className="eyebrow">Dispatches</p>
      <h1 className="h-page">Notes from the park</h1>
      <p className="lede" style={{ margin: "14px 0 28px", maxWidth: "60ch" }}>
        Field notes, surveys and practical advice from the people who work here.
      </p>
      <div className="grid">
        {sorted.map((d) => (
          <Link key={d.slug} href={`/dispatches/${d.slug}`} className="card card-link">
            <p className="eyebrow">{d.tag} · {d.readingMinutes} min</p>
            <h2 className="h-card">{d.title}</h2>
            <p className="small dim" style={{ margin: "8px 0 12px" }}>{d.excerpt}</p>
            <p className="small faint" style={{ margin: 0 }}>{d.author} · {fmt(d.date)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
