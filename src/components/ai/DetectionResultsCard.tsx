import React from 'react';
import { AIAnalysisResult } from '../../types/disaster';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Building2, 
  Waves, 
  ShieldAlert, 
  Cpu, 
  Download, 
  Send,
  FileCheck2,
  Sparkles
} from 'lucide-react';

interface DetectionResultsCardProps {
  result: AIAnalysisResult | null;
  onDeployRecommendation: (detectionId: string) => void;
}

export const DetectionResultsCard: React.FC<DetectionResultsCardProps> = ({
  result,
  onDeployRecommendation
}) => {
  if (!result) return null;

  return (
    <div className="space-y-6">
      {/* Top AI Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-space-900/90 border border-red-500/30">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Structural Damage</span>
            <Building2 className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-bold font-display text-white mt-1">
            {result.estimatedStructuresDamaged}
          </div>
          <p className="text-[11px] font-mono text-red-400 mt-1">Suspected Heavy Collapses</p>
        </div>

        <div className="p-4 rounded-xl bg-space-900/90 border border-cyan-500/30">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Overall Confidence</span>
            <Cpu className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-display text-cyan-300 mt-1">
            {result.confidenceOverall}%
          </div>
          <p className="text-[11px] font-mono text-slate-400 mt-1">Multi-Modal Consensus</p>
        </div>

        <div className="p-4 rounded-xl bg-space-900/90 border border-orange-500/30">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Road Interrupted</span>
            <ShieldAlert className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl font-bold font-display text-orange-300 mt-1">
            {result.estimatedRoadsInterrupted} Corridors
          </div>
          <p className="text-[11px] font-mono text-slate-400 mt-1">Debris & Bridge Cuts</p>
        </div>

        <div className="p-4 rounded-xl bg-space-900/90 border border-emerald-500/30">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Inundation Extent</span>
            <Waves className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-display text-emerald-300 mt-1">
            {result.estimatedFloodedAreaSqKm ? `${result.estimatedFloodedAreaSqKm} km²` : 'N/A (Seismic)'}
          </div>
          <p className="text-[11px] font-mono text-slate-400 mt-1">Water Feature Index</p>
        </div>
      </div>

      {/* Detection Detections Breakdown List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            AI-Extracted Damage Entities & Priority Recommendations
          </h4>
          <span className="text-xs font-mono text-slate-400">
            {result.detectedItems.length} Key Vectors Flagged
          </span>
        </div>

        <div className="space-y-3">
          {result.detectedItems.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-space-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                    item.severity === 'Critical' ? 'bg-red-950 text-red-300 border-red-500/50' :
                    item.severity === 'Severe' ? 'bg-orange-950 text-orange-300 border-orange-500/50' :
                    'bg-amber-950 text-amber-300 border-amber-500/50'
                  }`}>
                    {item.severity}
                  </span>
                  <h5 className="font-bold text-white text-sm font-display">{item.type}</h5>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-500/30">
                    {item.confidence}% Confidence
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pt-0.5">
                  <strong className="text-slate-200">Recommendation:</strong> {item.recommendation}
                </p>

                {item.areaEstimate && (
                  <div className="text-[11px] font-mono text-slate-400">
                    Footprint: <span className="text-white">{item.areaEstimate}</span>
                    {item.affectedBuildings && (
                      <span className="ml-2">({item.affectedBuildings} structures involved)</span>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={() => onDeployRecommendation(item.id)}
                className="shrink-0 px-3.5 py-2 rounded-lg bg-cyan-950 border border-cyan-500/40 hover:bg-cyan-900 text-cyan-300 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Create Incident Draft</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Hook Note */}
      <div className="p-4 rounded-xl bg-space-950/80 border border-purple-500/30 flex items-start gap-3 text-xs text-slate-300">
        <Cpu className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-purple-300 font-display">
            Modular Computer Vision Integration Service Hook
          </div>
          <p className="text-slate-400 leading-relaxed">
            This module connects cleanly to custom inference endpoints (e.g. PyTorch YOLOv8-OBB, SegFormer, SAM-Geo, or Roboflow Universe). 
            Pre-trained disaster checkpoint weights and raw TIFF geotag transforms are parsed directly in <code className="text-cyan-300 font-mono text-[11px]">src/services/aiVisionService.ts</code>.
          </p>
        </div>
      </div>
    </div>
  );
};
