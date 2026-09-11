import React from 'react';
import { OfficerProfile, NavigationPath } from '../types';

interface NotificationsScreenProps {
  currentOfficer: OfficerProfile;
  onNavigate: (path: NavigationPath) => void;
  onShowToast: (title: string, description?: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  currentOfficer,
  onNavigate,
  onShowToast,
}) => {
  const notices = [
    {
      id: 'NOTIF-2024-09',
      title: 'Mandatory Enforcement of Amended PCR Rule 26 (Over-stickering)',
      date: '10-Oct-2026',
      source: 'Ministry of Consumer Affairs, New Delhi',
      body: 'All field officers are instructed to execute unannounced inspection drives across supermarkets to identify secondary price stickers affixed over original MRPs. Section 36(1) prosecution notices must be drafted immediately upon detection.',
      priority: 'CRITICAL',
    },
    {
      id: 'NOTIF-2024-08',
      title: 'Bi-Annual Working Standard Weight Calibration Due',
      date: '05-Oct-2026',
      source: 'Directorate of Legal Metrology, Chennai',
      body: 'Inspectors holding Working Standard Weight sets must present hardware sets to Regional Reference Standard Laboratory (RRSL Bengaluru) prior to 28-Oct-2026.',
      priority: 'HIGH',
    },
    {
      id: 'NOTIF-2024-07',
      title: 'Packaging Tare Weight Deduction Protocol at Sweetmeat Counters',
      date: '24-Sep-2026',
      source: 'Tamil Nadu State Controllerate',
      body: 'Advisory on non-inclusion of thick sweet boxes in gross weighment. Tare weight must be deducted at point of sale under Rule 24.',
      priority: 'NORMAL',
    },
  ];

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="bg-[#0f1f38] text-white rounded-lg p-5 md:p-6 border border-[#7887a5]/40 shadow-md">
        <span className="text-[10px] uppercase font-bold tracking-widest bg-[#a5c5fe] text-[#001b3d] px-2 py-0.5 rounded-xs font-code-num">
          DEPARTMENTAL CIRCULARS & STATUTORY DIRECTIVES
        </span>
        <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight font-display mt-1">
          Gazette Directives & Legal Metrology Bulletins
        </h1>
        <p className="text-xs text-[#d5e3fc] mt-1">
          Official statutory circulars, gazette amendments, and enforcement priorities issued by DOCA & Central Government
        </p>
      </div>

      <div className="space-y-4">
        {notices.map((n) => (
          <div key={n.id} className="bg-white p-5 rounded-md border border-[#c5c6ce] shadow-xs space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-xs font-code-num ${
                    n.priority === 'CRITICAL'
                      ? 'bg-[#ffdad6] text-[#ba1a1a]'
                      : n.priority === 'HIGH'
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-emerald-100 text-emerald-900'
                  }`}
                >
                  {n.priority}
                </span>
                <h3 className="font-bold text-sm text-[#000616]">{n.title}</h3>
              </div>
              <span className="text-xs font-code-num text-[#75777e]">{n.date}</span>
            </div>

            <p className="text-xs text-[#44474d] leading-relaxed">{n.body}</p>

            <div className="pt-2 border-t border-[#eceef0] flex items-center justify-between text-[11px]">
              <span className="text-[#75777e]">Source: {n.source}</span>
              <button
                onClick={() => {
                  onShowToast('Statutory Document Dispatched', `Gazette bulletin ${n.id} downloaded.`, 'info');
                }}
                className="text-[#3f5f92] font-bold hover:underline flex items-center gap-1"
              >
                <span>Download Gazette Order</span>
                <span className="material-symbols-outlined text-[14px]">download</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
