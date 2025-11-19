import React, { useState, useRef, useEffect } from 'react';
import { Conversation, User } from '../types';
import { BackIcon, PhoneIcon, VideoIcon, CameraIcon, ImageIconIcon, HeartIcon } from './Icons'; 

interface ChatScreenProps {
  conversation: Conversation;
  currentUser: User;
  onBack: () => void;
  onSendMessage: (conversationId: string, text: string) => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ conversation, currentUser, onBack, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
        onSendMessage(conversation.id, newMessage);
        setNewMessage('');
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen flex flex-col text-slate-50 fixed inset-0 z-50 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="h-20 flex items-center justify-between px-4 pt-4 pb-2 bg-slate-950/90 backdrop-blur-md sticky top-0 z-10 border-b border-slate-900">
        <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full transition-colors"><BackIcon /></button>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 overflow-hidden shadow-md">
                    <img src={conversation.user.avatarUrl} alt={conversation.user.username} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">{conversation.user.fullName}</span>
                    <span className="text-[10px] text-green-400 font-medium tracking-wide">ONLINE</span>
                </div>
            </div>
        </div>
        <div className="flex gap-2 text-slate-300">
            <button className="p-2 hover:bg-slate-800 rounded-full"><PhoneIcon /></button>
            <button className="p-2 hover:bg-slate-800 rounded-full"><VideoIcon /></button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-slate-950">
        <div className="text-center text-xs text-slate-600 my-2 px-3 py-1 bg-slate-900/50 rounded-full self-center">{conversation.updatedAt}</div>
        {conversation.messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                {!msg.isOwn && (
                     <div className="w-6 h-6 rounded-lg overflow-hidden mb-1">
                        <img src={conversation.user.avatarUrl} className="w-full h-full object-cover" alt="avatar" />
                     </div>
                )}
                <div className={`max-w-[75%] px-5 py-3 rounded-2xl text-sm shadow-md ${msg.isOwn ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none'}`}>
                    {msg.text}
                </div>
            </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-950 border-t border-slate-900 flex items-center gap-3 mb-safe">
        <div className="p-2.5 bg-slate-900 rounded-xl text-slate-400 cursor-pointer hover:text-white transition-colors">
             <CameraIcon />
        </div>
        <div className="flex-1 bg-slate-900 rounded-2xl px-4 py-3 flex items-center gap-3 border border-slate-800 focus-within:border-blue-500/50 transition-colors">
            <input 
                type="text" 
                className="bg-transparent flex-1 outline-none text-sm text-white placeholder-slate-500"
                placeholder="اكتب رسالتك..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            {!newMessage && <ImageIconIcon className="w-5 h-5 text-slate-500" />}
        </div>
        {newMessage ? (
            <button onClick={handleSend} className="text-white bg-blue-600 p-3 rounded-xl hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transform rotate-180"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
        ) : (
            <div className="text-slate-500 cursor-pointer hover:text-red-500 transition-colors p-2"><HeartIcon filled={false} /></div>
        )}
      </div>
    </div>
  );
};