import React, { useState } from 'react';
import { DisasterProvider, useDisaster } from './context/DisasterContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { LiveTicker } from './components/layout/LiveTicker';
import { Footer } from './components/layout/Footer';
import { AreaSelectorModal } from './components/layout/AreaSelectorModal';
import { TeamAssignModal } from './components/operations/TeamAssignModal';
import { IncidentEditModal } from './components/operations/IncidentEditModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { SatelliteMapPage } from './pages/SatelliteMapPage';
import { AIDamageAnalysisPage } from './pages/AIDamageAnalysisPage';
import { IsolatedCommunitiesPage } from './pages/IsolatedCommunitiesPage';
import { RescueOperationsPage } from './pages/RescueOperationsPage';
import { ReportsAlertsPage } from './pages/ReportsAlertsPage';
import { AboutProjectPage } from './pages/AboutProjectPage';

import { Incident } from './types/disaster';

const MainAppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [isZoneSelectorOpen, setIsZoneSelectorOpen] = useState<boolean>(false);
  const [assignIncidentId, setAssignIncidentId] = useState<string | null>(null);
  const [editingIncident, setEditingIncident] = useState<Incident | null>(null);

  const { incidents, rescueTeams, assignTeamToIncident, updateIncident, setSelectedIncident } = useDisaster();

  const incidentToAssign = incidents.find(i => i.id === assignIncidentId) || null;

  const handleSelectIncidentAndNavigateToMap = (incident: Incident) => {
    setSelectedIncident(incident);
    setCurrentPage('map');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={(page) => setCurrentPage(page)} />;
      case 'dashboard':
        return (
          <DashboardPage
            onNavigate={(page) => setCurrentPage(page)}
            onSelectIncident={handleSelectIncidentAndNavigateToMap}
          />
        );
      case 'map':
        return (
          <SatelliteMapPage
            onOpenTeamAssign={(id) => setAssignIncidentId(id)}
            onOpenEditIncident={(inc) => setEditingIncident(inc)}
          />
        );
      case 'ai-analysis':
        return <AIDamageAnalysisPage onNavigate={(page) => setCurrentPage(page)} />;
      case 'connectivity':
        return <IsolatedCommunitiesPage />;
      case 'operations':
        return <RescueOperationsPage />;
      case 'reports':
        return <ReportsAlertsPage />;
      case 'about':
        return <AboutProjectPage />;
      default:
        return <LandingPage onNavigate={(page) => setCurrentPage(page)} />;
    }
  };

  return (
    <div className="min-h-screen bg-space-950 text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page)}
        onOpenZoneSelector={() => setIsZoneSelectorOpen(true)}
      />

      {/* Real-time ticker bar on operational pages */}
      {currentPage !== 'landing' && (
        <LiveTicker onNavigateToReports={() => setCurrentPage('reports')} />
      )}

      {/* Main Body with Sidebar */}
      <div className="flex-1 flex">
        {/* Sidebar on desktop / tablet */}
        {currentPage !== 'landing' && (
          <div className="hidden md:block">
            <Sidebar
              currentPage={currentPage}
              onNavigate={(page) => setCurrentPage(page)}
            />
          </div>
        )}

        {/* Dynamic Page Viewport */}
        <main className={`flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden ${
          currentPage === 'landing' ? 'max-w-full px-0 py-0' : ''
        }`}>
          {renderPage()}
        </main>
      </div>

      {/* Footer */}
      <Footer onNavigate={(page) => setCurrentPage(page)} />

      {/* Global Modals */}
      <AreaSelectorModal
        isOpen={isZoneSelectorOpen}
        onClose={() => setIsZoneSelectorOpen(false)}
      />

      <TeamAssignModal
        isOpen={!!assignIncidentId}
        onClose={() => setAssignIncidentId(null)}
        incident={incidentToAssign}
        rescueTeams={rescueTeams}
        onConfirmAssign={(incId, teamName) => assignTeamToIncident(incId, teamName)}
      />

      <IncidentEditModal
        isOpen={!!editingIncident}
        onClose={() => setEditingIncident(null)}
        incident={editingIncident}
        onSave={(updated) => updateIncident(updated)}
      />
    </div>
  );
};

export function App() {
  return (
    <DisasterProvider>
      <MainAppContent />
    </DisasterProvider>
  );
}

export default App;
