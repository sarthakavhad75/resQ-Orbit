import React, { useState } from 'react';
import { useDisaster } from '../context/DisasterContext';
import { ImageUploader } from '../components/ai/ImageUploader';
import { AnalysisScanOverlay } from '../components/ai/AnalysisScanOverlay';
import { DetectionResultsCard } from '../components/ai/DetectionResultsCard';
import { analyzeSatelliteImage, SAMPLE_PRESET_IMAGES } from '../../src/services/aiVisionService';
import { AIAnalysisResult, DisasterType } from '../types/disaster';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { Scan, Sparkles, AlertTriangle, ArrowRight } from 'lucide-react';

export const AIDamageAnalysisPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { addNewIncident, activeZone } = useDisaster();

  const [currentImageSrc, setCurrentImageSrc] = useState<string>(SAMPLE_PRESET_IMAGES[0].previewUrl);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [draftSuccessMessage, setDraftSuccessMessage] = useState<string | null>(null);

  // Trigger automated sample analysis on first mount
  React.useEffect(() => {
    handleRunAnalysis(
      SAMPLE_PRESET_IMAGES[0].previewUrl,
      'WorldView3_Antakya_Pansharpened_0.3m.tif',
      '42.8 MB',
      'Earthquake'
    );
  }, []);

  const handleRunAnalysis = async (
    imageSrc: string,
    fileName: string,
    fileSize: string,
    disasterType: DisasterType
  ) => {
    setIsAnalyzing(true);
    setCurrentImageSrc(imageSrc);
    setAnalysisResult(null);
    setDraftSuccessMessage(null);

    try {
      const res = await analyzeSatelliteImage(imageSrc, fileName, fileSize, disasterType, true);
      setAnalysisResult(res);
    } catch (err) {
      console.error('AI Scan Error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDeployRecommendation = (detectionId: string) => {
    if (!analysisResult) return;
    const item = analysisResult.detectedItems.find(i => i.id === detectionId);
    if (!item) return;

    // Convert AI finding into an active incident in current zone
    addNewIncident({
      zoneId: activeZone.id,
      title: `AI-Detected ${item.type} (${item.severity})`,
      category: item.type === 'Structural Collapse' ? 'Collapsed Structure' :
                item.type === 'Severe Roof Damage' ? 'Damaged Building' :
                item.type === 'Flooding / Water Inundation' ? 'Hazard Zone' :
                'Blocked Road',
      disasterType: analysisResult.disasterType,
      coordinates: {
        lat: activeZone.center.lat + (Math.random() - 0.5) * 0.015,
        lng: activeZone.center.lng + (Math.random() - 0.5) * 0.015,
      },
      locationName: `${activeZone.region} - AI Sector Scan #${item.id}`,
      suspectedDamage: `AI Automated Extraction: ${item.recommendation} - Affected Footprint: ${item.areaEstimate || 'Identified in imagery'}.`,
      estimatedPeopleAffected: item.affectedBuildings ? item.affectedBuildings * 4 : 45,
      accessibility: item.severity === 'Critical' ? 'Impassable' : 'Partially Blocked',
      verificationStatus: 'AI-Flagged',
      confidenceScore: item.confidence,
      dataSource: `${analysisResult.rawSatelliteMetadata.satellite} (${analysisResult.modelArchitecture})`,
      observationTime: analysisResult.analysisTimestamp,
      notes: `Generated automatically via Computer Vision Detection ID ${item.id}`,
      isSimulated: true
    });

    setDraftSuccessMessage(`Successfully converted "${item.type}" into an active incident in the Operations Center!`);
    setTimeout(() => setDraftSuccessMessage(null), 5000);
  };

  return (
    <div className="space-y-6 pb-12">
      <DisclaimerBanner />

      {/* Header */}
      <div className="p-4 rounded-xl bg-space-900/90 border border-cyan-500/20 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-purple-400 font-bold uppercase">
              DEEP NEURAL GEOSPATIAL ANALYSIS
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Model: <strong className="text-cyan-400">YOLOv8-OBB + SAM-Geo v2</strong>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-0.5">
            AI Satellite Damage Detection Studio
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('operations')}
            className="px-3.5 py-1.5 rounded-lg bg-space-950 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
          >
            <span>View All Incidents</span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      </div>

      {draftSuccessMessage && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-in fade-in">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{draftSuccessMessage}</span>
        </div>
      )}

      {/* Upload and Preset Selection Card */}
      <ImageUploader
        onAnalyze={handleRunAnalysis}
        isAnalyzing={isAnalyzing}
      />

      {/* Visual Scanning Viewport with Laser Beam & Bounding Boxes */}
      <AnalysisScanOverlay
        result={analysisResult}
        isScanning={isAnalyzing}
        imageSrc={currentImageSrc}
      />

      {/* Detailed Analysis Results & Recommendations */}
      <DetectionResultsCard
        result={analysisResult}
        onDeployRecommendation={handleDeployRecommendation}
      />
    </div>
  );
};
