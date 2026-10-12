import React from 'react';
import { SatellitePass } from '../../types/disaster';
import { Satellite, Radio, Globe2, Cloud, Clock } from 'lucide-react';

export const SatelliteTelemetryFeed: React.FC<{ passes: SatellitePass[] }> = ({ passes }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
          <Satellite className="w-4 h-4 text-cyan-400" />
          Earth Observation Satellite Constellation Status
        </h4>
        <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Orbital Tracking Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {passes.map((pass) => (
          <div
            key={pass.id}
            className="p-4 rounded-xl bg-space-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-2.5"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                  {pass.agency}
                </span>
                <h5 className="font-bold text-white text-sm font-display mt-1.5">{pass.satelliteName}</h5>
              </div>

              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950 border border-emerald-500/40 text-emerald-300">
                {pass.status}
              </span>
            </div>

            <div className="space-y-1 text-xs font-mono text-slate-300">
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>Sensor Type:</span>
                <span className="text-white font-semibold">{pass.sensorType}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>GSD Resolution:</span>
                <span className="text-cyan-400 font-semibold">{pass.resolution}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>Last Pass:</span>
                <span className="text-slate-200">{pass.lastPass}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>Next Orbital Flyover:</span>
                <span className="text-amber-400 font-semibold">{pass.nextPass}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>Cloud Cover:</span>
                <span className="text-slate-200">{pass.cloudCover}%</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Coverage: <strong className="text-emerald-400">{pass.coverageStatus}</strong></span>
              <span className="text-cyan-400">100% Downlinked</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
