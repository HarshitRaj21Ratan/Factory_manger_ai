import { SOCKET_EVENTS } from './socket.events.js';

export const handleConnection = (io, socket) => {
  console.log(`Socket client connected: ${socket.id} (User: ${socket.user.name}, Role: ${socket.user.role})`);

  // Join a room based on the user's role
  socket.join(`role:${socket.user.role}`);
  
  // Join a user-specific room
  socket.join(`user:${socket.user.id}`);

  socket.on(SOCKET_EVENTS.DISCONNECT, () => {
    console.log(`Socket client disconnected: ${socket.id}`);
  });

  socket.on('error', (error) => {
    console.error(`Socket error for client ${socket.id}:`, error);
  });
};
