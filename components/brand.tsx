export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand-lockup">
      <svg aria-hidden="true" viewBox="0 0 100 100" className="brand-mark">
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M32 8H92V68H86V14H32Z M20 20H80V80H74V26H20Z M8 32H68V92H8Z M20.5 44.5H55.5V52.833L33 71.167H55.5V79.5H20.5V71.167L43 52.833H20.5Z"
        />
      </svg>
      <span className="brand-name">
        Interesting Designs
        <span className={compact ? "sr-only" : "brand-caption"}>
          UI / UX RESEARCH
        </span>
      </span>
    </span>
  );
}
