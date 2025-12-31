import { setupServer } from "msw/node";

import { http, HttpResponse } from "msw";
import type { LocationExternal } from "../dtos/LocationExternal";
import getLocationData from "./getLocationData";
import ApiException from "../../exceptions/ApiException";

const server = setupServer(
  http.get("https://geocoding-api.open-meteo.com/v1/search", ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get("name");

    if (name === "fail") {
      return new HttpResponse(null, { status: 500 });
    }

    return HttpResponse.json({
      results: [
        {
          id: 1,
          name: "Tokyo",
          country: "Japan",
          latitude: 1,
          longitude: 1,
        } as LocationExternal,
      ],
    });
  })
);

describe("getLocationData.ts", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("returns location data for valid query", async () => {
    const data = await getLocationData("Tokyo");

    expect(data.results[0].name).toBe("Tokyo");
  });

  it("throws ApiException when request fails", async () => {
    await expect(getLocationData("fail")).rejects.toBeInstanceOf(ApiException);
  });
});
