import type { ComponentPropsWithoutRef } from "react";
import { cx } from "./cx";
import s from "./form.module.css";

/** A labelled control. Wrap exactly one Input, Textarea or Select. */
export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className={s.field}>
      <span className={s.label}>{label}</span>
      {children}
    </label>
  );
}

export function Input({ className, ...rest }: ComponentPropsWithoutRef<"input">) {
  return <input className={cx(s.control, className)} {...rest} />;
}

export function Textarea({ className, ...rest }: ComponentPropsWithoutRef<"textarea">) {
  return <textarea className={cx(s.control, s.textarea, className)} {...rest} />;
}

/** `inline` sizes the select to its content instead of filling the row. */
export function Select({
  inline,
  className,
  ...rest
}: ComponentPropsWithoutRef<"select"> & { inline?: boolean }) {
  return <select className={cx(s.control, inline && s.auto, className)} {...rest} />;
}

/** Equal-width responsive row of fields. */
export function FormRow({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
  return <div className={cx(s.row, className)} {...rest} />;
}

export function FormError({ className, ...rest }: ComponentPropsWithoutRef<"span">) {
  return <span className={cx(s.error, className)} role="alert" {...rest} />;
}
