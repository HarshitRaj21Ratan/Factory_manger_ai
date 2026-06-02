import { Queue } from 'bullmq';
import redisClient from '../config/redis.js';

export const emailQueue = redisClient ? new Queue('emailQueue', { 
  connection: redisClient 
}) : null;

export const reportQueue = redisClient ? new Queue('reportQueue', { 
  connection: redisClient 
}) : null;

export const addJobToQueue = async (queue, jobName, jobData, opts = {}) => {
  if (!queue) {
    console.warn(`[QUEUE] Queue connection not available. Skipping job registration: ${jobName}`);
    return null;
  }
  return await queue.add(jobName, jobData, opts);
};
