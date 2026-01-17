import type z from "zod/v4-mini";
import type hourlyWeatherExternal from "../schemas/hourlyWeatherExternal.schema";

export type HourlyWeatherExternal = z.infer<typeof hourlyWeatherExternal>;
