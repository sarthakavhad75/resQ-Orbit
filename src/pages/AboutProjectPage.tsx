import React from 'react';
import { 
  Satellite, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Compass, 
  Radio, 
  Sparkles, 
  Globe2, 
  FileCode2, 
  AlertTriangle 
} from 'lucide-react';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';

export const AboutProjectPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      <DisclaimerBanner />

      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-space-900 via-space-850 to-space-950 border border-cyan-500/30 text-center space-y-3 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-400/50 text-cyan-300 font-mono text-xs">
          <Satellite className="w-3.5 h-3.5 text-cyan-400" />
          <span>PROJECT ARCHITECTURE & MISSION PHILOSOPHY</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black font-display text-white">
          RescueSat AI
        </h1>

        <p className="text-base sm:text-lg font-mono text-cyan-400 max-w-2xl mx-auto font-medium">
          “When Earth Goes Silent, Space Speaks.”
        </p>

        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mx-auto leading-relaxed pt-2 font-sans">
          RescueSat AI is an intelligent space-enabled disaster-monitoring and tactical decision-support system. Designed to assist emergency rescue commanders in the critical 72-hour window following earthquakes, floods, cyclones, and landslides, the platform turns multi-spectral satellite imagery and topological network analysis into prioritized, actionable field intelligence.
        </p>
      </div>

      {/* System Architecture Diagram */}
      <div className="p-6 rounded-2xl bg-space-900/80 border border-cyan-500/20 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-white font-display text-base flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            End-to-End System Pipeline Architecture
          </h3>
          <span className="text-xs font-mono text-cyan-400">Modular Micro-Service Design</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-space-950 border border-slate-800 space-y-2">
            <div className="p-2 rounded-lg bg-cyan-950/80 text-cyan-400 w-fit font-mono text-xs font-bold">
              01. DATA INGESTION
            </div>
            <h4 className="font-bold text-white text-sm">Earth Observation</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Connects to Copernicus Sentinel-2, Landsat-9, DLR TerraSAR-X, and PlanetScope constellations for multi-spectral and SAR radar passes.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-space-950 border border-slate-800 space-y-2">
            <div className="p-2 rounded-lg bg-purple-950/80 text-purple-400 w-fit font-mono text-xs font-bold">
              02. COMPUTER VISION
            </div>
            <h4 className="font-bold text-white text-sm">Deep Neural AI</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Executes YOLOv8-OBB oriented bounding box detection, SAM-Geo geospatial segmentation, and differential NDWI flood indexing.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-space-950 border border-slate-800 space-y-2">
            <div className="p-2 rounded-lg bg-orange-950/80 text-orange-400 w-fit font-mono text-xs font-bold">
              03. TOPOLOGY & GRAPH
            </div>
            <h4 className="font-bold text-white text-sm">Isolation Indexing</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Evaluates road network graphs, detects severed bridges, and ranks isolated communities based on days cut off and supply runway.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-space-950 border border-slate-800 space-y-2">
            <div className="p-2 rounded-lg bg-emerald-950/80 text-emerald-400 w-fit font-mono text-xs font-bold">
              04. DECISION SUPPORT
            </div>
            <h4 className="font-bold text-white text-sm">Rescue EOC Center</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Computes transparent 0-100 triage scores, provides printable UN OCHA SitReps, GIS mapping, and team dispatch workflows.
            </p>
          </div>
        </div>
      </div>

      {/* Transparent Scoring Formula */}
      <div className="p-6 rounded-2xl bg-space-900/80 border border-slate-800 space-y-4 font-mono text-xs">
        <h3 className="font-bold text-white font-display text-base flex items-center gap-2">
          <FileCode2 className="w-5 h-5 text-cyan-400" />
          Transparent Priority Mathematical Formulation
        </h3>

        <div className="p-4 rounded-xl bg-space-950 border border-cyan-500/30 text-cyan-300 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto">
          <code>
            PriorityScore = Min(100, Max(0, (w_pop × PopScore + w_dmg × DamageSeverity + w_iso × IsolationUrgency + w_vuln × Vulnerability) × TimeDecayFactor))
          </code>
        </div>

        <p className="text-slate-300 text-xs font-sans leading-relaxed">
          Unlike black-box AI systems, RescueSat AI exposes every mathematical weight parameter and step-by-step rationale for each triage ranking, enabling emergency commanders to audit and override automated calculations with field ground truth.
        </p>
      </div>

      {/* Technology Stack Grid */}
      <div className="p-6 rounded-2xl bg-space-900/80 border border-slate-800 space-y-4">
        <h3 className="font-bold text-white font-display text-base flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          Production Technology Stack
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-lg bg-space-950 border border-slate-800">
            <span className="text-slate-400">Frontend:</span>
            <div className="text-white font-bold mt-0.5">React 18 + TypeScript</div>
          </div>
          <div className="p-3 rounded-lg bg-space-950 border border-slate-800">
            <span className="text-slate-400">Styling:</span>
            <div className="text-white font-bold mt-0.5">Tailwind CSS (Dark HUD)</div>
          </div>
          <div className="p-3 rounded-lg bg-space-950 border border-slate-800">
            <span className="text-slate-400">GIS Mapping:</span>
            <div className="text-white font-bold mt-0.5">Leaflet + Esri Imagery</div>
          </div>
          <div className="p-3 rounded-lg bg-space-950 border border-slate-800">
            <span className="text-slate-400">Charts & HUD:</span>
            <div className="text-white font-bold mt-0.5">Recharts + Canvas</div>
          </div>
        </div>
      </div>
    </div>
  );
};
