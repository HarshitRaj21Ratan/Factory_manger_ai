import { initSocket } from '../config/socket.js';
import { socketAuth } from '../modules/auth/auth.socket.js';
import { handleConnection } from './socket.handlers.js';

export const startSocketServer = (server) => {
  const io = initSocket(server);
  
  // Apply authentication middleware
  io.use(socketAuth);
  
  io.on('connection', (socket) => {
    handleConnection(io, socket);
  });

  return io;
};
