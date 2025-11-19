import React from 'react';
import { User, Post } from '../types';
import { Menu, Grid, Clapperboard, UserSquare2 } from 'lucide-react';
import { BackIcon } from './Icons';

interface ProfileProps {
  user: User;
  posts: Post[];
}

export const Profile: React.FC<ProfileProps> = ({ user, posts }) => {
  const userPosts = posts.filter(p => p.userId === user.id);
  const displayPosts = userPosts.length > 0 ? userPosts : [
     { id: 'm1', imageUrl: 'https://picsum.photos/id/237/300/300' },
     { id: 'm2', imageUrl: 'https://picsum.photos/id/238/300/400' },
     { id: 'm3', imageUrl: 'https://picsum.photos/id/239/300/300' },
     { id: 'm4', imageUrl: 'https://picsum.photos/id/240/300/500' },
     { id: 'm5', imageUrl: 'https://picsum.photos/id/241/300/300' },
     { id: 'm6', imageUrl: 'https://picsum.photos/id/242/300/400' },
  ];

  return (
    <div className="flex flex-col min-h-screen pb-32">
      {/* Header Image/Banner */}
      <div className="h-40 w-full bg-gradient-to-r from-blue-900 to-purple-900 relative">
         <div className="absolute top-4 right-4 z-10">
            <Menu className="text-white w-6 h-6" />
         </div>
      </div>

      {/* Floating Profile Card */}
      <div className="mx-4 -mt-12 relative z-10 glass-panel rounded-3xl p-6 flex flex-col items-center shadow-xl">
         <div className="w-24 h-24 rounded-3xl p-1 bg-slate-950 -mt-16 mb-3 shadow-lg rotate-3">
             <img src={user.avatarUrl} alt="profile" className="w-full h-full rounded-2xl object-cover" />
         </div>
         
         <h2 className="text-xl font-bold text-white flex items-center gap-1">
            {user.fullName}
            {user.isVerified && <span className="text-blue-500">✓</span>}
         </h2>
         <p className="text-slate-400 text-sm mb-4">@{user.username}</p>

         <div className="flex gap-8 text-center mb-6 w-full justify-center">
            <div>
                <div className="text-lg font-bold text-white">12</div>
                <div className="text-xs text-slate-500">POSTS</div>
            </div>
            <div className="w-px bg-slate-700"></div>
            <div>
                <div className="text-lg font-bold text-white">2.5K</div>
                <div className="text-xs text-slate-500">FANS</div>
            </div>
            <div className="w-px bg-slate-700"></div>
            <div>
                <div className="text-lg font-bold text-white">120</div>
                <div className="text-xs text-slate-500">FOLLOWING</div>
            </div>
         </div>

         <button className="w-full bg-white text-slate-950 font-bold py-3 rounded-xl mb-2 shadow-lg shadow-white/10 hover:bg-gray-200 transition-colors">
            تعديل الملف الشخصي
         </button>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-8 py-6 border-b border-slate-800/50 mx-6">
         <button className="text-white border-b-2 border-blue-500 pb-2 px-2">
            <Grid className="w-6 h-6" />
         </button>
         <button className="text-slate-600 pb-2 px-2">
            <Clapperboard className="w-6 h-6" />
         </button>
      </div>

      {/* Masonry Style Grid */}
      <div className="columns-2 gap-3 px-4 mt-4 space-y-3">
          {displayPosts.map((p: any, idx) => (
             <div key={idx} className="relative rounded-2xl overflow-hidden bg-slate-800 break-inside-avoid shadow-md hover:shadow-blue-500/20 transition-shadow">
                <img src={p.imageUrl} alt="post" className="w-full h-auto object-cover" />
             </div>
          ))}
      </div>
    </div>
  );
};