import React from 'react';
import { Screen } from '../App';
import { User } from '../types';
import { Avatar } from './Avatar';

interface HeaderProps {
  user: User;
  navigateTo: (screen: Screen, userId?: number) => void;
}

export const Header: React.FC<HeaderProps> = ({ user, navigateTo }) => {
  return (
    <header className="px-4 py-3 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-violet-500 to-cyan-400 rounded-xl flex items-center justify-center [perspective:150px]">
          <span className="text-white text-2xl font-bold logo-animation">P</span>
        </div>
        <div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            PromptClub
          </h1>
          <p className="text-xs text-zinc-400 -mt-1">Crie, inspire e compartilhe</p>
        </div>
      </div>

      {/* Right Side Items */}
      <div className="flex items-center gap-4">
        {/* Coin Balance */}
        <div className="hidden sm:flex items-center gap-1.5 bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 px-3 py-1.5 rounded-full">
            <span className="text-yellow-400 text-lg">🪙</span>
            <span className="font-semibold text-white">{user.promptCoins.toLocaleString()}</span>
        </div>
        
        {/* Profile Button */}
        <button 
          onClick={() => navigateTo('profile', user.id)} 
          className="focus:outline-none rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 focus:ring-violet-500"
          aria-label="Ver perfil"
        >
          <Avatar user={user} size="sm" />
        </button>
      </div>
    </header>
  );
};