import { Post, Story, User, Conversation } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  username: 'm.9r.a',
  fullName: 'M A R A',
  avatarUrl: 'https://picsum.photos/id/64/150/150',
  isVerified: true,
};

export const MOCK_STORIES: Story[] = [
  { id: 's1', userId: 'u2', username: 'ahmed.dv', avatarUrl: 'https://picsum.photos/id/1011/100/100', isSeen: false },
  { id: 's2', userId: 'u3', username: 'sara_art', avatarUrl: 'https://picsum.photos/id/1027/100/100', isSeen: false },
  { id: 's3', userId: 'u4', username: 'tech_world', avatarUrl: 'https://picsum.photos/id/1035/100/100', isSeen: true },
  { id: 's4', userId: 'u5', username: 'travel_jo', avatarUrl: 'https://picsum.photos/id/1040/100/100', isSeen: false },
  { id: 's5', userId: 'u6', username: 'foodie_sa', avatarUrl: 'https://picsum.photos/id/1050/100/100', isSeen: false },
  { id: 's6', userId: 'u7', username: 'fitness_pro', avatarUrl: 'https://picsum.photos/id/1060/100/100', isSeen: true },
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    userId: 'u2',
    user: { id: 'u2', username: 'ahmed.dv', fullName: 'Ahmed Developer', avatarUrl: 'https://picsum.photos/id/1011/100/100' },
    imageUrl: 'https://picsum.photos/id/1015/800/800',
    caption: 'جمال الطبيعة لا يُوصف 🏔️ #nature #travel',
    likesCount: 1240,
    commentsCount: 45,
    createdAt: 'منذ 2 ساعة',
    location: 'جبال الألب',
    isLiked: false,
  },
  {
    id: 'p2',
    userId: 'u3',
    user: { id: 'u3', username: 'sara_art', fullName: 'Sara Artist', avatarUrl: 'https://picsum.photos/id/1027/100/100' },
    imageUrl: 'https://picsum.photos/id/103/800/1000',
    caption: 'وقت القهوة والهدوء ☕✨',
    likesCount: 892,
    commentsCount: 20,
    createdAt: 'منذ 5 ساعات',
    isLiked: true,
  },
  {
    id: 'p3',
    userId: 'u5',
    user: { id: 'u5', username: 'travel_jo', fullName: 'Jordan Travel', avatarUrl: 'https://picsum.photos/id/1040/100/100' },
    imageUrl: 'https://picsum.photos/id/1047/800/600',
    caption: 'الأزقة القديمة تحكي قصصاً لا تنتهي.',
    likesCount: 3500,
    commentsCount: 120,
    createdAt: 'منذ يوم واحد',
    location: 'البتراء، الأردن',
    isLiked: false,
  },
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    user: { id: 'u2', username: 'ahmed.dv', fullName: 'Ahmed Developer', avatarUrl: 'https://picsum.photos/id/1011/100/100' },
    lastMessage: 'شكراً لك على المساعدة! 🙏',
    unreadCount: 2,
    updatedAt: 'الآن',
    messages: [
      { id: 'm1', senderId: 'u1', text: 'مرحباً أحمد، كيف حالك؟', createdAt: '10:00 ص', isOwn: true },
      { id: 'm2', senderId: 'u2', text: 'أهلاً! أنا بخير، شكراً لسؤالك.', createdAt: '10:05 ص', isOwn: false },
      { id: 'm3', senderId: 'u1', text: 'هل يمكنك مساعدتي في الكود؟', createdAt: '10:10 ص', isOwn: true },
      { id: 'm4', senderId: 'u2', text: 'بالتأكيد، سأرسل لك الملفات.', createdAt: '10:15 ص', isOwn: false },
      { id: 'm5', senderId: 'u2', text: 'شكراً لك على المساعدة! 🙏', createdAt: '10:16 ص', isOwn: false },
    ]
  },
  {
    id: 'c2',
    user: { id: 'u3', username: 'sara_art', fullName: 'Sara Artist', avatarUrl: 'https://picsum.photos/id/1027/100/100' },
    lastMessage: 'صورة رائعة جداً 😍',
    unreadCount: 0,
    updatedAt: '2 س',
    messages: [
      { id: 'm1', senderId: 'u3', text: 'صورة رائعة جداً 😍', createdAt: '08:30 م', isOwn: false },
      { id: 'm2', senderId: 'u1', text: 'شكراً سارة!', createdAt: '08:35 م', isOwn: true },
    ]
  },
  {
    id: 'c3',
    user: { id: 'u5', username: 'travel_jo', fullName: 'Jordan Travel', avatarUrl: 'https://picsum.photos/id/1040/100/100' },
    lastMessage: 'متى الرحلة القادمة؟',
    unreadCount: 1,
    updatedAt: '1 ي',
    messages: [
      { id: 'm1', senderId: 'u5', text: 'مرحباً، هل تخطط لزيارة البتراء قريباً؟', createdAt: 'أمس', isOwn: false },
      { id: 'm2', senderId: 'u1', text: 'نعم، ربما الشهر القادم.', createdAt: 'أمس', isOwn: true },
      { id: 'm3', senderId: 'u5', text: 'متى الرحلة القادمة؟', createdAt: 'أمس', isOwn: false },
    ]
  }
];