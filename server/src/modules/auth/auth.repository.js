import prisma from '../../config/db.js';

export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const createUser = async (userData) => {
  return await prisma.user.create({
    data: userData,
  });
};
