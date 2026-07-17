'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal, Settings, Check } from 'lucide-react';

interface InventoryItem {
  name: string;
  sku: string;
  category: string;
  stock: number;
  unit: string;
  status: string;
  minLimit: number;
  maxLimit: number;
}

interface InventoryTableProps {
  items: InventoryItem[];
  onUpdateLimits: (sku: string, minLimit: number, maxLimit: number) => void;
}

export function InventoryTable({ items, onUpdateLimits }: InventoryTableProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  const [editingSku, setEditingSku] = useState<string | null>(null);
  const [editMin, setEditMin] = useState<number>(0);
  const [editMax, setEditMax] = useState<number>(0);

  const categories = ['All', ...new Set(items.map(item => item.category))];

  const handleStartEdit = (item: InventoryItem) => {
    setEditingSku(item.sku);
    // Safe fallbacks: If the limit is missing or undefined, default directly to 0
    setEditMin(item.minLimit ?? 0);
    setEditMax(item.maxLimit ?? 0);
  };

  const handleSaveEdit = (sku: string) => {
    onUpdateLimits(sku, editMin, editMax);
    setEditingSku(null);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          item.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-5">
      <div className="flex flex-col gap-4 pb-5 border-b border-gray-100 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Filter components, batches, SKUs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 placeholder-gray-400 transition-all shadow-inner"
          />
        </div>
        
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
          <div className="pl-1.5 pr-1 text-gray-400 hidden md:block"><SlidersHorizontal className="h-3.5 w-3.5" /></div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 whitespace-nowrap ${
                activeCategory === cat ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="text-xs font-bold uppercase tracking-wider text-gray-400">
              <th className="pb-3 px-2">Item Nomenclature</th>
              <th className="pb-3 px-2">Serial SKU</th>
              <th className="pb-3 px-2">Quantity</th>
              <th className="pb-3 px-2 text-center">Custom Targets (Min / Max)</th>
              <th className="pb-3 px-2 text-right">Status State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredItems.map((item, index) => (
              <tr key={index} className="group hover:bg-gray-50/60 transition-colors duration-150">
                <td className="py-3.5 px-2 font-semibold text-gray-900">{item.name}</td>
                <td className="py-3.5 px-2 font-mono text-xs text-gray-400 font-medium tracking-tight">{item.sku}</td>
                <td className="py-3.5 px-2 font-bold text-gray-900 tabular-nums">
                  {item.stock.toLocaleString()} <span className="text-[10px] text-gray-400 font-medium">{item.unit}</span>
                </td>
                
                {/* DYNAMIC THRESHOLD WITH UNIT CONTEXT BINDING */}
                <td className="py-3.5 px-2 text-center">
                  {editingSku === item.sku ? (
                    <div className="inline-flex items-center gap-1 bg-white border border-blue-200 p-1.5 rounded-lg shadow-sm animate-fadeIn text-xs">
                      <input type="number" value={editMin} title="Min Alert Trigger Limit" onChange={(e) => setEditMin(Number(e.target.value))} className="w-12 text-center border-none p-0 text-xs text-gray-900 font-bold focus:ring-0" />
                      <span className="text-gray-300 font-bold">/</span>
                      <input type="number" value={editMax} title="Max Restock Target Capacity" onChange={(e) => setEditMax(Number(e.target.value))} className="w-14 text-center border-none p-0 text-xs text-gray-900 font-bold focus:ring-0" />
                      <span className="text-gray-400 font-bold text-[10px] px-1 bg-gray-50 rounded border">{item.unit}</span>
                      <button onClick={() => handleSaveEdit(item.sku)} className="bg-blue-600 text-white p-1 rounded-md hover:bg-blue-700 ml-1"><Check className="h-3 w-3" /></button>
                    </div>
                  ) : (
                    <div 
                      onClick={() => handleStartEdit(item)}
                      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md border border-gray-100 bg-gray-50/50 text-[11px] font-semibold text-gray-500 cursor-pointer hover:border-blue-200 hover:bg-white transition-all group/btn"
                    >
                      <span>Min: <strong className="text-gray-800">{item.minLimit}</strong> <small className="text-gray-400 text-[9px]">{item.unit}</small></span>
                      <span className="text-gray-300">|</span>
                      <span>Max: <strong className="text-gray-800">{item.maxLimit}</strong> <small className="text-gray-400 text-[9px]">{item.unit}</small></span>
                      <Settings className="h-3 w-3 text-gray-300 group-hover/btn:text-blue-500 transition-colors ml-0.5" />
                    </div>
                  )}
                </td>

                <td className="py-3.5 px-2 text-right">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${
                    item.status === 'IN STOCK' ? 'bg-emerald-50/50 text-emerald-600 border-emerald-100' :
                    item.status === 'LOW STOCK' ? 'bg-amber-50/50 text-amber-600 border-amber-100' : 'bg-rose-50/50 text-rose-600 border-rose-100'
                  }`}>
                    {item.status === 'OUT OF STOCK' && (
                      <span className="flex h-1.5 w-1.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
                      </span>
                    )}
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}