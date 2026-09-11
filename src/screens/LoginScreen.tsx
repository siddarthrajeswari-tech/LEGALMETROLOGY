import React, { useState } from 'react';
import { OfficerProfile, NavigationPath } from '../types';
import { OFFICERS, ASSETS } from '../data/mockData';

interface LoginScreenProps {
  onLoginSuccess: (officer: OfficerProfile) => void;
  onNavigate: (path: NavigationPath) => void;
}

type SecurityState = 'normal' | 'mfa' | 'invalid' | 'inactive' | 'expired';

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onNavigate }) => {
  const [selectedOfficerKey, setSelectedOfficerKey] = useState<string>('rajesh');
  const [serviceCode, setServiceCode] = useState('LMO-TN-2024-8841');
  const [securityKey, setSecurityKey] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberWorkstation, setRememberWorkstation] = useState(true);
  const [simState, setSimState] = useState<SecurityState>('normal');
  const [otpValues, setOtpValues] = useState(['4', '8', '2', '1', '9', '0']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectPreset = (key: string) => {
    setSelectedOfficerKey(key);
    const off = OFFICERS[key];
    if (off) {
      setServiceCode(off.id);
      setSecurityKey('••••••••••••');
      setSimState('normal');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      if (simState === 'invalid' || simState === 'inactive' || simState === 'expired') {
        // Keep in error state
        return;
      }
      if (simState === 'mfa') {
        // Successful MFA verification
        const officer = OFFICERS[selectedOfficerKey] || OFFICERS.rajesh;
        onLoginSuccess(officer);
        onNavigate('dashboard');
        return;
      }
      // Normal login
      const officer = OFFICERS[selectedOfficerKey] || OFFICERS.rajesh;
      onLoginSuccess(officer);
      onNavigate('dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex flex-col justify-between">
      {/* Top Banner */}
      <div className="bg-[#000616] text-white py-1.5 px-4 text-center text-[11px] font-medium tracking-wide flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        <span>NATIONAL INFORMATICS CENTRE SECURE GATEWAY (NIC-SG-DLM-01) • FIPS 140-2 LEVEL 3 AUDITED</span>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto p-4 md:p-8 lg:p-12 items-center justify-center gap-8 lg:gap-16">
        {/* Left Side: Sovereign Branding & Legal Mandate */}
        <div className="flex-1 max-w-xl text-left">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={ASSETS.emblemLogo}
              alt="Government of India"
              className="w-20 h-20 object-contain drop-shadow-md"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="text-xs uppercase font-bold tracking-widest text-[#3f5f92]">
                Government of India
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-[#000616] tracking-tight uppercase font-display">
                Legal Metrology Enforcement Wing
              </h1>
              <p className="text-xs text-[#44474d] mt-0.5">
                Department of Consumer Affairs • Ministry of Consumer Affairs, Food & Public Distribution
              </p>
            </div>
          </div>

          <div className="space-y-4 bg-white/70 backdrop-blur-xs p-6 rounded-md border border-[#c5c6ce]/60 shadow-xs text-xs">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#3f5f92] text-[20px] flex-shrink-0 mt-0.5">
                balance
              </span>
              <div>
                <span className="font-bold text-[#000616]">Statutory Authority & Jurisdiction:</span>
                <p className="text-[#44474d] text-[11px] leading-relaxed mt-0.5">
                  Operated under statutory powers vested by The Legal Metrology Act, 2009 and The Legal Metrology (Packaged Commodities) Rules, 2011. Unauthorized access or interception is strictly punishable under Section 43 & Section 66 of the Information Technology Act, 2000.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-3 border-t border-[#eceef0]">
              <span className="material-symbols-outlined text-[#3f5f92] text-[20px] flex-shrink-0 mt-0.5">
                key
              </span>
              <div>
                <span className="font-bold text-[#000616]">Hardware-Bound DSC Token:</span>
                <p className="text-[#44474d] text-[11px] leading-relaxed mt-0.5">
                  All field enforcement actions, seizure memos (Form 4), and compounding notices require cryptographic signing using official FIPS 140-2 tokens or Aadhaar e-Sign infrastructure.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-3 border-t border-[#eceef0]">
              <span className="material-symbols-outlined text-[#3f5f92] text-[20px] flex-shrink-0 mt-0.5">
                campaign
              </span>
              <div>
                <span className="font-bold text-[#000616]">Active Enforcement Directives:</span>
                <p className="text-[#44474d] text-[11px] leading-relaxed mt-0.5">
                  State-wide special drive on Over-stickering (Dual MRPs), Font Size compliance on font-facing packages, and tare weight deduction at bakeries and sweetmeats.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Preset Pickers for Testing Convenience */}
          <div className="mt-6 pt-4 border-t border-[#c5c6ce]/60">
            <div className="text-[11px] font-bold text-[#44474d] uppercase tracking-wider mb-2">
              Select Officer Cadre for Instant Authentication:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {Object.entries(OFFICERS).map(([key, off]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSelectPreset(key)}
                  className={`p-2.5 rounded-sm border text-left transition-all ${
                    selectedOfficerKey === key
                      ? 'bg-[#0f1f38] text-white border-[#0f1f38] shadow-sm'
                      : 'bg-white hover:bg-[#eceef0] border-[#c5c6ce] text-[#191c1e]'
                  }`}
                >
                  <div className="font-bold text-xs truncate">{off.name.split(',')[0]}</div>
                  <div className={`text-[10px] truncate ${selectedOfficerKey === key ? 'text-[#a5c5fe]' : 'text-[#3f5f92]'}`}>
                    {off.role}
                  </div>
                  <div className={`text-[9px] font-code-num truncate mt-0.5 ${selectedOfficerKey === key ? 'text-[#b8c7e7]' : 'text-[#75777e]'}`}>
                    {off.id}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Security Gateway Form */}
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg border border-[#c5c6ce] shadow-xl p-6 md:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#eceef0] mb-6">
              <div>
                <h2 className="text-base font-bold text-[#000616] uppercase tracking-wide font-display">
                  Officer Identity Gateway
                </h2>
                <p className="text-xs text-[#44474d]">
                  Statutory Cadre Verification
                </p>
              </div>
              <span className="material-symbols-outlined text-[#3f5f92] text-[28px]">
                shield_person
              </span>
            </div>

            {/* Alert Simulator Banner if not normal */}
            {simState === 'invalid' && (
              <div className="mb-5 p-3 bg-[#ffdad6] border border-[#ba1a1a] rounded-sm text-xs text-[#93000a] flex items-start gap-2 animate-toast">
                <span className="material-symbols-outlined text-[18px] flex-shrink-0 mt-0.5">error</span>
                <div>
                  <div className="font-bold">AUTHENTICATION REJECTED</div>
                  <div className="text-[11px] mt-0.5">
                    Cadre service code or departmental security key does not match NIC central directory. Security event logged pursuant to IT Act 2000.
                  </div>
                </div>
              </div>
            )}

            {simState === 'inactive' && (
              <div className="mb-5 p-3 bg-amber-100 border border-amber-500 rounded-sm text-xs text-amber-900 flex items-start gap-2 animate-toast">
                <span className="material-symbols-outlined text-[18px] flex-shrink-0 mt-0.5">warning</span>
                <div>
                  <div className="font-bold">CADRE STATUS: TRANSFER REVIEW</div>
                  <div className="text-[11px] mt-0.5">
                    Officer cadre credentials are under administrative transit audit. Contact Directorate of Legal Metrology, Chennai.
                  </div>
                </div>
              </div>
            )}

            {simState === 'expired' && (
              <div className="mb-5 p-3 bg-[#e0e3e5] border border-[#75777e] rounded-sm text-xs text-[#191c1e] flex items-start gap-2 animate-toast">
                <span className="material-symbols-outlined text-[18px] flex-shrink-0 mt-0.5">schedule</span>
                <div>
                  <div className="font-bold">SESSION TIMEOUT: TOKEN EXPIRED</div>
                  <div className="text-[11px] mt-0.5">
                    Your previous FIPS cryptographic session expired due to 15-minute inactivity policy. Please re-authenticate.
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Cadre Service Code */}
              <div>
                <label className="block text-xs font-bold text-[#191c1e] uppercase tracking-wider mb-1">
                  Cadre Service Code / Officer ID
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#75777e] text-[18px]">
                    badge
                  </span>
                  <input
                    type="text"
                    value={serviceCode}
                    onChange={(e) => setServiceCode(e.target.value)}
                    required
                    className="w-full bg-[#f7f9fb] border border-[#c5c6ce] text-[#000616] text-xs font-code-num pl-10 pr-3 py-2.5 rounded-sm focus:outline-hidden focus:border-[#3f5f92] focus:bg-white"
                    placeholder="e.g. LMO-TN-2024-8841"
                  />
                </div>
              </div>

              {/* Departmental Security Key */}
              <div>
                <label className="block text-xs font-bold text-[#191c1e] uppercase tracking-wider mb-1">
                  Departmental Security Key
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#75777e] text-[18px]">
                    key
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={securityKey}
                    onChange={(e) => setSecurityKey(e.target.value)}
                    required
                    className="w-full bg-[#f7f9fb] border border-[#c5c6ce] text-[#000616] text-xs font-code-num pl-10 pr-10 py-2.5 rounded-sm focus:outline-hidden focus:border-[#3f5f92] focus:bg-white"
                    placeholder="Enter security key"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-[#75777e] hover:text-[#000616]"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* MFA Step Container if SimState === mfa */}
              {simState === 'mfa' && (
                <div className="p-4 bg-[#eceef0] rounded-sm border border-[#c5c6ce] space-y-2 animate-toast">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#000616] uppercase">
                      6-Digit Aadhaar OTP
                    </label>
                    <span className="text-[10px] text-[#3f5f92] font-code-num font-bold">
                      Expires in 01:42
                    </span>
                  </div>
                  <p className="text-[11px] text-[#44474d]">
                    OTP dispatched to registered Aadhaar mobile (**-****-4402)
                  </p>
                  <div className="flex items-center justify-between gap-1.5 pt-1">
                    {otpValues.map((digit, idx) => (
                      <input
                        key={idx}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => {
                          const next = [...otpValues];
                          next[idx] = e.target.value;
                          setOtpValues(next);
                        }}
                        className="w-10 h-10 text-center text-sm font-bold font-code-num bg-white border border-[#c5c6ce] rounded-sm focus:border-[#0f1f38] focus:outline-hidden"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Checkbox and Help */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberWorkstation}
                    onChange={(e) => setRememberWorkstation(e.target.checked)}
                    className="rounded-xs border-[#c5c6ce] text-[#0f1f38] focus:ring-0"
                  />
                  <span className="text-xs text-[#44474d]">Remember Workstation Device</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('For security key resets, contact NIC Coimbatore Helpdesk: 0422-2248900')}
                  className="text-xs text-[#3f5f92] hover:underline"
                >
                  Forgot Key?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#000616] hover:bg-[#0f1f38] text-white text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-sm transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                    <span>Verifying FIPS Credentials...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">vpn_key</span>
                    <span>
                      {simState === 'mfa' ? 'Authorize e-Sign Session' : 'Verify Credentials & Access Gateway'}
                    </span>
                  </>
                )}
              </button>
            </form>

            {/* Security State Simulator Controls */}
            <div className="mt-6 pt-4 border-t border-[#eceef0]">
              <div className="text-[10px] uppercase font-bold text-[#75777e] tracking-wider mb-2 flex items-center justify-between">
                <span>Security Gateway State Simulator:</span>
                <span className="text-emerald-600 font-code-num">TEST HARNESS</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(['normal', 'mfa', 'invalid', 'inactive', 'expired'] as SecurityState[]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setSimState(st)}
                    className={`px-2 py-1 text-[10px] font-bold rounded-xs uppercase tracking-wider border transition-colors ${
                      simState === st
                        ? 'bg-[#0f1f38] text-white border-[#0f1f38]'
                        : 'bg-[#f7f9fb] hover:bg-[#e0e3e5] text-[#44474d] border-[#c5c6ce]'
                    }`}
                  >
                    {st === 'normal' ? '1. Normal' : st === 'mfa' ? '2. MFA Step' : st === 'invalid' ? '3. Invalid' : st === 'inactive' ? '4. Inactive' : '5. Expired'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sovereign Footer */}
      <footer className="bg-white border-t border-[#c5c6ce] py-3 px-4 text-center text-xs text-[#75777e]">
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
          <span>© 2026 Department of Consumer Affairs, Government of India</span>
          <span>•</span>
          <span>National Informatics Centre (NIC)</span>
          <span>•</span>
          <span>The Legal Metrology Act, 2009 (No. 1 of 2010)</span>
        </div>
      </footer>
    </div>
  );
};
