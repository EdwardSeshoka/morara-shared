export type GooglePlacesFetch = (
  input: string | URL,
  init?: RequestInit,
) => Promise<Response>;

export type GooglePlacesClientConfiguration = {
  apiKey: string;
  fetch?: GooglePlacesFetch;
  baseUrl?: string;
  now?: () => Date;
};
