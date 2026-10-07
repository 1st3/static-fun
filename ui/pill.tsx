import Link from "next/link";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cx, withSpace, type SpaceProps } from "./cx";
import s from "./pill.module.css";

export type PillTone = "default" | "accent" | "sea" | "spruce";

const toneClass = (tone: PillTone) => (tone === "default" ? undefined : s[tone]);

/** A compact label. Pass `href` to make it a link. */
export function Pill({
  tone = "default",
  href,
  className,
  children,
  ...rest
}: Omit<ComponentPropsWithoutRef<"span">, "href"> & { tone?: PillTone; href?: string }) {
  const cls = cx(s.pill, toneClass(tone), className);
  return href ? (
    <Link href={href} className={cls}>
      {children}
    </Link>
  ) : (
    <span className={cls} {...rest}>
      {children}
    </span>
  );
}

/** Wrapping row of pills. */
export function PillRow({
  as: Tag = "div",
  mt,
  mb,
  className,
  style,
  ...rest
}: ComponentPropsWithoutRef<"div"> & { as?: ElementType } & SpaceProps) {
  return <Tag className={cx(s.row, className)} style={withSpace({ mt, mb }, style)} {...rest} />;
}
