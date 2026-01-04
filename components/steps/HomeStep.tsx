import React from 'react';
import { Button } from '../ui/Button';

interface HomeStepProps {
  onStart: () => void;
}

export const HomeStep: React.FC<HomeStepProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-8 text-center">
        <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-pink-600 bg-pink-100 rounded-full">
          AI 智能生成 • 朋友圈神器
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-3 tracking-tight">
          宝贝<span className="text-pink-500">AI</span>写真馆
        </h1>
        <p className="text-gray-500 mb-8 max-w-xs mx-auto text-sm leading-relaxed">
          无需去影楼，上传宝宝照片<br/>3步一键生成唯美写真
        </p>

        {/* Example Showcase */}
        <div className="w-full max-w-md space-y-4 mb-8">
            <div className="relative group overflow-hidden rounded-xl shadow-lg aspect-video bg-gray-200">
                <img src="https://loremflickr.com/800/450/baby,cute?lock=10" alt="Case 1" className="object-cover w-full h-full" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-left">
                    <span className="text-white text-xs font-medium">婴儿床时光 + 软萌奶油风</span>
                </div>
            </div>
            <div className="flex gap-3">
                 <div className="relative flex-1 overflow-hidden rounded-xl shadow-md aspect-video bg-gray-200">
                    <img src="https://loremflickr.com/800/450/baby,smile?lock=20" alt="Case 2" className="object-cover w-full h-full" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-2">
                        <p className="text-white text-[10px] text-center">周岁生日</p>
                    </div>
                </div>
                <div className="relative flex-1 overflow-hidden rounded-xl shadow-md aspect-video bg-gray-200">
                    <img src="https://loremflickr.com/800/450/baby,portrait?lock=30" alt="Case 3" className="object-cover w-full h-full" />
                     <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-2">
                        <p className="text-white text-[10px] text-center">秋日落叶</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="sticky bottom-0 p-6 bg-white/80 backdrop-blur-md border-t border-pink-100">
        <Button onClick={onStart} fullWidth className="text-lg shadow-pink-300 shadow-xl">
          开始生成 ✨
        </Button>
      </div>
    </div>
  );
};