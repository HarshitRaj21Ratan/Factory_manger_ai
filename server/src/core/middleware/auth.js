import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import prisma from '../../config/db.js';
import { UnauthorizedError, ForbiddenError } from '../errors/AppError.js';

export const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new UnauthorizedError('You are not logged in. Please log in to get access.'));
    }

    // Verify token
    const decoded = jwt.verify(token, env.JWT_SECRET);

    // Fetch user and assign to request
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return next(new UnauthorizedError('The user belonging to this token no longer exists.'));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new UnauthorizedError('Invalid token. Please log in again.'));
  }
};

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenError('You do not have permission to perform this action.'));
    }
    next();
  };
};
