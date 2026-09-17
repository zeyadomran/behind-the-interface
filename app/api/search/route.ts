import { createFromSource } from "fumadocs-core/search/server";
import { source } from "../../../lib/source";

export const dynamic = "force-static";

// The exported index contains headings and body text. Result URLs deliberately
// stay unprefixed because the Fumadocs Next provider uses Next's router.
export const { staticGET: GET } = createFromSource(source);
