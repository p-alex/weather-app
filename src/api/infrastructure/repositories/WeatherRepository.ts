import type { ICurrentWeather } from "../../domain/entities/ICurrentWeather";
import type { IDailyWeather } from "../../domain/entities/IDailyWeather";
import type { IHourlyWeather } from "../../domain/entities/IHourlyWeather";
import getWeatherData from "../api/getWeatherData";
import currentWeatherMapper from "../mappers/CurrentWeatherMapper";
import dailyWeatherMapper from "../mappers/DailyWeatherMapper";
import hourlyWeatherMapper from "../mappers/HourlyWeatherMapper";
import currentWeatherExternal from "../schemas/currentWeatherExternal.schema";
import dailyWeatherExternal from "../schemas/dailyWeatherExternal.schema";
import hourlyWeatherExternal from "../schemas/hourlyWeatherExternal.schema";

export class WeatherRepository {
  getAllData = async (latitude: number, longitude: number) => {
    const response = await getWeatherData(latitude, longitude);

    let currentWeather: ICurrentWeather | null = null;
    let dailyWeather: IDailyWeather[] | null = null;
    let hourlyWeather: IHourlyWeather[] | null = null;

    const { success: isValidCurrentWeather } = currentWeatherExternal.safeParse(
      response.current
    );

    const { success: isValidDailyWeather } = dailyWeatherExternal.safeParse(
      response.daily
    );

    const { success: isValidHourlyWeather } = hourlyWeatherExternal.safeParse(
      response.hourly
    );

    if (isValidCurrentWeather) {
      currentWeather = currentWeatherMapper.externalToEntity(response.current);
    }

    if (isValidDailyWeather) {
      try {
        dailyWeather = dailyWeatherMapper.externalToEntity(response.daily);
      } catch (error) {}
    }

    if (isValidHourlyWeather) {
      hourlyWeather = hourlyWeatherMapper.externalToEntity(response.hourly);
    }

    return { currentWeather, dailyWeather, hourlyWeather };
  };
}

const weatherRepository = new WeatherRepository();

export default weatherRepository;
