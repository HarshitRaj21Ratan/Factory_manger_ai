import prisma from '../config/db.js';

export const checkMachineAlertsJob = async () => {
  console.log('[JOB] Running active machine fault alerts check...');
  try {
    const faultedMachines = await prisma.machine.findMany({
      where: {
        status: 'FAULT',
      },
    });

    if (faultedMachines.length > 0) {
      console.log(`[JOB] Found ${faultedMachines.length} faulted machines:`, 
        faultedMachines.map(m => `${m.name} (${m.code})`)
      );
      // Trigger notifications or create alerts in database
    } else {
      console.log('[JOB] No machine faults detected.');
    }
  } catch (error) {
    console.error('[JOB ERROR] Machine alerts job failed:', error);
  }
};
