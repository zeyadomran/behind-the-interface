export type WordprintMotif =
  | "ace"
  | "arkon"
  | "neue"
  | "monolog"
  | "lama"
  | "noho"
  | "synthesis"
  | "generic";

const pixelAlphabet: Record<string, string[]> = {
  A: ["01110", "11011", "11011", "11111", "11011", "11011", "11011"],
  C: ["01111", "11000", "11000", "11000", "11000", "11000", "01111"],
  E: ["11111", "11000", "11000", "11110", "11000", "11000", "11111"],
  L: ["11000", "11000", "11000", "11000", "11000", "11000", "11111"],
  M: ["10001", "11011", "11111", "10101", "10001", "10001", "10001"],
};

function PixelWord({
  word,
  unit,
  deconstructed = false,
}: {
  word: string;
  unit: number;
  deconstructed?: boolean;
}) {
  return word
    .split("")
    .flatMap((letter, letterIndex) =>
      pixelAlphabet[letter].flatMap((row, rowIndex) =>
        row
          .split("")
          .map((pixel, columnIndex) =>
            pixel === "1" ? (
              <rect
                key={`${letterIndex}-${rowIndex}-${columnIndex}`}
                x={(letterIndex * 6 + columnIndex) * unit}
                y={rowIndex * unit}
                width={unit - 2}
                height={unit - 2}
                className={
                  deconstructed
                    ? `wp-pixel wp-pixel--${(rowIndex * 3 + columnIndex + letterIndex) % 5}`
                    : (rowIndex + columnIndex) % 5 === 0
                      ? "wp-accent-fill"
                      : undefined
                }
              />
            ) : null,
          ),
      ),
    );
}

function Registration({ label, code }: { label: string; code: string }) {
  return (
    <g className="wp-registration">
      <text x="32" y="39">
        {label}
      </text>
      <text x="568" y="39" textAnchor="end">
        {code}
      </text>
      <path d="M32 52H568 M32 374H568" className="wp-rule" />
      <path
        d="M22 62H42M32 52V72 M558 364H578M568 354V374"
        className="wp-rule"
      />
    </g>
  );
}

function AceArt() {
  return (
    <>
      <Registration label="PRECISION / IN MODULES" code="ACE" />
      <g className="wp-ace-grid wp-rule">
        {[124, 172, 220, 268, 316].map((y) => (
          <path key={y} d={`M56 ${y}H544`} />
        ))}
        {[80, 176, 272, 368, 464, 536].map((x) => (
          <path key={x} d={`M${x} 100V340`} />
        ))}
      </g>
      <g className="wp-ace-raster">
        <PixelWord word="ACE" unit={28} />
      </g>
      <g className="wp-ace-type">
        <text
          x="28"
          y="321"
          fontSize="266"
          textLength="538"
          lengthAdjust="spacingAndGlyphs"
        >
          ACE
        </text>
      </g>
      <g className="wp-annotation">
        <text x="32" y="356">
          [ A → Z ]
        </text>
        <text x="568" y="356" textAnchor="end">
          SYSTEM / FORM
        </text>
      </g>
      <path
        d="M544 80V105M532 92H556"
        className="wp-ace-cross wp-accent-stroke"
      />
    </>
  );
}

function ArkonArt() {
  return (
    <>
      <Registration label="TYPE IN A SPATIAL FIELD" code="ARKON" />
      <g className="wp-arkon-orbit wp-accent-stroke">
        <circle r="137" />
        <ellipse rx="137" ry="48" transform="rotate(-24)" />
        <ellipse rx="63" ry="137" transform="rotate(-24)" />
        <ellipse rx="111" ry="137" transform="rotate(-24)" />
        <path d="M-162 0H162M0-162V162" className="wp-arkon-axis" />
        <circle r="5" cx="128" cy="-50" className="wp-accent-fill" />
      </g>
      <g className="wp-arkon-title">
        <text
          x="0"
          y="0"
          fontSize="131"
          textLength="536"
          lengthAdjust="spacingAndGlyphs"
        >
          ARKON
        </text>
      </g>
      <g className="wp-arkon-subtitle">
        <text
          x="0"
          y="0"
          fontSize="66"
          textLength="281"
          lengthAdjust="spacingAndGlyphs"
        >
          DIGITAL
        </text>
      </g>
      <g className="wp-annotation">
        <text x="32" y="354">
          X / Y / Z
        </text>
        <text x="568" y="354" textAnchor="end">
          A CHANGE OF PERSPECTIVE
        </text>
      </g>
    </>
  );
}

