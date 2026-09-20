"use client";

import { useId, useState } from "react";
import {
  articleVisualData,
  originalResearchDate,
  type InteractionFinding,
  type SiteKey,
} from "@/lib/article-visual-data";
import { withBasePath } from "@/lib/paths";

type Viewport = "desktop" | "mobile";

const evidenceLabels: Record<InteractionFinding["evidence"], string> = {
  observed: "Observed",
  "source-confirmed": "Source-confirmed",
  "hook-only": "Hook only",
  mixed: "Observed + source",
};

const interactionLabels: Record<SiteKey, string> = {
  noho: "Energy controls",
  ace: "Project image",
  "arkon-digital": "Shared scene",
  "neue-montreal": "Specimen controls",
  monolog: "Service preview",
  "lama-lama": "Camera grid",
};

// These are the dimensions of the published JPEG files, not CSS viewports.
const captureDimensions: Record<
  SiteKey,
  Record<Viewport, { width: number; height: number }>
> = {
  noho: {
    desktop: { width: 1440, height: 1000 },
    mobile: { width: 390, height: 844 },
  },
  ace: {
    desktop: { width: 1425, height: 990 },
    mobile: { width: 375, height: 812 },
  },
  "arkon-digital": {
    desktop: { width: 1280, height: 720 },
    mobile: { width: 390, height: 844 },
  },
  "neue-montreal": {
    desktop: { width: 1265, height: 712 },
    mobile: { width: 375, height: 812 },
  },
  monolog: {
    desktop: { width: 1265, height: 712 },
    mobile: { width: 375, height: 812 },
  },
  "lama-lama": {
    desktop: { width: 1280, height: 720 },
    mobile: { width: 390, height: 844 },
  },
};

function cssPixels(value: number | "normal" | null): string {
  return value === null
    ? "Not displayed"
    : value === "normal"
      ? "normal"
      : `${value}px`;
}

function ViewportControls({
  name,
  context,
  selected,
  onChange,
}: {
  name: string;
  context: "typography" | "screenshots";
  selected: Viewport;
  onChange: (viewport: Viewport) => void;
}) {
  return (
    <div
      className="story-playground-switch"
      role="group"
      aria-label={`${name} ${context} viewport`}
    >
      {(["desktop", "mobile"] as const).map((viewport) => (
        <button
          type="button"
          key={viewport}
          aria-pressed={selected === viewport}
          aria-label={`${name} ${context}: ${viewport} ${context === "typography" ? "measurements" : "capture"}`}
          onClick={() => onChange(viewport)}
        >
          {viewport === "desktop" ? "Desktop" : "Mobile"}
        </button>
      ))}
    </div>
  );
}

