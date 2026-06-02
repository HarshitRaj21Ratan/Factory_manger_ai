import express from 'express';
import cors from 'cors';
import { requestLogger } from './core/middleware/logger.js';
import { errorHandler } from './core/errors/errorHandler.js';
import { NotFoundError } from './core/errors/AppError.js';

// Route Imports
import authRoutes from './modules/auth/auth.routes.js';
import usersRoutes from './modules/users/users.routes.js';
import productionRoutes from './modules/production/production.routes.js';
import inventoryRoutes from './modules/inventory/inventory.routes.js';
import machinesRoutes from './modules/machines/machines.routes.js';
import shiftsRoutes from './modules/shifts/shifts.routes.js';
import workersRoutes from './modules/workers/workers.routes.js';
import notificationsRoutes from './modules/notifications/notifications.routes.js';
import reportsRoutes from './modules/reports/reports.routes.js';
import analyticsRoutes from './modules/analytics/analytics.routes.js';

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// API Status health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Mounting Module Routes
app.use('/api/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/production', productionRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/machines', machinesRoutes);
app.use('/api/shifts', shiftsRoutes);
app.use('/api/workers', workersRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/analytics', analyticsRoutes);

// Catch-all unhandled routes
app.all('*', (req, res, next) => {
  next(new NotFoundError(`Can't find ${req.originalUrl} on this server!`));
});

// Global Error Handler Middleware
app.use(errorHandler);

export default app;
