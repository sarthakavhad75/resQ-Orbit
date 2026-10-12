import React from 'react';
import { Layers, ShieldAlert, Navigation, Hospital, Home, AlertOctagon } from 'lucide-react';

export const MapLegend: React.FC = () => {
  return (
    <div className="p-3 bg-space-950/90 backdrop-blur-md rounded-xl border border-cyan-500/20 text-xs font-mono space-y-2.5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 text-slate-400">
        <span className="font-semibold text-slate-200 flex items-center gap-1.5 uppercase text-[11px]">
          <Layers className="w-3.5 h-3.5 text-cyan-400" /> Map Legend
        </span>
        <span className="text-[10px] text-cyan-400">GIS Telemetry</span>
      </div>

      {/* Priority Colors */}
      <div className="space-y-1 text-[11px]">
        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Triage Priority</div>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
            <span className="text-slate-300">Critical (80-100)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316]" />
            <span className="text-slate-300">High (60-79)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#eab308]" />
            <span className="text-slate-300">Medium (35-59)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#22c55e]" />
            <span className="text-slate-300">Low / Safe (0-34)</span>
          </div>
        </div>
      </div>

      {/* Feature Icons */}
      <div className="space-y-1 text-[11px] pt-1 border-t border-slate-800/80">
        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Entity Markers</div>
        <div className="grid grid-cols-2 gap-1.5 text-slate-300">
          <div className="flex items-center gap-1.5">
            <span>💥</span>
            <span>Collapsed Structure</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>🚧</span>
            <span>Severed Bridge / Road</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>🏥</span>
            <span>Hospital Trauma Hub</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>⛺</span>
            <span>Evacuation Shelter</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>🏕️</span>
            <span>Isolated Hamlet</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>🌊</span>
            <span>Hazard Inundation</span>
          </div>
        </div>
      </div>
    </div>
  );
};
