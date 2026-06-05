'use client';

import { BellRing, Sparkles } from 'lucide-react';

const criticalAlerts = [
  { id: 1, name: 'Industrial Lubricant', stock: '0 Liters', status: 'OUT OF STOCK', color: 'bg-rose-100 text-rose-700 border-rose-200' },
  { id: 2, name: 'Fiber Optic Sensors', stock: '3 pcs', status: 'LOW STOCK', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  { id: 3, name: 'C-3PO Controller PCB', stock: '8 pcs', status: 'LOW STOCK', color: 'bg-amber-100 text-amber-700 border-amber-200' },
];

export function PriorityAlerts() {
  return (
    <div className="space-y-4">
      {/* Real-time Urgency Panel */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2 font-bold text-gray-900">
            <BellRing className="h-4 w-4 text-rose-500" />
            <span>Priority Alerts</span>
          </div>
          <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">3</span>
        </div>
        
        <div className="mt-4 space-y-3">
          {criticalAlerts.map((alert) => (
            <div key={alert.id} className="p-3 rounded-lg border border-gray-100 bg-gray-50/50 space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-sm font-semibold text-gray-900">{alert.name}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${alert.color}`}>
                  {alert.stock}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>Required for Belt B Line</span>
                <button className="text-xs text-blue-600 font-semibold hover:underline">Quick Reorder</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern AI Analytics Recommendation Insight Block */}
      <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50/50 to-transparent p-5 shadow-sm">
        <div className="flex items-center gap-2 font-bold text-blue-600 mb-2">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm">AI Forecasting Insight</span>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">
          Based on the manufacturing schedule for next week, stock of <strong className="text-gray-900">Grade A Steel Coils</strong> will breach safety thresholds in 4 days.
        </p>
        <div className="mt-3 p-2.5 rounded bg-white border border-gray-100 text-xs text-gray-700 font-semibold shadow-sm">
          💡 Recommendation: Increase current order volume by 15%.
        </div>
      </div>
    </div>
  );
}