import type z from "zod/v4-mini";
import type currentWeatherExternal from "../schemas/currentWeatherExternal.schema";

export type CurrentWeatherExternal = z.infer<typeof currentWeatherExternal>;
