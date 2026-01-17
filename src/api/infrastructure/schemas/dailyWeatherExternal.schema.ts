import { array, string, number, object } from "zod/v4-mini";

const dailyWeatherExternal = object({
  time: array(string()),
  weather_code: array(number()),
  temperature_2m_max: array(number()),
  temperature_2m_min: array(number()),
});

export default dailyWeatherExternal;
