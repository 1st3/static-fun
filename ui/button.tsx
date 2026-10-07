import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cx } from "./cx";
import s from "./button.module.css";

type Variant = "primary" | "ghost";

const classes = (variant: Variant, className?: string) =>
  cx(s.btn, variant === "ghost" && s.ghost, className);

/** A pill-shaped action button. */
export function Button({
  variant = "primary",
  className,
  ...rest
}: ComponentPropsWithoutRef<"button"> & { variant?: Variant }) {
  return <button className={classes(variant, className)} {...rest} />;
}

/** The same shape as Button, navigating to another page. */
export function ButtonLink({
  variant = "primary",
  className,
  ...rest
}: ComponentPropsWithoutRef<typeof Link> & { variant?: Variant }) {
  return <Link className={classes(variant, className)} {...rest} />;
}
