import React from 'react';

interface StatutoryBannerProps {
  onDismiss?: () => void;
  onAction?: () => void;
}

export const StatutoryBanner: React.FC<StatutoryBannerProps> = ({ onAction }) => {
  return (
    <div className="bg-[#0f1f38] text-[#ffffff] border-b border-[#7887a5]/40 px-4 md:px-8 py-2 text-xs flex flex-wrap items-center justify-between gap-2 shadow-xs">
      <div className="flex items-center gap-2 overflow-hidden">
        <span className="bg-[#ffdad6] text-[#93000a] text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-xs tracking-wider flex-shrink-0">
          MANDATORY STATUTORY BULLETIN
        </span>
        <span className="text-[#d5e3fc] truncate font-medium">
          All field officers must execute compliance audits under amended Legal Metrology (Packaged Commodities) Rule 26 by month-end.
        </span>
        <span className="text-[#7887a5] font-code-num text-[11px] hidden xl:inline">
          REF: ENF-CIRCULAR-2024/09
        </span>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <button
          onClick={onAction}
          className="text-[#a5c5fe] hover:text-[#ffffff] underline font-medium text-[11px] flex items-center gap-1 transition-colors"
        >
          <span>View Circular</span>
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
