"use client";

import { useId, useState, type PointerEvent } from "react";
import { RotateCw } from "lucide-react";
import { WordprintArt, type WordprintMotif } from "./wordprint-art";

const motifs: Record<string, WordprintMotif> = {
  noho: "noho",
  ace: "ace",
  "arkon-digital": "arkon",
  "neue-montreal": "neue",
  monolog: "monolog",
  "lama-lama": "lama",
  collection: "synthesis",
};

const concepts: Record<WordprintMotif, { label: string; description: string }> =
  {
    noho: {
      label: "Room for play",
      description:
        "An original wordprint exploring Noho’s playful furniture and flexible composition.",
    },
    ace: {
      label: "Precision / texture",
      description:
        "An original wordprint exploring Ace’s technical, grid-based character.",
    },
    arkon: {
      label: "Type / space",
      description:
        "An original wordprint exploring Arkon’s balance of typography and space.",
    },
    neue: {
      label: "Type as the subject",
      description:
        "An original wordprint inspired by Neue Montréal’s playful type specimens.",
    },
    monolog: {
      label: "Rhythm / emphasis",
      description:
        "An original wordprint exploring MONOLOG’s shifts in editorial emphasis.",
    },
    lama: {
      label: "A modular identity",
      description:
        "An original wordprint inspired by Lama Lama’s pixel-based visual language.",
    },
    synthesis: {
      label: "Patterns / connections",
      description:
        "An original wordprint connecting type, space, motion, and intent.",
    },
    generic: {
      label: "A closer look",
      description:
        "An original wordprint that rearranges the initials of this research entry.",
    },
  };

export function StudyWordprint({
  visual,
  title,
}: {
  visual?: string;
  title: string;
}) {
  const motif = (visual && motifs[visual]) || "generic";
  const concept = concepts[motif];
  const [active, setActive] = useState(false);
  const descriptionId = useId();

  function resetPointer(button: HTMLButtonElement) {
    button.style.setProperty("--wp-x", "0");
    button.style.setProperty("--wp-y", "0");
  }

  function movePointer(event: PointerEvent<HTMLButtonElement>) {
    if (
      event.pointerType !== "mouse" ||
      !window.matchMedia(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      ).matches
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    event.currentTarget.style.setProperty("--wp-x", x.toFixed(3));
    event.currentTarget.style.setProperty("--wp-y", y.toFixed(3));
  }

  return (
    <figure className="wordprint-figure">
      <button
        type="button"
        className="study-wordprint"
        data-motif={motif}
        data-active={active}
        aria-label={`Recompose the ${title} wordprint`}
        aria-describedby={descriptionId}
        aria-pressed={active}
        onClick={() => setActive((value) => !value)}
        onPointerMove={movePointer}
        onPointerLeave={(event) => resetPointer(event.currentTarget)}
        onBlur={(event) => resetPointer(event.currentTarget)}
      >
        <span className="wordprint-topline" aria-hidden="true">
          <span>Interactive wordprint</span>
          <span className="wordprint-state">{active ? "02" : "01"} / 02</span>
        </span>
        <span className="wordprint-scene">
          <WordprintArt motif={motif} title={title} />
        </span>
        <span className="wordprint-footer" aria-hidden="true">
          <span>{concept.label}</span>
          <span className="wordprint-action">
            Recompose <RotateCw size={15} />
          </span>
        </span>
      </button>
      <figcaption id={descriptionId}>{concept.description}</figcaption>
    </figure>
  );
}
