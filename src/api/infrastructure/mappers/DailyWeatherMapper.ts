import type { IDailyWeather } from "../../domain/entities/IDailyWeather";
import AppException from "../../exceptions/AppException";
import type { DailyWeatherExternal } from "../dtos/DailyWeatherExternal";

export class DailyWeatherMapper {
  externalToEntity = (dailyWeatherExternal: DailyWeatherExternal): IDailyWeather[] => {
    const length = dailyWeatherExternal.time.length;

    if (
      dailyWeatherExternal.temperature_2m_max.length !== length ||
      dailyWeatherExternal.temperature_2m_min.length !== length ||
      dailyWeatherExternal.weather_code.length !== length
    ) {
      throw new AppException("Daily weather arrays length mismatch");
    }

    return dailyWeatherExternal.time.map((date, index) => {
      return {
        date,
        maxTemperature: dailyWeatherExternal.temperature_2m_max[index],
        minTemperature: dailyWeatherExternal.temperature_2m_min[index],
        weatherCode: dailyWeatherExternal.weather_code[index],
      };
    });
  };
}

const dailyWeatherMapper = new DailyWeatherMapper();

export default dailyWeatherMapper;
