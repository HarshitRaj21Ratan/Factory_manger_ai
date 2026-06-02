import prisma from '../config/db.js';

export const checkLowInventoryJob = async () => {
  console.log('[JOB] Running inventory stock level check...');
  try {
    const lowStockItems = await prisma.inventory.findMany({
      where: {
        quantity: {
          lt: prisma.inventory.fields.minThreshold,
        },
      },
    });

    if (lowStockItems.length > 0) {
      console.log(`[JOB] Found ${lowStockItems.length} items below minimum threshold:`, 
        lowStockItems.map(item => `${item.name} (${item.quantity}/${item.minThreshold} ${item.unit})`)
      );
      // Trigger alerts or queue notification tasks here...
    } else {
      console.log('[JOB] All inventory levels are above minimum threshold.');
    }
  } catch (error) {
    console.error('[JOB ERROR] Inventory job failed:', error);
  }
};
