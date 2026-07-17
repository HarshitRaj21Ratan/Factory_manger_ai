"use client";

import React from "react";
import { 
  Search, 
  Bell, 
  HelpCircle
} from "lucide-react";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeAlertsCount: number;
  onToggleAlertCenter: () => void;
  setActiveTab: (tab: string) => void;
  user?: {
    name: string;
    role: string;
  };
}

export default function Header({ 
  searchQuery, 
  setSearchQuery, 
  activeAlertsCount, 
  onToggleAlertCenter,
  setActiveTab,
  user = {
    name: "Samiksha Sahu",
    role: "Factory Owner"
  }
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-[260px] right-0 h-16 bg-white border-b border-[#c3c6d6] flex justify-between items-center px-6 z-30 w-[calc(100%-260px)] shadow-xs">
      {/* Search Widget */}
      <div className="flex items-center gap-4">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            id="global-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-[#ededf8] border-none rounded-lg text-sm text-[#191b23] focus:ring-2 focus:ring-[#0c56d0]/20 outline-none placeholder:text-gray-500"
            placeholder="Search factory lines, inventory, or alerts..."
            type="text"
          />
        </div>
        
        {/* Core Sections shortcuts */}
        <nav className="hidden md:flex gap-6 ml-8">
          <button 
            id="shortcut-dashboard"
            onClick={() => setActiveTab("dashboard")} 
            className="text-[#003d9b] font-bold border-b-2 border-[#003d9b] pb-1 text-xs tracking-wider uppercase font-sans hover:opacity-80 transition-opacity"
          >
            DASHBOARD
          </button>
          <button 
            id="shortcut-alerts"
            onClick={onToggleAlertCenter} 
            className="text-gray-500 hover:text-[#003d9b] transition-colors text-xs tracking-wider uppercase font-sans flex items-center gap-1.5"
          >
            ALERTS 
            {activeAlertsCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#ba1a1a]" />
            )}
          </button>
          <button 
            id="shortcut-support"
            onClick={() => setActiveTab("settings")} 
            className="text-gray-500 hover:text-[#003d9b] transition-colors text-xs tracking-wider uppercase font-sans"
          >
            SUPPORT
          </button>
        </nav>
      </div>

      {/* Control Tools */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <button 
          id="btn-notifications"
          onClick={onToggleAlertCenter}
          className="p-2 text-gray-500 hover:text-[#003d9b] hover:bg-[#ededf8] rounded-full transition-all relative"
        >
          <Bell className="w-5 h-5" />
          {activeAlertsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#ba1a1a] text-white text-[9px] font-bold flex items-center justify-center rounded-full">
              {activeAlertsCount}
            </span>
          )}
        </button>

        {/* Support Drawer Toggle */}
        <button 
          id="btn-help-center"
          onClick={onToggleAlertCenter}
          className="p-2 text-gray-500 hover:text-[#003d9b] hover:bg-[#ededf8] rounded-full transition-all relative flex items-center gap-1"
          title="Toggle Alert Center"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        <div className="h-8 w-px bg-[#c3c6d6] mx-2"></div>

        {/* User Context */}
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden lg:block">
            <p className="text-xs font-bold text-[#191b23] leading-none uppercase">
              {user.name}
            </p>
            <p className="text-[11px] text-gray-500">
              {user.role}
            </p>
          </div>
          <img
            id="user-avatar"
            alt="User Profile"
            className="w-10 h-10 rounded-full border border-[#c3c6d6] object-cover hover:ring-2 hover:ring-[#003d9b]/20 transition-all cursor-pointer"
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`}
          />
        </div>
      </div>
    </header>
  );
}