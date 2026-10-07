import Link from "next/link";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cx, withSpace, type SpaceProps } from "./cx";
import s from "./surface.module.css";

type Base = ComponentPropsWithoutRef<"div"> & { as?: ElementType } & SpaceProps;

/** A raised, bordered container. `accent` outlines it in the brand colour. */
export function Card({
  as: Tag = "div",
  raised,
  accent,
  mt,
  mb,
  className,
  style,
  ...rest
}: Base & { raised?: boolean; accent?: boolean }) {
  return (
    <Tag
      className={cx(s.card, raised && s.raised, accent && s.accent, className)}
      style={withSpace({ mt, mb }, style)}
      {...rest}
    />
  );
}

/** A whole-card link that lifts on hover. */
export function CardLink({
  href,
  className,
  ...rest
}: Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & { href: string }) {
  return <Link href={href} className={cx(s.card, s.link, className)} {...rest} />;
}

/** A quiet inset surface for asides and callouts. `accent` outlines it in the brand colour. */
export function Panel({
  as: Tag = "div",
  accent,
  mt,
  mb,
  className,
  style,
  ...rest
}: Base & { accent?: boolean }) {
  return (
    <Tag
      className={cx(s.panel, accent && s.accent, className)}
      style={withSpace({ mt, mb }, style)}
      {...rest}
    />
  );
}
