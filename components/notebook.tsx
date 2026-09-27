"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
  type RefObject,
} from "react";
import { Bookmark, BookmarkCheck, Copy, Trash2, X } from "lucide-react";
import Link from "@/components/link";
import { absoluteURL } from "@/lib/site";
import "@/app/notebook.css";

export interface NotebookItem {
  id: string;
  text: string;
  source: string;
  context: string;
  href: string;
}

interface NotebookState {
  items: NotebookItem[];
  has: (id: string) => boolean;
  toggle: (item: NotebookItem) => void;
  remove: (id: string) => void;
  clear: () => void;
  open: () => void;
}

const NotebookContext = createContext<NotebookState | null>(null);
const storageKey = "bti-notebook-v1";

export function useNotebook() {
  const context = useContext(NotebookContext);
  if (!context) throw new Error("useNotebook needs a NotebookProvider");
  return context;
}

function readStored(): NotebookItem[] {
  try {
    const value = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]");
    return Array.isArray(value)
      ? value.filter(
          (item): item is NotebookItem =>
            typeof item?.id === "string" &&
            typeof item.text === "string" &&
            typeof item.href === "string",
        )
      : [];
  } catch {
    return [];
  }
}

// A tiny external store: localStorage is the source of truth, shared by every
// tab. The server snapshot is empty, so prerendered markup never depends on it.
const emptyNotebook: NotebookItem[] = [];
const listeners = new Set<() => void>();
let cached: NotebookItem[] | null = null;

function snapshot() {
  cached ??= readStored();
  return cached;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== storageKey) return;
    cached = readStored();
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function write(update: (current: NotebookItem[]) => NotebookItem[]) {
  cached = update(snapshot());
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(cached));
  } catch {
    // Private browsing or blocked storage: the notebook lasts for this visit.
  }
  listeners.forEach((listener) => listener());
}

/** A click on a modal dialog's backdrop lands on the dialog element itself. */
export function useBackdropClose(ref: RefObject<HTMLDialogElement | null>) {
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const onClick = (event: MouseEvent) => {
      if (event.target === dialog) dialog.close();
    };
    dialog.addEventListener("click", onClick);
    return () => dialog.removeEventListener("click", onClick);
  }, [ref]);
}

export function NotebookProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, snapshot, () => emptyNotebook);
  const dialog = useRef<HTMLDialogElement>(null);

  const toggle = useCallback((item: NotebookItem) => {
    write((current) =>
      current.some((entry) => entry.id === item.id)
        ? current.filter((entry) => entry.id !== item.id)
        : [...current, item],
    );
  }, []);
  const remove = useCallback(
    (id: string) =>
      write((current) => current.filter((entry) => entry.id !== id)),
    [],
  );
  const clear = useCallback(() => write(() => []), []);
  const open = useCallback(() => dialog.current?.showModal(), []);

  const value = useMemo(
    () => ({
      items,
      has: (id: string) => items.some((item) => item.id === id),
      toggle,
      remove,
      clear,
      open,
    }),
    [items, toggle, remove, clear, open],
  );

  return (
    <NotebookContext.Provider value={value}>
      {children}
      <NotebookDialog ref={dialog} />
    </NotebookContext.Provider>
  );
}

function asMarkdown(items: NotebookItem[]) {
  const groups = new Map<string, NotebookItem[]>();
  for (const item of items)
    groups.set(item.source, [...(groups.get(item.source) ?? []), item]);
  return [
    "# My notes from Behind the Interface",
    "",
    ...[...groups].flatMap(([source, entries]) => [
      `## ${source}`,
      ...entries.map(
        (entry) =>
          `- ${entry.text} (${entry.context}) ${absoluteURL(entry.href)}`,
      ),
      "",
    ]),
  ].join("\n");
}

function NotebookDialog({ ref }: { ref: RefObject<HTMLDialogElement | null> }) {
  const { items, remove, clear } = useNotebook();
  const [status, setStatus] = useState("");
  useBackdropClose(ref);

  async function copy() {
    try {
      await navigator.clipboard.writeText(asMarkdown(items));
      setStatus("Copied as Markdown.");
    } catch {
      setStatus("Couldn’t reach the clipboard. Select the list and copy it.");
    }
  }

  return (
    <dialog
      ref={ref}
      className="notebook-dialog"
      aria-labelledby="notebook-title"
      onClose={() => setStatus("")}
    >
      <div className="notebook-panel" data-inspect-ignore="">
        <header className="notebook-header">
          <div>
            <p className="notebook-eyebrow">
              {items.length} {items.length === 1 ? "lesson" : "lessons"} saved
            </p>
            <h2 id="notebook-title">Your notebook</h2>
          </div>
          <form method="dialog">
            <button type="submit" className="notebook-close">
              <X size={18} aria-hidden="true" />
              <span className="sr-only">Close notebook</span>
            </button>
          </form>
        </header>
        {items.length === 0 ? (
          <div className="notebook-empty">
            <Bookmark size={28} strokeWidth={1.25} aria-hidden="true" />
            <p>
              Pocket a lesson from any story chapter and it lands here, ready to
              copy into your next design brief.
            </p>
            <p className="notebook-note">
              Saved only in this browser. Nothing is sent anywhere.
            </p>
          </div>
        ) : (
          <>
            <ol className="notebook-list">
              {items.map((item) => (
                <li key={item.id}>
                  <p>{item.text}</p>
                  <div className="notebook-item-meta">
                    <Link href={item.href} onClick={() => ref.current?.close()}>
                      {item.source} · {item.context}
                    </Link>
                    <button type="button" onClick={() => remove(item.id)}>
                      <Trash2 size={14} aria-hidden="true" />
                      <span className="sr-only">
                        Remove “{item.text}” from notebook
                      </span>
                    </button>
                  </div>
                </li>
              ))}
            </ol>
            <footer className="notebook-actions">
              <button type="button" onClick={copy}>
                <Copy size={15} aria-hidden="true" /> Copy as Markdown
              </button>
              <button type="button" onClick={clear}>
                Clear all
              </button>
              <p role="status" className="notebook-status">
                {status}
              </p>
            </footer>
          </>
        )}
      </div>
    </dialog>
  );
}

export function PocketButton({ item }: { item: NotebookItem }) {
  const { has, toggle } = useNotebook();
  const saved = has(item.id);
  return (
    <button
      type="button"
      className="pocket-button"
      aria-pressed={saved}
      onClick={() => toggle(item)}
    >
      {saved ? (
        <BookmarkCheck size={15} strokeWidth={1.6} aria-hidden="true" />
      ) : (
        <Bookmark size={15} strokeWidth={1.6} aria-hidden="true" />
      )}
      <span>{saved ? "Pocketed" : "Pocket"}</span>
      <span className="sr-only"> this lesson in your notebook</span>
    </button>
  );
}

export function NotebookButton({ compact = false }: { compact?: boolean }) {
  const { items, open } = useNotebook();
  return (
    <button
      type="button"
      className="notebook-button"
      aria-haspopup="dialog"
      onClick={open}
      title="Your notebook (N)"
    >
      <Bookmark size={17} strokeWidth={1.5} aria-hidden="true" />
      <span className={compact ? "sr-only" : undefined}>Notebook</span>
      {items.length > 0 && (
        <span className="notebook-count" key={items.length}>
          {items.length}
          <span className="sr-only"> saved</span>
        </span>
      )}
    </button>
  );
}
