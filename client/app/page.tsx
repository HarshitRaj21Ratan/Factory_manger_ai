"use client";

import React, { useState, useEffect } from "react";
import { RefreshCw, Sparkles } from "lucide-react";
import Sidebar from "@/src/components/Sidebar";
import Header from "@/src/components/Header";
import AlertCenter from "@/src/components/AlertCenter";
import DashboardView from "@/src/components/DashboardView";
import {
  ProductionView,
  InventoryView,
  MachinesView,
  WorkersView,
  ReportsView,
  SettingsView,
} from "@/src/components/SecondaryViews";
import { FactoryState } from "@/src/types";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [alertCenterOpen, setAlertCenterOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorText, setErrorText] = useState<string | null>(null);

  const [state, setState] = useState<FactoryState | null>(null);

  const [geminiAnswer, setGeminiAnswer] = useState<string | null>(null);
  const [geminiGenerating, setGeminiGenerating] = useState<boolean>(false);

  const fetchState = async () => {
    try {
      const response = await fetch("/api/factory/state");
      if (!response.ok) throw new Error("Could not acquire factory stream from server.");
      const data: FactoryState = await response.json();
      setState(data);
      setErrorText(null);
    } catch (err: unknown) {
      console.error(err);
      setErrorText(
        "Telemetry Stream Offline. The IndustrialOS background service might be starting up; please standby."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchState();
    const ticker = setInterval(fetchState, 5000);
    return () => clearInterval(ticker);
  }, []);

  const handleControlMachine = async (machineId: string, status: "optimal" | "offline") => {
    try {
      const response = await fetch("/api/factory/machine/control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ machineId, status, temperature: status === "offline" ? 32 : 65, vibration: status === "offline" ? 0.0 : 1.2 }),
      });
      const resData = await response.json();
      if (resData.success) fetchState();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssignMaintenance = async (machineId: string, action: string) => {
    try {
      const response = await fetch("/api/factory/maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ machineId, action }),
      });
      const resData = await response.json();
      if (resData.success) {
        fetchState();
        setAlertCenterOpen(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRestock = async (itemId: string, amount: number) => {
    try {
      const response = await fetch("/api/factory/inventory/restock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, amount }),
      });
      const resData = await response.json();
      if (resData.success) fetchState();
    } catch (err) {
      console.error(err);
    }
  };

  const handleModifyMachineParameters = async (
    machineId: string,
    status: "optimal" | "monitoring" | "critical",
    temperature: number,
    vibration: number
  ) => {
    try {
      const response = await fetch("/api/factory/machine/control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ machineId, status, temperature, vibration }),
      });
      const resData = await response.json();
      if (resData.success) fetchState();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDismissAlerts = async () => {
    try {
      const response = await fetch("/api/factory/alerts/dismiss", { method: "POST" });
      const resData = await response.json();
      if (resData.success) fetchState();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAskGemini = async (prompt: string) => {
    setGeminiGenerating(true);
    setGeminiAnswer(null);
    try {
      const response = await fetch("/api/ai/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const resData = await response.json();
      if (response.ok && resData.success) {
        setGeminiAnswer(resData.answer);
      } else {
        setGeminiAnswer(`Gemini Offline: ${resData.error || "Critical AI API transaction error."}`);
      }
    } catch (err: unknown) {
      console.error(err);
      setGeminiAnswer("Transaction error: Failed to reach the server AI core diagnostics proxy.");
    } finally {
      setGeminiGenerating(false);
    }
  };

  const handleSimulateValueFluc = async () => {
    if (!state) return;
    try {
      const randomMachine = state.machines[Math.floor(Math.random() * state.machines.length)];
      const updatedTemp = Math.round(randomMachine.temperature + (Math.random() * 6 - 3));
      const updatedVib = Number((randomMachine.vibration + (Math.random() * 0.4 - 0.2)).toFixed(2));
      let calcStatus: "optimal" | "monitoring" | "critical" = "optimal";
      if (updatedTemp >= 95 || updatedVib >= 5.0) calcStatus = "critical";
      else if (updatedTemp >= 80 || updatedVib >= 3.0) calcStatus = "monitoring";

      const response = await fetch("/api/factory/machine/control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ machineId: randomMachine.id, status: calcStatus, temperature: updatedTemp, vibration: updatedVib }),
      });
      const resData = await response.json();
      if (resData.success) fetchState();
    } catch (err) {
      console.error(err);
    }
  };

  const renderContent = () => {
    if (!state) return null;
    switch (activeTab) {
      case "dashboard":
        return (
          <DashboardView
            searchQuery={searchQuery}
            state={state}
            onAssignMaintenance={handleAssignMaintenance}
            onDismissAlerts={handleDismissAlerts}
            onSimulateValueFluc={handleSimulateValueFluc}
            onAskGemini={handleAskGemini}
            geminiGenerating={geminiGenerating}
            geminiAnswer={geminiAnswer}
          />
        );
      case "production":
        return <ProductionView state={state} onControlMachine={handleControlMachine} />;
      case "inventory":
        return <InventoryView state={state} onRestock={handleRestock} />;
      case "machines":
        return <MachinesView state={state} onModifyMachineParameters={handleModifyMachineParameters} />;
      case "workers":
        return <WorkersView state={state} />;
      case "reports":
        return <ReportsView onAskGemini={handleAskGemini} />;
      case "settings":
        return <SettingsView />;
      default:
        return (
          <div className="p-8 text-center text-gray-500">
            Screen module state invalid or missing.
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-gray-900 overflow-x-hidden antialiased">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeAlertsCount={state?.alerts.length || 0}
        onToggleAlertCenter={() => setAlertCenterOpen(!alertCenterOpen)}
        setActiveTab={setActiveTab}
      />

      <AlertCenter
        isOpen={alertCenterOpen}
        onClose={() => setAlertCenterOpen(false)}
        alerts={state?.alerts || []}
        onAssignMaintenance={handleAssignMaintenance}
        setActiveTab={setActiveTab}
      />

      <main className="ml-[260px] pt-20 p-6 min-h-[calc(100vh-80px)]">
        <div className="max-w-[1400px] mx-auto">
          {loading && (
            <div className="flex flex-col items-center justify-center p-24 text-center">
              <RefreshCw className="w-12 h-12 text-[#003d9b] animate-spin mb-4" />
              <p className="text-sm font-semibold text-gray-800">Booting IndustrialOS Kernel Telemetry...</p>
              <p className="text-xs text-gray-500 mt-1">Acquiring real-time safety limits and sector codes.</p>
            </div>
          )}

          {errorText && !loading && (
            <div className="p-4 mb-6 bg-red-100 border border-red-200 text-red-800 rounded-lg flex items-center gap-3 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping shrink-0" />
              <p className="text-xs font-semibold">{errorText}</p>
              <button
                onClick={fetchState}
                className="ml-auto text-xs bg-red-200 hover:bg-red-300 font-bold px-2.5 py-1 rounded cursor-pointer transition-colors"
              >
                RETRY TRANSACTION
              </button>
            </div>
          )}

          {!loading && state && (
            <div className="animate-fade-in">
              {renderContent()}
            </div>
          )}
        </div>
      </main>

      {state && activeTab !== "dashboard" && (
        <button
          id="btn-quick-floating-copilot"
          onClick={() => {
            setActiveTab("dashboard");
            setTimeout(() => {
              const copilotInput = document.getElementById("copilot-input");
              if (copilotInput) copilotInput.scrollIntoView({ behavior: "smooth" });
            }, 300);
          }}
          className="fixed bottom-6 right-6 p-4 bg-[#0052cc] hover:bg-[#003d9b] text-white rounded-full shadow-lg z-30 flex items-center justify-center cursor-pointer transition-all hover:scale-105 group"
          title="Consult AI Diagnostician"
        >
          <Sparkles className="w-5 h-5 text-white" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 text-xs font-bold leading-none select-none uppercase tracking-wider">
            AI Copilot
          </span>
        </button>
      )}
    </div>
  );
}
