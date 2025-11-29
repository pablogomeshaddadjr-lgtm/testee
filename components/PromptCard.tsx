import React, { useState } from 'react';
import { PromptPost, User, PlanTier } from '../types';
import { USERS } from '../constants';
import { Icon } from './Icon';
import { Avatar } from './Avatar';
import { Screen } from '../App';

interface PromptCardProps {
  post: PromptPost;
  navigateTo: (screen: Screen, userId?: number) => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({ post, navigateTo }) => {
  const [copied, setCopied] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const user = USERS.find(u => u.id === post.userId) as User;

  const handleCopy = () => {
    navigator.clipboard.writeText(post.promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleComment = () => {
    // Placeholder for comment functionality
    console.log(`Comment on post ${post.id}`);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };
  
  const handleProfileClick = () => {
    navigateTo('profile', user.id);
  };

  const PromptModal = () => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={() => setIsModalVisible(false)}>
      <div className="bg-zinc-900 rounded-2xl border border-zinc-700 p-6 relative w-full max-w-md" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-semibold text-white mb-4">Prompt Completo</h3>
        <p className="bg-zinc-950 p-4 rounded-lg text-gray-300 text-sm leading-relaxed font-mono break-words">
          {post.promptText}
        </p>
        <div className="mt-4 flex justify-end gap-2">
           <button
            onClick={() => setIsModalVisible(false)}
            className="text-white font-semibold py-2 px-4 rounded-lg text-sm bg-zinc-700 hover:bg-zinc-600 transition-colors"
          >
            Fechar
          </button>
          <button
            onClick={handleCopy}
            className={`font-semibold py-2 px-4 rounded-lg text-sm transition-colors flex items-center gap-1.5 ${copied ? 'bg-green-500 text-white' : 'bg-violet-600 text-white hover:bg-violet-500'}`}
            aria-label="Copiar Prompt"
          >
            <Icon name={copied ? 'check' : 'copy'} className="w-4 h-4" />
            <span>{copied ? 'Copiado!' : 'Copiar'}</span>
          </button>
        </div>
        <button
          onClick={() => setIsModalVisible(false)}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white"
          aria-label="Fechar modal"
        >
          <Icon name="close" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 flex flex-col">
        <div className="relative">
          <img src={post.imageUrl} alt="Arte gerada por IA" className="w-full h-auto aspect-[3/4] object-cover" />
          <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
            {post.isPremium && (
              <div className="bg-gradient-to-r from-violet-500 to-cyan-400 text-white px-2.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 neon-shadow-purple">
                <Icon name="sparkles" className="w-4 h-4"/>
                <span>Premium</span>
              </div>
            )}
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-center mb-4">
            <button onClick={handleProfileClick} className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-violet-500">
              <Avatar user={user} size="sm" />
            </button>
            <div className="ml-3">
              <button onClick={handleProfileClick} className="text-left focus:outline-none">
                  <p className="font-semibold text-white hover:underline">{user.username}</p>
              </button>
              {user.plan !== PlanTier.Free && (
                <p className="text-xs font-medium text-violet-400 -mt-1">{user.plan}</p>
              )}
            </div>
          </div>
          
          <div className="flex-grow flex items-center justify-center my-2 gap-2">
            <button
              onClick={() => setIsModalVisible(true)}
              className="bg-zinc-800 text-white font-semibold py-2 px-5 rounded-lg text-sm hover:bg-zinc-700 transition-colors w-full sm:w-auto"
            >
              Ver prompt
            </button>
            <button
              onClick={handleCopy}
              className={`w-full sm:w-auto font-semibold py-2 px-5 rounded-lg text-sm transition-opacity flex items-center justify-center gap-1.5 bg-gradient-to-r from-violet-600 to-cyan-600 text-white hover:opacity-90`}
              aria-label="Copiar Prompt"
            >
              <Icon name="copy" className="w-4 h-4" />
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>

          <div className="flex justify-between items-center text-gray-400 mt-4">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 transition-colors ${isLiked ? 'text-red-500' : 'hover:text-red-500'}`}
                aria-pressed={isLiked}
              >
                <Icon name={isLiked ? 'heart-filled' : 'heart'} className="w-5 h-5" />
                <span className="text-sm">{likeCount}</span>
              </button>
              <button
                onClick={handleComment}
                className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
              >
                <Icon name="comment" className="w-5 h-5" />
                <span className="text-sm">{post.comments}</span>
              </button>
            </div>
            <button
              onClick={handleSave}
              className={`transition-colors ${isSaved ? 'text-yellow-400' : 'hover:text-yellow-400'}`}
              aria-pressed={isSaved}
              aria-label="Salvar prompt"
            >
              <Icon name={isSaved ? 'save-filled' : 'save'} className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      {isModalVisible && <PromptModal />}
    </>
  );
};
