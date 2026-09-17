import { createFromSource } from "fumadocs-core/search/server";
import { source } from "../../../lib/source";

// The exported index contains headings and body text. Result URLs deliberately
// stay unprefixed because the Fumadocs adapter uses React Router's basename.
export const { staticGET: GET } = createFromSource(source);
