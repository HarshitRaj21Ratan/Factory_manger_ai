import prisma from "../../database/prisma.js";

export const createMachine = async (payload) => {
  return prisma.machine.create({
    data: payload,
  });
};

export const getMachines = async () => {
  return prisma.machine.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getMachineById = async (id) => {
  const machine = await prisma.machine.findUnique({
    where: { id },
    include: {
      maintenanceLogs: true,
    },
  });

  if (!machine) {
    throw new Error("Machine not found");
  }

  return machine;
};

export const updateMachine = async (id, payload) => {
  return prisma.machine.update({
    where: { id },
    data: payload,
  });
};

export const deleteMachine = async (id) => {
  return prisma.machine.delete({
    where: { id },
  });
};

export const updateMachineStatus = async (id, status) => {
  const allowedStatuses = [
    "ACTIVE",
    "IDLE",
    "FAULTY",
    "MAINTENANCE",
  ];

  if (!allowedStatuses.includes(status)) {
    throw new Error("Invalid machine status");
  }

  return prisma.machine.update({
    where: { id },
    data: { status },
  });
};

export const getActiveMachines = async () => {
  return prisma.machine.findMany({
    where: {
      status: "ACTIVE",
    },
  });
};

export const getFaultyMachines = async () => {
  return prisma.machine.findMany({
    where: {
      status: "FAULTY",
    },
  });
};

export const getMachinesInMaintenance = async () => {
  return prisma.machine.findMany({
    where: {
      status: "MAINTENANCE",
    },
  });
};