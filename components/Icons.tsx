import React from 'react';
import { 
  Home, 
  Search, 
  PlusSquare, 
  Clapperboard, 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal,
  ArrowLeft,
  Image as ImageIcon,
  Sparkles,
  X,
  Camera,
  Phone,
  Video,
  SquarePen
} from 'lucide-react';

// Re-export icons for unified usage
export const HomeIcon = ({ active }: { active: boolean }) => <Home className={`w-7 h-7 ${active ? 'stroke-[3px]' : ''}`} />;
export const SearchIcon = ({ active }: { active: boolean }) => <Search className={`w-7 h-7 ${active ? 'stroke-[3px]' : ''}`} />;
export const CreateIcon = ({ active }: { active: boolean }) => <PlusSquare className={`w-7 h-7 ${active ? 'stroke-[3px]' : ''}`} />;
export const ReelsIcon = ({ active }: { active: boolean }) => <Clapperboard className={`w-7 h-7 ${active ? 'stroke-[3px]' : ''}`} />;
export const HeartIcon = ({ filled }: { filled: boolean }) => <Heart className={`w-7 h-7 ${filled ? 'fill-red-500 text-red-500' : 'text-white'}`} />;
export const CommentIcon = () => <MessageCircle className="w-7 h-7 -rotate-90" />;
export const ShareIcon = () => <Send className="w-7 h-7" />;
export const BookmarkIcon = () => <Bookmark className="w-7 h-7" />;
export const OptionsIcon = () => <MoreHorizontal className="w-6 h-6" />;
export const BackIcon = () => <ArrowLeft className="w-7 h-7" />;
export const ImageIconIcon = ({ className }: { className?: string }) => <ImageIcon className={className || "w-12 h-12"} />;
export const AiIcon = () => <Sparkles className="w-5 h-5" />;
export const CloseIcon = () => <X className="w-7 h-7" />;
export const CameraIcon = () => <Camera className="w-7 h-7" />;
export const PhoneIcon = () => <Phone className="w-7 h-7" />;
export const VideoIcon = () => <Video className="w-7 h-7" />;
export const EditIcon = () => <SquarePen className="w-7 h-7" />;

export const MessengerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);