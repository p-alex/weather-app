import type z from "zod/v4-mini";
import type currentWeatherUnitsExternal from "../schemas/currentWeatherUnitsExternal.schema";

export type CurrentWeatherUnitsExternal = z.infer<typeof currentWeatherUnitsExternal>;
