import React, { useState } from 'react';
import { OfficerProfile, NavigationPath } from '../types';

interface CaseManagementScreenProps {
  currentOfficer: OfficerProfile;
  onNavigate: (path: NavigationPath) => void;
  onShowToast: (title: string, description?: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
}

export const CaseManagementScreen: React.FC<CaseManagementScreenProps> = ({
  currentOfficer,
  onNavigate,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'compounded' | 'court' | 'pending'>('pending');
  const [filterQuery, setFilterQuery] = useState('');

  const sampleCases = [
    {
      id: 'DOCK-2026-0091',
      title: 'State vs. Nilgiris Supermarket & Mart',
      section: 'Sec 36(1) & Rule 6(1)(e) - Over-stickering',
      district: 'Coimbatore',
      stage: 'Compounding Notice Issued (₹25,000)',
      date: '14-Oct-2026',
      status: 'pending',
    },
    {
      id: 'DOCK-2026-0084',
      title: 'State vs. Apex Consumer Packaged Goods Ltd',
      section: 'Sec 18(1) & PCR Rule 18 - Habitual Offender',
      district: 'Chennai Urban',
      stage: 'CJM Court Summons Issued for Trial',
      date: '02-Oct-2026',
      status: 'court',
    },
    {
      id: 'DOCK-2026-0078',
      title: 'State vs. Sri Krishna Sweets',
      section: 'Rule 24 - Non-deduction of Box Tare Weight',
      district: 'Coimbatore',
      stage: 'Compounding Fee Paid (₹15,000)',
      date: '28-Sep-2026',
      status: 'compounded',
    },
    {
      id: 'DOCK-2026-0071',
      title: 'State vs. Kaveri Agro Refineries',
      section: 'Sec 36 - Short Package Weight (-20g Deficit)',
      district: 'Madurai',
      stage: 'Chief Judicial Magistrate Complaint Lodged',
      date: '22-Sep-2026',
      status: 'court',
    },
  ];

  const filtered = sampleCases.filter((c) => {
    if (activeTab !== 'pending' && c.status !== activeTab) return false;
    return (
      c.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      c.section.toLowerCase().includes(filterQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(filterQuery.toLowerCase())
    );
  });

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="bg-[#0f1f38] text-white rounded-lg p-5 md:p-6 border border-[#7887a5]/40 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest bg-[#a5c5fe] text-[#001b3d] px-2 py-0.5 rounded-xs font-code-num">
            STATUTORY DOCKET & TRIBUNAL REGISTRY
          </span>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight font-display mt-1">
            Case Management & Judicial Register
          </h1>
          <p className="text-xs text-[#d5e3fc] mt-1">
            Tracking compounding challans, court plaints, and recovered revenue under Section 36 & 48
          </p>
        </div>

        <button
          onClick={() => {
            onShowToast('Statutory Plaint Drafted', 'Form VII court complaint template generated.', 'info');
          }}
          className="bg-[#a5c5fe] hover:bg-[#d6e3ff] text-[#001b3d] text-xs font-bold px-3.5 py-2.5 rounded-sm flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-[18px]">gavel</span>
          <span>Draft Court Complaint</span>
        </button>
      </div>

      <div className="bg-white rounded-md border border-[#c5c6ce] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#eceef0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#f7f9fb]">
          <div className="flex bg-[#eceef0] p-0.5 rounded-xs text-xs">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-3 py-1 font-bold rounded-xs ${
                activeTab === 'pending' ? 'bg-white text-[#000616] shadow-xs' : 'text-[#44474d]'
              }`}
            >
              All Dockets (4)
            </button>
            <button
              onClick={() => setActiveTab('compounded')}
              className={`px-3 py-1 font-bold rounded-xs ${
                activeTab === 'compounded' ? 'bg-white text-[#000616] shadow-xs' : 'text-[#44474d]'
              }`}
            >
              Compounded
            </button>
            <button
              onClick={() => setActiveTab('court')}
              className={`px-3 py-1 font-bold rounded-xs ${
                activeTab === 'court' ? 'bg-white text-[#000616] shadow-xs' : 'text-[#44474d]'
              }`}
            >
              CJM Court
            </button>
          </div>

          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search Case Docket..."
            className="bg-white border border-[#c5c6ce] text-xs px-3 py-1.5 rounded-xs text-[#191c1e] w-full sm:w-60"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f2f4f6] text-[#44474d] text-[10px] uppercase font-bold tracking-wider border-b border-[#c5c6ce]">
              <tr>
                <th className="p-3">Docket ID</th>
                <th className="p-3">Case Title & Establishment</th>
                <th className="p-3">Statutory Provisions</th>
                <th className="p-3">District</th>
                <th className="p-3">Judicial Stage</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eceef0]">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-[#f7f9fb]">
                  <td className="p-3 font-code-num font-bold text-[#3f5f92]">{c.id}</td>
                  <td className="p-3">
                    <div className="font-bold text-[#000616]">{c.title}</div>
                    <div className="text-[10px] text-[#75777e] font-code-num">{c.date}</div>
                  </td>
                  <td className="p-3 text-[#44474d]">{c.section}</td>
                  <td className="p-3 font-medium text-[#191c1e]">{c.district}</td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-xs text-[10px] font-bold ${
                        c.status === 'court'
                          ? 'bg-[#ffdad6] text-[#ba1a1a]'
                          : c.status === 'compounded'
                          ? 'bg-emerald-100 text-emerald-900'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {c.stage}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => {
                        onShowToast('Docket Opened', `Loaded evidence records for ${c.id}.`, 'info');
                        onNavigate('inspection-review');
                      }}
                      className="bg-[#0f1f38] hover:bg-[#1a2d48] text-white text-[11px] font-bold px-2.5 py-1 rounded-xs"
                    >
                      Open Case
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
