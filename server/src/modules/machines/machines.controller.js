import * as machineService from "./machine.service.js";

export const createMachine = async (req, res, next) => {
  try {
    const result = await machineService.createMachine(req.body);

    res.status(201).json({
      success: true,
      message: "Machine created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getMachines = async (req, res, next) => {
  try {
    const result = await machineService.getMachines();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getMachineById = async (req, res, next) => {
  try {
    const result = await machineService.getMachineById(
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

export const updateMachine = async (req, res, next) => {
  try {
    const result = await machineService.updateMachine(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Machine updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMachine = async (req, res, next) => {
  try {
    await machineService.deleteMachine(req.params.id);

    res.status(200).json({
      success: true,
      message: "Machine deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateMachineStatus = async (
  req,
  res,
  next
) => {
  try {
    const result = await machineService.updateMachineStatus(
      req.params.id,
      req.body.status
    );

    res.status(200).json({
      success: true,
      message: "Machine status updated",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getActiveMachines = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await machineService.getActiveMachines();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getFaultyMachines = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await machineService.getFaultyMachines();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getMachinesInMaintenance = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await machineService.getMachinesInMaintenance();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};