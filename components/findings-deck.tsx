"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Shuffle } from "lucide-react";
import Link from "@/components/link";
import type { Finding } from "@/lib/findings";
import { EvidenceBadge } from "./evidence-badge";

export interface DeckSite {
  name: string;
  href: string;
}

// The dealt card, the top card and two cards waiting behind it.
const visibleOffsets = [-1, 0, 1, 2];
const flickDistance = 90;

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function FindingsDeck({
  findings,
  sites,
}: {
  findings: Finding[];
  sites: Record<string, DeckSite>;
}) {
  const count = findings.length;
  const [order, setOrder] = useState(() => findings.map((_, index) => index));
  const [position, setPosition] = useState(0);
  const [exit, setExit] = useState<"left" | "right">("left");
  const [announcement, setAnnouncement] = useState("");
  const stack = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    id: number;
    x: number;
    dx: number;
    active: boolean;
  } | null>(null);

  const wrap = (value: number) => ((value % count) + count) % count;
  const at = (offset: number, sequence = order, start = position) =>
    findings[sequence[wrap(start + offset)]];

  function announce(next: number, sequence = order) {
    const finding = at(0, sequence, next);
    setAnnouncement(
      `Finding ${wrap(next) + 1} of ${count}, ${sites[finding.site]?.name ?? finding.site}: ${finding.text}`,
    );
  }

  function deal(direction: 1 | -1, flick: "left" | "right" = "left") {
    const next = wrap(position + direction);
    if (direction === 1) setExit(flick);
    setPosition(next);
    announce(next);
  }

  function shuffle() {
    const next = [...order];
    for (let index = next.length - 1; index > 0; index--) {
      const swap = Math.floor(Math.random() * (index + 1));
      [next[index], next[swap]] = [next[swap], next[index]];
    }
    setExit("left");
    setOrder(next);
    setPosition(0);
    announce(0, next);
  }

  // A released drag stays on the leaving card for its exit; clear it afterward
  // so a card dealt back into view returns to the center.
  useEffect(() => {
    const cards = stack.current?.querySelectorAll<HTMLElement>(".finding-card");
    const timer = window.setTimeout(() => {
      cards?.forEach((card) => {
        if (card.dataset.offset !== "0") card.style.removeProperty("--drag");
      });
    }, 700);
    return () => window.clearTimeout(timer);
  }, [position, order]);

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    drag.current = {
      id: event.pointerId,
      x: event.clientX,
      dx: 0,
      active: false,
    };
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const state = drag.current;
    if (!state || state.id !== event.pointerId) return;
    state.dx = event.clientX - state.x;
    if (!state.active && Math.abs(state.dx) > 8) {
      state.active = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.dataset.dragging = "true";
    }
    if (state.active)
      event.currentTarget.style.setProperty("--drag", String(state.dx));
  }

  function onPointerEnd(event: PointerEvent<HTMLDivElement>) {
    const state = drag.current;
    drag.current = null;
    if (!state || state.id !== event.pointerId) return;
    delete event.currentTarget.dataset.dragging;
    if (state.active && Math.abs(state.dx) > flickDistance)
      deal(1, state.dx < 0 ? "left" : "right");
    else event.currentTarget.style.removeProperty("--drag");
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    deal(event.key === "ArrowRight" ? 1 : -1);
  }

  const current = wrap(position);

  return (
    <section className="findings-deck" aria-labelledby="deck-heading">
      <div className="deck-heading">
        <h2 id="deck-heading" data-inspect="Label">
          Deal a finding
        </h2>
        <p>
          {count} sourced observations, one card at a time. Flick a card, or use
          the buttons and arrow keys.
        </p>
      </div>
      <div className="deck-stack" ref={stack} data-exit={exit}>
        {(count >= visibleOffsets.length ? visibleOffsets : [0]).map(
          (offset) => {
            const finding = at(offset);
            const site = sites[finding.site];
            const isTop = offset === 0;
            return (
              <div
                key={finding.id}
                className="finding-card"
                data-site={finding.site}
                data-offset={offset}
                aria-hidden={isTop ? undefined : true}
                inert={!isTop}
                onPointerDown={isTop ? onPointerDown : undefined}
                onPointerMove={isTop ? onPointerMove : undefined}
                onPointerUp={isTop ? onPointerEnd : undefined}
                onPointerCancel={isTop ? onPointerEnd : undefined}
              >
                <div className="finding-card-top">
                  <span className="finding-number">
                    No. {pad(findings.indexOf(finding) + 1)}
                  </span>
                  {site && (
                    <Link className="finding-site" href={site.href}>
                      {site.name}
                    </Link>
                  )}
                </div>
                <p className="finding-text" data-inspect="Finding">
                  {finding.text}
                </p>
                <div className="finding-card-bottom">
                  <EvidenceBadge kind={finding.evidence} describe />
                  <Link
                    className="finding-evidence"
                    href={`/docs/${finding.site}/#${finding.anchor}`}
                  >
                    See the evidence{" "}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            );
          },
        )}
      </div>
      <div className="deck-controls">
        <button
          type="button"
          className="deck-icon-button"
          onClick={() => deal(-1)}
          onKeyDown={onKeyDown}
          aria-label="Previous finding"
        >
          <ArrowLeft size={18} strokeWidth={1.5} aria-hidden="true" />
        </button>
        <span className="deck-count" aria-hidden="true">
          {pad(current + 1)}
          <span> / {pad(count)}</span>
        </span>
        <button
          type="button"
          className="deck-next"
          onClick={() => deal(1)}
          onKeyDown={onKeyDown}
        >
          Deal the next one
          <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="deck-icon-button"
          onClick={shuffle}
          onKeyDown={onKeyDown}
          aria-label="Shuffle the deck"
        >
          <Shuffle size={17} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </section>
  );
}
