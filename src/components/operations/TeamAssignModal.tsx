import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { RescueTeam, Incident } from '../../types/disaster';
import { Truck, ShieldCheck, Users, Radio, Wrench, CheckCircle } from 'lucide-react';

interface TeamAssignModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: Incident | null;
  rescueTeams: RescueTeam[];
  onConfirmAssign: (incidentId: string, teamName: string) => void;
}

export const TeamAssignModal: React.FC<TeamAssignModalProps> = ({
  isOpen,
  onClose,
  incident,
  rescueTeams,
  onConfirmAssign
}) => {
  const [selectedTeamName, setSelectedTeamName] = useState<string>('');

  if (!incident) return null;

  const handleDispatch = () => {
    if (selectedTeamName) {
      onConfirmAssign(incident.id, selectedTeamName);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Dispatch Rescue Unit"
      subtitle={`Assigning specialized task force to incident: ${incident.id}`}
      maxWidth="xl"
    >
      <div className="space-y-4">
        {/* Incident Summary Card */}
        <div className="p-3.5 rounded-xl bg-space-950 border border-slate-800 space-y-1">
          <div className="font-bold text-white text-sm font-display">{incident.title}</div>
          <div className="text-xs text-slate-400 font-mono">
            {incident.locationName} • {incident.estimatedPeopleAffected.toLocaleString()} people affected • Priority: {incident.priorityLevel} ({incident.priorityScore})
          </div>
        </div>

        {/* Rescue Teams List */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
            Available Emergency Response Units
          </label>

          <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
            {rescueTeams.map((team) => {
              const isSelected = selectedTeamName === team.name;
              return (
                <div
                  key={team.id}
                  onClick={() => setSelectedTeamName(team.name)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-950/80 border-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.2)]'
                      : 'bg-space-950/70 border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-cyan-400" />
                        <h5 className="font-bold text-sm text-white font-display">{team.name}</h5>
                      </div>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{team.agency}</p>
                    </div>

                    <div className="text-right font-mono text-[11px]">
                      <span className={`px-2 py-0.5 rounded-full border ${
                        team.status === 'Available' ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40' :
                        team.status === 'In Transit' ? 'bg-blue-950 text-blue-300 border-blue-500/40' :
                        'bg-amber-950 text-amber-300 border-amber-500/40'
                      }`}>
                        {team.status}
                      </span>
                      <div className="text-slate-400 mt-1 flex items-center justify-end gap-1">
                        <Users className="w-3 h-3" />
                        <span>{team.personnelCount} Personnel</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="truncate max-w-[280px]">Location: {team.currentLocation}</span>
                    <span className="text-cyan-300">{team.type}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-space-950 hover:bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDispatch}
            disabled={!selectedTeamName}
            className={`px-5 py-2 rounded-xl font-bold font-display text-xs tracking-wider uppercase transition-all flex items-center gap-2 ${
              selectedTeamName
                ? 'bg-cyan-500 hover:bg-cyan-400 text-space-950 shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                : 'bg-space-800 text-slate-500 border border-slate-700 cursor-not-allowed'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Confirm & Dispatch Team</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
