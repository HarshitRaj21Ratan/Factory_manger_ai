import { Worker } from 'bullmq';
import redisClient from '../../../config/redis.js';

if (redisClient) {
  const emailWorker = new Worker('emailQueue', async (job) => {
    console.log(`[WORKER] Processing email job ${job.id} of type ${job.name}`);
    const { to, subject, body } = job.data;
    
    // Simulate SMTP delivery latency
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    console.log(`[WORKER] Email successfully sent to ${to} with subject "${subject}"`);
  }, { 
    connection: redisClient 
  });

  emailWorker.on('completed', (job) => {
    console.log(`[WORKER] Job ${job.id} successfully completed`);
  });

  emailWorker.on('failed', (job, err) => {
    console.error(`[WORKER ERROR] Job ${job?.id} failed with message: ${err.message}`);
  });
}
