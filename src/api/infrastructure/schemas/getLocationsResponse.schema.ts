import z from "zod";
import locationExternal from "./locationExternal.schema";

export const getLocationsResponse = z.object({
  results: z.array(locationExternal),
});
