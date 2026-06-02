import * as authService from './auth.service.js';
import { sendSuccess } from '../../core/utils/response.js';

export const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    sendSuccess(res, result, 201, 'User registered successfully.');
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    sendSuccess(res, result, 200, 'User logged in successfully.');
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const { password: _, ...userWithoutPassword } = req.user;
    sendSuccess(res, { user: userWithoutPassword }, 200, 'User profile retrieved successfully.');
  } catch (error) {
    next(error);
  }
};
