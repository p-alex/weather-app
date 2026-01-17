import { dailyWeatherExternalFixture } from "../../../__fixtures__/weather/dailyWeatherExternalFixture";
import type { IDailyWeather } from "../../domain/entities/IDailyWeather";
import AppException from "../../exceptions/AppException";
import dailyWeatherMapper from "./DailyWeatherMapper";

describe("DailyWeatherMapper.tsx", () => {
  it("should throw AppException if daily weather arrays do not have matching lengths", () => {
    try {
      dailyWeatherMapper.externalToEntity({
        ...dailyWeatherExternalFixture,
        temperature_2m_max: [],
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppException);
    }
  });

  it("shoud map data properly", () => {
    const result = dailyWeatherMapper.externalToEntity(dailyWeatherExternalFixture);

    expect(result).toEqual([
      {
        date: dailyWeatherExternalFixture.time[0],
        maxTemperature: dailyWeatherExternalFixture.temperature_2m_max[0],
        minTemperature: dailyWeatherExternalFixture.temperature_2m_min[0],
        weatherCode: dailyWeatherExternalFixture.weather_code[0],
      },
    ] as IDailyWeather[]);
  });
});
