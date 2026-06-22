import type {
  GetPlaceRequestDTO,
  GetPlaceResponseDTO,
  SearchPlacesRequestDTO,
  SearchPlacesResponseDTO,
} from "../DTOs/index.js";

export type PlacesHTTPRequest = {
  method: "POST";
  path: string;
  body: unknown;
};

export type PlacesHTTPResponse<Output> = {
  data: Output;
};

export interface PlacesHTTPClient {
  request<Output>(
    request: PlacesHTTPRequest,
  ): Promise<PlacesHTTPResponse<Output>>;
}

export interface PlacesServiceInterface {
  search(input: SearchPlacesRequestDTO): Promise<SearchPlacesResponseDTO>;
  getDetails(input: GetPlaceRequestDTO): Promise<GetPlaceResponseDTO>;
}

export class PlacesService implements PlacesServiceInterface {
  constructor(private readonly client: PlacesHTTPClient) {}

  async search(
    input: SearchPlacesRequestDTO,
  ): Promise<SearchPlacesResponseDTO> {
    const response = await this.client.request<SearchPlacesResponseDTO>({
      method: "POST",
      path: "/v1/places/autocomplete",
      body: input,
    });

    return response.data;
  }

  async getDetails(input: GetPlaceRequestDTO): Promise<GetPlaceResponseDTO> {
    const response = await this.client.request<GetPlaceResponseDTO>({
      method: "POST",
      path: "/v1/places/details",
      body: input,
    });

    return response.data;
  }
}
