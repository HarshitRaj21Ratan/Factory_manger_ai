'use client';

import { KpiStats } from '../components/inventory/KpiStats';
import { InventoryTable } from '../components/inventory/InventoryTable';
import { PriorityAlerts } from '../components/inventory/PriorityAlerts';
import { InventoryChart } from '../components/inventory/InventoryChart';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* Modern Dashboard Layout Main Action Title Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200/60 pb-5">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Inventory Management
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Real-time asset tracking of components, materials, and warehouse supply metrics.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 text-xs font-semibold bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 text-gray-700 transition-colors">
              Export CSV
            </button>
            <button className="px-3 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
              + Add Item
            </button>
          </div>
        </div>

        {/* Row 1: The Top 4 Summary Cards Row */}
        <KpiStats />

        {/* Row 2: Symmetric Modern Balanced Two-Column Multi-Grid Layout */}
        <div className="grid gap-6 lg:grid-cols-3">
          
          {/* Main Left Columns Area (Spans 2 out of 3 sections) */}
          <div className="lg:col-span-2 space-y-6">
            <InventoryTable />
            <InventoryChart />
          </div>

          {/* Right Sidebar Columns Area (Spans 1 out of 3 sections) */}
          <div className="space-y-6">
            <PriorityAlerts />
          </div>

        </div>

      </div>
    </div>
  );
}