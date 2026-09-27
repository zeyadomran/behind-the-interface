"use client";

import { useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { useLocation } from "react-router";
import { ArrowUpRight, LayoutGrid, List } from "lucide-react";
import Link from "@/components/link";
import { formatDate, type LibraryEntry } from "@/lib/library";
import { studyProfiles } from "@/lib/study-profiles";
import type { SiteKey } from "@/lib/article-visual-data";
import type { StoryChapterId } from "@/lib/study-stories";
import { StudyWordprint } from "./study-wordprint";

type Lens = "overview" | StoryChapterId;
type View = "grid" | "index";

const lensOptions: { id: Lens; label: string; question: string }[] = [
  {
    id: "overview",
    label: "Overview",
    question: "What is each website trying to be?",
  },
  {
    id: "idea",
    label: "Idea",
    question: "What single idea holds each design together?",
  },
  { id: "type", label: "Type", question: "How does type carry the identity?" },
  {
    id: "motion",
    label: "Motion",
    question: "What does movement explain?",
  },
  { id: "mobile", label: "Mobile", question: "What changes on a phone?" },
  {
    id: "takeaways",
    label: "Takeaways",
    question: "What is worth borrowing, and what deserves a question?",
  },
];

// The cross-site report answers each lens with one of its principles.
const reportLens: Record<StoryChapterId, { text: string; anchor: string }> = {
  idea: {
    text: "Choose a concept before choosing effects.",
    anchor: "themes-across-the-collection",
  },
  type: {
    text: "Assign each typographic voice a job.",
    anchor: "measured-type-hierarchy",
  },
  motion: {
    text: "Give motion an explanatory job.",
    anchor: "motion-should-have-a-reason",
  },
  mobile: {
    text: "Design mobile interactions deliberately.",
    anchor: "desktop--mobile-comparison",
  },
  takeaways: {
    text: "Audit the edges of the experience.",
    anchor: "principles-worth-taking-into-a-new-design",
  },
};

function isLens(value: string | null): value is Lens {
  return lensOptions.some((option) => option.id === value);
}

// The address holds the comparison, so a lens can be shared or linked to
// (/?lens=type#studies). Prerendered markup always shows the overview grid.
const searchListeners = new Set<() => void>();

function subscribeToSearch(listener: () => void) {
  searchListeners.add(listener);
  window.addEventListener("popstate", listener);
  return () => {
    searchListeners.delete(listener);
    window.removeEventListener("popstate", listener);
  };
}

function writeSearch(lens: Lens, view: View) {
  const url = new URL(window.location.href);
  if (lens === "overview") url.searchParams.delete("lens");
  else url.searchParams.set("lens", lens);
  if (view === "grid") url.searchParams.delete("view");
  else url.searchParams.set("view", view);
  window.history.replaceState(window.history.state, "", url);
  searchListeners.forEach((listener) => listener());
}

function withTransition(update: () => void) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("startViewTransition" in document)) return update();
  document.startViewTransition(() => flushSync(update));
}

/** What an entry says through the selected lens. */
function lensContent(entry: LibraryEntry, lens: Lens) {
  if (lens === "overview")
    return {
      kicker: entry.kind === "study" ? "At a glance" : "Across the collection",
      title: undefined,
      text: entry.description,
      href: entry.storyUrl ?? entry.url,
      action: entry.storyUrl ? "Open the story" : "Read the findings",
    };
  if (entry.kind === "report") {
    const principle = reportLens[lens];
    return {
      kicker: "The shared principle",
      title: principle.text,
      text: undefined,
      href: `${entry.url}#${principle.anchor}`,
      action: "Read the comparison",
    };
  }
  const index = entry.story?.chapters.findIndex((item) => item.id === lens);
  const chapter =
    index === undefined ? undefined : entry.story?.chapters[index];
  if (!chapter || index === undefined)
    return {
      kicker: "No story yet",
      title: undefined,
      text: "The complete research covers this study in full.",
      href: entry.url,
      action: "Read the research",
    };
  return {
    kicker: `Chapter 0${index + 1} · ${chapter.label}`,
    title: chapter.title,
    text: chapter.lesson,
    href: `${entry.storyUrl}#${chapter.id}`,
    action: `Read the ${chapter.label.toLowerCase()} chapter`,
  };
}

