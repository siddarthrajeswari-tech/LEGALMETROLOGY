import React from 'react';
import { NavigationPath, OfficerProfile } from '../types';

interface SidebarProps {
  currentPath: NavigationPath;
  onNavigate: (path: NavigationPath) => void;
  currentOfficer: OfficerProfile;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onLogout: () => void;
}

interface NavItem {
  id: NavigationPath;
  label: string;
  icon: string;
  badge?: number | string;
  badgeColor?: string;
  category?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath,
  onNavigate,
  currentOfficer,
  isOpenMobile,
  onCloseMobile,
  onLogout,
}) => {
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', category: 'ENFORCEMENT' },
    { id: 'field-inspections', label: 'Field Inspections', icon: 'verified', badge: 4, category: 'ENFORCEMENT' },
    { id: 'product-verification', label: 'Product Verification', icon: 'scale', category: 'ENFORCEMENT' },
    { id: 'inspection-review', label: 'Inspection Review', icon: 'rate_review', badge: 12, category: 'SUPERVISORY' },
    { id: 'regional-monitoring', label: 'Regional Monitoring', icon: 'map', category: 'SUPERVISORY' },
    { id: 'state-overview', label: 'State Overview', icon: 'monitoring', category: 'DIRECTORATE' },
    { id: 'case-management', label: 'Case Management', icon: 'gavel', badge: 7, category: 'STATUTORY' },
    { id: 'reports-audit-trail', label: 'Reports & Audit Trail', icon: 'description', category: 'STATUTORY' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications', badge: 2, category: 'SYSTEM' },
    { id: 'security-profile', label: 'Security & Profile', icon: 'shield_lock', category: 'SYSTEM' },
  ];

  const handleItemClick = (path: NavigationPath) => {
    onNavigate(path);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 lg:top-[57px] left-0 h-screen lg:h-[calc(100vh-57px)] w-64 bg-[#000616] text-[#ffffff] z-50 flex flex-col justify-between transition-transform duration-200 border-r border-[#112032] ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top: Current Officer Jurisdiction Node */}
        <div className="p-4 border-b border-[#112032]">
          <div className="bg-[#0f1f38] p-3 rounded-sm border border-[#7887a5]/30">
            <div className="text-[10px] text-[#7887a5] uppercase tracking-wider font-bold mb-1 flex items-center justify-between">
              <span>Jurisdiction Node</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            </div>
            <div className="text-xs font-semibold text-[#ffffff] truncate">
              {currentOfficer.jurisdiction.split('•')[1]?.trim() || currentOfficer.jurisdiction}
            </div>
            <div className="text-[10px] text-[#b8c7e7] font-code-num mt-1 flex items-center justify-between">
              <span>CADRE: {currentOfficer.id.split('-')[0] || 'LMO'}</span>
              <span className="bg-[#112032] px-1.5 py-0.2 rounded text-[9px] text-[#d6e3ff]">
                FIPS 140-2
              </span>
            </div>
          </div>
        </div>

        {/* Middle Navigation Links */}
        <div className="flex-1 overflow-y-auto py-2 px-3 space-y-1">
          {navItems.map((item, idx) => {
            const isActive = currentPath === item.id;
            const showCategoryHeader =
              idx === 0 || navItems[idx - 1].category !== item.category;

            return (
              <React.Fragment key={item.id}>
                {showCategoryHeader && (
                  <div className="px-3 pt-3 pb-1 text-[9px] font-bold text-[#7887a5] tracking-widest uppercase font-code-num">
                    {item.category}
                  </div>
                )}
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xs text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-[#0f1f38] text-[#ffffff] font-semibold border-l-3 border-[#a5c5fe]'
                      : 'text-[#d8dadc] hover:bg-[#112032] hover:text-[#ffffff]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`material-symbols-outlined text-[18px] transition-colors ${
                        isActive
                          ? 'text-[#a5c5fe]'
                          : 'text-[#7887a5] group-hover:text-[#ffffff]'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`px-1.5 py-0.5 text-[10px] font-bold rounded-sm font-code-num ${
                        isActive
                          ? 'bg-[#a5c5fe] text-[#000616]'
                          : 'bg-[#112032] text-[#d6e3ff]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {/* Bottom System & Terminal Node */}
        <div className="p-3 border-t border-[#112032] bg-[#000714]">
          <div className="flex items-center justify-between text-[10px] text-[#7887a5] font-code-num mb-2">
            <span>VERSION v4.1.8-ST</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              ONLINE
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => handleItemClick('login')}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 bg-[#112032] hover:bg-[#0f1f38] text-[#d6e3ff] rounded-xs text-[11px] font-medium transition-colors border border-[#7887a5]/20"
              title="Test Login Screen & Security Gateway"
            >
              <span className="material-symbols-outlined text-[14px]">lock_reset</span>
              <span>Gate SIM</span>
            </button>

            <button
              onClick={onLogout}
              className="flex items-center justify-center p-1.5 bg-[#ffdad6]/10 hover:bg-[#ba1a1a] text-[#ffdad6] hover:text-white rounded-xs transition-colors"
              title="Terminate Current Session"
            >
              <span className="material-symbols-outlined text-[16px]">power_settings_new</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
