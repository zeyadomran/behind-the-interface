"use client";

import { useId, useState, type CSSProperties } from "react";
import {
  articleVisualData,
  originalResearchDate,
  type SiteKey,
} from "@/lib/article-visual-data";
import { ViewportControls, type Viewport } from "./story-playgrounds";

function pixels(value: number | "normal" | null) {
  return value === null
    ? "Not displayed"
    : value === "normal"
      ? "normal"
      : `${Number(value.toFixed(2))}px`;
}

function roleName(label: string, site: string) {
  const first = site.split(" ")[0];
  const trimmed = label.replace(new RegExp(`^(${site}|${first})\\s+`, "i"), "");
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

/**
 * Each measured role, set at its recorded pixel size in this library's
 * typeface. Switching viewport resizes every role at once, so the chapter's
 * point is visible: some roles shrink, some hold, one grows, one disappears.
 */
export function TypeRuler({ site }: { site: SiteKey }) {
  const id = useId();
  const data = articleVisualData[site];
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [selected, setSelected] = useState(0);
  const role = data.typography[selected] ?? data.typography[0];

  return (
    <figure
      className="story-playground story-type-ruler"
      aria-labelledby={`${id}-title`}
    >
      <figcaption className="story-playground-heading">
        <strong id={`${id}-title`}>Type, at recorded size.</strong>
        <span>
          Every measured {data.name} role, drawn at its recorded pixel size.
        </span>
      </figcaption>
      <div className="story-playground-toolbar">
        <ViewportControls
          name={data.name}
          context="typography"
          selected={viewport}
          onChange={setViewport}
        />
        <span className="story-playground-note" aria-live="polite">
          {viewport === "desktop" ? "1440 × 1000" : "390 × 844"} viewport
        </span>
      </div>
      <ol className="type-ruler" data-viewport={viewport}>
        {data.typography.map((item, index) => {
          const measure = item[viewport];
          const missing = measure.size === null;
          // A line box smaller than the letters is part of the finding (Arkon's
          // interlocking script), so reserve room for the overflow and tint
          // the recorded line box instead of cropping the glyphs.
          const overflow =
            typeof measure.lineHeight === "number" && measure.size !== null
              ? Math.max(0, (measure.size - measure.lineHeight) / 2)
              : 0;
          return (
            <li
              key={item.label}
              data-selected={selected === index}
              data-missing={missing || undefined}
            >
              <button
                type="button"
                className="type-ruler-row"
                aria-pressed={selected === index}
                onClick={() => setSelected(index)}
              >
                <span className="type-ruler-meta">
                  <span className="type-ruler-name">
                    {roleName(item.label, data.name)}
                  </span>
                  <span className="type-ruler-family">{item.family}</span>
                  <span className="type-ruler-value">
                    {missing
                      ? "Not displayed"
                      : `${pixels(measure.size)} / ${pixels(measure.lineHeight)}`}
                  </span>
                </span>
                <span
                  className="type-ruler-specimen"
                  aria-hidden="true"
                  style={
                    {
                      "--size": missing ? "0px" : `${measure.size}px`,
                      "--leading":
                        measure.lineHeight === null ||
                        measure.lineHeight === "normal"
                          ? "normal"
                          : `${measure.lineHeight}px`,
                      "--overflow": `${overflow}px`,
                    } as CSSProperties
                  }
                >
                  {roleName(item.label, data.name)}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <div className="story-type-readout" aria-live="polite" aria-atomic="true">
        <p className="story-playground-insight">{role.note}.</p>
        <p className="story-playground-note">
          {roleName(role.label, data.name)}: desktop {pixels(role.desktop.size)}{" "}
          → mobile {pixels(role.mobile.size)}. Recorded source family:{" "}
          {role.family}.
        </p>
      </div>
      <p className="story-playground-footnote">
        Measured at 1440 × 1000 desktop and 390 × 844 mobile,{" "}
        {data.researchDate ?? originalResearchDate}. Specimens use this
        library’s PP Neue Montréal at the recorded size and leading, not the
        source typeface; wide words are cropped at the frame’s edge.
      </p>
    </figure>
  );
}
