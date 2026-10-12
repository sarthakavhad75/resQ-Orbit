import React, { useState } from 'react';
import { useDisaster } from '../context/DisasterContext';
import { IsolatedCommunitiesCard } from '../components/connectivity/IsolatedCommunitiesCard';
import { RouteStatusMatrix } from '../components/connectivity/RouteStatusMatrix';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { Network, Plane, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const IsolatedCommunitiesPage: React.FC = () => {
  const { isolatedCommunities, chokePoints, activeZone } = useDisaster();
  const [requestedAirDropId, setRequestedAirDropId] = useState<string | null>(null);

  const handleRequestAirDrop = (id: string) => {
    setRequestedAirDropId(id);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#00f2fe', '#a855f7', '#ffffff']
    });
    setTimeout(() => setRequestedAirDropId(null), 4000);
  };

  return (
    <div className="space-y-6 pb-12">
      <DisclaimerBanner compact />

      {/* Header */}
      <div className="p-4 rounded-xl bg-space-900/90 border border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-purple-400 font-bold uppercase">
              TOPOLOGICAL CONNECTIVITY & ROUTE ISOLATION ENGINE
            </span>
            <span className="text-xs text-slate-400 font-mono">[{activeZone.name}]</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-0.5">
            Isolated Communities & Cut-Off Lifelines
          </h2>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-purple-300 bg-purple-950/80 px-3 py-1.5 rounded-lg border border-purple-500/40">
          <Plane className="w-4 h-4 text-purple-400" />
          <span>{isolatedCommunities.filter(i => i.airDropRequired).length} Settlements Require Aerial Relief</span>
        </div>
      </div>

      {requestedAirDropId && (
        <div className="p-3.5 rounded-xl bg-purple-950/90 border border-purple-400 text-purple-200 text-xs font-mono flex items-center gap-2 animate-in fade-in shadow-[0_0_20px_rgba(168,85,247,0.3)]">
          <CheckCircle2 className="w-4 h-4 text-purple-400" />
          <span>
            Air-Drop Logistics Request successfully transmitted to Air Wing Operations for settlement ID {requestedAirDropId}!
          </span>
        </div>
      )}

      {/* Main Section: Isolated Communities Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold font-display uppercase tracking-wider text-slate-200 flex items-center gap-2">
            <Network className="w-4 h-4 text-purple-400" />
            Potentially Isolated Populations & Supply Runways
          </h3>
          <span className="text-xs font-mono text-slate-400">
            Ranked by Isolation Index (Pop × Days × Distance)
          </span>
        </div>

        <IsolatedCommunitiesCard
          communities={isolatedCommunities}
          onRequestAirDrop={handleRequestAirDrop}
        />
      </div>

      {/* Section 2: Choke Points & Severed Bridges */}
      <RouteStatusMatrix chokePoints={chokePoints} />
    </div>
  );
};
