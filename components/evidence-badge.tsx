import {
  evidenceDescriptions,
  evidenceLabels,
  type EvidenceKind,
} from "@/lib/evidence";

/** Shape, not color alone, distinguishes each kind of evidence. Square
 * geometry throughout, matching the rest of the system. */
export function EvidenceIcon({ kind }: { kind: EvidenceKind }) {
  return (
    <svg
      className="evidence-icon"
      viewBox="0 0 12 12"
      width="12"
      height="12"
      aria-hidden="true"
      focusable="false"
    >
      {kind === "observed" ? (
        <path d="M1.6 1.6h8.8v8.8H1.6Z" fill="currentColor" />
      ) : kind === "mixed" ? (
        <>
          <path
            d="M1.6 1.6h8.8v8.8H1.6Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path d="M1.6 1.6H6v8.8H1.6Z" fill="currentColor" />
        </>
      ) : kind === "source-confirmed" ? (
        <path
          d="M6 1.2 10.8 6 6 10.8 1.2 6Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      ) : kind === "hook-only" ? (
        <path
          d="M1.6 1.6h8.8v8.8H1.6Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="2.2 1.6"
        />
      ) : kind === "interpretation" ? (
        <path
          d="M6 1.6 10.6 10.2H1.4Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="miter"
        />
      ) : (
        <path
          d="M1.6 1.6h8.8v8.8H1.6ZM1.6 10.4 10.4 1.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      )}
    </svg>
  );
}

export function EvidenceBadge({
  kind,
  describe = false,
}: {
  kind: EvidenceKind;
  describe?: boolean;
}) {
  return (
    <span className="evidence-badge" data-evidence={kind}>
      <EvidenceIcon kind={kind} />
      <span>{evidenceLabels[kind]}</span>
      {describe && (
        <span className="sr-only">: {evidenceDescriptions[kind]}</span>
      )}
    </span>
  );
}
