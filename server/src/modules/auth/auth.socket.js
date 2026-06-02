import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import prisma from '../../config/db.js';

export const socketAuth = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token || socket.handshake.headers['authorization']?.split(' ')[1];
    
    if (!token) {
      return next(new Error('Authentication error: Token not provided.'));
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return next(new Error('Authentication error: User not found.'));
    }

    socket.user = user;
    next();
  } catch (err) {
    next(new Error('Authentication error: Invalid or expired token.'));
  }
};
