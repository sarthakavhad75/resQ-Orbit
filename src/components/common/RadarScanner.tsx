import React from 'react';
import { Satellite, Radio } from 'lucide-react';

interface RadarScannerProps {
  size?: number;
  activeTargetsCount?: number;
  satelliteName?: string;
  statusText?: string;
}

export const RadarScanner: React.FC<RadarScannerProps> = ({
  size = 180,
  activeTargetsCount = 6,
  satelliteName = 'Sentinel-2B Constellation',
  statusText = 'RADAR TELEMETRY LOCK'
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center p-3 rounded-xl bg-space-950/80 border border-cyan-500/20 shadow-[0_0_20px_rgba(0,242,254,0.08)]">
      {/* Outer Rotating Radar Frame */}
      <div 
        className="relative overflow-hidden rounded-full border border-cyan-500/30 bg-space-900/90"
        style={{ width: size, height: size }}
      >
        {/* Concentric rings */}
        <div className="absolute inset-0 m-auto w-3/4 h-3/4 rounded-full border border-cyan-500/20 pointer-events-none" />
        <div className="absolute inset-0 m-auto w-1/2 h-1/2 rounded-full border border-cyan-500/25 pointer-events-none" />
        <div className="absolute inset-0 m-auto w-1/4 h-1/4 rounded-full border border-cyan-500/30 pointer-events-none" />
        
        {/* Crosshairs */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-cyan-500/20 -translate-x-1/2 pointer-events-none" />
        <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-cyan-500/20 -translate-y-1/2 pointer-events-none" />

        {/* Sweeping radar blade */}
        <div className="absolute inset-0 animate-radar origin-center pointer-events-none">
          <div className="w-full h-full radar-sweep-element opacity-70" />
        </div>

        {/* Center Satellite Blip */}
        <div className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f2fe] flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
        </div>

        {/* Random target blips */}
        <div className="absolute top-[28%] left-[65%] w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] animate-pulse" />
        <div className="absolute top-[68%] left-[25%] w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316] animate-pulse" />
        <div className="absolute top-[45%] left-[78%] w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#22c55e]" />
        <div className="absolute top-[75%] left-[60%] w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#eab308]" />
      </div>

      <div className="mt-3 text-center space-y-0.5">
        <div className="flex items-center justify-center gap-1.5 text-cyan-400 text-xs font-mono font-semibold tracking-wider">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>{statusText}</span>
        </div>
        <div className="text-[11px] text-slate-400 font-mono">
          {satelliteName} • {activeTargetsCount} Targets Tracked
        </div>
      </div>
    </div>
  );
};
