'use client';

import { useState } from 'react';
import { X, Layers, AlertCircle, ShieldCheck } from 'lucide-react';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newItem: { name: string; sku: string; category: string; stock: number; unit: string; minLimit: number; maxLimit: number; status: string }) => void;
}

export function AddItemModal({ isOpen, onClose, onAdd }: AddItemModalProps) {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('Mechanical');
  const [stock, setStock] = useState('');
  const [unit, setUnit] = useState('pcs'); // This active state unit is now passed directly as context below
  
  const [minLimit, setMinLimit] = useState('15');
  const [maxLimit, setMaxLimit] = useState('150');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !sku || !stock) return;

    const stockNum = Number(stock);
    const minNum = Number(minLimit) || 10;
    const maxNum = Number(maxLimit) || 100;
    
    let status = 'IN STOCK';
    if (stockNum === 0) status = 'OUT OF STOCK';
    else if (stockNum <= minNum) status = 'LOW STOCK';

    onAdd({ name, sku: sku.toUpperCase(), category, stock: stockNum, unit, minLimit: minNum, maxLimit: maxNum, status });
    
    setName('');
    setSku('');
    setStock('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-950/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose} />
      <div className="w-full max-w-md bg-white rounded-xl border border-gray-200 shadow-2xl p-6 relative z-10 animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute right-4 top-4 p-1 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-colors"><X className="h-4 w-4" /></button>

        <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-gray-100">
          <div className="bg-blue-50/10 text-blue-600 p-2 rounded-lg border border-blue-500/10"><Layers className="h-4 w-4" /></div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Register Material Asset</h3>
            <p className="text-[11px] text-gray-400 font-medium">Log newly routed materials with dedicated threshold bounds</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Asset Nomenclature</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Titanium Welds" className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 bg-gray-50/50" required />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Serial SKU ID</label>
              <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="e.g., RAW-WLD-88" className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-mono focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 bg-gray-50/50" required />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-1">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Classification</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-2 py-1.5 bg-gray-50/50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 font-bold">
                <option value="Mechanical">Mechanical</option>
                <option value="Electronics">Electronics</option>
                <option value="Raw Materials">Raw Materials</option>
                <option value="Consumables">Consumables</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Volume</label>
              <input type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="0" className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 bg-gray-50/50 font-medium" required />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Unit</label>
              <select value={unit} onChange={(e) => setUnit(e.target.value)} className="w-full px-2 py-1.5 bg-gray-50/50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 font-bold">
                <option value="pcs">pcs</option>
                <option value="kg">kg</option>
                <option value="Liters">Liters</option>
              </select>
            </div>
          </div>

          {/* DYNAMIC UNIT TEXT BINDING ACCORDING TO SELECTED PARAMETERS */}
          <div className="p-3 bg-blue-50/30 rounded-xl border border-blue-100/70 grid grid-cols-2 gap-3">
            <div>
              <label className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-900 uppercase tracking-wider mb-1">
                <AlertCircle className="h-3 w-3 text-amber-500" /> Min Limit ({unit})
              </label>
              <input type="number" value={minLimit} onChange={(e) => setMinLimit(e.target.value)} className="w-full px-3 py-1.5 border border-blue-200 rounded-lg text-xs font-bold text-gray-900 focus:outline-none bg-white" required />
            </div>
            <div>
              <label className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-900 uppercase tracking-wider mb-1">
                <ShieldCheck className="h-3 w-3 text-emerald-500" /> Max Target ({unit})
              </label>
              <input type="number" value={maxLimit} onChange={(e) => setMaxLimit(e.target.value)} className="w-full px-3 py-1.5 border border-blue-200 rounded-lg text-xs font-bold text-gray-900 focus:outline-none bg-white" required />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2 text-xs font-bold border-t border-gray-50 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Commit Entry</button>
          </div>
        </form>
      </div>
    </div>
  );
}