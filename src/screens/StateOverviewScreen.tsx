import React, { useState } from 'react';
import { OfficerProfile, NavigationPath, DistrictMetric } from '../types';
import { DISTRICT_METRICS, REPEAT_OFFENDERS } from '../data/mockData';

interface StateOverviewScreenProps {
  currentOfficer: OfficerProfile;
  onNavigate: (path: NavigationPath) => void;
  onShowToast: (title: string, description?: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
}

export const StateOverviewScreen: React.FC<StateOverviewScreenProps> = ({
  currentOfficer,
  onNavigate,
  onShowToast,
}) => {
  const [selectedZone, setSelectedZone] = useState('All');
  const [districtSearch, setDistrictSearch] = useState('');
  const [showDirectiveModal, setShowDirectiveModal] = useState(false);
  const [showDeputationModal, setShowDeputationModal] = useState(false);
  const [selectedOffender, setSelectedOffender] = useState<string | null>(null);

  const filteredDistricts = DISTRICT_METRICS.filter((d) => {
    const matchesZone = selectedZone === 'All' || d.zone === selectedZone;
    const matchesSearch = d.name.toLowerCase().includes(districtSearch.toLowerCase());
    return matchesZone && matchesSearch;
  });

  const handleIssueDirective = () => {
    setShowDirectiveModal(false);
    onShowToast(
      'Apex Statutory Directive Dispatched',
      'Circular issued to all 38 District Assistant Controllers for immediate statewide inspections on dual-MRP edible oils.',
      'success'
    );
  };

  const handleExecuteDeputation = () => {
    setShowDeputationModal(false);
    onShowToast(
      'Cadre Deputation Executed',
      '8 Class-I Inspectors temporarily redeployed to Southern Zone (Tuticorin & Tirunelveli).',
      'info'
    );
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Apex Enforcement Directorate Header */}
      <div className="bg-[#0f1f38] text-white rounded-lg p-5 md:p-6 border border-[#7887a5]/40 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-widest bg-[#a5c5fe] text-[#001b3d] px-2 py-0.5 rounded-xs font-code-num">
                DIRECTORATE APEX COMMAND • 38 DISTRICTS
              </span>
              <span className="text-xs text-[#b8c7e7] font-code-num hidden sm:inline">
                SECRETARIAT, CHENNAI
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight font-display">
              {currentOfficer.role === 'State Controller of Legal Metrology'
                ? currentOfficer.name
                : 'Muthusamy Reddy, IAS, State Controller'}
            </h1>
            <p className="text-xs text-[#d5e3fc] mt-1">
              Apex Statutory Authority for The Legal Metrology Act, 2009 across Tamil Nadu
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                window.print();
                onShowToast('Briefing Generated', 'Cabinet dossier compiled for Hon. Minister.', 'info');
              }}
              className="bg-[#eceef0] hover:bg-white text-[#000616] text-xs font-bold px-3 py-2.5 rounded-sm flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
              <span>Cabinet Briefing</span>
            </button>

            <button
              onClick={() => setShowDirectiveModal(true)}
              className="bg-[#ba1a1a] hover:bg-[#93000a] text-white text-xs font-bold px-3.5 py-2.5 rounded-sm flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">emergency</span>
              <span>State Emergency Directive</span>
            </button>
          </div>
        </div>

        {/* Real-Time Central Node Status */}
        <div className="mt-4 pt-3 border-t border-[#7887a5]/30 flex flex-wrap items-center justify-between gap-2 text-[10px] font-code-num text-[#b8c7e7]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>CENTRAL REPOSITORY: CHENNAI APEX CLOUD (NIC)</span>
            <span>•</span>
            <span>38/38 DISTRICT SERVERS CONNECTED</span>
          </div>
          <div>ANNUAL STATUTORY AUDIT RUNNING</div>
        </div>
      </div>

      {/* 6 Key Macro Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-3.5 rounded-md border border-[#c5c6ce] shadow-xs">
          <div className="text-[10px] uppercase font-bold text-[#75777e]">Total Audits</div>
          <div className="text-xl font-bold text-[#000616] font-display mt-0.5">48,210</div>
          <div className="text-[10px] text-emerald-700 font-bold mt-1">+14.2% YoY</div>
        </div>

        <div className="bg-white p-3.5 rounded-md border border-[#c5c6ce] shadow-xs">
          <div className="text-[10px] uppercase font-bold text-[#75777e]">Violations</div>
          <div className="text-xl font-bold text-[#ba1a1a] font-display mt-0.5">6,420</div>
          <div className="text-[10px] text-[#44474d] mt-1">84.1% Compounded</div>
        </div>

        <div className="bg-white p-3.5 rounded-md border border-[#c5c6ce] shadow-xs">
          <div className="text-[10px] uppercase font-bold text-[#75777e]">Compounding</div>
          <div className="text-xl font-bold text-[#000616] font-display mt-0.5">₹14.82 Cr</div>
          <div className="text-[10px] text-emerald-700 font-bold mt-1">Direct Treasury</div>
        </div>

        <div className="bg-white p-3.5 rounded-md border border-[#c5c6ce] shadow-xs">
          <div className="text-[10px] uppercase font-bold text-[#75777e]">Active Court Cases</div>
          <div className="text-xl font-bold text-[#3f5f92] font-display mt-0.5">412</div>
          <div className="text-[10px] text-[#44474d] mt-1">CJM & Sessions</div>
        </div>

        <div className="bg-white p-3.5 rounded-md border border-[#c5c6ce] shadow-xs">
          <div className="text-[10px] uppercase font-bold text-[#75777e]">Compliance</div>
          <div className="text-xl font-bold text-emerald-700 font-display mt-0.5">86.7%</div>
          <div className="text-[10px] text-[#44474d] mt-1">PCR Rules Score</div>
        </div>

        <div className="bg-white p-3.5 rounded-md border border-[#c5c6ce] shadow-xs">
          <div className="text-[10px] uppercase font-bold text-[#75777e]">Active Personnel</div>
          <div className="text-xl font-bold text-[#000616] font-display mt-0.5">312</div>
          <div className="text-[10px] text-[#44474d] mt-1">Inspectors in Field</div>
        </div>
      </div>

      {/* District-Wise Inspection & Enforcement Matrix Table */}
      <div className="bg-white rounded-md border border-[#c5c6ce] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#eceef0] flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#f7f9fb]">
          <div>
            <h2 className="text-sm font-bold text-[#000616] uppercase tracking-wide flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#3f5f92]">location_city</span>
              <span>District-Wise Inspection & Enforcement Matrix</span>
            </h2>
            <p className="text-xs text-[#44474d] mt-0.5">
              Comprehensive statistical index for all 38 revenue districts in Tamil Nadu
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex bg-[#eceef0] p-0.5 rounded-xs text-xs">
              {['All', 'North Zone', 'West Zone', 'Central Zone', 'South Zone'].map((z) => (
                <button
                  key={z}
                  onClick={() => setSelectedZone(z)}
                  className={`px-2 py-1 rounded-xs font-semibold transition-colors ${
                    selectedZone === z
                      ? 'bg-white text-[#000616] shadow-xs'
                      : 'text-[#44474d] hover:text-[#000616]'
                  }`}
                >
                  {z}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={districtSearch}
              onChange={(e) => setDistrictSearch(e.target.value)}
              placeholder="Search district..."
              className="bg-white border border-[#c5c6ce] text-xs px-2.5 py-1 rounded-xs text-[#191c1e] w-36"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#f2f4f6] text-[#44474d] text-[10px] uppercase font-bold tracking-wider border-b border-[#c5c6ce]">
                <th className="py-2.5 px-4">District</th>
                <th className="py-2.5 px-4">Zone</th>
                <th className="py-2.5 px-4">Inspections</th>
                <th className="py-2.5 px-4">Violations</th>
                <th className="py-2.5 px-4">Violation Rate</th>
                <th className="py-2.5 px-4">Compounding</th>
                <th className="py-2.5 px-4">Backlog</th>
                <th className="py-2.5 px-4 text-right">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eceef0]">
              {filteredDistricts.map((d, i) => (
                <tr key={i} className="hover:bg-[#f7f9fb] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#000616]">{d.name}</td>
                  <td className="py-3 px-4 text-[#44474d]">{d.zone}</td>
                  <td className="py-3 px-4 font-code-num">{d.inspections.toLocaleString()}</td>
                  <td className="py-3 px-4 font-code-num text-[#ba1a1a] font-bold">
                    {d.violations.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-code-num">{d.violationRate}</td>
                  <td className="py-3 px-4 font-code-num font-bold text-emerald-800">
                    {d.compounding}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-xs text-[10px] font-bold ${
                        d.backlog === 'Action Req'
                          ? 'bg-[#ffdad6] text-[#ba1a1a]'
                          : d.backlog === 'Normal'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-emerald-100 text-emerald-900'
                      }`}
                    >
                      {d.backlog}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-bold font-code-num text-xs text-[#000616]">
                      {d.rating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Commodity Defect Rates & Corporate Repeat Offenders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Sector Defect Rates (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-md border border-[#c5c6ce] shadow-xs p-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#eceef0]">
            <div>
              <span className="text-[10px] font-bold text-[#3f5f92] uppercase tracking-wider font-code-num">
                SECTORAL DEFECT INDEX
              </span>
              <h3 className="text-xs font-bold text-[#000616] uppercase">
                Commodity Non-Compliance Ratios
              </h3>
            </div>
            <span className="material-symbols-outlined text-[#3f5f92] text-[20px]">donut_large</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="font-bold text-[#000616]">Imported Packaged Commodities</span>
                <span className="font-code-num text-rose-700 font-bold">31% Non-Compliant</span>
              </div>
              <div className="w-full bg-[#eceef0] h-2 rounded-full overflow-hidden">
                <div className="bg-[#ba1a1a] h-full w-[31%]"></div>
              </div>
              <span className="text-[10px] text-[#75777e] mt-0.5 block">
                Primary fault: Missing Importer Address & Country of Origin
              </span>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="font-bold text-[#000616]">Edible Oils & Vanaspati</span>
                <span className="font-code-num text-amber-700 font-bold">22% Non-Compliant</span>
              </div>
              <div className="w-full bg-[#eceef0] h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[22%]"></div>
              </div>
              <span className="text-[10px] text-[#75777e] mt-0.5 block">
                Primary fault: Dual-layer MRP sticker alteration
              </span>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="font-bold text-[#000616]">Sweetmeats, Bakeries & Tare Weight</span>
                <span className="font-code-num text-amber-700 font-bold">18% Non-Compliant</span>
              </div>
              <div className="w-full bg-[#eceef0] h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full w-[18%]"></div>
              </div>
              <span className="text-[10px] text-[#75777e] mt-0.5 block">
                Primary fault: Cardboard box weight included in net weight
              </span>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="font-bold text-[#000616]">Packaged Drinking Water</span>
                <span className="font-code-num text-emerald-700 font-bold">11% Non-Compliant</span>
              </div>
              <div className="w-full bg-[#eceef0] h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[11%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="font-bold text-[#000616]">Cement & Building Commodities</span>
                <span className="font-code-num text-emerald-700 font-bold">6% Non-Compliant</span>
              </div>
              <div className="w-full bg-[#eceef0] h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full w-[6%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Corporate Repeat Offenders (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-md border border-[#c5c6ce] shadow-xs p-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#eceef0]">
            <div>
              <span className="text-[10px] font-bold text-[#ba1a1a] uppercase tracking-wider font-code-num">
                STATE SPECIAL AUDIT LIST
              </span>
              <h3 className="text-xs font-bold text-[#000616] uppercase">
                Corporate Repeat Offenders Registry
              </h3>
            </div>
            <button
              onClick={() => setShowDeputationModal(true)}
              className="text-[11px] text-[#3f5f92] font-bold hover:underline"
            >
              Reallocate Cadre →
            </button>
          </div>

          <div className="space-y-3">
            {REPEAT_OFFENDERS.map((offender) => (
              <div
                key={offender.id}
                className="p-3 bg-[#f7f9fb] border border-[#c5c6ce] rounded-xs text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-[#ba1a1a] text-white text-[9px] font-bold font-code-num px-1.5 py-0.2 rounded-xs">
                      #{offender.id}
                    </span>
                    <span className="font-bold text-[#000616] text-xs">{offender.name}</span>
                  </div>
                  <div className="text-[11px] text-[#44474d] mt-0.5">{offender.subtitle}</div>
                  <div className="text-[10px] text-[#75777e] mt-1 flex flex-wrap gap-2">
                    <span>
                      Offences: <strong className="text-[#ba1a1a]">{offender.violationsCount} notices</strong> across {offender.districtsCount} districts
                    </span>
                    <span>•</span>
                    <span>Section: <strong>{offender.section}</strong></span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-1">
                  <span className="text-[10px] font-bold text-[#ba1a1a] font-code-num">
                    {offender.statusOrAmount}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedOffender(offender.name);
                      onShowToast(
                        'Enforcement Action Triggered',
                        `State-wide joint seizure order issued for ${offender.name}. All 38 District Controllers notified.`,
                        'warning'
                      );
                    }}
                    className="bg-[#000616] hover:bg-[#0f1f38] text-white text-[10px] font-bold px-2.5 py-1 rounded-xs"
                  >
                    Joint Seizure
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Directive Modal */}
      {showDirectiveModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-md max-w-lg w-full p-6 shadow-2xl border border-[#c5c6ce] animate-toast">
            <div className="flex items-center justify-between pb-3 border-b border-[#eceef0] mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ba1a1a] text-[24px]">
                  emergency
                </span>
                <h3 className="font-bold text-sm text-[#000616] uppercase">
                  Issue State-Wide Statutory Directive
                </h3>
              </div>
              <button
                onClick={() => setShowDirectiveModal(false)}
                className="text-[#75777e] hover:text-[#000616]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-[#44474d]">
                This will trigger an urgent gazette circular broadcast to all <strong>38 District Controllers</strong> and <strong>312 Field Inspectors</strong> across Tamil Nadu.
              </p>

              <div>
                <label className="block font-bold text-[#191c1e] uppercase text-[11px] mb-1">
                  Directive Mandate Subject
                </label>
                <input
                  type="text"
                  defaultValue="SPECIAL DRIVE: 100% AUDIT OF DUAL MRP ON EDIBLE OILS & FLOURS"
                  className="w-full bg-[#f7f9fb] border border-[#c5c6ce] text-xs font-bold p-2 rounded-xs text-[#000616]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#191c1e] uppercase text-[11px] mb-1">
                  Statutory Rule Invoked
                </label>
                <input
                  type="text"
                  defaultValue="Legal Metrology (Packaged Commodities) Rules 2011, Rule 26 & Section 36(1)"
                  className="w-full bg-[#f7f9fb] border border-[#c5c6ce] text-xs p-2 rounded-xs text-[#000616]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  onClick={() => setShowDirectiveModal(false)}
                  className="px-3 py-2 text-xs font-bold text-[#44474d] hover:bg-[#eceef0] rounded-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={handleIssueDirective}
                  className="px-4 py-2 text-xs font-bold bg-[#ba1a1a] text-white rounded-xs hover:bg-[#93000a]"
                >
                  Broadcast Statutory Directive
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cadre Deputation Modal */}
      {showDeputationModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-md max-w-md w-full p-6 shadow-2xl border border-[#c5c6ce] animate-toast">
            <div className="flex items-center justify-between pb-3 border-b border-[#eceef0] mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#3f5f92] text-[24px]">
                  group_add
                </span>
                <h3 className="font-bold text-sm text-[#000616] uppercase">
                  Cadre Reallocation Order
                </h3>
              </div>
              <button
                onClick={() => setShowDeputationModal(false)}
                className="text-[#75777e] hover:text-[#000616]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-[#44474d]">
                Due to compliance backlogs identified in Salem and Southern Zone, reassign 8 Class-I field inspectors from Class A surplus districts:
              </p>
              <div className="bg-[#f2f4f6] p-3 rounded-xs text-xs space-y-1 font-code-num">
                <div>From: Chennai Urban (4), Coimbatore (4)</div>
                <div className="text-[#ba1a1a] font-bold">To: Salem (4), Tuticorin (2), Ramanathapuram (2)</div>
                <div>Duration: 30 Calendar Days</div>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  onClick={() => setShowDeputationModal(false)}
                  className="px-3 py-2 text-xs font-bold text-[#44474d] hover:bg-[#eceef0] rounded-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExecuteDeputation}
                  className="px-4 py-2 text-xs font-bold bg-[#000616] text-white rounded-xs hover:bg-[#0f1f38]"
                >
                  Sign Deputation Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
