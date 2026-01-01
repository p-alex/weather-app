import type z from "zod";
import type dailyWeatherExternal from "../schemas/dailyWeatherExternal.schema";

export type DailyWeatherExternal = z.infer<typeof dailyWeatherExternal>;
