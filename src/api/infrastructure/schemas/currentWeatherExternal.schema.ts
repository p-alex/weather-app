import z from "zod";

const currentWeatherExternal = z.object({
  time: z.string(),
  interval: z.number(),
  temperature_2m: z.number(),
  apparent_temperature: z.number(),
  precipitation: z.number(),
  weather_code: z.number(),
  wind_speed_10m: z.number(),
});

export default currentWeatherExternal;
