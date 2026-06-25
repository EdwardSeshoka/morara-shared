export type DiscoverHeroType = "wine" | "event" | "article" | "collection" | "estate";

export type DiscoverHeroCta = {
  id: string;
  label: string;
  style?: "primary" | "secondary" | "ghost" | "icon";
};

export type DiscoverHeroStat = {
  id: string;
  value: string;
  label: string;
};

export type DiscoverDisplayTitle = {
  lineOne: string;
  lineTwo?: string;
};

export type BaseDiscoverHero = {
  type: DiscoverHeroType;
  id: string;
  title: string;
  displayTitle?: DiscoverDisplayTitle;
  subtitle?: string;
  description?: string;
  label?: string;
  volume?: number;
  issueLabel?: string;
  imageUrl?: string;
  ctas: DiscoverHeroCta[];
  stats: DiscoverHeroStat[];
};

export type DiscoverWineHero = BaseDiscoverHero & {
  type: "wine";
  wineId: string;
  estateName?: string;
  regionName?: string;
  styleName?: string;
  vintage?: number;
  averageRating?: number;
  totalTastingNotes?: number;
  price?: number;
  currency?: string;
  figureLabel?: string;
};

export type DiscoverEventHero = BaseDiscoverHero & {
  type: "event";
  eventId: string;
  date?: string;
  location?: string;
};

export type DiscoverArticleHero = BaseDiscoverHero & {
  type: "article";
  articleId: string;
  authorName?: string;
  publishedAt?: string;
};

export type DiscoverCollectionHero = BaseDiscoverHero & {
  type: "collection";
  collectionId: string;
};

export type DiscoverEstateHero = BaseDiscoverHero & {
  type: "estate";
  estateId: string;
  location?: string;
};

export type DiscoverHero =
  | DiscoverWineHero
  | DiscoverEventHero
  | DiscoverArticleHero
  | DiscoverCollectionHero
  | DiscoverEstateHero;
