import { string, number, object } from "zod/v4-mini";

const currentWeatherExternal = object({
  time: string(),
  interval: number(),
  temperature_2m: number(),
  apparent_temperature: number(),
  precipitation: number(),
  weather_code: number(),
  wind_speed_10m: number(),
  relative_humidity_2m: number(),
});

export default currentWeatherExternal;
