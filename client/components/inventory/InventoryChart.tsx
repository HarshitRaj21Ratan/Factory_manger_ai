'use client';

import { Activity } from 'lucide-react';

export function InventoryChart() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
        <div className="flex items-center gap-2 font-bold text-gray-900">
          <Activity className="h-4 w-4 text-blue-500" />
          <span>Inventory Flow Tracking (Past 7 Days)</span>
        </div>
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg text-xs">
          <button className="px-2.5 py-1 bg-white rounded shadow-sm font-semibold text-gray-900">7D</button>
          <button className="px-2.5 py-1 text-gray-500 hover:text-gray-900 font-medium">30D</button>
        </div>
      </div>

      {/* Render Graph Mock Shell Simulation */}
      <div className="h-48 w-full flex items-end gap-3 pt-6 px-2 relative">
        {/* Horizontal background scale guides */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-gray-300">
          <div className="border-b border-gray-100 w-full"></div>
          <div className="border-b border-gray-100 w-full"></div>
          <div className="border-b border-gray-100 w-full"></div>
        </div>

        {/* Visualized Clean Bars mimicking points */}
        {[35, 50, 28, 65, 42, 80, 95].map((height, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-2 z-10 group cursor-pointer">
            <div className="w-full bg-blue-500/10 group-hover:bg-blue-500/20 rounded-t transition-all relative" style={{ height: `${height}%` }}>
              {/* Animated top indicator accent line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-500"></div>
              {/* Tooltip on hover */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-1.5 py-0.5 rounded text-[9px] font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {(height * 140).toLocaleString()} units
              </div>
            </div>
            <span className="text-[10px] text-gray-400 font-bold uppercase">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}