import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import * as authRepository from './auth.repository.js';
import { BadRequestError, UnauthorizedError } from '../../core/errors/AppError.js';

const signToken = (id) => {
  return jwt.sign({ id }, env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

export const register = async ({ email, password, name, role }) => {
  const existingUser = await authRepository.findUserByEmail(email);
  if (existingUser) {
    throw new BadRequestError('Email already in use.');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await authRepository.createUser({
    email,
    password: hashedPassword,
    name,
    role,
  });

  const token = signToken(newUser.id);
  
  const { password: _, ...userWithoutPassword } = newUser;
  return { user: userWithoutPassword, token };
};

export const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password.');
  }

  const user = await authRepository.findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new UnauthorizedError('Incorrect email or password.');
  }

  const token = signToken(user.id);
  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
};
