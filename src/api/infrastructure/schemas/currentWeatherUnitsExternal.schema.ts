import { enum as enum_, object } from "zod/v4-mini";

const currentWeatherUnitsExternal = object({
  time: enum_(["iso8601"]),
  interval: enum_(["seconds"]),
  temperature_2m: enum_(["°C"]),
  apparent_temperature: enum_(["°C"]),
  precipitation: enum_(["mm"]),
  weather_code: enum_(["wmo code"]),
  wind_speed_10m: enum_(["km/h"]),
});

export default currentWeatherUnitsExternal;
