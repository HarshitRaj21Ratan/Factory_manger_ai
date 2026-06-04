import { create, findAll, findById, findToday, findByShift, findByLine, getSummary } from "./production.repository";

const createProduction = async (payload, supervisorId) => {
  let status = "IN_PROGRESS";

  if (payload.delayReason) {
    status = "DELAYED";
  }

  if (payload.producedUnits >= payload.targetUnits) {
    status = "COMPLETED";
  }

  return create({
    ...payload,
    supervisorId,
    status,
  });
};

const getAllProductions = async () => {
  return findAll();
};

const getProductionById = async (id) => {
  const production = await findById(id);

  if (!production) {
    throw new Error("Production record not found");
  }

  return production;
};

const getTodayProduction = async () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return findToday(start, end);
};

const getProductionByShift = async (shiftId) => {
  return findByShift(shiftId);
};

const getProductionByLine = async (lineId) => {
  return findByLine(lineId);
};

const getProductionSummary = async () => {
  const result = await getSummary();

  const target = result._sum.targetUnits || 0;
  const produced = result._sum.producedUnits || 0;
  const rejected = result._sum.rejectedUnits || 0;

  return {
    target,
    produced,
    rejected,
    pending: target - produced,
  };
};

export {
  createProduction,
  getAllProductions,
  getProductionById,
  getTodayProduction,
  getProductionByShift,
  getProductionByLine,
  getProductionSummary,
};