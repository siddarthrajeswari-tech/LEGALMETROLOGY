import React, { useState } from 'react';
import { OfficerProfile, NavigationPath, ToastMessage, FieldInspectionTask } from './types';
import { OFFICERS } from './data/mockData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { StatutoryBanner } from './components/StatutoryBanner';
import { ToastContainer } from './components/Toast';

import { LoginScreen } from './screens/LoginScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { FieldInspectionsScreen } from './screens/FieldInspectionsScreen';
import { ProductVerificationScreen } from './screens/ProductVerificationScreen';
import { InspectionReviewScreen } from './screens/InspectionReviewScreen';
import { StateOverviewScreen } from './screens/StateOverviewScreen';
import { CaseManagementScreen } from './screens/CaseManagementScreen';
import { RegionalMonitoringScreen } from './screens/RegionalMonitoringScreen';
import { ReportsAuditScreen } from './screens/ReportsAuditScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { SecurityProfileScreen } from './screens/SecurityProfileScreen';

export default function App() {
  const [currentOfficer, setCurrentOfficer] = useState<OfficerProfile>(OFFICERS.rajesh);
  const [currentPath, setCurrentPath] = useState<NavigationPath>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (
    title: string,
    description?: string,
    type: 'info' | 'success' | 'warning' | 'error' = 'info'
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleLogout = () => {
    addToast('Session Safely Terminated', 'FIPS cryptographic token unmounted.', 'info');
    setCurrentPath('login');
  };

  const handleLoginSuccess = (officer: OfficerProfile) => {
    setCurrentOfficer(officer);
    addToast(
      'Officer Authenticated',
      `Welcome, ${officer.name}. Hardware token validated.`,
      'success'
    );
  };

  // If on login screen, render standalone login
  if (currentPath === 'login') {
    return (
      <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e]">
        <LoginScreen
          onLoginSuccess={handleLoginSuccess}
          onNavigate={(path) => setCurrentPath(path)}
        />
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] flex flex-col selection:bg-[#a5c5fe]/40">
      {/* Top Sovereign Header */}
      <Header
        currentOfficer={currentOfficer}
        onSelectOfficer={(officer) => {
          setCurrentOfficer(officer);
          addToast('Cadre Role Switched', `Active identity set to ${officer.name}.`, 'info');
          if (officer.role === 'Assistant Controller' && currentPath === 'dashboard') {
            setCurrentPath('inspection-review');
          } else if (officer.role === 'State Controller of Legal Metrology' && currentPath === 'dashboard') {
            setCurrentPath('state-overview');
          }
        }}
        onNavigate={(path) => setCurrentPath(path)}
        onLogout={handleLogout}
      />

      {/* Mandatory Statutory Bulletin Bar */}
      <StatutoryBanner
        onAction={() => {
          setCurrentPath('notifications');
        }}
      />

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Navigation Sidebar */}
        <Sidebar
          currentPath={currentPath}
          onNavigate={(path) => setCurrentPath(path)}
          currentOfficer={currentOfficer}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          onLogout={handleLogout}
        />

        {/* Scrollable Main Screen Container */}
        <main className="flex-1 overflow-y-auto flex flex-col justify-between min-w-0">
          {/* Mobile Top Bar Trigger */}
          <div className="lg:hidden bg-white border-b border-[#c5c6ce] px-4 py-2 flex items-center justify-between shadow-xs">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="flex items-center gap-2 text-xs font-bold text-[#000616] p-1 rounded-xs hover:bg-[#eceef0]"
            >
              <span className="material-symbols-outlined text-[20px]">menu</span>
              <span>Navigation Menu</span>
            </button>
            <span className="text-[11px] font-code-num text-[#3f5f92] font-bold">
              {currentPath.toUpperCase()}
            </span>
          </div>

          {/* Active Screen Rendering */}
          <div className="flex-1">
            {currentPath === 'dashboard' && (
              <DashboardScreen
                currentOfficer={currentOfficer}
                onNavigate={(path) => setCurrentPath(path)}
                onShowToast={addToast}
                onStartSpecificInspection={() => setCurrentPath('field-inspections')}
              />
            )}

            {currentPath === 'field-inspections' && (
              <FieldInspectionsScreen
                currentOfficer={currentOfficer}
                onNavigate={(path) => setCurrentPath(path)}
                onShowToast={addToast}
              />
            )}

            {currentPath === 'product-verification' && (
              <ProductVerificationScreen
                currentOfficer={currentOfficer}
                onNavigate={(path) => setCurrentPath(path)}
                onShowToast={addToast}
              />
            )}

            {currentPath === 'inspection-review' && (
              <InspectionReviewScreen
                currentOfficer={currentOfficer}
                onNavigate={(path) => setCurrentPath(path)}
                onShowToast={addToast}
              />
            )}

            {currentPath === 'regional-monitoring' && (
              <RegionalMonitoringScreen
                currentOfficer={currentOfficer}
                onNavigate={(path) => setCurrentPath(path)}
                onShowToast={addToast}
              />
            )}

            {currentPath === 'state-overview' && (
              <StateOverviewScreen
                currentOfficer={currentOfficer}
                onNavigate={(path) => setCurrentPath(path)}
                onShowToast={addToast}
              />
            )}

            {currentPath === 'case-management' && (
              <CaseManagementScreen
                currentOfficer={currentOfficer}
                onNavigate={(path) => setCurrentPath(path)}
                onShowToast={addToast}
              />
            )}

            {currentPath === 'reports-audit-trail' && (
              <ReportsAuditScreen
                currentOfficer={currentOfficer}
                onNavigate={(path) => setCurrentPath(path)}
                onShowToast={addToast}
              />
            )}

            {currentPath === 'notifications' && (
              <NotificationsScreen
                currentOfficer={currentOfficer}
                onNavigate={(path) => setCurrentPath(path)}
                onShowToast={addToast}
              />
            )}

            {currentPath === 'security-profile' && (
              <SecurityProfileScreen
                currentOfficer={currentOfficer}
                onNavigate={(path) => setCurrentPath(path)}
                onShowToast={addToast}
              />
            )}
          </div>

          {/* Bottom Sovereign Footer */}
          <footer className="bg-white border-t border-[#c5c6ce] py-3 px-4 md:px-8 mt-8 text-xs text-[#75777e]">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
              <div>
                © 2026 Government of India • Department of Consumer Affairs • Legal Metrology Act, 2009
              </div>
              <div className="flex items-center gap-3 font-code-num text-[10px]">
                <span>NODE: CBE-CNTRL-DOSS-01</span>
                <span>•</span>
                <span className="text-emerald-700 font-bold">NIC TLS 1.3 ENCRYPTED</span>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Global Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

