"use client";

import React from "react";
import { 
  X, 
  AlertTriangle, 
  Activity, 
  Cpu, 
  Wrench, 
  History,
  CheckCircle,
  BrainCircuit,
  MessageSquareShare
} from "lucide-react";
import { Alert } from "@/src/types";

interface AlertCenterProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: Alert[];
  onAssignMaintenance: (machineId: string, action: string) => void;
  setActiveTab: (tab: string) => void;
}

export default function AlertCenter({
  isOpen,
  onClose,
  alerts,
  onAssignMaintenance,
  setActiveTab,
}: AlertCenterProps) {
  return (
    <aside
      id="alert-center-drawer"
      className={`fixed right-0 top-0 h-screen w-[340px] bg-[#e7e7f2] border-l border-[#c3c6d6] z-50 flex flex-col shadow-xl transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      {/* Header */}
      <div className="p-4 border-b border-[#c3c6d6] flex items-center justify-between">
        <div>
          <h3 className="font-sans text-lg font-bold text-[#191b23]">Alert Center</h3>
          <p className="text-xs text-gray-500">Live Machine Monitoring</p>
        </div>
        <button
          id="btn-close-drawer"
          onClick={onClose}
          className="p-2 hover:bg-white/50 rounded-full transition-colors text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Alarms and Quick Control Blocks */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {alerts.length === 0 ? (
          <div className="p-6 text-center bg-white rounded-lg border border-dashed border-gray-300 text-gray-500">
            <CheckCircle className="w-8 h-8 mx-auto text-[#006c47] mb-2" />
            <p className="font-semibold text-sm">All Systems Nominal</p>
            <p className="text-xs">No active telemetry breaches flagged.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-[11px] font-bold text-gray-600 uppercase tracking-widest px-1">Active Alerts</p>
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-l-4 shadow-xs ${
                  alert.type === "critical"
                    ? "bg-[#ffdad6] text-[#93000a] border-[#ba1a1a]"
                    : alert.type === "warning"
                    ? "bg-[#ffdcc3] text-[#6e3900] border-[#6a3600]"
                    : "bg-[#dae2ff] text-[#0040a2] border-[#003d9b]"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className={`w-4 h-4 ${alert.type === "critical" ? "text-[#ba1a1a]" : "text-[#6a3600]"}`} />
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    {alert.type === "critical" ? "CRITICAL ALERT" : alert.type.toUpperCase() + " TELEMETRY"}
                  </span>
                  <span className="text-[10px] font-mono opacity-80 ml-auto">{alert.time}</span>
                </div>
                <p className="text-sm font-bold">{alert.title}</p>
                <p className="text-xs opacity-95">{alert.message}</p>
                
                {alert.machineId && alert.type !== "info" && (
                  <button
                    id={`btn-assign-maintenance-${alert.id}`}
                    onClick={() => onAssignMaintenance(alert.machineId!, `Automated repair ticket for critical ${alert.title}`)}
                    className="mt-2.5 text-xs font-bold underline cursor-pointer hover:opacity-80 block"
                  >
                    ASSIGN MAINTENANCE DISPATCH
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Quick Nav block */}
        <div className="space-y-2 pt-2">
          <p className="text-[11px] font-bold text-gray-600 uppercase tracking-widest px-1 mb-2">
            INTELLIGENT NAVIGATOR
          </p>
          
          <button
            id="nav-quick-status"
            onClick={() => { setActiveTab("dashboard"); onClose(); }}
            className="flex items-center gap-3 px-4 py-3 bg-[#8af5be] text-[#00714b] rounded-lg w-full text-left font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <Activity className="w-5 h-5 text-[#006c47]" />
            <span>System Status</span>
          </button>
          
          <button
            id="nav-quick-ai"
            onClick={() => { setActiveTab("dashboard"); onClose(); }}
            className="flex items-center gap-3 px-4 py-3 bg-white hover:bg-gray-100 text-gray-700 rounded-lg w-full text-left border border-gray-300 transition-colors text-sm"
          >
            <BrainCircuit className="w-5 h-5 text-[#0052cc]" />
            <span>AI Diagnostic Engine</span>
          </button>

          <button
            id="nav-quick-machines"
            onClick={() => { setActiveTab("machines"); onClose(); }}
            className="flex items-center gap-3 px-4 py-3 bg-white hover:bg-gray-100 text-gray-700 rounded-lg w-full text-left border border-gray-300 transition-colors text-sm"
          >
            <Wrench className="w-5 h-5 text-[#6a3600]" />
            <span>Operational Override</span>
          </button>

          <button
            id="nav-quick-workers"
            onClick={() => { setActiveTab("workers"); onClose(); }}
            className="flex items-center gap-3 px-4 py-3 bg-white hover:bg-gray-100 text-gray-700 rounded-lg w-full text-left border border-gray-300 transition-colors text-sm"
          >
            <History className="w-5 h-5 text-gray-500" />
            <span>Supervisor Directory</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
