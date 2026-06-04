import * as productionService from "./production.service.js";

const createProduction = async (req, res, next) => {
  try {
    const result = await productionService.createProduction(
      req.body,
      req.user.id
    );

    res.status(201).json({
      success: true,
      message: "Production created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getProductions = async (req, res, next) => {
  try {
    const result = await productionService.getAllProductions();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getProductionById = async (req, res, next) => {
  try {
    const result = await productionService.getProductionById(
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getTodayProduction = async (req, res, next) => {
  try {
    const result = await productionService.getTodayProduction();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getProductionSummary = async (req, res, next) => {
  try {
    const result = await productionService.getProductionSummary();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getProductionByShift = async (req, res, next) => {
  try {
    const result =
      await productionService.getProductionByShift(
        req.params.shiftId
      );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getProductionByLine = async (req, res, next) => {
  try {
    const result =
      await productionService.getProductionByLine(
        req.params.lineId
      );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export {
  createProduction,
  getProductions,
  getProductionById,
  getTodayProduction,
  getProductionSummary,
  getProductionByShift,
  getProductionByLine,
};