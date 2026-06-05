'use client';

import { Layers, AlertTriangle, Activity, DollarSign } from 'lucide-react';

const stats = [
  {
    label: 'Current Stock Items',
    value: '12,400',
    change: '+2.4%',
    isPositive: true,
    icon: Layers,
    color: 'text-blue-500 bg-blue-500/10',
  },
  {
    label: 'Low Stock Items',
    value: '15',
    change: '+3 today',
    isPositive: false,
    icon: AlertTriangle,
    color: 'text-amber-500 bg-amber-500/10',
  },
  {
    label: 'Monthly Consumption',
    value: '4,200',
    change: '-5.1%',
    isPositive: true,
    icon: Activity,
    color: 'text-emerald-500 bg-emerald-500/10',
  },
  {
    label: 'Total Inventory Value',
    value: '$245,000',
    change: 'Active Assets',
    isPositive: null,
    icon: DollarSign,
    color: 'text-purple-500 bg-purple-500/10',
  },
];

export function KpiStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
              <div className={`rounded-lg p-2 ${stat.color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">{stat.value}</h2>
              {stat.isPositive !== null && (
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  stat.isPositive 
                    ? 'bg-emerald-500/10 text-emerald-600' 
                    : 'bg-amber-500/10 text-amber-600'
                }`}>
                  {stat.change}
                </span>
              )}
              {stat.isPositive === null && (
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{stat.change}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}