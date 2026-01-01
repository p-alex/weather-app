import type { IHourlyWeather } from "../../domain/entities/IHourlyWeather";
import type { HourlyWeatherExternal } from "../dtos/HourlyWeatherExternal";

export class HourlyWeatherMapper {
  externalToEntity = (
    hourlyWeatherExternal: HourlyWeatherExternal
  ): IHourlyWeather => ({
    hours: hourlyWeatherExternal.time,
    temperatures: hourlyWeatherExternal.temperature_2m,
    weatherCodes: hourlyWeatherExternal.weather_code,
  });
}

const hourlyWeatherMapper = new HourlyWeatherMapper();

export default hourlyWeatherMapper;
