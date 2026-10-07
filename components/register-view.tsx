"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { KIND_LABEL } from "@/lib/board-meta";
import { timeAgo, useBoard } from "@/lib/board";
import { trailBySlug } from "@/content/trails";
import { Card, CardLink, Grid, Heading, Pill, PillRow, Stack, Text } from "@/ui";
import { CommentForm, NewPostForm } from "./register-forms";
import styles from "./register.module.css";

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
      <PillRow mb={24}>
        <Pill tone={!kind ? "accent" : "default"} href={trail ? `/register?trail=${trail}` : "/register"}>All</Pill>
        {Object.entries(KIND_LABEL).map(([k, v]) => (
          <Pill key={k} tone={kind === k ? "accent" : "default"}
            href={`/register?${trail ? `trail=${trail}&` : ""}kind=${k}`}>{v}</Pill>
        ))}
        {trailName && <Pill tone="sea" href="/register">✕ {trailName}</Pill>}
      </PillRow>

      <Grid variant="split" alignStart>
        <Stack gap={14} aria-busy={posts === null}>
          {posts && shown.length === 0 && <Text tone="dim">Nothing here yet.</Text>}
          {shown.map((p) => (
            <Card as="article" key={p.id} id={p.id}>
              <PillRow>
                <Pill>{KIND_LABEL[p.kind]}</Pill>
                {p.trail !== "park" && trailBySlug(p.trail) && (
                  <Pill tone="sea" href={`/trails/${p.trail}`}>{trailBySlug(p.trail)!.name}</Pill>
                )}
              </PillRow>
              <Heading level={2} size="card" mt={10} mb={6}>{p.title}</Heading>
              <Text size="sm" tone="faint">{p.author} · {timeAgo(p.createdAt)}</Text>
              <Text className={styles.body}>{p.body}</Text>
              {p.comments.length > 0 && (
                <Stack gap={10} className={styles.thread}>
                  {p.comments.map((c) => (
                    <div key={c.id}>
                      <Text size="sm" tone="faint" flush><strong className={styles.author}>{c.author}</strong> · {timeAgo(c.createdAt)}</Text>
                      <Text size="sm" mt={2} mb={0} className={styles.body}>{c.body}</Text>
                    </div>
                  ))}
                </Stack>
              )}
              <CommentForm postId={p.id} onSubmit={addComment} />
            </Card>
          ))}
        </Stack>
        <NewPostForm defaultTrail={trail} onSubmit={addPost} />
      </Grid>
    </>
  );
}

/** Compact list for the home page and trail pages. */
export function PostList({ trail, limit }: { trail?: string; limit?: number }) {
  const { posts } = useBoard();
  if (!posts) return <Text tone="dim" aria-busy="true">Loading…</Text>;
  const shown = posts.filter((p) => !trail || p.trail === trail).slice(0, limit);
  if (shown.length === 0) return <Text tone="dim">Nothing posted yet. Be the first.</Text>;
  return (
    <>
      {shown.map((p) => (
        <CardLink key={p.id} href={`/register#${p.id}`}>
          <Pill>{KIND_LABEL[p.kind]}</Pill>
          <Heading level={3} size="card" as="p" relaxed mt={8} mb={4}>{p.title}</Heading>
          <Text size="sm" tone="faint" flush>{p.author} · {timeAgo(p.createdAt)} · {p.comments.length} replies</Text>
        </CardLink>
      ))}
    </>
  );
}
