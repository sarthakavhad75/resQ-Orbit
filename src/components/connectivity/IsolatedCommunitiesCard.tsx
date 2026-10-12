import React from 'react';
import { IsolatedCommunity } from '../../types/disaster';
import { VerificationBadge, AccessibilityBadge } from '../common/StatusBadge';
import { 
  Network, 
  MapPin, 
  Clock, 
  Plane, 
  AlertTriangle, 
  Hospital, 
  Package, 
  Send,
  Users
} from 'lucide-react';

interface IsolatedCommunitiesCardProps {
  communities: IsolatedCommunity[];
  onRequestAirDrop: (id: string) => void;
}

export const IsolatedCommunitiesCard: React.FC<IsolatedCommunitiesCardProps> = ({
  communities,
  onRequestAirDrop
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {communities.map((community) => (
          <div
            key={community.id}
            className="p-4 rounded-xl bg-space-900/90 border border-purple-500/30 hover:border-purple-400 transition-all flex flex-col justify-between space-y-3 shadow-lg"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-2.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-purple-400 font-bold bg-purple-950 px-2 py-0.5 rounded border border-purple-500/40">
                      {community.id}
                    </span>
                    <VerificationBadge status={community.verificationStatus} size="sm" />
                  </div>
                  <h4 className="font-bold text-white text-base font-display mt-1">
                    {community.name}
                  </h4>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Isolation Urgency</div>
                  <div className="text-lg font-bold font-mono text-purple-300">
                    {community.urgencyScore}/100
                  </div>
                </div>
              </div>

              {/* Blockage and metrics */}
              <div className="space-y-2 mt-3 text-xs text-slate-300">
                <div className="p-2.5 rounded-lg bg-space-950 border border-slate-800 space-y-1">
                  <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    <strong>Primary Cut-off Point:</strong>
                  </div>
                  <p className="text-slate-200 text-xs font-sans pl-5">
                    {community.primaryBlockage}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                  <div className="p-2 rounded bg-space-950/70 border border-slate-800/80">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Users className="w-3 h-3 text-cyan-400" /> Population:
                    </span>
                    <span className="text-white font-bold">{community.population.toLocaleString()} pax</span>
                  </div>

                  <div className="p-2 rounded bg-space-950/70 border border-slate-800/80">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-red-400" /> Cut Off For:
                    </span>
                    <span className="text-red-300 font-bold">{community.daysIsolated} Days</span>
                  </div>
                </div>

                <div className="p-2 rounded bg-space-950/70 border border-slate-800/80 font-mono text-[11px] flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Hospital className="w-3 h-3 text-emerald-400" /> Nearest Aid Hub:
                  </span>
                  <span className="text-slate-200 font-semibold truncate max-w-[180px]">
                    {community.nearestFacilityName} ({community.nearestFacilityDistanceKm} km)
                  </span>
                </div>

                <div className="p-2 rounded bg-space-950/70 border border-slate-800/80 font-mono text-[11px] flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Package className="w-3 h-3 text-amber-400" /> Supplies Runway:
                  </span>
                  <span className={`font-bold ${
                    community.suppliesStatus.includes('Critical') ? 'text-red-400' : 'text-amber-400'
                  }`}>
                    {community.suppliesStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
              <AccessibilityBadge status={community.accessibility} size="sm" />

              {community.airDropRequired && (
                <button
                  onClick={() => onRequestAirDrop(community.id)}
                  className="px-3 py-1.5 rounded-lg bg-purple-950 hover:bg-purple-900 border border-purple-400/50 text-purple-200 font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Plane className="w-3.5 h-3.5 text-purple-400" />
                  <span>Request Air-Drop</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
