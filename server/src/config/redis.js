import Redis from 'ioredis';
import { env } from './env.js';

let redis = null;

if (env.REDIS_URL) {
  redis = new Redis(env.REDIS_URL, {
    maxRetriesPerRequest: null, // Required for BullMQ compatibility
  });
  
  redis.on('connect', () => {
    console.log('Redis connected successfully');
  });

  redis.on('error', (err) => {
    console.error('Redis connection error:', err);
  });
} else {
  console.warn('REDIS_URL not configured. Redis/Queues functionality will be disabled or mocked.');
}

export default redis;
