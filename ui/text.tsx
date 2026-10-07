import Link from "next/link";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cx, withSpace, type SpaceProps } from "./cx";
import s from "./text.module.css";

type Base = ComponentPropsWithoutRef<"p"> & { as?: ElementType } & SpaceProps;

/** Small uppercase label above a heading. */
export function Eyebrow({ as: Tag = "p", mt, mb, className, style, ...rest }: Base) {
  return <Tag className={cx(s.eyebrow, className)} style={withSpace({ mt, mb }, style)} {...rest} />;
}

export type HeadingSize = "hero" | "page" | "section" | "card";

/** The display-serif heading. Visual `size` is independent of the semantic `level`. */
export function Heading({
  level,
  size,
  mt,
  mb,
  className,
  style,
  as,
  relaxed,
  ...rest
}: Omit<ComponentPropsWithoutRef<"h2">, "children"> &
  SpaceProps & {
    level: 1 | 2 | 3 | 4;
    size: HeadingSize;
    as?: ElementType;
    /** Body line-height and wrapping, for headings that sit inside running text lists. */
    relaxed?: boolean;
    children?: React.ReactNode;
  }) {
  const Tag: ElementType = as ?? `h${level}`;
  return (
    <Tag
      className={cx(s.heading, s[size], relaxed && s.relaxed, className)}
      style={withSpace({ mt, mb }, style)}
      {...rest}
    />
  );
}

/** Intro paragraph under a page heading. `measure` caps the line length. */
export function Lede({
  measure,
  mt,
  mb,
  className,
  style,
  ...rest
}: ComponentPropsWithoutRef<"p"> & SpaceProps & { measure?: string }) {
  return (
    <p
      className={cx(s.lede, className)}
      style={withSpace({ mt, mb }, measure ? { maxWidth: measure, ...style } : style)}
      {...rest}
    />
  );
}

export type Tone = "default" | "dim" | "faint";

/** Body text with tone and size variants. */
export function Text({
  as: Tag = "p",
  tone = "default",
  size = "base",
  numeric,
  flush,
  mt,
  mb,
  className,
  style,
  ...rest
}: Base & { tone?: Tone; size?: "base" | "sm"; numeric?: boolean; flush?: boolean }) {
  return (
    <Tag
      className={cx(
        tone === "dim" && s.dim,
        tone === "faint" && s.faint,
        size === "sm" && s.small,
        numeric && s.numeric,
        flush && s.flush,
        className,
      )}
      style={withSpace({ mt, mb }, style)}
      {...rest}
    />
  );
}

/** Long-form reading text. Paragraph children get comfortable spacing. */
export function Prose({
  as: Tag = "div",
  mt,
  mb,
  className,
  style,
  ...rest
}: Base) {
  return <Tag className={cx(s.prose, className)} style={withSpace({ mt, mb }, style)} {...rest} />;
}

export function Quote({ className, ...rest }: ComponentPropsWithoutRef<"blockquote">) {
  return <blockquote className={cx(s.quote, className)} {...rest} />;
}

/** An in-text link to a page on this site. */
export function TextLink({
  size = "base",
  className,
  ...rest
}: ComponentPropsWithoutRef<typeof Link> & { size?: "base" | "sm" }) {
  return <Link className={cx(size === "sm" && s.small, className)} {...rest} />;
}
