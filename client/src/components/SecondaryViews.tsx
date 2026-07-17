"use client";

import React, { useState } from "react";
import { 
  Play, 
  Square, 
  Wrench, 
  Plus, 
  Trash2, 
  Download, 
  FileText, 
  Users, 
  Thermometer, 
  Sparkles,
  Info,
  ShieldCheck,
  AlertOctagon,
  RefreshCw,
  Sliders,
  Settings
} from "lucide-react";
import { Machine, InventoryItem, Worker, FactoryState } from "@/src/types";

// ==========================================
// 1. PRODUCTION FLOW VIEW
// ==========================================
interface ProductionViewProps {
  state: FactoryState;
  onControlMachine: (id: string, status: "optimal" | "offline") => void;
}

export function ProductionView({ state, onControlMachine }: ProductionViewProps) {
  const [activeQueue, setActiveQueue] = useState([
    { id: "ORD-9411", item: "Titanium Bracket C-44", qty: 450, client: "SpaceX Robotics", progress: 85 },
    { id: "ORD-9412", item: "Aluminum Alloy Engine Casing", qty: 200, client: "Boeing Aviation", progress: 40 },
    { id: "ORD-9413", item: "High-Tensile Steel Roller Pins", qty: 1200, client: "Tesla Gigafactory", progress: 10 },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-sans text-gray-900 tracking-tight">Active Production Flow</h2>
        <p className="text-sm text-gray-500">Live assembly flow control, output rates, and scheduled logistics queues</p>
      </div>

      {/* Assembly line interactive flows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-[#c3c6d6] rounded-lg p-5">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600" />
            <span>Industrial Assembly Pipelines</span>
          </h3>

          <div className="space-y-4">
            {state.machines.map((m) => (
              <div key={m.id} className="p-4 bg-[#f3f3fd] rounded-lg border border-[#c3c6d6]/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-950 text-sm font-sans">{m.name}</h4>
                  <p className="text-xs text-gray-500">Sector Line Type: {m.type} | Lead Operator: {m.operator}</p>
                  <p className="text-xs text-gray-600 mt-1 font-data-mono">Throughput Capacity: {m.statusTime}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase tracking-wide mr-2 ${
                    m.status === "optimal" ? "bg-[#8af5be] text-[#00714b]" : "bg-[#ffdad6] text-[#93000a]"
                  }`}>
                    {m.status}
                  </span>

                  {m.status === "offline" ? (
                    <button
                      id={`btn-on-${m.id}`}
                      onClick={() => onControlMachine(m.id, "optimal")}
                      className="p-1 px-3 bg-[#006c47] hover:bg-[#006c47]/90 text-white rounded text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>START</span>
                    </button>
                  ) : (
                    <button
                      id={`btn-off-${m.id}`}
                      onClick={() => onControlMachine(m.id, "offline")}
                      className="p-1 px-3 bg-[#ba1a1a] hover:bg-[#ba1a1a]/90 text-white rounded text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Square className="w-3.5 h-3.5" />
                      <span>STOP</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real Active Client Orders list */}
        <div className="bg-white border border-[#c3c6d6] rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Logistics Order Queue</h3>
            <span className="text-xs bg-[#ededf8] text-[#003d9b] font-semibold px-2 py-0.5 rounded">3 pending batches</span>
          </div>

          <div className="space-y-4">
            {activeQueue.map((oq) => (
              <div key={oq.id} className="p-4 border border-gray-100 rounded-lg hover:border-[#c3c6d6] transition-all">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <span className="text-[10px] font-data-mono text-gray-500">{oq.id} | {oq.client}</span>
                    <h5 className="font-bold text-sm text-gray-900">{oq.item}</h5>
                  </div>
                  <span className="text-xs font-semibold text-gray-700">QTY: {oq.qty}</span>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-gray-500 font-medium">Baking process completion</span>
                    <span className="font-bold text-gray-900">{oq.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#003d9b]" style={{ width: `${oq.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


// ==========================================
// 2. INVENTORY TRACKER VIEW
// ==========================================
interface InventoryViewProps {
  state: FactoryState;
  onRestock: (id: string, amount: number) => void;
}

export function InventoryView({ state, onRestock }: InventoryViewProps) {
  const [selectedItem, setSelectedItem] = useState("I1");
  const [restockAmount, setRestockAmount] = useState(50);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-sans text-gray-900 tracking-tight">Active Stock & Inventory</h2>
        <p className="text-sm text-gray-500">Track industrial material reserves, container volumes, and low threshold limits</p>
      </div>

      {/* Grid inventory statuses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {state.inventory.map((item) => {
          const isLow = item.currentLevel <= item.minThreshold;
          return (
            <div key={item.id} className={`p-5 bg-white border rounded-lg relative overflow-hidden ${
              isLow ? "border-l-4 border-l-[#ba1a1a] border-red-200 bg-red-50/20" : "border-[#c3c6d6]"
            }`}>
              <span className="text-[10px] font-data-mono text-gray-400 block mb-1">SKU Code: {item.id}</span>
              <h4 className="font-bold text-gray-900 text-sm leading-tight mb-2.5">{item.name}</h4>
              
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-2xl font-bold text-gray-900 font-data-mono">{item.currentLevel}</span>
                  <span className="text-xs text-gray-500 font-sans ml-1">{item.unit}</span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-gray-500 block">Min Threshold</span>
                  <span className="text-xs font-bold font-data-mono text-gray-800">{item.minThreshold} {item.unit}</span>
                </div>
              </div>

              {isLow && (
                <div className="mt-4 p-2 bg-[#ffdad6] text-[#93000a] text-xs font-semibold rounded flex items-center gap-1">
                  <AlertOctagon className="w-3.5 h-3.5" />
                  <span>Inventory level low! Reorder dispatcher required.</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Restocking control dispatch */}
      <div className="bg-white border border-[#c3c6d6] rounded-lg p-5 max-w-xl">
        <h3 className="font-bold text-gray-900 mb-4">Dispatcher: Deploy Restocking Cargo</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Select Material Resource</label>
            <select
              id="restock-item-select"
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              className="w-full bg-[#f3f3fd] border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#003d9b]"
            >
              {state.inventory.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} (Current: {item.currentLevel} {item.unit})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Restock Dispatch Quantity</label>
            <input
              id="restock-amount-input"
              type="number"
              value={restockAmount}
              onChange={(e) => setRestockAmount(Math.max(1, Number(e.target.value)))}
              className="w-full bg-[#f3f3fd] border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#003d9b]"
            />
          </div>

          <button
            id="btn-restock-submit"
            onClick={() => {
              onRestock(selectedItem, restockAmount);
              alert("Dispatch cargo request successfully dispatched!");
            }}
            className="w-full bg-[#003d9b] hover:bg-[#003d9b]/90 text-white font-bold text-xs py-2.5 rounded shadow-sm cursor-pointer transition-all uppercase tracking-wider"
          >
            RESTOCK DISPATCH NOW
          </button>
        </div>
      </div>
    </div>
  );
}


// ==========================================
// 3. MACHINES TELEMETRY CONTROL PANEL VIEW
// ==========================================
interface MachinesViewProps {
  state: FactoryState;
  onModifyMachineParameters: (id: string, status: "optimal" | "monitoring" | "critical", temperature: number, vibration: number) => void;
}

export function MachinesView({ state, onModifyMachineParameters }: MachinesViewProps) {
  const [selectedMachineId, setSelectedMachineId] = useState("M01");
  const [simTemp, setSimTemp] = useState(70);
  const [simVibration, setSimVibration] = useState(1.5);

  const handleApplySliders = () => {
    // Dynamically calculate status based on thresholds
    let calcStatus: "optimal" | "monitoring" | "critical" = "optimal";
    if (simTemp >= 95 || simVibration >= 5.0) {
      calcStatus = "critical";
    } else if (simTemp >= 80 || simVibration >= 3.0) {
      calcStatus = "monitoring";
    }

    onModifyMachineParameters(selectedMachineId, calcStatus, simTemp, simVibration);
    alert(`Machine parameters successfully updated! Virtual telemetry state is now labeled: '${calcStatus.toUpperCase()}'`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-sans text-gray-900 tracking-tight">Machines Operational override</h2>
        <p className="text-sm text-gray-500">Fine-tune active temperatures, mechanical vibration meters, and trigger simulated heat limits</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Machines parameter dial lists */}
        <div className="lg:col-span-8 bg-white border border-[#c3c6d6] rounded-lg p-5">
          <h3 className="font-bold text-gray-900 mb-4">Physical Machinery Telemetry Sensors</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {state.machines.map((m) => (
              <div 
                key={m.id} 
                onClick={() => {
                  setSelectedMachineId(m.id);
                  setSimTemp(m.temperature);
                  setSimVibration(m.vibration);
                }}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:bg-gray-50/50 ${
                  selectedMachineId === m.id ? "border-[#003d9b] bg-[#f3f3fd]/40 ring-1 ring-[#003d9b]" : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-[10px] font-data-mono text-gray-400">ID: {m.id}</span>
                    <h5 className="font-bold text-sm text-gray-950 font-sans">{m.name}</h5>
                  </div>
                  <span className={`px-1.5 py-0.5 rounded-xs text-[9px] font-bold uppercase tracking-wider ${
                    m.status === "optimal" ? "bg-[#8af5be] text-[#00714b]" : m.status === "monitoring" ? "bg-[#ffdcc3] text-[#6e3900]" : "bg-[#ffdad6] text-[#93000a]"
                  }`}>
                    {m.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 border-t border-gray-100 pt-3">
                  <div>
                    <span className="text-[10px] text-gray-500 block">Temperature</span>
                    <span className="text-sm font-bold font-data-mono text-gray-900">{m.temperature}°C</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block">Vibration meter</span>
                    <span className="text-sm font-bold font-data-mono text-gray-900">{m.vibration} mm/s</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Override panel controller */}
        <div className="lg:col-span-4 bg-white border border-[#c3c6d6] rounded-lg p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-1.5">
              <Sliders className="w-5 h-5 text-[#003d9b]" />
              <span>Telemetry Calibration Override</span>
            </h3>

            <div className="p-3 bg-[#f3f3fd] rounded border border-blue-100 mb-4">
              <p className="text-[11px] text-gray-700 font-semibold font-sans mb-1">Active target machine:</p>
              <p className="text-xs font-bold text-[#003d9b]">{state.machines.find((m) => m.id === selectedMachineId)?.name || "None Selected"}</p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-700 uppercase mb-1">
                  <span>Temperature Gauge</span>
                  <span className="font-data-mono">{simTemp}°C</span>
                </div>
                <input
                  id="slider-temp"
                  type="range"
                  min={30}
                  max={130}
                  step={1}
                  value={simTemp}
                  onChange={(e) => setSimTemp(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <span className="text-[10px] text-gray-400 block mt-1">Warning limit triggers above 95°C</span>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-gray-700 uppercase mb-1">
                  <span>Vibration Frequency (mm/s)</span>
                  <span className="font-data-mono">{simVibration} mm/s</span>
                </div>
                <input
                  id="slider-vibrations"
                  type="range"
                  min={0.1}
                  max={8.0}
                  step={0.1}
                  value={simVibration}
                  onChange={(e) => setSimVibration(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#6a3600]"
                />
                <span className="text-[10px] text-gray-400 block mt-1">Warning limit triggers above 5.0 mm/s</span>
              </div>
            </div>
          </div>

          <button
            id="btn-apply-parameters"
            onClick={handleApplySliders}
            className="w-full mt-6 bg-[#ba1a1a] hover:bg-red-700 text-white font-bold text-xs py-2.5 rounded shadow-sm transition-all uppercase tracking-wider cursor-pointer"
          >
            APPLY OVERRIDE PARAMETERS
          </button>
        </div>
      </div>
    </div>
  );
}


// ==========================================
// 4. PLANT WORKERS ROSTER VIEW
// ==========================================
export function WorkersView({ state }: { state: FactoryState }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-sans text-gray-900 tracking-tight">Active Shift Supervisors</h2>
        <p className="text-sm text-gray-500">View safety compliance indices, shift assignments, and directory channels</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {state.workers.map((w) => (
          <div key={w.id} className="bg-white border border-[#c3c6d6] rounded-lg p-5 flex gap-4 items-center shadow-xs">
            <img
              alt={w.name}
              className="w-16 h-16 rounded-full border border-gray-300 object-cover shrink-0"
              src={w.avatar}
            />
            
            <div className="flex-1">
              <span className="text-[10px] font-bold text-[#0052cc] uppercase font-sans tracking-wide">{w.role}</span>
              <h4 className="font-bold text-base text-gray-950 font-sans mt-0.5">{w.name}</h4>
              <p className="text-xs text-gray-500">Active Shift: {w.shift}</p>
              <p className="text-xs text-gray-600 font-medium">Assigned Sector: {w.activeLine}</p>

              <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2.5">
                <span className="text-xs text-gray-500">Safety Compliance Quotient</span>
                <span className="text-xs font-bold font-data-mono text-[#006c47]">{w.safetyScore}% Compliance</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// ==========================================
// 5. COMPLIANCE REPORTS ARCHIVE & DOWNLOADS
// ==========================================
export function ReportsView({ 
  onAskGemini 
}: { 
  onAskGemini: (prompt: string) => void 
}) {
  const [selectedReportType, setSelectedReportType] = useState("downtime");
  const [selectedRange, setSelectedRange] = useState("Last 7 Days");
  const [activeGeneratedReport, setActiveGeneratedReport] = useState<any>(null);
  const [loadingReport, setLoadingReport] = useState(false);

  const handleGenerateReport = async () => {
    setLoadingReport(true);
    try {
      const response = await fetch("/api/reports/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportType: selectedReportType, range: selectedRange }),
      });
      const data = await response.json();
      if (data.success) {
        setActiveGeneratedReport(data);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to compile archives.");
    } finally {
      setLoadingReport(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-sans text-gray-900 tracking-tight">Compliance Reports Archive</h2>
        <p className="text-sm text-gray-500">Compile certified physical shift performance summaries and coordinate legal factory audits</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compiler Form */}
        <div className="bg-white border border-[#c3c6d6] rounded-lg p-5">
          <h3 className="font-bold text-gray-900 mb-4">Report Request parameters</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Select Analysis Template</label>
              <select
                id="select-report-type"
                value={selectedReportType}
                onChange={(e) => setSelectedReportType(e.target.value)}
                className="w-full bg-[#f3f3fd] border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#003d9b]"
              >
                <option value="downtime">Downtime & Maintainability Analysis</option>
                <option value="throughput">Raw Assembly Line Output Log</option>
                <option value="safety">Global Site Security & Safety Audit</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Compilation Date Range</label>
              <select
                id="select-report-range"
                value={selectedRange}
                onChange={(e) => setSelectedRange(e.target.value)}
                className="w-full bg-[#f3f3fd] border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#003d9b]"
              >
                <option>Last 24 Hours</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>

            <button
              id="btn-trigger-compile"
              disabled={loadingReport}
              onClick={handleGenerateReport}
              className="w-full bg-[#003d9b] hover:bg-[#003d9b]/90 text-white font-bold text-xs py-2.5 rounded shadow-sm cursor-pointer transition-all uppercase tracking-wider disabled:opacity-50"
            >
              {loadingReport ? "COMPILING FACTORY ARCHIVE..." : "COMPILE CERTIFIED REPORT"}
            </button>
          </div>
        </div>

        {/* Compiled Output View Panel */}
        <div className="lg:col-span-2 bg-white border border-[#c3c6d6] rounded-lg p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Live Printable Analysis Transcript</h3>
            
            {activeGeneratedReport ? (
              <div className="p-4 bg-[#f3f3fd] rounded border border-gray-300 font-mono text-[10.5px] text-gray-800 whitespace-pre scrollbar max-h-[340px] overflow-y-auto">
                {activeGeneratedReport.content}
              </div>
            ) : (
              <div className="p-16 border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-center text-gray-500">
                <FileText className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-sm font-semibold">No report compiled in sandbox memory</p>
                <p className="text-xs max-w-sm mt-1">
                  Adjust parameters in the compilation panel and click generate to populate the secure transcript files.
                </p>
              </div>
            )}
          </div>

          {activeGeneratedReport && (
            <div className="mt-4 pt-3 border-t border-gray-100 flex gap-2">
              <button
                id="btn-print-report"
                onClick={() => alert("Redirecting certified transcript code to physical plant printer...")}
                className="bg-gray-100 border border-gray-300 hover:bg-gray-200 text-gray-800 font-bold text-xs px-4 py-2 rounded shadow-sm transition-all"
              >
                PRINT TRANSCRIPT
              </button>
              
              <button
                id="btn-deep-ai-audit"
                onClick={() => onAskGemini(`Evaluate the following certified factory operational transcript and compile a senior diagnostic roadmap for improvement:\n\n${activeGeneratedReport.content}`)}
                className="bg-[#0052cc] hover:bg-[#0052cc]/95 text-white font-bold text-xs px-4 py-2 rounded shadow-sm transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>AI Deep Audit Report</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// ==========================================
// 6. PLANT PARAMETERS & ADMIN SETTINGS VIEW
// ==========================================
export function SettingsView() {
  const [alarmSystem, setAlarmSystem] = useState(true);
  const [tempThreshold, setTempThreshold] = useState(95);
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-sans text-gray-900 tracking-tight">Plant Parameters & Admin settings</h2>
        <p className="text-sm text-gray-500">Configure global safety alarm thresholds, thermal triggers, and UI dark simulators</p>
      </div>

      <div className="bg-white border border-[#c3c6d6] rounded-lg p-5 max-w-2xl space-y-6">
        <h3 className="font-bold text-gray-950 border-b border-gray-100 pb-3 mb-4">Plant Configuration variables</h3>

        {/* Global alarm sirens */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-gray-900 text-sm block">Global Plant Alarm Sirens</span>
            <span className="text-xs text-gray-500">Deploy immediate audio siren signals down plant areas upon critical breach</span>
          </div>
          <button
            id="toggle-alarm-system"
            onClick={() => setAlarmSystem(!alarmSystem)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              alarmSystem ? "bg-[#006c47] text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {alarmSystem ? "ACTIVE SIRENS" : "MUTED"}
          </button>
        </div>

        {/* Custom thermal thresholds */}
        <div className="space-y-2">
          <div>
            <span className="font-bold text-gray-900 text-sm block">Simulated Thermal Warning Limit</span>
            <span className="text-xs text-gray-500 block">Trigger immediate sensor alerts when Line machines surpass this value</span>
          </div>
          <div className="flex items-center gap-4">
            <input
              id="settings-threshold-input"
              type="number"
              value={tempThreshold}
              onChange={(e) => setTempThreshold(Number(e.target.value))}
              className="bg-[#f3f3fd] border border-gray-300 rounded p-1.5 px-3 text-sm font-data-mono font-bold text-gray-900 w-24 focus:outline-none focus:ring-1 focus:ring-[#003d9b]"
            />
            <span className="text-xs font-semibold text-gray-600">Degrees Celsius (°C)</span>
          </div>
        </div>

        {/* Dark theme demo toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div>
            <span className="font-bold text-gray-900 text-sm block">Corporate Dark Canvas Modality</span>
            <span className="text-xs text-gray-500">Toggle dark workspace styles for low-light operator shifts</span>
          </div>
          <button
            id="toggle-dark-theme"
            onClick={() => {
              setDarkTheme(!darkTheme);
              alert("Modifying visual palettes in UI client context...");
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              darkTheme ? "bg-[#003d9b] text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {darkTheme ? "DARK SHIFT ACTIVE" : "STANDARD LIGHT"}
          </button>
        </div>

        <button
          id="btn-save-settings"
          onClick={() => alert("Global plant parameters saved! Calibrations applied securely across all assembly lines.")}
          className="w-full bg-[#003d9b] hover:bg-[#003d9b]/93 text-white font-bold text-xs py-2.5 rounded shadow-sm transition-all uppercase tracking-wider cursor-pointer mt-4"
        >
          SAVE DISPATCH SETTINGS
        </button>
      </div>
    </div>
  );
}
