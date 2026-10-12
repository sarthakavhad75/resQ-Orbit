import React from 'react';
import { 
  Satellite, 
  ShieldAlert, 
  MapPin, 
  Scan, 
  Network, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  Globe2, 
  Radio, 
  CheckCircle2, 
  Activity,
  Layers,
  Flame,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { useDisaster } from '../context/DisasterContext';
import { RadarScanner } from '../components/common/RadarScanner';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';

export const LandingPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { allZones, selectZone } = useDisaster();

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative pt-8 md:pt-16 pb-12 overflow-hidden">
        {/* Glowing Background Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 text-center space-y-6 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/90 border border-cyan-400/50 text-cyan-300 text-xs font-mono shadow-[0_0_15px_rgba(0,242,254,0.3)] animate-pulse">
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
            <span>SPACE-BASED DISASTER INTELLIGENCE PLATFORM</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-white leading-tight max-w-4xl mx-auto">
            “When Disaster Strikes, <br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,242,254,0.4)]">
              See Beyond the Damage.”
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-sans">
            RescueSat AI transforms satellite observations into actionable disaster intelligence, 
            helping emergency teams identify damage, assess accessibility, and prioritize rescue operations when terrestrial communications fail.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-space-950 font-bold font-display text-sm tracking-wider uppercase flex items-center gap-2 shadow-[0_0_25px_rgba(0,242,254,0.4)] transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Open Emergency Dashboard</span>
            </button>

            <button
              onClick={() => onNavigate('ai-analysis')}
              className="px-6 py-3.5 rounded-xl bg-space-900/90 hover:bg-space-850 border border-cyan-500/40 text-cyan-300 font-bold font-display text-sm tracking-wider uppercase flex items-center gap-2 shadow-md transition-all hover:border-cyan-400 hover:scale-105"
            >
              <Scan className="w-4 h-4 text-cyan-400" />
              <span>Analyze Satellite Image</span>
            </button>

            <button
              onClick={() => onNavigate('map')}
              className="px-6 py-3.5 rounded-xl bg-space-900/60 hover:bg-slate-800 border border-slate-700 text-white font-mono text-sm flex items-center gap-2 transition-all hover:scale-105"
            >
              <Compass className="w-4 h-4 text-slate-400" />
              <span>Explore Disaster Map</span>
            </button>
          </div>

          {/* Prototype disclaimer */}
          <div className="pt-4 max-w-2xl mx-auto">
            <DisclaimerBanner compact />
          </div>
        </div>
      </section>

      {/* Hero Visual Mockup HUD */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="relative rounded-2xl p-1 bg-gradient-to-b from-cyan-500/40 via-slate-800/50 to-transparent shadow-[0_0_50px_rgba(0,242,254,0.15)]">
          <div className="rounded-[14px] bg-space-950 overflow-hidden border border-cyan-500/30">
            {/* Top Bar Window Decorator */}
            <div className="px-4 py-2.5 bg-space-900/90 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-slate-400">RESCUESAT-EOC-TELEMETRY-STREAM // COPERNICUS EMS LINK ACTIVE</span>
              </div>
              <span className="text-cyan-400 font-semibold">ORBITAL PASS: 786 KM ALTITUDE</span>
            </div>

            {/* Simulated Live Interface Snapshot */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 bg-grid-pattern">
              {/* Radar Scanner widget */}
              <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-xl bg-space-900/80 border border-slate-800">
                <RadarScanner size={200} activeTargetsCount={8} satelliteName="Sentinel-2B Optical" />
              </div>

              {/* Key Features Overview in HUD */}
              <div className="md:col-span-8 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-400" /> Space-Enabled Emergency Capabilities
                  </div>
                  <h3 className="text-2xl font-bold font-display text-white">
                    Rapid AI Geospatial Decision-Support Architecture
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    When terrestrial towers, power grids, and bridge crossings collapse, RescueSat AI synthesizes optical and Synthetic Aperture Radar (SAR) imagery to automatically detect pancake collapses, delineate flood footprints, identify severed lifeline bridges, and mathematically rank rescue operations.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-xs">
                  <div className="p-2.5 rounded-lg bg-space-900 border border-cyan-500/30">
                    <div className="text-cyan-400 font-bold">10m / 0.3m GSD</div>
                    <div className="text-[10px] text-slate-400">Multispectral Resolution</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-space-900 border border-red-500/30">
                    <div className="text-red-400 font-bold">&lt; 2.2 Seconds</div>
                    <div className="text-[10px] text-slate-400">AI Damage Inference</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-space-900 border border-purple-500/30">
                    <div className="text-purple-400 font-bold">Topological Graph</div>
                    <div className="text-[10px] text-slate-400">Isolation Detection</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Disaster Scenarios Showcase */}
      <section className="max-w-6xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Active Disaster Operation Zones
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Explore simulated operational scenarios pre-loaded with satellite passes and triage data
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {allZones.map((zone) => (
            <div
              key={zone.id}
              onClick={() => {
                selectZone(zone.id);
                onNavigate('dashboard');
              }}
              className="p-5 rounded-2xl bg-space-900/80 border border-slate-800 hover:border-cyan-400 transition-all cursor-pointer group flex flex-col justify-between space-y-4 hover:shadow-[0_0_25px_rgba(0,242,254,0.15)]"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-red-950 text-red-300 border border-red-500/40">
                    {zone.disasterType}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{zone.lastSatellitePass}</span>
                </div>

                <h4 className="font-bold text-white text-base font-display group-hover:text-cyan-400 transition-colors">
                  {zone.name}
                </h4>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {zone.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-cyan-400 group-hover:translate-x-1 transition-transform">
                <span>Enter Zone EOC</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Workflow Pillars */}
      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            End-to-End Tactical Workflow
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            From low-Earth orbit constellation passes to field unit dispatch
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-space-900/60 border border-cyan-500/20 space-y-3">
            <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 w-fit">
              <Satellite className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white font-display">1. Satellite Ingestion</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Connects to Sentinel-2, Landsat-9, and SAR constellations to acquire pre- and post-disaster orthomosaics across affected disaster basins.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-space-900/60 border border-purple-500/20 space-y-3">
            <div className="p-3 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-400 w-fit">
              <Cpu className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white font-display">2. AI Vision Analysis</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Applies deep segmentation networks and object detection to classify structural collapses, flood footprints, debris landslides, and severed bridges.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-space-900/60 border border-emerald-500/20 space-y-3">
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white font-display">3. Rescue Triage & Dispatch</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Mathematically prioritizes incidents from 0-100, highlights isolated communities, generates printable SitReps, and dispatches USAR units.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
