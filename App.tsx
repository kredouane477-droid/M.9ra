import React, { useState, useEffect } from 'react';
import { ViewState, Post, Conversation } from './types';
import { MOCK_POSTS, MOCK_STORIES, CURRENT_USER, MOCK_CONVERSATIONS } from './constants';
import { HomeIcon, SearchIcon, CreateIcon, ReelsIcon, HeartIcon, MessengerIcon } from './components/Icons';
import { Stories } from './components/Stories';
import { PostItem } from './components/PostItem';
import { CreatePost } from './components/CreatePost';
import { Profile } from './components/Profile';
import { DMList } from './components/DMList';
import { ChatScreen } from './components/ChatScreen';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreatePost = (imageUrl: string, caption: string) => {
    const newPost: Post = {
      id: `new_${Date.now()}`,
      userId: CURRENT_USER.id,
      user: CURRENT_USER,
      imageUrl,
      caption,
      likesCount: 0,
      commentsCount: 0,
      createdAt: 'الآن',
      isLiked: false,
    };
    setPosts([newPost, ...posts]);
    setShowCreateModal(false);
    setView(ViewState.HOME);
  };

  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
        if (p.id === postId) {
            return { ...p, isLiked: !p.isLiked, likesCount: p.isLiked ? p.likesCount - 1 : p.likesCount + 1 };
        }
        return p;
    }));
  };

  const handleSendMessage = (conversationId: string, text: string) => {
    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          lastMessage: text,
          updatedAt: 'الآن',
          messages: [...c.messages, {
            id: `nm_${Date.now()}`,
            senderId: CURRENT_USER.id,
            text: text,
            createdAt: 'الآن',
            isOwn: true
          }]
        };
      }
      return c;
    }));
  };

  const renderContent = () => {
    switch (view) {
      case ViewState.HOME:
        return (
          <>
            <div className="pt-2">
               <h2 className="px-5 text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">اكتشف</h2>
               <Stories stories={MOCK_STORIES} />
            </div>
            <div className="pb-32 pt-4">
              {posts.map(post => (
                <PostItem key={post.id} post={post} onLike={handleLikePost} />
              ))}
            </div>
          </>
        );
      case ViewState.SEARCH:
        return (
          <div className="p-4 text-center mt-20 pb-20">
            <h2 className="text-xl font-bold text-slate-400">استكشف المحتوى</h2>
            <div className="grid grid-cols-2 gap-3 mt-6">
               {Array.from({length: 12}).map((_, i) => (
                  <div key={i} className={`rounded-2xl overflow-hidden bg-slate-800 shadow-lg aspect-[3/4] ${i % 3 === 0 ? 'col-span-2 aspect-video' : ''}`}>
                     <img src={`https://picsum.photos/400/500?random=${i}`} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" alt="search" />
                  </div>
               ))}
            </div>
          </div>
        );
      case ViewState.REELS:
        return (
          <div className="h-screen bg-slate-950 flex items-center justify-center pb-20 relative">
             <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950"></div>
             <h1 className="font-bold text-4xl z-10 tracking-widest text-slate-700">STREAM</h1>
             <p className="absolute bottom-32 text-slate-500 z-10 text-sm">قريباً</p>
          </div>
        );
      case ViewState.PROFILE:
        return <Profile user={CURRENT_USER} posts={posts} />;
      case ViewState.MESSAGES:
        if (selectedConversationId) {
          const conversation = conversations.find(c => c.id === selectedConversationId);
          if (conversation) {
            return (
              <ChatScreen 
                conversation={conversation} 
                currentUser={CURRENT_USER} 
                onBack={() => setSelectedConversationId(null)}
                onSendMessage={handleSendMessage}
              />
            );
          }
        }
        return (
          <DMList 
            conversations={conversations} 
            currentUser={CURRENT_USER} 
            onSelectConversation={setSelectedConversationId} 
            onBack={() => setView(ViewState.HOME)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-50 max-w-md mx-auto shadow-2xl relative overflow-hidden font-sans">
      
      {/* Custom Background Elements */}
      <div className="fixed top-0 left-0 w-full h-96 bg-blue-900/20 rounded-full blur-3xl -translate-y-1/2 pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-0 w-full h-96 bg-purple-900/10 rounded-full blur-3xl translate-y-1/2 pointer-events-none z-0"></div>

      {/* Top Header (Home Only) - Floating Style */}
      {view === ViewState.HOME && (
        <div className="sticky top-0 z-40 flex justify-between items-center px-6 py-4 bg-gradient-to-b from-slate-950 to-transparent">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="font-bold text-xl tracking-widest">m.9r.a</span>
          </div>
          <div className="flex gap-4 items-center">
             <div className="bg-slate-800/50 p-2 rounded-full backdrop-blur-md border border-white/5 cursor-pointer hover:bg-slate-800 transition-colors" onClick={() => setView(ViewState.MESSAGES)}>
                <MessengerIcon />
             </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="min-h-screen relative z-10">
        {renderContent()}
      </main>

      {/* Create Post Modal Overlay */}
      {showCreateModal && (
        <CreatePost onClose={() => setShowCreateModal(false)} onPost={handleCreatePost} />
      )}

      {/* Floating Dock Navigation */}
      {view !== ViewState.MESSAGES && (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className="glass-panel rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl shadow-black/50">
            <button onClick={() => setView(ViewState.HOME)} className={`transition-all duration-300 ${view === ViewState.HOME ? 'text-blue-400 -translate-y-1' : 'text-slate-400 hover:text-white'}`}>
              <HomeIcon active={view === ViewState.HOME} />
            </button>
            
            <button onClick={() => setView(ViewState.SEARCH)} className={`transition-all duration-300 ${view === ViewState.SEARCH ? 'text-blue-400 -translate-y-1' : 'text-slate-400 hover:text-white'}`}>
              <SearchIcon active={view === ViewState.SEARCH} />
            </button>

            {/* Center Create Button */}
            <button 
                onClick={() => setShowCreateModal(true)} 
                className="bg-gradient-to-tr from-blue-600 to-purple-600 p-3 rounded-full shadow-lg shadow-blue-500/30 text-white -translate-y-4 hover:scale-110 transition-transform border-4 border-slate-950"
            >
              <CreateIcon active={false} />
            </button>
            
            <button onClick={() => setView(ViewState.REELS)} className={`transition-all duration-300 ${view === ViewState.REELS ? 'text-blue-400 -translate-y-1' : 'text-slate-400 hover:text-white'}`}>
              <ReelsIcon active={view === ViewState.REELS} />
            </button>
            
            <button onClick={() => setView(ViewState.PROFILE)} className={`transition-all duration-300 ${view === ViewState.PROFILE ? 'scale-110 ring-2 ring-blue-500 rounded-full' : 'text-slate-400 hover:text-white'}`}>
              <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-700">
                <img src={CURRENT_USER.avatarUrl} alt="profile" className="w-full h-full object-cover" />
              </div>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default App;