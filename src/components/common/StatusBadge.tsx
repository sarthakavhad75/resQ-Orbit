import React from 'react';
import { VerificationStatus, AccessibilityStatus } from '../../types/disaster';
import { ShieldCheck, Cpu, HelpCircle, CheckCheck, Navigation, AlertCircle, Ban, Plane } from 'lucide-react';

export const VerificationBadge: React.FC<{ status: VerificationStatus; size?: 'sm' | 'md' }> = ({ 
  status, 
  size = 'md' 
}) => {
  const sizeClasses = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  switch (status) {
    case 'Field-Verified':
      return (
        <span className={`inline-flex items-center gap-1 font-medium rounded-full bg-cyan-950/80 border border-cyan-400/60 text-cyan-300 shadow-[0_0_8px_rgba(0,242,254,0.25)] ${sizeClasses}`}>
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          Field-Verified
        </span>
      );
    case 'AI-Flagged':
      return (
        <span className={`inline-flex items-center gap-1 font-medium rounded-full bg-purple-950/80 border border-purple-400/50 text-purple-300 ${sizeClasses}`}>
          <Cpu className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          AI-Flagged
        </span>
      );
    case 'Provisional':
      return (
        <span className={`inline-flex items-center gap-1 font-medium rounded-full bg-slate-800/80 border border-slate-600 text-slate-300 ${sizeClasses}`}>
          <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
          Provisional (Unconfirmed)
        </span>
      );
    case 'Resolved':
      return (
        <span className={`inline-flex items-center gap-1 font-medium rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 ${sizeClasses}`}>
          <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
          Resolved
        </span>
      );
  }
};

export const AccessibilityBadge: React.FC<{ status: AccessibilityStatus; size?: 'sm' | 'md' }> = ({ 
  status, 
  size = 'md' 
}) => {
  const sizeClasses = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  switch (status) {
    case 'Accessible':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 ${sizeClasses}`}>
          <Navigation className="w-3 h-3 text-emerald-400" />
          Accessible
        </span>
      );
    case 'Partially Blocked':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-amber-950/60 border border-amber-600/40 text-amber-300 ${sizeClasses}`}>
          <AlertCircle className="w-3 h-3 text-amber-400" />
          Partially Blocked
        </span>
      );
    case 'Impassable':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-red-950/70 border border-red-600/50 text-red-300 ${sizeClasses}`}>
          <Ban className="w-3 h-3 text-red-400" />
          Impassable
        </span>
      );
    case 'Aerial Only':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-sky-950/70 border border-sky-400/50 text-sky-300 shadow-[0_0_8px_rgba(56,189,248,0.2)] ${sizeClasses}`}>
          <Plane className="w-3 h-3 text-sky-400" />
          Aerial Access Only
        </span>
      );
  }
};
