import fs from "node:fs";
import path from "node:path";
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

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "register.json");

/**
 * Posts live in a JSON file so the board survives a dev-server restart. On a
 * read-only filesystem the write silently fails and the in-memory copy carries
 * the session, which is the right trade for a demo deployment.
 */
// Next bundles pages and server actions separately, so module state would be
// duplicated per bundle; globalThis is the one copy they all see.
const g = globalThis as unknown as { __fundyBoard?: Post[] };

function load(): Post[] {
  if (g.__fundyBoard) return g.__fundyBoard;
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    g.__fundyBoard = JSON.parse(raw) as Post[];
  } catch {
    g.__fundyBoard = structuredClone(registerSeed);
    persist();
  }
  return g.__fundyBoard!;
}

function persist() {
  if (!g.__fundyBoard) return;
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(g.__fundyBoard, null, 2));
  } catch {
    // Read-only filesystem; the in-memory copy is still authoritative.
  }
}

const newId = () =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

export function allPosts(): Post[] {
  return [...load()].sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
  );
}

export function postsFor(trail: string): Post[] {
  return allPosts().filter((p) => p.trail === trail);
}

export function getPost(id: string): Post | undefined {
  return load().find((p) => p.id === id);
}

export function recentPosts(limit: number): Post[] {
  return allPosts().slice(0, limit);
}

export function commentCount(): number {
  return load().reduce((n, p) => n + p.comments.length, 0);
}

const clean = (s: unknown, max: number) =>
  typeof s === "string" ? s.trim().slice(0, max) : "";

export type NewPost = {
  author: string;
  trail: string;
  kind: string;
  title: string;
  body: string;
};

export function addPost(input: NewPost): { post?: Post; error?: string } {
  const author = clean(input.author, 60) || "Anonymous";
  const title = clean(input.title, 140);
  const body = clean(input.body, 4000);
  const trail = clean(input.trail, 60) || "park";
  const kind = (
    ["sighting", "conditions", "question", "note", "tide"] as const
  ).includes(input.kind as PostKind)
    ? (input.kind as PostKind)
    : "note";

  if (title.length < 4) return { error: "Give the post a title." };
  if (body.length < 10) return { error: "Add a little more detail." };

  const post: Post = {
    id: newId(),
    author,
    trail,
    kind,
    title,
    body,
    createdAt: new Date().toISOString(),
    comments: [],
  };
  load().unshift(post);
  persist();
  return { post };
}

export function addComment(
  postId: string,
  author: string,
  body: string,
): { comment?: Comment; error?: string } {
  const post = getPost(postId);
  if (!post) return { error: "That post no longer exists." };

  const text = clean(body, 2000);
  if (text.length < 2) return { error: "Write something first." };

  const comment: Comment = {
    id: newId(),
    author: clean(author, 60) || "Anonymous",
    body: text,
    createdAt: new Date().toISOString(),
  };
  post.comments.push(comment);
  persist();
  return { comment };
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - Date.parse(iso);
  const mins = Math.round(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} h ago`;
  const days = Math.round(hrs / 24);
  if (days < 30) return `${days} d ago`;
  const months = Math.round(days / 30);
  return `${months} mo ago`;
}
