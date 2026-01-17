import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import getWeatherData, { GET_WEATHER_DATA_BASE_URL, type GetWeatherParams } from "./getWeatherData";
import ApiException from "../../exceptions/ApiException";
import { getWeatherDataExternalResponseFixture } from "../../../__fixtures__/weather/getWeatherDataExternalResponseFixture";

const server = setupServer(
  http.get(GET_WEATHER_DATA_BASE_URL, ({ request }) => {
    const url = new URL(request.url);

    if (url.searchParams.get("latitude" as keyof GetWeatherParams) === "0") {
      return new HttpResponse(null, { status: 500 });
    }

    return HttpResponse.json(getWeatherDataExternalResponseFixture);
  })
);

describe("getWeatherData.ts", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should return weather data", async () => {
    const result = await getWeatherData(1, 1);

    expect(result).toEqual(getWeatherDataExternalResponseFixture);
  });

  it("throws ApiException when request fails", async () => {
    await expect(getWeatherData(0, 0)).rejects.toThrow(ApiException);
  });
});
