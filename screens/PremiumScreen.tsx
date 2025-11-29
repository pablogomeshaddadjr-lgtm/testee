import React from 'react';
import { PLANS } from '../constants';
import { Plan, PlanTier } from '../types';
import { Icon } from '../components/Icon';

const PlanCard: React.FC<{ plan: Plan }> = ({ plan }) => {
  const isFeatured = plan.isFeatured;

  return (
    <div className={`border-2 rounded-2xl p-6 flex flex-col relative overflow-hidden ${isFeatured ? 'border-violet-500 neon-shadow-purple bg-zinc-900' : 'border-zinc-800 bg-zinc-900'}`}>
        {isFeatured && (
            <div className="absolute top-0 right-0 bg-violet-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">MAIS POPULAR</div>
        )}
      <h2 className={`text-2xl font-bold ${isFeatured ? 'text-violet-400' : 'text-white'}`}>{plan.tier}</h2>
      <p className="text-4xl font-extrabold text-white mt-4">{plan.price.split('/')[0]}<span className="text-lg font-medium text-gray-400">/{plan.price.split('/')[1]}</span></p>
      
      <ul className="space-y-3 mt-6 text-gray-300 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Icon name="check" className="w-5 h-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button className={`w-full py-3 mt-8 rounded-2xl font-semibold text-lg transition-transform duration-200 hover:scale-105 ${isFeatured ? 'bg-gradient-to-r from-violet-500 to-cyan-500 text-white neon-shadow-purple' : 'bg-zinc-800 text-gray-200 hover:bg-violet-500'}`}>
        {plan.tier === PlanTier.Free ? 'Plano Atual' : 'Fazer Upgrade'}
      </button>
    </div>
  );
};

export const PremiumScreen: React.FC = () => {
  return (
    <div className="pb-20">
        <div className="p-4 text-center">
            <h1 className="text-3xl font-bold text-white">Desbloqueie seu Potencial</h1>
            <p className="text-gray-300 mt-2 max-w-2xl mx-auto">
                Crie, inspire e compartilhe o futuro com acesso a recursos exclusivos.
            </p>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map(plan => (
                <PlanCard key={plan.tier} plan={plan} />
            ))}
        </div>
    </div>
  );
};