import { ArrowUpRight } from "lucide-react";
import "@/app/source-credit.css";

export function SourceCredit({
  sites,
  className,
}: {
  sites: Array<{ name: string; url: string }>;
  className?: string;
}) {
  if (!sites.length) return null;

  return (
    <aside
      className={["source-credit", className].filter(Boolean).join(" ")}
      aria-label="Original website credits"
    >
      <p className="source-credit-label">
        {sites.length === 1 ? "Meet the original" : "Meet the originals"}
      </p>
      <div className="source-credit-links">
        {sites.map((site) => (
          <a
            key={site.url}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${site.name} (opens in new tab)`}
          >
            Visit {site.name}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        ))}
      </div>
      <p className="source-credit-note">
        Credit for the original {sites.length === 1 ? "website’s" : "websites’"}{" "}
        design and development belongs to {sites.length === 1 ? "its" : "their"}{" "}
        creators.
      </p>
    </aside>
  );
}
