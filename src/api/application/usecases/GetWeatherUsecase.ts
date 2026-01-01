import type { WeatherRepository } from "../../infrastructure/repositories/WeatherRepository";
import weatherRepository from "../../infrastructure/repositories/WeatherRepository";

export class GetWeatherUsecase {
  constructor(private readonly _weatherRepository: WeatherRepository) {}

  execute = async (latitude: number, longitude: number) => {
    return await this._weatherRepository.getAllData(latitude, longitude);
  };
}

const getWeatherUsecase = new GetWeatherUsecase(weatherRepository);

export default getWeatherUsecase;
