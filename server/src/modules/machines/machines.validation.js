import { z } from "zod";

export const createMachineSchema = z.object({
  name: z
    .string()
    .min(2, "Machine name must be at least 2 characters"),

  code: z
    .string()
    .min(1, "Machine code is required"),

  type: z
    .string()
    .min(2, "Machine type is required"),

  status: z
    .enum([
      "ACTIVE",
      "IDLE",
      "FAULTY",
      "MAINTENANCE",
    ])
    .optional(),

  efficiency: z
    .number()
    .min(0, "Efficiency cannot be less than 0")
    .max(100, "Efficiency cannot be greater than 100")
    .optional(),
});

export const updateMachineSchema =
  createMachineSchema.partial();

export const updateMachineStatusSchema = z.object({
  status: z.enum([
    "ACTIVE",
    "IDLE",
    "FAULTY",
    "MAINTENANCE",
  ]),
});

export const machineIdSchema = z.object({
  id: z.string().uuid("Invalid machine id"),
});