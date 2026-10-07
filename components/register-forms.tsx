"use client";

import { useState, type FormEvent } from "react";
import { KIND_LABEL } from "@/lib/board-meta";
import type { NewPost } from "@/lib/board";
import { trails } from "@/content/trails";
import { Button, Card, Field, FormError, FormRow, Heading, Input, Row, Select, Stack, Text, Textarea } from "@/ui";
import styles from "./register.module.css";

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
    <Card id="new">
      <form onSubmit={submit}>
        <Stack gap={14}>
          <Heading level={2} size="card">Sign the register</Heading>
          <FormRow>
            <Field label="Your name"><Input name="author" placeholder="Anonymous" maxLength={60} /></Field>
            <Field label="Kind">
              <Select name="kind" defaultValue="note">
                {Object.entries(KIND_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </Select>
            </Field>
            <Field label="Where">
              <Select name="trail" defaultValue={defaultTrail ?? "park"}>
                <option value="park">Whole park</option>
                {trails.map((t) => <option key={t.slug} value={t.slug}>{t.name}</option>)}
              </Select>
            </Field>
          </FormRow>
          <Field label="Title"><Input name="title" required minLength={4} maxLength={140} /></Field>
          <Field label="What did you see? Add the date and time for conditions and tide reports.">
            <Textarea name="body" required minLength={10} maxLength={4000} />
          </Field>
          <Row>
            <Button>Post</Button>
            {msg.error && <FormError>{msg.error}</FormError>}
            {msg.ok && <Text as="span" size="sm" tone="dim" role="status">Posted.</Text>}
          </Row>
          <Text size="sm" tone="faint" flush>
            This demo has no server: your posts are saved in this browser only.
          </Text>
        </Stack>
      </form>
    </Card>
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
    <form onSubmit={submit} className={styles.reply}>
      <Input name="author" placeholder="Name" aria-label="Your name" maxLength={60} />
      <Input name="body" placeholder="Add a reply…" aria-label="Reply" required minLength={2} maxLength={2000} />
      <Button variant="ghost">Reply</Button>
      {error && <FormError>{error}</FormError>}
    </form>
  );
}
