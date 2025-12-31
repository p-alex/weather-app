import type z from "zod";
import type { getLocationsResponse } from "../schemas/getLocationsResponse.schema";

export type GetLocationsResponse = z.infer<typeof getLocationsResponse>;
