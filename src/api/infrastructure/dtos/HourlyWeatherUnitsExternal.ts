import type z from "zod/v4-mini";
import type hourlyWeatherUnitsExternal from "../schemas/hourlyWeatherUnitsExternal.schema";

export type HourlyWeatherUnitsExternal = z.infer<typeof hourlyWeatherUnitsExternal>;
