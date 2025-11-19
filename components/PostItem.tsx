import React, { useState, useCallback } from 'react';
import { Post } from '../types';
import { HeartIcon, CommentIcon, ShareIcon, BookmarkIcon, OptionsIcon } from './Icons';

interface PostItemProps {
  post: Post;
  onLike: (id: string) => void;
}

export const PostItem: React.FC<PostItemProps> = ({ post, onLike }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [showHeartOverlay, setShowHeartOverlay] = useState(false);

  const handleLike = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikesCount(prev => newLikedState ? prev + 1 : prev - 1);
    onLike(post.id);
  };

  const handleDoubleTap = useCallback(() => {
    const now = Date.now();
    if (now - lastClickTime < 300) {
      if (!isLiked) {
        handleLike();
      }
      setShowHeartOverlay(true);
      setTimeout(() => setShowHeartOverlay(false), 1000);
    }
    setLastClickTime(now);
  }, [lastClickTime, isLiked]);

  return (
    <div className="mb-8 px-4">
      <div 
        className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl shadow-black/50 bg-slate-900 group"
        onClick={handleDoubleTap}
      >
        {/* Background Image */}
        <img 
            src={post.imageUrl} 
            alt="Post content" 
            className="w-full h-full object-cover transition-transform duration-700" 
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90" />

        {/* Top Section: User Info */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3 glass-panel px-3 py-1.5 rounded-full">
            <img src={post.user.avatarUrl} alt={post.user.username} className="w-8 h-8 rounded-full border border-white/20 object-cover" />
            <div className="flex flex-col">
                <span className="font-bold text-xs text-white leading-none mb-0.5">{post.user.username}</span>
                {post.location && <span className="text-[10px] text-gray-300 leading-none">{post.location}</span>}
            </div>
          </div>
          <button className="p-2 glass-panel rounded-full text-white">
            <OptionsIcon />
          </button>
        </div>

        {/* Double Tap Heart Animation */}
        {showHeartOverlay && (
          <div className="absolute inset-0 flex items-center justify-center z-20 animate-bounce">
             <div className="text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-28 h-28 text-red-500">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
             </div>
          </div>
        )}

        {/* Bottom Section: Content & Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex flex-col gap-3">
            {/* Caption */}
            <div className="pr-1">
                <p className="text-sm text-white/90 line-clamp-2 leading-relaxed font-light drop-shadow-md">
                    <span className="font-bold text-white ml-2">{post.user.username}</span>
                    {post.caption}
                </p>
            </div>

            {/* Stats & Actions Row */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                     {/* Like & Count */}
                     <div className="flex items-center gap-1.5">
                        <button onClick={handleLike} className="transition-transform active:scale-75">
                            <HeartIcon filled={isLiked} />
                        </button>
                        <span className="text-sm font-bold">{likesCount}</span>
                     </div>
                     
                     {/* Comment */}
                     <div className="flex items-center gap-1.5">
                        <button>
                           <CommentIcon />
                        </button>
                        <span className="text-sm font-bold">{post.commentsCount}</span>
                     </div>

                     <button>
                        <ShareIcon />
                     </button>
                </div>

                <button>
                    <BookmarkIcon />
                </button>
            </div>
             
             <div className="text-[10px] text-gray-400 font-medium">{post.createdAt}</div>
        </div>
      </div>
    </div>
  );
};