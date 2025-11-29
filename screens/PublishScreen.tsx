import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import { CATEGORIES_LIST, USERS, CURRENT_USER_ID } from '../constants';
import { Category, PlanTier } from '../types';
import { Screen } from '../App';

interface PublishScreenProps {
  navigateTo: (screen: Screen) => void;
}

export const PublishScreen: React.FC<PublishScreenProps> = ({ navigateTo }) => {
  const [promptText, setPromptText] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [category, setCategory] = useState<Category>(Category.Photography);
  const [isPremium, setIsPremium] = useState(false);

  const currentUser = USERS.find(u => u.id === CURRENT_USER_ID)!;
  const canPostPremium = currentUser.plan !== PlanTier.Free;

  const handleImageUpload = () => {
    // In a real app, this would open a file picker.
    // For this simulation, we'll just set a placeholder image.
    setImagePreview('https://picsum.photos/seed/newprompt/500/700');
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText || !imagePreview) {
      alert('Por favor, adicione uma imagem e um prompt.');
      return;
    }
    // Logic to add the new prompt to the list would go here.
    // For now, just simulate success.
    alert('Prompt publicado com sucesso!');
    navigateTo('feed'); // Navigate to feed after publishing
  };

  return (
    <div className="pb-24 px-4">
      <div className="text-center pt-4 pb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          Novo Prompt
        </h1>
        <p className="mt-2 text-lg text-zinc-400">
          Compartilhe sua criatividade com a comunidade
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Imagem Gerada</label>
          <div 
            className="aspect-[3/4] bg-zinc-900 border-2 border-dashed border-zinc-700 rounded-2xl flex items-center justify-center text-center cursor-pointer hover:border-violet-500 transition-colors"
            onClick={handleImageUpload}
            role="button"
            aria-label="Adicionar imagem"
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview do prompt" className="w-full h-full object-cover rounded-2xl" />
            ) : (
              <div className="text-zinc-500">
                <Icon name="plus" className="w-12 h-12 mx-auto" />
                <p className="mt-2 font-semibold">Clique para adicionar uma imagem</p>
              </div>
            )}
          </div>
        </div>

        {/* Prompt Text Area */}
        <div>
          <label htmlFor="prompt-text" className="block text-sm font-medium text-zinc-300 mb-2">Seu Prompt</label>
          <textarea
            id="prompt-text"
            rows={5}
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder="Ex: cinematic photo of a serene cyberpunk city at dusk, rainy..."
            className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-shadow font-mono"
            required
          />
        </div>

        {/* Category Select */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-zinc-300 mb-2">Categoria</label>
          <div className="relative">
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full appearance-none bg-zinc-900 border border-zinc-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              {CATEGORIES_LIST.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <Icon name="chevron-down" className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          </div>
        </div>
        
        {/* Premium Toggle */}
        {canPostPremium && (
          <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <div>
                <h4 className="font-semibold text-white">Prompt Premium</h4>
                <p className="text-sm text-zinc-400">Apenas para assinantes Premium e Creator+.</p>
            </div>
            <button
              type="button"
              onClick={() => setIsPremium(!isPremium)}
              className={`${isPremium ? 'bg-violet-600' : 'bg-zinc-700'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
              aria-pressed={isPremium}
            >
              <span className={`${isPremium ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
            </button>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 mt-8 rounded-2xl font-semibold text-lg text-white bg-gradient-to-r from-violet-500 to-cyan-500 neon-shadow-purple transition-transform duration-200 hover:scale-105"
        >
          Publicar Prompt
        </button>
      </form>
    </div>
  );
};