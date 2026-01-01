import z from "zod";

const hourlyWeatherUnitsExternal = z.object({
  time: z.enum(["iso8601"]),
  temperature_2m: z.enum(["°C"]),
  weather_code: z.enum(["wmo code"]),
});

export default hourlyWeatherUnitsExternal;
