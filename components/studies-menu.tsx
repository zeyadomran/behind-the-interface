"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocation } from "react-router";
import { ArrowUpRight, ChevronDown, Menu as MenuIcon } from "lucide-react";
import Link from "@/components/link";
import { getLibraryEntries } from "@/lib/library";
import { studyProfiles } from "@/lib/study-profiles";
import type { SiteKey } from "@/lib/article-visual-data";
import { InspectToggle } from "./inspect-mode";
import { NotebookButton } from "./notebook";

export const lenses = [
  { id: "idea", label: "Idea" },
  { id: "type", label: "Type" },
  { id: "motion", label: "Motion" },
  { id: "mobile", label: "Mobile" },
  { id: "takeaways", label: "Takeaways" },
] as const;

/**
 * A disclosure, not a modal: the panel follows its button in reading order,
 * Escape and outside clicks close it, and navigation always resets it.
 */
export function StudiesMenu() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const { key } = useLocation();
  const [openedAt, setOpenedAt] = useState(key);
  const entries = getLibraryEntries();
  const studies = entries.filter((entry) => entry.kind === "study");
  const reports = entries.filter((entry) => entry.kind === "report");

  // Any navigation, including a chapter link on the current page, closes it.
  if (openedAt !== key) {
    setOpenedAt(key);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panel.current?.contains(target) && !button.current?.contains(target))
        setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div className="studies-menu" data-open={open}>
      <button
        ref={button}
        type="button"
        className="studies-menu-button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <MenuIcon
          className="studies-menu-button-icon"
          size={18}
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <span className="studies-menu-button-wide">Studies</span>
        <span className="studies-menu-button-narrow">Menu</span>
        <ChevronDown
          className="studies-menu-button-chevron"
          size={15}
          strokeWidth={1.6}
          aria-hidden="true"
        />
      </button>
      <div
        ref={panel}
        id={panelId}
        className="studies-menu-panel"
        hidden={!open}
        data-inspect-ignore=""
      >
        <div className="studies-menu-inner">
          <div className="studies-menu-heading">
            <p>Read by site</p>
            <Link href="/#studies">
              All studies <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <ul className="studies-menu-grid">
            {studies.map((entry) => {
              const profile = studyProfiles[entry.slug as SiteKey];
              return (
                <li key={entry.slug} data-site={entry.slug}>
                  <Link
                    className="studies-menu-study"
                    href={entry.storyUrl ?? entry.url}
                  >
                    <span className="studies-menu-swatch" aria-hidden="true" />
                    <span className="studies-menu-number">{entry.number}</span>
                    <strong>
                      {entry.title}
                      {entry.newest && <span className="new-chip">New</span>}
                    </strong>
                    {profile && (
                      <span className="studies-menu-style">
                        {profile.style}
                      </span>
                    )}
                  </Link>
                  <div className="studies-menu-paths">
                    {entry.story && (
                      <ol aria-label={`${entry.title} story chapters`}>
                        {entry.story.chapters.map((chapter, index) => (
                          <li key={chapter.id}>
                            <Link
                              href={`/studies/${entry.slug}/#${chapter.id}`}
                            >
                              <span aria-hidden="true">0{index + 1}</span>{" "}
                              {chapter.label}
                            </Link>
                          </li>
                        ))}
                      </ol>
                    )}
                    <Link className="studies-menu-research" href={entry.url}>
                      Research
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="studies-menu-footer">
            <div className="studies-menu-lenses">
              <p>Read by question</p>
              <ul>
                {lenses.map((lens) => (
                  <li key={lens.id}>
                    <Link href={`/?lens=${lens.id}#studies`}>
                      {lens.label} across every study
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <ul className="studies-menu-more">
              {reports.map((report) => (
                <li key={report.slug}>
                  <Link href={report.url}>{report.title}</Link>
                </li>
              ))}
              <li>
                <Link href="/docs/methodology/">How the research works</Link>
              </li>
              <li className="studies-menu-portfolio">
                <a href="https://zeyadomran.com">
                  Zeyad’s portfolio{" "}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
          <div className="studies-menu-tools">
            <InspectToggle />
            <NotebookButton />
          </div>
        </div>
      </div>
    </div>
  );
}
