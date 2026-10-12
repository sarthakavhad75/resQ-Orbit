import React, { useState } from 'react';
import { calculatePriorityScore, DEFAULT_PRIORITY_WEIGHTS } from '../../services/priorityEngine';
import { PriorityWeights, PriorityLevel } from '../../types/disaster';
import { PriorityBadge } from '../common/PriorityBadge';
import { Calculator, Sliders, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';

export const PriorityScoreCalculator: React.FC = () => {
  const [peopleAffected, setPeopleAffected] = useState<number>(350);
  const [damageSeverity, setDamageSeverity] = useState<'Total Collapse' | 'Heavy Structural' | 'Moderate Damage' | 'Infrastructure Severed' | 'Minor Hazard'>('Total Collapse');
  const [accessibility, setAccessibility] = useState<'Accessible' | 'Partially Blocked' | 'Impassable' | 'Aerial Only'>('Impassable');
  const [isHospital, setIsHospital] = useState<boolean>(false);
  const [hasVulnerable, setHasVulnerable] = useState<boolean>(true);
  const [weights, setWeights] = useState<PriorityWeights>(DEFAULT_PRIORITY_WEIGHTS);

  const result = calculatePriorityScore({
    peopleAffected,
    damageSeverityRating: damageSeverity,
    accessibility,
    isHospitalOrLifeline: isHospital,
    hasVulnerablePopulations: hasVulnerable
  }, weights);

  return (
    <div className="p-5 rounded-2xl bg-space-900/90 border border-cyan-500/30 space-y-6 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
            <Calculator className="w-5 h-5 text-cyan-400" />
            Interactive Rescue Priority Scoring Engine
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Mathematical decision-support formula for multi-factor emergency triage
          </p>
        </div>

        <button
          onClick={() => {
            setWeights(DEFAULT_PRIORITY_WEIGHTS);
            setPeopleAffected(350);
            setDamageSeverity('Total Collapse');
            setAccessibility('Impassable');
          }}
          className="self-start md:self-auto px-3 py-1.5 rounded-lg bg-space-950 hover:bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Weights</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs (7 Cols) */}
        <div className="lg:col-span-7 space-y-4 text-xs">
          {/* People Affected Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-mono">
              <label className="text-slate-300 font-semibold">Estimated People Affected:</label>
              <span className="text-cyan-400 font-bold text-sm">{peopleAffected.toLocaleString()} people</span>
            </div>
            <input
              type="range"
              min={1}
              max={2500}
              step={10}
              value={peopleAffected}
              onChange={(e) => setPeopleAffected(Number(e.target.value))}
              className="w-full accent-cyan-400 bg-space-950 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Damage Rating */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-mono font-semibold block">Damage Severity Classification:</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'Total Collapse', label: '💥 Total Collapse (100%)' },
                { id: 'Heavy Structural', label: '🏗️ Heavy Structural (85%)' },
                { id: 'Infrastructure Severed', label: '🚧 Lifeline Severed (80%)' },
                { id: 'Moderate Damage', label: '🏚️ Moderate Damage (55%)' },
                { id: 'Minor Hazard', label: '⚠️ Minor Hazard (25%)' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setDamageSeverity(item.id as any)}
                  className={`p-2 rounded-lg border text-left font-mono transition-all ${
                    damageSeverity === item.id
                      ? 'bg-cyan-950 border-cyan-400 text-cyan-200 shadow-sm'
                      : 'bg-space-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accessibility */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-mono font-semibold block">Ground Route Accessibility:</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'Aerial Only', label: '🚁 Aerial Only' },
                { id: 'Impassable', label: '⛔ Impassable' },
                { id: 'Partially Blocked', label: '⚠️ Partially Blocked' },
                { id: 'Accessible', label: '✅ Accessible' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setAccessibility(item.id as any)}
                  className={`p-2 rounded-lg border text-center font-mono transition-all ${
                    accessibility === item.id
                      ? 'bg-purple-950 border-purple-400 text-purple-200'
                      : 'bg-space-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Lifeline & Vulnerability Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <label className="p-3 rounded-xl bg-space-950 border border-slate-800 flex items-center gap-3 cursor-pointer hover:border-cyan-500/40">
              <input
                type="checkbox"
                checked={isHospital}
                onChange={(e) => setIsHospital(e.target.checked)}
                className="accent-cyan-400 w-4 h-4 rounded"
              />
              <span className="font-mono text-slate-200">Critical Medical / Trauma Facility</span>
            </label>

            <label className="p-3 rounded-xl bg-space-950 border border-slate-800 flex items-center gap-3 cursor-pointer hover:border-cyan-500/40">
              <input
                type="checkbox"
                checked={hasVulnerable}
                onChange={(e) => setHasVulnerable(e.target.checked)}
                className="accent-cyan-400 w-4 h-4 rounded"
              />
              <span className="font-mono text-slate-200">High Concentration of Vulnerable Persons</span>
            </label>
          </div>
        </div>

        {/* Right Output Score Box (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-2xl bg-space-950 border border-cyan-500/40 shadow-[0_0_30px_rgba(0,242,254,0.1)] space-y-4">
          <div className="space-y-2">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center justify-between">
              <span>CALCULATED PRIORITY SCORE</span>
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            </div>

            <div className="flex items-baseline gap-3">
              <div className="text-5xl font-black font-display text-white tracking-tight">
                {result.score}
              </div>
              <div className="text-sm font-mono text-slate-400">/ 100</div>
              <PriorityBadge level={result.level} size="lg" />
            </div>
          </div>

          {/* Breakdown Pills */}
          <div className="space-y-2">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
              Score Component Weights
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2 rounded-lg bg-space-900 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Population:</span>
                <span className="text-cyan-400 font-bold">{result.breakdown.populationScore} pts</span>
              </div>
              <div className="p-2 rounded-lg bg-space-900 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Damage:</span>
                <span className="text-red-400 font-bold">{result.breakdown.damageScore} pts</span>
              </div>
              <div className="p-2 rounded-lg bg-space-900 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Isolation:</span>
                <span className="text-orange-400 font-bold">{result.breakdown.isolationScore} pts</span>
              </div>
              <div className="p-2 rounded-lg bg-space-900 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Vulnerability:</span>
                <span className="text-purple-400 font-bold">{result.breakdown.vulnerabilityScore} pts</span>
              </div>
            </div>
          </div>

          {/* Rationale bullet list */}
          <div className="p-3 rounded-xl bg-space-900/80 border border-slate-800 space-y-1.5">
            <div className="text-[11px] font-mono font-bold text-slate-300">
              Scoring Rationale Justifications:
            </div>
            <ul className="space-y-1 text-[11px] text-slate-400 list-disc list-inside">
              {result.breakdown.rationale.map((r, i) => (
                <li key={i} className="leading-tight text-slate-300">{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
