import prisma from '../config/db.js';

export const aggregateDailyReportsJob = async () => {
  console.log('[JOB] Aggregating daily factory production and defect statistics...');
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const productionSummary = await prisma.production.aggregate({
      where: {
        date: {
          gte: today,
        },
      },
      _sum: {
        producedUnits: true,
        rejectedUnits: true,
      },
      _count: {
        id: true,
      },
    });

    console.log('[JOB] Production aggregation result:', {
      runsChecked: productionSummary._count.id,
      totalProduced: productionSummary._sum.producedUnits || 0,
      totalRejected: productionSummary._sum.rejectedUnits || 0,
    });
  } catch (error) {
    console.error('[JOB ERROR] Daily report aggregation job failed:', error);
  }
};
