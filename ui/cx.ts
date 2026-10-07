import type { CSSProperties } from "react";

export const cx = (...parts: (string | false | null | undefined)[]) =>
  parts.filter(Boolean).join(" ");

/** Margin shorthand shared by the text and layout primitives, in px. */
export type SpaceProps = { mt?: number; mb?: number };

export function withSpace(
  { mt, mb }: SpaceProps,
  style?: CSSProperties,
): CSSProperties | undefined {
  if (mt === undefined && mb === undefined) return style;
  return {
    ...(mt !== undefined && { marginTop: mt }),
    ...(mb !== undefined && { marginBottom: mb }),
    ...style,
  };
}
