import React, { useState } from 'react';
import { OfficerProfile, NavigationPath } from '../types';
import { OFFICERS, ASSETS } from '../data/mockData';

interface HeaderProps {
  currentOfficer: OfficerProfile;
  onSelectOfficer: (officer: OfficerProfile) => void;
  onNavigate: (path: NavigationPath) => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentOfficer,
  onSelectOfficer,
  onNavigate,
  onLogout,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#f7f9fb] border-b border-[#c5c6ce]/40 px-4 md:px-8 py-2.5 flex items-center justify-between shadow-xs">
      {/* Left Sovereign Branding */}
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-3 text-left focus:outline-hidden hover:opacity-90 transition-opacity"
        >
          <img
            src={ASSETS.emblemLogo}
            alt="Emblem of India"
            className="w-10 h-10 object-contain drop-shadow-xs"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-[#000616] uppercase font-display">
                Legal Metrology Enforcement Wing
              </span>
              <span className="hidden lg:inline-flex items-center gap-1 bg-[#112032] text-[#d5e3fc] text-[10px] font-medium font-code-num px-2 py-0.5 rounded-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                NIC TLS 1.3
              </span>
            </div>
            <p className="text-[11px] text-[#44474d] hidden sm:block">
              Department of Consumer Affairs • Government of India
            </p>
          </div>
        </button>
      </div>

      {/* Right Controls: Quick Switcher, Notification, Profile */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Cadre Role Switcher Badge */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-[#eceef0] hover:bg-[#e0e3e5] text-[#191c1e] text-xs px-2.5 py-1.5 rounded-sm border border-[#c5c6ce]/60 transition-colors"
            title="Switch Cadre / Testing Role"
          >
            <span className="material-symbols-outlined text-[16px] text-[#3f5f92]">
              switch_account
            </span>
            <div className="text-left hidden md:block">
              <div className="text-[10px] uppercase font-semibold text-[#44474d] tracking-wider">
                Cadre Role
              </div>
              <div className="font-semibold text-xs leading-none text-[#000616]">
                {currentOfficer.role}
              </div>
            </div>
            <span className="material-symbols-outlined text-[14px] text-[#75777e]">
              arrow_drop_down
            </span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-xl border border-[#c5c6ce] py-2 z-50 animate-toast">
              <div className="px-3 py-1.5 border-b border-[#e0e3e5] text-[11px] font-bold text-[#44474d] uppercase tracking-wider">
                Switch Officer Profile / Cadre
              </div>
              {Object.values(OFFICERS).map((officer) => (
                <button
                  key={officer.id}
                  onClick={() => {
                    onSelectOfficer(officer);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex flex-col transition-colors ${
                    currentOfficer.id === officer.id
                      ? 'bg-[#d6e3ff]/30 text-[#001b3d] font-semibold border-l-2 border-[#3f5f92]'
                      : 'hover:bg-[#f2f4f6] text-[#191c1e]'
                  }`}
                >
                  <span className="font-bold text-xs">{officer.name}</span>
                  <span className="text-[11px] text-[#44474d]">{officer.role}</span>
                  <span className="text-[10px] text-[#75777e] font-code-num">{officer.badge} • {officer.tier}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Icon */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 text-[#44474d] hover:text-[#000616] hover:bg-[#e0e3e5] rounded-sm transition-colors relative"
            aria-label="Statutory Directives and Alerts"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ba1a1a] rounded-full ring-2 ring-white"></span>
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-xl border border-[#c5c6ce] py-2 z-50 animate-toast">
              <div className="px-3 py-1.5 border-b border-[#e0e3e5] flex items-center justify-between">
                <span className="text-xs font-bold text-[#000616] uppercase tracking-wide">
                  Statutory Directives (3)
                </span>
                <span className="text-[10px] bg-[#ffdad6] text-[#93000a] font-bold px-1.5 py-0.5 rounded-sm">
                  Active
                </span>
              </div>
              <div className="divide-y divide-[#eceef0] max-h-72 overflow-y-auto">
                <div className="p-3 hover:bg-[#f7f9fb] text-xs">
                  <div className="flex items-center gap-1.5 text-[#ba1a1a] font-bold text-[11px] mb-1">
                    <span className="material-symbols-outlined text-[14px]">warning</span>
                    CRITICAL GAZETTE CIRCULAR
                  </div>
                  <p className="text-[#191c1e] text-[11px] leading-relaxed">
                    Mandatory dual-MRP sticker prosecution drive launched pursuant to Rule 26 of Packaged Commodities Rules 2011.
                  </p>
                  <span className="text-[10px] text-[#75777e] font-code-num mt-1 block">Ref: DOCA/LMO/2026/09</span>
                </div>
                <div className="p-3 hover:bg-[#f7f9fb] text-xs">
                  <div className="flex items-center gap-1.5 text-[#3f5f92] font-bold text-[11px] mb-1">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    CALIBRATION STANDARD DUE
                  </div>
                  <p className="text-[#191c1e] text-[11px] leading-relaxed">
                    Coimbatore North standard working weight sets due for bi-annual verification on 28-Oct-2026.
                  </p>
                </div>
              </div>
              <div className="px-3 py-1.5 border-t border-[#e0e3e5] bg-[#f7f9fb] text-center">
                <button
                  onClick={() => {
                    setNotifOpen(false);
                    onNavigate('notifications');
                  }}
                  className="text-[11px] text-[#3f5f92] font-bold hover:underline"
                >
                  View All Gazette Directives →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Officer Avatar & Session info */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#c5c6ce]/60">
          <div className="w-8 h-8 rounded-full bg-[#0f1f38] text-[#ffffff] font-bold text-xs flex items-center justify-center border border-[#7887a5]">
            {currentOfficer.name.substring(0, 2).toUpperCase()}
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-bold text-[#000616] leading-tight">
              {currentOfficer.name}
            </div>
            <div className="text-[10px] text-[#75777e] font-code-num flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {currentOfficer.badge}
            </div>
          </div>
          <button
            onClick={onLogout}
            className="p-1.5 text-[#75777e] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/40 rounded-sm transition-colors ml-1"
            title="Terminate Session / Logout"
            aria-label="Logout"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
