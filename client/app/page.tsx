'use client';

import { useState, useEffect } from 'react';
import { KpiStats } from '../components/inventory/KpiStats';
import { InventoryTable } from '../components/inventory/InventoryTable';
import { PriorityAlerts } from '../components/inventory/PriorityAlerts';
import { InventoryChart } from '../components/inventory/InventoryChart';
import { AddItemModal } from '../components/inventory/AddItemModal';
import { OrderTracker } from '../components/inventory/OrderTracker';
import { VarianceLog } from '../components/inventory/VarianceLog';
import { Plus, CheckCircle, X } from 'lucide-react';

const initialInventory = [
  { name: 'T-800 Servo Motor', sku: 'MOT-800-22', category: 'Mechanical', stock: 42, unit: 'pcs', minLimit: 15, maxLimit: 100, status: 'IN STOCK' },
  { name: 'C-3PO Controller PCB', sku: 'PCB-PRO-01', category: 'Electronics', stock: 8, unit: 'pcs', minLimit: 20, maxLimit: 80, status: 'LOW STOCK' },
  { name: 'Grade A Steel Coils', sku: 'RAW-ST-500', category: 'Raw Materials', stock: 1250, unit: 'kg', minLimit: 300, maxLimit: 2000, status: 'IN STOCK' },
  { name: 'Industrial Grade Lubricant', sku: 'LUB-V5-XL', category: 'Consumables', stock: 0, unit: 'Liters', minLimit: 25, maxLimit: 150, status: 'OUT OF STOCK' },
  { name: 'Hydraulic Valve Unit', sku: 'HYD-VL-99', category: 'Mechanical', stock: 15, unit: 'pcs', minLimit: 12, maxLimit: 60, status: 'IN STOCK' },
  { name: 'Fiber Optic Sensors', sku: 'SEN-F0-012', category: 'Electronics', stock: 3, unit: 'pcs', minLimit: 10, maxLimit: 50, status: 'LOW STOCK' },
];

const mockTransitPipeline = [
  { id: 'TRK-902', name: 'Pneumatic Hoses 10m', sku: 'PNE-H0-10M', quantityOrdered: 50, supplier: 'Apex Fluids Inc.', status: 'In Transit' as const, category: 'Consumables' },
  { id: 'TRK-401', name: 'Tungsten Drill Bits', sku: 'TOL-DRI-6MM', quantityOrdered: 20, supplier: 'Titan Tools Corp.', status: 'Shipped' as const, category: 'Mechanical' }
];

interface VarianceEntry {
  id: string;
  name: string;
  sku: string;
  qtyLost: number;
  timestamp: string;
}

