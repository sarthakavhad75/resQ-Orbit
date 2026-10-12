import React from 'react';
import { Incident } from '../../types/disaster';
import { PriorityBadge } from '../common/PriorityBadge';
import { VerificationBadge, AccessibilityBadge } from '../common/StatusBadge';
import { 
  X, 
  MapPin, 
  Users, 
  Satellite, 
  Clock, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  AlertTriangle, 
  FileText,
  Activity,
  Calculator,
  Edit3
} from 'lucide-react';

interface IncidentDetailDrawerProps {
  incident: Incident | null;
  onClose: () => void;
  onVerify: (id: string) => void;
  onAssignTeam: (id: string) => void;
  onResolve: (id: string) => void;
  onEdit: (incident: Incident) => void;
}

export const IncidentDetailDrawer: React.FC<IncidentDetailDrawerProps> = ({
  incident,
  onClose,
  onVerify,
  onAssignTeam,
  onResolve,
  onEdit
}) => {
  if (!incident) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-space-950/95 backdrop-blur-xl border-l border-cyan-500/30 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col justify-between animate-in slide-in-from-right duration-300 overflow-hidden">
      {/* Drawer Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-space-900/80 flex items-start justify-between">
        <div className="space-y-1 pr-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-cyan-400 font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
              {incident.id}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {incident.disasterType}
            </span>
            {incident.isSimulated && (
              <span className="text-[10px] font-mono px-1.5 py-0.2 bg-slate-800 text-slate-400 rounded">
                Simulated
              </span>
            )}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white font-display leading-tight">
            {incident.title}
          </h3>
          <p className="text-xs text-slate-400 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>{incident.locationName}</span>
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Body */}
      <div className="p-4 sm:p-5 overflow-y-auto space-y-5 text-xs text-slate-300">
        {/* Priority & Status Badges Strip */}
        <div className="p-3.5 rounded-xl bg-space-900 border border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">Rescue Priority</div>
            <PriorityBadge level={incident.priorityLevel} score={incident.priorityScore} size="lg" />
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Verification</div>
            <VerificationBadge status={incident.verificationStatus} />
          </div>
        </div>

        {/* Damage Assessment Description */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Damage Assessment
          </h4>
          <div className="p-3 rounded-xl bg-space-900/80 border border-slate-800 text-slate-200 leading-relaxed font-sans text-xs">
            {incident.suspectedDamage}
          </div>
        </div>

        {/* Core Tactical Metrics */}
        <div className="grid grid-cols-2 gap-3 font-mono">
          <div className="p-3 rounded-xl bg-space-900/60 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <Users className="w-3 h-3 text-cyan-400" /> Est. Affected
            </span>
            <div className="text-base font-bold text-white">
              {incident.estimatedPeopleAffected.toLocaleString()} people
            </div>
          </div>

          <div className="p-3 rounded-xl bg-space-900/60 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <Activity className="w-3 h-3 text-emerald-400" /> Accessibility
            </span>
            <div className="text-xs font-semibold text-white">
              <AccessibilityBadge status={incident.accessibility} size="sm" />
            </div>
          </div>
        </div>

        {/* Priority Engine Transparent Breakdown */}
        <div className="p-3.5 rounded-xl bg-space-900 border border-cyan-500/20 space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5 uppercase">
              <Calculator className="w-3.5 h-3.5 text-cyan-400" /> Priority Engine Rationale
            </span>
            <span className="text-[10px] font-mono text-cyan-400 font-semibold">
              Score: {incident.priorityScore}/100
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center font-mono text-[10px]">
            <div className="bg-space-950 p-1.5 rounded border border-slate-800">
              <div className="text-slate-400">Pop (30%)</div>
              <div className="text-cyan-400 font-bold">{incident.scoreBreakdown.populationScore} pts</div>
            </div>
            <div className="bg-space-950 p-1.5 rounded border border-slate-800">
              <div className="text-slate-400">Damage (30%)</div>
              <div className="text-red-400 font-bold">{incident.scoreBreakdown.damageScore} pts</div>
            </div>
            <div className="bg-space-950 p-1.5 rounded border border-slate-800">
              <div className="text-slate-400">Isol (20%)</div>
              <div className="text-orange-400 font-bold">{incident.scoreBreakdown.isolationScore} pts</div>
            </div>
            <div className="bg-space-950 p-1.5 rounded border border-slate-800">
              <div className="text-slate-400">Vuln (20%)</div>
              <div className="text-purple-400 font-bold">{incident.scoreBreakdown.vulnerabilityScore} pts</div>
            </div>
          </div>

          {/* Rationale bullet points */}
          <ul className="space-y-1 text-[11px] text-slate-300 list-disc list-inside">
            {incident.scoreBreakdown.rationale.map((bullet, idx) => (
              <li key={idx} className="leading-snug">{bullet}</li>
            ))}
          </ul>
        </div>

        {/* Assigned Rescue Team */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-blue-400" /> Responder Status
          </h4>
          <div className="p-3 rounded-xl bg-space-900 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white font-mono">
                {incident.assignedTeam || 'No Unit Dispatched Yet'}
              </span>
              {incident.teamStatus && (
                <span className="px-2 py-0.5 rounded-full bg-blue-950 border border-blue-500/40 text-blue-300 text-[10px] font-mono">
                  {incident.teamStatus}
                </span>
              )}
            </div>
            {incident.notes && (
              <p className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-800">
                "{incident.notes}"
              </p>
            )}
          </div>
        </div>

        {/* Satellite Telemetry & Metadata */}
        <div className="p-3 rounded-xl bg-space-950 border border-slate-800 space-y-1.5 font-mono text-[11px] text-slate-400">
          <div className="flex justify-between">
            <span className="flex items-center gap-1"><Satellite className="w-3 h-3 text-cyan-400" /> Sensor:</span>
            <span className="text-slate-200">{incident.dataSource}</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-500" /> Observed:</span>
            <span className="text-slate-300">{incident.observationTime}</span>
          </div>
          <div className="flex justify-between">
            <span>Coordinates:</span>
            <span className="text-cyan-400">{incident.coordinates.lat.toFixed(5)}°N, {incident.coordinates.lng.toFixed(5)}°E</span>
          </div>
          <div className="flex justify-between">
            <span>Confidence Score:</span>
            <span className="text-emerald-400 font-bold">{incident.confidenceScore}%</span>
          </div>
        </div>
      </div>

      {/* Drawer Action Bar */}
      <div className="p-4 border-t border-slate-800 bg-space-900/90 flex flex-wrap items-center gap-2">
        {incident.verificationStatus !== 'Field-Verified' && incident.verificationStatus !== 'Resolved' && (
          <button
            onClick={() => onVerify(incident.id)}
            className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verify Field Report</span>
          </button>
        )}

        <button
          onClick={() => onAssignTeam(incident.id)}
          className="flex-1 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Truck className="w-4 h-4" />
          <span>{incident.assignedTeam ? 'Reassign Team' : 'Assign Rescue Team'}</span>
        </button>

        {incident.verificationStatus !== 'Resolved' && (
          <button
            onClick={() => onResolve(incident.id)}
            className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors flex items-center justify-center gap-1 border border-slate-700"
            title="Mark Incident as Resolved"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Resolve</span>
          </button>
        )}

        <button
          onClick={() => onEdit(incident)}
          className="p-2 rounded-lg bg-space-950 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-colors"
          title="Edit Incident Data"
        >
          <Edit3 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
