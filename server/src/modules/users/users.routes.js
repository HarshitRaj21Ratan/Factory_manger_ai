import { Router } from 'express';
import * as usersController from './users.controller.js';
import { validate } from '../../core/middleware/validate.js';
import { createUserSchema, updateUserSchema, updateUserStatusSchema } from './users.validation.js';
import { protect, restrictTo } from '../../core/middleware/auth.js';

const router = Router();

// Secure all user management routes under protect & restrictTo
router.use(protect);
router.use(restrictTo('OWNER', 'MANAGER'));

router.route('/')
  .get(usersController.getUsers)
  .post(validate(createUserSchema), usersController.createUser);

router.route('/:id')
  .get(usersController.getUserById)
  .put(validate(updateUserSchema), usersController.updateUser)
  .delete(usersController.deleteUser);

router.patch('/:id/status', validate(updateUserStatusSchema), usersController.updateUserStatus);

export default router;