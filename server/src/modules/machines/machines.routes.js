import { Router } from "express";
import * as machineController from "./machine.controller.js";
import {validate} from "../../core/middleware/validate.js";
import {createMachineSchema, updateMachineSchema, updateStatusSchema} from "./machine.validation.js";

const router = Router();

router.get("/active", machineController.getActiveMachines);

router.get("/faulty", machineController.getFaultyMachines);

router.get(
  "/maintenance",
  machineController.getMachinesInMaintenance
);

router.get("/", machineController.getMachines);

router.get("/:id", machineController.getMachineById);

router.post("/", validate(createMachineSchema), machineController.createMachine);

router.put("/:id", validate(updateMachineSchema), machineController.updateMachine);

router.patch(
  "/:id/status",
  validate(updateMachineStatusSchema),
  machineController.updateMachineStatus
);

router.delete("/:id", machineController.deleteMachine);

export default router;