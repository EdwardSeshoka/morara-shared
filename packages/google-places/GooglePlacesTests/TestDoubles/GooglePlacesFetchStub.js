export class GooglePlacesFetchStub {
  requests = [];
  response = jsonResponse({});

  fetch = async (input, init) => {
    this.requests.push({ input: input.toString(), init });
    return this.response;
  };

  returnJson(body, status = 200) {
    this.response = jsonResponse(body, status);
  }
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