function NeueArt() {
  return (
    <>
      <Registration label="THE LETTER IS THE SUBJECT" code="NEUE" />
      <g className="wp-neue-guides wp-rule">
        <path d="M32 112H568M32 281H568M32 344H568" />
        <path d="M45 95V360M553 95V360" />
      </g>
      <g className="wp-neue-specimen">
        <text x="0" y="0" fontSize="280" letterSpacing="-22">
          Aa
        </text>
      </g>
      <g className="wp-neue-first">
        <text x="0" y="0" fontSize="118" letterSpacing="-6">
          NEUE
        </text>
      </g>
      <g className="wp-neue-last">
        <text
          x="0"
          y="0"
          fontSize="84"
          textLength="533"
          lengthAdjust="spacingAndGlyphs"
        >
          MONTRÉAL
        </text>
      </g>
      <g className="wp-neue-note wp-annotation">
        <text x="550" y="113" textAnchor="end">
          ONE FAMILY
        </text>
        <text x="550" y="130" textAnchor="end">
          MANY VOICES
        </text>
        <text x="550" y="184" textAnchor="end">
          400 / 600
        </text>
      </g>
    </>
  );
}

function MonologArt() {
  return (
    <>
      <Registration label="A POINT OF VIEW, REPEATED" code="MONOLOG" />
      <g className="wp-monolog-rules wp-rule">
        <path d="M32 161H568M32 257H568M32 353H568" />
      </g>
      {[0, 1, 2].map((row) => (
        <g key={row} className={`wp-monolog-row wp-monolog-row--${row + 1}`}>
          <text
            x="0"
            y="0"
            fontSize="97"
            textLength="526"
            lengthAdjust="spacingAndGlyphs"
          >
            MONOLOG
          </text>
        </g>
      ))}
      <g className="wp-monolog-marks wp-annotation">
        <text x="575" y="142" transform="rotate(-90 575 142)">
          VOICE
        </text>
        <text x="575" y="238" transform="rotate(-90 575 238)">
          SPACE
        </text>
        <text x="575" y="334" transform="rotate(-90 575 334)">
          RHYTHM
        </text>
      </g>
    </>
  );
}

function LamaArt() {
  return (
    <>
      <Registration label="ONE IDENTITY / EVERY PIXEL" code="LAMA" />
      <g className="wp-lama-grid wp-rule">
        {[77, 161, 245, 329, 413, 497].map((x) => (
          <path key={x} d={`M${x} 94V266`} />
        ))}
        {[94, 178, 262].map((y) => (
          <path key={y} d={`M56 ${y}H542`} />
        ))}
      </g>
      <g className="wp-lama-pixels">
        <PixelWord word="LAMA" unit={21} deconstructed />
      </g>
      <g className="wp-lama-type">
        <text
          x="29"
          y="352"
          fontSize="121"
          textLength="535"
          lengthAdjust="spacingAndGlyphs"
        >
          LAMA
        </text>
      </g>
      <g className="wp-lama-detail wp-accent-fill">
        <rect x="534" y="79" width="9" height="9" />
        <rect x="545" y="90" width="9" height="9" />
        <rect x="556" y="79" width="9" height="9" />
      </g>
    </>
  );
}

