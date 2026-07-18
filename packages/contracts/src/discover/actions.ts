/**
 * A quick action offered on a wine surface (hero, "worth opening now" row).
 * `enabled` lets the server gate an action by provenance/availability —
 * "request a taste" only exists when a listing does, "add to cellar" is universal.
 */
export type WineActionContract =
  | { kind: "request_taste"; enabled: boolean }
  | { kind: "add_to_cellar"; enabled: boolean }
  | { kind: "reserve"; enabled: boolean };
