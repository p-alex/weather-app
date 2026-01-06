import type { IDailyWeather } from "../../api/domain/entities/IDailyWeather";
import { dailyWeatherExternalFixture } from "./dailyWeatherExternalFixture";

export const dailyWeatherFixture: IDailyWeather = {
  maxTemperature: dailyWeatherExternalFixture.temperature_2m_max[0],
  minTemperature: dailyWeatherExternalFixture.temperature_2m_min[0],
  date: dailyWeatherExternalFixture.time[0],
  weatherCode: dailyWeatherExternalFixture.weather_code[0],
};
