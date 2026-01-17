import type z from "zod/v4-mini";
import type getWeatherDataResponse from "../schemas/getWeatherDataResponse.schema";

export type GetWeatherDataResponse = z.infer<typeof getWeatherDataResponse>;
