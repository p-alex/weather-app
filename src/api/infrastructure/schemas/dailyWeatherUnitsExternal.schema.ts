import { enum as enum_, object } from "zod/v4-mini";

const dailyWeatherUnitsExternal = object({
  time: enum_(["iso8601"]),
  weather_code: enum_(["wmo code"]),
  temperature_2m_max: enum_(["°C"]),
  temperature_2m_min: enum_(["°C"]),
});

export default dailyWeatherUnitsExternal;
