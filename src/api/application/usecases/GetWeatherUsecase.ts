import AppException from "../../exceptions/AppException";
import type { WeatherRepository } from "../../infrastructure/repositories/WeatherRepository";
import weatherRepository from "../../infrastructure/repositories/WeatherRepository";

export type GetWeatherUsecaseResult = Awaited<ReturnType<GetWeatherUsecase["execute"]>>;

export class GetWeatherUsecase {
  constructor(private readonly _weatherRepository: WeatherRepository) {}

  execute = async (latitude: number, longitude: number) => {
    const result = await this._weatherRepository.getAllData(latitude, longitude);

    if (result === null)
      throw new AppException(
        "Weather data coming from the API is no longer supported. Please try again later."
      );

    return {
      currentWeather: result.currentWeather,
      dailyWeather: result.dailyWeather,
      hourlyWeather: result.hourlyWeather,
    };
  };
}

const getWeatherUsecase = new GetWeatherUsecase(weatherRepository);

export default getWeatherUsecase;
