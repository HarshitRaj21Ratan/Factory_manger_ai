import { z } from "zod";

const createProductionSchema = z.object({
  lineId: z.string(),
  shiftId: z.string(),

  targetUnits: z.number().int().positive(),

  producedUnits: z.number().int().min(0),

  rejectedUnits: z.number().int().min(0),

  delayReason: z.string().optional(),
});

export default {
  createProductionSchema,
};