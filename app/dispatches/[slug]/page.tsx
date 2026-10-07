import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { dispatchBySlug, dispatches } from "@/content/dispatches";

export function generateStaticParams() {
  return dispatches.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const d = dispatchBySlug((await params).slug);
  return { title: d?.title ?? "Dispatch", description: d?.excerpt };
}

export default async function DispatchPage({ params }: { params: Promise<{ slug: string }> }) {
  const d = dispatchBySlug((await params).slug);
  if (!d) notFound();
  const date = new Date(d.date).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });

  return (
    <article className="wrap-narrow section">
      <Link href="/dispatches" className="small">← All dispatches</Link>
      <p className="eyebrow" style={{ marginTop: 18 }}>{d.tag}</p>
      <h1 className="h-page">{d.title}</h1>
      <p className="small dim" style={{ margin: "14px 0 30px" }}>
        {d.author}, {d.role} · {date} · {d.readingMinutes} min read
      </p>
      <div className="prose">
        {d.body.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </article>
  );
}
