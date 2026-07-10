import type {
  MoneyContract,
  WineContract,
  WineLocationContract,
  WineRatingContract
} from "./wine.js";

export type ListWinesResponse = {
  items: WineContract[];
};

export type GetWineResponse = {
  item: WineContract | null;
};

/**
 * Body accepted by `POST /wines`. Server derives `id` and owner; the write
 * contract is intentionally stricter than the read {@link WineContract}.
 */
export type AddWineRequest = {
  name: string;
  estate: string;
  vintage?: number;
  year?: number;
  region: string;
  location: WineLocationContract;
  imageUrl: string;
  description: string;
  rating: WineRatingContract;
  price: MoneyContract;
  isFeatured: boolean;
};

export type AddWineResponse = {
  item: WineContract;
};
