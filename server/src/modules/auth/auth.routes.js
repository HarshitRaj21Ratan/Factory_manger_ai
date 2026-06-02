import { Router } from 'express';
import * as authController from './auth.controller.js';
import { validate } from '../../core/middleware/validate.js';
import { registerSchema, loginSchema } from './auth.validation.js';
import { protect } from '../../core/middleware/auth.js';

const router = Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.get('/me', protect, authController.getMe);

export default router;
