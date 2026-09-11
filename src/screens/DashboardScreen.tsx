import React, { useState } from 'react';
import { OfficerProfile, NavigationPath, FieldInspectionTask } from '../types';
import { INITIAL_INSPECTIONS, ASSETS } from '../data/mockData';

interface DashboardScreenProps {
  currentOfficer: OfficerProfile;
  onNavigate: (path: NavigationPath) => void;
  onShowToast: (title: string, description?: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  onStartSpecificInspection?: (task: FieldInspectionTask) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  currentOfficer,
  onNavigate,
  onShowToast,
  onStartSpecificInspection,
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'high' | 'progress' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [scannerModalOpen, setScannerModalOpen] = useState(false);
  const [barcodeInput, setBarcodeInput] = useState('8901030889210');
  const [seizureModalOpen, setSeizureModalOpen] = useState(false);
  const [inspectionsList] = useState<FieldInspectionTask[]>(INITIAL_INSPECTIONS);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      onShowToast(
        'Offline Cache Synchronized',
        'Uploaded 14 evidentiary bundles and synchronized with Tamil Nadu Central Registry node CBE-01.',
        'success'
      );
    }, 1200);
  };

  const handleBarcodeLookup = () => {
    setScannerModalOpen(false);
    onShowToast(
      'Commodity Recognized via Barcode',
      `GS1 Barcode ${barcodeInput}: Fortified Sunflower Oil 1L Pouch (Packer: Kaveri Agro Refineries). Navigating to OCR Audit.`,
      'info'
    );
    onNavigate('field-inspections');
  };

  const filteredTasks = inspectionsList.filter((task) => {
    const matchesSearch =
      task.establishment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.targetCommodity.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterTab === 'high') return task.priority === 'CRITICAL' || task.priority === 'HIGH';
    if (filterTab === 'progress') return task.status === 'In Progress' || task.status === 'Violation';
    if (filterTab === 'completed') return task.status === 'Submitted';
    return true;
  });

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Officer Command & Field Status Banner */}
      <div className="bg-[#0f1f38] text-white rounded-lg p-5 md:p-6 border border-[#7887a5]/40 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-widest bg-[#a5c5fe] text-[#001b3d] px-2 py-0.5 rounded-xs font-code-num">
                FIELD ROSTER • ACTIVE ENFORCEMENT SHIFT
              </span>
              <span className="text-xs text-[#b8c7e7] font-code-num hidden sm:inline">
                SESSION ID: TN-SEC-{Math.floor(100000 + Math.random() * 900000)}
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight font-display">
              {currentOfficer.name}
            </h1>
            <p className="text-xs text-[#d5e3fc] mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>Jurisdiction: <strong>{currentOfficer.jurisdiction}</strong></span>
              <span>•</span>
              <span>Hardware: <strong>FIPS-140-2 Encrypted</strong></span>
              <span>•</span>
              <span className="text-emerald-400 flex items-center gap-1 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                GPS Geofence Verified (11.0168° N, 76.9558° E)
              </span>
            </p>
          </div>

          {/* Quick Triggers */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onNavigate('field-inspections')}
              className="bg-[#a5c5fe] hover:bg-[#d6e3ff] text-[#001b3d] text-xs font-bold px-3.5 py-2.5 rounded-sm flex items-center gap-2 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Start Field Inspection</span>
            </button>

            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="bg-[#112032] hover:bg-[#1a2d48] text-[#d6e3ff] border border-[#7887a5]/40 text-xs font-bold px-3 py-2.5 rounded-sm flex items-center gap-2 transition-colors"
              title="Upload cached offline seizures & reports"
            >
              <span className={`material-symbols-outlined text-[18px] ${isSyncing ? 'animate-spin' : ''}`}>
                sync
              </span>
              <span>{isSyncing ? 'Syncing...' : 'Sync Offline (14)'}</span>
            </button>

            <button
              onClick={() => setScannerModalOpen(true)}
              className="bg-[#112032] hover:bg-[#1a2d48] text-[#d6e3ff] border border-[#7887a5]/40 text-xs font-bold px-3 py-2.5 rounded-sm flex items-center gap-2 transition-colors"
              title="Barcode Scanner"
            >
              <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
              <span>Scan Barcode</span>
            </button>

            <button
              onClick={() => setSeizureModalOpen(true)}
              className="bg-[#112032] hover:bg-[#1a2d48] text-[#ffdad6] border border-[#ffdad6]/30 text-xs font-bold px-3 py-2.5 rounded-sm flex items-center gap-2 transition-colors"
              title="Seizure Register"
            >
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              <span>Seizures</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-4 rounded-md border border-[#c5c6ce] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#44474d] mb-1">
            <span className="font-bold uppercase tracking-wider text-[10px]">Today's Field Queue</span>
            <span className="material-symbols-outlined text-[#3f5f92] text-[20px]">assignment</span>
          </div>
          <div className="text-2xl font-bold text-[#000616] font-display">8 Sites</div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-[#44474d]">
            <span>3 Completed</span>
            <span className="text-amber-700 font-bold">5 Pending</span>
          </div>
          <div className="w-full bg-[#eceef0] h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-[#3f5f92] h-full w-[37.5%]"></div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-4 rounded-md border border-[#c5c6ce] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#44474d] mb-1">
            <span className="font-bold uppercase tracking-wider text-[10px]">High Urgency Audits</span>
            <span className="material-symbols-outlined text-[#ba1a1a] text-[20px]">priority_high</span>
          </div>
          <div className="text-2xl font-bold text-[#ba1a1a] font-display">4 Targets</div>
          <div className="mt-2 text-[11px] text-[#44474d]">
            Consumer Complaints via NCH Portal
          </div>
          <div className="w-full bg-[#eceef0] h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-[#ba1a1a] h-full w-[65%]"></div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-4 rounded-md border border-[#c5c6ce] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#44474d] mb-1">
            <span className="font-bold uppercase tracking-wider text-[10px]">Violations Flagged</span>
            <span className="material-symbols-outlined text-[#ba1a1a] text-[20px]">warning</span>
          </div>
          <div className="text-2xl font-bold text-[#000616] font-display">14 Cases</div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-[#44474d]">
            <span>7 Compounding</span>
            <span className="text-[#3f5f92] font-semibold">2 Formal Memos</span>
          </div>
          <div className="w-full bg-[#eceef0] h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-amber-500 h-full w-[80%]"></div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-4 rounded-md border border-[#c5c6ce] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#44474d] mb-1">
            <span className="font-bold uppercase tracking-wider text-[10px]">Pending Form Submissions</span>
            <span className="material-symbols-outlined text-[#75777e] text-[20px]">pending_actions</span>
          </div>
          <div className="text-2xl font-bold text-[#000616] font-display">2 Drafts</div>
          <div className="mt-2 text-[11px] text-[#44474d]">
            Awaiting Digital Signature & Seal
          </div>
          <div className="w-full bg-[#eceef0] h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-emerald-600 h-full w-[40%]"></div>
          </div>
        </div>
      </div>

      {/* 6 Quick Actions Tiles */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-[#44474d] mb-3 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-[#3f5f92]">flash_on</span>
          <span>Tactical Field Workflows</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            onClick={() => onNavigate('field-inspections')}
            className="bg-white hover:bg-[#f2f4f6] p-3.5 rounded-sm border border-[#c5c6ce] text-left transition-all hover:border-[#3f5f92] group flex flex-col justify-between"
          >
            <span className="material-symbols-outlined text-[#3f5f92] text-[24px] mb-2 group-hover:scale-110 transition-transform">
              add_task
            </span>
            <div>
              <div className="font-bold text-xs text-[#000616]">New Inspection</div>
              <div className="text-[10px] text-[#75777e] mt-0.5">Form IV Wizard</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('field-inspections')}
            className="bg-white hover:bg-[#f2f4f6] p-3.5 rounded-sm border border-[#c5c6ce] text-left transition-all hover:border-[#3f5f92] group flex flex-col justify-between"
          >
            <span className="material-symbols-outlined text-[#3f5f92] text-[24px] mb-2 group-hover:scale-110 transition-transform">
              document_scanner
            </span>
            <div>
              <div className="font-bold text-xs text-[#000616]">AI Label OCR</div>
              <div className="text-[10px] text-[#75777e] mt-0.5">Rule 6 & 12 Engine</div>
            </div>
          </button>

          <button
            onClick={() => {
              onShowToast('Evidence Camera Ready', 'Forensic camera hardware initialized with EXIF GPS lock.', 'info');
              onNavigate('field-inspections');
            }}
            className="bg-white hover:bg-[#f2f4f6] p-3.5 rounded-sm border border-[#c5c6ce] text-left transition-all hover:border-[#3f5f92] group flex flex-col justify-between"
          >
            <span className="material-symbols-outlined text-[#3f5f92] text-[24px] mb-2 group-hover:scale-110 transition-transform">
              photo_camera
            </span>
            <div>
              <div className="font-bold text-xs text-[#000616]">Evidence Photo</div>
              <div className="text-[10px] text-[#75777e] mt-0.5">SHA-256 Hash Tag</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('inspection-review')}
            className="bg-white hover:bg-[#f2f4f6] p-3.5 rounded-sm border border-[#c5c6ce] text-left transition-all hover:border-[#3f5f92] group flex flex-col justify-between"
          >
            <span className="material-symbols-outlined text-[#3f5f92] text-[24px] mb-2 group-hover:scale-110 transition-transform">
              history_edu
            </span>
            <div>
              <div className="font-bold text-xs text-[#000616]">Review Dossier</div>
              <div className="text-[10px] text-[#75777e] mt-0.5">Supervisory Queue</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('product-verification')}
            className="bg-white hover:bg-[#f2f4f6] p-3.5 rounded-sm border border-[#c5c6ce] text-left transition-all hover:border-[#3f5f92] group flex flex-col justify-between"
          >
            <span className="material-symbols-outlined text-[#3f5f92] text-[24px] mb-2 group-hover:scale-110 transition-transform">
              calculate
            </span>
            <div>
              <div className="font-bold text-xs text-[#000616]">MPE Calculator</div>
              <div className="text-[10px] text-[#75777e] mt-0.5">Sixth Schedule MPE</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('state-overview')}
            className="bg-white hover:bg-[#f2f4f6] p-3.5 rounded-sm border border-[#c5c6ce] text-left transition-all hover:border-[#3f5f92] group flex flex-col justify-between"
          >
            <span className="material-symbols-outlined text-[#3f5f92] text-[24px] mb-2 group-hover:scale-110 transition-transform">
              query_stats
            </span>
            <div>
              <div className="font-bold text-xs text-[#000616]">State Command</div>
              <div className="text-[10px] text-[#75777e] mt-0.5">38 District Matrix</div>
            </div>
          </button>
        </div>
      </div>

      {/* Field Work Schedule Table Card */}
      <div className="bg-white rounded-md border border-[#c5c6ce] shadow-xs overflow-hidden">
        {/* Header & Filter Bar */}
        <div className="p-4 border-b border-[#eceef0] flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#f7f9fb]">
          <div>
            <h2 className="text-sm font-bold text-[#000616] uppercase tracking-wide flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#3f5f92]">calendar_today</span>
              <span>Today's Field Work & Enforcement Schedule</span>
            </h2>
            <p className="text-xs text-[#44474d] mt-0.5">
              Targeted premises scheduled pursuant to Sector Risk Allocation Algorithm
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter Tabs */}
            <div className="flex bg-[#eceef0] p-0.5 rounded-xs text-xs">
              {(['all', 'high', 'progress', 'completed'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilterTab(tab)}
                  className={`px-2.5 py-1 rounded-xs font-semibold capitalize transition-colors ${
                    filterTab === tab
                      ? 'bg-white text-[#000616] shadow-xs'
                      : 'text-[#44474d] hover:text-[#000616]'
                  }`}
                >
                  {tab === 'all' ? 'All (4)' : tab === 'high' ? 'Urgent (3)' : tab === 'progress' ? 'Active (2)' : 'Done (1)'}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-2.5 top-2 text-[#75777e] text-[16px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search premise..."
                className="bg-white border border-[#c5c6ce] text-xs pl-8 pr-3 py-1 rounded-xs text-[#191c1e] focus:outline-hidden focus:border-[#3f5f92] w-40 sm:w-52"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#f2f4f6] text-[#44474d] text-[10px] uppercase font-bold tracking-wider border-b border-[#c5c6ce]">
                <th className="py-2.5 px-4">Priority</th>
                <th className="py-2.5 px-4">Establishment & Address</th>
                <th className="py-2.5 px-4">Target Commodity & Statutory Check</th>
                <th className="py-2.5 px-4">Scheduled Slot</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eceef0]">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-[#f7f9fb] transition-colors">
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-xs font-code-num ${
                        task.priority === 'CRITICAL'
                          ? 'bg-[#ffdad6] text-[#ba1a1a] border border-[#ba1a1a]/40'
                          : task.priority === 'HIGH'
                          ? 'bg-amber-100 text-amber-900 border border-amber-400'
                          : 'bg-[#eceef0] text-[#44474d]'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-[#000616] text-xs">{task.establishment}</div>
                    <div className="text-[11px] text-[#44474d] flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[13px] text-[#75777e]">location_on</span>
                      <span>{task.category}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 max-w-xs">
                    <div className="text-xs text-[#191c1e] line-clamp-1">{task.targetCommodity}</div>
                    <div className="text-[10px] text-[#75777e] font-code-num mt-0.5">
                      REF: {task.code}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-code-num text-xs font-medium text-[#191c1e]">{task.slot}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        task.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800'
                          : task.status === 'Violation'
                          ? 'bg-rose-100 text-rose-800'
                          : task.status === 'Submitted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {task.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {task.status === 'In Progress' || task.status === 'Pending' ? (
                      <button
                        onClick={() => {
                          if (onStartSpecificInspection) onStartSpecificInspection(task);
                          onNavigate('field-inspections');
                        }}
                        className="bg-[#0f1f38] hover:bg-[#1a2d48] text-white text-[11px] font-bold px-3 py-1.5 rounded-xs transition-colors"
                      >
                        {task.status === 'In Progress' ? 'Resume OCR' : 'Start Audit'}
                      </button>
                    ) : task.status === 'Violation' ? (
                      <button
                        onClick={() => onNavigate('field-inspections')}
                        className="bg-[#ba1a1a] hover:bg-[#93000a] text-white text-[11px] font-bold px-3 py-1.5 rounded-xs transition-colors"
                      >
                        Draft Form 4
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          onShowToast(
                            'Statutory Certificate Generated',
                            'Form IV Verification Certificate #VC-2026-9812 verified cryptographically.',
                            'info'
                          )
                        }
                        className="bg-[#eceef0] hover:bg-[#e0e3e5] text-[#191c1e] text-[11px] font-bold px-3 py-1.5 rounded-xs transition-colors"
                      >
                        View Cert
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Grid: 3 Tactical Support Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Widget 1: Recent Seizure Sample Photolog */}
        <div className="bg-white rounded-md border border-[#c5c6ce] shadow-xs p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-3 pb-2 border-b border-[#eceef0]">
              <span className="font-bold text-[#000616] uppercase flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">camera_alt</span>
                <span>Seizure Photolog & Forensic Hash</span>
              </span>
              <span className="text-[10px] font-code-num bg-[#ffdad6] text-[#93000a] font-bold px-1.5 py-0.5 rounded-xs">
                CASE #0891
              </span>
            </div>

            <div className="relative rounded-sm overflow-hidden border border-[#c5c6ce] mb-3 group">
              <img
                src={ASSETS.seizureRulerMacro}
                alt="Seizure sample with metric ruler"
                className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 inset-x-0 bg-black/75 text-white text-[10px] p-2 backdrop-blur-xs font-code-num flex items-center justify-between">
                <span>DIGITAL CALIPER: 4.82mm</span>
                <span className="text-rose-400">DEFICIT FONT SIZE</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#44474d]">Target Premise:</span>
                <span className="font-bold text-[#000616]">Nilgiris Supermarket</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#44474d]">Violation Type:</span>
                <span className="font-bold text-[#ba1a1a]">Dual-Layer MRP Alteration</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-[#44474d]">Forensic Hash:</span>
                <span className="font-code-num text-[#75777e] truncate max-w-[170px]">
                  e3b0c44298fc1c149afbf4c8...
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-3 border-t border-[#eceef0]">
            <button
              onClick={() => onNavigate('field-inspections')}
              className="w-full bg-[#f2f4f6] hover:bg-[#e0e3e5] text-[#000616] font-bold text-xs py-2 px-3 rounded-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Examine Seizure in Rule Matrix</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Widget 2: Standard Working Weights Inspection */}
        <div className="bg-white rounded-md border border-[#c5c6ce] shadow-xs p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-3 pb-2 border-b border-[#eceef0]">
              <span className="font-bold text-[#000616] uppercase flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#3f5f92]">scale</span>
                <span>Standard Working Weights</span>
              </span>
              <span className="text-[10px] font-code-num bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded-xs">
                CALIBRATION DUE
              </span>
            </div>

            <div className="relative rounded-sm overflow-hidden border border-[#c5c6ce] mb-3 group">
              <img
                src={ASSETS.calibrationWeights}
                alt="Calibration working weights"
                className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 inset-x-0 bg-black/75 text-white text-[10px] p-2 backdrop-blur-xs font-code-num flex items-center justify-between">
                <span>SET: SWW-CBE-SET-04</span>
                <span className="text-emerald-400">CLASS M1 CALIBRATED</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#44474d]">Verification Authority:</span>
                <span className="font-bold text-[#000616]">RRSL Bengaluru (Govt of India)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#44474d]">Validity Window:</span>
                <span className="font-bold text-amber-700">Expires 28-Oct-2026 (14d left)</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-[#44474d]">Working Certificate:</span>
                <span className="font-code-num text-[#3f5f92] font-semibold">
                  CERT-SWW-RRSL-2024-88
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-3 border-t border-[#eceef0]">
            <button
              onClick={() => onNavigate('product-verification')}
              className="w-full bg-[#f2f4f6] hover:bg-[#e0e3e5] text-[#000616] font-bold text-xs py-2 px-3 rounded-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Launch Scale Balance Verification</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Widget 3: Regional Jurisdiction Radar & Telemetry */}
        <div className="bg-white rounded-md border border-[#c5c6ce] shadow-xs p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-3 pb-2 border-b border-[#eceef0]">
              <span className="font-bold text-[#000616] uppercase flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#3f5f92]">radar</span>
                <span>Jurisdiction Area Radar</span>
              </span>
              <span className="text-[10px] font-code-num bg-emerald-100 text-emerald-900 font-bold px-1.5 py-0.5 rounded-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                LIVE RADAR
              </span>
            </div>

            <div className="relative rounded-sm overflow-hidden border border-[#c5c6ce] mb-3">
              <img
                src={ASSETS.jurisdictionMap}
                alt="Jurisdiction radar map"
                className="w-full h-44 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 bg-[#000616]/80 text-white text-[10px] px-2 py-1 rounded-xs font-code-num">
                ZONE: CBE NORTH (RS PURAM)
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#44474d]">Next Assigned Stop:</span>
                <span className="font-bold text-[#000616]">Annapoorna Retail Mart (0.8 km)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#44474d]">Offline Storage Buffer:</span>
                <span className="font-code-num text-emerald-700 font-bold">14 Records (42.8 MB)</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-[#44474d]">Hardware FIPS State:</span>
                <span className="font-code-num text-[#000616]">Battery 84% • Encrypted</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-3 border-t border-[#eceef0]">
            <button
              onClick={() => onNavigate('regional-monitoring')}
              className="w-full bg-[#f2f4f6] hover:bg-[#e0e3e5] text-[#000616] font-bold text-xs py-2 px-3 rounded-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Expand State Geographic GIS</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Barcode Scanner Modal */}
      {scannerModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-md max-w-md w-full p-6 shadow-2xl border border-[#c5c6ce] animate-toast">
            <div className="flex items-center justify-between pb-3 border-b border-[#eceef0] mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#3f5f92] text-[22px]">
                  barcode_scanner
                </span>
                <h3 className="font-bold text-sm text-[#000616] uppercase">
                  Optical Barcode & Commodity Lookup
                </h3>
              </div>
              <button
                onClick={() => setScannerModalOpen(false)}
                className="text-[#75777e] hover:text-[#000616]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-[#0f1f38] text-white p-4 rounded-sm flex flex-col items-center justify-center relative overflow-hidden h-36">
                <div className="absolute inset-x-0 h-0.5 bg-rose-500 shadow-md shadow-rose-500 animate-laser"></div>
                <span className="material-symbols-outlined text-[48px] text-[#7887a5] opacity-50 mb-2">
                  qr_code_scanner
                </span>
                <span className="text-[11px] text-[#d5e3fc] font-code-num">
                  ALIGN BARCODE / GS1 DATAMATRIX WITHIN RETICLE
                </span>
              </div>

              <div>
                <label className="block font-bold text-[#191c1e] uppercase text-[11px] mb-1">
                  Manual EAN-13 / GTIN Entry
                </label>
                <input
                  type="text"
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  className="w-full bg-[#f7f9fb] border border-[#c5c6ce] text-xs font-code-num p-2.5 rounded-sm focus:border-[#3f5f92] focus:outline-hidden text-[#000616]"
                  placeholder="e.g. 8901030889210"
                />
              </div>

              <div className="bg-[#f2f4f6] p-3 rounded-xs border border-[#c5c6ce] text-[11px] space-y-1">
                <div className="font-bold text-[#000616]">Recognized Commodity Profile:</div>
                <div className="text-[#44474d]">
                  Fortified Sunflower Oil 1L Pouch (Ref: Kaveri Agro Refineries)
                </div>
                <div className="text-[#ba1a1a] font-bold">
                  Flag: Subject to active MRP verification circular ENF-2024/09
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setScannerModalOpen(false)}
                  className="px-3 py-2 text-xs font-bold text-[#44474d] hover:bg-[#eceef0] rounded-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBarcodeLookup}
                  className="px-4 py-2 text-xs font-bold bg-[#000616] text-white rounded-xs hover:bg-[#0f1f38] transition-colors"
                >
                  Launch OCR Inspection Form
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Seizure Register Modal */}
      {seizureModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-md max-w-2xl w-full p-6 shadow-2xl border border-[#c5c6ce] animate-toast">
            <div className="flex items-center justify-between pb-3 border-b border-[#eceef0] mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ba1a1a] text-[22px]">
                  inventory_2
                </span>
                <h3 className="font-bold text-sm text-[#000616] uppercase">
                  Statutory Seizure Register (Section 15 & Rule 29)
                </h3>
              </div>
              <button
                onClick={() => setSeizureModalOpen(false)}
                className="text-[#75777e] hover:text-[#000616]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="text-xs space-y-3">
              <p className="text-[#44474d]">
                Records of goods, packaging materials, and weighing instruments seized under the provisions of Section 15 of the Legal Metrology Act, 2009 for custody or chemical assay:
              </p>

              <div className="border border-[#c5c6ce] rounded-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f2f4f6] text-[#44474d] font-bold text-[10px] uppercase border-b border-[#c5c6ce]">
                    <tr>
                      <th className="p-2">Seizure ID</th>
                      <th className="p-2">Establishment</th>
                      <th className="p-2">Items Seized</th>
                      <th className="p-2">Custody Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eceef0]">
                    <tr>
                      <td className="p-2 font-code-num font-bold">SEIZ-CBE-2026-0042</td>
                      <td className="p-2">Nilgiris Supermarket</td>
                      <td className="p-2">24 Pouches Sunflower Oil (Dual MRP)</td>
                      <td className="p-2 text-rose-700 font-bold">In Custody of Shop Manager</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-code-num font-bold">SEIZ-CBE-2026-0039</td>
                      <td className="p-2">Royal Pulses Packaging</td>
                      <td className="p-2">40 Bags Green Gram (Deficit 20g)</td>
                      <td className="p-2 text-amber-700 font-bold">Departmental Lockers</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-code-num font-bold">SEIZ-CBE-2026-0036</td>
                      <td className="p-2">Annapoorna Provisions</td>
                      <td className="p-2">12 Jars Ghee (Missing Address)</td>
                      <td className="p-2 text-emerald-700 font-bold">Compounded & Released</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSeizureModalOpen(false)}
                  className="px-4 py-2 bg-[#000616] text-white rounded-xs font-bold text-xs hover:bg-[#0f1f38]"
                >
                  Close Register
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
