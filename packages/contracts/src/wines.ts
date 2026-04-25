export type WineBadgeContract = {
  label: string;
};

export type WineLocationContract = {
  area: string;
};

export type WineRatingContract = {
  value: number;
  count?: number;
};

export type MoneyContract = {
  amount: number;
  currency: "ZAR" | "USD" | "EUR" | "GBP";
};

export type WineContract = {
  id: string;
  name: string;
  estate?: string;
  producerId?: string;
  vintage?: number;
  year: number;
  region: string;
  regionId?: string;
  styleName?: string;
  location?: WineLocationContract;
  imageUrl?: string;
  description?: string;
  rating?: WineRatingContract;
  price?: MoneyContract;
  badge?: WineBadgeContract;
  isFeatured?: boolean;
};

export type ListWinesResponse = {
  items: WineContract[];
};

export type GetWineResponse = {
  item: WineContract | null;
};
