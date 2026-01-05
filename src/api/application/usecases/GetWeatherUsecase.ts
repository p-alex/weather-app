import AppException from "../../exceptions/AppException";
import type { WeatherRepository } from "../../infrastructure/repositories/WeatherRepository";
import weatherRepository from "../../infrastructure/repositories/WeatherRepository";

export type GetWeatherUsecaseResult = Awaited<
  ReturnType<GetWeatherUsecase["execute"]>
>;

export class GetWeatherUsecase {
  constructor(private readonly _weatherRepository: WeatherRepository) {}

  execute = async (latitude: number, longitude: number) => {
    const result = await this._weatherRepository.getAllData(
      latitude,
      longitude
    );

    const isResultInvalid =
      result.currentWeather === null ||
      result.dailyWeather === null ||
      result.hourlyWeather === null;

    if (isResultInvalid)
      throw new AppException(
        "Weather data coming from the API is no longer supported. Please try again later."
      );

    return result;
  };
}

const getWeatherUsecase = new GetWeatherUsecase(weatherRepository);

export default getWeatherUsecase;
