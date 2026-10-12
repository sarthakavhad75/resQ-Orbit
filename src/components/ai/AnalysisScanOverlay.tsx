import React, { useState } from 'react';
import { AIAnalysisResult } from '../../types/disaster';
import { Scan, Eye, Layers, ShieldAlert, Cpu, CheckSquare } from 'lucide-react';

interface AnalysisScanOverlayProps {
  result: AIAnalysisResult | null;
  isScanning: boolean;
  imageSrc: string;
}

export const AnalysisScanOverlay: React.FC<AnalysisScanOverlayProps> = ({
  result,
  isScanning,
  imageSrc
}) => {
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showSpectralGrid, setShowSpectralGrid] = useState(true);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-space-950 border border-cyan-500/30 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
      {/* HUD Header Toolbar */}
      <div className="p-3 bg-space-950/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-cyan-300 font-bold">MULTISPECTRAL AI DAMAGE VIEWER</span>
          {result && (
            <span className="text-slate-400">
              [{result.modelArchitecture}]
            </span>
          )}
        </div>

        {/* Overlay Controls */}
        <div className="flex items-center gap-4 text-slate-300">
          <label className="flex items-center gap-1.5 cursor-pointer hover:text-cyan-400">
            <input 
              type="checkbox" 
              checked={showBoundingBoxes} 
              onChange={(e) => setShowBoundingBoxes(e.target.checked)} 
              className="accent-cyan-400" 
            />
            <span>Bounding Boxes</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer hover:text-cyan-400">
            <input 
              type="checkbox" 
              checked={showHeatmap} 
              onChange={(e) => setShowHeatmap(e.target.checked)} 
              className="accent-cyan-400" 
            />
            <span>Damage Heatmap</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer hover:text-cyan-400">
            <input 
              type="checkbox" 
              checked={showSpectralGrid} 
              onChange={(e) => setShowSpectralGrid(e.target.checked)} 
              className="accent-cyan-400" 
            />
            <span>Targeting Reticle</span>
          </label>
        </div>
      </div>

      {/* Main Image Viewport */}
      <div className="relative w-full aspect-video min-h-[380px] max-h-[550px] overflow-hidden flex items-center justify-center bg-black">
        <img 
          src={imageSrc} 
          alt="Satellite Inspection" 
          className="w-full h-full object-cover select-none"
        />

        {/* Scanning Laser Sweep Animation */}
        {isScanning && (
          <div className="absolute inset-0 pointer-events-none z-30">
            <div className="w-full h-full bg-cyan-500/10 animate-pulse" />
            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_25px_#00f2fe] animate-scan" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-4 rounded-2xl bg-black/80 border border-cyan-400/80 backdrop-blur-md flex flex-col items-center gap-3 shadow-[0_0_30px_rgba(0,242,254,0.4)]">
                <Scan className="w-10 h-10 text-cyan-400 animate-spin" />
                <div className="text-center font-mono">
                  <div className="text-sm font-bold text-white uppercase tracking-wider">
                    Running Feature Extraction...
                  </div>
                  <div className="text-xs text-cyan-400 mt-1">
                    Evaluating Morphological Changes & Spectral Indices
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reticle / Grid Overlay */}
        {showSpectralGrid && !isScanning && (
          <div className="absolute inset-0 pointer-events-none z-10 bg-grid-pattern opacity-40">
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-400" />
          </div>
        )}

        {/* Simulated Damage Heatmap Mask */}
        {showHeatmap && result && !isScanning && (
          <div className="absolute inset-0 pointer-events-none z-15 mix-blend-screen opacity-50">
            <div className="w-full h-full bg-gradient-to-tr from-red-600/30 via-transparent to-amber-500/20" />
          </div>
        )}

        {/* Bounding Boxes */}
        {showBoundingBoxes && result && !isScanning && (
          <div className="absolute inset-0 pointer-events-none z-20">
            {result.detectedItems.map((item, index) => {
              if (!item.box) return null;
              const [ymin, xmin, ymax, xmax] = item.box;
              const borderColor = 
                item.severity === 'Critical' ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' :
                item.severity === 'Severe' ? 'border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]' :
                'border-amber-400 shadow-[0_0_12px_rgba(234,179,8,0.4)]';

              const badgeColor =
                item.severity === 'Critical' ? 'bg-red-950/90 text-red-300 border-red-500' :
                item.severity === 'Severe' ? 'bg-orange-950/90 text-orange-300 border-orange-500' :
                'bg-amber-950/90 text-amber-300 border-amber-500';

              return (
                <div
                  key={item.id || index}
                  className={`absolute border-2 ${borderColor} rounded-sm transition-all duration-300`}
                  style={{
                    top: `${ymin}%`,
                    left: `${xmin}%`,
                    width: `${xmax - xmin}%`,
                    height: `${ymax - ymin}%`,
                  }}
                >
                  <div className={`absolute -top-7 left-0 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border ${badgeColor} backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap`}>
                    <span>{item.type}</span>
                    <span className="text-white font-extrabold bg-black/60 px-1 rounded">
                      {item.confidence}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Telemetry Footer */}
      {result && !isScanning && (
        <div className="p-3 bg-space-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span>Sensor: <strong className="text-white">{result.rawSatelliteMetadata.satellite}</strong></span>
            <span>•</span>
            <span>GSD: <strong className="text-cyan-400">{result.rawSatelliteMetadata.groundSamplingDistance}</strong></span>
          </div>
          <div className="flex items-center gap-3">
            <span>Inference Time: <strong className="text-emerald-400">{result.processingTimeMs} ms</strong></span>
            <span>•</span>
            <span>Cloud Cover: <strong className="text-white">{result.rawSatelliteMetadata.cloudCoverPercentage}%</strong></span>
          </div>
        </div>
      )}
    </div>
  );
};
