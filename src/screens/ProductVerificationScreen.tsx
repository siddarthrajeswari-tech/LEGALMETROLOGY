import React, { useState } from 'react';
import { OfficerProfile, NavigationPath } from '../types';
import { ASSETS } from '../data/mockData';

interface ProductVerificationScreenProps {
  currentOfficer: OfficerProfile;
  onNavigate: (path: NavigationPath) => void;
  onShowToast: (title: string, description?: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
}

export const ProductVerificationScreen: React.FC<ProductVerificationScreenProps> = ({
  currentOfficer,
  onNavigate,
  onShowToast,
}) => {
  const [commodityName, setCommodityName] = useState('Fortified Sunflower Oil');
  const [declaredQty, setDeclaredQty] = useState<number>(1000);
  const [grossWeight, setGrossWeight] = useState<number>(1042.5);
  const [tareWeight, setTareWeight] = useState<number>(44.0);
  const [lotSize, setLotSize] = useState<number>(32);

  // Sixth Schedule MPE Table pursuant to Rule 11 & Rule 24
  // For 500g - 1000g: MPE is 15g (or 1.5%)
  const netWeight = +(grossWeight - tareWeight).toFixed(1);
  const errorDeficit = +(netWeight - declaredQty).toFixed(1);
  const mpeAllowed = declaredQty <= 50 ? 4.5 : declaredQty <= 100 ? 4.5 : declaredQty <= 200 ? 9 : declaredQty <= 300 ? 9 : declaredQty <= 500 ? 15 : declaredQty <= 1000 ? 15 : 15;
  const isPass = errorDeficit >= -mpeAllowed;

  const handleApplyTare = (boxTare: number) => {
    setTareWeight(boxTare);
    onShowToast(
      'Standard Tare Applied',
      `Subtracted container tare weight of ${boxTare}g pursuant to Sixth Schedule guidelines.`,
      'info'
    );
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-[#0f1f38] text-white rounded-lg p-5 md:p-6 border border-[#7887a5]/40 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-widest bg-[#a5c5fe] text-[#001b3d] px-2 py-0.5 rounded-xs font-code-num">
                METROLOGICAL BENCH VERIFICATION
              </span>
              <span className="text-xs text-[#b8c7e7] font-code-num hidden sm:inline">
                SIXTH SCHEDULE • MAXIMUM PERMISSIBLE ERROR (MPE)
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight font-display">
              Net Quantity & Weighing Scale Balance Tester
            </h1>
            <p className="text-xs text-[#d5e3fc] mt-1">
              Statutory determination of packaging tare deduction and permissible deficit errors under Rules 11, 24 & 25
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('field-inspections')}
              className="bg-[#a5c5fe] hover:bg-[#d6e3ff] text-[#001b3d] text-xs font-bold px-3.5 py-2.5 rounded-sm flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">document_scanner</span>
              <span>Back to Field Audit</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Balance & Tare Calculator (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-md border border-[#c5c6ce] shadow-xs p-5 space-y-5">
          <div>
            <span className="text-[10px] font-bold text-[#3f5f92] uppercase tracking-wider font-code-num">
              ELECTRONIC TEST BENCH
            </span>
            <h2 className="text-sm font-bold text-[#000616] uppercase">
              Field Scale Calibration & Gravimetric Assay
            </h2>
          </div>

          {/* Scale Display HUD */}
          <div className="bg-[#000714] border-2 border-[#3f5f92] rounded-md p-6 text-center relative overflow-hidden">
            <div className="text-[10px] font-code-num text-[#7887a5] uppercase tracking-widest flex items-center justify-between mb-2">
              <span>BALANCE ID: BAL-CBE-M1-09</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                LIVE SENSOR
              </span>
            </div>

            <div className="text-4xl md:text-5xl font-bold font-code-num tracking-tight text-cyan-300 py-2">
              {netWeight.toFixed(1)} <span className="text-xl text-[#7887a5]">g / ml</span>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs font-code-num mt-2 pt-2 border-t border-white/10 text-[#d8dadc]">
              <span>Gross: <strong>{grossWeight}g</strong></span>
              <span>•</span>
              <span className="text-amber-300">Tare: <strong>-{tareWeight}g</strong></span>
              <span>•</span>
              <span className={errorDeficit < -mpeAllowed ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                Delta: {errorDeficit > 0 ? `+${errorDeficit}g` : `${errorDeficit}g`}
              </span>
            </div>
          </div>

          {/* Input Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#191c1e] uppercase text-[11px] mb-1">
                Declared Nominal Net Mass (g or ml)
              </label>
              <input
                type="number"
                value={declaredQty}
                onChange={(e) => setDeclaredQty(+e.target.value)}
                className="w-full bg-[#f7f9fb] border border-[#c5c6ce] text-xs font-code-num p-2.5 rounded-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-[#191c1e] uppercase text-[11px] mb-1">
                Gross Balance Reading (g)
              </label>
              <input
                type="number"
                step="0.1"
                value={grossWeight}
                onChange={(e) => setGrossWeight(+e.target.value)}
                className="w-full bg-[#f7f9fb] border border-[#c5c6ce] text-xs font-code-num p-2.5 rounded-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-[#191c1e] uppercase text-[11px] mb-1">
                Deducted Packaging Tare (g)
              </label>
              <input
                type="number"
                step="0.1"
                value={tareWeight}
                onChange={(e) => setTareWeight(+e.target.value)}
                className="w-full bg-[#f7f9fb] border border-[#c5c6ce] text-xs font-code-num p-2.5 rounded-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-[#191c1e] uppercase text-[11px] mb-1">
                Inspection Lot Sample Size
              </label>
              <input
                type="number"
                value={lotSize}
                onChange={(e) => setLotSize(+e.target.value)}
                className="w-full bg-[#f7f9fb] border border-[#c5c6ce] text-xs font-code-num p-2.5 rounded-xs"
              />
            </div>
          </div>

          {/* Quick Tare Presets */}
          <div>
            <span className="text-[10px] font-bold text-[#75777e] uppercase tracking-wider block mb-1.5">
              Statutory Packaging Tare Weight Presets:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleApplyTare(14.5)}
                className="px-2.5 py-1 text-[11px] font-bold rounded-xs bg-[#f2f4f6] hover:bg-[#e0e3e5] border border-[#c5c6ce] text-[#000616]"
              >
                Pouch Film (14.5g)
              </button>
              <button
                type="button"
                onClick={() => handleApplyTare(44.0)}
                className="px-2.5 py-1 text-[11px] font-bold rounded-xs bg-[#f2f4f6] hover:bg-[#e0e3e5] border border-[#c5c6ce] text-[#000616]"
              >
                PET Bottle + Cap (44.0g)
              </button>
              <button
                type="button"
                onClick={() => handleApplyTare(120.0)}
                className="px-2.5 py-1 text-[11px] font-bold rounded-xs bg-[#f2f4f6] hover:bg-[#e0e3e5] border border-[#c5c6ce] text-[#000616]"
              >
                Sweetmeat Box (120.0g)
              </button>
              <button
                type="button"
                onClick={() => handleApplyTare(240.0)}
                className="px-2.5 py-1 text-[11px] font-bold rounded-xs bg-[#f2f4f6] hover:bg-[#e0e3e5] border border-[#c5c6ce] text-[#000616]"
              >
                Glass Jar (240.0g)
              </button>
            </div>
          </div>
        </div>

        {/* Right: Statutory MPE Schedule Table & Verdict (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-md border border-[#c5c6ce] shadow-xs p-5 space-y-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#3f5f92] uppercase tracking-wider font-code-num">
              RULE 11 COMPLIANCE VERDICT
            </span>
            <h2 className="text-sm font-bold text-[#000616] uppercase">
              Permissible Deficit Evaluation
            </h2>

            {/* Verdict Card */}
            <div
              className={`mt-3 p-4 rounded-md border text-center ${
                isPass
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                  : 'bg-[#ffdad6] border-[#ba1a1a] text-[#93000a]'
              }`}
            >
              <span className="material-symbols-outlined text-[36px] mb-1">
                {isPass ? 'verified' : 'error'}
              </span>
              <div className="text-base font-bold uppercase tracking-wide">
                {isPass ? 'STATUTORY COMPLIANCE: PASS' : 'DEFICIT ERROR: NON-COMPLIANCE'}
              </div>
              <p className="text-xs mt-1">
                {isPass
                  ? `Deviation of ${errorDeficit}g is within the statutory MPE threshold of ±${mpeAllowed}g.`
                  : `Net mass deficit of ${Math.abs(errorDeficit)}g exceeds maximum permissible error of ${mpeAllowed}g under Rule 11.`}
              </p>
            </div>

            {/* MPE Table Reference */}
            <div className="mt-4 pt-3 border-t border-[#eceef0]">
              <span className="text-xs font-bold text-[#000616] uppercase block mb-1">
                Sixth Schedule Reference Table (Rule 11)
              </span>
              <table className="w-full text-[11px] border border-[#c5c6ce] text-left">
                <thead className="bg-[#f2f4f6] text-[#44474d] font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-1.5">Declared Qty</th>
                    <th className="p-1.5">Max Permissible Error (MPE)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eceef0] font-code-num">
                  <tr className={declaredQty <= 100 ? 'bg-amber-100 font-bold' : ''}>
                    <td className="p-1.5">50g to 100g</td>
                    <td className="p-1.5">4.5g</td>
                  </tr>
                  <tr className={declaredQty > 100 && declaredQty <= 500 ? 'bg-amber-100 font-bold' : ''}>
                    <td className="p-1.5">100g to 500g</td>
                    <td className="p-1.5">9.0g / 3%</td>
                  </tr>
                  <tr className={declaredQty > 500 && declaredQty <= 1000 ? 'bg-amber-100 font-bold' : ''}>
                    <td className="p-1.5">500g to 1000g</td>
                    <td className="p-1.5">15.0g (1.5%)</td>
                  </tr>
                  <tr className={declaredQty > 1000 ? 'bg-amber-100 font-bold' : ''}>
                    <td className="p-1.5">Above 1000g</td>
                    <td className="p-1.5">1.5% of net quantity</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-4 border-t border-[#eceef0]">
            <button
              onClick={() => {
                onShowToast(
                  'Assay Certificate Exported',
                  `Gravimetric Certificate #GRAV-2026-0812 signed with badge ${currentOfficer.badge}.`,
                  'success'
                );
              }}
              className="w-full bg-[#000616] hover:bg-[#0f1f38] text-white text-xs font-bold uppercase py-3 px-4 rounded-xs transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Certify Test Assay to Case Docket</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
