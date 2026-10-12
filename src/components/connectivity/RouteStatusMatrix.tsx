import React from 'react';
import { ChokePoint } from '../../types/disaster';
import { Ban, AlertTriangle, CheckCircle, Navigation, ShieldAlert } from 'lucide-react';

export const RouteStatusMatrix: React.FC<{ chokePoints: ChokePoint[] }> = ({ chokePoints }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-orange-400" />
          Critical Lifeline Choke Points & Severed Bridges
        </h4>
        <span className="text-xs font-mono text-slate-400">
          {chokePoints.length} Bottlenecks Monitored
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-space-900/80">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-space-950/90 text-[11px] text-slate-400 uppercase tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Choke Point Asset</th>
              <th className="py-3 px-3">Type</th>
              <th className="py-3 px-3">Damage Status</th>
              <th className="py-3 px-3">Alternate Detour</th>
              <th className="py-3 px-3">Detour Feasibility</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70">
            {chokePoints.map((cp) => (
              <tr key={cp.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-4 text-white font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400">{cp.id}</span>
                    <span className="font-sans">{cp.name}</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-slate-300">
                  <span className="px-2 py-0.5 rounded bg-space-950 border border-slate-700">
                    {cp.type}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase ${
                    cp.status === 'Severed' ? 'bg-red-950 text-red-300 border-red-500/50' :
                    cp.status === 'Submerged' ? 'bg-blue-950 text-blue-300 border-blue-500/50' :
                    'bg-amber-950 text-amber-300 border-amber-500/50'
                  }`}>
                    {cp.status}
                  </span>
                </td>
                <td className="py-3 px-3 text-slate-300">
                  +{cp.alternateRouteKm} km detour
                </td>
                <td className="py-3 px-3">
                  <span className={`font-semibold ${
                    cp.detourFeasibility === 'Possible' ? 'text-emerald-400' :
                    cp.detourFeasibility === 'Impractical' ? 'text-orange-400' :
                    'text-red-400'
                  }`}>
                    {cp.detourFeasibility}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
