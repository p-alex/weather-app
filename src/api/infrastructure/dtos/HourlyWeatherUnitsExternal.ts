import type z from "zod";
import type hourlyWeatherUnitsExternal from "../schemas/hourlyWeatherUnitsExternal.schema";

export type HourlyWeatherUnitsExternal = z.infer<
  typeof hourlyWeatherUnitsExternal
>;
