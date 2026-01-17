import { object, number, string } from "zod/v4-mini";

const locationExternal = object({
  id: number(),
  name: string(),
  latitude: number(),
  longitude: number(),
  country: string(),
  timezone: string(),
});

export default locationExternal;
