export class GooglePlacesError extends Error {
  readonly status: number;
  readonly responseBody: unknown;

  constructor(status: number, responseBody: unknown) {
    super(`Google Places request failed with status ${status}.`);
    this.name = "GooglePlacesError";
    this.status = status;
    this.responseBody = responseBody;
  }
}