export function ResearchLibrary({ entries }: { entries: LibraryEntry[] }) {
  // Router navigations (such as a lens link in the Studies menu) re-render
  // this component, and the snapshot below then reads the new address.
  useLocation();
  const search = useSyncExternalStore(
    subscribeToSearch,
    () => window.location.search,
    () => "",
  );
  const params = new URLSearchParams(search);
  const requested = params.get("lens");
  const lens: Lens = isLens(requested) ? requested : "overview";
  const view: View = params.get("view") === "index" ? "index" : "grid";
  const studies = entries.filter((entry) => entry.kind === "study");
  const reports = entries.filter((entry) => entry.kind === "report");
  const question = lensOptions.find((option) => option.id === lens)!.question;

  function chooseLens(next: Lens) {
    writeSearch(next, view);
  }

  function chooseView(next: View) {
    withTransition(() => writeSearch(lens, next));
  }

  return (
    <section
      id="studies"
      className="library-section"
      aria-labelledby="library-heading"
    >
      <span id="library" aria-hidden="true" />
      <div className="section-intro">
        <p className="section-eyebrow">
          <span className="tiny-square" aria-hidden="true" /> 01 · The studies
        </p>
        <h2 id="library-heading">Read by site, or by question.</h2>
        <p>
          {studies.length} websites, five chapters each. Open a study to read it
          end to end, or pick a lens to compare one chapter across all of them.
        </p>
      </div>

      <div className="library-toolbar">
        <div className="lens-switch" role="group" aria-label="Compare by">
          {lensOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={lens === option.id}
              onClick={() => chooseLens(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="view-switch" role="group" aria-label="Layout">
          <button
            type="button"
            aria-pressed={view === "grid"}
            onClick={() => chooseView("grid")}
          >
            <LayoutGrid size={16} strokeWidth={1.5} aria-hidden="true" /> Grid
          </button>
          <button
            type="button"
            aria-pressed={view === "index"}
            onClick={() => chooseView("index")}
          >
            <List size={16} strokeWidth={1.5} aria-hidden="true" /> Index
          </button>
        </div>
      </div>
      <p className="lens-question" aria-live="polite">
        <span>Question</span> {question}
      </p>

      {view === "grid" ? (
        <div className="study-grid" data-lens={lens}>
          {[...studies, ...reports].map((entry) => {
            const content = lensContent(entry, lens);
            return (
              <article
                key={entry.slug}
                className="study-card"
                data-kind={entry.kind}
                data-site={entry.slug}
              >
                <StudyWordprint visual={entry.visual} title={entry.title} />
                <div className="study-card-body">
                  <div className="study-card-meta">
                    <span className="study-card-number">
                      {entry.number ?? "All"}
                    </span>
                    <span>
                      {entry.kind === "study"
                        ? "Website study"
                        : "Research findings"}
                    </span>
                    <time dateTime={entry.date}>{formatDate(entry.date)}</time>
                    {entry.newest && <span className="new-chip">New</span>}
                  </div>
                  <h3 data-inspect="Card title">
                    <Link href={entry.storyUrl ?? entry.url}>
                      {entry.title}
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  </h3>
                  <div className="study-card-lens" key={lens}>
                    <p className="study-card-kicker">{content.kicker}</p>
                    {content.title && (
                      <p className="study-card-lens-title">{content.title}</p>
                    )}
                    {content.text && (
                      <p className="study-card-text">{content.text}</p>
                    )}
                  </div>
                  <div className="study-card-links">
                    {lens !== "overview" && (
                      <Link className="study-card-primary" href={content.href}>
                        {content.action}
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </Link>
                    )}
                    {entry.storyUrl && (
                      <Link href={entry.url}>
                        Read research
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <IndexTable entries={[...studies, ...reports]} lens={lens} />
      )}
    </section>
  );
}

function IndexTable({
  entries,
  lens,
}: {
  entries: LibraryEntry[];
  lens: Lens;
}) {
  const columns =
    lens === "overview"
      ? ["Style", "Core idea", "Watch for"]
      : ["Chapter", "Lesson"];
  return (
    <div className="study-index" data-lens={lens}>
      <table>
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Website</th>
            {columns.map((column) => (
              <th scope="col" key={column}>
                {column}
              </th>
            ))}
            <th scope="col">Researched</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => {
            const profile = studyProfiles[entry.slug as SiteKey];
            const content = lensContent(entry, lens);
            const cells =
              lens === "overview"
                ? profile
                  ? [profile.style, profile.idea, profile.tension]
                  : [entry.description, "", ""]
                : [content.title ?? content.kicker, content.text ?? ""];
            return (
              <tr key={entry.slug} data-site={entry.slug}>
                <td data-label="No.">
                  <span className="study-index-swatch" aria-hidden="true" />
                  {entry.number ?? "All"}
                </td>
                <th scope="row" data-label="Website">
                  <Link
                    href={
                      lens === "overview"
                        ? (entry.storyUrl ?? entry.url)
                        : content.href
                    }
                  >
                    {entry.title}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </th>
                {cells.map((cell, index) => (
                  <td key={columns[index]} data-label={columns[index]}>
                    {cell || "·"}
                  </td>
                ))}
                <td data-label="Researched">
                  <time dateTime={entry.date}>{formatDate(entry.date)}</time>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
