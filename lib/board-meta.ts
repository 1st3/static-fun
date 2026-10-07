export type PostKind = "sighting" | "conditions" | "question" | "note" | "tide";

export const KIND_LABEL: Record<PostKind, string> = {
  sighting: "Sighting",
  conditions: "Conditions",
  question: "Question",
  note: "Note",
  tide: "Tide report",
};
