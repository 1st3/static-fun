import type { Metadata } from "next";
import Link from "next/link";
import { allPosts, timeAgo } from "@/lib/board";
import { KIND_LABEL } from "@/lib/board-meta";
import { trailBySlug } from "@/content/trails";
import { CommentForm, NewPostForm } from "@/components/register-forms";

export const metadata: Metadata = { title: "Trail register" };
export const dynamic = "force-dynamic";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ trail?: string; kind?: string }>;
}) {
  const { trail, kind } = await searchParams;
  const posts = allPosts().filter((p) => (!trail || p.trail === trail) && (!kind || p.kind === kind));
  const trailName = trail ? trailBySlug(trail)?.name : undefined;

  return (
    <div className="wrap section">
      <p className="eyebrow">Trail register</p>
      <h1 className="h-page">The logbook at the trailhead</h1>
      <p className="lede" style={{ margin: "14px 0 24px", maxWidth: "60ch" }}>
        No accounts, just a name. Sightings, conditions, questions and tide reports from people who
        were out there. Staff read it daily, but for a hazard, call the visitor centre too.
      </p>

      <div className="pill-row" style={{ marginBottom: 24 }}>
        <Link className={`pill ${!kind ? "pill-accent" : ""}`} href={trail ? `/register?trail=${trail}` : "/register"}>All</Link>
        {Object.entries(KIND_LABEL).map(([k, v]) => (
          <Link key={k} className={`pill ${kind === k ? "pill-accent" : ""}`}
            href={`/register?${trail ? `trail=${trail}&` : ""}kind=${k}`}>{v}</Link>
        ))}
        {trailName && <Link className="pill pill-sea" href="/register">✕ {trailName}</Link>}
      </div>

      <div className="grid-2" style={{ alignItems: "start" }}>
        <div className="stack" style={{ ["--gap" as string]: "14px" }}>
          {posts.length === 0 && <p className="dim">Nothing here yet.</p>}
          {posts.map((p) => (
            <article key={p.id} id={p.id} className="card">
              <div className="pill-row">
                <span className="pill">{KIND_LABEL[p.kind]}</span>
                {p.trail !== "park" && trailBySlug(p.trail) && (
                  <Link className="pill pill-sea" href={`/trails/${p.trail}`}>{trailBySlug(p.trail)!.name}</Link>
                )}
              </div>
              <h2 className="h-card" style={{ margin: "10px 0 6px" }}>{p.title}</h2>
              <p className="small faint">{p.author} · {timeAgo(p.createdAt)}</p>
              <p style={{ whiteSpace: "pre-wrap" }}>{p.body}</p>
              {p.comments.length > 0 && (
                <div className="stack" style={{ ["--gap" as string]: "10px", borderTop: "1px solid var(--line)", paddingTop: 14, marginTop: 14 }}>
                  {p.comments.map((c) => (
                    <div key={c.id}>
                      <p className="small faint" style={{ margin: 0 }}><strong style={{ color: "var(--text)" }}>{c.author}</strong> · {timeAgo(c.createdAt)}</p>
                      <p className="small" style={{ margin: "2px 0 0", whiteSpace: "pre-wrap" }}>{c.body}</p>
                    </div>
                  ))}
                </div>
              )}
              <CommentForm postId={p.id} />
            </article>
          ))}
        </div>
        <NewPostForm defaultTrail={trail} />
      </div>
    </div>
  );
}
