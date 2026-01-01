import z from "zod";

const currentWeatherUnitsExternal = z.object({
  time: z.enum(["iso8601"]),
  interval: z.enum(["seconds"]),
  temperature_2m: z.enum(["°C"]),
  apparent_temperature: z.enum(["°C"]),
  precipitation: z.enum(["mm"]),
  weather_code: z.enum(["wmo code"]),
  wind_speed_10m: z.enum(["km/h"]),
});

export default currentWeatherUnitsExternal;
