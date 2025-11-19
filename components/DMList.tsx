import React from 'react';
import { Conversation, User } from '../types';
import { BackIcon, CameraIcon, EditIcon } from './Icons';

interface DMListProps {
  conversations: Conversation[];
  currentUser: User;
  onSelectConversation: (id: string) => void;
  onBack: () => void;
}

export const DMList: React.FC<DMListProps> = ({ conversations, currentUser, onSelectConversation, onBack }) => {
  return (
    <div className="bg-slate-950 min-h-screen flex flex-col text-slate-50 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 bg-slate-950 z-10">
        <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 glass-panel rounded-full"><BackIcon /></button>
            <span className="font-bold text-xl">{currentUser.username}</span>
        </div>
        <div className="p-2 glass-panel rounded-full text-blue-400">
            <EditIcon /> 
        </div>
      </div>

      {/* Search */}
      <div className="px-6 py-2">
         <div className="bg-slate-900/80 border border-slate-800 rounded-2xl px-4 py-3 text-slate-400 text-sm flex items-center gap-3">
             <span>🔍</span>
             <span>بحث في المحادثات...</span>
         </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto mt-4">
        <div className="px-6 pb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Recent</div>
        {conversations.map(conv => (
            <div key={conv.id} onClick={() => onSelectConversation(conv.id)} className="flex items-center justify-between px-6 py-4 hover:bg-slate-900/50 cursor-pointer transition-colors">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-800 overflow-hidden border border-slate-700 shadow-lg">
                        <img src={conv.user.avatarUrl} alt={conv.user.username} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-base font-bold text-white">{conv.user.fullName}</span>
                        <div className="flex items-center gap-1 text-sm text-slate-400">
                            <span className={`${conv.unreadCount > 0 ? 'font-bold text-white' : ''} truncate max-w-[160px]`}>{conv.lastMessage}</span>
                            <span className="text-slate-600">•</span>
                            <span className="text-xs">{conv.updatedAt}</span>
                        </div>
                    </div>
                </div>
                {conv.unreadCount > 0 && (
                    <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>
                )}
            </div>
        ))}
      </div>
    </div>
  );
};