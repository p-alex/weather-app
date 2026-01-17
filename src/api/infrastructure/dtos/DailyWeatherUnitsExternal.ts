import type z from "zod/v4-mini";
import type dailyWeatherUnitsExternal from "../schemas/dailyWeatherUnitsExternal.schema";

export type DailyWeatherUnitsExternal = z.infer<typeof dailyWeatherUnitsExternal>;
