'use client';

import { Activity } from 'lucide-react';

export function InventoryChart() {
  const chartData = [35, 52, 28, 65, 42, 80, 95];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
        <div className="flex items-center gap-2 font-semibold text-gray-900 text-sm">
          <Activity className="h-4 w-4 text-blue-500" />
          <span>Velocity Flow Index (Past 7 Days)</span>
        </div>
        <div className="flex gap-0.5 bg-gray-100 p-0.5 rounded-lg text-[11px] font-bold">
          <button className="px-2.5 py-1 bg-white rounded-md shadow-sm text-gray-900">7D</button>
          <button className="px-2.5 py-1 text-gray-400 hover:text-gray-900 transition-colors">30D</button>
        </div>
      </div>

      {/* Main Chart Wrapper Box */}
      <div className="h-44 w-full relative pt-6 flex flex-col justify-between">
        
        {/* Background Grid Accent Rules */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 text-[10px] text-gray-300/60">
          <div className="border-b border-gray-100/70 w-full h-0"></div>
          <div className="border-b border-gray-100/70 w-full h-0"></div>
          <div className="border-b border-gray-100/70 w-full h-0"></div>
        </div>

        {/* Dynamic Canvas Container Area */}
        <div className="relative h-32 w-full flex items-end gap-4 px-2">
          
          {/* HIGH-FIDELITY GRADIENT & BEZIER CURVE VECTOR VECTOR STAGE */}
          <svg 
            viewBox="0 0 700 100" 
            preserveAspectRatio="none" 
            className="absolute inset-x-4 top-0 bottom-0 w-[calc(100%-2rem)] h-full pointer-events-none overflow-visible z-30"
          >
            <defs>
              {/* Premium Area Fill Shader Gradient */}
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* AREA UNDER THE CURVE SHADER OVERLAY */}
            <path
              d="
                M 50,100
                C 100,48 100,48 150,48
                C 200,48 200,72 250,72
                C 300,72 300,35 350,35
                C 400,35 400,58 450,58
                C 500,58 500,20 550,20
                C 600,20 600,5 650,5
                L 650,100 Z
              "
              fill="url(#chartGradient)"
            />

            {/* SLEEK SMOOTH CUBIC BEZIER WAVE PATH WIRE */}
            <path
              d="
                M 50,65
                C 100,48 100,48 150,48
                C 200,48 200,72 250,72
                C 300,72 300,35 350,35
                C 400,35 400,58 450,58
                C 500,58 500,20 550,20
                C 600,20 600,5 650,5
              "
              fill="none"
              stroke="#2563eb"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* HARDWARE DATA JUNCTION GLOW INDICATORS */}
            {[
              {x: 50, y: 65}, {x: 150, y: 48}, {x: 250, y: 72}, 
              {x: 350, y: 35}, {x: 450, y: 58}, {x: 550, y: 20}, {x: 650, y: 5}
            ].map((pt, index) => (
              <circle
                key={index}
                cx={pt.x}
                cy={pt.y}
                r="3.5"
                fill="#ffffff"
                stroke="#2563eb"
                strokeWidth="2"
                className="transition-all duration-200 shadow-md"
              />
            ))}
          </svg>

          {/* Minimalist Glassmorphic Column Blocks */}
          {chartData.map((height, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 z-10 group cursor-pointer h-full justify-end">
              <div 
                className="w-full bg-gradient-to-t from-gray-100/10 via-gray-100/5 to-transparent rounded-t-md h-full relative" 
              >
                {/* Micro hover indicator hairline top divider label */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-transparent group-hover:bg-blue-500/20 transition-colors"></div>
                
                {/* Advanced Popover Micro-interaction Tooltip */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold shadow-xl border border-white/5 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none z-40">
                  <span className="text-gray-400 font-sans font-medium mr-1">{days[idx]}:</span>
                  {(height * 140).toLocaleString()} units
                </div>
              </div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider translate-y-6 absolute">
                {days[idx]}
              </span>
            </div>
          ))}
        </div>

        <div className="h-2"></div>
      </div>
    </div>
  );
}