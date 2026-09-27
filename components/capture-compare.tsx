import { useId } from "react";
import {
  articleVisualData,
  captureDimensions,
  originalResearchDate,
  type SiteKey,
} from "@/lib/article-visual-data";
import { studyProfiles } from "@/lib/study-profiles";
import { withBasePath } from "@/lib/paths";

/**
 * Desktop and mobile captures side by side, because the comparison is the
 * point, plus what the research found changed between them.
 */
export function CaptureCompare({ site }: { site: SiteKey }) {
  const id = useId();
  const data = articleVisualData[site];
  const shifts = studyProfiles[site].mobileShift;

  return (
    <figure
      className="story-playground story-capture-compare"
      aria-labelledby={`${id}-title`}
    >
      <figcaption className="story-playground-heading">
        <strong id={`${id}-title`}>The recorded view.</strong>
        <span>Real captures, two compositions, one list of what changed.</span>
      </figcaption>
      <div className="capture-pair">
        {(["desktop", "mobile"] as const).map((viewport) => {
          const screenshot = data.screenshots[viewport];
          const dimensions = captureDimensions[site][viewport];
          return (
            <a
              key={viewport}
              className="capture-frame"
              data-viewport={viewport}
              href={withBasePath(screenshot.src)}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open the ${data.name} ${viewport} capture at full size (new tab)`}
            >
              <span className="capture-frame-label">
                {viewport === "desktop" ? "Desktop" : "Mobile"}
                <span>
                  {dimensions.width} × {dimensions.height}
                </span>
              </span>
              <img
                src={withBasePath(screenshot.src)}
                alt={screenshot.alt}
                width={dimensions.width}
                height={dimensions.height}
                loading="lazy"
                decoding="async"
              />
            </a>
          );
        })}
      </div>
      <dl className="capture-shifts">
        {shifts.map((shift) => (
          <div key={shift.label} data-kind={shift.label}>
            <dt>{shift.label}</dt>
            <dd>{shift.text}</dd>
          </div>
        ))}
      </dl>
      <div className="story-capture-links">
        <a
          href={withBasePath(data.screenshots.desktop.src)}
          target="_blank"
          rel="noreferrer"
        >
          Desktop full size <span aria-hidden="true">↗</span>
          <span className="story-visually-hidden"> (new tab)</span>
        </a>
        <a
          href={withBasePath(data.screenshots.mobile.src)}
          target="_blank"
          rel="noreferrer"
        >
          Mobile full size <span aria-hidden="true">↗</span>
          <span className="story-visually-hidden"> (new tab)</span>
        </a>
      </div>
      <p className="story-playground-footnote">
        Captured {data.researchDate ?? originalResearchDate}. Sizes describe the
        saved image files; mobile research used a 390 × 844 CSS-pixel viewport.
        Each frame records one moment, not the complete animation.
      </p>
    </figure>
  );
}