export function TypePlayground({ site }: { site: SiteKey }) {
  const id = useId();
  const data = articleVisualData[site];
  const [selectedRole, setSelectedRole] = useState(0);
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const role = data.typography[selectedRole] ?? data.typography[0];
  const measurement = role[viewport];

  return (
    <figure
      className="story-playground story-type-playground"
      aria-labelledby={`${id}-title`}
    >
      <figcaption className="story-playground-heading">
        <strong id={`${id}-title`}>Type, in proportion.</strong>
        <span>Change a role. Compare the scale.</span>
      </figcaption>
      <div className="story-playground-toolbar">
        <label className="story-playground-field" htmlFor={`${id}-role`}>
          <span>{data.name} text role</span>
          <select
            id={`${id}-role`}
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
        <ViewportControls
          name={data.name}
          context="typography"
          selected={viewport}
          onChange={setViewport}
        />
      </div>

      <div className="story-type-stage">
        <svg viewBox="0 0 600 320" aria-hidden="true" focusable="false">
          <path d="M36 246H564M36 38V274" className="story-diagram-rule" />
          <path
            d="M30 246H42M30 46H42M558 246H570"
            className="story-diagram-ink-rule"
          />
          <text x="564" y="39" textAnchor="end" className="story-diagram-label">
            RELATIVE SIZE / 2× DRAWING
          </text>
          {measurement.size === null ? (
            <>
              <path
                d="M225 97H375V217H225ZM225 97L375 217M375 97L225 217"
                className="story-diagram-rule"
              />
              <text
                x="300"
                y="285"
                textAnchor="middle"
                className="story-diagram-label"
              >
                NOT DISPLAYED AT THIS VIEWPORT
              </text>
            </>
          ) : (
            <>
              <text
                x="50"
                y="246"
                fontSize={measurement.size * 2}
                className="story-type-specimen"
              >
                Aa
              </text>
              <text
                x="564"
                y="285"
                textAnchor="end"
                className="story-diagram-label"
              >
                {cssPixels(measurement.size)} RECORDED
              </text>
            </>
          )}
        </svg>
      </div>

      <div className="story-type-readout" aria-live="polite" aria-atomic="true">
        <dl className="story-type-stats">
          <div>
            <dt>Font size</dt>
            <dd>{cssPixels(measurement.size)}</dd>
          </div>
          <div>
            <dt>Line height</dt>
            <dd>{cssPixels(measurement.lineHeight)}</dd>
          </div>
          <div className="story-type-family">
            <dt>Recorded source family / weight</dt>
            <dd>{role.family}</dd>
          </div>
        </dl>
        <p className="story-playground-insight">{role.note}.</p>
        <p className="story-playground-note">
          Desktop {cssPixels(role.desktop.size)} → mobile{" "}
          {cssPixels(role.mobile.size)}.
          {measurement.lineHeight === "normal" &&
            " “normal” is the recorded CSS value; no pixel line height was established."}
        </p>
      </div>
      <p className="story-playground-footnote">
        Measured at 1440 × 1000 desktop and 390 × 844 mobile,{" "}
        {data.researchDate ?? originalResearchDate}. This scaled diagram uses
        the library’s PP Neue Montréal, not the source typeface. Its SVG units
        show twice the recorded size; on-screen pixels vary with the frame.
      </p>
    </figure>
  );
}

function AceMotion() {
  const clipId = `story-ace-${useId().replace(/:/g, "")}`;
  const [zoomed, setZoomed] = useState(false);
  const rows = [
    "....................:--==--:....................",
    "...............:-=+*#%%%%%%#*+=-:...............",
    "...........:-=*#%%@@@@@@@@@@@@%%#*=-:...........",
    ".........:=*#%@@@@%#**++++**#%@@@@%#*=:.........",
    "........-+#%@@@%*=-:......:-=*%@@@%#+-........",
    ".......=*%@@@#+:....::--::....:+#@@@%*=.......",
    "......-#%@@@#-...:=*#%%%%#*=:...-#@@@%#-......",
    "......+%@@@%=...-*%@@@@@@%*-...=%@@@%+......",
    "......+%@@@%=...-*%@@@@@@%*-...=%@@@%+......",
    "......-#%@@@#-...:=*#%%%%#*=:...-#@@@%#-......",
    ".......=*%@@@#+:....::--::....:+#@@@%*=.......",
    "........-+#%@@@%*=-:......:-=*%@@@%#+-........",
    ".........:=*#%@@@@%#**++++**#%@@@@%#*=:.........",
    "...........:-=*#%%@@@@@@@@@@@@%%#*=-:...........",
    "...............:-=+*#%%%%%%#*+=-:...............",
  ];
  return (
    <>
      <div className="story-motion-stage story-ace-stage" data-active={zoomed}>
        <svg viewBox="0 0 600 340" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id={clipId}>
              <rect x="68" y="52" width="464" height="236" />
            </clipPath>
          </defs>
          <path
            d="M36 52H54M68 20V38M546 288H564M532 302V320"
            className="story-diagram-ink-rule"
          />
          <g clipPath={`url(#${clipId})`}>
            <rect
              x="68"
              y="52"
              width="464"
              height="236"
              className="story-ace-image-paper"
            />
            <g className="story-ace-image">
              {rows.map((row, index) => (
                <text
                  key={index}
                  x="86"
                  y={78 + index * 13}
                  className="story-ace-ascii"
                >
                  {row}
                </text>
              ))}
              <path
                d="M300 64V276M80 170H520"
                className="story-ace-crosshair"
              />
            </g>
          </g>
          <rect
            x="68"
            y="52"
            width="464"
            height="236"
            className="story-diagram-ink-rule"
          />
          <text x="68" y="316" className="story-diagram-label">
            FRAME / FIXED
          </text>
          <text
            x="532"
            y="316"
            textAnchor="end"
            className="story-diagram-label"
          >
            IMAGE / {zoomed ? "1.05" : "1.00"}
          </text>
        </svg>
      </div>
      <div className="story-motion-controls">
        <button
          type="button"
          className="story-playground-action"
          aria-pressed={zoomed}
          aria-label="Ace illustration: zoom image"
          onClick={() => setZoomed(!zoomed)}
        >
          Zoom image <span aria-hidden="true">↗</span>
        </button>
        <p className="story-playground-note" aria-live="polite">
          {zoomed
            ? "1.05× image. Same frame, same place."
            : "1.00× image. Try a small change of scale."}
        </p>
      </div>
      <p className="story-playground-note">
        Original illustration. The button demonstrates the recorded hover zoom
        using an invented ASCII image.
      </p>
    </>
  );
}

