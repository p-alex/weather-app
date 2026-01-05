import type { ICurrentWeather } from "../../domain/entities/ICurrentWeather";
import type { CurrentWeatherExternal } from "../dtos/CurrentWeatherExternal";

export class CurrentWeatherMapper {
  externalToEntity = (
    currentWeatherExternal: CurrentWeatherExternal
  ): ICurrentWeather => ({
    temperature: currentWeatherExternal.temperature_2m,
    feelsLike: currentWeatherExternal.apparent_temperature,
    windSpeed: currentWeatherExternal.wind_speed_10m,
    precipitation: currentWeatherExternal.precipitation,
    weatherCode: currentWeatherExternal.weather_code,
    humidity: currentWeatherExternal.relative_humidity_2m,
  });
}

const currentWeatherMapper = new CurrentWeatherMapper();

export default currentWeatherMapper;