export default function Home() {
  const [inventory, setInventory] = useState<typeof initialInventory>([]);
  const [transitOrders, setTransitOrders] = useState<typeof mockTransitPipeline>([]);
  const [varianceLogs, setVarianceLogs] = useState<VarianceEntry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const savedInventory = localStorage.getItem('factory_inventory');
    const savedTransit = localStorage.getItem('factory_transit');
    const savedVariance = localStorage.getItem('factory_variance');
    
    setInventory(savedInventory ? JSON.parse(savedInventory) : initialInventory);
    setTransitOrders(savedTransit ? JSON.parse(savedTransit) : mockTransitPipeline);
    setVarianceLogs(savedVariance ? JSON.parse(savedVariance) : []);
  }, []);

  // AUTOMATIC 10-SECOND COUNTER DISMISSAL EFFECT FIELD
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 10000); // Trigger countdown deletion after exactly 10,000ms

      return () => clearTimeout(timer); // Clean state listener if toast gets hand-cut early
    }
  }, [showToast]);

  const saveToDisk = (newInv: typeof initialInventory, newTransit: typeof mockTransitPipeline, newVariance: VarianceEntry[]) => {
    setInventory(newInv);
    setTransitOrders(newTransit);
    setVarianceLogs(newVariance);
    localStorage.setItem('factory_inventory', JSON.stringify(newInv));
    localStorage.setItem('factory_transit', JSON.stringify(newTransit));
    localStorage.setItem('factory_variance', JSON.stringify(newVariance));
  };

  const triggerNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleAddItem = (newItem: any) => {
    const update = [newItem, ...inventory];
    saveToDisk(update, transitOrders, varianceLogs);
    triggerNotification(`Added ${newItem.name} registry successfully!`);
  };

  const handleUpdateItemLimits = (sku: string, min: number, max: number) => {
    const updated = inventory.map(item => {
      if (item.sku === sku) {
        let status = 'IN STOCK';
        if (item.stock === 0) status = 'OUT OF STOCK';
        else if (item.stock <= min) status = 'LOW STOCK';
        return { ...item, minLimit: min, maxLimit: max, status };
      }
      return item;
    });
    saveToDisk(updated, transitOrders, varianceLogs);
    triggerNotification(`Threshold parameters updated for SKU ${sku}.`);
  };

  const handleTriggerReorder = (sku: string) => {
    const targetItem = inventory.find(item => item.sku === sku);
    if (!targetItem) return;

    const max = Number(targetItem.maxLimit) || 100;
    const current = Number(targetItem.stock) || 0;
    let neededQuantity = max - current;
    
    if (neededQuantity <= 0) neededQuantity = Math.floor(max * 0.5);

    const newTicket = {
      id: `TRK-${Math.floor(100 + Math.random() * 900)}`,
      name: targetItem.name,
      sku: targetItem.sku,
      quantityOrdered: neededQuantity,
      supplier: 'Global Procurement LLC',
      status: 'Packed' as const,
      category: targetItem.category
    };

    saveToDisk(inventory, [newTicket, ...transitOrders], varianceLogs);
    triggerNotification(`Ordered ${neededQuantity} units of ${targetItem.name}.`);
  };

  const handleReceiveShipment = (orderId: string, acceptedQty: number) => {
    const targetOrder = transitOrders.find(o => o.id === orderId);
    if (!targetOrder) return;

    const theoreticalQty = Number(targetOrder.quantityOrdered) || 0;
    let updatedVariance = [...varianceLogs];

    if (acceptedQty < theoreticalQty) {
      const lostCount = theoreticalQty - acceptedQty;
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const logEntry: VarianceEntry = {
        id: `VAR-${Math.floor(1000 + Math.random() * 9000)}`,
        name: targetOrder.name,
        sku: targetOrder.sku,
        qtyLost: lostCount,
        timestamp: timeStr
      };
      updatedVariance = [logEntry, ...updatedVariance];
    }

    const updatedInventory = inventory.map(item => {
      if (item.sku === targetOrder.sku) {
        const freshStockValue = (Number(item.stock) || 0) + acceptedQty;
        let status = 'IN STOCK';
        if (freshStockValue === 0) status = 'OUT OF STOCK';
        else if (freshStockValue <= (Number(item.minLimit) || 10)) status = 'LOW STOCK';
        return { ...item, stock: freshStockValue, status };
      }
      return item;
    });

    saveToDisk(updatedInventory, transitOrders.filter(o => o.id !== orderId), updatedVariance);
    triggerNotification(`Processed intake manifestation. Committed ${acceptedQty} items.`);
  };

  // GRANULAR SINGLE ITEM DISCREPANCY RECOVERY HANDLER
  const handleRemoveSingleVarianceLog = (logId: string) => {
    const targetLog = varianceLogs.find(l => l.id === logId);
    const updatedLogs = varianceLogs.filter(l => l.id !== logId);
    saveToDisk(inventory, transitOrders, updatedLogs);
    if (targetLog) {
      triggerNotification(`Marked items for ${targetLog.name} as safely recovered.`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100/60 p-5 md:p-8 font-sans antialiased relative overflow-x-hidden">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200/50 pb-5">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-950">Logistics Operations Command</h1>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Real-time dynamic allocation thresholds and verification tracking channels.</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold">
            <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700">
              <Plus className="h-3.5 w-3.5" /> Register Item
            </button>
          </div>
        </div>

        <KpiStats items={inventory} />

        <div className="grid gap-6 lg:grid-cols-3 items-start">
          <div className="lg:col-span-2 space-y-6">
            <InventoryTable items={inventory} onUpdateLimits={handleUpdateItemLimits} />
            <OrderTracker orders={transitOrders} onReceive={handleReceiveShipment} />
            <InventoryChart />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <PriorityAlerts inventory={inventory} onReorderTrigger={handleTriggerReorder} />
            {/* INJECT UPDATE VARIANCE CONTROLLER PROPS */}
            <VarianceLog logs={varianceLogs} onRemoveItem={handleRemoveSingleVarianceLog} />
          </div>
        </div>

        <AddItemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddItem} />
      </div>

      {showToast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-gray-900 text-white px-4 py-3.5 rounded-xl shadow-2xl border border-white/10 animate-in slide-in-from-bottom-5 fade-in duration-300 w-full max-w-sm">
          <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
          <p className="text-xs font-medium flex-1">{toastMessage}</p>
          <button onClick={() => setShowToast(false)} className="p-1 rounded-md text-gray-400 hover:bg-white/10 hover:text-white transition-colors"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}
    </div>
  );
}