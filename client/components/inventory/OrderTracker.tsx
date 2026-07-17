'use client';

import { useState } from 'react';
import { Package, Truck, CheckCircle2, AlertCircle, RefreshCw, X, Check, ChevronDown, Search, Inbox } from 'lucide-react';

interface TransitOrder {
  id: string;
  name: string;
  sku: string;
  quantityOrdered: number;
  supplier: string;
  status: 'Packed' | 'Shipped' | 'In Transit' | 'Delivered';
  category?: string;
}

interface OrderTrackerProps {
  orders: TransitOrder[];
  onReceive: (orderId: string, acceptedQty: number) => void;
}

export function OrderTracker({ orders, onReceive }: OrderTrackerProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeActiveAuditId, setActiveAuditId] = useState<string | null>(null);
  const [intakeQty, setIntakeQty] = useState<string>('');
  
  // Advanced Transit Filter States (Defaulting category filter to 'None' initial state)
  const [transitSearch, setTransitSearch] = useState('');
  const [transitCategory, setTransitCategory] = useState('None');

  const handleStartAudit = (order: TransitOrder) => {
    setActiveAuditId(order.id);
    const qty = order.quantityOrdered !== undefined && order.quantityOrdered !== null 
      ? order.quantityOrdered.toString() 
      : '0';
    setIntakeQty(qty);
  };

  const handleCommitAudit = (order: TransitOrder) => {
    const acceptedQty = Number(intakeQty);
    if (isNaN(acceptedQty) || acceptedQty < 0) {
      alert('Please enter a valid positive quantity.');
      return;
    }
    onReceive(order.id, acceptedQty);
    setActiveAuditId(null);
    setIntakeQty('');
  };

  // Derive categories dynamically from active orders
  const categories = [...new Set(orders.map(o => o.category || 'Mechanical'))];

  // Apply filtering logic
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.name.toLowerCase().includes(transitSearch.toLowerCase()) || 
                          order.sku.toLowerCase().includes(transitSearch.toLowerCase());
    
    // If category filter is 'All', match everything. If it's a specific category, match that.
    const matchesCategory = transitCategory === 'All' || (order.category || 'Mechanical') === transitCategory;
    
    return matchesSearch && matchesCategory;
  });

  // User intent condition check: list displays only if a search query exists or a category tab is pressed
  const isSearchingOrFiltering = transitSearch.trim() !== '' || transitCategory !== 'None';

  return (
    <div className="rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all">
      {/* Clickable Accordion Header */}
      <button 
        onClick={() => {
          setIsDropdownOpen(!isDropdownOpen);
          // Auto reset parameters to hidden baseline state when closing panel
          if (isDropdownOpen) {
            setTransitSearch('');
            setTransitCategory('None');
          }
        }}
        className="w-full flex items-center justify-between p-5 font-bold text-gray-900 text-sm focus:outline-none"
      >
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-blue-500" />
          <span>Supply Chain Pipeline (In Transit Logistics)</span>
          {orders.length > 0 && (
            <span className="ml-1 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full tabular-nums font-extrabold shadow-sm">
              {orders.length} ACTIVE
            </span>
          )}
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-gray-900' : ''}`} />
      </button>

      {/* Expandable Content Panel */}
      {isDropdownOpen && (
        <div className="px-5 pb-5 pt-3 border-t border-gray-100/60 space-y-4 animate-fadeIn">
          
          {/* CONTROL MATRIX ROW */}
          <div className="flex flex-col sm:flex-row gap-2 justify-between items-center bg-gray-50/50 p-2 rounded-xl border border-gray-100">
            <div className="relative w-full sm:w-60">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Type material name or SKU..."
                value={transitSearch}
                onChange={(e) => setTransitSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 shadow-sm"
              />
            </div>
            <div className="flex gap-1 overflow-x-auto w-full sm:w-auto justify-end">
              <button
                onClick={() => setTransitCategory('All')}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all ${
                  transitCategory === 'All' ? 'bg-gray-900 text-white shadow-sm' : 'bg-white text-gray-500 border border-gray-200 hover:text-gray-900'
                }`}
              >
                View All
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setTransitCategory(cat)}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all ${
                    transitCategory === cat 
                      ? 'bg-gray-900 text-white shadow-sm' 
                      : 'bg-white text-gray-500 border border-gray-200 hover:text-gray-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* RENDERING GATEWAY CONDITIONAL SWITCH */}
          {!isSearchingOrFiltering ? (
            <div className="flex flex-col items-center justify-center py-8 text-center text-gray-400 gap-1 animate-fadeIn">
              <Inbox className="h-5 w-5 text-gray-300" />
              <p className="text-xs font-semibold text-gray-500">Pipeline isolation filter active</p>
              <p className="text-[10px] text-gray-400/80 max-w-[250px]">Select a category tab above or type a search string query to preview corresponding transit assets.</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <p className="text-xs text-gray-400 py-4 font-medium text-center">
              No matching pipeline shipments found inside current search bounds.
            </p>
          ) : (
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1 animate-fadeIn">
              {filteredOrders.map((order) => (
                <div key={order.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50/40 space-y-3 shadow-sm transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{order.name}</h4>
                      <p className="text-[11px] text-gray-400 font-mono font-medium">SKU: {order.sku} • Vendor: {order.supplier}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md border border-blue-100 tabular-nums">
                        Qty: {order.quantityOrdered}
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="grid grid-cols-4 gap-1 pt-1">
                    {[
                      { label: 'Packed', icon: Package, done: true },
                      { label: 'Shipped', icon: Truck, done: ['Shipped', 'In Transit', 'Delivered'].includes(order.status) },
                      { label: 'In Transit', icon: RefreshCw, done: ['In Transit', 'Delivered'].includes(order.status) },
                      { label: 'Delivered', icon: CheckCircle2, done: order.status === 'Delivered' }
                    ].map((step, sIdx) => {
                      const StepIcon = step.icon;
                      return (
                        <div key={sIdx} className="flex flex-col items-center text-center gap-1">
                          <div className={`p-1.5 rounded-md border transition-colors ${step.done ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-300 border-gray-100'}`}>
                            <StepIcon className={`h-3 w-3 ${step.label === 'In Transit' && order.status === 'In Transit' ? 'animate-spin' : ''}`} />
                          </div>
                          <span className={`text-[9px] font-bold ${step.done ? 'text-gray-900' : 'text-gray-300'}`}>{step.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  {activeActiveAuditId === order.id ? (
                    <div className="mt-3 p-3 rounded-lg border border-amber-200 bg-amber-50/40 space-y-3 animate-fadeIn">
                      <div className="flex justify-between items-center text-xs text-amber-800 font-bold">
                        <span className="flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> Quality Assurance Count</span>
                        <span>Verify Undamaged Units</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="number" min="0" max={order.quantityOrdered} value={intakeQty} onChange={(e) => setIntakeQty(e.target.value)} className="w-full px-3 py-1.5 border border-amber-200 rounded-lg text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white text-gray-900" />
                        <button onClick={() => setActiveAuditId(null)} className="p-2 border border-gray-200 rounded-lg hover:bg-gray-100 text-gray-500 bg-white"><X className="h-4 w-4" /></button>
                        <button onClick={() => handleCommitAudit(order)} className="p-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-bold shadow-sm"><Check className="h-4 w-4" /></button>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-2 flex justify-between items-center border-t border-gray-100 text-xs">
                      <span className="text-gray-400 font-medium inline-flex items-center gap-1"><AlertCircle className="h-3 w-3 text-amber-500" /> Check for physical variance</span>
                      <button onClick={() => handleStartAudit(order)} className="px-3 py-1 bg-gray-900 text-white font-bold rounded-lg text-[11px] hover:bg-gray-800 transition-colors shadow-sm">Intake QA Check</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}