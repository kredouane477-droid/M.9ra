import React from 'react';
import { Story } from '../types';
import { CURRENT_USER } from '../constants';
import { Plus } from 'lucide-react';

interface StoriesProps {
  stories: Story[];
}

export const Stories: React.FC<StoriesProps> = ({ stories }) => {
  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar py-4 px-4">
      {/* Current User Story Add */}
      <div className="relative flex-shrink-0 w-20 h-32 rounded-2xl overflow-hidden cursor-pointer group">
        <img 
            src={CURRENT_USER.avatarUrl} 
            alt="قصتي" 
            className="w-full h-full object-cover opacity-70 group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
        <div className="absolute bottom-2 left-0 right-0 flex flex-col items-center">
          <div className="bg-blue-500 text-white rounded-full p-1 mb-1 shadow-lg shadow-blue-500/40">
             <Plus size={14} />
          </div>
          <span className="text-[10px] font-medium text-white">أنت</span>
        </div>
      </div>

      {/* Other Stories */}
      {stories.map((story) => (
        <div key={story.id} className="relative flex-shrink-0 w-20 h-32 rounded-2xl overflow-hidden cursor-pointer group ring-1 ring-white/10">
          <img 
            src={story.avatarUrl} 
            alt={story.username} 
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${!story.isSeen ? 'border-2 border-blue-500' : ''}`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90"></div>
          <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${story.isSeen ? 'bg-transparent' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]'}`}></div>
          <div className="absolute bottom-2 left-1 right-1 text-center">
            <span className="text-[10px] font-bold text-white truncate block drop-shadow-md">{story.username}</span>
          </div>
        </div>
      ))}
    </div>
  );
};