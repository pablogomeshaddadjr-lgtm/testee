import React, { useState, useMemo } from 'react';
import { PromptCard } from '../components/PromptCard';
import { PROMPTS } from '../constants';
import { Icon } from '../components/Icon';
import { PromptPost } from '../types';
import { Screen } from '../App';

type FeedTab = 'Descobrir' | 'Mais Curtidos' | 'Novos' | 'Premium';

const TABS: {name: FeedTab, icon: 'search' | 'heart' | 'clock' | 'sparkles'}[] = [
  { name: 'Descobrir', icon: 'search' },
  { name: 'Mais Curtidos', icon: 'heart' },
  { name: 'Novos', icon: 'clock' },
  { name: 'Premium', icon: 'sparkles' },
];

interface FeedScreenProps {
  navigateTo: (screen: Screen, userId?: number) => void;
}

export const FeedScreen: React.FC<FeedScreenProps> = ({ navigateTo }) => {
  const [activeTab, setActiveTab] = useState<FeedTab>('Mais Curtidos');

  const filteredPrompts = useMemo(() => {
    let sortedPrompts: PromptPost[] = [...PROMPTS];
    switch (activeTab) {
      case 'Mais Curtidos':
        return sortedPrompts.sort((a, b) => b.likes - a.likes);
      case 'Novos':
        return sortedPrompts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'Premium':
        return sortedPrompts.filter(p => p.isPremium);
      case 'Descobrir':
      default:
        // shuffle for discovery
        return sortedPrompts.sort(() => Math.random() - 0.5);
    }
  }, [activeTab]);

  return (
    <div className="pb-20">
      <div className="px-4 py-3">
        <div className="bg-zinc-900/70 backdrop-blur-sm rounded-full p-1 flex items-center justify-around">
          {TABS.map(({ name, icon }) => (
            <button
              key={name}
              onClick={() => setActiveTab(name)}
              className={`flex justify-center items-center gap-1.5 py-2 rounded-full transition-all duration-300 ease-in-out ${
                activeTab === name
                  ? 'bg-gradient-to-r from-violet-500 to-cyan-500 text-white px-3 sm:px-4 neon-shadow-purple'
                  : 'text-gray-300 hover:bg-zinc-800/50 px-2'
              }`}
            >
              <Icon name={icon} className="w-5 h-5 flex-shrink-0" />
              <span
                className={`text-sm font-semibold whitespace-nowrap ${
                  activeTab === name ? 'block' : 'hidden sm:inline'
                }`}
              >
                {name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPrompts.map(post => (
          <PromptCard key={post.id} post={post} navigateTo={navigateTo} />
        ))}
      </div>
    </div>
  );
};