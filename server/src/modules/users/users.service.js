import bcrypt from 'bcryptjs';
import * as usersRepository from './users.repository.js';
import { BadRequestError, NotFoundError } from '../../core/errors/AppError.js';

const sanitizeUser = (user) => {
  if (!user) return null;
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const getUsers = async () => {
  const users = await usersRepository.findAll();
  return users.map(sanitizeUser);
};

export const getUserById = async (id) => {
  const user = await usersRepository.findById(id);
  if (!user) {
    throw new NotFoundError('User not found.');
  }
  return sanitizeUser(user);
};

export const createUser = async ({ email, password, name, role, status }) => {
  const existingUser = await usersRepository.findByEmail(email);
  if (existingUser) {
    throw new BadRequestError('Email already in use.');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await usersRepository.create({
    email,
    password: hashedPassword,
    name,
    role,
    status,
  });

  return sanitizeUser(newUser);
};

export const updateUser = async (id, updateData) => {
  const user = await usersRepository.findById(id);
  if (!user) {
    throw new NotFoundError('User not found.');
  }

  const dataToUpdate = { ...updateData };

  if (dataToUpdate.email && dataToUpdate.email !== user.email) {
    const existingUser = await usersRepository.findByEmail(dataToUpdate.email);
    if (existingUser) {
      throw new BadRequestError('Email already in use.');
    }
  }

  if (dataToUpdate.password) {
    const salt = await bcrypt.genSalt(10);
    dataToUpdate.password = await bcrypt.hash(dataToUpdate.password, salt);
  }

  const updatedUser = await usersRepository.update(id, dataToUpdate);
  return sanitizeUser(updatedUser);
};

export const deleteUser = async (id) => {
  const user = await usersRepository.findById(id);
  if (!user) {
    throw new NotFoundError('User not found.');
  }
  await usersRepository.deleteUser(id);
  return { id };
};

export const updateUserStatus = async (id, status) => {
  const user = await usersRepository.findById(id);
  if (!user) {
    throw new NotFoundError('User not found.');
  }

  const updatedUser = await usersRepository.update(id, { status });
  return sanitizeUser(updatedUser);
};
