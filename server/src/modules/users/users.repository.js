import prisma from '../../config/db.js';

export const findAll = async () => {
  return await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

export const findById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const findByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const create = async (userData) => {
  return await prisma.user.create({
    data: userData,
  });
};

export const update = async (id, updateData) => {
  return await prisma.user.update({
    where: { id },
    data: updateData,
  });
};

export const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id },
  });
};
