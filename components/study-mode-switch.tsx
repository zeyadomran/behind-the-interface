import Link from "@/components/link";

/** The same study at two depths: a guided story and the complete research. */
export function StudyModeSwitch({
  slug,
  name,
  current,
}: {
  slug: string;
  name: string;
  current: "story" | "research";
}) {
  return (
    <nav
      className="mode-switch"
      aria-label={`${name}: reading mode`}
      data-current={current}
    >
      <Link
        href={`/studies/${slug}/`}
        aria-current={current === "story" ? "page" : undefined}
      >
        Story
      </Link>
      <Link
        href={`/docs/${slug}/`}
        aria-current={current === "research" ? "page" : undefined}
      >
        Research
      </Link>
    </nav>
  );
}
