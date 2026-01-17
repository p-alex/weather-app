import type z from "zod/v4-mini";
import type locationExternal from "../schemas/locationExternal.schema";

export type LocationExternal = z.infer<typeof locationExternal>;
