'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const mockInventory = [
  { name: 'T-800 Servo Motor', sku: 'MOT-800-22', category: 'Mechanical', stock: 42, unit: 'pcs', status: 'IN STOCK' },
  { name: 'C-3PO Controller PCB', sku: 'PCB-PRO-01', category: 'Electronics', stock: 8, unit: 'pcs', status: 'LOW STOCK' },
  { name: 'Grade A Steel Coils', sku: 'RAW-ST-500', category: 'Raw Materials', stock: 1250, unit: 'kg', status: 'IN STOCK' },
  { name: 'Industrial Grade Lubricant', sku: 'LUB-V5-XL', category: 'Consumables', stock: 0, unit: 'Liters', status: 'OUT OF STOCK' },
  { name: 'Hydraulic Valve Unit', sku: 'HYD-VL-99', category: 'Mechanical', stock: 15, unit: 'pcs', status: 'IN STOCK' },
  { name: 'Fiber Optic Sensors', sku: 'SEN-F0-012', category: 'Sensors', stock: 3, unit: 'pcs', status: 'LOW STOCK' },
  { name: 'Pneumatic Hoses 10m', sku: 'PNE-H0-10M', category: 'Consumables', stock: 85, unit: 'm', status: 'IN STOCK' },
  { name: 'Tungsten Drill Bits', sku: 'TOL-DRI-6MM', category: 'Tools', stock: 12, unit: 'pcs', status: 'LOW STOCK' },
];

export function InventoryTable() {
  const [search, setSearch] = useState('');

  // Live filter feature: dynamically checks item names or SKUs as you type
  const filteredItems = mockInventory.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Table Action Controls Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pb-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search inventory, SKUs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
          />
        </div>
        <div className="flex w-full sm:w-auto items-center gap-2 justify-end">
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
            <Filter className="h-3.5 w-3.5" /> All Categories
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
            All Statuses
          </button>
        </div>
      </div>

      {/* Scrollable Table View Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50/70 border-y border-gray-200">
            <tr>
              <th className="px-4 py-3 font-semibold">Item Name</th>
              <th className="px-4 py-3 font-semibold">SKU</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold text-right">Stock</th>
              <th className="px-4 py-3 font-semibold text-center">Unit</th>
              <th className="px-4 py-3 font-semibold text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredItems.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3.5 font-bold text-gray-900">{item.name}</td>
                <td className="px-4 py-3.5 font-mono text-xs text-gray-400 tracking-tight">{item.sku}</td>
                <td className="px-4 py-3.5 text-gray-500">{item.category}</td>
                <td className="px-4 py-3.5 text-right font-bold text-gray-900">{item.stock.toLocaleString()}</td>
                <td className="px-4 py-3.5 text-center text-gray-400 text-xs">{item.unit}</td>
                <td className="px-4 py-3.5 text-center">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    item.status === 'IN STOCK' ? 'bg-emerald-500/10 text-emerald-600' :
                    item.status === 'LOW STOCK' ? 'bg-amber-500/10 text-amber-600' :
                    'bg-rose-500/10 text-rose-600'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredItems.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-sm text-gray-400">
                  No factory parts match your search query.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}