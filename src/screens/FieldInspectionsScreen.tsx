import React, { useState } from 'react';
import { OfficerProfile, NavigationPath, EvidentiaryAngle } from '../types';
import { EVIDENTIARY_ANGLES_DATA, ASSETS } from '../data/mockData';

interface FieldInspectionsScreenProps {
  currentOfficer: OfficerProfile;
  onNavigate: (path: NavigationPath) => void;
  onShowToast: (title: string, description?: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
}

export const FieldInspectionsScreen: React.FC<FieldInspectionsScreenProps> = ({
  currentOfficer,
  onNavigate,
  onShowToast,
}) => {
  // Stepper state
  const [currentStep, setCurrentStep] = useState<number>(3); // Step 3: Multi-Scan OCR

  // Evidentiary Angle State
  const [selectedAngleIndex, setSelectedAngleIndex] = useState<number>(2); // Angle 2: MRP & Stamp
  const [anglesList] = useState<EvidentiaryAngle[]>(EVIDENTIARY_ANGLES_DATA);

  // Optical Canvas Controls
  const [zoomLevel, setZoomLevel] = useState<number>(2.5);
  const [rotationDeg, setRotationDeg] = useState<number>(0);
  const [invertFilter, setInvertFilter] = useState<boolean>(false);
  const [showCaliperHUD, setShowCaliperHUD] = useState<boolean>(true);
  const [isScanningLaser, setIsScanningLaser] = useState<boolean>(false);

  // Rule Matrix Audit Controls
  const [clause1Concurred, setClause1Concurred] = useState<boolean>(true);
  const [clause2Violated, setClause2Violated] = useState<boolean>(true);
  const [clause3Concurred, setClause3Concurred] = useState<boolean>(true);
  const [clause4Violated, setClause4Violated] = useState<boolean>(true);
  const [officerNotes, setOfficerNotes] = useState<string>(
    'Secondary adhesive label manually placed directly on top of original factory heat-embossed MRP of ₹178.00. Alteration executed without statutory state notification.'
  );

  // Recommendation & Enforcement
  const [recommendation, setRecommendation] = useState<string>('compounding');
  const [seizedQuantity, setSeizedQuantity] = useState<number>(24);
  const [compoundingFee, setCompoundingFee] = useState<number>(25000);

  // Modals
  const [showForm4Modal, setShowForm4Modal] = useState<boolean>(false);
  const [showDscModal, setShowDscModal] = useState<boolean>(false);
  const [dscPin, setDscPin] = useState<string>('••••••');
  const [isSigningDsc, setIsSigningDsc] = useState<boolean>(false);

  const activeAngle = anglesList[selectedAngleIndex] || anglesList[0];

  const handleRetakeScan = () => {
    setIsScanningLaser(true);
    setTimeout(() => {
      setIsScanningLaser(false);
      onShowToast(
        'High-Resolution Sensor Re-Calibrated',
        'Optical edge detection, barcode bounding, and text extraction refreshed with 99.4% confidence.',
        'info'
      );
    }, 1800);
  };

  const handleSaveDraft = () => {
    onShowToast(
      'Encrypted Draft Saved',
      'Inspection record INS-TN-2026-00128 and 4 photographic hashes cached to local SQLite storage.',
      'success'
    );
  };

  const handleExecuteDscSign = () => {
    setIsSigningDsc(true);
    setTimeout(() => {
      setIsSigningDsc(false);
      setShowDscModal(false);
      onShowToast(
        'Inspection Case Formally Submitted',
        'Dossier cryptographically signed with badge ' +
          currentOfficer.badge +
          ' and transmitted to Assistant Controller Dr. Priya Sharma.',
        'success'
      );
      onNavigate('inspection-review');
    }, 1400);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* 5-Step Progress Wizard */}
      <div className="bg-white rounded-md border border-[#c5c6ce] shadow-xs p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-[#3f5f92] uppercase tracking-wider font-code-num">
              STATUTORY INSPECTION PROTOCOL • FORM IV / SECTION 15
            </span>
            <h1 className="text-lg font-bold text-[#000616] font-display">
              Field Audit & Multi-Angle OCR Inspection
            </h1>
          </div>

          {/* Stepper Buttons */}
          <div className="flex items-center gap-1 sm:gap-2 text-xs overflow-x-auto pb-1">
            {[
              { step: 1, label: 'Premise Reg' },
              { step: 2, label: 'Product Class' },
              { step: 3, label: 'Multi-Scan OCR' },
              { step: 4, label: 'Rule Matrix' },
              { step: 5, label: 'Statutory Order' },
            ].map((item) => (
              <button
                key={item.step}
                onClick={() => setCurrentStep(item.step)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xs font-bold text-[11px] whitespace-nowrap transition-colors ${
                  currentStep === item.step
                    ? 'bg-[#0f1f38] text-white'
                    : currentStep > item.step
                    ? 'bg-emerald-100 text-emerald-900'
                    : 'bg-[#eceef0] text-[#75777e]'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                    currentStep > item.step
                      ? 'bg-emerald-600 text-white'
                      : currentStep === item.step
                      ? 'bg-[#a5c5fe] text-[#000616]'
                      : 'bg-[#c5c6ce] text-white'
                  }`}
                >
                  {currentStep > item.step ? '✓' : item.step}
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Target Premise & Commodity Metadata Card */}
        <div className="mt-4 pt-3 border-t border-[#eceef0] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs bg-[#f7f9fb] p-3 rounded-xs">
          <div>
            <span className="text-[10px] text-[#75777e] uppercase font-bold block">
              Establishment Name
            </span>
            <span className="font-bold text-[#000616]">Nilgiris Supermarket & Mart</span>
            <span className="text-[11px] text-[#44474d] block">Branch Code: NS-CBE-02</span>
          </div>

          <div>
            <span className="text-[10px] text-[#75777e] uppercase font-bold block">
              Inspection Address / GPS
            </span>
            <span className="font-medium text-[#000616]">Avinashi Rd, Peelamedu, CBE</span>
            <span className="text-[10px] font-code-num text-emerald-700 block">
              11.0168° N, 76.9558° E (Verified)
            </span>
          </div>

          <div>
            <span className="text-[10px] text-[#75777e] uppercase font-bold block">
              Commodity Sampling
            </span>
            <span className="font-bold text-[#000616]">Fortified Sunflower Oil 1L Pouch</span>
            <span className="text-[11px] text-[#44474d] block">
              Declared: Kaveri Agro Refineries
            </span>
          </div>

          <div>
            <span className="text-[10px] text-[#75777e] uppercase font-bold block">
              Enforcement Status
            </span>
            <span className="inline-block px-2 py-0.5 rounded-xs font-bold text-[10px] bg-[#ffdad6] text-[#ba1a1a] border border-[#ba1a1a]/30">
              2 VIOLATIONS DETECTED (OCR)
            </span>
            <span className="text-[10px] text-[#75777e] font-code-num block mt-0.5">
              CASE REF: INS-TN-2026-00128
            </span>
          </div>
        </div>
      </div>

      {/* Multi-Angle Evidentiary Thumbnails Bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#44474d] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#3f5f92]">
              view_carousel
            </span>
            <span>Multi-Angle Evidentiary Portfolio (4 Perspectives)</span>
          </div>
          <span className="text-[11px] font-code-num text-[#75777e]">
            ACTIVE ANGLE: {selectedAngleIndex + 1} of 4
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {anglesList.map((angle, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedAngleIndex(idx)}
              className={`p-2 rounded-md border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                selectedAngleIndex === idx
                  ? 'bg-white border-[#0f1f38] shadow-md ring-2 ring-[#a5c5fe]'
                  : 'bg-white hover:bg-[#f7f9fb] border-[#c5c6ce]'
              }`}
            >
              <div className="relative h-24 w-full rounded-xs overflow-hidden mb-2 bg-[#eceef0]">
                <img
                  src={angle.img}
                  alt={angle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {angle.hasViolation && (
                  <span className="absolute top-1 right-1 bg-[#ba1a1a] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-xs">
                    FLAGGED
                  </span>
                )}
                {selectedAngleIndex === idx && (
                  <div className="absolute inset-0 border-2 border-[#3f5f92]"></div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#000616]">{angle.title}</span>
                  <span className="text-[10px] text-emerald-700 font-bold">✓ SHA-256</span>
                </div>
                <div className="text-[10px] text-[#75777e] truncate mt-0.5">{angle.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Interactive Canvas (Left) + Rule Matrix (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Live OCR Canvas (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-md border border-[#c5c6ce] shadow-xs flex flex-col justify-between overflow-hidden">
          {/* Canvas Controls Toolbar */}
          <div className="p-3 bg-[#0f1f38] text-white flex flex-wrap items-center justify-between gap-2 border-b border-[#7887a5]/40 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-bold uppercase tracking-wider text-[11px]">
                High-Resolution Optical Reticle
              </span>
              <span className="bg-[#112032] text-[#a5c5fe] px-1.5 py-0.5 rounded-xs font-code-num text-[10px]">
                {zoomLevel}x ZOOM
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setZoomLevel((z) => Math.max(1.0, +(z - 0.5).toFixed(1)))}
                className="p-1 hover:bg-[#112032] rounded-xs text-[#d6e3ff]"
                title="Zoom Out"
              >
                <span className="material-symbols-outlined text-[18px]">zoom_out</span>
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.min(4.0, +(z + 0.5).toFixed(1)))}
                className="p-1 hover:bg-[#112032] rounded-xs text-[#d6e3ff]"
                title="Zoom In"
              >
                <span className="material-symbols-outlined text-[18px]">zoom_in</span>
              </button>
              <button
                onClick={() => setRotationDeg((r) => (r + 90) % 360)}
                className="p-1 hover:bg-[#112032] rounded-xs text-[#d6e3ff]"
                title="Rotate 90 Degrees"
              >
                <span className="material-symbols-outlined text-[18px]">rotate_right</span>
              </button>
              <button
                onClick={() => setInvertFilter(!invertFilter)}
                className={`p-1 rounded-xs transition-colors ${
                  invertFilter ? 'bg-amber-400 text-black' : 'hover:bg-[#112032] text-[#d6e3ff]'
                }`}
                title="Invert Contrast / High-Pass Edge Detection"
              >
                <span className="material-symbols-outlined text-[18px]">contrast</span>
              </button>
              <button
                onClick={() => setShowCaliperHUD(!showCaliperHUD)}
                className={`p-1 rounded-xs transition-colors ${
                  showCaliperHUD ? 'bg-[#a5c5fe] text-[#000616]' : 'hover:bg-[#112032] text-[#d6e3ff]'
                }`}
                title="Toggle Digital Caliper HUD"
              >
                <span className="material-symbols-outlined text-[18px]">straighten</span>
              </button>
              <button
                onClick={handleRetakeScan}
                disabled={isScanningLaser}
                className="ml-1 bg-[#112032] hover:bg-[#1a2d48] border border-[#7887a5]/40 text-[#ffffff] px-2 py-1 rounded-xs text-[10px] font-bold flex items-center gap-1"
                title="Re-run Laser & OCR Scan"
              >
                <span className="material-symbols-outlined text-[14px]">refresh</span>
                <span>Rescan</span>
              </button>
            </div>
          </div>

          {/* Interactive Visual Canvas Area */}
          <div className="relative bg-[#000616] overflow-hidden min-h-[440px] flex items-center justify-center p-4">
            {/* Laser Sweep Scanner Effect */}
            {isScanningLaser && (
              <div className="absolute inset-x-0 h-1 bg-cyan-400 shadow-lg shadow-cyan-400 z-30 animate-laser"></div>
            )}

            {/* Main Specimen Image */}
            <div
              className="relative transition-all duration-300 max-w-full"
              style={{
                transform: `scale(${zoomLevel / 1.8}) rotate(${rotationDeg}deg)`,
                filter: invertFilter ? 'invert(1) contrast(1.4)' : 'none',
              }}
            >
              <img
                src={activeAngle.img}
                alt="Active Specimen"
                className="max-h-[380px] w-auto object-contain rounded-xs border border-white/20 shadow-2xl"
                referrerPolicy="no-referrer"
              />

              {/* Bounding Box 1: MRP Sticker / Over-stickering */}
              <div className="absolute top-[28%] left-[22%] w-[48%] h-[32%] border-2 border-rose-500 bg-rose-500/15 rounded-xs pointer-events-auto group">
                <div className="absolute -top-6 left-0 bg-[#ba1a1a] text-white text-[9px] font-bold font-code-num px-1.5 py-0.5 rounded-xs shadow-md whitespace-nowrap flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  <span>OVER-STICKERING DETECTED (R-6(1)(e))</span>
                </div>
                {/* Popover on hover */}
                <div className="absolute top-full left-0 mt-1 w-64 bg-[#000616]/95 text-white p-2.5 rounded-xs text-[10px] shadow-2xl border border-rose-500/50 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                  <div className="font-bold text-rose-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">warning</span>
                    Sub-layer Analysis:
                  </div>
                  <div className="mt-0.5 text-[#d8dadc]">
                    Secondary sticker of <strong>₹195.00</strong> affixed over embossed factory rate of <strong>₹178.00</strong>.
                  </div>
                  <div className="text-emerald-400 mt-1 font-code-num">
                    Confidence: 98.6% • Dual-Layer Adhesive Confirmed
                  </div>
                </div>
              </div>

              {/* Bounding Box 2: Consumer Redressal / Missing Phone */}
              <div className="absolute bottom-[14%] left-[25%] w-[42%] h-[18%] border-2 border-amber-500 bg-amber-500/15 rounded-xs pointer-events-auto group">
                <div className="absolute -top-5 left-0 bg-amber-600 text-white text-[9px] font-bold font-code-num px-1.5 py-0.5 rounded-xs shadow-md whitespace-nowrap">
                  RULE 6(1)(h): CONTACT PHONE VOID
                </div>
              </div>

              {/* Digital Caliper HUD Visual Ruler */}
              {showCaliperHUD && (
                <div className="absolute -right-12 top-[24%] h-[40%] flex items-center pointer-events-none">
                  <div className="h-full w-4 border-r-2 border-y-2 border-cyan-400 flex flex-col justify-between py-1 text-[8px] font-code-num text-cyan-300 pl-1 bg-black/60 backdrop-blur-xs">
                    <span>4.82mm</span>
                    <span className="text-[7px] text-cyan-400 opacity-75">- - -</span>
                    <span>4.00mm</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Floating Canvas HUD */}
            <div className="absolute bottom-2 inset-x-2 bg-black/80 text-white text-[10px] p-2 rounded-xs border border-white/10 backdrop-blur-md flex flex-wrap items-center justify-between gap-2 font-code-num">
              <div className="flex items-center gap-2">
                <span className="text-[#a5c5fe]">SHA-256:</span>
                <span className="text-[#d5e3fc] truncate max-w-[160px] sm:max-w-[260px]">
                  {activeAngle.hash}
                </span>
              </div>
              <div className="flex items-center gap-3 text-emerald-400">
                <span>GPS: 11.0168° N, 76.9558° E</span>
                <span>CALIPER: {activeAngle.caliperHeight}</span>
              </div>
            </div>
          </div>

          {/* Canvas Footer Status */}
          <div className="p-3 bg-[#f7f9fb] border-t border-[#c5c6ce] text-xs flex items-center justify-between text-[#44474d]">
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="material-symbols-outlined text-[16px] text-emerald-600">
                check_circle
              </span>
              <span>Optical extraction complete with tamper-evident chain of custody.</span>
            </div>
            <button
              onClick={() => {
                setShowCaliperHUD(!showCaliperHUD);
                onShowToast(
                  showCaliperHUD ? 'Caliper HUD Disabled' : 'Caliper HUD Enabled',
                  'Digital font size caliper calibrated to 0.01mm optical resolution.',
                  'info'
                );
              }}
              className="text-[#3f5f92] font-bold text-[11px] hover:underline"
            >
              {showCaliperHUD ? 'Hide Caliper' : 'Show Caliper HUD'}
            </button>
          </div>
        </div>

        {/* Right: Legal Rule Engine Audit Matrix (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-md border border-[#c5c6ce] shadow-xs p-4 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#eceef0]">
              <div>
                <span className="text-[10px] font-bold text-[#3f5f92] uppercase tracking-wider font-code-num">
                  PCR 2011 COMPLIANCE VERIFICATION
                </span>
                <h2 className="text-sm font-bold text-[#000616] uppercase">
                  Rule Engine Audit Matrix
                </h2>
              </div>
              <span className="text-xs bg-[#ffdad6] text-[#ba1a1a] font-bold px-2 py-0.5 rounded-xs">
                2 Non-Compliances
              </span>
            </div>

            {/* Clauses List */}
            <div className="mt-3 space-y-3">
              {/* Clause 1: Net Quantity */}
              <div className="p-3 rounded-xs border border-[#c5c6ce] bg-[#f7f9fb] text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="font-bold text-[#000616]">
                      Clause 1: Net Quantity (Rule 12(1))
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-xs">
                    PASS (910g)
                  </span>
                </div>
                <p className="text-[11px] text-[#44474d] mt-1 leading-relaxed">
                  Declared 1 Litre (910g at 30°C). Gross verification on calibrated scale confirms mass within permissible error under Sixth Schedule Table 1.
                </p>
                <label className="mt-2 flex items-center gap-2 cursor-pointer text-[11px] font-medium text-[#191c1e]">
                  <input
                    type="checkbox"
                    checked={clause1Concurred}
                    onChange={(e) => setClause1Concurred(e.target.checked)}
                    className="rounded-xs text-[#0f1f38]"
                  />
                  <span>Inspector Concurrence Recorded</span>
                </label>
              </div>

              {/* Clause 2: Maximum Retail Price (MRP) */}
              <div className="p-3 rounded-xs border border-[#ba1a1a]/40 bg-[#ffdad6]/20 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
                    <span className="font-bold text-[#ba1a1a]">
                      Clause 2: MRP Audit (Rule 6(1)(e))
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#ba1a1a] bg-[#ffdad6] px-1.5 py-0.5 rounded-xs border border-[#ba1a1a]/30">
                    BREACH DETECTED
                  </span>
                </div>
                <p className="text-[11px] text-[#191c1e] mt-1 leading-relaxed">
                  Over-stickering observed. Factory printed rate of <strong>₹178.00</strong> altered to <strong>₹195.00</strong>. Substantive violation of Section 36(1) & Rule 26.
                </p>
                <div className="mt-2 flex items-center justify-between pt-1 border-t border-[#ffdad6]/60 text-[11px]">
                  <span className="text-[#44474d]">Finding Status:</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setClause2Violated(true)}
                      className={`px-2 py-0.5 font-bold rounded-xs text-[10px] ${
                        clause2Violated ? 'bg-[#ba1a1a] text-white' : 'bg-white text-[#ba1a1a] border border-[#ba1a1a]'
                      }`}
                    >
                      Violation Confirmed
                    </button>
                    <button
                      type="button"
                      onClick={() => setClause2Violated(false)}
                      className={`px-2 py-0.5 font-bold rounded-xs text-[10px] ${
                        !clause2Violated ? 'bg-emerald-600 text-white' : 'bg-white text-emerald-700 border border-emerald-500'
                      }`}
                    >
                      Exonerated
                    </button>
                  </div>
                </div>
              </div>

              {/* Clause 3: Packer Address */}
              <div className="p-3 rounded-xs border border-[#c5c6ce] bg-[#f7f9fb] text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="font-bold text-[#000616]">
                      Clause 3: Packer Identity (Rule 6(1)(a))
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-xs">
                    ROC VERIFIED
                  </span>
                </div>
                <p className="text-[11px] text-[#44474d] mt-1 leading-relaxed">
                  Kaveri Agro Refineries India Pvt Ltd, Madurai Highway. Valid GSTIN & Metrology Registration active.
                </p>
                <label className="mt-2 flex items-center gap-2 cursor-pointer text-[11px] font-medium text-[#191c1e]">
                  <input
                    type="checkbox"
                    checked={clause3Concurred}
                    onChange={(e) => setClause3Concurred(e.target.checked)}
                    className="rounded-xs text-[#0f1f38]"
                  />
                  <span>Manufacturer Match Validated</span>
                </label>
              </div>

              {/* Clause 4: Consumer Care Redressal */}
              <div className="p-3 rounded-xs border border-[#ba1a1a]/40 bg-[#ffdad6]/20 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
                    <span className="font-bold text-[#ba1a1a]">
                      Clause 4: Consumer Redressal (Rule 6(1)(h))
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#ba1a1a] bg-[#ffdad6] px-1.5 py-0.5 rounded-xs border border-[#ba1a1a]/30">
                    PHONE OMITTED
                  </span>
                </div>
                <p className="text-[11px] text-[#191c1e] mt-1 leading-relaxed">
                  Email redressal declared, but mandatory dedicated telephonic helpline omitted on packaging pouch.
                </p>
                <div className="mt-2 flex items-center justify-between pt-1 border-t border-[#ffdad6]/60 text-[11px]">
                  <span className="text-[#44474d]">Finding Status:</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setClause4Violated(true)}
                      className={`px-2 py-0.5 font-bold rounded-xs text-[10px] ${
                        clause4Violated ? 'bg-[#ba1a1a] text-white' : 'bg-white text-[#ba1a1a] border border-[#ba1a1a]'
                      }`}
                    >
                      Violation Confirmed
                    </button>
                    <button
                      type="button"
                      onClick={() => setClause4Violated(false)}
                      className={`px-2 py-0.5 font-bold rounded-xs text-[10px] ${
                        !clause4Violated ? 'bg-emerald-600 text-white' : 'bg-white text-emerald-700 border border-emerald-500'
                      }`}
                    >
                      Exonerated
                    </button>
                  </div>
                </div>
              </div>

              {/* Inspector Field Observation Notes */}
              <div>
                <label className="block text-[11px] font-bold text-[#191c1e] uppercase tracking-wider mb-1">
                  Inspector Statutory Observation & Remarks
                </label>
                <textarea
                  rows={3}
                  value={officerNotes}
                  onChange={(e) => setOfficerNotes(e.target.value)}
                  className="w-full bg-[#f7f9fb] border border-[#c5c6ce] text-xs p-2 rounded-xs focus:border-[#0f1f38] focus:bg-white text-[#000616]"
                />
              </div>

              {/* Recommendation Selector */}
              <div className="pt-2 border-t border-[#eceef0]">
                <label className="block text-[11px] font-bold text-[#000616] uppercase tracking-wider mb-1">
                  Statutory Order Recommendation
                </label>
                <select
                  value={recommendation}
                  onChange={(e) => {
                    setRecommendation(e.target.value);
                    if (e.target.value === 'clearance') {
                      setCompoundingFee(0);
                    } else if (e.target.value === 'prosecution') {
                      setCompoundingFee(0);
                    } else {
                      setCompoundingFee(25000);
                    }
                  }}
                  className="w-full bg-white border border-[#c5c6ce] text-xs font-bold p-2 rounded-xs text-[#000616]"
                >
                  <option value="compounding">
                    Seizure & Compounding Notice (Sec 48) - ₹25,000 Proposed
                  </option>
                  <option value="prosecution">
                    Forward to Court for Prosecution (CJM Court under Sec 36)
                  </option>
                  <option value="warning">
                    Formal Rectification Notice (7 Days Statutory Cure Window)
                  </option>
                  <option value="clearance">
                    Full Statutory Clearance Certificate (Form IV)
                  </option>
                </select>
              </div>

              {/* Seizure quantity & Fee preview */}
              <div className="bg-[#f2f4f6] p-3 rounded-xs border border-[#c5c6ce] flex items-center justify-between text-xs">
                <div>
                  <div className="text-[#44474d] text-[10px] uppercase font-bold">
                    Units Impounded:
                  </div>
                  <div className="font-bold text-sm text-[#000616]">{seizedQuantity} Pouches</div>
                </div>
                <div className="text-right">
                  <div className="text-[#44474d] text-[10px] uppercase font-bold">
                    Compounding Fee:
                  </div>
                  <div className="font-bold text-sm text-[#ba1a1a]">
                    ₹{compoundingFee.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#eceef0] space-y-2">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="w-full sm:w-1/2 bg-[#eceef0] hover:bg-[#e0e3e5] text-[#000616] text-xs font-bold py-2.5 px-3 rounded-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">save</span>
                <span>Save Secure Draft</span>
              </button>

              <button
                type="button"
                onClick={() => setShowForm4Modal(true)}
                className="w-full sm:w-1/2 bg-[#f2f4f6] hover:bg-[#e0e3e5] text-[#3f5f92] border border-[#3f5f92]/40 text-xs font-bold py-2.5 px-3 rounded-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span>Print Seizure Memo</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowDscModal(true)}
              className="w-full bg-[#000616] hover:bg-[#0f1f38] text-white text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span>Sign & Transmit to Assistant Controller</span>
            </button>
          </div>
        </div>
      </div>

      {/* Form 4 Print / Seizure Memorandum Modal */}
      {showForm4Modal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-md max-w-3xl w-full p-6 md:p-8 shadow-2xl border border-[#c5c6ce] max-h-[90vh] overflow-y-auto animate-toast">
            <div className="flex items-center justify-between pb-3 border-b border-[#eceef0] mb-4">
              <div className="flex items-center gap-2">
                <img
                  src={ASSETS.emblemLogo}
                  alt="Govt of India"
                  className="w-8 h-8 object-contain"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="font-bold text-sm text-[#000616] uppercase">
                    Form IV • Statutory Seizure Memorandum
                  </h3>
                  <p className="text-[11px] text-[#44474d]">
                    Under Section 15 of Legal Metrology Act, 2009 & Rule 29 of PCR 2011
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowForm4Modal(false)}
                className="text-[#75777e] hover:text-[#000616]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-4 text-xs text-[#191c1e] bg-[#f7f9fb] p-4 rounded-xs border border-[#c5c6ce]">
              <div className="text-center pb-2 border-b border-[#c5c6ce]/60 font-bold uppercase text-xs">
                Government of India • Department of Legal Metrology
                <div className="text-[11px] font-normal text-[#44474d]">
                  Office of the Inspector of Legal Metrology, Sector 04, Coimbatore North
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div>
                  <strong>Seizure Memo No:</strong> FORM-IV/CBE-N/2026/0891
                </div>
                <div>
                  <strong>Date & Time:</strong> 14-Oct-2026 12:15 PM IST
                </div>
                <div>
                  <strong>Establishment:</strong> Nilgiris Supermarket & Mart (Branch NS-CBE-02)
                </div>
                <div>
                  <strong>Person in Charge:</strong> S. Murugan, Store General Manager
                </div>
              </div>

              <div className="pt-2">
                <strong>Schedule of Property & Packages Seized:</strong>
                <table className="w-full mt-1 border border-[#c5c6ce] text-left">
                  <thead className="bg-[#eceef0] text-[10px] uppercase">
                    <tr>
                      <th className="p-1.5">S.No</th>
                      <th className="p-1.5">Commodity Description</th>
                      <th className="p-1.5">Batch / Lot</th>
                      <th className="p-1.5">Quantity Seized</th>
                      <th className="p-1.5">Offence Section</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-[#c5c6ce]">
                      <td className="p-1.5 font-code-num">01</td>
                      <td className="p-1.5">Fortified Sunflower Oil (1 Litre Pouch)</td>
                      <td className="p-1.5 font-code-num">#EDO-SEP-402</td>
                      <td className="p-1.5 font-bold">24 Pouches</td>
                      <td className="p-1.5 text-rose-700 font-bold">Sec 36(1) / Rule 6(1)(e)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="text-[11px] text-[#44474d] leading-relaxed pt-2">
                <strong>Supervisory Undertaking:</strong> The aforesaid articles have been seized in the presence of two independent witnesses pursuant to Section 15 powers. The custodian is directed not to alter, dispose, or transfer the property pending compounding or judicial determination.
              </div>

              <div className="flex justify-between items-end pt-6 border-t border-[#c5c6ce]/60 text-[11px]">
                <div>
                  <div className="border-b border-black w-40 mb-1"></div>
                  <span>Signature of Custodian / Manager</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#000616]">{currentOfficer.name}</div>
                  <div className="text-[#44474d]">Inspector of Legal Metrology</div>
                  <div className="text-[10px] font-code-num text-[#75777e]">
                    Badge: {currentOfficer.badge}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4">
              <button
                onClick={() => setShowForm4Modal(false)}
                className="px-4 py-2 text-xs font-bold text-[#44474d] hover:bg-[#eceef0] rounded-xs"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  window.print();
                  onShowToast('Printing Initiated', 'Form IV dispatched to local printer queue.', 'info');
                }}
                className="px-4 py-2 text-xs font-bold bg-[#000616] text-white rounded-xs hover:bg-[#0f1f38] flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span>Print Document</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DSC PIN & Transmission Modal */}
      {showDscModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-md max-w-md w-full p-6 shadow-2xl border border-[#c5c6ce] animate-toast">
            <div className="flex items-center justify-between pb-3 border-b border-[#eceef0] mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#3f5f92] text-[24px]">
                  security
                </span>
                <h3 className="font-bold text-sm text-[#000616] uppercase">
                  DSC Digital Signature Verification
                </h3>
              </div>
              <button
                onClick={() => setShowDscModal(false)}
                className="text-[#75777e] hover:text-[#000616]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-[#44474d]">
                You are about to sign and transmit Case <strong>INS-TN-2026-00128</strong> with 4 photographic hashes and Rule Engine findings to <strong>Assistant Controller Dr. Priya Sharma</strong>.
              </p>

              <div className="bg-[#f2f4f6] p-3 rounded-xs border border-[#c5c6ce] space-y-1 font-code-num text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#75777e]">Signer:</span>
                  <span className="font-bold text-[#000616]">{currentOfficer.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#75777e]">Crypto Token:</span>
                  <span className="text-emerald-700 font-bold">FIPS 140-2 Level 3 Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#75777e]">Hash Algorithm:</span>
                  <span>SHA-256 / RSA-2048</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#191c1e] uppercase text-[11px] mb-1">
                  Enter 6-Digit Hardware Token PIN
                </label>
                <input
                  type="password"
                  value={dscPin}
                  onChange={(e) => setDscPin(e.target.value)}
                  maxLength={6}
                  className="w-full bg-[#f7f9fb] border border-[#c5c6ce] text-center text-sm font-code-num tracking-widest p-2.5 rounded-sm focus:border-[#3f5f92] focus:outline-hidden text-[#000616]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDscModal(false)}
                  className="px-3 py-2 text-xs font-bold text-[#44474d] hover:bg-[#eceef0] rounded-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isSigningDsc}
                  onClick={handleExecuteDscSign}
                  className="px-4 py-2.5 text-xs font-bold bg-[#000616] hover:bg-[#0f1f38] text-white rounded-xs transition-colors flex items-center gap-2"
                >
                  {isSigningDsc ? (
                    <>
                      <span className="material-symbols-outlined text-[16px] animate-spin">
                        refresh
                      </span>
                      <span>Signing Hash...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      <span>Sign & Transmit Dossier</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
