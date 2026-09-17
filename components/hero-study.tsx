"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import "@/app/hero-study.css";

const layers = [
  {
    name: "Typography",
    description:
      "The voice of a website. Follow its scale, rhythm, and small details.",
  },
  {
    name: "Interaction",
    description:
      "The feeling between steps. Explore what moves, responds, and invites you in.",
  },
  {
    name: "Structure",
    description:
      "The order underneath. See how space and hierarchy guide the story.",
  },
];

function StudyArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function HeroStudy() {
  const [layer, setLayer] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const motionAllowed = useRef(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      motionAllowed.current = !preference.matches;
      if (preference.matches) {
        stage.current?.style.setProperty("--study-tilt-x", "0deg");
        stage.current?.style.setProperty("--study-tilt-y", "0deg");
      }
    };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  function resetTilt() {
    stage.current?.style.setProperty("--study-tilt-x", "0deg");
    stage.current?.style.setProperty("--study-tilt-y", "0deg");
  }

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !motionAllowed.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const x = Math.max(
      -0.5,
      Math.min(0.5, (event.clientX - bounds.left) / bounds.width - 0.5),
    );
    const y = Math.max(
      -0.5,
      Math.min(0.5, (event.clientY - bounds.top) / bounds.height - 0.5),
    );
    event.currentTarget.style.setProperty("--study-tilt-x", `${y * -7}deg`);
    event.currentTarget.style.setProperty("--study-tilt-y", `${x * 9}deg`);
  }

  return (
    <figure
      className="hero-study"
      aria-label="Interactive illustration of website layers"
    >
      <div
        ref={stage}
        className="hero-study-stage"
        data-layer={layer}
        onPointerMove={tilt}
        onPointerLeave={resetTilt}
        onPointerCancel={resetTilt}
        aria-hidden="true"
      >
        <span className="hero-study-coordinate">
          FIG. 01 / BEHIND THE SURFACE
        </span>
        <div className="hero-study-stack">
          <div className="hero-study-plane hero-study-structure">
            <div className="hero-study-plane-label">
              <span>03 / STRUCTURE</span>
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M8 2v12M2 8h12" stroke="currentColor" />
              </svg>
            </div>
            <div className="hero-study-grid">
              {Array.from({ length: 12 }, (_, index) => (
                <i key={index} />
              ))}
            </div>
            <div className="hero-study-baseline">
              <span>SPACE</span>
              <span>HIERARCHY</span>
            </div>
          </div>
          <div className="hero-study-plane hero-study-interaction">
            <div className="hero-study-plane-label">
              <span>02 / INTERACTION</span>
              <StudyArrow />
            </div>
            <div className="hero-study-layout">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="hero-study-path">
              <i />
              <span />
              <i />
            </div>
          </div>
          <div className="hero-study-plane hero-study-typography">
            <div className="hero-study-plane-label">
              <span>01 / TYPOGRAPHY</span>
              <span className="hero-study-dot" />
            </div>
            <div className="hero-study-glyph">
              Aa<span>.</span>
            </div>
            <div className="hero-study-type-detail">
              <span>Aa Bb Cc / 0123</span>
              <StudyArrow />
            </div>
          </div>
        </div>
        <svg className="hero-study-cross" viewBox="0 0 24 24" fill="none">
          <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
      <figcaption>
        <div
          className="hero-study-controls"
          role="group"
          aria-label="Explore the layers of a website"
        >
          {layers.map(({ name }, index) => (
            <button
              key={name}
              type="button"
              aria-pressed={layer === index}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setLayer(index);
              }}
              onFocus={() => setLayer(index)}
              onClick={() => setLayer(index)}
            >
              <span className="hero-study-control-number">0{index + 1}</span>
              <span>{name}</span>
            </button>
          ))}
        </div>
        <p className="hero-study-caption" aria-live="polite">
          {layers[layer].description}
        </p>
      </figcaption>
    </figure>
  );
}
