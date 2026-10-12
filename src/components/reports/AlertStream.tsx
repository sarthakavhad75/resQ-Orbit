import React from 'react';
import { EmergencyAlert } from '../../types/disaster';
import { Bell, Radio, AlertTriangle, Info, CheckCircle2, ShieldAlert } from 'lucide-react';

interface AlertStreamProps {
  alerts: EmergencyAlert[];
  onAcknowledge: (id: string) => void;
}

export const AlertStream: React.FC<AlertStreamProps> = ({ alerts, onAcknowledge }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
          <Bell className="w-4 h-4 text-cyan-400" />
          Real-Time Emergency Alerts Feed
        </h4>
        <span className="text-xs font-mono text-cyan-400">
          {alerts.filter(a => !a.acknowledged).length} Active Unacknowledged
        </span>
      </div>

      <div className="space-y-2.5">
        {alerts.map((alert) => {
          const isCritical = alert.level === 'Critical';
          const isHigh = alert.level === 'High';
          const isWarning = alert.level === 'Warning';

          const borderColor = 
            isCritical ? 'border-red-500/50 bg-red-950/40' :
            isHigh ? 'border-orange-500/50 bg-orange-950/40' :
            isWarning ? 'border-amber-500/50 bg-amber-950/40' :
            'border-cyan-500/40 bg-space-950/60';

          return (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border ${borderColor} backdrop-blur-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-3`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                    isCritical ? 'bg-red-950 text-red-300 border-red-500' :
                    isHigh ? 'bg-orange-950 text-orange-300 border-orange-500' :
                    'bg-slate-800 text-slate-300 border-slate-700'
                  }`}>
                    {alert.level}
                  </span>
                  <span className="text-slate-400">{alert.timestamp}</span>
                  <span className="text-cyan-400">[{alert.zone}]</span>
                </div>

                <h5 className="font-bold text-white text-sm font-display">
                  {alert.title}
                </h5>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {alert.message}
                </p>

                <div className="text-[11px] font-mono text-slate-400 pt-0.5">
                  Telemetry Source: <strong className="text-slate-200">{alert.source}</strong>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                {!alert.acknowledged ? (
                  <button
                    onClick={() => onAcknowledge(alert.id)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-mono text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Acknowledge</span>
                  </button>
                ) : (
                  <span className="px-2.5 py-1 rounded-lg bg-space-950 border border-slate-800 text-slate-400 font-mono text-xs flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Acknowledged</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
