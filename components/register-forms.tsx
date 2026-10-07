"use client";

import { useState, type FormEvent } from "react";
import { KIND_LABEL } from "@/lib/board-meta";
import type { NewPost } from "@/lib/board";
import { trails } from "@/content/trails";

type Result = { error?: string };

export function NewPostForm({
  defaultTrail,
  onSubmit,
}: {
  defaultTrail?: string;
  onSubmit: (p: NewPost) => Result;
}) {
  const [msg, setMsg] = useState<{ error?: string; ok?: boolean }>({});

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const res = onSubmit({
      author: String(f.get("author") ?? ""),
      trail: String(f.get("trail") ?? ""),
      kind: String(f.get("kind") ?? ""),
      title: String(f.get("title") ?? ""),
      body: String(f.get("body") ?? ""),
    });
    if (res.error) return setMsg({ error: res.error });
    form.reset();
    setMsg({ ok: true });
  };

  return (
    <form onSubmit={submit} className="card stack" id="new" style={{ ["--gap" as string]: "14px" }}>
      <h2 className="h-card">Sign the register</h2>
      <div className="form-row">
        <label className="field"><span className="field-label">Your name</span>
          <input className="input" name="author" placeholder="Anonymous" maxLength={60} /></label>
        <label className="field"><span className="field-label">Kind</span>
          <select className="select" name="kind" defaultValue="note">
            {Object.entries(KIND_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select></label>
        <label className="field"><span className="field-label">Where</span>
          <select className="select" name="trail" defaultValue={defaultTrail ?? "park"}>
            <option value="park">Whole park</option>
            {trails.map((t) => <option key={t.slug} value={t.slug}>{t.name}</option>)}
          </select></label>
      </div>
      <label className="field"><span className="field-label">Title</span>
        <input className="input" name="title" required minLength={4} maxLength={140} /></label>
      <label className="field"><span className="field-label">What did you see? Add the date and time for conditions and tide reports.</span>
        <textarea className="textarea" name="body" required minLength={10} maxLength={4000} /></label>
      <div className="row">
        <button className="btn">Post</button>
        {msg.error && <span className="form-error" role="alert">{msg.error}</span>}
        {msg.ok && <span className="small dim" role="status">Posted.</span>}
      </div>
      <p className="small faint" style={{ margin: 0 }}>
        This demo has no server: your posts are saved in this browser only.
      </p>
    </form>
  );
}

export function CommentForm({
  postId,
  onSubmit,
}: {
  postId: string;
  onSubmit: (postId: string, author: string, body: string) => Result;
}) {
  const [error, setError] = useState<string>();

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const res = onSubmit(postId, String(f.get("author") ?? ""), String(f.get("body") ?? ""));
    setError(res.error);
    if (!res.error) form.reset();
  };

  return (
    <form onSubmit={submit} className="cform">
      <input className="input" name="author" placeholder="Name" aria-label="Your name" maxLength={60} />
      <input className="input" name="body" placeholder="Add a reply…" aria-label="Reply" required minLength={2} maxLength={2000} />
      <button className="btn btn-ghost">Reply</button>
      {error && <span className="form-error" role="alert">{error}</span>}
      <style>{`.cform { display: grid; grid-template-columns: 140px 1fr auto; gap: 8px; margin-top: 14px; align-items: center; }
        .cform .form-error { grid-column: 1 / -1; }
        @media (max-width: 560px) { .cform { grid-template-columns: 1fr; } }`}</style>
    </form>
  );
}
