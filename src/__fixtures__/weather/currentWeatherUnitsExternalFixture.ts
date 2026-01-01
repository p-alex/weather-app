import type { CurrentWeatherUnitsExternal } from "../../api/infrastructure/dtos/CurrentWeatherUnitsExternal";

export const currentWeatherUnitsExternalFixture: CurrentWeatherUnitsExternal = {
  apparent_temperature: "°C",
  interval: "seconds",
  precipitation: "mm",
  temperature_2m: "°C",
  time: "iso8601",
  weather_code: "wmo code",
  wind_speed_10m: "km/h",
};
