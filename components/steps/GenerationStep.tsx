import React, { useEffect, useState, useRef } from 'react';
import { Photo, TemplateScene, TemplateStyle, GeneratedPhoto } from '../../types';
import { generateBabyPhoto } from '../../services/geminiService';
import { Button } from '../ui/Button';

interface GenerationStepProps {
  photos: Photo[];
  scene: TemplateScene;
  style: TemplateStyle;
  onComplete: (results: GeneratedPhoto[]) => void;
  onBack: () => void;
}

const WARM_MESSAGES = [
  "正在捕捉宝贝的萌动瞬间...",
  "AI 艺术大师正在细心描绘...",
  "正在为宝贝定制专属写真...",
  "唯美大片即将呈现，请稍候...",
  "爱与科技正在奇妙交汇..."
];

export const GenerationStep: React.FC<GenerationStepProps> = ({ photos, scene, style, onComplete, onBack }) => {
  const [generatedCount, setGeneratedCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);
  const isRunning = useRef(false);

  const totalToGenerate = photos.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % WARM_MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const startGeneration = async () => {
    if (isRunning.current) return;
    isRunning.current = true;
    setError(null);
    setGeneratedCount(0);

    const results: GeneratedPhoto[] = [];
    
    try {
      for (const photo of photos) {
        try {
          const generatedBase64 = await generateBabyPhoto(photo, scene, style);
          
          results.push({
            id: `gen_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            url: generatedBase64,
            originalPhotoId: photo.id,
            templateName: `${scene.name} ${style.name}`
          });
          
          setGeneratedCount(prev => prev + 1);
        } catch (e) {
          console.error("Single generation failed", e);
        }
      }

      if (results.length === 0) {
        throw new Error("生成失败，请检查网络或更换清晰照片重试");
      }

      setTimeout(() => {
        onComplete(results);
      }, 800);

    } catch (e: any) {
      setError(e.message || "未知错误");
      isRunning.current = false;
    }
  };

  useEffect(() => {
    startGeneration();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 text-center">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
           <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">生成遇到一点小问题</h2>
        <p className="text-gray-500 mb-8">{error}</p>
        <div className="flex gap-4 w-full max-w-xs">
           <Button variant="secondary" onClick={onBack} fullWidth>返回修改</Button>
           <Button onClick={() => { isRunning.current = false; startGeneration(); }} fullWidth>重试</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-50 to-white p-8">
      <div className="w-full max-w-xs text-center">
        {/* Soft Animated Icon */}
        <div className="relative w-32 h-32 mx-auto mb-10">
          <div className="absolute inset-0 bg-pink-200/30 rounded-full animate-ping opacity-75"></div>
          <div className="absolute inset-2 bg-pink-100 rounded-full flex items-center justify-center shadow-inner">
             <svg className="w-16 h-16 text-pink-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
             </svg>
          </div>
          {/* Decorative Sparkles */}
          <div className="absolute -top-2 -right-2 text-yellow-400 animate-bounce delay-75">✨</div>
          <div className="absolute -bottom-1 -left-1 text-pink-300 animate-bounce delay-150">⭐</div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4 transition-all duration-500">
          {WARM_MESSAGES[messageIndex]}
        </h2>
        
        <div className="space-y-4">
          <div className="w-full bg-pink-100/50 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-pink-400 h-full transition-all duration-1000 ease-in-out"
              style={{ width: `${totalToGenerate > 0 ? (generatedCount / totalToGenerate) * 100 : 0}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-pink-400 font-medium tracking-widest uppercase">
            <span>Progress</span>
            <span>{generatedCount} / {totalToGenerate}</span>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-12 italic">温馨提示：为了您的体验，请保持屏幕常亮</p>
      </div>
    </div>
  );
};
