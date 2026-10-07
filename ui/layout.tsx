import type { CSSProperties, ComponentPropsWithoutRef, ElementType } from "react";
import { cx, withSpace, type SpaceProps } from "./cx";
import s from "./layout.module.css";

type El = ComponentPropsWithoutRef<"div"> & { as?: ElementType };
type Base = El & SpaceProps;

/** Centres content at the site width with the responsive side gutter. */
export function Container({
  as: Tag = "div",
  narrow,
  mt,
  mb,
  className,
  style,
  ...rest
}: Base & { narrow?: boolean }) {
  return (
    <Tag
      className={cx(s.container, narrow && s.narrow, className)}
      style={withSpace({ mt, mb }, style)}
      {...rest}
    />
  );
}

/** A full-width horizontal band with vertical breathing room. */
export function Section({
  as: Tag = "section",
  tight,
  className,
  ...rest
}: El & { tight?: boolean }) {
  return <Tag className={cx(tight ? s.tight : s.band, className)} {...rest} />;
}

/** A plain element that only adds margin; for spacing one block off its siblings. */
export function Box({ as: Tag = "div", mt, mb, style, ...rest }: Base) {
  return <Tag style={withSpace({ mt, mb }, style)} {...rest} />;
}

/** A page body: a section band holding a (optionally narrow) container. */
export function Page({
  as,
  narrow,
  children,
}: {
  as?: ElementType;
  narrow?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Section as="div">
      <Container as={as} narrow={narrow}>
        {children}
      </Container>
    </Section>
  );
}

/** Vertical rhythm: puts `gap` px between direct children. */
export function Stack({
  as: Tag = "div",
  gap = 16,
  mt,
  mb,
  className,
  style,
  ...rest
}: Base & { gap?: number }) {
  return (
    <Tag
      className={cx(s.stack, className)}
      style={withSpace({ mt, mb }, { ["--gap" as string]: `${gap}px`, ...style } as CSSProperties)}
      {...rest}
    />
  );
}

/** `cards` is a responsive auto-fill grid; `split` is two balanced columns. */
export function Grid({
  variant = "cards",
  alignStart,
  mt,
  mb,
  className,
  style,
  ...rest
}: Base & { variant?: "cards" | "split"; alignStart?: boolean }) {
  return (
    <div
      className={cx(variant === "split" ? s.split : s.grid, alignStart && s.alignStart, className)}
      style={withSpace({ mt, mb }, style)}
      {...rest}
    />
  );
}

/** Horizontal flow that wraps. `between` spreads ends apart; `buttons` is a tight action row. */
export function Row({
  variant = "default",
  mt,
  mb,
  className,
  style,
  ...rest
}: Base & { variant?: "default" | "between" | "buttons" }) {
  return (
    <div
      className={cx(
        variant === "between" ? s.between : variant === "buttons" ? s.buttons : s.row,
        className,
      )}
      style={withSpace({ mt, mb }, style)}
      {...rest}
    />
  );
}

/** The brand's tide-line gradient rule. */
export function TideLine() {
  return <hr className={s.tideline} />;
}
