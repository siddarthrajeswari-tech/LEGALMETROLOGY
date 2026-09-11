import React, { useState } from 'react';
import { OfficerProfile, NavigationPath } from '../types';
import { ASSETS } from '../data/mockData';

interface RegionalMonitoringScreenProps {
  currentOfficer: OfficerProfile;
  onNavigate: (path: NavigationPath) => void;
  onShowToast: (title: string, description?: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
}

export const RegionalMonitoringScreen: React.FC<RegionalMonitoringScreenProps> = ({
  currentOfficer,
  onNavigate,
  onShowToast,
}) => {
  const [selectedZone, setSelectedZone] = useState('West Zone');

  const zoneHotspots = [
    { name: 'Coimbatore North (RS Puram)', inspectors: 4, activeSeizures: 2, status: 'Active Audit' },
    { name: 'Gandhipuram Commercial Hub', inspectors: 3, activeSeizures: 1, status: 'In Progress' },
    { name: 'Peelamedu Retail Corridor', inspectors: 2, activeSeizures: 1, status: 'Active Audit' },
    { name: 'Pollachi Agro Mandi', inspectors: 2, activeSeizures: 0, status: 'Clearance' },
  ];

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="bg-[#0f1f38] text-white rounded-lg p-5 md:p-6 border border-[#7887a5]/40 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest bg-[#a5c5fe] text-[#001b3d] px-2 py-0.5 rounded-xs font-code-num">
            REGIONAL GEOGRAPHIC GIS & RADAR
          </span>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight font-display mt-1">
            Regional Telemetry & Live Inspector Tracking
          </h1>
          <p className="text-xs text-[#d5e3fc] mt-1">
            Real-time geofence tracking and risk monitoring across Tamil Nadu enforcement sectors
          </p>
        </div>

        <button
          onClick={() => {
            onShowToast('GPS Ping Dispatched', 'All 312 field units reported heartbeat within 3.2s.', 'info');
          }}
          className="bg-[#a5c5fe] hover:bg-[#d6e3ff] text-[#001b3d] text-xs font-bold px-3.5 py-2.5 rounded-sm flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-[18px]">satellite_alt</span>
          <span>Refresh GPS Telemetry</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main GIS Map Panel (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-md border border-[#c5c6ce] shadow-xs overflow-hidden flex flex-col justify-between">
          <div className="p-3 bg-[#f7f9fb] border-b border-[#eceef0] flex items-center justify-between">
            <div className="font-bold text-xs text-[#000616] uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Live Geographic Radar Map (Coimbatore / West Zone)</span>
            </div>
            <span className="text-[11px] font-code-num text-[#75777e]">GEOFENCE: ENFORCED</span>
          </div>

          <div className="relative bg-[#000616] h-[450px] overflow-hidden flex items-center justify-center">
            <img
              src={ASSETS.jurisdictionMap}
              alt="Tamil Nadu Regional Radar"
              className="w-full h-full object-cover opacity-85"
              referrerPolicy="no-referrer"
            />
            {/* Live radar overlay elements */}
            <div className="absolute top-10 left-16 bg-[#000616]/90 border border-emerald-500/80 p-2 rounded-xs text-[10px] text-emerald-400 font-code-num backdrop-blur-xs flex items-center gap-2 animate-bounce">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>INSP-RAJESH (SECTOR 04)</span>
            </div>

            <div className="absolute bottom-16 right-24 bg-[#000616]/90 border border-amber-500/80 p-2 rounded-xs text-[10px] text-amber-300 font-code-num backdrop-blur-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>INSP-SELVAM (POLLACHI)</span>
            </div>

            <div className="absolute inset-x-4 bottom-4 bg-[#000616]/80 text-white p-2.5 rounded-xs text-[11px] font-code-num flex items-center justify-between backdrop-blur-md border border-white/10">
              <span>LAT: 11.0168° N • LON: 76.9558° E</span>
              <span className="text-emerald-400">STATUS: 4 UNITS ACTIVE IN CURRENT QUADRANT</span>
            </div>
          </div>
        </div>

        {/* Hotspots & Sector List (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-md border border-[#c5c6ce] shadow-xs p-4 space-y-4">
          <div className="border-b border-[#eceef0] pb-2">
            <span className="text-[10px] font-bold text-[#3f5f92] uppercase tracking-wider font-code-num">
              FIELD SECTOR TELEMETRY
            </span>
            <h3 className="text-xs font-bold text-[#000616] uppercase mt-0.5">
              Coimbatore Sub-Divisions
            </h3>
          </div>

          <div className="space-y-3">
            {zoneHotspots.map((spot, i) => (
              <div key={i} className="p-3 bg-[#f7f9fb] border border-[#c5c6ce] rounded-xs text-xs">
                <div className="flex items-center justify-between font-bold text-[#000616]">
                  <span>{spot.name}</span>
                  <span className="text-[10px] font-code-num text-[#3f5f92]">
                    {spot.inspectors} Officers
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px] text-[#44474d]">
                  <span>Active Seizures: {spot.activeSeizures}</span>
                  <span className="text-emerald-700 font-bold">{spot.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#eceef0]">
            <button
              onClick={() => onNavigate('field-inspections')}
              className="w-full bg-[#000616] hover:bg-[#0f1f38] text-white text-xs font-bold py-2.5 rounded-xs transition-colors"
            >
              Deploy Field Inspection at Hotspot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
