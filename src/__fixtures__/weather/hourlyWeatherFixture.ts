import type { IHourlyWeather } from "../../api/domain/entities/IHourlyWeather";
import { hourlyWeatherExternalFixture } from "./hourlyWeatherExternalFixture";

export const hourlyWeatherFixture: IHourlyWeather = {
  temperatures: hourlyWeatherExternalFixture.temperature_2m,
  hours: hourlyWeatherExternalFixture.time,
  weatherCodes: hourlyWeatherExternalFixture.weather_code,
};
