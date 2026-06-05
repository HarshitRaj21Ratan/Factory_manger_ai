'use client';

import { Layers, AlertTriangle, Activity, DollarSign } from 'lucide-react';

interface InventoryItem {
  name: string;
  sku: string;
  category: string;
  stock: number;
  unit: string;
  status: string;
}

interface KpiStatsProps {
  items: InventoryItem[];
}

export function KpiStats({ items }: KpiStatsProps) {
  // 1. Calculate unique total item count
  const totalItems = items.length;

  // 2. Filter out items where stock is 10 or less
  const lowStockCount = items.filter(item => item.stock <= 10).length;

  // 3. Simple mock calculation for consumption based on active stock volume
  const totalStockVolume = items.reduce((acc, item) => acc + item.stock, 0);
  const monthlyConsumption = Math.round(totalStockVolume * 0.35);

  // 4. Calculate an estimated inventory value ($125 average asset item baseline price)
  const estimatedValue = items.reduce((acc, item) => acc + (item.stock * 125), 0);

  const stats = [
    {
      label: 'Current Stock Items',
      value: totalItems.toLocaleString(),
      change: '+2.4%',
      isPositive: true,
      icon: Layers,
      color: 'text-blue-500 bg-blue-500/5 border-blue-500/10',
    },
    {
      label: 'Low Stock Items',
      value: lowStockCount.toLocaleString(),
      change: lowStockCount > 3 ? '+3 today' : 'Stable',
      isPositive: lowStockCount <= 3,
      icon: AlertTriangle,
      color: lowStockCount > 3 ? 'text-rose-500 bg-rose-500/5 border-rose-500/10' : 'text-amber-500 bg-amber-500/5 border-amber-500/10',
    },
    {
      label: 'Monthly Consumption',
      value: monthlyConsumption.toLocaleString(),
      change: '-5.1%',
      isPositive: true,
      icon: Activity,
      color: 'text-emerald-500 bg-emerald-500/5 border-emerald-500/10',
    },
    {
      label: 'Total Inventory Value',
      value: `$${estimatedValue.toLocaleString()}`,
      change: 'Active Assets',
      isPositive: null,
      icon: DollarSign,
      color: 'text-purple-500 bg-purple-500/5 border-purple-500/10',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div 
            key={index} 
            className="group relative rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-50/0 to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <div className="relative flex items-center justify-between space-y-0 pb-1.5 z-10">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{stat.label}</p>
              <div className={`rounded-lg border p-2 ${stat.color} transition-transform duration-300 group-hover:scale-105`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>
            
            <div className="relative mt-2 flex items-baseline justify-between z-10">
              <h2 className="text-2xl font-semibold tracking-tight text-gray-900 font-sans tabular-nums">
                {stat.value}
              </h2>
              {stat.isPositive !== null && (
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                  stat.isPositive 
                    ? 'bg-emerald-50/60 text-emerald-600 border-emerald-100' 
                    : 'bg-amber-50/60 text-amber-600 border-amber-100'
                }`}>
                  {stat.change}
                </span>
              )}
              {stat.isPositive === null && (
                <span className="text-[11px] text-gray-400 border border-gray-100 bg-gray-50/50 px-2 py-0.5 rounded-md font-medium tracking-tight">
                  {stat.change}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}