import React, { useState, useEffect } from 'react';
import { 
  Satellite, 
  Radio, 
  Bell, 
  Volume2, 
  VolumeX, 
  MapPin, 
  ChevronDown, 
  ShieldAlert, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useDisaster } from '../../context/DisasterContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenZoneSelector: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onNavigate, 
  onOpenZoneSelector 
}) => {
  const { 
    activeZone, 
    alerts, 
    audioAlertsEnabled, 
    toggleAudioAlerts, 
    incidents 
  } = useDisaster();

  const [utcTime, setUtcTime] = useState<string>('');
  const unreadAlertsCount = alerts.filter(a => !a.acknowledged).length;
  const criticalCount = incidents.filter(i => i.priorityLevel === 'Critical').length;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 h-16 bg-space-950/90 backdrop-blur-md border-b border-cyan-500/20 px-4 md:px-6 flex items-center justify-between">
      {/* Left: Brand / Logo */}
      <div className="flex items-center gap-3 md:gap-6">
        <button 
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 group text-left"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 p-0.5 shadow-[0_0_15px_rgba(0,242,254,0.4)] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-space-950 rounded-[10px] flex items-center justify-center">
              <Satellite className="w-5 h-5 text-cyan-400 animate-pulse-glow" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-lg tracking-wider text-white">
                RESCUESAT<span className="text-cyan-400 font-extrabold">.AI</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                EOC v2.4
              </span>
            </div>
            <p className="hidden md:block text-[10px] font-mono text-cyan-400/80 -mt-0.5">
              When Earth Goes Silent, Space Speaks.
            </p>
          </div>
        </button>

        {/* Disaster Zone Selector Button */}
        <button
          onClick={onOpenZoneSelector}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-space-900 border border-cyan-500/30 hover:border-cyan-400 hover:bg-space-850 transition-all text-xs font-medium text-slate-200 group shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold text-white max-w-[140px] sm:max-w-[200px] truncate">
            {activeZone.name}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-transform group-hover:translate-y-0.5" />
        </button>
      </div>

      {/* Right: Operational Controls, UTC Clock, Telemetry */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* UTC Clock */}
        <div className="hidden lg:flex flex-col items-end text-right font-mono">
          <div className="text-xs text-cyan-300 font-semibold flex items-center gap-1.5">
            <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>{utcTime}</span>
          </div>
          <span className="text-[10px] text-slate-400">
            Pass: {activeZone.primarySatellite.split(' ')[0]} (Active)
          </span>
        </div>

        {/* Critical Alerts Indicator */}
        {criticalCount > 0 && (
          <button
            onClick={() => onNavigate('operations')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-950/80 border border-red-500/60 text-red-300 hover:bg-red-900/80 transition-all text-xs font-mono shadow-[0_0_12px_rgba(239,68,68,0.3)] animate-pulse"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span className="font-bold">{criticalCount}</span>
            <span className="hidden sm:inline">Critical</span>
          </button>
        )}

        {/* Audio Toggle */}
        <button
          onClick={toggleAudioAlerts}
          className={`p-2 rounded-lg border transition-all ${
            audioAlertsEnabled 
              ? 'bg-space-900 border-cyan-500/40 text-cyan-400 hover:bg-space-850' 
              : 'bg-space-900/50 border-slate-700 text-slate-500 hover:text-slate-300'
          }`}
          title={audioAlertsEnabled ? 'Telemetry Audio Active' : 'Telemetry Audio Muted'}
        >
          {audioAlertsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Alerts Center Button */}
        <button
          onClick={() => onNavigate('reports')}
          className="relative p-2 rounded-lg bg-space-900 border border-cyan-500/30 text-slate-300 hover:text-cyan-300 hover:border-cyan-400 transition-all"
          title="Alerts & SitRep"
        >
          <Bell className="w-4 h-4" />
          {unreadAlertsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-[10px] font-bold text-white rounded-full flex items-center justify-center animate-bounce">
              {unreadAlertsCount}
            </span>
          )}
        </button>

        {/* Quick Launch CTA if on landing */}
        {currentPage === 'landing' ? (
          <button
            onClick={() => onNavigate('dashboard')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,242,254,0.4)] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch EOC</span>
          </button>
        ) : (
          <button
            onClick={() => onNavigate('ai-analysis')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-950/80 border border-cyan-400/60 hover:bg-cyan-900/80 text-cyan-300 font-semibold text-xs tracking-wide transition-all shadow-[0_0_10px_rgba(0,242,254,0.2)]"
          >
            <Satellite className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Vision Scan</span>
          </button>
        )}
      </div>
    </header>
  );
};
