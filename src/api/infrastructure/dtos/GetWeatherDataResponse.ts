import type z from "zod";
import type getWeatherDataResponse from "../schemas/getWeatherDataResponse.schema";

export type GetWeatherDataResponse = z.infer<typeof getWeatherDataResponse>;
