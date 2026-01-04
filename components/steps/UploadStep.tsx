import React, { useState, useRef } from 'react';
import { Photo } from '../../types';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { PRIVACY_POLICY_TEXT } from '../../constants';
import { detectFace } from '../../services/geminiService';

interface UploadStepProps {
  photos: Photo[];
  setPhotos: (photos: Photo[] | ((prev: Photo[]) => Photo[])) => void;
  onNext: () => void;
  onBack: () => void;
}

export const UploadStep: React.FC<UploadStepProps> = ({ photos, setPhotos, onNext, onBack }) => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const validFiles = newFiles.filter(f => f.size <= 10 * 1024 * 1024);
      
      if (validFiles.length < newFiles.length) {
        alert("部分照片超过10MB，已自动过滤");
      }

      if (validFiles.length > 0) {
        setPendingFiles(validFiles);
        setShowPrivacyModal(true);
      }
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePrivacyAgree = async () => {
    const newPhotos: Photo[] = pendingFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      previewUrl: URL.createObjectURL(file),
      rotation: 0,
      isValidating: true
    }));

    if (photos.length + newPhotos.length > 3) {
      alert("最多上传3张照片，请重新选择");
      setShowPrivacyModal(false);
      return;
    }

    setPhotos(prev => [...prev, ...newPhotos]);
    setShowPrivacyModal(false);
    setPendingFiles([]);

    // Validate face presence for each new photo
    for (const photo of newPhotos) {
      const hasFace = await detectFace(photo);
      setPhotos(prev => prev.map(p => 
        p.id === photo.id ? { ...p, isValidating: false, hasFace } : p
      ));
    }
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  const handleRotatePhoto = async (id: string) => {
    setPhotos(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, rotation: (p.rotation + 90) % 360, isValidating: true };
      }
      return p;
    }));

    const updatedPhoto = photos.find(p => p.id === id);
    if (updatedPhoto) {
      const nextRotation = (updatedPhoto.rotation + 90) % 360;
      const hasFace = await detectFace({ ...updatedPhoto, rotation: nextRotation });
      setPhotos(prev => prev.map(p => 
        p.id === id ? { ...p, isValidating: false, hasFace } : p
      ));
    }
  };

  const allValid = photos.length > 0 && photos.every(p => !p.isValidating && p.hasFace === true);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white p-4 shadow-sm flex items-center sticky top-0 z-10">
         <button onClick={onBack} className="text-gray-500 mr-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
         </button>
         <h2 className="text-lg font-bold text-gray-800">上传照片</h2>
      </header>

      <div className="flex-1 p-6">
        <div className="bg-blue-50 text-blue-700 text-sm p-3 rounded-lg mb-6">
          📷 <strong>检测人脸：</strong> 系统将自动检测照片中是否包含清晰人脸，请上传正面免冠照片。
        </div>

        {photos.length === 0 ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-pink-300 rounded-2xl h-64 flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-pink-50 transition-colors"
          >
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </div>
            <p className="text-gray-600 font-medium">点击上传照片</p>
            <p className="text-gray-400 text-xs mt-2">支持 JPG/PNG，单张 ≤10MB</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {photos.map(photo => (
              <div key={photo.id} className={`bg-white p-3 rounded-xl shadow-sm flex gap-4 relative border-2 ${photo.hasFace === false ? 'border-red-200 bg-red-50' : 'border-transparent'}`}>
                <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                  <img 
                    src={photo.previewUrl} 
                    alt="Preview" 
                    className="w-full h-full object-cover transition-transform duration-300"
                    style={{ transform: `rotate(${photo.rotation}deg)` }}
                  />
                  {photo.isValidating && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-center gap-2">
                   {photo.isValidating ? (
                     <span className="text-xs text-gray-400">正在检测人脸...</span>
                   ) : photo.hasFace === false ? (
                     <span className="text-xs text-red-500 font-bold">未检测到清晰人脸，请更换</span>
                   ) : (
                     <span className="text-xs text-green-500 flex items-center gap-1">
                       <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                       检测通过
                     </span>
                   )}
                   <div className="flex gap-2">
                    <button 
                      onClick={() => handleRotatePhoto(photo.id)}
                      className="flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1.5 rounded-lg hover:bg-gray-200"
                    >
                      旋转
                    </button>
                    <button 
                      onClick={() => handleRemovePhoto(photo.id)}
                      className="flex items-center text-xs text-red-500 bg-red-50 px-2 py-1.5 rounded-lg hover:bg-red-100"
                    >
                      删除
                    </button>
                   </div>
                </div>
              </div>
            ))}
            {photos.length < 3 && (
               <button 
                 onClick={() => fileInputRef.current?.click()}
                 className="border-2 border-dashed border-gray-200 rounded-xl py-4 text-gray-500 flex items-center justify-center gap-2 hover:bg-gray-50"
               >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                 继续添加 ({photos.length}/3)
               </button>
            )}
          </div>
        )}

        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/png, image/jpeg" 
          multiple
          onChange={handleFileChange}
        />
      </div>

      <div className="p-6 bg-white border-t border-gray-100">
        <Button 
          onClick={onNext} 
          fullWidth 
          disabled={!allValid}
        >
          {photos.length > 0 && !allValid ? "等待检测完成" : "下一步：选模板"}
        </Button>
      </div>

      <Modal 
        isOpen={showPrivacyModal} 
        onClose={() => setShowPrivacyModal(false)}
        title="家长授权与隐私协议"
        footer={
          <div className="flex gap-3">
             <Button variant="secondary" onClick={() => setShowPrivacyModal(false)} className="flex-1">取消</Button>
             <Button onClick={handlePrivacyAgree} className="flex-1">同意并继续</Button>
          </div>
        }
      >
        <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
          <p className="font-bold text-gray-800">请确认您是宝宝的法定监护人，并同意以下条款：</p>
          {PRIVACY_POLICY_TEXT.split('\n').filter(line => line.trim()).map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </Modal>
    </div>
  );
};
