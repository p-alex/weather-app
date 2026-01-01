import type { IDailyWeather } from "../../api/domain/entities/IDailyWeather";
import { dailyWeatherExternalFixture } from "./dailyWeatherExternalFixture";

export const dailyWeatherFixture: IDailyWeather = {
  maxTemperatures: dailyWeatherExternalFixture.temperature_2m_max,
  minTemperatures: dailyWeatherExternalFixture.temperature_2m_min,
  dates: dailyWeatherExternalFixture.time,
  weatherCodes: dailyWeatherExternalFixture.weather_code,
};
