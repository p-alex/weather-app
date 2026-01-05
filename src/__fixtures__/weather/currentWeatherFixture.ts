import type { ICurrentWeather } from "../../api/domain/entities/ICurrentWeather";
import { currentWeatherExternalFixture } from "./currentWeatherExternalFixture";

export const currentWeatherFixture: ICurrentWeather = {
  feelsLike: currentWeatherExternalFixture.apparent_temperature,
  precipitation: currentWeatherExternalFixture.precipitation,
  temperature: currentWeatherExternalFixture.temperature_2m,
  weatherCode: currentWeatherExternalFixture.weather_code,
  windSpeed: currentWeatherExternalFixture.wind_speed_10m,
  humidity: currentWeatherExternalFixture.relative_humidity_2m,
};
