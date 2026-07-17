"use client";

import React, { useState } from "react";
import { 
  TrendingUp, 
  Minus, 
  Clock, 
  TrendingDown, 
  AlertOctagon, 
  Calendar, 
  Download, 
  CheckCircle, 
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Machine, Alert, FactoryState, ProductionTarget } from "@/src/types";

interface DashboardViewProps {
  state: FactoryState;
  onAssignMaintenance: (machineId: string, action: string) => void;
  onDismissAlerts: () => void;
  onSimulateValueFluc: () => void;
  onAskGemini: (prompt: string) => void;
  geminiGenerating: boolean;
  geminiAnswer: string | null;
  searchQuery: string;
}

export default function DashboardView({
  state,
  onAssignMaintenance,
  onDismissAlerts,
  onSimulateValueFluc,
  onAskGemini,
  geminiGenerating,
  geminiAnswer,
  searchQuery,
}: DashboardViewProps) {
  const [selectedReportRange, setSelectedReportRange] = useState("Last 24 Hours");

  const { machines, alerts, inventory, workers, productionTargets, systemAuditNotes } = state;

  // Filter machines based on search query
  const filteredMachines = machines.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.operator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Line chart data for Production Weekly
  const chartData = [
    { name: "MON", Units: 11000, Projection: 10000 },
    { name: "TUE", Units: 12450, Projection: 11500 },
    { name: "WED", Units: 11200, Projection: 12100 },
    { name: "THU", Units: 15100, Projection: 13000 },
    { name: "FRI", Units: 14500, Projection: 14000 },
    { name: "SAT", Units: 19450, Projection: 15500 },
    { name: "SUN", Units: 18200, Projection: 17000 },
  ];

  // Doughnut Chart data for Machine Utilization
  const pieData = [
    { name: "Operational", value: 82, color: "#006c47" },
    { name: "Maintenance", value: 10, color: "#6a3600" },
    { name: "Fault", value: 5, color: "#ba1a1a" },
    { name: "Idle", value: 3, color: "#737685" },
  ];

  // Preset chatbot suggestions
  const presetPrompts = [
    "Compile shift report for Liam and Elena",
    "Analyze Molding Delta-02 thermal breach",
    "Identify materials with critical stock levels",
  ];

  return (
    <div className="space-y-6">
      {/* View Title & Control Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-sans text-gray-900 tracking-tight">Executive Dashboard</h2>
          <p className="text-sm text-gray-500">Real-time performance metrics for Factory Site Alpha-9</p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Simulate telemetries helper */}
          <button
            id="btn-simulate-telemetries"
            onClick={onSimulateValueFluc}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded text-xs font-semibold text-gray-600 cursor-pointer shadow-xs transition-all active:scale-95"
            title="Fluctuate sensors to test real-time update graphs"
          >
            <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Simulate Sensor Fluctuate</span>
          </button>

          {/* Date Picker trigger */}
          <div className="relative">
            <select
              id="report-range"
              value={selectedReportRange}
              onChange={(e) => setSelectedReportRange(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded text-xs font-semibold text-gray-600 px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-[#0c56d0] cursor-pointer shadow-xs"
            >
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
            <Calendar className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>

          <button
            id="btn-quick-export"
            onClick={() => alert("Report compiled! Navigate to the 'Reports' screen in the sidebar to download physical archive archives.")}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#003d9b] hover:bg-[#003d9b]/90 text-white rounded text-xs font-semibold shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Today's Production */}
        <div className="bg-white border border-[#c3c6d6] rounded relative overflow-hidden shadow-xs hover:shadow-sm transition-shadow">
          <div className="absolute left-0 top-0 h-full w-1 bg-[#006c47]"></div>
          <div className="p-4">
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1 font-sans">Today's Production</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold text-gray-900 font-sans tracking-tight">52.4k</h3>
              <span className="text-xs text-[#006c47] font-bold flex items-center gap-0.5 mb-1.5">
                <TrendingUp className="w-3.5 h-3.5" /> +12%
              </span>
            </div>
            
            {/* Sparkline SVG representation */}
            <div className="mt-3 h-10 w-full">
              <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                <path d="M0,35 Q10,30 20,32 T40,22 T60,28 T80,12 T100,20" fill="none" stroke="#006c47" strokeWidth="2" />
                <path d="M0,35 Q10,30 20,32 T40,22 T60,28 T80,12 T100,20 L100,40 L0,40 Z" fill="url(#grad1)" className="opacity-10" />
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#006c47" />
                    <stop offset="100%" stopColor="#006c47" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Card 2: Overall Efficiency */}
        <div className="bg-white border border-[#c3c6d6] rounded relative overflow-hidden shadow-xs hover:shadow-sm transition-shadow">
          <div className="absolute left-0 top-0 h-full w-1 bg-[#003d9b]"></div>
          <div className="p-4">
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1 font-sans">Overall Efficiency</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold text-gray-900 font-sans tracking-tight">94.2%</h3>
              <span className="text-xs text-gray-500 font-bold flex items-center gap-0.5 mb-1.5">
                <Minus className="w-3.5 h-3.5" /> stable
              </span>
            </div>

            {/* Sparkline SVG representation */}
            <div className="mt-3 h-10 w-full">
              <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                <path d="M0,20 Q20,22 40,20 T80,21 T100,20" fill="none" stroke="#003d9b" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 3: Active Machines */}
        <div className="bg-white border border-[#c3c6d6] rounded relative overflow-hidden shadow-xs hover:shadow-sm transition-shadow">
          <div className="absolute left-0 top-0 h-full w-1 bg-[#6a3600]"></div>
          <div className="p-4">
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">Active Machines</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold text-gray-900 font-sans tracking-tight">18/20</h3>
              <span className="text-xs text-[#6a3600] font-bold flex items-center gap-0.5 mb-1.5">
                <Clock className="w-3.5 h-3.5" /> 2 Maint.
              </span>
            </div>

            {/* Sparkline SVG representation */}
            <div className="mt-3 h-10 w-full">
              <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                <path d="M0,32 L15,32 L15,12 L30,12 L30,32 L60,32 L60,12 L85,12 L85,32 L100,32" fill="none" stroke="#6a3600" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card 4: Rejection Rate */}
        <div className="bg-white border border-[#c3c6d6] rounded relative overflow-hidden shadow-xs hover:shadow-sm transition-shadow">
          <div className="absolute left-0 top-0 h-full w-1 bg-[#ba1a1a]"></div>
          <div className="p-4">
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">Rejection Rate</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold text-gray-900 font-sans tracking-tight">1.2%</h3>
              <span className="text-xs text-[#006c47] font-bold flex items-center gap-0.5 mb-1.5">
                <TrendingDown className="w-3.5 h-3.5" /> -0.4%
              </span>
            </div>

            {/* Sparkline SVG representation */}
            <div className="mt-3 h-10 w-full">
              <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                <path d="M0,12 Q25,14 50,25 T75,29 T100,34" fill="none" stroke="#ba1a1a" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Production Trend Line Chart */}
        <div className="lg:col-span-8 bg-white border border-[#c3c6d6] rounded-lg p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-bold text-base text-gray-900 font-sans">Production Trend (Weekly)</h4>
              <p className="text-xs text-gray-500">Comparing actual completed output units vs. project baseline target</p>
            </div>
            
            <div className="flex items-center gap-4 text-xs font-medium text-gray-600">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#003d9b]" />
                <span>Output Units</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-gray-400" />
                <span>Projection</span>
              </div>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ededf8" />
                <XAxis dataKey="name" stroke="#737685" fontSize={11} tickLine={false} />
                <YAxis stroke="#737685" fontSize={11} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="Units" stroke="#003d9b" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="Projection" stroke="#c3c6d6" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Machine Utilization Doughnut Chart */}
        <div className="lg:col-span-4 bg-white border border-[#c3c6d6] rounded-lg p-5 flex flex-col justify-between">
          <h4 className="font-bold text-base text-gray-900 font-sans mb-1">Machine Utilization</h4>
          <p className="text-xs text-gray-500 mb-4">Aggregated active machine telemetry distribution</p>

          <div className="flex flex-col items-center justify-center">
            {/* Recharts PieChart */}
            <div className="h-44 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold font-sans text-gray-900 leading-none">82%</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">ACTIVE</span>
              </div>
            </div>

            {/* List Legend */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 w-full mt-4 border-t border-gray-100 pt-4">
              {pieData.map((p, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-xs" style={{ backgroundColor: p.color }} />
                  <span className="text-xs text-gray-600 font-sans">{p.name} ({p.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Production Lines and Alerts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Production Lines Performance Roster table */}
        <div className="lg:col-span-8 bg-white border border-[#c3c6d6] rounded-lg overflow-hidden flex flex-col justify-between shadow-xs">
          <div className="px-5 py-4 border-b border-[#c3c6d6] bg-[#e7e7f2] flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-700 tracking-wider font-sans uppercase">PRODUCTION LINES PERFORMANCE</span>
            <span className="text-[11px] bg-white border border-gray-300 rounded px-2.5 py-0.5 text-gray-600 font-semibold font-data-mono">
              SECURE TELEMETRY
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#f3f3fd] border-b border-[#c3c6d6]">
                <tr>
                  <th className="px-5 py-3 text-[11px] font-bold text-gray-600 uppercase tracking-widest font-sans">Line Name</th>
                  <th className="px-5 py-3 text-[11px] font-bold text-gray-600 uppercase tracking-widest font-sans text-right">Throughput</th>
                  <th className="px-5 py-3 text-[11px] font-bold text-gray-600 uppercase tracking-widest font-sans text-right">Efficiency</th>
                  <th className="px-5 py-3 text-[11px] font-bold text-gray-600 uppercase tracking-widest font-sans text-center">Status</th>
                  <th className="px-5 py-3 text-[11px] font-bold text-gray-600 uppercase tracking-widest font-sans text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c3c6d6]/40 text-sm font-sans">
                {filteredMachines.map((m) => (
                  <tr key={m.id} className="hover:bg-[#f3f3fd] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-bold text-gray-950 font-sans">{m.name}</div>
                      <div className="text-[11px] text-gray-500 font-data-mono">Code: {m.id} | OP: {m.operator}</div>
                    </td>
                    <td className="px-5 py-3.5 text-right font-data-mono text-gray-900 font-semibold">
                      {m.statusTime}
                    </td>
                    <td className={`px-5 py-3.5 text-right font-data-mono font-bold ${
                      m.status === "optimal" ? "text-[#006c47]" : m.status === "monitoring" ? "text-[#6a3600]" : "text-[#ba1a1a]"
                    }`}>
                      {m.efficiency}%
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span className={`px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase tracking-wide inline-block ${
                        m.status === "optimal"
                          ? "bg-[#8af5be] text-[#00714b]"
                          : m.status === "monitoring"
                          ? "bg-[#ffdcc3] text-[#6e3900]"
                          : m.status === "critical"
                          ? "bg-[#ffdad6] text-[#93000a]"
                          : "bg-gray-200 text-gray-700"
                      }`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <button
                        id={`btn-diagnose-${m.id}`}
                        onClick={() => onAskGemini(`Provide a rapid structural troubleshooting analysis for production line '${m.name}' (${m.id}) running at ${m.temperature}°C, vibration status ${m.vibration} mm/s, and status efficiency ${m.efficiency}%.`)}
                        className="text-xs bg-gray-100 hover:bg-[#ededf8] border border-gray-300 text-gray-700 px-2 py-1 rounded inline-flex items-center gap-1 cursor-pointer transition-colors"
                        title="Draft automated troubleshooting report via Gemini"
                      >
                        <Sparkles className="w-3 h-3 text-[#0052cc]" />
                        <span>AI Diagnose</span>
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredMachines.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-gray-500">
                      No matching lines discovered in plant grid.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Critical Incident Notification Board */}
        <div className="lg:col-span-4 bg-white border border-[#c3c6d6] rounded-lg flex flex-col justify-between shadow-xs">
          <div className="px-5 py-4 border-b border-[#c3c6d6] bg-[#e7e7f2] flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-700 tracking-wider font-sans uppercase">RECENT CRITICAL ALERTS</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] animate-pulse" />
          </div>

          <div className="flex-1 overflow-y-auto max-h-72 p-4 space-y-3.5">
            {alerts.length === 0 ? (
              <div className="py-6 flex flex-col items-center justify-center text-center text-gray-500">
                <ShieldCheck className="w-10 h-10 text-[#006c47] mb-2" />
                <p className="text-sm font-semibold text-gray-900">Safety System nominal</p>
                <p className="text-xs">No unresolved system failures currently logged.</p>
              </div>
            ) : (
              alerts.map((alert) => (
                <div key={alert.id} className="flex gap-3.5 items-start pb-3.5 border-b border-gray-100">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    alert.type === "critical"
                      ? "bg-[#ffdad6]"
                      : alert.type === "warning"
                      ? "bg-[#ffdcc3]"
                      : "bg-[#dae2ff]"
                  }`}>
                    <AlertOctagon className={`w-5 h-5 ${
                      alert.type === "critical"
                        ? "text-[#ba1a1a]"
                        : alert.type === "warning"
                        ? "text-[#6a3600]"
                        : "text-[#003d9b]"
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <p className="text-sm font-bold text-gray-900">{alert.title}</p>
                      <span className="text-[10px] font-data-mono text-gray-500">{alert.time}</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-snug">{alert.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {alerts.length > 0 && (
            <button
              id="btn-dismiss-all"
              onClick={onDismissAlerts}
              className="w-full py-3.5 text-center text-xs font-bold text-gray-600 hover:text-red-700 hover:bg-gray-100 transition-colors border-t border-[#c3c6d6] cursor-pointer"
            >
              DISMISS ALL ALERTS
            </button>
          )}
        </div>
      </div>

      {/* Target Progress Bars Widget */}
      <div className="bg-white border border-[#c3c6d6] rounded-lg p-5 shadow-xs">
        <h4 className="font-bold text-base text-gray-900 font-sans mb-4">Line Performance: Target vs Actual Output</h4>
        <div className="space-y-4">
          {productionTargets.map((pt, index) => {
            const completionPercent = Math.min(100, Math.round((pt.actual / pt.target) * 100));
            return (
              <div key={index}>
                <div className="flex justify-between items-end mb-1">
                  <span className="text-sm font-bold text-gray-800">{pt.line}</span>
                  <span className="text-xs font-data-mono text-gray-500 font-semibold">{pt.actual.toLocaleString()} / {pt.target.toLocaleString()} units ({completionPercent}%)</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-300/40">
                  <div 
                    className={`h-full transition-all duration-1000 ${
                      completionPercent >= 100 
                        ? "bg-[#006c47]" 
                        : completionPercent >= 80 
                        ? "bg-[#003d9b]" 
                        : "bg-[#ba1a1a]"
                    }`} 
                    style={{ width: `${completionPercent}%` }} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Embedded Quick AI Diagnostician Panel */}
      <div className="bg-[#ededf8] border border-[#c3c6d6] rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-[#0052cc]" />
          <h3 className="font-bold text-base text-gray-900 font-sans">Quick AI Factory Copilot</h3>
          <span className="text-[10px] bg-blue-100 text-[#0040a2] font-semibold px-2 py-0.5 rounded-full">Gemini 3.5 Core</span>
        </div>
        <p className="text-xs text-gray-600 mb-4 leading-relaxed">
          Ask our AI factory assistant any question regarding live plant thresholds, equipment anomalies, order backlogs, or safety compliance charts.
        </p>

        {/* Presets */}
        <div className="flex flex-wrap gap-2 mb-4">
          {presetPrompts.map((p, idx) => (
            <button
              id={`preset-prompt-${idx}`}
              key={idx}
              onClick={() => onAskGemini(p)}
              disabled={geminiGenerating}
              className="text-xs bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 px-3 py-1.5 rounded-full cursor-pointer transition-colors disabled:opacity-50 font-medium"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input area */}
        <div className="flex gap-2">
          <input
            id="copilot-input"
            type="text"
            placeholder="Type custom plant diagnostic query (e.g. 'Draft a preventative checklist for Elena at Stamping Gamma-09')..."
            className="flex-1 bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0052cc]"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !geminiGenerating) {
                onAskGemini((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = "";
              }
            }}
          />
          <button
            id="btn-copilot-send"
            disabled={geminiGenerating}
            onClick={() => {
              const inputEl = document.getElementById("copilot-input") as HTMLInputElement;
              if (inputEl && inputEl.value.trim() && !geminiGenerating) {
                onAskGemini(inputEl.value);
                inputEl.value = "";
              }
            }}
            className="bg-[#0052cc] hover:bg-[#0052cc]/90 text-white font-semibold text-xs px-4 py-2 rounded shadow-sm cursor-pointer transition-all disabled:opacity-60 flex items-center gap-1.5"
          >
            {geminiGenerating ? (
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Query AI</span>
            )}
          </button>
        </div>

        {/* Result answer box */}
        {geminiAnswer && (
          <div className="mt-4 p-4 bg-white border border-[#c3c6d6] rounded-lg shadow-xs text-sm max-h-96 overflow-y-auto">
            <h5 className="font-bold text-gray-900 border-b border-gray-100 pb-1.5 mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Diagnostic Answer</span>
            </h5>
            <div className="prose prose-sm text-gray-700 whitespace-pre-wrap font-sans">
              {geminiAnswer}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
