export type WineEventType =
  | "sommelier_led"
  | "winemaker_dinner"
  | "tasting"
  | "pairing"
  | "launch";

/**
 * A wine event. `startDateTime` is ISO-8601 data; display labels (relative time,
 * event-type label) are derived on the client, not carried on the wire.
 */
export type EventContract = {
  id: string;
  title: string;
  eventType?: WineEventType;
  startDateTime?: string;
  venueName?: string;
  location?: string;
  seatsAvailable?: number;
  imageUrl?: string;
};
