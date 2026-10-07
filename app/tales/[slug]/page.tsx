import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { taleBySlug, tales } from "@/content/tales";
import { trailBySlug } from "@/content/trails";

export function generateStaticParams() {
  return tales.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const t = taleBySlug((await params).slug);
  return { title: t?.title ?? "Tale", description: t?.excerpt };
}

export default async function TalePage({ params }: { params: Promise<{ slug: string }> }) {
  const t = taleBySlug((await params).slug);
  if (!t) notFound();
  const trail = t.trail ? trailBySlug(t.trail) : undefined;

  return (
    <article className="wrap-narrow section">
      <Link href="/tales" className="small">← All tales</Link>
      <p className="eyebrow" style={{ marginTop: 18 }}>{t.era}</p>
      <h1 className="h-page">{t.title}</h1>
      <p className="small dim" style={{ margin: "14px 0 30px" }}>
        Told by {t.teller}, {t.tellerRole} · {t.place}
      </p>
      <div className="prose">
        {t.body.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      {trail && (
        <p style={{ marginTop: 32 }}>
          <Link className="btn btn-ghost" href={`/trails/${trail.slug}`}>Walk it: {trail.name}</Link>
        </p>
      )}
    </article>
  );
}
