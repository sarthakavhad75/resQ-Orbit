import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    text: string;
    positive?: boolean;
    neutral?: boolean;
  };
  variant?: 'cyan' | 'red' | 'orange' | 'emerald' | 'purple';
  isSimulated?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'cyan',
  isSimulated = true
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'red':
        return {
          border: 'border-red-500/30 hover:border-red-400/60',
          glow: 'group-hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]',
          iconBg: 'bg-red-950/60 text-red-400 border border-red-500/40',
          textColor: 'text-red-400',
        };
      case 'orange':
        return {
          border: 'border-orange-500/30 hover:border-orange-400/60',
          glow: 'group-hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]',
          iconBg: 'bg-orange-950/60 text-orange-400 border border-orange-500/40',
          textColor: 'text-orange-400',
        };
      case 'emerald':
        return {
          border: 'border-emerald-500/30 hover:border-emerald-400/60',
          glow: 'group-hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]',
          iconBg: 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40',
          textColor: 'text-emerald-400',
        };
      case 'purple':
        return {
          border: 'border-purple-500/30 hover:border-purple-400/60',
          glow: 'group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]',
          iconBg: 'bg-purple-950/60 text-purple-400 border border-purple-500/40',
          textColor: 'text-purple-400',
        };
      case 'cyan':
      default:
        return {
          border: 'border-cyan-500/30 hover:border-cyan-400/60',
          glow: 'group-hover:shadow-[0_0_20px_rgba(0,242,254,0.2)]',
          iconBg: 'bg-cyan-950/60 text-cyan-400 border border-cyan-500/40',
          textColor: 'text-cyan-400',
        };
    }
  };

  const style = getVariantStyles();

  return (
    <div className={`group relative rounded-xl p-4 md:p-5 bg-space-900/80 backdrop-blur-md border ${style.border} ${style.glow} transition-all duration-300 overflow-hidden`}>
      {/* Subtle corner tech decoration */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/20 pointer-events-none" />

      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-mono text-slate-400">{title}</span>
            {isSimulated && (
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 bg-slate-800/80 text-slate-400 rounded border border-slate-700/60">
                Simulated
              </span>
            )}
          </div>
          <div className="text-2xl md:text-3xl font-bold font-display text-white tracking-tight pt-1">
            {value}
          </div>
        </div>

        <div className={`p-2.5 rounded-lg ${style.iconBg} transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="w-5 h-5 md:w-6 md:h-6" />
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        {subtitle && (
          <span className="text-slate-400 truncate max-w-[70%]">{subtitle}</span>
        )}
        {trend && (
          <span className={`font-mono font-medium ${trend.neutral ? 'text-slate-400' : trend.positive ? 'text-emerald-400' : 'text-red-400'}`}>
            {trend.text}
          </span>
        )}
      </div>
    </div>
  );
};
