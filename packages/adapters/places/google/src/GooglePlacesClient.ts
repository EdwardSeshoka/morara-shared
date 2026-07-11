import type {
  GetPlaceInput,
  Place,
  PlaceSuggestion,
  SearchPlacesInput,
} from "@edwardseshoka/places";

import { GooglePlacesError } from "./GooglePlacesError.js";
import {
  GooglePlaceEntityMapper,
  type GooglePlaceResponseDTO,
} from "./GooglePlaceEntityMapper.js";
import {
  GooglePlaceSuggestionEntityMapper,
  type GooglePlaceSuggestionResponseDTO,
} from "./GooglePlaceSuggestionEntityMapper.js";
import type {
  GooglePlacesClientConfiguration,
  GooglePlacesFetch,
} from "./GooglePlacesTypes.js";

const DEFAULT_BASE_URL = "https://places.googleapis.com/v1";

const AUTOCOMPLETE_FIELD_MASK = [
  "suggestions.placePrediction.placeId",
  "suggestions.placePrediction.text.text",
  "suggestions.placePrediction.structuredFormat.mainText.text",
  "suggestions.placePrediction.structuredFormat.secondaryText.text",
  "suggestions.placePrediction.types",
].join(",");

const ADDRESS_DETAILS_FIELD_MASK = [
  "id",
  "formattedAddress",
  "addressComponents",
  "location",
].join(",");

const ORGANIZATION_DETAILS_FIELD_MASK = [
  ADDRESS_DETAILS_FIELD_MASK,
  "displayName",
  "primaryType",
  "types",
  "websiteUri",
  "businessStatus",
].join(",");

export class GooglePlacesClient {
  private readonly apiKey: string;
  private readonly fetch: GooglePlacesFetch;
  private readonly baseUrl: string;
  private readonly suggestionMapper = new GooglePlaceSuggestionEntityMapper();
  private readonly placeMapper: GooglePlaceEntityMapper;

  constructor(configuration: GooglePlacesClientConfiguration) {
    if (configuration.apiKey.trim().length === 0) {
      throw new Error("Google Places API key is required.");
    }

    this.apiKey = configuration.apiKey;
    this.fetch = configuration.fetch ?? globalThis.fetch;
    this.baseUrl = (configuration.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, "");
    this.placeMapper = new GooglePlaceEntityMapper(
      configuration.now ?? (() => new Date()),
    );
  }

  async autocomplete(
    request: SearchPlacesInput,
  ): Promise<ReadonlyArray<PlaceSuggestion>> {
    const input = request.input.trim();
    if (input.length === 0) return [];

    const body: Record<string, unknown> = {
      input,
      sessionToken: requireValue(request.sessionToken, "Session token"),
      includeQueryPredictions: false,
      includePureServiceAreaBusinesses: false,
    };

    if (request.purpose === "address") {
      body.includedPrimaryTypes = ["street_address", "premise", "subpremise"];
    }
    if (request.languageCode) body.languageCode = request.languageCode;
    if (request.regionCode) body.regionCode = request.regionCode;
    if (request.includedRegionCodes?.length) {
      body.includedRegionCodes = request.includedRegionCodes;
    }
    if (request.locationBias) {
      body.locationBias = {
        circle: {
          center: request.locationBias.center,
          radius: request.locationBias.radiusMeters,
        },
      };
    }

    const response = await this.fetchJson<GoogleAutocompleteResponse>(
      `${this.baseUrl}/places:autocomplete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-FieldMask": AUTOCOMPLETE_FIELD_MASK,
        },
        body: JSON.stringify(body),
      },
    );

    return (response.suggestions ?? []).flatMap(({ placePrediction }) => {
      if (!placePrediction) return [];
      const result = this.suggestionMapper.map(placePrediction);
      return result.success ? [result.data] : [];
    });
  }

  async getPlaceDetails(
    request: GetPlaceInput,
  ): Promise<Place> {
    const placeId = requireValue(request.placeId, "Place ID");
    const sessionToken = requireValue(request.sessionToken, "Session token");
    const query = new URLSearchParams({ sessionToken });

    if (request.languageCode) query.set("languageCode", request.languageCode);
    if (request.regionCode) query.set("regionCode", request.regionCode);

    const response = await this.fetchJson<GooglePlaceResponseDTO>(
      `${this.baseUrl}/places/${encodeURIComponent(placeId)}?${query.toString()}`,
      {
        method: "GET",
        headers: {
          "X-Goog-FieldMask":
            request.purpose === "organization"
              ? ORGANIZATION_DETAILS_FIELD_MASK
              : ADDRESS_DETAILS_FIELD_MASK,
        },
      },
    );

    const result = this.placeMapper.map({
      ...response,
      id: response.id ?? placeId,
    });
    if (!result.success) throw result.error;
    return result.data;
  }

  private async fetchJson<T>(url: string, init: RequestInit): Promise<T> {
    const response = await this.fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        "X-Goog-Api-Key": this.apiKey,
      },
    });
    const responseBody = await readResponseBody(response);

    if (!response.ok) {
      throw new GooglePlacesError(response.status, responseBody);
    }

    return responseBody as T;
  }
}

function requireValue(value: string, label: string): string {
  const trimmedValue = value.trim();
  if (trimmedValue.length === 0) {
    throw new Error(`${label} is required.`);
  }
  return trimmedValue;
}

async function readResponseBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (text.length === 0) return null;

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

type GoogleAutocompleteResponse = {
  suggestions?: Array<{
    placePrediction?: GooglePlaceSuggestionResponseDTO;
  }>;
};
