import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { GET_WEATHER_DATA_BASE_URL } from "../api/getWeatherData";
import { getWeatherDataExternalResponseFixture } from "../../../__fixtures__/weather/getWeatherDataExternalResponseFixture";
import type { GetWeatherDataResponse } from "../dtos/GetWeatherDataResponse";
import { WeatherRepository } from "./WeatherRepository";
import { currentWeatherFixture } from "../../../__fixtures__/weather/currentWeatherFixture";
import { dailyWeatherFixture } from "../../../__fixtures__/weather/dailyWeatherFixture";
import { hourlyWeatherFixture } from "../../../__fixtures__/weather/hourlyWeatherFixture";
import ApiException from "../../exceptions/ApiException";

const server = setupServer(
  http.get(GET_WEATHER_DATA_BASE_URL, () => {
    return HttpResponse.json(getWeatherDataExternalResponseFixture);
  })
);

describe("WeatherRepository.ts", () => {
  let weatherRepository: WeatherRepository;
  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    weatherRepository = new WeatherRepository();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should return null for weather data that did not pass validation", async () => {
    server.use(
      http.get(GET_WEATHER_DATA_BASE_URL, () => {
        const invalidResponse: GetWeatherDataResponse = {
          ...getWeatherDataExternalResponseFixture,
          current: null as any,
          daily: null as any,
          hourly: null as any,
        };
        return HttpResponse.json(invalidResponse);
      })
    );

    const result = await weatherRepository.getAllData(1, 1);

    expect(result).toEqual({
      currentWeather: null,
      dailyWeather: null,
      hourlyWeather: null,
    } as Awaited<ReturnType<WeatherRepository["getAllData"]>>);
  });

  it("should return weather data if all validations passed", async () => {
    const result = await weatherRepository.getAllData(1, 1);

    expect(result).toEqual({
      currentWeather: currentWeatherFixture,
      dailyWeather: dailyWeatherFixture,
      hourlyWeather: hourlyWeatherFixture,
    } as Awaited<ReturnType<WeatherRepository["getAllData"]>>);
  });

  it("should propagate errors", async () => {
    server.use(
      http.get(
        GET_WEATHER_DATA_BASE_URL,
        () => new HttpResponse(null, { status: 500 })
      )
    );

    await expect(weatherRepository.getAllData(1, 1)).rejects.toThrow(
      ApiException
    );
  });
});
