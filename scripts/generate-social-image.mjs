import { readFile, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createElement as h } from "react";
import { ImageResponse } from "next/og.js";

const font = await readFile(resolve("assets/fonts/PPNeueMontreal-Regular.otf"));
const ink = "#183d2b";
const paper = "#f1f3ef";
const mark = h(
  "svg",
  { width: 46, height: 46, viewBox: "0 0 100 100" },
  h("path", {
    fill: ink,
    fillRule: "evenodd",
    d: "M32 8H92V68H86V14H32Z M20 20H80V80H74V26H20Z M8 32H68V92H8Z M20.5 44.5H55.5V52.833L33 71.167H55.5V79.5H20.5V71.167L43 52.833H20.5Z",
  }),
);
const image = new ImageResponse(
  h(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "45px 60px",
        background: paper,
        color: ink,
        fontFamily: "PP Neue Montreal",
      },
    },
    h(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          paddingBottom: 24,
          borderBottom: "1px solid #aebcb1",
        },
      },
      mark,
      h(
        "span",
        { style: { fontSize: 18, letterSpacing: 3 } },
        "UI / UX RESEARCH",
      ),
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          marginTop: 40,
          fontSize: 140,
          letterSpacing: -9,
          lineHeight: 0.96,
        },
      },
      h("span", null, "Behind the"),
      h("span", null, "Interface"),
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "auto",
          borderTop: "1px solid #aebcb1",
          paddingTop: 22,
          fontSize: 22,
        },
      },
      h("span", null, "The stories behind interesting websites."),
      h("span", { style: { fontSize: 16 } }, "BY ZEYAD OMRAN"),
    ),
  ),
  {
    width: 1200,
    height: 630,
    fonts: [
      { name: "PP Neue Montreal", data: font, weight: 400, style: "normal" },
    ],
  },
);
const output = resolve("public/og/behind-the-interface.png");
await mkdir(resolve("public/og"), { recursive: true });
await writeFile(output, Buffer.from(await image.arrayBuffer()));
console.log(`Generated ${output}`);
