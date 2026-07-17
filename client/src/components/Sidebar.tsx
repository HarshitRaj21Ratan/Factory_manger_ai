"use client";

import React from "react";
import { 
  LayoutDashboard, 
  Factory, 
  Package, 
  Cpu, 
  Users, 
  FileText, 
  Settings 
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "production", label: "Production", icon: Factory },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "machines", label: "Machines", icon: Cpu },
    { id: "workers", label: "Workers", icon: Users },
    { id: "reports", label: "Reports", icon: FileText },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-[260px] bg-[#2e3038] border-r border-[#c3c6d6]/20 flex flex-col z-40 text-white">
      {/* Brand Header */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#0052cc] flex items-center justify-center rounded-lg shadow-sm">
          <Factory className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-sans text-lg font-bold text-white leading-tight tracking-tight">Industrial App</h1>
          <p className="text-xs text-gray-300 opacity-80">Smart Factory Control</p>
        </div>
      </div>

      {/* Navigation Options */}
      <nav className="mt-6 flex-1 flex flex-col gap-1 px-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              id={`nav-item-${item.id}`}
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-all text-left w-full ${
                isActive
                  ? "bg-[#003d9b]/20 text-[#dae2ff] border-l-4 border-[#0c56d0]"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <IconComponent className={`w-5 h-5 ${isActive ? "text-[#b2c5ff]" : "text-gray-400"}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer Settings Link */}
      <div className="p-4 border-t border-gray-700/55">
        <button
          id="nav-item-settings"
          onClick={() => setActiveTab("settings")}
          className={`flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-all text-left w-full ${
            activeTab === "settings"
              ? "bg-[#003d9b]/20 text-[#dae2ff] border-l-4 border-[#0c56d0]"
              : "text-gray-300 hover:text-white hover:bg-white/5"
          }`}
        >
          <Settings className="w-5 h-5 text-gray-400" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}
