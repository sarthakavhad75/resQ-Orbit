import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Incident, PriorityLevel, AccessibilityStatus, VerificationStatus } from '../../types/disaster';
import { Save, AlertTriangle, ShieldCheck, Edit3 } from 'lucide-react';

interface IncidentEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: Incident | null;
  onSave: (updated: Incident) => void;
}

export const IncidentEditModal: React.FC<IncidentEditModalProps> = ({
  isOpen,
  onClose,
  incident,
  onSave
}) => {
  if (!incident) return null;

  const [title, setTitle] = useState(incident.title);
  const [suspectedDamage, setSuspectedDamage] = useState(incident.suspectedDamage);
  const [estimatedPeopleAffected, setEstimatedPeopleAffected] = useState(incident.estimatedPeopleAffected);
  const [accessibility, setAccessibility] = useState<AccessibilityStatus>(incident.accessibility);
  const [priorityLevel, setPriorityLevel] = useState<PriorityLevel>(incident.priorityLevel);
  const [priorityScore, setPriorityScore] = useState<number>(incident.priorityScore);
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>(incident.verificationStatus);
  const [notes, setNotes] = useState(incident.notes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...incident,
      title,
      suspectedDamage,
      estimatedPeopleAffected: Number(estimatedPeopleAffected),
      accessibility,
      priorityLevel,
      priorityScore: Number(priorityScore),
      verificationStatus,
      notes,
      lastUpdated: 'Just now (Commander Override)'
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit Incident: ${incident.id}`}
      subtitle="Manual priority override and field observation amendment"
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block text-slate-400 font-mono mb-1">Incident Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-space-950 border border-slate-700 rounded-lg p-2.5 text-white font-sans focus:border-cyan-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-slate-400 font-mono mb-1">Damage Description</label>
          <textarea
            value={suspectedDamage}
            onChange={(e) => setSuspectedDamage(e.target.value)}
            rows={3}
            className="w-full bg-space-950 border border-slate-700 rounded-lg p-2.5 text-white font-sans focus:border-cyan-400 focus:outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-400 font-mono mb-1">Est. People Affected</label>
            <input
              type="number"
              value={estimatedPeopleAffected}
              onChange={(e) => setEstimatedPeopleAffected(Number(e.target.value))}
              className="w-full bg-space-950 border border-slate-700 rounded-lg p-2 text-white font-mono focus:border-cyan-400 focus:outline-none"
              min={0}
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 font-mono mb-1">Accessibility Status</label>
            <select
              value={accessibility}
              onChange={(e) => setAccessibility(e.target.value as AccessibilityStatus)}
              className="w-full bg-space-950 border border-slate-700 rounded-lg p-2 text-white font-mono focus:border-cyan-400 focus:outline-none"
            >
              <option value="Accessible">Accessible</option>
              <option value="Partially Blocked">Partially Blocked</option>
              <option value="Impassable">Impassable</option>
              <option value="Aerial Only">Aerial Only</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-space-950 border border-slate-800">
          <div>
            <label className="block text-slate-400 font-mono mb-1">Priority Override</label>
            <select
              value={priorityLevel}
              onChange={(e) => {
                const val = e.target.value as PriorityLevel;
                setPriorityLevel(val);
                if (val === 'Critical') setPriorityScore(95);
                else if (val === 'High') setPriorityScore(75);
                else if (val === 'Medium') setPriorityScore(50);
                else setPriorityScore(25);
              }}
              className="w-full bg-space-900 border border-slate-700 rounded-lg p-1.5 text-white font-mono focus:border-cyan-400"
            >
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 font-mono mb-1">Score (0-100)</label>
            <input
              type="number"
              value={priorityScore}
              onChange={(e) => setPriorityScore(Number(e.target.value))}
              min={0}
              max={100}
              className="w-full bg-space-900 border border-slate-700 rounded-lg p-1.5 text-cyan-400 font-mono font-bold focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-mono mb-1">Verification Status</label>
            <select
              value={verificationStatus}
              onChange={(e) => setVerificationStatus(e.target.value as VerificationStatus)}
              className="w-full bg-space-900 border border-slate-700 rounded-lg p-1.5 text-white font-mono focus:border-cyan-400"
            >
              <option value="Field-Verified">Field-Verified</option>
              <option value="AI-Flagged">AI-Flagged</option>
              <option value="Provisional">Provisional</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-slate-400 font-mono mb-1">Commander Operational Notes</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g., Confirmed 4 survivors pulled from stairwell void; heavy shoring deployed."
            className="w-full bg-space-950 border border-slate-700 rounded-lg p-2.5 text-white font-sans focus:border-cyan-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-space-950 hover:bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-space-950 font-bold font-display text-xs tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>Save Incident Changes</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
