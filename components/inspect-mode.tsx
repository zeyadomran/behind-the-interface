"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useLocation } from "react-router";
import { ScanLine, X } from "lucide-react";
import "@/app/inspect.css";

interface InspectState {
  inspecting: boolean;
  setInspecting: (value: boolean) => void;
  toggle: () => void;
}

const InspectContext = createContext<InspectState | null>(null);

export function useInspect() {
  const context = useContext(InspectContext);
  if (!context) throw new Error("useInspect needs an InspectProvider");
  return context;
}

// Explicit roles win; headings and opening paragraphs get sensible defaults so
// Markdown-rendered research pages can be inspected too.
const targets: [selector: string, role: string][] = [
  ["[data-inspect]", ""],
  ["h1", "Display"],
  ["h2", "Heading"],
  ["h3", "Subheading"],
  ["p:first-of-type", "Reading"],
];

function format(value: number, digits = 2) {
  return String(Number(value.toFixed(digits)));
}

/** The same computed-style reading the research used on the six websites. */
function describe(element: HTMLElement, role: string) {
  const style = getComputedStyle(element);
  const size = parseFloat(style.fontSize);
  const leading =
    style.lineHeight === "normal"
      ? "normal"
      : format(parseFloat(style.lineHeight));
  const tracking = parseFloat(style.letterSpacing);
  const parts = [`${role} ${format(size)} / ${leading}`, style.fontWeight];
  if (tracking) parts.push(`${format(tracking / size, 3)}em`);
  if (role === "Reading")
    parts.push(`${Math.round(element.getBoundingClientRect().width)}px wide`);
  return parts.join(" · ");
}

function measure(root: HTMLElement) {
  const seen = new Set<HTMLElement>();
  for (const [selector, fallback] of targets) {
    for (const element of root.querySelectorAll<HTMLElement>(selector)) {
      if (seen.has(element) || element.closest("[data-inspect-ignore]"))
        continue;
      seen.add(element);
      if (!element.getClientRects().length) continue;
      const text = element.textContent?.trim() ?? "";
      if (fallback === "Reading" && text.length < 60) continue;
      const role = element.dataset.inspect || fallback;
      element.setAttribute("data-inspect-label", describe(element, role));
    }
  }
}

function clear() {
  for (const element of document.querySelectorAll("[data-inspect-label]"))
    element.removeAttribute("data-inspect-label");
}

export function InspectProvider({ children }: { children: ReactNode }) {
  const [inspecting, setInspecting] = useState(false);
  const { pathname } = useLocation();
  const toggle = useCallback(() => setInspecting((value) => !value), []);

  useEffect(() => {
    const html = document.documentElement;
    if (!inspecting) {
      html.removeAttribute("data-inspecting");
      clear();
      return;
    }
    html.setAttribute("data-inspecting", "");
    const root = document.getElementById("root");
    if (!root) return;
    let frame = 0;
    let observing = true;
    const observer = new MutationObserver(() => schedule());
    const run = () => {
      frame = 0;
      // Our own label attributes must not retrigger the observer.
      observer.disconnect();
      measure(root);
      if (observing)
        observer.observe(root, {
          childList: true,
          subtree: true,
          characterData: true,
        });
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(run);
    };
    run();
    window.addEventListener("resize", schedule, { passive: true });
    document.fonts?.addEventListener("loadingdone", schedule);
    return () => {
      observing = false;
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", schedule);
      document.fonts?.removeEventListener("loadingdone", schedule);
      clear();
    };
  }, [inspecting, pathname]);

  const value = useMemo(
    () => ({ inspecting, setInspecting, toggle }),
    [inspecting, toggle],
  );
  return (
    <InspectContext.Provider value={value}>
      {children}
      {inspecting && <InspectLegend onClose={() => setInspecting(false)} />}
    </InspectContext.Provider>
  );
}

function InspectLegend({ onClose }: { onClose: () => void }) {
  return (
    <aside
      className="inspect-legend"
      aria-label="Inspect mode"
      data-inspect-ignore=""
    >
      <p>
        <strong>Inspecting this page.</strong> Labels show computed{" "}
        <span className="inspect-legend-code">size / line height</span> in CSS
        pixels, then weight and tracking: the measurement the research used on
        each website. Resize the window to watch fluid type change.
      </p>
      <button type="button" onClick={onClose}>
        Done <X size={14} aria-hidden="true" />
      </button>
    </aside>
  );
}

export function InspectToggle({
  compact = false,
  label = "Inspect",
  className = "inspect-toggle",
}: {
  compact?: boolean;
  label?: string;
  className?: string;
}) {
  const { inspecting, toggle } = useInspect();
  return (
    <button
      type="button"
      className={className}
      aria-pressed={inspecting}
      onClick={toggle}
      title="Inspect this page (I)"
    >
      <ScanLine size={17} strokeWidth={1.5} aria-hidden="true" />
      <span className={compact ? "sr-only" : undefined}>{label}</span>
    </button>
  );
}
