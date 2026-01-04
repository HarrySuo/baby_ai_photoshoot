import React, { useState } from 'react';
import { GeneratedPhoto } from '../../types';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

interface ResultStepProps {
  results: GeneratedPhoto[];
  onRestart: (fullReset?: boolean) => void;
}

export const ResultStep: React.FC<ResultStepProps> = ({ results, onRestart }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleDownload = (photo: GeneratedPhoto) => {
    const link = document.createElement('a');
    link.href = photo.url;
    link.download = `baby_photo_${photo.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    alert("已复制高清写真链接！快去分享给家人吧～");
  };

  const currentPhoto = results[currentIndex];

  return (
    <div className="flex flex-col h-screen bg-black relative overflow-hidden">
      {/* Background/Full-screen Image Container */}
      <div className="absolute inset-0 z-0">
        {results.length > 0 && (
          <div className="w-full h-full relative">
            <img 
              src={currentPhoto.url} 
              alt="Result" 
              className="w-full h-full object-cover animate-fade-in" 
              key={currentPhoto.id}
            />
            {/* Soft overlay for better contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
          </div>
        )}
      </div>

      {/* Top Header Controls */}
      <header className="relative z-20 flex items-center justify-between p-4 bg-transparent">
        <button 
          onClick={() => onRestart(true)} 
          className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs font-medium border border-white/30"
        >
          返回首页
        </button>
        <div className="bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-white/90 text-[10px] font-bold">
          {currentIndex + 1} / {results.length}
        </div>
      </header>

      {/* Navigation Arrows (if multiple results) */}
      {results.length > 1 && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-10 flex justify-between px-2 pointer-events-none">
          <button 
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(prev => prev - 1)}
            className={`pointer-events-auto p-2 rounded-full bg-white/10 backdrop-blur-sm text-white transition-opacity ${currentIndex === 0 ? 'opacity-0' : 'opacity-100'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button 
            disabled={currentIndex === results.length - 1}
            onClick={() => setCurrentIndex(prev => prev + 1)}
            className={`pointer-events-auto p-2 rounded-full bg-white/10 backdrop-blur-sm text-white transition-opacity ${currentIndex === results.length - 1 ? 'opacity-0' : 'opacity-100'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}

      {/* Bottom Action Area */}
      <footer className="relative z-20 mt-auto p-6 flex flex-col gap-4 animate-fade-in-up">
        {/* Photo Info */}
        <div className="text-white">
          <p className="text-sm font-light opacity-80 mb-1">AI 创意写真</p>
          <h3 className="text-xl font-bold tracking-wide">{currentPhoto?.templateName}</h3>
        </div>

        <div className="flex flex-col gap-3">
          <Button 
            onClick={handleShare} 
            fullWidth 
            className="bg-[#07c160] hover:bg-[#06ad56] text-white shadow-none py-4"
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.57.36 3.05 1 4.37L1.6 22.4l6.16-1.39C9.07 21.64 10.49 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.5 12.5c-.21.11-1.24.61-1.43.68-.19.07-.33.1-.47.31-.14.21-.54.68-.66.82-.12.14-.24.15-.45.04-.21-.11-.88-.32-1.67-1.03-.62-.55-1.03-1.23-1.15-1.44-.12-.21-.01-.33.1-.43.09-.1.21-.24.31-.36.1-.12.14-.21.21-.35.07-.14.03-.27-.02-.38-.05-.11-.47-1.14-.64-1.55-.17-.41-.34-.35-.47-.35h-.4c-.14 0-.36.05-.55.26-.19.21-.73.71-.73 1.73s.74 2.01.84 2.14c.1.14 1.45 2.21 3.51 3.1.49.21.87.34 1.17.43.5.16.95.13 1.31.08.4-.06 1.24-.51 1.42-1 .18-.49.18-.91.13-1-.05-.09-.19-.14-.4-.25z"/></svg>
              分享至微信朋友圈
            </div>
          </Button>
          
          <div className="flex gap-3">
            <Button 
              variant="secondary" 
              fullWidth 
              onClick={() => handleDownload(currentPhoto)}
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
            >
              保存原图
            </Button>
            <Button 
              variant="secondary" 
              fullWidth 
              onClick={() => onRestart(false)}
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
            >
              换个模板
            </Button>
          </div>
        </div>

        <button 
          onClick={() => setShowFeedback(true)}
          className="text-[10px] text-white/40 uppercase tracking-[0.2em] text-center hover:text-white/60 transition-colors py-2"
        >
          Satisfaction Feedback
        </button>
      </footer>

      {/* Feedback Modal */}
      <Modal isOpen={showFeedback} onClose={() => setShowFeedback(false)} title="满意度反馈">
         <div className="space-y-4">
            <div className="flex justify-between px-4">
                {['😡', '😐', '😍'].map((emoji, i) => (
                    <button key={i} className="flex flex-col items-center p-3 hover:bg-pink-50 rounded-2xl transition-colors">
                        <span className="text-3xl mb-1">{emoji}</span>
                        <span className="text-[10px] text-gray-400 font-medium">
                          {i === 0 ? '不满意' : i === 1 ? '一般' : '非常满意'}
                        </span>
                    </button>
                ))}
            </div>
            <textarea 
                className="w-full border border-gray-100 bg-gray-50 rounded-xl p-4 text-sm focus:ring-2 focus:ring-pink-200 focus:outline-none transition-all"
                rows={3}
                placeholder="这一刻的想法是？"
            />
            <Button fullWidth onClick={() => { alert("感谢宝妈的反馈！我们会继续努力哒～"); setShowFeedback(false); }}>提交评价</Button>
         </div>
      </Modal>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />
    </div>
  );
};
