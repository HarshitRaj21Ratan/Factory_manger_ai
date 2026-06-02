import * as usersService from './users.service.js';
import { sendSuccess } from '../../core/utils/response.js';

export const getUsers = async (req, res, next) => {
  try {
    const result = await usersService.getUsers();
    sendSuccess(res, result, 200, 'Users retrieved successfully.');
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await usersService.getUserById(id);
    sendSuccess(res, result, 200, 'User retrieved successfully.');
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const result = await usersService.createUser(req.body);
    sendSuccess(res, result, 201, 'User created successfully.');
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await usersService.updateUser(id, req.body);
    sendSuccess(res, result, 200, 'User updated successfully.');
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await usersService.deleteUser(id);
    sendSuccess(res, result, 200, 'User deleted successfully.');
  } catch (error) {
    next(error);
  }
};

export const updateUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await usersService.updateUserStatus(id, status);
    sendSuccess(res, result, 200, 'User status updated successfully.');
  } catch (error) {
    next(error);
  }
};
