import React, { useState, useMemo } from 'react';
import { PromptCard } from '../components/PromptCard';
import { PROMPTS, CATEGORIES_LIST } from '../constants';
import { Category } from '../types';
import { Icon } from '../components/Icon';
import { Screen } from '../App';

interface LibraryScreenProps {
  navigateTo: (screen: Screen, userId?: number) => void;
}

export const LibraryScreen: React.FC<LibraryScreenProps> = ({ navigateTo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');

  const filteredPrompts = useMemo(() => {
    return PROMPTS.filter(prompt => {
      const matchesSearch = searchTerm === '' || prompt.promptText.toLowerCase().includes(searchTerm.toLowerCase()) || prompt.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'all' ? true : prompt.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <div className="text-center px-4 py-12 sm:py-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          Biblioteca de Prompts
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-zinc-400">
          Explore milhares de prompts organizados por categoria
        </p>
        <div className="mt-8 max-w-xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar prompts, tags, estilos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700/50 text-white rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-shadow"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon name="search" className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Filters and Content */}
      <div className="px-4 sm:px-6">
        <div className="flex items-center mb-6">
          <div className="relative group">
            <Icon name="filter" className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value as Category | 'all')}
              className="appearance-none bg-zinc-900 border border-zinc-700/50 text-white rounded-lg pl-10 pr-8 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
            >
              <option value="all">Todas</option>
              {CATEGORIES_LIST.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
             <Icon name="chevron-down" className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none group-hover:text-white transition-colors" />
          </div>
        </div>
        
        {filteredPrompts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPrompts.map(post => (
              <PromptCard key={post.id} post={post} navigateTo={navigateTo} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-zinc-900/50 rounded-2xl">
              <p className="text-gray-400">Nenhum prompt encontrado. Tente uma busca ou categoria diferente.</p>
          </div>
        )}
      </div>
    </div>
  );
};