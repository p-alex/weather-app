import { array, string, number, object } from "zod/v4-mini";

const hourlyWeatherExternal = object({
  time: array(string()),
  temperature_2m: array(number()),
  weather_code: array(number()),
});

export default hourlyWeatherExternal;
