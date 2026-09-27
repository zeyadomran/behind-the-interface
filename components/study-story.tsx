"use client";

import { useEffect, useRef, useState } from "react";
import Link from "@/components/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Pause,
  Play,
  RotateCw,
} from "lucide-react";
import { SiteHeader } from "./site-header";
import { SourceCredit } from "./source-credit";
import { WordprintArt, type WordprintMotif } from "./wordprint-art";
import { MotionPlayground } from "./story-playgrounds";
import { AnnotatedCapture } from "./annotated-capture";
import { TypeRuler } from "./type-ruler";
import { CaptureCompare } from "./capture-compare";
import { StudyGlance } from "./study-glance";
import { PocketButton } from "./notebook";
import type { StudyStory, StoryChapterId } from "@/lib/study-stories";
import {
  articleVisualData,
  originalResearchDate,
  type SiteKey,
} from "@/lib/article-visual-data";
import { getResearchSite } from "@/lib/research-sites";

const motifs: Record<SiteKey, WordprintMotif> = {
  noho: "noho",
  ace: "ace",
  "arkon-digital": "arkon",
  "neue-montreal": "neue",
  monolog: "monolog",
  "lama-lama": "lama",
};

function StoryHeroWord({ name }: { name: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);
  const [fitted, setFitted] = useState(false);

  useEffect(() => {
    const container = frame.current;
    const word = text.current;
    const hero = container?.parentElement;
    if (!container || !word || !hero) return;
    let disposed = false;

    const fit = () => {
      if (disposed) return;
      // Measure at the preferred size before fitting; never scale a previous fit.
      const preferredSize = Number.parseFloat(
        getComputedStyle(container).fontSize,
      );
      word.style.fontSize = `${preferredSize}px`;
      const naturalWidth = word.getBoundingClientRect().width;
      if (!naturalWidth || !container.clientWidth) return;
      const ratio = Math.min(1, (container.clientWidth - 2) / naturalWidth);
      word.style.fontSize = `${preferredSize * ratio}px`;
      setFitted(true);
    };

    fit();
    // The absolute lettering cannot resize the hero, avoiding an observer loop.
    const observer = new ResizeObserver(fit);
    observer.observe(hero);
    void document.fonts.ready.then(fit);
    document.fonts.addEventListener("loadingdone", fit);
    return () => {
      disposed = true;
      observer.disconnect();
      document.fonts.removeEventListener("loadingdone", fit);
    };
  }, [name]);

  return (
    <div
      ref={frame}
      className="story-hero-word story-drift"
      data-story-depth="0.22"
      data-fitted={fitted}
      aria-hidden="true"
    >
      <span ref={text}>{name}</span>
    </div>
  );
}

function lessonItem(story: StudyStory, id: StoryChapterId, text: string) {
  const chapter = story.chapters.find((item) => item.id === id);
  return {
    id: `${story.slug}:${id}`,
    text,
    source: story.name,
    context: chapter?.label ?? "Lesson",
    href: `/studies/${story.slug}/#${id}`,
  };
}

