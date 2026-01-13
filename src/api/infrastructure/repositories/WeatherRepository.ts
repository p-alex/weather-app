import getWeatherData from "../api/getWeatherData";
import currentWeatherMapper from "../mappers/CurrentWeatherMapper";
import dailyWeatherMapper from "../mappers/DailyWeatherMapper";
import hourlyWeatherMapper from "../mappers/HourlyWeatherMapper";
import getWeatherDataResponse from "../schemas/getWeatherDataResponse.schema";

export class WeatherRepository {
  getAllData = async (latitude: number, longitude: number) => {
    const response = await getWeatherData(latitude, longitude);

    const { success: isValidData } = getWeatherDataResponse.safeParse(response);

    if (!isValidData) return null;

    return {
      currentWeather: currentWeatherMapper.externalToEntity(response.current),
      dailyWeather: dailyWeatherMapper.externalToEntity(response.daily),
      hourlyWeather: hourlyWeatherMapper.externalToEntity(response.hourly),
    };
  };
}

const weatherRepository = new WeatherRepository();

export default weatherRepository;
