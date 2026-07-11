import type { DiscoverContract } from "@edwardseshoka/contracts/discover";

import rawResponse from "./discover-response.json" with { type: "json" };

/**
 * The canned discover home response for app doubles — a frozen snapshot of the
 * backend's composed output. The double replays it verbatim so the same
 * production mapper runs; composition lives in the backend, not here. Kept in
 * sync with the backend by a contract test that composes the real response and
 * asserts it matches this fixture.
 */
export function createDiscover(): DiscoverContract {
  return rawResponse as DiscoverContract;
}
