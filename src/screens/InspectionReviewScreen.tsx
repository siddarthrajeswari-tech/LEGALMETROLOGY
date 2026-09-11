import React, { useState } from 'react';
import { OfficerProfile, NavigationPath, SupervisoryCase } from '../types';
import { SUPERVISORY_CASES, ASSETS } from '../data/mockData';

interface InspectionReviewScreenProps {
  currentOfficer: OfficerProfile;
  onNavigate: (path: NavigationPath) => void;
  onShowToast: (title: string, description?: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
}

export const InspectionReviewScreen: React.FC<InspectionReviewScreenProps> = ({
  currentOfficer,
  onNavigate,
  onShowToast,
}) => {
  const [cases, setCases] = useState<SupervisoryCase[]>(SUPERVISORY_CASES);
  const [selectedCaseId, setSelectedCaseId] = useState<string>('CASE-TN-CBE-2026-0891');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectorFilter, setInspectorFilter] = useState('All');
  const [violationFilter, setViolationFilter] = useState('All');
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [showClarificationModal, setShowClarificationModal] = useState(false);
  const [clarificationText, setClarificationText] = useState(
    'Inspector Rajesh, please procure distributor invoice from Nilgiris Supermarket to determine whether price alteration was performed at retail level or wholesale depot.'
  );

  const activeCase = cases.find((c) => c.id === selectedCaseId) || cases[0];

