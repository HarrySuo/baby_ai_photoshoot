import React, { useState } from 'react';
import { AppStep, Photo, TemplateScene, TemplateStyle, GeneratedPhoto } from './types';
import { SCENES, STYLES } from './constants';
import { HomeStep } from './components/steps/HomeStep';
import { UploadStep } from './components/steps/UploadStep';
import { TemplateStep } from './components/steps/TemplateStep';
import { GenerationStep } from './components/steps/GenerationStep';
import { ResultStep } from './components/steps/ResultStep';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.HOME);
  const [uploadedPhotos, setUploadedPhotos] = useState<Photo[]>([]);
  const [selectedScene, setSelectedScene] = useState<TemplateScene>(SCENES[0]);
  const [selectedStyle, setSelectedStyle] = useState<TemplateStyle>(STYLES[0]);
  const [results, setResults] = useState<GeneratedPhoto[]>([]);

  const handleStart = () => setCurrentStep(AppStep.UPLOAD);

  const handleUploadNext = () => setCurrentStep(AppStep.TEMPLATE);
  const handleUploadBack = () => setCurrentStep(AppStep.HOME);

  const handleTemplateNext = (scene: TemplateScene, style: TemplateStyle) => {
    setSelectedScene(scene);
    setSelectedStyle(style);
    setCurrentStep(AppStep.GENERATING);
  };
  const handleTemplateBack = () => setCurrentStep(AppStep.UPLOAD);

  const handleGenerationComplete = (generatedResults: GeneratedPhoto[]) => {
    setResults(generatedResults);
    setCurrentStep(AppStep.RESULT);
  };
  const handleGenerationBack = () => setCurrentStep(AppStep.TEMPLATE);

  const handleRestart = (fullReset: boolean = false) => {
    if (fullReset) {
      setUploadedPhotos([]);
      setResults([]);
      setCurrentStep(AppStep.HOME);
    } else {
      setCurrentStep(AppStep.TEMPLATE);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl overflow-hidden relative">
      {currentStep === AppStep.HOME && (
        <HomeStep onStart={handleStart} />
      )}
      
      {currentStep === AppStep.UPLOAD && (
        <UploadStep 
          photos={uploadedPhotos} 
          setPhotos={setUploadedPhotos} 
          onNext={handleUploadNext}
          onBack={handleUploadBack}
        />
      )}

      {currentStep === AppStep.TEMPLATE && (
        <TemplateStep 
          onNext={handleTemplateNext}
          onBack={handleTemplateBack}
        />
      )}

      {currentStep === AppStep.GENERATING && (
        <GenerationStep 
          photos={uploadedPhotos}
          scene={selectedScene}
          style={selectedStyle}
          onComplete={handleGenerationComplete}
          onBack={handleGenerationBack}
        />
      )}

      {currentStep === AppStep.RESULT && (
        <ResultStep 
          results={results}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default App;
