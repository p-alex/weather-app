import type { CurrentWeatherExternal } from "../../api/infrastructure/dtos/CurrentWeatherExternal";

export const currentWeatherExternalFixture: CurrentWeatherExternal = {
  apparent_temperature: 1,
  interval: 2,
  precipitation: 3,
  temperature_2m: 4,
  time: "2023-03-03",
  weather_code: 5,
  wind_speed_10m: 6,
  relative_humidity_2m: 40,
};
