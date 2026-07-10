export type RoomActivityType = "check_in" | "review" | "tasting_note";

/**
 * The member who performed the activity — a display snapshot, not the full
 * member profile (that lives in the member contract).
 */
export type ActivityUser = {
  id: string;
  displayName: string;
  initials?: string;
  role?: "enthusiast" | "sommelier" | "farmer" | "collector" | "producer";
};

/**
 * The wine an activity is about — a minimal reference, not the full
 * {@link WineContract}. Fetch the wine from the catalog api for detail.
 */
export type ActivityWineRef = {
  id: string;
  name: string;
  vintage?: number;
};

/**
 * A single activity in the room feed. `createdAt` is ISO-8601 data; relative
 * time labels are derived on the client.
 */
export type ActivityContract = {
  id: string;
  activityType: RoomActivityType;
  user: ActivityUser;
  wine: ActivityWineRef;
  rating?: number;
  note?: string;
  createdAt: string;
};
