import { WeatherRepository } from "../../infrastructure/repositories/WeatherRepository";
import { GetWeatherUsecase } from "./GetWeatherUsecase";
import { vi, type Mock, type Mocked } from "vitest";
import AppException from "../../exceptions/AppException";
import { currentWeatherFixture } from "../../../__fixtures__/weather/currentWeatherFixture";
import { dailyWeatherFixture } from "../../../__fixtures__/weather/dailyWeatherFixture";
import { hourlyWeatherFixture } from "../../../__fixtures__/weather/hourlyWeatherFixture";

describe("GetWeatherUsecase.ts", () => {
  let getAllDataMock: Mocked<WeatherRepository["getAllData"]>;
  let weatherRepositoryMock: WeatherRepository;
  let getWeatherUsecase: GetWeatherUsecase;

  const repositoryResult: Awaited<ReturnType<WeatherRepository["getAllData"]>> = {
    currentWeather: currentWeatherFixture,
    dailyWeather: [dailyWeatherFixture],
    hourlyWeather: [hourlyWeatherFixture],
  };

  beforeEach(() => {
    getAllDataMock = vi.fn().mockResolvedValue(null);

    weatherRepositoryMock = {
      getAllData: getAllDataMock,
    } as WeatherRepository;

    getWeatherUsecase = new GetWeatherUsecase(weatherRepositoryMock);
  });

  it("should throw AppException if weather data is not supported", async () => {
    await expect(getWeatherUsecase.execute).rejects.toThrow(AppException);
  });

  it("should return result if data is supported", async () => {
    (getAllDataMock as Mock).mockResolvedValue(repositoryResult);

    const result = await getWeatherUsecase.execute(1, 1);

    expect(result).toEqual(repositoryResult);
  });
});
