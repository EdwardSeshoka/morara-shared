import type {
  PlacesHTTPClient,
  PlacesHTTPRequest,
  PlacesHTTPResponse,
} from "../Services/PlacesService.js";

export class PlacesHTTPClientSpy implements PlacesHTTPClient {
  requests: PlacesHTTPRequest[] = [];
  responseData: unknown;

  async request<Output>(
    request: PlacesHTTPRequest,
  ): Promise<PlacesHTTPResponse<Output>> {
    this.requests.push(request);
    return { data: this.responseData as Output };
  }
}