function SynthesisArt() {
  return (
    <>
      <Registration label="FIVE STUDIES / SHARED PRINCIPLES" code="SYNTHESIS" />
      <g className="wp-synthesis-links wp-rule">
        <path d="M109 111L448 161L162 269L442 335Z M109 111L162 269M448 161L442 335" />
        {[
          [109, 111],
          [448, 161],
          [162, 269],
          [442, 335],
        ].map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="5" />
        ))}
      </g>
      <g className="wp-synthesis-index wp-rule">
        {[130, 205, 280, 355].map((y) => (
          <path key={y} d={`M32 ${y}H568`} />
        ))}
      </g>
      <g className="wp-synthesis-type">
        <text
          x="0"
          y="0"
          fontSize="104"
          textLength="250"
          lengthAdjust="spacingAndGlyphs"
        >
          TYPE
        </text>
      </g>
      <g className="wp-synthesis-space">
        <text
          x="0"
          y="0"
          fontSize="76"
          textLength="252"
          lengthAdjust="spacingAndGlyphs"
        >
          SPACE
        </text>
      </g>
      <g className="wp-synthesis-motion">
        <text
          x="0"
          y="0"
          fontSize="80"
          textLength="310"
          lengthAdjust="spacingAndGlyphs"
        >
          MOTION
        </text>
      </g>
      <g className="wp-synthesis-intent">
        <text
          x="0"
          y="0"
          fontSize="57"
          textLength="204"
          lengthAdjust="spacingAndGlyphs"
        >
          INTENT
        </text>
      </g>
      <g className="wp-synthesis-numbers wp-annotation">
        {["01", "02", "03", "04"].map((number, index) => (
          <text key={number} x="568" y={116 + index * 75} textAnchor="end">
            {number}
          </text>
        ))}
      </g>
    </>
  );
}

function NohoArt() {
  return (
    <>
      <Registration label="ROOM FOR A LITTLE PLAY" code="NOHO / 06" />
      <g className="wp-noho-first">
        <text x="46" y="224" fontSize="170" letterSpacing="-12">
          no
        </text>
      </g>
      <g className="wp-noho-last wp-accent-fill">
        <text x="290" y="315" fontSize="170" letterSpacing="-12">
          ho
        </text>
      </g>
      <g className="wp-noho-seat wp-accent-stroke" strokeWidth="3">
        <path d="M78 246H258M96 246L80 324M238 246L254 324M334 126H498M348 126L338 74M484 126L494 74" />
      </g>
      <text x="32" y="356" className="wp-annotation">
        FLEXIBLE FORM / A CALMER CHOICE
      </text>
    </>
  );
}

function GenericArt({ title }: { title: string }) {
  const words = title.match(/[\p{L}\p{N}]+/gu) ?? ["Interesting", "Designs"];
  const first = Array.from(words[0])[0].toUpperCase();
  const second =
    Array.from(words[1] ?? words[0])[words.length > 1 ? 0 : 1]?.toUpperCase() ??
    first;

  return (
    <>
      <Registration label="AN OBSERVATION TAKES SHAPE" code="FIELD STUDY" />
      <g className="wp-generic-geometry wp-accent-stroke">
        <circle cx="300" cy="217" r="137" />
        <path d="M80 217H520M300 72V362" />
      </g>
      <g className="wp-generic-first">
        <text x="0" y="0" fontSize="242" textAnchor="middle">
          {first}
        </text>
      </g>
      <g className="wp-generic-last">
        <text x="0" y="0" fontSize="242" textAnchor="middle">
          {second}
        </text>
      </g>
      <text x="32" y="356" className="wp-annotation">
        {title.toUpperCase().slice(0, 48)}
      </text>
    </>
  );
}

/** Original typographic interpretations; the parent button owns interaction and its label. */
export function WordprintArt({
  motif,
  title,
}: {
  motif: WordprintMotif;
  title: string;
}) {
  return (
    <svg
      className={`wordprint-art wordprint-art--${motif}`}
      viewBox="0 0 600 420"
      aria-hidden="true"
      focusable="false"
    >
      {motif === "ace" ? (
        <AceArt />
      ) : motif === "arkon" ? (
        <ArkonArt />
      ) : motif === "neue" ? (
        <NeueArt />
      ) : motif === "monolog" ? (
        <MonologArt />
      ) : motif === "lama" ? (
        <LamaArt />
      ) : motif === "noho" ? (
        <NohoArt />
      ) : motif === "synthesis" ? (
        <SynthesisArt />
      ) : (
        <GenericArt title={title} />
      )}
    </svg>
  );
}
