'use client';

import { ShieldAlert, History } from 'lucide-react';

interface VarianceEntry {
  id: string;
  name: string;
  sku: string;
  qtyLost: number;
  timestamp: string;
}

interface VarianceLogProps {
  logs: VarianceEntry[];
  onRemoveItem: (id: string) => void;
}

export function VarianceLog({ logs, onRemoveItem }: VarianceLogProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="pb-3.5 border-b border-gray-100 mb-4">
        <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
          <ShieldAlert className="h-4 w-4 text-amber-500" />
          <span>QA Variance Exceptions Log</span>
        </div>
      </div>

      {logs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 text-center text-gray-400 gap-1.5">
          <History className="h-5 w-5 text-gray-300" />
          <p className="text-xs font-medium">No material damage or transit discrepancies logged.</p>
        </div>
      ) : (
        <div className="max-h-60 overflow-y-auto space-y-2.5 pr-1">
          {logs.map((log) => (
            <div key={log.id} className="group p-3 rounded-lg border border-rose-100 bg-rose-50/20 space-y-2 animate-fadeIn">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-gray-900">{log.name}</p>
                  <p className="text-[10px] text-gray-400 font-mono font-medium">{log.sku} • {log.timestamp}</p>
                </div>
                <div className="shrink-0">
                  <span className="text-[9px] font-extrabold bg-rose-500 text-white px-1.5 py-0.5 rounded border border-rose-600/20 shadow-sm tracking-wide">
                    -{log.qtyLost} DEFECTIVE
                  </span>
                </div>
              </div>
              
              {/* GRANULAR INTERACTIVE INDIVIDUAL ROW RESOLUTION STRIP */}
              <div className="flex justify-end pt-1.5 border-t border-rose-100/40 text-[11px]">
                <button 
                  onClick={() => onRemoveItem(log.id)}
                  className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition-colors cursor-pointer"
                >
                  Mark as Recovered →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}