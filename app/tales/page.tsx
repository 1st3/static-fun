import Link from "next/link";
import type { Metadata } from "next";
import { tales } from "@/content/tales";

export const metadata: Metadata = { title: "Tales" };

export default function TalesPage() {
  return (
    <div className="wrap section">
      <p className="eyebrow">Tales</p>
      <h1 className="h-page">Stories from the coast</h1>
      <p className="lede" style={{ margin: "14px 0 28px", maxWidth: "60ch" }}>
        Folklore, history and hard-won lessons, each tied to a real place you can stand in.
      </p>
      <div className="grid">
        {tales.map((t) => (
          <Link key={t.slug} href={`/tales/${t.slug}`} className="card card-link">
            <p className="eyebrow">{t.era}</p>
            <h2 className="h-card">{t.title}</h2>
            <p className="small dim" style={{ margin: "8px 0 12px" }}>{t.excerpt}</p>
            <p className="small faint" style={{ margin: 0 }}>{t.place}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
