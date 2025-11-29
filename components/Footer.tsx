import React from 'react';
import { Screen } from '../App';
import { Icon } from './Icon';

interface FooterProps {
  activeScreen: Screen;
  navigateTo: (screen: Screen) => void;
}

type NavItem = {
  screen: Screen;
  icon: 'home' | 'chart-bar' | 'bell' | 'trophy';
};

const navItems: NavItem[] = [
  { screen: 'feed', icon: 'home' },
  { screen: 'library', icon: 'chart-bar' },
  { screen: 'rewards', icon: 'trophy' },
  { screen: 'notifications', icon: 'bell' },
];

const NavButton: React.FC<{
  item: NavItem,
  isActive: boolean,
  onClick: () => void,
}> = ({ item, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`relative p-3 rounded-full transition-all duration-300 ease-in-out focus:outline-none ${
      isActive
        ? 'bg-violet-600 text-white neon-shadow-purple'
        : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
    }`}
    aria-label={item.screen}
  >
    <Icon name={item.icon} className="w-6 h-6" />
  </button>
);


export const Footer: React.FC<FooterProps> = ({ activeScreen, navigateTo }) => {
  return (
    <footer className="fixed bottom-4 left-0 right-0 flex justify-center z-50">
      <nav className="flex items-center gap-2 rounded-full bg-zinc-900/90 p-2 backdrop-blur-sm border border-zinc-700/50">
        <NavButton item={navItems[0]} isActive={activeScreen === navItems[0].screen} onClick={() => navigateTo(navItems[0].screen)} />
        <NavButton item={navItems[1]} isActive={activeScreen === navItems[1].screen} onClick={() => navigateTo(navItems[1].screen)} />

        <button
            onClick={() => navigateTo('publish')}
            className="p-4 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white transform -translate-y-4 shadow-lg neon-shadow-purple hover:scale-110 transition-transform focus:outline-none"
            aria-label="Publicar novo prompt"
        >
            <Icon name="plus" className="w-8 h-8" />
        </button>
        
        <NavButton item={navItems[2]} isActive={activeScreen === navItems[2].screen} onClick={() => navigateTo(navItems[2].screen)} />
        <NavButton item={navItems[3]} isActive={activeScreen === navItems[3].screen} onClick={() => navigateTo(navItems[3].screen)} />
      </nav>
    </footer>
  );
};