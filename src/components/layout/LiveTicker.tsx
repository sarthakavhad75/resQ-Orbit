import React from 'react';
import { Radio, AlertCircle, ChevronRight, Satellite } from 'lucide-react';
import { useDisaster } from '../../context/DisasterContext';

export const LiveTicker: React.FC<{ onNavigateToReports: () => void }> = ({ onNavigateToReports }) => {
  const { alerts, activeZone } = useDisaster();
  const latestAlert = alerts[0];

  if (!latestAlert) return null;

  return (
    <div className="bg-space-950 border-b border-cyan-500/20 px-4 py-1.5 flex items-center justify-between text-xs overflow-hidden">
      <div className="flex items-center gap-2 shrink-0">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <span className="font-mono text-[11px] font-bold text-red-400 tracking-wider uppercase flex items-center gap-1">
          <Radio className="w-3 h-3 animate-pulse" /> LIVE TELEMETRY:
        </span>
      </div>

      <div className="mx-4 truncate font-mono text-slate-300 text-xs flex items-center gap-3">
        <span className="text-cyan-400 font-semibold">[{activeZone.region}]</span>
        <span className="truncate">{latestAlert.title} — {latestAlert.message}</span>
      </div>

      <button
        onClick={onNavigateToReports}
        className="shrink-0 flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 hover:underline"
      >
        <span>View SitRep</span>
        <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  );
};
