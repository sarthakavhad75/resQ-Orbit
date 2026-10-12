import React from 'react';
import { Search, Filter, RefreshCw, X } from 'lucide-react';
import { PriorityLevel, VerificationStatus, IncidentCategory } from '../../types/disaster';

interface MapFiltersProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedPriority: PriorityLevel | 'All';
  onPriorityChange: (val: PriorityLevel | 'All') => void;
  selectedVerification: VerificationStatus | 'All';
  onVerificationChange: (val: VerificationStatus | 'All') => void;
  selectedCategory: IncidentCategory | 'All';
  onCategoryChange: (val: IncidentCategory | 'All') => void;
  onReset: () => void;
  totalFiltered: number;
}

export const MapFilters: React.FC<MapFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedPriority,
  onPriorityChange,
  selectedVerification,
  onVerificationChange,
  selectedCategory,
  onCategoryChange,
  onReset,
  totalFiltered
}) => {
  return (
    <div className="p-3 bg-space-900/90 backdrop-blur-md rounded-xl border border-cyan-500/20 shadow-md space-y-3">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by ID, location, damage keyword..."
          className="w-full bg-space-950/80 border border-slate-700/80 rounded-lg pl-9 pr-8 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors font-mono"
        />
        {searchQuery && (
          <button 
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter Dropdowns Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        {/* Priority Filter */}
        <div>
          <label className="block text-[10px] font-mono text-slate-400 mb-1">Priority</label>
          <select
            value={selectedPriority}
            onChange={(e) => onPriorityChange(e.target.value as PriorityLevel | 'All')}
            className="w-full bg-space-950 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none"
          >
            <option value="All">All Priorities</option>
            <option value="Critical">🔴 Critical (80-100)</option>
            <option value="High">🟠 High (60-79)</option>
            <option value="Medium">🟡 Medium (35-59)</option>
            <option value="Low">🟢 Low (0-34)</option>
          </select>
        </div>

        {/* Verification Status */}
        <div>
          <label className="block text-[10px] font-mono text-slate-400 mb-1">Status</label>
          <select
            value={selectedVerification}
            onChange={(e) => onVerificationChange(e.target.value as VerificationStatus | 'All')}
            className="w-full bg-space-950 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Field-Verified">Shield Field-Verified</option>
            <option value="AI-Flagged">AI-Flagged (Pending)</option>
            <option value="Provisional">Provisional</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-[10px] font-mono text-slate-400 mb-1">Incident Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value as IncidentCategory | 'All')}
            className="w-full bg-space-950 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none truncate"
          >
            <option value="All">All Categories</option>
            <option value="Collapsed Structure">Collapsed Structure</option>
            <option value="Damaged Building">Damaged Building</option>
            <option value="Blocked Road">Blocked Road</option>
            <option value="Severed Bridge">Severed Bridge</option>
            <option value="Isolated Settlement">Isolated Settlement</option>
            <option value="Operational Hospital">Operational Hospital</option>
            <option value="Emergency Shelter">Emergency Shelter</option>
            <option value="Hazard Zone">Hazard Zone</option>
          </select>
        </div>

        {/* Reset & Stats */}
        <div className="flex flex-col justify-end">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
            <span>Showing: <strong className="text-cyan-400">{totalFiltered}</strong></span>
          </div>
          <button
            onClick={onReset}
            className="w-full py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 font-mono text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};
