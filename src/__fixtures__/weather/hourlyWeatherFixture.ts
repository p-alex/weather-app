import type { IHourlyWeather } from "../../api/domain/entities/IHourlyWeather";
import { hourlyWeatherExternalFixture } from "./hourlyWeatherExternalFixture";

export const hourlyWeatherFixture: IHourlyWeather = {
  temperature: hourlyWeatherExternalFixture.temperature_2m[0],
  date: hourlyWeatherExternalFixture.time[0],
  weatherCode: hourlyWeatherExternalFixture.weather_code[0],
};
