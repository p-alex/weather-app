import z from "zod";

const locationExternal = z.object({
  id: z.number(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  country: z.string(),
});

export default locationExternal;
