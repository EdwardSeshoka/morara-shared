# @edwardseshoka/google-places

Backend-only Morara adapter for Google Places API (New).

It provides:

- Autocomplete for organization and address entry.
- Place Details for the selected prediction.
- A normalized response that includes the Google Place ID and structured address.

```ts
const client = new GooglePlacesClient({
  apiKey: process.env.GOOGLE_PLACES_API_KEY!,
});

const suggestions = await client.autocomplete({
  input: "Kanonkop",
  sessionToken,
  purpose: "organization",
});
```

The Google web-service key must remain on the backend. Frontend applications
should call authenticated Morara endpoints that constrain requests and filter
responses.

Place IDs can be stored for reconciliation. Google recommends refreshing stored
Place IDs after 12 months.
