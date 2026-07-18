/**
 * Trust, provenance and verdict — the cross-cutting "how backed is this record,
 * and what does Kgwari say about it" vocabulary. Shared by wines, doorways,
 * events, room activity and editorial, so the three marks, the three provenance
 * states and the verdict word never drift apart between features.
 *
 * Introduced for the Fade Yield model. Several decisions are flagged inline —
 * search "DECISION:".
 */

/**
 * The account-verification tier that renders a TrustMark. A mark ALWAYS means
 * verified; regular members carry no tier. The three are kept deliberately
 * distinct — a professional's word (gold seal), a producer's (filled burgundy
 * crest) and a distributor's (outline crest) must never be mistaken for one
 * another.
 *
 * Canonical trust vocabulary (unified 2026-07): TrustTier is exactly the three
 * verified {@link MemberProfileType}s that earn a mark — professional · producer
 * · distributor. A member (profileType "enthusiast") earns no tier; their
 * standing is a {@link MemberStatus} word instead.
 */
export type TrustTier = "professional" | "producer" | "distributor";

/**
 * A member's standing, shown as a burgundy STATUS WORD — never a mark. Status
 * and verification are two different visual languages: a member never renders a
 * TrustMark, and a verified account never renders a status word.
 *
 * The ladder is "enthusiast → collector"; "collector" is an upgrade earned from
 * member activity (reviews, cellar, contributions), assigned by the system.
 */
export type MemberStatus = "enthusiast" | "collector";

/**
 * The account persona chosen at business onboarding — finer-grained than the
 * {@link TrustTier} mark it earns. Several personas share one mark: a restaurant,
 * a floor sommelier and a wine club all pour & sell (gold professional mark); an
 * estate and an independent winemaker both make wine (producer crest); an
 * importer and a distributor both bring wine to market (distributor crest).
 * "sommelier" is the individual; "venue" is the establishment.
 */
export type BusinessPersona =
  | "estate"
  | "winemaker"
  | "importer"
  | "distributor"
  | "sommelier"
  | "venue"
  | "wine_club";

/** The verification mark each business persona earns. The single source of truth. */
export const personaTier: Record<BusinessPersona, TrustTier> = {
  estate: "producer",
  winemaker: "producer",
  importer: "distributor",
  distributor: "distributor",
  sommelier: "professional",
  venue: "professional",
  wine_club: "professional",
};

/**
 * How backed a record is. Drives the ProvenanceTag and, when `listed`, the
 * "Request a taste" availability action.
 *  - community: seeded from member knowledge; no owner has claimed it. No mark —
 *               the missing mark is a reward not yet given, never a defect.
 *  - listed:    a distributor has listed it (commerce is live) but the producer
 *               has not verified — the crest shows in its outline state.
 *  - verified:  the producer has claimed it — the full burgundy crest; the
 *               byline is the estate's official word.
 */
export type ProvenanceState = "community" | "listed" | "verified";

/**
 * The author line that carries trust: a name plus EITHER a verification `tier`
 * (renders a mark) OR a member `status` word — never both. `role` is a plain
 * descriptor rendered after the name ("sommelier", "verified producer",
 * "1,480 member notes"). The name is the canonical identifier and must never be
 * truncated to an ellipsis on the client.
 *
 * INVARIANT: `tier` and `status` are mutually exclusive (verification vs standing).
 */
export type TrustBylineContract = {
  name: string;
  tier?: TrustTier;
  status?: MemberStatus;
  role?: string;
  href?: string;
};

/**
 * The verdict — a worded judgement on a wine, never a numeric score. One
 * 5-level ordinal scale, shared by the member review picker ("How did it land?")
 * and the house / aggregate verdict shown in Discover, kept identical so a chip
 * scans the same wherever it appears. Ordered best → worst; "Unforgettable" is
 * the top rung and rarely awarded. Extend only with deliberate editorial intent
 * (do not switch to a free string).
 */
export type VerdictWord =
  | "Unforgettable"
  | "Essential"
  | "Worth Revisiting"
  | "An Interesting Discovery"
  | "Not One I'd Revisit";

/** The verdict type used across contracts — the fixed {@link VerdictWord} set. */
export type Verdict = VerdictWord;
