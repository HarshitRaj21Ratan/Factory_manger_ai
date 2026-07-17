'use client';

import { BellRing, Sparkles, ArrowRight } from 'lucide-react';

interface InventoryItem {
  name: string;
  sku: string;
  category: string;
  stock: number;
  unit: string;
  status: string;
}

interface PriorityAlertsProps {
  inventory: InventoryItem[];
  onReorderTrigger: (sku: string) => void;
}

export function PriorityAlerts({ inventory, onReorderTrigger }: PriorityAlertsProps) {
  // Dynamically filter items that are low or out of stock directly from the main list array
  const activeAlerts = inventory.filter(item => item.status === 'LOW STOCK' || item.status === 'OUT OF STOCK');

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between pb-3.5 border-b border-gray-100">
          <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
            <BellRing className="h-4 w-4 text-rose-500" />
            <span>Priority Queue</span>
          </div>
          <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-md font-bold tracking-wide">
            {activeAlerts.length} ALARMS active
          </span>
        </div>
        
        <div className="mt-4 space-y-2.5">
          {activeAlerts.map((item, idx) => (
            <div key={idx} className="group p-3 rounded-lg border border-gray-100 bg-gray-50/30 space-y-2 hover:border-gray-300 hover:bg-white transition-all duration-200">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-gray-900">{item.name}</span>
                <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded border tracking-wider uppercase ${
                  item.status === 'OUT OF STOCK' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                }`}>
                  {item.stock} {item.unit}
                </span>
              </div>
              <div className="flex justify-between items-center text-[11px] text-gray-400 font-medium">
                <span>Domain: {item.category}</span>
                <button 
                  onClick={() => onReorderTrigger(item.sku)}
                  className="inline-flex items-center gap-0.5 text-blue-600 font-bold hover:text-blue-700"
                >
                  Reorder <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          ))}
          {activeAlerts.length === 0 && (
            <p className="text-center py-6 text-xs text-gray-400 font-medium">✅ Warehouse stock bounds optimal.</p>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-blue-100 bg-gradient-to-b from-blue-50/40 to-transparent p-5 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center gap-2 font-bold text-blue-600 mb-2.5">
          <Sparkles className="h-4 w-4" />
          <span className="text-xs uppercase tracking-wider">AI Procurement Vector</span>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed font-medium">
          Automated limits calculations evaluate material deployment velocities to maximize capital resource liquidity configurations.
        </p>
      </div>
    </div>
  );
}