function ArkonMotion() {
  const [route, setRoute] = useState("Home");
  return (
    <>
      <div
        className="story-motion-stage story-arkon-stage"
        data-route={route.toLowerCase()}
      >
        <svg viewBox="0 0 600 340" aria-hidden="true" focusable="false">
          <path d="M36 265H564M300 44V293" className="story-diagram-rule" />
          <text x="36" y="40" className="story-diagram-label">
            ONE SCENE
          </text>
          <text
            x="564"
            y="314"
            textAnchor="end"
            className="story-diagram-label"
          >
            {route.toUpperCase()} / A NEW COMPOSITION
          </text>
          <g className="story-arkon-composition">
            <ellipse cy="111" rx="138" ry="15" className="story-arkon-ground" />
            <g className="story-arkon-solid">
              <circle r="99" className="story-arkon-core" />
              {[-60, -30, 0, 30, 60].map((offset) => (
                <ellipse
                  key={offset}
                  cx={offset / 4}
                  rx={100 - Math.abs(offset)}
                  ry="99"
                  className="story-arkon-ring"
                />
              ))}
              <ellipse rx="99" ry="34" className="story-arkon-ring" />
              <ellipse rx="99" ry="68" className="story-arkon-ring" />
            </g>
            <g className="story-arkon-particles">
              {Array.from({ length: 96 }, (_, index) => {
                const angle = index * 2.399963;
                const radius = Math.sqrt(index / 95) * 111;
                return (
                  <circle
                    key={index}
                    cx={(Math.cos(angle) * radius).toFixed(4)}
                    cy={(Math.sin(angle) * radius).toFixed(4)}
                    r={index % 4 === 0 ? 3.5 : 1.9}
                  />
                );
              })}
            </g>
            <ellipse
              rx="146"
              ry="38"
              transform="rotate(-25)"
              className="story-arkon-orbit"
            />
          </g>
          <text x="36" y="314" className="story-diagram-label">
            A SHARED VISUAL ANCHOR
          </text>
        </svg>
      </div>
      <div
        className="story-playground-switch story-motion-routes"
        role="group"
        aria-label="Arkon Digital illustration routes"
      >
        {["Home", "Projects", "Services"].map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={route === item}
            aria-label={`Arkon Digital illustration: ${item}`}
            onClick={() => setRoute(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="story-playground-note" aria-live="polite">
        {route === "Home"
          ? "Home holds a solid form at the center."
          : `${route} reframes the same form as a field of particles.`}
      </p>
      <p className="story-playground-note">
        Original illustration of scene continuity. This diagram is not Arkon’s
        renderer or a reconstruction of its timing.
      </p>
    </>
  );
}

function NeueMotion() {
  const [weight, setWeight] = useState<400 | 600>(400);
  return (
    <>
      <div className="story-motion-stage story-neue-stage">
        <svg viewBox="0 0 600 340" aria-hidden="true" focusable="false">
          <path
            d="M36 91H564M36 254H564M54 68V272M546 68V272"
            className="story-diagram-rule"
          />
          <text x="36" y="39" className="story-diagram-label">
            THE LETTER IS THE INTERFACE
          </text>
          <text
            x="300"
            y="254"
            textAnchor="middle"
            fontSize="265"
            fontWeight={weight}
            letterSpacing="-12"
            className="story-neue-specimen"
          >
            Aa
          </text>
          <text x="36" y="314" className="story-diagram-label">
            PP NEUE MONTRÉAL
          </text>
          <text
            x="564"
            y="314"
            textAnchor="end"
            className="story-diagram-label"
          >
            {weight} / {weight === 400 ? "REGULAR" : "SEMIBOLD"}
          </text>
        </svg>
      </div>
      <div
        className="story-playground-switch"
        role="group"
        aria-label="Neue Montréal illustration font weight"
      >
        {([400, 600] as const).map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={weight === value}
            aria-label={`Neue Montréal illustration: ${value === 400 ? "Regular" : "Semibold"} weight`}
            onClick={() => setWeight(value)}
          >
            {value === 400 ? "Regular" : "Semibold"}
            <span>{value}</span>
          </button>
        ))}
      </div>
      <p className="story-playground-note" aria-live="polite">
        {weight === 400
          ? "Regular: open, even and quiet."
          : "Semibold: the same letters carry more emphasis."}
      </p>
      <p className="story-playground-note">
        Original illustration using this library’s two installed PP Neue
        Montréal weights. The source specimen offers its own families and weight
        choices.
      </p>
    </>
  );
}

function MonologMotion() {
  const [service, setService] = useState(0);
  const names = ["Website Design", "3D Development", "Brand Strategy"];
  return (
    <>
      <div className="story-monolog-demo">
        <div
          className="story-monolog-services"
          role="group"
          aria-label="MONOLOG illustration service selection"
        >
          {names.map((name, index) => (
            <button
              key={name}
              type="button"
              aria-pressed={service === index}
              aria-label={`MONOLOG illustration: ${name}`}
              onClick={() => setService(index)}
            >
              <span className="story-monolog-number">0{index + 1}</span>
              <span>{name}</span>
              <span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
        <div
          className="story-motion-stage story-monolog-preview"
          data-service={service}
        >
          <svg viewBox="0 0 300 300" aria-hidden="true" focusable="false">
            <g className="story-monolog-preview-web">
              <rect
                x="43"
                y="54"
                width="214"
                height="190"
                className="story-diagram-ink-rule"
              />
              <path
                d="M43 79H257M59 68H63M68 68H72M77 68H81"
                className="story-diagram-ink-rule"
              />
              <rect
                x="60"
                y="99"
                width="106"
                height="74"
                className="story-diagram-accent-fill"
              />
              <path
                d="M182 101H238M182 112H225M182 123H233M60 191H238M60 205H238M60 219H179"
                className="story-diagram-ink-rule"
              />
            </g>
            <g className="story-monolog-preview-space">
              <path
                d="M150 46L246 103V206L150 262L54 206V103ZM54 103L150 158L246 103M150 158V262M150 46V158"
                className="story-diagram-ink-rule"
              />
              <circle
                cx="150"
                cy="154"
                r="48"
                className="story-diagram-accent-fill"
              />
              <ellipse
                cx="150"
                cy="154"
                rx="82"
                ry="23"
                transform="rotate(-28 150 154)"
                className="story-diagram-ink-rule"
              />
            </g>
            <g className="story-monolog-preview-brand">
              <rect
                x="57"
                y="57"
                width="186"
                height="186"
                className="story-diagram-ink-rule"
              />
              <circle
                cx="150"
                cy="150"
                r="66"
                className="story-diagram-accent-fill"
              />
              <text
                x="150"
                y="182"
                textAnchor="middle"
                fontSize="92"
                className="story-monolog-brand-letter"
              >
                M
              </text>
            </g>
          </svg>
        </div>
      </div>
      <p className="story-playground-note" aria-live="polite">
        {names[service]} sets the emphasis and the accompanying image.
      </p>
      <p className="story-playground-note">
        Original illustration with three sample services and invented previews.
        Select a row to explore the relationship observed on hover.
      </p>
    </>
  );
}

function LamaMotion() {
  const [reframed, setReframed] = useState(false);
  return (
    <>
      <div
        className="story-motion-stage story-lama-stage"
        data-active={reframed}
      >
        <svg viewBox="0 0 600 340" aria-hidden="true" focusable="false">
          <text x="36" y="39" className="story-diagram-label">
            AN IMAGE, BUILT FROM MODULES
          </text>
          <g className="story-lama-pixels">
            {Array.from({ length: 198 }, (_, index) => {
              const column = index % 22;
              const row = Math.floor(index / 22);
              const x = 45 + column * 23;
              const y = 65 + row * 23;
              const shape = Math.hypot(column - 10.5, (row - 4) * 1.45);
              const accent = shape < 5.6 && shape > 2.6;
              const shift = (column + row) % 3;
              return (
                <rect
                  key={index}
                  x={x}
                  y={y}
                  width="19"
                  height="19"
                  className={`story-lama-pixel story-lama-pixel--${shift}${accent ? " story-lama-pixel-accent" : ""}`}
                />
              );
            })}
          </g>
          <text x="36" y="314" className="story-diagram-label">
            GENERATED GRID / NO CAMERA
          </text>
          <text
            x="564"
            y="314"
            textAnchor="end"
            className="story-diagram-label"
          >
            {reframed ? "REFRAMED" : "ALIGNED"}
          </text>
        </svg>
      </div>
      <div className="story-motion-controls">
        <button
          type="button"
          className="story-playground-action"
          aria-pressed={reframed}
          aria-label="Lama Lama illustration: reframe the grid"
          onClick={() => setReframed(!reframed)}
        >
          Reframe the grid <span aria-hidden="true">↗</span>
        </button>
        <p className="story-playground-note" aria-live="polite">
          {reframed
            ? "The modules move; the visual language stays."
            : "Small repeated units make one image."}
        </p>
      </div>
      <p className="story-playground-note">
        Original abstract illustration of the grid idea. These generated shapes
        do not use a camera or reproduce the source shader.
      </p>
    </>
  );
}

function NohoPreferences() {
  const [dark, setDark] = useState(false);
  const [calm, setCalm] = useState(false);
  return (
    <>
      <div className="story-noho-stage" data-dark={dark} data-calm={calm}>
        <svg viewBox="0 0 600 340" aria-hidden="true" focusable="false">
          <text x="32" y="40" className="story-diagram-label">
            A PREFERENCE, MADE VISIBLE
          </text>
          <g
            className="story-noho-chair"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinejoin="round"
          >
            <path d="M208 82Q300 62 392 82L380 180Q300 197 220 180ZM220 180L200 225H400L380 180M217 225L202 293M383 225L398 293" />
            <path
              d="M242 104L249 161M280 99L283 165M320 99L317 165M358 104L351 161"
              strokeWidth="3"
            />
          </g>
          <text x="32" y="316" className="story-diagram-label">
            {dark ? "DARK SURFACE" : "LIGHT SURFACE"}
          </text>
          <text
            x="568"
            y="316"
            textAnchor="end"
            className="story-diagram-label"
          >
            {calm ? "SETTLED COMPOSITION" : "PLAYFUL COMPOSITION"}
          </text>
        </svg>
      </div>
      <div className="story-motion-controls">
        <button
          type="button"
          className="story-playground-action"
          aria-label="Noho illustration: dark surface"
          aria-pressed={dark}
          onClick={() => setDark(!dark)}
        >
          Dark surface
        </button>
        <button
          type="button"
          className="story-playground-action"
          aria-label="Noho illustration: calmer composition"
          aria-pressed={calm}
          onClick={() => setCalm(!calm)}
        >
          Calmer composition
        </button>
      </div>
      <p className="story-playground-note" aria-live="polite">
        {dark ? "Dark" : "Light"} surface · {calm ? "Settled" : "Tilted"} chair.
        Both choices remain independent.
      </p>
      <p className="story-playground-note">
        Original illustration. These controls change this diagram only. They do
        not estimate energy usage or reproduce Noho’s animation engine.
      </p>
    </>
  );
}

export function MotionPlayground({ site }: { site: SiteKey }) {
  const id = useId();
  const data = articleVisualData[site];
  const finding = data.interactions.find(
    (item) => item.label === interactionLabels[site],
  )!;
  return (
    <figure
      className="story-playground story-motion-playground"
      aria-labelledby={`${id}-title`}
    >
      <figcaption className="story-playground-heading">
        <strong id={`${id}-title`}>A small interaction, explained.</strong>
        <span>Click or tap. The change has a purpose.</span>
      </figcaption>
      {site === "ace" ? (
        <AceMotion />
      ) : site === "arkon-digital" ? (
        <ArkonMotion />
      ) : site === "neue-montreal" ? (
        <NeueMotion />
      ) : site === "monolog" ? (
        <MonologMotion />
      ) : site === "noho" ? (
        <NohoPreferences />
      ) : (
        <LamaMotion />
      )}
      <div className="story-finding-caption">
        <div className="story-finding-label">
          <strong>{finding.label}</strong>
          <span
            className="story-evidence-badge"
            data-evidence={finding.evidence}
          >
            {evidenceLabels[finding.evidence]}
          </span>
        </div>
        <p>{finding.response}</p>
        <p className="story-playground-note">{finding.detail}</p>
        <span className="story-playground-note">
          Recorded {data.researchDate ?? originalResearchDate}.
        </span>
      </div>
    </figure>
  );
}

export function ResponsivePlayground({ site }: { site: SiteKey }) {
  const id = useId();
  const data = articleVisualData[site];
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const screenshot = data.screenshots[viewport];
  const dimensions = captureDimensions[site][viewport];
  return (
    <figure
      className="story-playground story-responsive-playground"
      aria-labelledby={`${id}-title`}
    >
      <figcaption className="story-playground-heading">
        <strong id={`${id}-title`}>The recorded view.</strong>
        <span>Real captures, two compositions.</span>
      </figcaption>
      <div className="story-playground-toolbar">
        <ViewportControls
          name={data.name}
          context="screenshots"
          selected={viewport}
          onChange={setViewport}
        />
        <span className="story-playground-note" aria-live="polite">
          {dimensions.width} × {dimensions.height} image pixels
        </span>
      </div>
      <div className="story-capture-stage" data-viewport={viewport}>
        <div className="story-capture-registration">
          <span>{data.name}</span>
          <span>{viewport === "desktop" ? "01 / Desktop" : "02 / Mobile"}</span>
        </div>
        <a
          href={withBasePath(screenshot.src)}
          target="_blank"
          rel="noreferrer"
          className="story-capture-image-link"
          aria-label={`Open ${data.name} ${viewport} screenshot at full size in a new tab`}
        >
          <img
            src={withBasePath(screenshot.src)}
            alt={screenshot.alt}
            width={dimensions.width}
            height={dimensions.height}
            loading="lazy"
            decoding="async"
          />
        </a>
      </div>
      <p className="story-playground-insight" aria-live="polite">
        {screenshot.alt}
      </p>
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
        Captured {data.researchDate ?? originalResearchDate}. Image dimensions
        describe the saved files. Mobile research used a 390 × 844 CSS-pixel
        viewport; saved images may be resized. Each frame records one moment,
        not the complete animation.
      </p>
    </figure>
  );
}
