import React from 'react';
import { Screen } from '../App';
import { Icon } from '../components/Icon';

interface SettingsScreenProps {
  navigateTo: (screen: Screen, userId?: number) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigateTo }) => {
  return (
    <div className="pb-20 px-4 relative">
      <button
        onClick={() => navigateTo('profile')}
        className="absolute top-6 left-4 text-zinc-400 hover:text-white transition-colors p-2 rounded-full bg-zinc-900/50 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500 z-10"
        aria-label="Voltar para o perfil"
      >
        <Icon name="arrow-left" className="w-6 h-6" />
      </button>

      <div className="text-center pt-4 pb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          Configurações
        </h1>
        <p className="mt-2 text-lg text-zinc-400">
          Gerencie suas preferências e sua conta.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-2">Conta</h2>
          <p className="text-zinc-400">Configurações de conta, como e-mail e senha, estarão disponíveis aqui em breve.</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-2">Notificações</h2>
            <p className="text-zinc-400">Gerencie suas preferências de notificação por e-mail e push aqui.</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-2">Privacidade</h2>
            <p className="text-zinc-400">Controle a visibilidade do seu perfil e dados compartilhados.</p>
        </div>
      </div>
    </div>
  );
};