import type z from "zod/v4-mini";
import type { getLocationsResponse } from "../schemas/getLocationsResponse.schema";

export type GetLocationsResponse = z.infer<typeof getLocationsResponse>;
