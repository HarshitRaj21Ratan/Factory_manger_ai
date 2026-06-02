export const SOCKET_EVENTS = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  ERROR: 'error',
  
  // Custom business events
  PRODUCTION_UPDATE: 'production:update',
  MACHINE_STATUS_CHANGE: 'machine:status_change',
  INVENTORY_ALERT: 'inventory:alert',
  MAINTENANCE_LOGGED: 'maintenance:logged',
  NEW_NOTIFICATION: 'notification:new',
};
