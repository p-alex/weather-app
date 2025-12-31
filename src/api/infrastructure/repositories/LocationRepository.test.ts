import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { LocationRepository } from "./LocationRepository";

const server = setupServer(
  http.get("https://geocoding-api.open-meteo.com/v1/search", () => {
    return HttpResponse.json({
      results: [
        {
          id: 1,
          name: "Tokyo",
          country: "Japan",
          latitude: 1,
          longitude: 1,
        },
        {
          invalid: "invalid",
        },
      ],
    });
  })
);

describe("LocationRepostory.ts", () => {
  let locationRepository: LocationRepository;

  beforeAll(() => server.listen());
  beforeEach(() => {
    locationRepository = new LocationRepository();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => server.close());

  it("should return an empty array if there are no results", async () => {
    server.use(
      http.get("https://geocoding-api.open-meteo.com/v1/search", () =>
        HttpResponse.json({})
      )
    );

    const result = await locationRepository.getAllByQuery("Tokyo");

    expect(result).toEqual([]);
  });

  it("should return only valid results", async () => {
    const result = await locationRepository.getAllByQuery("Tokyo");

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Tokyo");
  });

  it("throws when API request fails", async () => {
    server.use(
      http.get(
        "https://geocoding-api.open-meteo.com/v1/search",
        () => new HttpResponse(null, { status: 500 })
      )
    );

    await expect(locationRepository.getAllByQuery("Tokyo")).rejects.toThrow();
  });
});
