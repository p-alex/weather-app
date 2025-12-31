import type z from "zod";
import type locationExternal from "../schemas/locationExternal.schema";

export type LocationExternal = z.infer<typeof locationExternal>;