  const handleToggleCharge1 = () => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === activeCase.id ? { ...c, charge1Confirmed: !c.charge1Confirmed } : c
      )
    );
  };

  const handleToggleCharge2 = () => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === activeCase.id ? { ...c, charge2Confirmed: !c.charge2Confirmed } : c
      )
    );
  };

  const handleApproveCompounding = () => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === activeCase.id ? { ...c, status: 'Approved' } : c
      )
    );
    onShowToast(
      'Compounding Notice Endorsed',
      `Case ${activeCase.code} approved. Form V compounding demand of ₹${activeCase.compoundingAmount.toLocaleString('en-IN')} dispatched to ${activeCase.establishment}.`,
      'success'
    );
  };

  const handleEscalateCourt = () => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === activeCase.id ? { ...c, status: 'Escalated' } : c
      )
    );
    onShowToast(
      'Case Escalated for Judicial Prosecution',
      `Case ${activeCase.code} submitted to Legal Advisor for complaint filing in Chief Judicial Magistrate (CJM) Court.`,
      'warning'
    );
  };

  const handleDismissCase = () => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === activeCase.id ? { ...c, status: 'Rectification' } : c
      )
    );
    onShowToast(
      'Technical Rectification Notice Issued',
      `7-day statutory cure period granted to ${activeCase.establishment} for minor packaging discrepancy.`,
      'info'
    );
  };

  const handleSendClarification = () => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === activeCase.id ? { ...c, status: 'Clarification' } : c
      )
    );
    setShowClarificationModal(false);
    onShowToast(
      'Officer Query Transmitted',
      `Directive dispatched to Inspector ${activeCase.inspectorName} via secure departmental messaging.`,
      'info'
    );
  };

  const handleBatchEndorse = () => {
    setCases((prev) => prev.map((c) => ({ ...c, status: 'Approved' })));
    setShowBatchModal(false);
    onShowToast(
      'Batch Endorsement Executed',
      'All 4 pending supervisory dossiers sealed with Assistant Controller digital token.',
      'success'
    );
  };

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.establishment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.inspectorName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesInspector =
      inspectorFilter === 'All' || c.inspectorName.includes(inspectorFilter);
    const matchesViolation =
      violationFilter === 'All' || c.commoditySummary.includes(violationFilter) || c.rulesCited.join(' ').includes(violationFilter);
    return matchesSearch && matchesInspector && matchesViolation;
  });

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Executive Supervisory Bar */}
      <div className="bg-[#0f1f38] text-white rounded-lg p-5 md:p-6 border border-[#7887a5]/40 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-widest bg-[#a5c5fe] text-[#001b3d] px-2 py-0.5 rounded-xs font-code-num">
                SUPERVISORY TIER-II PORTAL • ADJUDICATION DOCKET
              </span>
              <span className="text-xs text-[#b8c7e7] font-code-num hidden sm:inline">
                STATUTORY WINDOW: Q3-OCT-2026
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight font-display">
              {currentOfficer.role === 'Assistant Controller'
                ? currentOfficer.name
                : 'Dr. Priya Sharma, Assistant Controller'}
            </h1>
            <p className="text-xs text-[#d5e3fc] mt-1">
              Coimbatore District Jurisdiction (North, South, Pollachi & Mettupalayam Taluks)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowBatchModal(true)}
              className="bg-[#a5c5fe] hover:bg-[#d6e3ff] text-[#001b3d] text-xs font-bold px-3.5 py-2.5 rounded-sm flex items-center gap-2 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Batch Endorsements (4)</span>
            </button>

            <button
              onClick={() => onNavigate('state-overview')}
              className="bg-[#112032] hover:bg-[#1a2d48] text-[#d6e3ff] border border-[#7887a5]/40 text-xs font-bold px-3 py-2.5 rounded-sm flex items-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">monitoring</span>
              <span>State Rollup</span>
            </button>
          </div>
        </div>

        {/* Cryptographic Audit Trail Strip */}
        <div className="mt-4 pt-3 border-t border-[#7887a5]/30 flex flex-wrap items-center justify-between gap-2 text-[10px] font-code-num text-[#b8c7e7]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>AUDIT NODE: CBE-CNTRL-DOSS-01</span>
            <span>•</span>
            <span>SPEC: NIC-DLM-AUDIT-v4</span>
          </div>
          <div>
            DIGITAL SEAL: FIPS-140-2 LEVEL 3 • ALL ACTIONS LOGGED FOR GAZETTE RECORD
          </div>
        </div>
      </div>

      {/* 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-md border border-[#c5c6ce] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#44474d] mb-1">
            <span className="font-bold uppercase tracking-wider text-[10px]">Pending Reviews</span>
            <span className="material-symbols-outlined text-amber-600 text-[20px]">pending</span>
          </div>
          <div className="text-2xl font-bold text-[#000616] font-display">12 Cases</div>
          <div className="mt-2 text-[11px] text-amber-700 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
            <span>3 Cases Expiring &lt; 24h</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md border border-[#c5c6ce] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#44474d] mb-1">
            <span className="font-bold uppercase tracking-wider text-[10px]">Approved Enforcement</span>
            <span className="material-symbols-outlined text-emerald-600 text-[20px]">check_circle</span>
          </div>
          <div className="text-2xl font-bold text-[#000616] font-display">68 Cases</div>
          <div className="mt-2 text-[11px] text-emerald-700 font-bold">
            ₹4,20,000 Realized (Compounding)
          </div>
        </div>

        <div className="bg-white p-4 rounded-md border border-[#c5c6ce] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#44474d] mb-1">
            <span className="font-bold uppercase tracking-wider text-[10px]">Clarifications In-Flight</span>
            <span className="material-symbols-outlined text-[#3f5f92] text-[20px]">chat</span>
          </div>
          <div className="text-2xl font-bold text-[#000616] font-display">5 Queries</div>
          <div className="mt-2 text-[11px] text-[#44474d]">
            Awaiting Field Officer Reply
          </div>
        </div>

        <div className="bg-white p-4 rounded-md border border-[#c5c6ce] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#44474d] mb-1">
            <span className="font-bold uppercase tracking-wider text-[10px]">Repeat Violator Alerts</span>
            <span className="material-symbols-outlined text-[#ba1a1a] text-[20px]">warning</span>
          </div>
          <div className="text-2xl font-bold text-[#ba1a1a] font-display">3 Alerts</div>
          <div className="mt-2 text-[11px] text-[#ba1a1a] font-bold">
            Escalation for CJM Prosecution
          </div>
        </div>
      </div>

      {/* Main Review Grid: Left Queue (5 Cols) + Right Dossier (7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Supervisory Review Queue (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-md border border-[#c5c6ce] shadow-xs p-4 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#eceef0]">
              <div>
                <span className="text-[10px] font-bold text-[#3f5f92] uppercase tracking-wider font-code-num">
                  INSPECTORATE SUBMISSIONS
                </span>
                <h2 className="text-sm font-bold text-[#000616] uppercase">
                  Supervisory Review Queue
                </h2>
              </div>
              <span className="text-xs bg-[#eceef0] text-[#000616] font-bold px-2 py-0.5 rounded-xs font-code-num">
                {filteredCases.length} Queued
              </span>
            </div>

            {/* Filter & Search Bar */}
            <div className="space-y-2 mt-3">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-2.5 top-2 text-[#75777e] text-[16px]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Case ID / Premise..."
                  className="w-full bg-[#f7f9fb] border border-[#c5c6ce] text-xs pl-8 pr-3 py-1.5 rounded-xs focus:border-[#3f5f92] focus:outline-hidden text-[#000616]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <select
                  value={inspectorFilter}
                  onChange={(e) => setInspectorFilter(e.target.value)}
                  className="bg-[#f7f9fb] border border-[#c5c6ce] text-xs p-1.5 rounded-xs text-[#000616]"
                >
                  <option value="All">All Inspectors</option>
                  <option value="Rajesh Kumar">Rajesh Kumar (Sector 04)</option>
                  <option value="Selvam">M. Selvam (Pollachi)</option>
                  <option value="Ramanathan">K. Ramanathan (Mettupalayam)</option>
                </select>

                <select
                  value={violationFilter}
                  onChange={(e) => setViolationFilter(e.target.value)}
                  className="bg-[#f7f9fb] border border-[#c5c6ce] text-xs p-1.5 rounded-xs text-[#000616]"
                >
                  <option value="All">All Violations</option>
                  <option value="MRP">MRP Alteration</option>
                  <option value="Deficit">Net Qty Deficit</option>
                  <option value="Rule 6">Rule 6 Omissions</option>
                </select>
              </div>
            </div>

            {/* Queue Cards List */}
            <div className="mt-4 space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
              {filteredCases.map((c) => {
                const isSelected = c.id === selectedCaseId;
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCaseId(c.id)}
                    className={`p-3 rounded-sm border cursor-pointer transition-all text-xs relative ${
                      isSelected
                        ? 'bg-[#0f1f38] text-white border-[#0f1f38] shadow-md ring-2 ring-[#a5c5fe]'
                        : 'bg-white hover:bg-[#f7f9fb] border-[#c5c6ce] text-[#191c1e]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-bold font-code-num text-xs ${isSelected ? 'text-[#a5c5fe]' : 'text-[#3f5f92]'}`}>
                        {c.code}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded-xs uppercase ${
                          c.status === 'Approved'
                            ? 'bg-emerald-200 text-emerald-900'
                            : c.status === 'Escalated'
                            ? 'bg-rose-200 text-rose-900'
                            : c.status === 'Clarification'
                            ? 'bg-blue-200 text-blue-900'
                            : c.tagType === 'critical'
                            ? 'bg-[#ffdad6] text-[#ba1a1a]'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        {c.status !== 'Unprocessed' ? c.status : c.tag}
                      </span>
                    </div>

                    <div className={`font-bold text-xs ${isSelected ? 'text-white' : 'text-[#000616]'}`}>
                      {c.establishment}
                    </div>

                    <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-[#d5e3fc]' : 'text-[#44474d]'}`}>
                      {c.commoditySummary}
                    </div>

                    <div className="mt-2 pt-2 border-t border-current/15 flex items-center justify-between text-[10px]">
                      <span className={isSelected ? 'text-[#b8c7e7]' : 'text-[#75777e]'}>
                        Officer: {c.inspectorName}
                      </span>
                      <span className={`font-bold font-code-num ${isSelected ? 'text-rose-300' : 'text-[#ba1a1a]'}`}>
                        ₹{c.compoundingAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Statutory Review & Endorsement Dossier (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-md border border-[#c5c6ce] shadow-xs p-5 space-y-5">
          {/* Dossier Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#eceef0] gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-code-num text-[#3f5f92]">
                  {activeCase.code}
                </span>
                <span className="bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold px-1.5 py-0.5 rounded-xs uppercase">
                  {activeCase.priority}
                </span>
              </div>
              <h2 className="text-base font-bold text-[#000616] mt-0.5">
                {activeCase.establishment}
              </h2>
              <p className="text-xs text-[#44474d] flex items-center gap-1.5 mt-0.5">
                <span>{activeCase.premise}</span>
                <span>•</span>
                <span>Reporting Officer: <strong>{activeCase.inspectorName}</strong> ({activeCase.inspectorSector})</span>
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] text-[#75777e] uppercase font-bold block">
                Filing Timestamp
              </span>
              <span className="text-xs font-bold text-[#000616] font-code-num">
                {activeCase.submittedTime}
              </span>
            </div>
          </div>

          {/* Photographic Evidence Portfolio */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#44474d] mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">image</span>
                <span>Forensic Photographic Evidence & Specimen Tag</span>
              </span>
              <span className="text-[10px] text-emerald-700 font-bold font-code-num">
                ✓ SHA-256 VALIDATED
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="border border-[#c5c6ce] rounded-xs overflow-hidden bg-black relative group">
                <img
                  src={ASSETS.mrpStickerMacro}
                  alt="MRP Alteration Sticker Macro"
                  className="w-full h-36 object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 inset-x-0 bg-black/80 text-white p-1.5 text-[9px] font-code-num flex items-center justify-between">
                  <span>PHOTO_01_MRP_STICKER.JPG</span>
                  <span className="text-rose-400">OVER-STICKER ₹195</span>
                </div>
              </div>

              <div className="border border-[#c5c6ce] rounded-xs overflow-hidden bg-black relative group">
                <img
                  src={ASSETS.helpdeskMissingMacro}
                  alt="Consumer Helpdesk Missing Phone Macro"
                  className="w-full h-36 object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 inset-x-0 bg-black/80 text-white p-1.5 text-[9px] font-code-num flex items-center justify-between">
                  <span>PHOTO_02_HELPDESK_VOID.JPG</span>
                  <span className="text-amber-400">RULE 6(1)(h) VOID</span>
                </div>
              </div>
            </div>

            {/* Specimen Details Row */}
            <div className="mt-2 bg-[#f7f9fb] p-3 rounded-xs border border-[#c5c6ce] grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-code-num">
              <div>
                <span className="text-[9px] text-[#75777e] uppercase block">Barcode:</span>
                <span className="font-bold text-[#000616]">{activeCase.barcode}</span>
              </div>
              <div>
                <span className="text-[9px] text-[#75777e] uppercase block">Batch No:</span>
                <span className="font-bold text-[#000616]">{activeCase.batchNo}</span>
              </div>
              <div>
                <span className="text-[9px] text-[#75777e] uppercase block">Packed Date:</span>
                <span className="font-bold text-[#000616]">{activeCase.packagedDate}</span>
              </div>
              <div>
                <span className="text-[9px] text-[#75777e] uppercase block">Units Seized:</span>
                <span className="font-bold text-rose-700">{activeCase.seizedUnits} Units</span>
              </div>
            </div>
          </div>

          {/* Supervisory Assessment & Rule Verification */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#44474d] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#3f5f92]">
                gavel
              </span>
              <span>Supervisory Charge Evaluation & Adjudication</span>
            </div>

            {/* Charge 1 */}
            <div className="p-3 bg-[#f7f9fb] border border-[#c5c6ce] rounded-xs text-xs">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-bold text-[#000616]">
                    Charge 1: Rule 6(1)(h) Breach (Omission of Consumer Redressal Telephone)
                  </div>
                  <p className="text-[11px] text-[#44474d] mt-0.5">
                    Inspector established email presence, but absence of domestic toll-free or landline phone number.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleToggleCharge1}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-xs whitespace-nowrap transition-colors ${
                    activeCase.charge1Confirmed
                      ? 'bg-[#0f1f38] text-white'
                      : 'bg-white text-[#75777e] border border-[#c5c6ce]'
                  }`}
                >
                  {activeCase.charge1Confirmed ? 'Charge Confirmed' : 'Charge Dropped'}
                </button>
              </div>
            </div>

            {/* Charge 2 */}
            <div className="p-3 bg-[#ffdad6]/25 border border-[#ba1a1a]/40 rounded-xs text-xs">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-bold text-[#ba1a1a]">
                    Charge 2: Section 36(1) Alteration of MRP (Substantive Offence)
                  </div>
                  <p className="text-[11px] text-[#191c1e] mt-0.5">
                    Unlawful alteration of MRP from ₹178.00 to ₹195.00 (+₹17 markup) without revised gazette declaration.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleToggleCharge2}
                  className={`px-2.5 py-1 text-[10px] font-bold rounded-xs whitespace-nowrap transition-colors ${
                    activeCase.charge2Confirmed
                      ? 'bg-[#ba1a1a] text-white'
                      : 'bg-white text-[#ba1a1a] border border-[#ba1a1a]'
                  }`}
                >
                  {activeCase.charge2Confirmed ? 'Endorse Form V' : 'Contest Finding'}
                </button>
              </div>
            </div>
          </div>

          {/* 4 Statutory Supervisory Decisions */}
          <div className="pt-2 border-t border-[#eceef0]">
            <div className="text-[11px] font-bold text-[#000616] uppercase tracking-wider mb-2">
              Statutory Supervisory Decision (Assistant Controller Power):
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={handleApproveCompounding}
                className="bg-[#0f1f38] hover:bg-[#1a2d48] text-white p-2.5 rounded-xs text-xs font-bold text-left transition-colors flex items-center justify-between"
              >
                <div>
                  <div>Approve Compounding Notice</div>
                  <div className="text-[10px] text-[#a5c5fe] font-normal">
                    Levy ₹{activeCase.compoundingAmount.toLocaleString('en-IN')} (Sec 48)
                  </div>
                </div>
                <span className="material-symbols-outlined text-[18px]">gavel</span>
              </button>

              <button
                onClick={handleEscalateCourt}
                className="bg-[#ba1a1a] hover:bg-[#93000a] text-white p-2.5 rounded-xs text-xs font-bold text-left transition-colors flex items-center justify-between"
              >
                <div>
                  <div>Escalate for Court Prosecution</div>
                  <div className="text-[10px] text-[#ffdad6] font-normal">
                    Forward to CJM Court Complaint
                  </div>
                </div>
                <span className="material-symbols-outlined text-[18px]">balance</span>
              </button>

              <button
                onClick={() => setShowClarificationModal(true)}
                className="bg-[#eceef0] hover:bg-[#e0e3e5] text-[#000616] p-2.5 rounded-xs text-xs font-bold text-left transition-colors flex items-center justify-between border border-[#c5c6ce]"
              >
                <div>
                  <div>Request Officer Clarification</div>
                  <div className="text-[10px] text-[#44474d] font-normal">
                    Query Inspector {activeCase.inspectorName}
                  </div>
                </div>
                <span className="material-symbols-outlined text-[18px]">chat</span>
              </button>

              <button
                onClick={handleDismissCase}
                className="bg-[#eceef0] hover:bg-[#e0e3e5] text-[#000616] p-2.5 rounded-xs text-xs font-bold text-left transition-colors flex items-center justify-between border border-[#c5c6ce]"
              >
                <div>
                  <div>Technical Rectification Notice</div>
                  <div className="text-[10px] text-[#44474d] font-normal">
                    7-Day Statutory Cure Period
                  </div>
                </div>
                <span className="material-symbols-outlined text-[18px]">schedule</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Batch Endorsement Modal */}
      {showBatchModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-md max-w-md w-full p-6 shadow-2xl border border-[#c5c6ce] animate-toast">
            <div className="flex items-center justify-between pb-3 border-b border-[#eceef0] mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#3f5f92] text-[24px]">
                  verified
                </span>
                <h3 className="font-bold text-sm text-[#000616] uppercase">
                  Batch Endorsement Authorization
                </h3>
              </div>
              <button
                onClick={() => setShowBatchModal(false)}
                className="text-[#75777e] hover:text-[#000616]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-[#44474d]">
                You are about to execute a batch cryptographic sign on <strong>4 queued cases</strong> for Coimbatore District. Total compounding penalty being levied:
              </p>
              <div className="p-3 bg-[#0f1f38] text-white rounded-xs flex items-center justify-between font-display">
                <span className="text-xs uppercase text-[#a5c5fe]">Total Compounding Value:</span>
                <span className="text-xl font-bold">₹1,00,000.00</span>
              </div>
              <p className="text-[11px] text-[#75777e]">
                Signed using DSC credentials of Dr. Priya Sharma, Assistant Controller of Legal Metrology.
              </p>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  onClick={() => setShowBatchModal(false)}
                  className="px-3 py-2 text-xs font-bold text-[#44474d] hover:bg-[#eceef0] rounded-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBatchEndorse}
                  className="px-4 py-2 text-xs font-bold bg-[#000616] text-white rounded-xs hover:bg-[#0f1f38]"
                >
                  Confirm Batch Seal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clarification Modal */}
      {showClarificationModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-md max-w-lg w-full p-6 shadow-2xl border border-[#c5c6ce] animate-toast">
            <div className="flex items-center justify-between pb-3 border-b border-[#eceef0] mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#3f5f92] text-[22px]">
                  contact_support
                </span>
                <h3 className="font-bold text-sm text-[#000616] uppercase">
                  Query Field Inspector {activeCase.inspectorName}
                </h3>
              </div>
              <button
                onClick={() => setShowClarificationModal(false)}
                className="text-[#75777e] hover:text-[#000616]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <label className="block font-bold text-[#191c1e] uppercase text-[11px]">
                Supervisory Query & Directive Instructions
              </label>
              <textarea
                rows={4}
                value={clarificationText}
                onChange={(e) => setClarificationText(e.target.value)}
                className="w-full bg-[#f7f9fb] border border-[#c5c6ce] text-xs p-2.5 rounded-xs text-[#000616] focus:border-[#3f5f92] focus:bg-white"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowClarificationModal(false)}
                  className="px-3 py-2 text-xs font-bold text-[#44474d] hover:bg-[#eceef0] rounded-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendClarification}
                  className="px-4 py-2 text-xs font-bold bg-[#000616] text-white rounded-xs hover:bg-[#0f1f38]"
                >
                  Send Query to Field Unit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
