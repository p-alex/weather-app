import type z from "zod";
import type currentWeatherExternal from "../schemas/currentWeatherExternal.schema";

export type CurrentWeatherExternal = z.infer<typeof currentWeatherExternal>;
