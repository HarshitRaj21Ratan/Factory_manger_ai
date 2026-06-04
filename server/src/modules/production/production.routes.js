import { Router } from "express";

const router = Router();

import { createProduction, getProductions, getProductionSummary, getTodayProduction, getProductionByShift, getProductionByLine, getProductionById } from "./production.controller";

router.post(
  "/update",
  createProduction
);

router.get(
  "/",
  getProductions
);

router.get(
  "/summary",
  getProductionSummary
);

router.get(
  "/today",
  getTodayProduction
);

router.get(
  "/shift/:shiftId",
  getProductionByShift
);

router.get(
  "/line/:lineId",
  getProductionByLine
);

router.get(
  "/:id",
  getProductionById
);

export default router;