import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { areaBySlug } from "@/content/park";
import { DIFFICULTY_LABEL, TIDE_LABEL, trailBySlug, trails } from "@/content/trails";
import { highlightBySlug } from "@/content/highlights";
import { tips, CATEGORY_LABEL } from "@/content/tips";
import { postsFor, KIND_LABEL, timeAgo } from "@/lib/board";
import { ParkMap } from "@/components/park-map";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return trails.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const t = trailBySlug((await params).slug);
  return { title: t?.name ?? "Trail", description: t?.summary };
}

export default async function TrailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = trailBySlug(slug);
  if (!t) notFound();

  const area = areaBySlug(t.area);
  const trailTips = tips.filter((x) => x.trail === t.slug);
  const posts = postsFor(t.slug);
  const marks = t.highlights.map((h) => highlightBySlug(h)).filter(Boolean);

  return (
    <div className="wrap section">
      <Link href="/trails" className="small">← All trails</Link>
      <p className="eyebrow" style={{ marginTop: 18 }}>{area.name}</p>
      <h1 className="h-page">{t.name}</h1>
      <p className="lede" style={{ margin: "14px 0 20px", maxWidth: "60ch" }}>{t.summary}</p>

      <div className="pill-row">
        <span className="pill">{t.distanceKm} km {t.shape}</span>
        <span className="pill">{DIFFICULTY_LABEL[t.difficulty]}</span>
        <span className="pill">{t.hours} h</span>
        <span className="pill">+{t.gainM} m</span>
        {t.tide !== "none" && <span className="pill pill-accent">{TIDE_LABEL[t.tide]}</span>}
      </div>

      {t.tideNote && (
        <div className="panel" style={{ marginTop: 24, borderColor: "var(--accent)" }}>
          <p className="eyebrow">Tide</p>
          <p style={{ margin: 0 }}>{t.tideNote}</p>
          <p className="small" style={{ margin: "10px 0 0" }}><Link href="/tide">Check the tide clock →</Link></p>
        </div>
      )}

      <div className="grid-2" style={{ marginTop: 36 }}>
        <div className="stack" style={{ ["--gap" as string]: "28px" }}>
          <section>
            <h2 className="h-card">Why the ground looks like this</h2>
            <p className="prose" style={{ marginTop: 10 }}>{t.ground}</p>
          </section>
          <section>
            <h2 className="h-card">Along the way</h2>
            <ol className="wp">
              {t.waypoints.map((w) => (
                <li key={w.km}>
                  <span className="wp-km numeric">km {w.km}</span>
                  <div>
                    <strong>{w.name}</strong>
                    <p className="dim" style={{ margin: "4px 0 0" }}>{w.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="stack" style={{ ["--gap" as string]: "16px" }}>
          <div className="card">
            <dl className="facts">
              <dt>Trailhead</dt><dd>{t.trailhead}</dd>
              <dt>Parking</dt><dd>{t.parking}</dd>
              <dt>Footing</dt><dd>{t.footing}</dd>
              <dt>Best time</dt><dd>{t.bestTime}</dd>
              <dt>Access</dt><dd>{t.accessibility}</dd>
            </dl>
          </div>
          {marks.length > 0 && (
            <div className="panel">
              <p className="eyebrow">Look for</p>
              <ul className="plain">
                {marks.map((h) => <li key={h!.slug}><strong>{h!.name}</strong><br /><span className="small dim">{h!.where}</span></li>)}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {trailTips.length > 0 && (
        <section style={{ marginTop: 48 }}>
          <h2 className="h-sect">Insider tips</h2>
          <div className="grid" style={{ marginTop: 18 }}>
            {trailTips.map((x) => (
              <figure key={x.id} className="card" style={{ margin: 0 }}>
                <span className="pill">{CATEGORY_LABEL[x.category]}</span>
                <blockquote style={{ margin: "12px 0" }}>{x.text}</blockquote>
                <figcaption className="small dim">{x.author}, {x.role}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section style={{ marginTop: 48 }}>
        <div className="row-between">
          <h2 className="h-sect">From the register</h2>
          <Link className="btn btn-ghost" href={`/register?trail=${t.slug}#new`}>Post about this trail</Link>
        </div>
        <div className="stack" style={{ marginTop: 18, ["--gap" as string]: "12px" }}>
          {posts.length === 0 && <p className="dim">Nothing posted yet. Be the first.</p>}
          {posts.map((p) => (
            <Link key={p.id} href={`/register#${p.id}`} className="card card-link">
              <span className="pill">{KIND_LABEL[p.kind]}</span>
              <p className="h-card" style={{ fontFamily: "var(--font-display)", fontWeight: 600, margin: "8px 0 4px" }}>{p.title}</p>
              <p className="small faint" style={{ margin: 0 }}>{p.author} · {timeAgo(p.createdAt)} · {p.comments.length} replies</p>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 48 }}>
        <ParkMap initial={t.slug} />
      </section>

      <style>{`
        .wp { list-style: none; padding: 0; margin: 14px 0 0; display: grid; gap: 18px; border-left: 2px solid var(--line-strong); }
        .wp li { display: grid; grid-template-columns: 64px 1fr; gap: 12px; padding-left: 16px; position: relative; }
        .wp li::before { content: ""; position: absolute; left: -6px; top: 8px; width: 10px; height: 10px; border-radius: 50%; background: var(--accent); }
        .wp-km { font-size: var(--step--1); font-weight: 600; color: var(--accent); padding-top: 2px; }
        .facts { margin: 0; display: grid; gap: 4px; }
        .facts dt { font-size: var(--step--1); font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: var(--text-faint); margin-top: 10px; }
        .facts dt:first-child { margin-top: 0; }
        .facts dd { margin: 0; font-size: var(--step--1); }
        .plain { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
      `}</style>
    </div>
  );
}
