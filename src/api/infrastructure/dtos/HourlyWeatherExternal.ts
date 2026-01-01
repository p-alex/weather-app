import type z from "zod";
import type hourlyWeatherExternal from "../schemas/hourlyWeatherExternal.schema";

export type HourlyWeatherExternal = z.infer<typeof hourlyWeatherExternal>;
