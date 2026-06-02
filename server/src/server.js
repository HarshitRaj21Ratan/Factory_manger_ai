import http from 'http';
import app from './app.js';
import { env } from './config/env.js';
import { startSocketServer } from './realtime/socket.server.js';
import prisma from './config/db.js';

const server = http.createServer(app);

// Mount Realtime WebSockets to Server
startSocketServer(server);

// Start Server after Database handshake
const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('[DB] Database connected successfully.');

    server.listen(env.PORT, () => {
      console.log(`[SERVER] Server is running in ${env.NODE_ENV} mode on port ${env.PORT}`);
    });
  } catch (error) {
    console.error('[CRITICAL] Failed to connect to database or start server:', error);
    process.exit(1);
  }
};

// Graceful termination
process.on('SIGTERM', async () => {
  console.log('[SERVER] SIGTERM received. Initiating graceful shutdown...');
  server.close(async () => {
    console.log('[SERVER] HTTP server closed.');
    await prisma.$disconnect();
    console.log('[DB] Database connections closed.');
    process.exit(0);
  });
});

startServer();
