import { enum as enum_, object } from "zod/v4-mini";

const hourlyWeatherUnitsExternal = object({
  time: enum_(["iso8601"]),
  temperature_2m: enum_(["°C"]),
  weather_code: enum_(["wmo code"]),
});

export default hourlyWeatherUnitsExternal;
