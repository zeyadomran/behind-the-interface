import {
  articleVisualData,
  originalResearchDate,
  type SiteKey,
} from "@/lib/article-visual-data";
import { studyProfiles } from "@/lib/study-profiles";
import type { EvidenceKind } from "@/lib/evidence";
import { EvidenceBadge } from "./evidence-badge";

const order: EvidenceKind[] = [
  "observed",
  "mixed",
  "source-confirmed",
  "hook-only",
];

/** The research's style-map row for one website, before the chapters begin. */
export function StudyGlance({ site }: { site: SiteKey }) {
  const profile = studyProfiles[site];
  const data = articleVisualData[site];
  const counts = order
    .map((kind) => ({
      kind,
      count: data.interactions.filter((item) => item.evidence === kind).length,
    }))
    .filter((entry) => entry.count > 0);

  return (
    <section className="story-glance" aria-label={`${data.name} at a glance`}>
      <dl>
        <div>
          <dt>Style</dt>
          <dd>{profile.style}</dd>
        </div>
        <div>
          <dt>The idea</dt>
          <dd>{profile.idea}</dd>
        </div>
        <div>
          <dt>Borrow it for</dt>
          <dd>{profile.borrow}</dd>
        </div>
        <div>
          <dt>Watch for</dt>
          <dd>{profile.tension}</dd>
        </div>
        <div>
          <dt>Interaction evidence</dt>
          <dd className="story-glance-evidence">
            {counts.map((entry) => (
              <span key={entry.kind}>
                <strong>{entry.count}</strong>
                <EvidenceBadge kind={entry.kind} />
              </span>
            ))}
            <span className="story-glance-date">
              Researched {data.researchDate ?? originalResearchDate}
            </span>
          </dd>
        </div>
      </dl>
    </section>
  );
}
