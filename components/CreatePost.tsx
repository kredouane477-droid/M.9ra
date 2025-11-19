import React, { useState, useRef } from 'react';
import { X, ChevronLeft, Loader2 } from 'lucide-react';
import { generateCaptionForImage } from '../services/geminiService';
import { ImageIconIcon, AiIcon } from './Icons';
import { CURRENT_USER } from '../constants';

interface CreatePostProps {
  onClose: () => void;
  onPost: (imageUrl: string, caption: string) => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onClose, onPost }) => {
  const [step, setStep] = useState<1 | 2>(1); // 1: Select, 2: Edit/Caption
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setStep(2);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateCaption = async () => {
    if (!selectedImage) return;
    setIsGenerating(true);
    try {
      // Extract base64 data
      const base64Data = selectedImage.split(',')[1];
      const mimeType = selectedImage.split(';')[0].split(':')[1];
      
      const generatedText = await generateCaptionForImage(base64Data, mimeType);
      setCaption(generatedText);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = () => {
    if (selectedImage) {
      onPost(selectedImage, caption);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col animate-in fade-in duration-200">
      {/* Header */}
      <div className="h-12 border-b border-gray-800 flex items-center justify-between px-4">
        {step === 1 ? (
           <>
            <button onClick={onClose}><X className="w-7 h-7" /></button>
            <span className="font-bold text-lg">منشور جديد</span>
            <div className="w-7"></div>
           </>
        ) : (
            <>
            <button onClick={() => setStep(1)}><ChevronLeft className="w-7 h-7" /></button>
            <span className="font-bold text-lg">منشور جديد</span>
            <button 
              onClick={handleShare}
              className="text-blue-500 font-semibold text-sm hover:text-blue-400"
            >
              مشاركة
            </button>
            </>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col bg-black text-white">
        {step === 1 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
             <div className="w-24 h-24 rounded-full border-2 border-white flex items-center justify-center mb-4">
                <ImageIconIcon />
             </div>
             <h3 className="text-xl font-semibold">اسحب الصور ومقاطع الفيديو هنا</h3>
             <button 
               onClick={() => fileInputRef.current?.click()} 
               className="bg-blue-500 px-4 py-2 rounded-lg font-semibold text-sm"
             >
               اختيار من الجهاز
             </button>
             <input 
               ref={fileInputRef}
               type="file" 
               accept="image/*" 
               className="hidden" 
               onChange={handleFileChange}
             />
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            {/* Preview & Caption Area */}
            <div className="flex p-4 gap-4 border-b border-gray-800">
                <div className="w-16 h-16 shrink-0">
                   <img src={selectedImage!} alt="preview" className="w-full h-full object-cover rounded-md" />
                </div>
                <textarea 
                   className="flex-1 bg-transparent resize-none outline-none text-sm leading-5 placeholder-gray-500"
                   placeholder="اكتب شرحاً توضيحياً..."
                   rows={4}
                   value={caption}
                   onChange={(e) => setCaption(e.target.value)}
                />
            </div>
            
            {/* AI Action */}
            <div className="px-4 py-3 border-b border-gray-800">
               <button 
                 onClick={handleGenerateCaption}
                 disabled={isGenerating}
                 className="flex items-center gap-2 text-sm text-purple-400 font-medium hover:text-purple-300 w-full"
               >
                 {isGenerating ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                 ) : (
                    <AiIcon />
                 )}
                 <span>إنشاء شرح تلقائي باستخدام الذكاء الاصطناعي</span>
               </button>
            </div>
            
            {/* Additional Options (Mock) */}
            <div className="px-4 py-3 border-b border-gray-800 flex justify-between text-sm">
                <span>إضافة موقع</span>
                <span className="text-gray-500">›</span>
            </div>
             <div className="px-4 py-3 border-b border-gray-800 flex justify-between text-sm">
                <span>الإشارة إلى أشخاص</span>
                <span className="text-gray-500">›</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
