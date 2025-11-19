export interface User {
  id: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  isVerified?: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  text: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  imageUrl: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  isLiked?: boolean;
  comments?: Comment[];
  location?: string;
}

export interface Story {
  id: string;
  userId: string;
  username: string;
  avatarUrl: string;
  isSeen: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  createdAt: string;
  isOwn: boolean;
}

export interface Conversation {
  id: string;
  user: User;
  lastMessage: string;
  unreadCount: number;
  updatedAt: string;
  messages: Message[];
}

export enum ViewState {
  HOME = 'HOME',
  SEARCH = 'SEARCH',
  CREATE = 'CREATE',
  REELS = 'REELS',
  PROFILE = 'PROFILE',
  MESSAGES = 'MESSAGES',
}