function TakeawayPlayground({ story }: { story: StudyStory }) {
  return (
    <figure
      className="story-playground story-takeaways"
      aria-labelledby={`${story.slug}-takeaways-title`}
    >
      <figcaption className="story-playground-heading">
        <strong id={`${story.slug}-takeaways-title`}>
          Pocket the lessons.
        </strong>
        <span>
          Save what you would carry into your own work. Your notebook stays in
          this browser.
        </span>
      </figcaption>
      <div className="takeaway-pair">
        {(
          [
            ["keep", "Keep.", story.keep],
            ["question", "Question.", story.question],
          ] as const
        ).map(([kind, word, text]) => (
          <div key={kind} className="takeaway-card" data-kind={kind}>
            <span className="takeaway-word" aria-hidden="true">
              {word}
            </span>
            <p>
              <span className="sr-only">{word} </span>
              {text}
            </p>
            <PocketButton
              item={{
                id: `${story.slug}:${kind}`,
                text,
                source: story.name,
                context: kind === "keep" ? "Keep" : "Question",
                href: `/studies/${story.slug}/#takeaways`,
              }}
            />
          </div>
        ))}
      </div>
      <ol
        className="takeaway-lessons"
        aria-label={`Five lessons from ${story.name}`}
      >
        {story.chapters.map((chapter, index) => (
          <li key={chapter.id}>
            <span className="takeaway-lesson-number">
              0{index + 1} · {chapter.label}
            </span>
            <p>{chapter.lesson}</p>
            <PocketButton
              item={lessonItem(story, chapter.id, chapter.lesson)}
            />
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function StudyStoryExperience({
  story,
  next,
}: {
  story: StudyStory;
  next: { name: string; slug: SiteKey };
}) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<StoryChapterId | null>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [posterActive, setPosterActive] = useState(false);
  const [dark, setDark] = useState(false);
  const motionOff = paused || reduced;
  const originalSite = getResearchSite(story.slug);
  const currentIndex = story.chapters.findIndex(
    (chapter) => chapter.id === active,
  );

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(preference.matches);
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const container = root.current;
    if (!container) return;
    const chapters = [
      ...container.querySelectorAll<HTMLElement>("[data-story-chapter]"),
    ];
    const layers = [
      ...container.querySelectorAll<HTMLElement>("[data-story-depth]"),
    ];
    let frame = 0;
    const update = () => {
      frame = 0;
      let chapter: StoryChapterId | null = null;
      for (const section of chapters) {
        if (
          section.getBoundingClientRect().top <=
          Math.max(180, window.innerHeight * 0.38)
        )
          chapter = section.id as StoryChapterId;
      }
      setActive(chapter);
      for (const layer of layers) {
        const rect = layer.getBoundingClientRect();
        const depth = Number(layer.dataset.storyDepth);
        // Use the stable parent box so the transformed layer does not feed back into its own position.
        const box = layer.parentElement?.getBoundingClientRect() ?? rect;
        const drift = motionOff
          ? 0
          : Math.max(
              -72,
              Math.min(
                72,
                (window.innerHeight / 2 - box.top - box.height / 2) * depth,
              ),
            );
        layer.style.setProperty("--story-drift", `${drift.toFixed(2)}px`);
      }
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, [motionOff, story.slug]);

  return (
    <div
      ref={root}
      className="study-story"
      data-theme={story.slug}
      data-site={story.slug}
      data-motion={motionOff ? "off" : "on"}
      data-dark={dark || undefined}
    >
      <SiteHeader study={{ slug: story.slug, name: story.name }} />

      <main id="main-content" tabIndex={-1}>
        <section className="story-hero" aria-labelledby="story-title">
          <StoryHeroWord name={story.name} />
          <div className="story-hero-copy">
            <Link className="story-back" href="/#studies">
              <ArrowLeft size={15} aria-hidden="true" /> All studies
            </Link>
            <p className="story-kicker">
              Study {story.edition} <span>/</span> {story.name}
            </p>
            <h1 id="story-title" data-inspect="Story title">
              {story.title}
            </h1>
            <p className="story-hero-intro" data-inspect="Lead">
              {story.subtitle}
            </p>
            {originalSite && (
              <SourceCredit
                sites={[originalSite]}
                className="story-source-credit"
              />
            )}
            <a className="story-start" href="#idea">
              Enter the story <ArrowDown size={20} aria-hidden="true" />
            </a>
            <span className="story-hero-footnote">
              Five chapters, about ten minutes. Press J and K to move between
              them.
            </span>
          </div>
          <div className="story-hero-scene">
            <div
              className="story-orbit story-drift"
              data-story-depth="-0.12"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </div>
            <div
              className="story-art-floating story-drift"
              data-story-depth="0.12"
            >
              <button
                type="button"
                className="story-poster study-wordprint"
                data-active={posterActive}
                aria-pressed={posterActive}
                aria-label={`Recompose the ${story.name} story cover`}
                onClick={() => setPosterActive(!posterActive)}
              >
                <WordprintArt motif={motifs[story.slug]} title={story.name} />
                <span className="story-poster-control">
                  An original visual interpretation{" "}
                  <RotateCw size={16} aria-hidden="true" />
                </span>
              </button>
              <span className="story-scene-caption">
                The interface is a clue.
                <br />
                Let’s follow it.
              </span>
            </div>
          </div>
        </section>

        <StudyGlance site={story.slug} />

        <div className="story-chapter-bar">
          <span className="story-progress-label" aria-hidden="true">
            {String(currentIndex + 1).padStart(2, "0")} <span>/ 05</span>
          </span>
          <nav aria-label="Story chapters">
            {story.chapters.map((chapter, index) => (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                aria-current={active === chapter.id ? "step" : undefined}
                onClick={() => setActive(chapter.id)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {chapter.label}
              </a>
            ))}
          </nav>
          <button
            className="story-motion-control"
            type="button"
            aria-pressed={motionOff}
            aria-label="Pause parallax motion"
            disabled={reduced}
            onClick={() => setPaused(!paused)}
          >
            {motionOff ? (
              <Play size={15} aria-hidden="true" />
            ) : (
              <Pause size={15} aria-hidden="true" />
            )}
            <span>
              {reduced
                ? "Reduced motion"
                : paused
                  ? "Motion paused"
                  : "Pause motion"}
            </span>
          </button>
          <div className="story-progress-track" aria-hidden="true">
            <span
              style={{
                width: `${((currentIndex + 1) / story.chapters.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {story.chapters.map((chapter, index) => (
          <section
            key={chapter.id}
            id={chapter.id}
            data-story-chapter={chapter.id}
            className="story-chapter"
            data-chapter={chapter.id}
            tabIndex={-1}
            aria-labelledby={`${chapter.id}-heading`}
          >
            <div className="story-chapter-opening">
              <p className="story-kicker">
                Chapter {String(index + 1).padStart(2, "0")} <span>/</span>{" "}
                {chapter.label}
              </p>
              <h2 id={`${chapter.id}-heading`} data-inspect="Chapter title">
                {chapter.title}
              </h2>
              <p className="story-chapter-intro" data-inspect="Intro">
                {chapter.intro}
              </p>
            </div>
            <div className="story-chapter-demo">
              <span
                className="story-chapter-numeral story-drift"
                data-story-depth="0.08"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              {chapter.id === "idea" ? (
                <AnnotatedCapture site={story.slug} thesis={story.thesis} />
              ) : chapter.id === "type" ? (
                <TypeRuler site={story.slug} />
              ) : chapter.id === "motion" ? (
                <MotionPlayground
                  site={story.slug}
                  noho={{
                    dark,
                    calm: paused,
                    setDark,
                    setCalm: setPaused,
                  }}
                />
              ) : chapter.id === "mobile" ? (
                <CaptureCompare site={story.slug} />
              ) : (
                <TakeawayPlayground story={story} />
              )}
            </div>
            <div className="story-chapter-details">
              {chapter.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className="story-lesson">
                <span>The lesson</span>
                <p>{chapter.lesson}</p>
                <PocketButton
                  item={lessonItem(story, chapter.id, chapter.lesson)}
                />
              </div>
              <div className="story-chapter-links">
                <Link
                  className="story-evidence-link"
                  href={`/docs/${story.slug}/#${chapter.researchAnchor}`}
                >
                  Open the detailed research{" "}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  className="story-evidence-link"
                  href={`/?lens=${chapter.id}#studies`}
                >
                  Compare {chapter.label.toLowerCase()} across every study{" "}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
            {story.chapters[index + 1] && (
              <a
                className="story-next-chapter"
                href={`#${story.chapters[index + 1].id}`}
              >
                Next chapter <span>{story.chapters[index + 1].label}</span>
                <ArrowDown size={17} aria-hidden="true" />
              </a>
            )}
          </section>
        ))}

        <section
          className="story-reading-room"
          aria-labelledby="reading-room-title"
        >
          <p className="story-kicker">The reading room</p>
          <h2 id="reading-room-title">
            Stay curious.
            <br />
            Go deeper.
          </h2>
          <p className="story-closing">{story.closing}</p>
          <div className="story-reading-links">
            <Link href={`/docs/${story.slug}/`}>
              <span>01 / The evidence</span>
              <strong>The complete {story.name} study</strong>
              <ArrowUpRight aria-hidden="true" />
            </Link>
            <Link href="/docs/research-findings/">
              <span>02 / The bigger picture</span>
              <strong>Findings across the collection</strong>
              <ArrowUpRight aria-hidden="true" />
            </Link>
            <Link href="/docs/methodology/">
              <span>03 / How to read it</span>
              <strong>Methodology and limits</strong>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          <p className="story-evidence-note">
            Based on research captured{" "}
            {articleVisualData[story.slug].researchDate ?? originalResearchDate}
            . Interactive illustrations explain design principles; the linked
            reports contain the observations, screenshots, and source evidence.
          </p>
        </section>

        <Link className="story-next-story" href={`/studies/${next.slug}/`}>
          <span>Keep exploring / Next story</span>
          <strong>{next.name}</strong>
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </main>
      <footer className="story-footer">
        <Link href="/">Behind the Interface</Link>
        <span>Independent observations by Zeyad Omran</span>
        <a href="#story-title">
          Back to the beginning <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </footer>
    </div>
  );
}
