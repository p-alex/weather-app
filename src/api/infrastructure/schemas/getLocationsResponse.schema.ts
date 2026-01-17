import { array, object } from "zod/v4-mini";
import locationExternal from "./locationExternal.schema";

export const getLocationsResponse = object({
  results: array(locationExternal),
});
