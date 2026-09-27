"use client";

import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  articleVisualData,
  captureDimensions,
  originalResearchDate,
  type SiteKey,
} from "@/lib/article-visual-data";
import { studyProfiles } from "@/lib/study-profiles";
import { withBasePath } from "@/lib/paths";
import { EvidenceBadge } from "./evidence-badge";

/**
 * The recorded desktop capture with numbered notes. Every note is printed in
 * the list; pins and the tour only connect a note to its place in the image.
 */
export function AnnotatedCapture({
  site,
  thesis,
}: {
  site: SiteKey;
  thesis: string;
}) {
  const id = useId();
  const data = articleVisualData[site];
  const notes = studyProfiles[site].captureNotes;
  const dimensions = captureDimensions[site].desktop;
  const [active, setActive] = useState(0);

  return (
    <figure
      className="story-playground story-annotated"
      aria-labelledby={`${id}-title`}
    >
      <figcaption className="story-playground-heading">
        <strong id={`${id}-title`}>Look where I looked.</strong>
        <span>The recorded desktop view, with notes from the research.</span>
      </figcaption>
      <blockquote className="story-thesis">{thesis}</blockquote>
      <div className="annotated-stage">
        <img
          src={withBasePath(data.screenshots.desktop.src)}
          alt={data.screenshots.desktop.alt}
          width={dimensions.width}
          height={dimensions.height}
          loading="lazy"
          decoding="async"
        />
        {notes.map((note, index) => (
          <button
            key={note.title}
            type="button"
            className="annotated-pin"
            style={{ left: `${note.x}%`, top: `${note.y}%` }}
            aria-pressed={active === index}
            aria-label={`Note ${index + 1}: ${note.title}`}
            aria-describedby={`${id}-note-${index}`}
            onClick={() => setActive(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="annotated-tour">
        <span className="story-playground-note">
          {data.name} desktop capture,{" "}
          {data.researchDate ?? originalResearchDate}
        </span>
        <button
          type="button"
          className="story-playground-action"
          onClick={() => setActive((active + 1) % notes.length)}
        >
          Next note <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>
      <ol className="annotated-notes">
        {notes.map((note, index) => (
          <li
            key={note.title}
            data-active={active === index}
            onPointerEnter={() => setActive(index)}
          >
            <span className="annotated-number" aria-hidden="true">
              {index + 1}
            </span>
            <div>
              <p className="annotated-title">{note.title}</p>
              <p id={`${id}-note-${index}`} className="annotated-text">
                {note.note}
              </p>
              <EvidenceBadge kind={note.evidence} describe />
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
