import React, { useState } from 'react';
import { USERS, PROMPTS, CURRENT_USER_ID, getUserRank, getUserXpLevel, XP_LEVELS, FAVORITED_PROMPTS_IDS } from '../constants';
import { PlanTier } from '../types';
import { PromptCard } from '../components/PromptCard';
import { Avatar } from '../components/Avatar';
import { Icon } from '../components/Icon';
import { Screen } from '../App';

interface ProfileScreenProps {
  userId: number;
  navigateTo: (screen: Screen, userId?: number) => void;
}

type ProfileTab = 'prompts' | 'favorites';

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ userId, navigateTo }) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('prompts');

  const user = USERS.find(u => u.id === userId)!;
  const isOwnProfile = userId === CURRENT_USER_ID;
  
  const userPrompts = PROMPTS.filter(p => p.userId === user.id);
  const favoritedPrompts = isOwnProfile ? PROMPTS.filter(p => FAVORITED_PROMPTS_IDS.includes(p.id)) : [];
  
  const isPremium = user.plan !== PlanTier.Free;
  const rank = getUserRank(user.totalLikes);
  const xpLevel = getUserXpLevel(user.xp);
  const nextLevel = XP_LEVELS.find(l => l.level === xpLevel.level + 1);
  const xpForNextLevel = nextLevel ? nextLevel.xpRequired - xpLevel.xpRequired : 0;
  const xpProgress = nextLevel ? user.xp - xpLevel.xpRequired : 0;
  const progressPercent = xpForNextLevel > 0 ? (xpProgress / xpForNextLevel) * 100 : 100;

  const StatItem = ({ value, label }: { value: number | string; label: string }) => (
    <div className="text-center">
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  );

  const TabButton: React.FC<{
    label: string;
    tabName: ProfileTab;
  }> = ({ label, tabName }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex-1 pb-3 text-center font-semibold transition-colors border-b-2 ${
        activeTab === tabName
          ? 'text-white border-violet-500'
          : 'text-zinc-400 border-transparent hover:text-white'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="pb-24 text-white">
      <div className="m-4 bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
        <div className="flex flex-col items-center">
          <Avatar user={user} size="lg" />
          <h1 className="text-3xl font-bold mt-4">{user.username}</h1>
          
          <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
            {isPremium && (
              <div className="flex items-center gap-2 bg-gradient-to-r from-violet-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                <Icon name="crown" className="w-4 h-4" />
                <span>{user.plan === PlanTier.CreatorPlus ? 'Creator+' : 'Premium'}</span>
              </div>
            )}
             <div className="flex items-center gap-2 bg-zinc-800 text-gray-300 px-3 py-1 rounded-full text-xs font-semibold">
              <Icon name="sparkles" className="w-4 h-4 text-cyan-400" />
              <span>{rank.name}</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
            <div className="flex justify-between items-center mb-1 px-1">
                <p className="text-sm font-semibold text-violet-400">Nível {xpLevel.level} - {xpLevel.name}</p>
                <p className="text-sm text-gray-400">{user.xp.toLocaleString()} / {nextLevel ? nextLevel.xpRequired.toLocaleString() : 'Max'} XP</p>
            </div>
            <div className="w-full bg-zinc-700 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-violet-500 to-cyan-400 h-2.5 rounded-full" style={{ width: `${progressPercent}%` }}></div>
            </div>
        </div>

        <div className="mt-8 flex justify-around w-full border-t border-b border-zinc-800 py-4">
          <StatItem value={userPrompts.length} label="Prompts" />
          <StatItem value={user.followers.toLocaleString()} label="Seguidores" />
          <StatItem value={user.totalLikes.toLocaleString()} label="Curtidas" />
        </div>
        
        {isOwnProfile && !isPremium && (
          <div className="mt-8">
              <button 
                  onClick={() => navigateTo('premium')}
                  className="w-full bg-gradient-to-r from-violet-500 to-cyan-400 text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-3 text-lg hover:scale-105 transition-transform shadow-lg neon-shadow-purple"
              >
                  <Icon name="diamond" className="w-6 h-6" />
                  <span>Fazer Upgrade Agora</span>
              </button>
          </div>
        )}

         {isOwnProfile && (
            <div className="mt-8 flex flex-col items-center space-y-3 w-full">
                <button 
                    onClick={() => navigateTo('settings')}
                    className="flex items-center justify-center w-full max-w-xs py-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
                >
                    <Icon name="settings" className="w-5 h-5 mr-3 text-gray-300" />
                    <span className="font-semibold text-white">Configurações</span>
                </button>
                <button 
                    onClick={() => alert('Você saiu com sucesso!')}
                    className="flex items-center justify-center w-full max-w-xs py-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
                >
                    <Icon name="logout" className="w-5 h-5 mr-3 text-gray-300" />
                    <span className="font-semibold text-white">Sair</span>
                </button>
            </div>
        )}
      </div>
      
      {/* Tabs */}
      <div className="px-4 border-b border-zinc-800">
        <div className="flex">
          <TabButton label="Prompts" tabName="prompts" />
          {isOwnProfile && <TabButton label="Favoritos" tabName="favorites" />}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'prompts' && (
          userPrompts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {userPrompts.map(post => <PromptCard key={post.id} post={post} navigateTo={navigateTo} />)}
            </div>
          ) : (
            <div className="text-center py-16 bg-zinc-900 rounded-2xl">
              <p className="text-gray-400">Este usuário ainda não publicou nenhum prompt.</p>
            </div>
          )
        )}
        
        {isOwnProfile && activeTab === 'favorites' && (
          favoritedPrompts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {favoritedPrompts.map(post => <PromptCard key={post.id} post={post} navigateTo={navigateTo} />)}
            </div>
          ) : (
            <div className="text-center py-16 bg-zinc-900 rounded-2xl">
              <p className="text-gray-400">Você ainda não salvou nenhum prompt.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};