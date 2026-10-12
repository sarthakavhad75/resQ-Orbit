import React, { useState } from 'react';
import { useDisaster } from '../context/DisasterContext';
import { IncidentTable } from '../components/operations/IncidentTable';
import { TeamAssignModal } from '../components/operations/TeamAssignModal';
import { IncidentEditModal } from '../components/operations/IncidentEditModal';
import { NewIncidentModal } from '../components/operations/NewIncidentModal';
import { PriorityScoreCalculator } from '../components/priority/PriorityScoreCalculator';
import { IncidentDetailDrawer } from '../components/map/IncidentDetailDrawer';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { exportIncidentsToCSV } from '../services/exportService';
import { Incident } from '../types/disaster';
import { ShieldAlert, Calculator, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const RescueOperationsPage: React.FC = () => {
  const { 
    incidents, 
    activeZone, 
    rescueTeams, 
    selectedIncident, 
    setSelectedIncident,
    verifyIncident,
    assignTeamToIncident,
    resolveIncident,
    updateIncident,
    addNewIncident
  } = useDisaster();

  const [activeTab, setActiveTab] = useState<'roster' | 'calculator'>('roster');
  const [assignIncidentId, setAssignIncidentId] = useState<string | null>(null);
  const [editingIncident, setEditingIncident] = useState<Incident | null>(null);
  const [isNewIncidentOpen, setIsNewIncidentOpen] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const incidentToAssign = incidents.find(i => i.id === assignIncidentId) || null;

  const handleVerify = (id: string) => {
    verifyIncident(id);
    setFeedbackMessage(`Incident ${id} successfully marked as Field-Verified!`);
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  const handleConfirmAssign = (incidentId: string, teamName: string) => {
    assignTeamToIncident(incidentId, teamName);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 }
    });
    setFeedbackMessage(`Deployed ${teamName} to incident ${incidentId}!`);
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  const handleResolve = (id: string) => {
    resolveIncident(id);
    setFeedbackMessage(`Incident ${id} marked as Resolved.`);
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  return (
    <div className="space-y-6 pb-12">
      <DisclaimerBanner compact />

      {/* Header bar */}
      <div className="p-4 rounded-xl bg-space-900/90 border border-red-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-red-400 font-bold uppercase">
              TACTICAL INCIDENT MANAGEMENT CENTER
            </span>
            <span className="text-xs text-slate-400 font-mono">[{activeZone.region}]</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-0.5">
            Rescue Operations & Unit Dispatch
          </h2>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 bg-space-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab('roster')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'roster'
                ? 'bg-cyan-500 text-space-950 font-bold shadow-[0_0_10px_#00f2fe]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Incident Roster</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'calculator'
                ? 'bg-cyan-500 text-space-950 font-bold shadow-[0_0_10px_#00f2fe]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Priority Engine</span>
          </button>
        </div>
      </div>

      {feedbackMessage && (
        <div className="p-3.5 rounded-xl bg-cyan-950/80 border border-cyan-400 text-cyan-300 text-xs font-mono flex items-center gap-2 animate-in fade-in shadow-[0_0_15px_rgba(0,242,254,0.2)]">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Main Tab View */}
      {activeTab === 'roster' ? (
        <IncidentTable
          incidents={incidents}
          onSelectIncident={(inc) => setSelectedIncident(inc)}
          onVerify={handleVerify}
          onAssignTeam={(id) => setAssignIncidentId(id)}
          onResolve={handleResolve}
          onAddNew={() => setIsNewIncidentOpen(true)}
          onExportCSV={() => exportIncidentsToCSV(incidents, activeZone.name)}
        />
      ) : (
        <PriorityScoreCalculator />
      )}

      {/* Modals & Slide-over Drawers */}
      <TeamAssignModal
        isOpen={!!assignIncidentId}
        onClose={() => setAssignIncidentId(null)}
        incident={incidentToAssign}
        rescueTeams={rescueTeams}
        onConfirmAssign={handleConfirmAssign}
      />

      <IncidentEditModal
        isOpen={!!editingIncident}
        onClose={() => setEditingIncident(null)}
        incident={editingIncident}
        onSave={(updated) => updateIncident(updated)}
      />

      <NewIncidentModal
        isOpen={isNewIncidentOpen}
        onClose={() => setIsNewIncidentOpen(false)}
        activeZone={activeZone}
        onAddNewIncident={(data) => addNewIncident(data)}
      />

      <IncidentDetailDrawer
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
        onVerify={handleVerify}
        onAssignTeam={(id) => setAssignIncidentId(id)}
        onResolve={handleResolve}
        onEdit={(inc) => setEditingIncident(inc)}
      />
    </div>
  );
};
