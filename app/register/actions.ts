"use server";

import { revalidatePath } from "next/cache";
import { addComment, addPost } from "@/lib/board";

export type FormState = { error?: string; ok?: boolean };

export async function createPost(_: FormState, form: FormData): Promise<FormState> {
  const res = addPost({
    author: String(form.get("author") ?? ""),
    trail: String(form.get("trail") ?? ""),
    kind: String(form.get("kind") ?? ""),
    title: String(form.get("title") ?? ""),
    body: String(form.get("body") ?? ""),
  });
  if (res.error) return { error: res.error };
  revalidatePath("/register");
  revalidatePath("/");
  return { ok: true };
}

export async function createComment(_: FormState, form: FormData): Promise<FormState> {
  const res = addComment(
    String(form.get("postId") ?? ""),
    String(form.get("author") ?? ""),
    String(form.get("body") ?? ""),
  );
  if (res.error) return { error: res.error };
  revalidatePath("/register");
  return { ok: true };
}
