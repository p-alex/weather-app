import z from "zod";

const hourlyWeatherExternal = z.object({
  time: z.array(z.string()),
  temperature_2m: z.array(z.number()),
  weather_code: z.array(z.number()),
});

export default hourlyWeatherExternal;
