"use client";

import { useEffect, useRef, useState } from "react";
import Link from "@/components/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Pause,
  Play,
  RotateCw,
} from "lucide-react";
import { Brand } from "./brand";
import { SourceCredit } from "./source-credit";
import { WordprintArt, type WordprintMotif } from "./wordprint-art";
import {
  TypePlayground,
  MotionPlayground,
  ResponsivePlayground,
} from "./story-playgrounds";
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

function IdeaPlayground({ story }: { story: StudyStory }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <figure className="story-idea-panel" data-revealed={revealed}>
      <div className="story-idea-stage">
        <div className="story-idea-poster" aria-hidden="true">
          <WordprintArt motif={motifs[story.slug]} title={story.name} />
        </div>
        <blockquote
          id={`${story.slug}-principle`}
          className="story-principle"
          aria-hidden={!revealed}
        >
          {story.thesis}
        </blockquote>
      </div>
      <figcaption>
        <span>One visual idea. Many decisions.</span>
        <button
          type="button"
          aria-expanded={revealed}
          aria-controls={`${story.slug}-principle`}
          aria-label={`${revealed ? "Back to the visual" : "Reveal the principle"} for ${story.name}`}
          onClick={() => setRevealed(!revealed)}
        >
          {revealed ? "Back to the visual" : "Reveal the principle"}
          <ArrowUpRight size={17} aria-hidden="true" />
        </button>
      </figcaption>
    </figure>
  );
}

function TakeawayPlayground({ story }: { story: StudyStory }) {
  const [choice, setChoice] = useState<"keep" | "question">("keep");
  return (
    <div className="story-takeaway-panel" data-choice={choice}>
      <div
        className="story-choice-row"
        role="group"
        aria-label="Choose a design takeaway"
      >
        <button
          type="button"
          aria-pressed={choice === "keep"}
          onClick={() => setChoice("keep")}
        >
          Borrow this
        </button>
        <button
          type="button"
          aria-pressed={choice === "question"}
          onClick={() => setChoice("question")}
        >
          Question this
        </button>
      </div>
      <div className="story-takeaway-answer" aria-live="polite">
        <span className="story-takeaway-word" aria-hidden="true">
          {choice === "keep" ? "Keep." : "Question."}
        </span>
        <p>{choice === "keep" ? story.keep : story.question}</p>
      </div>
      <span className="story-small-label">
        A principle to carry into your next design
      </span>
    </div>
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
      data-motion={motionOff ? "off" : "on"}
    >
      <header className="story-header">
        <Link href="/" aria-label="Behind the Interface library">
          <Brand compact />
        </Link>
        <span className="story-header-subject">
          {story.name} <span>/ A design story</span>
        </span>
        <Link className="story-header-research" href={`/docs/${story.slug}/`}>
          <BookOpen size={16} aria-hidden="true" />
          <span>Deep research</span>
        </Link>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="story-hero" aria-labelledby="story-title">
          <StoryHeroWord name={story.name} />
          <div className="story-hero-copy">
            <Link className="story-back" href="/#library">
              <ArrowLeft size={15} aria-hidden="true" /> The collection
            </Link>
            <p className="story-kicker">
              Study {story.edition} <span>/</span> {story.name}
            </p>
            <h1 id="story-title">{story.title}</h1>
            <p className="story-hero-intro">{story.subtitle}</p>
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
              Five chapters. A different way of looking.
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
            tabIndex={-1}
            aria-labelledby={`${chapter.id}-heading`}
          >
            <div className="story-chapter-opening">
              <p className="story-kicker">
                Chapter {String(index + 1).padStart(2, "0")} <span>/</span>{" "}
                {chapter.label}
              </p>
              <h2 id={`${chapter.id}-heading`}>{chapter.title}</h2>
              <p className="story-chapter-intro">{chapter.intro}</p>
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
                <IdeaPlayground story={story} />
              ) : chapter.id === "type" ? (
                <TypePlayground site={story.slug} />
              ) : chapter.id === "motion" ? (
                <MotionPlayground site={story.slug} />
              ) : chapter.id === "mobile" ? (
                <ResponsivePlayground site={story.slug} />
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
              </div>
              <Link
                className="story-evidence-link"
                href={`/docs/${story.slug}/#${chapter.researchAnchor}`}
              >
                Open the detailed research{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
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
