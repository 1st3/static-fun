import { useCallback, useEffect, useState } from "react";
import { registerSeed } from "@/content/register-seed";
import { KIND_LABEL, type PostKind } from "./board-meta";

export { KIND_LABEL };
export type { PostKind };

export type Comment = {
  id: string;
  author: string;
  body: string;
  createdAt: string;
};

export type Post = {
  id: string;
  author: string;
  /** A trail slug, or "park" for the whole-park board. */
  trail: string;
  kind: PostKind;
  title: string;
  body: string;
  createdAt: string;
  comments: Comment[];
};

const STORAGE_KEY = "fundy-register-v1";

/**
 * The site is a static export, so there is no server to hold posts. The
 * register is seeded from content and then lives in this browser's
 * localStorage; posts are visible only to the visitor who wrote them.
 */
function load(): Post[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Post[];
  } catch {}
  return structuredClone(registerSeed);
}

function save(posts: Post[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch {}
}

const newId = () =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

const clean = (s: unknown, max: number) =>
  typeof s === "string" ? s.trim().slice(0, max) : "";

const byNewest = (a: Post, b: Post) =>
  Date.parse(b.createdAt) - Date.parse(a.createdAt);

export type NewPost = {
  author: string;
  trail: string;
  kind: string;
  title: string;
  body: string;
};

/** Returns null until mounted, so server and first client render agree. */
export function useBoard() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => setPosts(load().sort(byNewest)), []);

  const commit = useCallback((next: Post[]) => {
    setPosts(next);
    save(next);
  }, []);

  const addPost = useCallback(
    (input: NewPost): { error?: string } => {
      const title = clean(input.title, 140);
      const body = clean(input.body, 4000);
      const kind = (Object.keys(KIND_LABEL) as PostKind[]).includes(
        input.kind as PostKind,
      )
        ? (input.kind as PostKind)
        : "note";

      if (title.length < 4) return { error: "Give the post a title." };
      if (body.length < 10) return { error: "Add a little more detail." };

      const post: Post = {
        id: newId(),
        author: clean(input.author, 60) || "Anonymous",
        trail: clean(input.trail, 60) || "park",
        kind,
        title,
        body,
        createdAt: new Date().toISOString(),
        comments: [],
      };
      commit([post, ...(posts ?? [])]);
      return {};
    },
    [posts, commit],
  );

  const addComment = useCallback(
    (postId: string, author: string, body: string): { error?: string } => {
      const text = clean(body, 2000);
      if (text.length < 2) return { error: "Write something first." };
      if (!posts?.some((p) => p.id === postId))
        return { error: "That post no longer exists." };

      commit(
        posts.map((p) =>
          p.id === postId
            ? {
                ...p,
                comments: [
                  ...p.comments,
                  {
                    id: newId(),
                    author: clean(author, 60) || "Anonymous",
                    body: text,
                    createdAt: new Date().toISOString(),
                  },
                ],
              }
            : p,
        ),
      );
      return {};
    },
    [posts, commit],
  );

  return { posts, addPost, addComment };
}

export function timeAgo(iso: string): string {
  const mins = Math.round((Date.now() - Date.parse(iso)) / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} h ago`;
  const days = Math.round(hrs / 24);
  if (days < 30) return `${days} d ago`;
  return `${Math.round(days / 30)} mo ago`;
}
