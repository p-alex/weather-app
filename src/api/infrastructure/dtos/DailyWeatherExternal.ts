import type z from "zod/v4-mini";
import type dailyWeatherExternal from "../schemas/dailyWeatherExternal.schema";

export type DailyWeatherExternal = z.infer<typeof dailyWeatherExternal>;
