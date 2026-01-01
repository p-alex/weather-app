import type { IDailyWeather } from "../../domain/entities/IDailyWeather";
import type { DailyWeatherExternal } from "../dtos/DailyWeatherExternal";

export class DailyWeatherMapper {
  externalToEntity = (
    dailyWeatherExternal: DailyWeatherExternal
  ): IDailyWeather => ({
    dates: dailyWeatherExternal.time,
    weatherCodes: dailyWeatherExternal.weather_code,
    maxTemperatures: dailyWeatherExternal.temperature_2m_max,
    minTemperatures: dailyWeatherExternal.temperature_2m_min,
  });
}

const dailyWeatherMapper = new DailyWeatherMapper();

export default dailyWeatherMapper;
