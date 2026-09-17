"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import { StudyWordprint } from "./study-wordprint";

export interface ResearchSummary {
  title: string;
  description: string;
  url: string;
  storyUrl?: string;
  date: string;
  tags: string[];
  sites: string[];
  visual?: string;
  kind: "study" | "report";
}

export function ResearchLibrary({ entries }: { entries: ResearchSummary[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All research");
  const tags = useMemo(
    () => [...new Set(entries.flatMap((study) => study.tags))].sort(),
    [entries],
  );
  const filtered = entries.filter(
    (study) =>
      (tag === "All research" || study.tags.includes(tag)) &&
      `${study.title} ${study.description} ${study.tags.join(" ")} ${study.sites.join(" ")}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );

  return (
    <section
      id="library"
      className="library-section"
      aria-labelledby="library-heading"
    >
      <div className="section-topline">
        <span className="eyebrow">
          <span className="tiny-square" /> 01 / The library
        </span>
        <span className="eyebrow">Independent observations</span>
      </div>
      <div className="library-heading-row">
        <h2 id="library-heading">Looking closer.</h2>
        <label className="library-filter">
          <Search size={17} aria-hidden="true" />
          <span className="sr-only">Filter research</span>
          <input
            type="search"
            placeholder="Find research…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>
      <div
        className="filter-row"
        role="group"
        aria-label="Filter by research topic"
      >
        {["All research", ...tags].map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={tag === item}
            onClick={() => setTag(item)}
            className="filter-chip"
          >
            {item}
          </button>
        ))}
      </div>
      <p className="results-count" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "article" : "articles"}
        {query || tag !== "All research" ? " found" : " in the notebook"}
      </p>
      <div className="study-list">
        {filtered.map((study) => (
          <article key={study.url} className="study-entry">
            <div className="study-number" aria-hidden="true">
              {String(entries.indexOf(study) + 1).padStart(2, "0")}
            </div>
            <div className="study-copy">
              <div className="study-meta">
                <time dateTime={study.date}>{formatDate(study.date)}</time>
                <span>
                  {study.kind === "study"
                    ? "Website study"
                    : "Research findings"}
                </span>
              </div>
              <h3>
                <Link href={study.storyUrl ?? study.url}>
                  {study.title}
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </h3>
              <p>{study.description}</p>
              <div className="study-tags">
                {study.tags.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              {study.storyUrl && (
                <div className="study-reading-paths">
                  <Link href={study.storyUrl}>
                    Explore the story{" "}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                  <Link href={study.url}>
                    Read research <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              )}
            </div>
            <StudyWordprint visual={study.visual} title={study.title} />
          </article>
        ))}
        {filtered.length === 0 && (
          <div className="empty-state">
            <h3>No research matches yet.</h3>
            <p>Try a different term or return to the full notebook.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setTag("All research");
              }}
            >
              Clear filters <X size={15} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
