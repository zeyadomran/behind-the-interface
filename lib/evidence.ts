// The methodology's evidence vocabulary, shared by every finding, annotation
// and demonstration. "Illustration" marks this library's own teaching artwork.
export type EvidenceKind =
  | "observed"
  | "mixed"
  | "source-confirmed"
  | "hook-only"
  | "interpretation"
  | "illustration";

export const evidenceLabels: Record<EvidenceKind, string> = {
  observed: "Observed",
  mixed: "Observed + source",
  "source-confirmed": "Source-confirmed",
  "hook-only": "Hook only",
  interpretation: "Interpretation",
  illustration: "Illustration",
};

export const evidenceDescriptions: Record<EvidenceKind, string> = {
  observed:
    "I inspected the live page or exercised the control, at a recorded viewport.",
  mixed:
    "Seen in the browser and supported by public source code for the same behavior.",
  "source-confirmed":
    "Public HTML, CSS or JavaScript supports it. Source alone doesn't prove what renders.",
  "hook-only":
    "Markup suggests the behavior, but its implementation or outcome wasn't confirmed.",
  interpretation:
    "A design judgment about hierarchy, direction or usability. Not a measured result.",
  illustration:
    "An original demonstration made for this library. It explains an idea; it isn't evidence.",
};
