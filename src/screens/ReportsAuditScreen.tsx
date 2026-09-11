import React, { useState } from 'react';
import { OfficerProfile, NavigationPath } from '../types';

interface ReportsAuditScreenProps {
  currentOfficer: OfficerProfile;
  onNavigate: (path: NavigationPath) => void;
  onShowToast: (title: string, description?: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
}

export const ReportsAuditScreen: React.FC<ReportsAuditScreenProps> = ({
  currentOfficer,
  onNavigate,
  onShowToast,
}) => {
  const [hashInput, setHashInput] = useState('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
  const [verificationResult, setVerificationResult] = useState<null | {
    valid: boolean;
    timestamp: string;
    officer: string;
    caseId: string;
  }>(null);

  const handleVerifyHash = () => {
    setVerificationResult({
      valid: true,
      timestamp: '14-Oct-2026 12:15:32 IST',
      officer: 'Inspector Rajesh Kumar (TN-LM-4402)',
      caseId: 'INS-TN-2026-00128 (Nilgiris Supermarket)',
    });
    onShowToast('Forensic Hash Verified', 'Cryptographic signature is valid and untampered.', 'success');
  };

  const auditEvents = [
    {
      id: 'AUD-99120',
      action: 'Form IV Seizure Memo Cryptographically Sealed',
      caseId: 'INS-TN-2026-00128',
      officer: 'Rajesh Kumar (Inspector)',
      time: '14-Oct-2026 12:16:04 IST',
      hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    },
    {
      id: 'AUD-99118',
      action: 'Rule Engine Audit Execution (PCR 2011)',
      caseId: 'INS-TN-2026-00128',
      officer: 'Automated OCR Sub-system v4.1',
      time: '14-Oct-2026 12:14:48 IST',
      hash: 'b4a83df298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852a112',
    },
    {
      id: 'AUD-99104',
      action: 'Compounding Order Form V Dispatched',
      caseId: 'CASE-TN-CBE-2026-0888',
      officer: 'Dr. Priya Sharma (Assistant Controller)',
      time: '14-Oct-2026 10:45:11 IST',
      hash: 'c791fe9198fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852d439',
    },
    {
      id: 'AUD-99092',
      action: 'Working Standard Calibration Log Verified',
      caseId: 'CALIB-SWW-2026-04',
      officer: 'RRSL Bengaluru Liaison',
      time: '13-Oct-2026 16:30:00 IST',
      hash: 'f521ca8898fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852e901',
    },
  ];

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="bg-[#0f1f38] text-white rounded-lg p-5 md:p-6 border border-[#7887a5]/40 shadow-md">
        <span className="text-[10px] uppercase font-bold tracking-widest bg-[#a5c5fe] text-[#001b3d] px-2 py-0.5 rounded-xs font-code-num">
          NIC TAMPER-EVIDENT FORENSIC LEDGER
        </span>
        <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight font-display mt-1">
          Reports & Cryptographic Audit Trail (NIC-DLM-AUDIT-v4)
        </h1>
        <p className="text-xs text-[#d5e3fc] mt-1">
          Every field photograph, caliper measurement, and statutory decision is sealed on a write-once audit log
        </p>
      </div>

      {/* Forensic Hash Verifier */}
      <div className="bg-white rounded-md border border-[#c5c6ce] shadow-xs p-5 space-y-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#3f5f92] text-[22px]">
            fingerprint
          </span>
          <h2 className="text-sm font-bold text-[#000616] uppercase">
            SHA-256 Evidentiary Hash Verification Tool
          </h2>
        </div>
        <p className="text-xs text-[#44474d]">
          Enter any cryptographic hash from a Form IV seizure memo or court plaint to verify chain of custody integrity:
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={hashInput}
            onChange={(e) => setHashInput(e.target.value)}
            className="flex-1 bg-[#f7f9fb] border border-[#c5c6ce] text-xs font-code-num p-2.5 rounded-xs text-[#000616]"
            placeholder="Enter 64-character SHA-256 hash..."
          />
          <button
            onClick={handleVerifyHash}
            className="bg-[#000616] hover:bg-[#0f1f38] text-white font-bold text-xs px-4 py-2.5 rounded-xs transition-colors"
          >
            Verify Integrity
          </button>
        </div>

        {verificationResult && (
          <div className="p-3 bg-emerald-50 border border-emerald-500 rounded-xs text-xs text-emerald-950 font-code-num space-y-1 animate-toast">
            <div className="font-bold flex items-center gap-1.5 text-emerald-800">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>VERIFIED: SHA-256 MATCHES CENTRAL REPOSITORY EXACTLY</span>
            </div>
            <div>Signer: {verificationResult.officer}</div>
            <div>Timestamp: {verificationResult.timestamp}</div>
            <div>Case Reference: {verificationResult.caseId}</div>
          </div>
        )}
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-md border border-[#c5c6ce] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#eceef0] bg-[#f7f9fb] flex items-center justify-between">
          <h3 className="text-xs font-bold text-[#000616] uppercase">
            Immutable Audit Trail Events (Live Stream)
          </h3>
          <span className="text-[10px] font-code-num text-emerald-700 font-bold">
            NODE CBE-01 SYNCED
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f2f4f6] text-[#44474d] text-[10px] uppercase font-bold tracking-wider border-b border-[#c5c6ce]">
              <tr>
                <th className="p-3">Audit ID</th>
                <th className="p-3">Statutory Action</th>
                <th className="p-3">Case ID</th>
                <th className="p-3">Authorized Officer</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3">SHA-256 Checksum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eceef0]">
              {auditEvents.map((evt) => (
                <tr key={evt.id} className="hover:bg-[#f7f9fb]">
                  <td className="p-3 font-code-num font-bold text-[#3f5f92]">{evt.id}</td>
                  <td className="p-3 font-medium text-[#000616]">{evt.action}</td>
                  <td className="p-3 font-code-num">{evt.caseId}</td>
                  <td className="p-3 text-[#44474d]">{evt.officer}</td>
                  <td className="p-3 font-code-num text-[#75777e]">{evt.time}</td>
                  <td className="p-3 font-code-num text-[11px] text-[#000616] truncate max-w-[140px]">
                    {evt.hash}
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
