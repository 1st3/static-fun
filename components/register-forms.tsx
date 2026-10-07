"use client";

import { useActionState, useEffect, useRef } from "react";
import { createComment, createPost, type FormState } from "@/app/register/actions";
import { KIND_LABEL } from "@/lib/board-meta";
import { trails } from "@/content/trails";

const initial: FormState = {};

export function NewPostForm({ defaultTrail }: { defaultTrail?: string }) {
  const [state, action, pending] = useActionState(createPost, initial);
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => { if (state.ok) ref.current?.reset(); }, [state]);

  return (
    <form ref={ref} action={action} className="card stack" id="new" style={{ ["--gap" as string]: "14px" }}>
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
        <button className="btn" disabled={pending}>{pending ? "Posting…" : "Post"}</button>
        {state.error && <span className="form-error" role="alert">{state.error}</span>}
        {state.ok && <span className="small dim" role="status">Posted. Thank you.</span>}
      </div>
    </form>
  );
}

export function CommentForm({ postId }: { postId: string }) {
  const [state, action, pending] = useActionState(createComment, initial);
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => { if (state.ok) ref.current?.reset(); }, [state]);

  return (
    <form ref={ref} action={action} className="cform">
      <input type="hidden" name="postId" value={postId} />
      <input className="input" name="author" placeholder="Name" aria-label="Your name" maxLength={60} />
      <input className="input" name="body" placeholder="Add a reply…" aria-label="Reply" required minLength={2} maxLength={2000} />
      <button className="btn btn-ghost" disabled={pending}>{pending ? "…" : "Reply"}</button>
      {state.error && <span className="form-error" role="alert">{state.error}</span>}
      <style>{`.cform { display: grid; grid-template-columns: 140px 1fr auto; gap: 8px; margin-top: 14px; align-items: center; }
        .cform .form-error { grid-column: 1 / -1; }
        @media (max-width: 560px) { .cform { grid-template-columns: 1fr; } }`}</style>
    </form>
  );
}
