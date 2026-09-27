"use client";

import { useEffect, useRef } from "react";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { X } from "lucide-react";
import { useInspect } from "./inspect-mode";
import { useBackdropClose, useNotebook } from "./notebook";

const shortcuts = [
  ["/", "Search the research"],
  ["I", "Inspect this page"],
  ["N", "Open your notebook"],
  ["J  K", "Next or previous story chapter"],
  ["?", "Show these shortcuts"],
  ["Esc", "Close a menu, panel or dialog"],
] as const;

function isTyping(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
  );
}

function moveChapter(direction: 1 | -1) {
  const chapters = [
    ...document.querySelectorAll<HTMLElement>("[data-story-chapter]"),
  ];
  if (!chapters.length) return;
  const line = Math.max(180, window.innerHeight * 0.38);
  let current = -1;
  chapters.forEach((chapter, index) => {
    if (chapter.getBoundingClientRect().top <= line) current = index;
  });
  const target =
    chapters[Math.min(chapters.length - 1, Math.max(0, current + direction))];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.focus({ preventScroll: true });
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
}

export function KeyboardShortcuts() {
  const { setOpenSearch } = useSearchContext();
  const { toggle } = useInspect();
  const { open } = useNotebook();
  const dialog = useRef<HTMLDialogElement>(null);
  useBackdropClose(dialog);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        isTyping(event.target) ||
        document.querySelector("dialog[open], [role='dialog']")
      )
        return;
      const key = event.key.toLowerCase();
      const action =
        key === "/"
          ? () => setOpenSearch(true)
          : key === "i"
            ? toggle
            : key === "n"
              ? open
              : key === "j"
                ? () => moveChapter(1)
                : key === "k"
                  ? () => moveChapter(-1)
                  : event.key === "?"
                    ? () => dialog.current?.showModal()
                    : null;
      if (!action) return;
      event.preventDefault();
      action();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpenSearch, toggle]);

  return (
    <dialog
      ref={dialog}
      id="keyboard-shortcuts"
      className="shortcuts-dialog"
      aria-labelledby="shortcuts-title"
    >
      <div className="shortcuts-panel" data-inspect-ignore="">
        <header>
          <h2 id="shortcuts-title">Keyboard shortcuts</h2>
          <form method="dialog">
            <button type="submit" className="notebook-close">
              <X size={18} aria-hidden="true" />
              <span className="sr-only">Close shortcuts</span>
            </button>
          </form>
        </header>
        <dl>
          {shortcuts.map(([keys, description]) => (
            <div key={keys}>
              <dt>
                {keys.split("  ").map((part) => (
                  <kbd key={part}>{part}</kbd>
                ))}
              </dt>
              <dd>{description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </dialog>
  );
}

export function ShortcutsButton() {
  return (
    <button
      type="button"
      className="shortcuts-button"
      onClick={() =>
        document
          .querySelector<HTMLDialogElement>("#keyboard-shortcuts")
          ?.showModal()
      }
    >
      Keyboard shortcuts <kbd>?</kbd>
    </button>
  );
}
