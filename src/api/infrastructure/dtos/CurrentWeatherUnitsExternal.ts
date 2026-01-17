import type z from "zod";
import type currentWeatherUnitsExternal from "../schemas/currentWeatherUnitsExternal.schema";

export type CurrentWeatherUnitsExternal = z.infer<typeof currentWeatherUnitsExternal>;
