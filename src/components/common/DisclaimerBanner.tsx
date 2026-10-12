import React from 'react';
import { AlertTriangle, Info, X } from 'lucide-react';

interface DisclaimerBannerProps {
  compact?: boolean;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ compact = false }) => {
  const [dismissed, setDismissed] = React.useState(false);

  if (dismissed) return null;

  if (compact) {
    return (
      <div className="bg-amber-950/40 border border-amber-500/30 rounded-lg px-3 py-1.5 flex items-center justify-between text-xs text-amber-200/90 font-mono">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>PROTOTYPE DECISION-SUPPORT: AI predictions are simulated for demonstration. Ground verification required.</span>
        </div>
        <button 
          onClick={() => setDismissed(true)}
          className="text-amber-400 hover:text-white p-0.5"
          title="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative rounded-xl bg-gradient-to-r from-amber-950/60 via-space-900/90 to-space-950/80 border border-amber-500/30 p-4 shadow-lg backdrop-blur-md">
      <div className="flex items-start gap-3.5">
        <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="space-y-1 pr-6">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-amber-300 font-display uppercase tracking-wider">
              Disaster-Response Decision-Support Prototype Notice
            </h4>
            <span className="text-[10px] font-mono px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
              SIMULATED DATA
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            RescueSat AI is an advanced prototype decision-support system. Geospatial markers, computer vision bounding boxes, and isolation rankings presented in this demonstration utilize illustrative and simulated datasets to showcase full-stack emergency workflows. 
            <strong className="text-amber-200 font-semibold ml-1">
              Field commanders must never treat unconfirmed AI predictions as verified observations without on-ground or tactical reconnaissance confirmation.
            </strong>
          </p>
        </div>
        <button 
          onClick={() => setDismissed(true)}
          className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/5 transition-colors"
          title="Dismiss notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
