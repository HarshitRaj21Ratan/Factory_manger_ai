import { z } from 'zod';
import { ROLES, WORKER_STATUS } from '../../core/constants/index.js';

export const createUserSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    name: z.string().min(1, 'Name is required'),
    role: z.nativeEnum(ROLES).optional(),
    status: z.nativeEnum(WORKER_STATUS).optional(),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address').optional(),
    password: z.string().min(6, 'Password must be at least 6 characters long').optional(),
    name: z.string().min(1, 'Name is required').optional(),
    role: z.nativeEnum(ROLES).optional(),
    status: z.nativeEnum(WORKER_STATUS).optional(),
  }),
});

export const updateUserStatusSchema = z.object({
  body: z.object({
    status: z.nativeEnum(WORKER_STATUS, {
      required_error: 'Status is required',
    }),
  }),
});
