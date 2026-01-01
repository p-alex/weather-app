import type z from "zod";
import type dailyWeatherUnitsExternal from "../schemas/dailyWeatherUnitsExternal.schema";

export type DailyWeatherUnitsExternal = z.infer<
  typeof dailyWeatherUnitsExternal
>;
