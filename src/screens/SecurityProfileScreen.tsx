import React, { useState } from 'react';
import { OfficerProfile, NavigationPath } from '../types';
import { ASSETS } from '../data/mockData';

interface SecurityProfileScreenProps {
  currentOfficer: OfficerProfile;
  onNavigate: (path: NavigationPath) => void;
  onShowToast: (title: string, description?: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
}

export const SecurityProfileScreen: React.FC<SecurityProfileScreenProps> = ({
  currentOfficer,
  onNavigate,
  onShowToast,
}) => {
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [fipsTokenStatus] = useState('Active / Level 3 Hardware Bound');
  const [offlineKeyStore] = useState('14 Cached Signatures');

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="bg-[#0f1f38] text-white rounded-lg p-5 md:p-6 border border-[#7887a5]/40 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest bg-[#a5c5fe] text-[#001b3d] px-2 py-0.5 rounded-xs font-code-num">
            NATIONAL INFORMATICS CENTRE SECURITY CREDENTIALS
          </span>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight font-display mt-1">
            Officer Credentials & FIPS 140-2 Token Profile
          </h1>
          <p className="text-xs text-[#d5e3fc] mt-1">
            Hardware security parameters, cryptographic signing credentials, and cadre jurisdiction record
          </p>
        </div>

        <button
          onClick={() => {
            onShowToast('Token Re-Synced', 'DSC cryptographic certificate re-verified with NIC Root CA.', 'success');
          }}
          className="bg-[#a5c5fe] hover:bg-[#d6e3ff] text-[#001b3d] text-xs font-bold px-3.5 py-2.5 rounded-sm flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-[18px]">key</span>
          <span>Re-Verify Hardware Token</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Officer Identity Card */}
        <div className="bg-white p-5 rounded-md border border-[#c5c6ce] shadow-xs space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-[#eceef0]">
            <img
              src={ASSETS.emblemLogo}
              alt="Emblem"
              className="w-12 h-12 object-contain"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="font-bold text-base text-[#000616]">{currentOfficer.name}</h3>
              <p className="text-xs text-[#3f5f92] font-semibold">{currentOfficer.role}</p>
              <p className="text-[10px] text-[#75777e] font-code-num">{currentOfficer.id}</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-[#eceef0]">
              <span className="text-[#44474d]">Official Badge No:</span>
              <span className="font-code-num font-bold text-[#000616]">{currentOfficer.badge}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#eceef0]">
              <span className="text-[#44474d]">Cadre Tier:</span>
              <span className="font-bold text-[#000616]">{currentOfficer.tier}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#eceef0]">
              <span className="text-[#44474d]">Territorial Jurisdiction:</span>
              <span className="text-right text-[#000616] max-w-xs">{currentOfficer.jurisdiction}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#44474d]">Aadhaar e-KYC Status:</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                <span>AUTHENTICATED (UIDAI)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Security & Cryptography Parameters */}
        <div className="bg-white p-5 rounded-md border border-[#c5c6ce] shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-[#000616] uppercase pb-2 border-b border-[#eceef0]">
            Cryptographic Token Hardware Parameters
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-[#f7f9fb] border border-[#c5c6ce] rounded-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-[#44474d]">Hardware FIPS Profile:</span>
                <span className="font-code-num font-bold text-emerald-800">{fipsTokenStatus}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-[#44474d]">RSA Key Length:</span>
                <span className="font-code-num">2048-bit (SHA-256 Digest)</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-[#44474d]">Offline Local Cache:</span>
                <span className="font-code-num text-[#3f5f92]">{offlineKeyStore}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="font-bold text-[#000616] block">Biometric Fingerprint Authentication</span>
                <span className="text-[11px] text-[#44474d]">Require optical sensor confirmation before Form IV sealing</span>
              </div>
              <input
                type="checkbox"
                checked={biometricsEnabled}
                onChange={(e) => setBiometricsEnabled(e.target.checked)}
                className="w-4 h-4 text-[#0f1f38] rounded-xs"
              />
            </div>

            <div className="pt-3 border-t border-[#eceef0]">
              <button
                onClick={() => onNavigate('login')}
                className="w-full bg-[#eceef0] hover:bg-[#e0e3e5] text-[#000616] font-bold text-xs py-2 rounded-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">lock_reset</span>
                <span>Test Security Login Screen</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
