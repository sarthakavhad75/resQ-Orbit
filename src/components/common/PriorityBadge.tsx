import React from 'react';
import { PriorityLevel } from '../../types/disaster';
import { AlertCircle, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

interface PriorityBadgeProps {
  level: PriorityLevel;
  score?: number;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ 
  level, 
  score, 
  size = 'md',
  showIcon = true 
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-semibold'
  };

  const getStyle = () => {
    switch (level) {
      case 'Critical':
        return {
          bg: 'bg-red-950/80 border-red-500/60 text-red-300 shadow-[0_0_12px_rgba(239,68,68,0.35)]',
          icon: <AlertCircle className={size === 'sm' ? 'w-3 h-3 text-red-400' : 'w-3.5 h-3.5 text-red-400'} />,
          dot: 'bg-red-400 animate-ping'
        };
      case 'High':
        return {
          bg: 'bg-orange-950/80 border-orange-500/60 text-orange-300 shadow-[0_0_10px_rgba(249,115,22,0.3)]',
          icon: <AlertTriangle className={size === 'sm' ? 'w-3 h-3 text-orange-400' : 'w-3.5 h-3.5 text-orange-400'} />,
          dot: 'bg-orange-400'
        };
      case 'Medium':
        return {
          bg: 'bg-amber-950/70 border-amber-500/50 text-amber-300',
          icon: <Info className={size === 'sm' ? 'w-3 h-3 text-amber-400' : 'w-3.5 h-3.5 text-amber-400'} />,
          dot: 'bg-amber-400'
        };
      case 'Low':
        return {
          bg: 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300',
          icon: <CheckCircle2 className={size === 'sm' ? 'w-3 h-3 text-emerald-400' : 'w-3.5 h-3.5 text-emerald-400'} />,
          dot: 'bg-emerald-400'
        };
    }
  };

  const style = getStyle();

  return (
    <span className={`inline-flex items-center rounded-full border ${style.bg} ${sizeClasses[size]}`}>
      {showIcon && style.icon}
      <span>{level}</span>
      {score !== undefined && (
        <span className="font-mono bg-black/40 px-1.5 py-0.2 rounded text-[11px] opacity-90 border border-white/10">
          {score}
        </span>
      )}
    </span>
  );
};
