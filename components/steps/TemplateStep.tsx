import React, { useState } from 'react';
import { TemplateScene, TemplateStyle } from '../../types';
import { SCENES, STYLES } from '../../constants';
import { Button } from '../ui/Button';

interface TemplateStepProps {
  onNext: (scene: TemplateScene, style: TemplateStyle) => void;
  onBack: () => void;
}

export const TemplateStep: React.FC<TemplateStepProps> = ({ onNext, onBack }) => {
  const [selectedScene, setSelectedScene] = useState<TemplateScene>(SCENES[0]);
  const [selectedStyle, setSelectedStyle] = useState<TemplateStyle>(STYLES[0]);

  // Create a unique numeric key for the lock parameter based on the selected scene and style
  const lockId = (selectedScene.id.length * 10) + selectedStyle.id.length;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white p-4 shadow-sm flex items-center sticky top-0 z-10 shrink-0">
         <button onClick={onBack} className="text-gray-500 mr-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
         </button>
         <h2 className="text-lg font-bold text-gray-800">选择模板</h2>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="bg-white p-6 pb-8">
            <div className="aspect-video bg-gradient-to-br from-pink-100 to-blue-50 rounded-xl shadow-inner flex items-center justify-center mb-4 relative overflow-hidden group">
               <img 
                 src={`https://loremflickr.com/600/337/baby,infant?lock=${lockId}`} 
                 alt="Template Preview" 
                 className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-500" 
                 key={lockId} // Key ensures the image reloads correctly when switching
               />
               <div className="relative bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-sm text-center">
                   <p className="font-bold text-gray-800">{selectedScene.name}</p>
                   <p className="text-xs text-pink-500">+ {selectedStyle.name}</p>
               </div>
            </div>
            <p className="text-center text-sm text-gray-500">{selectedStyle.description}</p>
        </div>

        <div className="p-4 space-y-6">
            <div>
                <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">第一步：选择场景</h3>
                <div className="grid grid-cols-2 gap-3">
                    {SCENES.map(scene => (
                        <button 
                            key={scene.id}
                            onClick={() => setSelectedScene(scene)}
                            className={`p-3 rounded-xl border text-left transition-all ${
                                selectedScene.id === scene.id 
                                ? 'border-pink-500 bg-pink-50 ring-1 ring-pink-500' 
                                : 'border-gray-200 bg-white hover:border-pink-200'
                            }`}
                        >
                            <span className="block font-medium text-gray-800 text-sm">{scene.name}</span>
                            <span className="block text-xs text-gray-400 truncate mt-1">{scene.description}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">第二步：选择风格</h3>
                <div className="flex flex-wrap gap-2">
                    {STYLES.map(style => (
                        <button 
                            key={style.id}
                            onClick={() => setSelectedStyle(style)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                selectedStyle.id === style.id 
                                ? 'bg-gray-800 text-white shadow-lg' 
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                            {style.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </div>

      <div className="p-6 bg-white border-t border-gray-100 shrink-0">
        <Button onClick={() => onNext(selectedScene, selectedStyle)} fullWidth className="animate-pulse-slow">
          ✨ 立即生成写真
        </Button>
      </div>
    </div>
  );
};