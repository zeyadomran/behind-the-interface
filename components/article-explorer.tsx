"use client";

import { useId, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Monitor,
  MousePointer2,
  ScanEye,
  Smartphone,
  Type,
} from "lucide-react";
import {
  articleVisualData,
  type ArticleVisualData,
  type SiteKey,
} from "@/lib/article-visual-data";
import { withBasePath } from "@/lib/paths";

type View = "screens" | "type" | "interactions";
const views = [
  { value: "screens", label: "Viewports", icon: ScanEye },
  { value: "type", label: "Type scale", icon: Type },
  { value: "interactions", label: "Interactions", icon: MousePointer2 },
] as const;
const evidenceLabels = {
  observed: "Observed",
  "source-confirmed": "Source-confirmed",
  "hook-only": "Hook only",
  mixed: "Observed + source",
};

export function ArticleExplorer({
  site,
  initialView = "screens",
}: {
  site?: SiteKey;
  initialView?: View;
}) {
  const id = useId();
  const [selectedSite, setSelectedSite] = useState<SiteKey>(site ?? "ace");
  const [view, setView] = useState<View>(initialView);
  const data = articleVisualData[site ?? selectedSite];

  return (
    <figure
      className="article-visual not-prose"
      aria-labelledby={`${id}-title`}
      data-article-visual={site ?? "collection"}
    >
      <figcaption className="visual-header">
        <div>
          <span className="visual-eyebrow">Interactive study</span>
          <span className="visual-title" id={`${id}-title`}>
            {site ? `Look closer at ${data.name}.` : "Compare the collection."}
          </span>
        </div>
        <span className="visual-edition">Sep 2026</span>
      </figcaption>

      {!site && (
        <label
          className="visual-field visual-site-field"
          htmlFor={`${id}-site`}
        >
          <span>Website</span>
          <select
            id={`${id}-site`}
            value={selectedSite}
            onChange={(event) => setSelectedSite(event.target.value as SiteKey)}
          >
            {Object.entries(articleVisualData).map(([key, item]) => (
              <option key={key} value={key}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      )}

      <div
        className="visual-modes"
        role="group"
        aria-label="Choose evidence view"
      >
        {views.map(({ value, label, icon: Icon }) => (
          <button
            type="button"
            key={value}
            aria-pressed={view === value}
            onClick={() => setView(value)}
          >
            <Icon size={16} aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>

      <div className="visual-body" key={`${site ?? selectedSite}-${view}`}>
        {view === "screens" && <ViewportComparison data={data} />}
        {view === "type" && <TypographyComparison data={data} />}
        {view === "interactions" && <InteractionComparison data={data} />}
      </div>
      <div className="visual-footer">
        <span className="visual-dot" aria-hidden="true" />
        <span>
          Research captured September 15–16, 2026. Full evidence continues
          below.
        </span>
      </div>
    </figure>
  );
}

function ViewportComparison({ data }: { data: ArticleVisualData }) {
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const screenshot = data.screenshots[viewport];
  return (
    <>
      <div className="visual-toolbar">
        <div
          className="visual-segments"
          role="group"
          aria-label="Screenshot viewport"
        >
          <button
            type="button"
            aria-pressed={viewport === "desktop"}
            onClick={() => setViewport("desktop")}
          >
            <Monitor size={15} aria-hidden="true" />
            Desktop
          </button>
          <button
            type="button"
            aria-pressed={viewport === "mobile"}
            onClick={() => setViewport("mobile")}
          >
            <Smartphone size={15} aria-hidden="true" />
            Mobile
          </button>
        </div>
        <span className="visual-small">Recorded screenshot</span>
      </div>
      <div className="visual-capture-stage" data-viewport={viewport}>
        <a
          href={withBasePath(screenshot.src)}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${data.name} ${viewport} capture at full size (new tab)`}
        >
          <img
            src={withBasePath(screenshot.src)}
            alt={screenshot.alt}
            loading="lazy"
            decoding="async"
          />
        </a>
      </div>
      <div className="visual-capture-caption">
        <p aria-live="polite">{screenshot.alt}</p>
        <a href={withBasePath(screenshot.src)} target="_blank" rel="noreferrer">
          Full size <ArrowUpRight size={14} aria-hidden="true" />
          <span className="sr-only"> (new tab)</span>
        </a>
      </div>
    </>
  );
}

function TypographyComparison({ data }: { data: ArticleVisualData }) {
  const id = useId();
  const [selectedRole, setSelectedRole] = useState(0);
  const role = data.typography[selectedRole];
  const rows = [
    { label: "Desktop", viewport: "1440px viewport", ...role.desktop },
    { label: "Mobile", viewport: "390px viewport", ...role.mobile },
  ];
  return (
    <>
      <label className="visual-field" htmlFor={id}>
        <span>Text role</span>
        <select
          id={id}
          value={selectedRole}
          onChange={(event) => setSelectedRole(Number(event.target.value))}
        >
          {data.typography.map((item, index) => (
            <option key={item.label} value={index}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      <p className="visual-family">{role.family}</p>
      <div className="visual-scale" aria-label="Measured font sizes">
        <div className="visual-axis" aria-hidden="true">
          <span>0</span>
          <span>45</span>
          <span>90</span>
          <span>135</span>
          <span>180px</span>
        </div>
        {rows.map((row) => (
          <div className="visual-measure" key={row.label}>
            <div className="visual-measure-label">
              <span>
                {row.label} <small>{row.viewport}</small>
              </span>
              <strong>
                {row.size === null ? "Not displayed" : `${row.size}px`}
              </strong>
            </div>
            <div className="visual-meter" aria-hidden="true">
              <span
                style={{ width: `${((row.size ?? 0) / 180) * 100}%` }}
                data-device={row.label}
              />
            </div>
            <span className="visual-leading">
              {row.size === null
                ? "This element is removed at the mobile viewport."
                : `Line height: ${typeof row.lineHeight === "number" ? `${row.lineHeight}px` : row.lineHeight}`}
            </span>
          </div>
        ))}
      </div>
      <p className="visual-insight" aria-live="polite">
        {role.note}
      </p>
      <p className="visual-small">
        Bars share a 0–180px scale across all websites. These are measured CSS
        values, not a reproduction of the original typefaces.
      </p>
    </>
  );
}

function InteractionComparison({ data }: { data: ArticleVisualData }) {
  const id = useId();
  const [selectedInteraction, setSelectedInteraction] = useState(0);
  const finding = data.interactions[selectedInteraction];
  return (
    <>
      <label className="visual-field" htmlFor={id}>
        <span>Interaction</span>
        <select
          id={id}
          value={selectedInteraction}
          onChange={(event) =>
            setSelectedInteraction(Number(event.target.value))
          }
        >
          {data.interactions.map((item, index) => (
            <option key={item.label} value={index}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      <div className="visual-flow">
        <div className="visual-flow-trigger">
          <span className="visual-eyebrow">01 / Trigger</span>
          <p>{finding.trigger}</p>
        </div>
        <ArrowRight
          className="visual-flow-arrow"
          size={22}
          aria-hidden="true"
        />
        <div className="visual-flow-response">
          <span className="visual-eyebrow">02 / Response</span>
          <p>{finding.response}</p>
        </div>
      </div>
      <div className="visual-evidence-line">
        <span className="visual-evidence" data-evidence={finding.evidence}>
          {evidenceLabels[finding.evidence]}
        </span>
        <span className="visual-small">Evidence type</span>
      </div>
      <p className="visual-insight" aria-live="polite">
        {finding.detail}
      </p>
      <p className="visual-small">
        A map of the recorded finding. Use the source notes below for its scope
        and limitations.
      </p>
    </>
  );
}
