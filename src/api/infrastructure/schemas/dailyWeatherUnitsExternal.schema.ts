import z from "zod";

const dailyWeatherUnitsExternal = z.object({
  time: z.enum(["iso8601"]),
  weather_code: z.enum(["wmo code"]),
  temperature_2m_max: z.enum(["°C"]),
  temperature_2m_min: z.enum(["°C"]),
});

export default dailyWeatherUnitsExternal;
