import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cx } from "./cx";
import s from "./a11y.module.css";

/** Content for screen readers only. Use `as="label"` to hide a form label without leaving a gap in flex layouts. */
export function VisuallyHidden({
  as: Tag = "span",
  className,
  ...rest
}: ComponentPropsWithoutRef<"span"> & { as?: ElementType; htmlFor?: string }) {
  return <Tag className={cx(s.hidden, className)} {...rest} />;
}

/** First focusable element on the page; jumps past the header. */
export function SkipLink({ href = "#main", children }: { href?: string; children: React.ReactNode }) {
  return (
    <a className={s.skip} href={href}>
      {children}
    </a>
  );
}
