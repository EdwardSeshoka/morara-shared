import { GooglePlacesError } from "./GooglePlacesError.js";
import type {
  GooglePlaceAddressComponent,
  GooglePlaceDetails,
  GooglePlaceDetailsRequest,
  GooglePlaceSuggestion,
  GooglePlacesAutocompleteRequest,
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

  constructor(configuration: GooglePlacesClientConfiguration) {
    if (configuration.apiKey.trim().length === 0) {
      throw new Error("Google Places API key is required.");
    }

    this.apiKey = configuration.apiKey;
    this.fetch = configuration.fetch ?? globalThis.fetch;
    this.baseUrl = (configuration.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, "");
  }

  async autocomplete(
    request: GooglePlacesAutocompleteRequest,
  ): Promise<ReadonlyArray<GooglePlaceSuggestion>> {
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
      if (!placePrediction?.placeId || !placePrediction.text?.text) return [];

      return [{
        placeId: placePrediction.placeId,
        text: placePrediction.text.text,
        primaryText:
          placePrediction.structuredFormat?.mainText?.text ??
          placePrediction.text.text,
        secondaryText:
          placePrediction.structuredFormat?.secondaryText?.text ?? null,
        types: placePrediction.types ?? [],
      }];
    });
  }

  async getPlaceDetails(
    request: GooglePlaceDetailsRequest,
  ): Promise<GooglePlaceDetails> {
    const placeId = requireValue(request.placeId, "Place ID");
    const sessionToken = requireValue(request.sessionToken, "Session token");
    const query = new URLSearchParams({ sessionToken });

    if (request.languageCode) query.set("languageCode", request.languageCode);
    if (request.regionCode) query.set("regionCode", request.regionCode);

    const response = await this.fetchJson<GooglePlaceDetailsResponse>(
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

    return {
      placeId: response.id ?? placeId,
      displayName: response.displayName?.text ?? null,
      formattedAddress: response.formattedAddress ?? "",
      addressComponents: (response.addressComponents ?? []).map(
        mapAddressComponent,
      ),
      location: response.location ?? null,
      primaryType: response.primaryType ?? null,
      types: response.types ?? [],
      websiteUri: response.websiteUri ?? null,
      businessStatus: response.businessStatus ?? null,
    };
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

function mapAddressComponent(
  component: GoogleAddressComponentResponse,
): GooglePlaceAddressComponent {
  return {
    longText: component.longText ?? "",
    shortText: component.shortText ?? "",
    types: component.types ?? [],
    languageCode: component.languageCode ?? null,
  };
}

type GoogleAutocompleteResponse = {
  suggestions?: Array<{
    placePrediction?: {
      placeId?: string;
      text?: { text?: string };
      structuredFormat?: {
        mainText?: { text?: string };
        secondaryText?: { text?: string };
      };
      types?: string[];
    };
  }>;
};

type GoogleAddressComponentResponse = {
  longText?: string;
  shortText?: string;
  types?: string[];
  languageCode?: string;
};

type GooglePlaceDetailsResponse = {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  addressComponents?: GoogleAddressComponentResponse[];
  location?: { latitude: number; longitude: number };
  primaryType?: string;
  types?: string[];
  websiteUri?: string;
  businessStatus?: string;
};
