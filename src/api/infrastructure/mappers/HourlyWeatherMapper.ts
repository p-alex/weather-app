import type { IHourlyWeather } from "../../domain/entities/IHourlyWeather";
import AppException from "../../exceptions/AppException";
import type { HourlyWeatherExternal } from "../dtos/HourlyWeatherExternal";

export class HourlyWeatherMapper {
  externalToEntity = (
    hourlyWeatherExternal: HourlyWeatherExternal
  ): IHourlyWeather[] => {
    const length = hourlyWeatherExternal.time.length;

    if (
      hourlyWeatherExternal.temperature_2m.length !== length ||
      hourlyWeatherExternal.weather_code.length !== length
    ) {
      throw new AppException(
        "Hourly weather arrays length mismatch. Api data not supported."
      );
    }

    return hourlyWeatherExternal.time.map((date, index) => {
      return {
        date,
        temperature: hourlyWeatherExternal.temperature_2m[index],
        weatherCode: hourlyWeatherExternal.weather_code[index],
      };
    });
  };
}

const hourlyWeatherMapper = new HourlyWeatherMapper();

export default hourlyWeatherMapper;
