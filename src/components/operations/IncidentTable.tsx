import React, { useState } from 'react';
import { Incident, PriorityLevel, VerificationStatus } from '../../types/disaster';
import { PriorityBadge } from '../common/PriorityBadge';
import { VerificationBadge, AccessibilityBadge } from '../common/StatusBadge';
import { 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  Eye, 
  ArrowUpDown, 
  Search, 
  Download, 
  Plus, 
  ExternalLink,
  MapPin,
  Users
} from 'lucide-react';

interface IncidentTableProps {
  incidents: Incident[];
  onSelectIncident: (incident: Incident) => void;
  onVerify: (id: string) => void;
  onAssignTeam: (id: string) => void;
  onResolve: (id: string) => void;
  onAddNew: () => void;
  onExportCSV: () => void;
}

export const IncidentTable: React.FC<IncidentTableProps> = ({
  incidents,
  onSelectIncident,
  onVerify,
  onAssignTeam,
  onResolve,
  onAddNew,
  onExportCSV
}) => {
  const [sortField, setSortField] = useState<'priorityScore' | 'estimatedPeopleAffected' | 'lastUpdated'>('priorityScore');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const handleSort = (field: 'priorityScore' | 'estimatedPeopleAffected' | 'lastUpdated') => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const filteredIncidents = incidents
    .filter(inc => {
      const matchSearch = 
        inc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inc.locationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inc.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchPriority = filterPriority === 'All' || inc.priorityLevel === filterPriority;
      const matchStatus = filterStatus === 'All' || inc.verificationStatus === filterStatus;

      return matchSearch && matchPriority && matchStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === 'priorityScore') comparison = a.priorityScore - b.priorityScore;
      else if (sortField === 'estimatedPeopleAffected') comparison = a.estimatedPeopleAffected - b.estimatedPeopleAffected;
      else comparison = a.id.localeCompare(b.id);

      return sortOrder === 'desc' ? -comparison : comparison;
    });

  return (
    <div className="space-y-4">
      {/* Table Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-space-900/90 p-4 rounded-xl border border-cyan-500/20">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search */}
          <div className="relative min-w-[240px] flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search incidents or sectors..."
              className="w-full bg-space-950 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          {/* Priority filter */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="bg-space-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
          >
            <option value="All">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Status filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-space-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
          >
            <option value="All">All Statuses</option>
            <option value="Field-Verified">Field-Verified</option>
            <option value="AI-Flagged">AI-Flagged</option>
            <option value="Provisional">Provisional</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onExportCSV}
            className="px-3 py-1.5 rounded-lg bg-space-950 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onAddNew}
            className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-space-950 font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all font-display"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Log Incident</span>
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-space-900/60 shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-space-950/90 text-[11px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Incident ID & Location</th>
              <th className="py-3 px-3">Type / Category</th>
              <th 
                className="py-3 px-3 cursor-pointer hover:text-cyan-400"
                onClick={() => handleSort('priorityScore')}
              >
                <div className="flex items-center gap-1">
                  <span>Priority</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th 
                className="py-3 px-3 cursor-pointer hover:text-cyan-400"
                onClick={() => handleSort('estimatedPeopleAffected')}
              >
                <div className="flex items-center gap-1">
                  <span>Affected</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-3">Accessibility</th>
              <th className="py-3 px-3">Verification</th>
              <th className="py-3 px-3">Assigned Team</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {filteredIncidents.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-500 font-mono">
                  No incidents matching criteria. Try adjusting filters.
                </td>
              </tr>
            ) : (
              filteredIncidents.map((incident) => (
                <tr 
                  key={incident.id} 
                  className="hover:bg-slate-800/50 transition-colors group cursor-pointer"
                  onClick={() => onSelectIncident(incident)}
                >
                  <td className="py-3 px-4 font-mono">
                    <div className="font-bold text-cyan-400">{incident.id}</div>
                    <div className="text-white font-sans font-semibold line-clamp-1">{incident.title}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                      <span className="truncate max-w-[200px]">{incident.locationName}</span>
                    </div>
                  </td>

                  <td className="py-3 px-3 font-mono text-slate-300">
                    <span className="px-2 py-0.5 rounded bg-space-950 border border-slate-700 text-[11px]">
                      {incident.category}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <PriorityBadge 
                      level={incident.priorityLevel} 
                      score={incident.priorityScore} 
                      size="sm" 
                    />
                  </td>

                  <td className="py-3 px-3 font-mono text-slate-200">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-slate-400" />
                      <span className="font-semibold">{incident.estimatedPeopleAffected.toLocaleString()}</span>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <AccessibilityBadge status={incident.accessibility} size="sm" />
                  </td>

                  <td className="py-3 px-3">
                    <VerificationBadge status={incident.verificationStatus} size="sm" />
                  </td>

                  <td className="py-3 px-3 font-mono text-[11px]">
                    {incident.assignedTeam ? (
                      <span className="text-cyan-300 font-medium">
                        {incident.assignedTeam}
                      </span>
                    ) : (
                      <span className="text-slate-500 italic">Unassigned</span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                      {incident.verificationStatus !== 'Field-Verified' && incident.verificationStatus !== 'Resolved' && (
                        <button
                          onClick={() => onVerify(incident.id)}
                          className="p-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 transition-colors"
                          title="Verify Incident"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => onAssignTeam(incident.id)}
                        className="p-1.5 rounded-lg bg-blue-950/80 hover:bg-blue-900 border border-blue-500/40 text-blue-300 transition-colors"
                        title={incident.assignedTeam ? 'Reassign Team' : 'Assign Team'}
                      >
                        <Truck className="w-3.5 h-3.5" />
                      </button>

                      {incident.verificationStatus !== 'Resolved' && (
                        <button
                          onClick={() => onResolve(incident.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-emerald-400 transition-colors"
                          title="Mark Resolved"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => onSelectIncident(incident)}
                        className="p-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 transition-colors"
                        title="View Full Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
