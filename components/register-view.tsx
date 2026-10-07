"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { KIND_LABEL } from "@/lib/board-meta";
import { timeAgo, useBoard } from "@/lib/board";
import { trailBySlug } from "@/content/trails";
import { CommentForm, NewPostForm } from "./register-forms";

export function RegisterView() {
  const params = useSearchParams();
  const trail = params.get("trail") ?? undefined;
  const kind = params.get("kind") ?? undefined;
  const { posts, addPost, addComment } = useBoard();

  useEffect(() => {
    if (posts && location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
    // Only on first load of posts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts === null]);

  const shown = (posts ?? []).filter((p) => (!trail || p.trail === trail) && (!kind || p.kind === kind));
  const trailName = trail ? trailBySlug(trail)?.name : undefined;

  return (
    <>
      <div className="pill-row" style={{ marginBottom: 24 }}>
        <Link className={`pill ${!kind ? "pill-accent" : ""}`} href={trail ? `/register?trail=${trail}` : "/register"}>All</Link>
        {Object.entries(KIND_LABEL).map(([k, v]) => (
          <Link key={k} className={`pill ${kind === k ? "pill-accent" : ""}`}
            href={`/register?${trail ? `trail=${trail}&` : ""}kind=${k}`}>{v}</Link>
        ))}
        {trailName && <Link className="pill pill-sea" href="/register">✕ {trailName}</Link>}
      </div>

      <div className="grid-2" style={{ alignItems: "start" }}>
        <div className="stack" style={{ ["--gap" as string]: "14px" }} aria-busy={posts === null}>
          {posts && shown.length === 0 && <p className="dim">Nothing here yet.</p>}
          {shown.map((p) => (
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
              <CommentForm postId={p.id} onSubmit={addComment} />
            </article>
          ))}
        </div>
        <NewPostForm defaultTrail={trail} onSubmit={addPost} />
      </div>
    </>
  );
}

/** Compact list for the home page and trail pages. */
export function PostList({ trail, limit }: { trail?: string; limit?: number }) {
  const { posts } = useBoard();
  if (!posts) return <p className="dim" aria-busy="true">Loading…</p>;
  const shown = posts.filter((p) => !trail || p.trail === trail).slice(0, limit);
  if (shown.length === 0) return <p className="dim">Nothing posted yet. Be the first.</p>;
  return (
    <>
      {shown.map((p) => (
        <Link key={p.id} href={`/register#${p.id}`} className="card card-link">
          <span className="pill">{KIND_LABEL[p.kind]}</span>
          <p className="h-card" style={{ fontFamily: "var(--font-display)", fontWeight: 600, margin: "8px 0 4px" }}>{p.title}</p>
          <p className="small faint" style={{ margin: 0 }}>{p.author} · {timeAgo(p.createdAt)} · {p.comments.length} replies</p>
        </Link>
      ))}
    </>
  );
}
