import React from 'react';
import { Satellite, Shield, Globe2, Radio, Heart } from 'lucide-react';

export const Footer: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-cyan-500/20 bg-space-950/95 py-8 px-4 md:px-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-500 p-0.5">
            <div className="w-full h-full bg-space-950 rounded-[6px] flex items-center justify-center">
              <Satellite className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="font-display font-bold text-white text-sm">
              RESCUESAT AI
            </div>
            <div className="text-[11px] text-cyan-400/80 font-mono">
              “When Earth Goes Silent, Space Speaks.”
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-[11px]">
          <button onClick={() => onNavigate('landing')} className="hover:text-cyan-400 transition-colors">Mission</button>
          <button onClick={() => onNavigate('dashboard')} className="hover:text-cyan-400 transition-colors">Emergency Center</button>
          <button onClick={() => onNavigate('map')} className="hover:text-cyan-400 transition-colors">Satellite GIS</button>
          <button onClick={() => onNavigate('ai-analysis')} className="hover:text-cyan-400 transition-colors">AI Analysis</button>
          <button onClick={() => onNavigate('connectivity')} className="hover:text-cyan-400 transition-colors">Isolated Zones</button>
          <button onClick={() => onNavigate('reports')} className="hover:text-cyan-400 transition-colors">Situation Reports</button>
          <button onClick={() => onNavigate('about')} className="hover:text-cyan-400 transition-colors">Architecture</button>
        </div>

        <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Space Ops Telemetry Live</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-slate-900 text-center md:flex md:justify-between text-[11px] text-slate-400">
        <p>© 2026 RescueSat AI Platform. Decision-Support Prototype. All simulated telemetry clearly marked.</p>
        <p className="mt-2 md:mt-0 font-mono">Sentinel-2 • Landsat-9 • TerraSAR-X • Copernicus EMS</p>
      </div>
    </footer>
  );
};
