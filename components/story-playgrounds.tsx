"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";
import {
  articleVisualData,
  originalResearchDate,
  type SiteKey,
} from "@/lib/article-visual-data";
import { EvidenceBadge } from "./evidence-badge";

export type Viewport = "desktop" | "mobile";

export function ViewportControls({
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

// The recorded finding each demonstration explains.
const interactionLabels: Record<SiteKey, string> = {
  noho: "Energy controls",
  ace: "Project image",
  "arkon-digital": "Shared scene",
  "neue-montreal": "Variable weights",
  monolog: "Service preview",
  "lama-lama": "Pitch deck exits",
};

const prompts: Record<SiteKey, string> = {
  noho: "Two preferences that change this page.",
  ace: "Where should a hover response happen? Try each answer.",
  "arkon-digital": "Change the route. Keep the world.",
  "neue-montreal": "Scrub the scroll and watch the weights trade places.",
  monolog: "Point at a service. Everything else steps back.",
  "lama-lama": "Open a layer, then find every way out.",
};

const asciiRows = [
  "..:-=+*#%%#*+=-:..",
  ".:=*%@@@@@@@@%*=:.",
  ":+%@@%*+==+*%@@%+:",
  "=#@@*-::..::-*@@#=",
  "=#@@*-::..::-*@@#=",
  ":+%@@%*+==+*%@@%+:",
  ".:=*%@@@@@@@@%*=:.",
  "..:-=+*#%%#*+=-:..",
];

type ZoomStrategy = "image" | "card" | "room";
const zoomStrategies: { id: ZoomStrategy; label: string; note: string }[] = [
  {
    id: "image",
    label: "Inner image",
    note: "The image grows to 1.05 inside a fixed frame. The card, its label and its neighbors stay put: Ace’s recorded response.",
  },
  {
    id: "card",
    label: "Whole card",
    note: "The whole card grows to 1.05. Its edges leave the grid’s alignment and its label rescales with it.",
  },
  {
    id: "room",
    label: "More room",
    note: "The card takes more space in the row, so its neighbors move. Every hover now rearranges the layout.",
  },
];

function AceMotion() {
  const [strategy, setStrategy] = useState<ZoomStrategy>("image");
  const [pinned, setPinned] = useState(false);
  const current = zoomStrategies.find((item) => item.id === strategy)!;
  const cards = [
    ["Project one", "Product design"],
    ["Project two", "Design system"],
    ["Project three", "Research"],
  ];
  return (
    <>
      <div className="ace-zoom-stage" data-strategy={strategy}>
        <div className="ace-zoom-grid">
          {cards.map(([title, category], index) => {
            const content = (
              <>
                <span className="ace-zoom-frame" aria-hidden="true">
                  <span className="ace-zoom-image">
                    {asciiRows.map((row, rowIndex) => (
                      <span key={rowIndex}>{row}</span>
                    ))}
                  </span>
                </span>
                <span className="ace-zoom-label">
                  <strong>{title}</strong>
                  <span>{category}</span>
                </span>
              </>
            );
            return index === 1 ? (
              <button
                key={title}
                type="button"
                className="ace-zoom-card ace-zoom-card--hot"
                aria-pressed={pinned}
                aria-label="Ace illustration: hover this card, or press to hold the hover"
                onClick={() => setPinned(!pinned)}
              >
                {content}
              </button>
            ) : (
              <span key={title} className="ace-zoom-card" aria-hidden="true">
                {content}
              </span>
            );
          })}
        </div>
      </div>
      <div className="story-motion-controls">
        <div
          className="story-playground-switch"
          role="group"
          aria-label="Ace illustration: where the zoom happens"
        >
          {zoomStrategies.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={strategy === item.id}
              onClick={() => setStrategy(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <p className="story-playground-insight" aria-live="polite">
        {current.note}
      </p>
      <p className="story-playground-note">
        Original illustration with invented projects. Hover or focus the middle
        card; press it to hold the state on touch screens.
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
                    style={{ transitionDelay: `${(index % 12) * 18}ms` }}
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
      <div className="story-motion-controls">
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
      </div>
      <p className="story-playground-insight" aria-live="polite">
        {route === "Home"
          ? "Home holds a solid form at the center."
          : `${route} reframes the same form as a field of particles, in a new position.`}
      </p>
      <p className="story-playground-note">
        Original illustration of scene continuity. It is not Arkon’s renderer or
        a reconstruction of its timing.
      </p>
    </>
  );
}

/** Faux weight: an ink stroke thickens the glyph, a paper stroke erodes it. */
function weightStroke(weight: number) {
  return weight >= 400
    ? { stroke: "var(--story-ink)", width: ((weight - 400) / 500) * 10 }
    : { stroke: "var(--story-paper)", width: ((400 - weight) / 300) * 7 };
}

function NeueMotion() {
  const [progress, setProgress] = useState(0);
  const frame = useRef(0);
  const share = Math.min(1, progress / 70);
  const display = Math.round(900 - 800 * share);
  const text = Math.round(200 + 500 * share);
  const displayStroke = weightStroke(display);
  const textStroke = weightStroke(text);

  useEffect(() => () => window.cancelAnimationFrame(frame.current), []);

  function play() {
    window.cancelAnimationFrame(frame.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(progress >= 100 ? 0 : 100);
      return;
    }
    const start = performance.now();
    const from = progress >= 100 ? 0 : progress;
    const step = (now: number) => {
      const value = Math.min(100, from + ((now - start) / 2400) * 100);
      setProgress(Math.round(value));
      if (value < 100) frame.current = window.requestAnimationFrame(step);
    };
    frame.current = window.requestAnimationFrame(step);
  }

  return (
    <>
      <div className="story-motion-stage story-neue-stage">
        <svg viewBox="0 0 600 330" aria-hidden="true" focusable="false">
          <path
            d="M36 70H564M36 250H564M300 70V250"
            className="story-diagram-rule"
          />
          <text x="36" y="44" className="story-diagram-label">
            DISPLAY
          </text>
          <text x="564" y="44" textAnchor="end" className="story-diagram-label">
            TEXT
          </text>
          {[
            { x: 168, weight: display, stroke: displayStroke },
            { x: 432, weight: text, stroke: textStroke },
          ].map((glyph) => (
            <g key={glyph.x}>
              <text
                x={glyph.x}
                y="224"
                textAnchor="middle"
                fontSize="176"
                letterSpacing="-8"
                className="story-neue-specimen"
                stroke={glyph.stroke.stroke}
                strokeWidth={glyph.stroke.width.toFixed(2)}
                strokeLinejoin="round"
                paintOrder={glyph.weight >= 400 ? "stroke fill" : "fill stroke"}
              >
                Aa
              </text>
              <text
                x={glyph.x}
                y="286"
                textAnchor="middle"
                className="story-neue-weight"
              >
                {glyph.weight}
              </text>
            </g>
          ))}
          <path d="M36 310H564" className="story-diagram-rule" />
          <path
            d={`M36 310H${36 + (528 * progress) / 100}`}
            className="story-neue-progress"
          />
          <path d="M405.6 302V318" className="story-diagram-ink-rule" />
          <text
            x="405.6"
            y="298"
            textAnchor="middle"
            className="story-diagram-label"
          >
            0.7
          </text>
        </svg>
      </div>
      <div className="story-motion-controls story-neue-controls">
        <label className="story-range">
          <span>Scroll progress</span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            aria-valuetext={`${progress}%: Display weight ${display}, Text weight ${text}`}
            onChange={(event) => setProgress(Number(event.target.value))}
          />
        </label>
        <button
          type="button"
          className="story-playground-action"
          onClick={play}
        >
          {progress >= 100 ? "Scroll again" : "Play the scroll"}
        </button>
      </div>
      <p className="story-playground-insight" aria-live="polite">
        Display {display} · Text {text}
        {progress >= 70
          ? ". The trade is complete at 70% of the scroll."
          : ". The heavier face thins while the lighter one gains weight."}
      </p>
      <p className="story-playground-note">
        Original illustration. Endpoints follow the recorded source mapping; the
        straight line between them is assumed. This library has two static
        weights, so stroke thickness stands in for the variable axis.
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
              onFocus={() => setService(index)}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setService(index);
              }}
            >
              <span className="story-monolog-number">0{index + 1}</span>
              <span>{name}</span>
              <span className="story-monolog-opacity" aria-hidden="true">
                {service === index ? "1.0" : "0.3"}
              </span>
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
      <p className="story-playground-insight" aria-live="polite">
        {names[service]} stays at full opacity; the others fall to 0.3, the
        values recorded on MONOLOG. The preview follows the active name.
      </p>
      <p className="story-playground-note">
        Original illustration with three sample services and invented previews.
        Point at a row, focus it or tap it.
      </p>
    </>
  );
}

// Two pixel Ls, an original nod to a pixel identity rather than its logo.
const pixelLetters = ["1000010000", "1000010000", "1000010000", "1110011100"];

type Exit = "button" | "escape" | "outside";
const exits: { id: Exit; label: string }[] = [
  { id: "button", label: "A visible close button" },
  { id: "escape", label: "The Escape key" },
  { id: "outside", label: "A click outside the layer" },
];

function LamaExits() {
  const id = useId();
  const cases = ["Case 01", "Case 02", "Case 03"];
  const [open, setOpen] = useState<number | null>(null);
  const [found, setFound] = useState<Exit[]>([]);
  const openers = useRef<(HTMLButtonElement | null)[]>([]);
  const closeButton = useRef<HTMLButtonElement>(null);

  const close = useCallback(
    (exit: Exit) => {
      const opener = open;
      setFound((current) =>
        current.includes(exit) ? current : [...current, exit],
      );
      setOpen(null);
      if (opener !== null) openers.current[opener]?.focus();
    },
    [open],
  );

  // Like a real layer: focus moves in, and Escape works wherever focus is.
  useEffect(() => {
    if (open === null) return;
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      close("escape");
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      <div className="lama-exits-stage" data-open={open !== null}>
        <ul className="lama-exits-rows">
          {cases.map((name, index) => (
            <li key={name}>
              <button
                ref={(element) => {
                  openers.current[index] = element;
                }}
                type="button"
                aria-expanded={open === index}
                aria-controls={`${id}-layer`}
                aria-label={`Lama Lama illustration: open ${name}`}
                onClick={() => setOpen(index)}
              >
                <span>[ {name} ]</span>
                <span aria-hidden="true">+</span>
              </button>
            </li>
          ))}
        </ul>
        {open !== null && (
          <div className="lama-exits-layer" id={`${id}-layer`}>
            <button
              type="button"
              className="lama-exits-backdrop"
              tabIndex={-1}
              aria-label="Close by clicking outside the layer"
              onClick={() => close("outside")}
            />
            <div
              className="lama-exits-panel"
              role="group"
              aria-label={`${cases[open]} preview layer`}
            >
              <div className="lama-exits-panel-top">
                <span>[ {cases[open]} ]</span>
                <button
                  ref={closeButton}
                  type="button"
                  onClick={() => close("button")}
                  aria-label="Close the preview"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </div>
              <div className="lama-exits-pixels" aria-hidden="true">
                {pixelLetters.flatMap((row, rowIndex) =>
                  [...row].map((pixel, column) => (
                    <i
                      key={`${rowIndex}-${column}`}
                      data-on={pixel === "1" || undefined}
                    />
                  )),
                )}
              </div>
              <p>A preview layer. Now leave it another way.</p>
            </div>
          </div>
        )}
      </div>
      <div className="lama-exits-score">
        <ul aria-label="Exits found">
          {exits.map((exit) => (
            <li key={exit.id} data-found={found.includes(exit.id)}>
              <span className="lama-exits-check" aria-hidden="true" />
              {exit.label}
              <span className="sr-only">
                {found.includes(exit.id) ? ", found" : ", not found yet"}
              </span>
            </li>
          ))}
        </ul>
        {found.length > 0 && (
          <button
            type="button"
            className="story-playground-action"
            onClick={() => setFound([])}
          >
            Reset
          </button>
        )}
      </div>
      <p className="story-playground-insight" aria-live="polite">
        {found.length === 3
          ? "All three found. Lama Lama’s deck offered the first; in the tested desktop state, Escape did not close it."
          : `${found.length} of 3 exits found. Open a case, then leave the layer.`}
      </p>
      <p className="story-playground-note">
        Original illustration with invented cases. On a touch screen, two of the
        three exits apply.
      </p>
    </>
  );
}

export interface NohoControls {
  dark: boolean;
  calm: boolean;
  setDark: (value: boolean) => void;
  setCalm: (value: boolean) => void;
}

function NohoPreferences({ dark, calm, setDark, setCalm }: NohoControls) {
  const chosen = [dark && "a dark surface", calm && "calmer motion"].filter(
    Boolean,
  );
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
            {calm ? "SETTLED" : "PLAYFUL"}
          </text>
        </svg>
      </div>
      <div className="story-motion-controls noho-switches">
        <button
          type="button"
          role="switch"
          aria-checked={dark}
          onClick={() => setDark(!dark)}
        >
          <span className="noho-switch-track" aria-hidden="true" />
          Dark surface for this page
        </button>
        <button
          type="button"
          role="switch"
          aria-checked={calm}
          onClick={() => setCalm(!calm)}
        >
          <span className="noho-switch-track" aria-hidden="true" />
          Calmer motion for this page
        </button>
      </div>
      <p className="story-playground-insight" aria-live="polite">
        {chosen.length
          ? `This page now uses ${chosen.join(" and ")}. Each switch works on its own.`
          : "Try either switch. Each one changes this whole story page."}
      </p>
      <p className="story-playground-note">
        Original illustration. These switches change this story, not Noho, and
        estimate nothing about energy. Noho’s own panel showed a rating that the
        research did not measure.
      </p>
    </>
  );
}

export function MotionPlayground({
  site,
  noho,
}: {
  site: SiteKey;
  noho?: NohoControls;
}) {
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
        <span>{prompts[site]}</span>
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
        noho && <NohoPreferences {...noho} />
      ) : (
        <LamaExits />
      )}
      <div className="story-finding-caption">
        <div className="story-finding-label">
          <strong>What the research recorded: {finding.label}</strong>
          <EvidenceBadge kind={finding.evidence} describe />
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
