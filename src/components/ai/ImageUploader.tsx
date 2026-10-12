import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Sparkles, Check, AlertCircle, Scan, Layers } from 'lucide-react';
import { DisasterType } from '../../types/disaster';
import { SAMPLE_PRESET_IMAGES, SamplePresetImage } from '../../services/aiVisionService';

interface ImageUploaderProps {
  onAnalyze: (imageSrc: string, fileName: string, fileSize: string, disasterType: DisasterType) => void;
  isAnalyzing: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onAnalyze, isAnalyzing }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(SAMPLE_PRESET_IMAGES[0].previewUrl);
  const [fileName, setFileName] = useState<string>('WorldView3_Antakya_Pansharpened_0.3m.tif');
  const [fileSize, setFileSize] = useState<string>('42.8 MB');
  const [disasterType, setDisasterType] = useState<DisasterType>('Earthquake');
  const [selectedPresetId, setSelectedPresetId] = useState<string>(SAMPLE_PRESET_IMAGES[0].id);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setSelectedImage(uploadEvent.target.result as string);
          setFileName(file.name);
          setFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
          setSelectedPresetId('');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePresetSelect = (preset: SamplePresetImage) => {
    setSelectedPresetId(preset.id);
    setSelectedImage(preset.previewUrl);
    setFileName(`${preset.id.toUpperCase()}_${preset.satelliteSensor.replace(/\s+/g, '_')}.tif`);
    setFileSize('38.4 MB');
    setDisasterType(preset.disasterType);
  };

  const handleRunAnalysis = () => {
    if (selectedImage) {
      onAnalyze(selectedImage, fileName, fileSize, disasterType);
    }
  };

  return (
    <div className="space-y-6">
      {/* Preset Satellite Imagery Scenarios */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" /> Preset Satellite Imagery Scenarios
          </label>
          <span className="text-[11px] font-mono text-cyan-400">High-Resolution Sensor Feeds</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {SAMPLE_PRESET_IMAGES.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => handlePresetSelect(preset)}
                className={`relative rounded-xl overflow-hidden border cursor-pointer transition-all group ${
                  isSelected 
                    ? 'border-cyan-400 ring-2 ring-cyan-500/40 shadow-[0_0_20px_rgba(0,242,254,0.3)]' 
                    : 'border-slate-800 hover:border-slate-600 opacity-75 hover:opacity-100'
                }`}
              >
                <div className="h-24 w-full relative">
                  <img 
                    src={preset.previewUrl} 
                    alt={preset.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/40 to-transparent" />
                  <span className="absolute top-2 left-2 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/70 border border-white/20 text-white">
                    {preset.disasterType}
                  </span>
                  {isSelected && (
                    <span className="absolute top-2 right-2 p-1 rounded-full bg-cyan-400 text-space-950">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div className="p-2.5 bg-space-900/90 text-left">
                  <h5 className="font-display font-bold text-xs text-white truncate">{preset.title}</h5>
                  <p className="text-[10px] font-mono text-cyan-400/90 mt-0.5">{preset.satelliteSensor}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upload Drag & Drop Box */}
      <div className="p-5 rounded-2xl bg-space-900/60 border border-dashed border-cyan-500/30 hover:border-cyan-400 transition-all flex flex-col md:flex-row items-center gap-6">
        {/* Preview Thumbnail */}
        <div className="w-full md:w-56 h-36 rounded-xl overflow-hidden bg-space-950 border border-slate-800 relative shrink-0">
          {selectedImage ? (
            <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-2">
              <ImageIcon className="w-8 h-8 text-slate-600" />
              <span className="text-xs font-mono">No Image Selected</span>
            </div>
          )}
          <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-cyan-400 border border-cyan-500/30">
            {fileSize}
          </div>
        </div>

        {/* Upload Controls */}
        <div className="flex-1 space-y-3 w-full">
          <div>
            <h4 className="text-sm font-bold text-white font-display">
              Upload Custom Satellite / Aerial GeoTIFF or Aerial Photo
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Supports Sentinel-2 (JP2/GeoTIFF), Landsat-8/9, PlanetScope, Maxar WorldView, and Drone Orthomosaics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept="image/*" 
              className="hidden" 
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded-xl bg-space-950 hover:bg-slate-800 border border-slate-700 text-white font-mono text-xs flex items-center gap-2 transition-colors"
            >
              <Upload className="w-4 h-4 text-cyan-400" />
              <span>Browse Image File</span>
            </button>

            {/* Disaster Type Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Disaster Category:</span>
              <select
                value={disasterType}
                onChange={(e) => setDisasterType(e.target.value as DisasterType)}
                className="bg-space-950 border border-cyan-500/40 rounded-lg px-3 py-1.5 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-400"
              >
                <option value="Earthquake">Earthquake (Structural Rubble / Fissures)</option>
                <option value="Flood">Flood (SAR Inundation / Submerged Roads)</option>
                <option value="Landslide">Landslide (Debris Flow / Mud Burial)</option>
                <option value="Cyclone">Cyclone (Roof Shearing / Storm Surge)</option>
              </select>
            </div>
          </div>

          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2 pt-1">
            <span className="text-slate-300 font-semibold">{fileName}</span>
            <span>•</span>
            <span className="text-cyan-400">{disasterType} Model Pipeline Active</span>
          </div>
        </div>
      </div>

      {/* Action CTA Button */}
      <div className="flex justify-center">
        <button
          onClick={handleRunAnalysis}
          disabled={isAnalyzing || !selectedImage}
          className={`px-8 py-3.5 rounded-xl font-display font-bold text-sm tracking-wider uppercase transition-all flex items-center gap-3 shadow-lg ${
            isAnalyzing
              ? 'bg-space-800 text-slate-400 border border-slate-700 cursor-not-allowed'
              : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 text-slate-950 hover:opacity-95 shadow-[0_0_25px_rgba(0,242,254,0.4)] hover:scale-105 active:scale-95'
          }`}
        >
          {isAnalyzing ? (
            <>
              <Scan className="w-5 h-5 text-cyan-400 animate-spin" />
              <span>Running Deep Neural Vision Scan...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Analyze Satellite Imagery With AI</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
