import React, from 'react';
import { USERS, CURRENT_USER_ID, XP_LEVELS, getUserXpLevel, MISSIONS, WEEKLY_RANKING, REWARD_SHOP_ITEMS } from '../constants';
import { Icon } from '../components/Icon';
import { Avatar } from '../components/Avatar';
import { User } from '../types';

type RewardsTab = 'missions' | 'ranking' | 'store' | 'affiliates';

const UserStatsCard = () => {
    const user = USERS.find(u => u.id === CURRENT_USER_ID)!;
    const xpLevel = getUserXpLevel(user.xp);
    const nextLevel = XP_LEVELS.find(l => l.level === xpLevel.level + 1);
    const xpForNextLevel = nextLevel ? nextLevel.xpRequired - xpLevel.xpRequired : 0;
    const xpProgress = nextLevel ? user.xp - xpLevel.xpRequired : 0;
    const progressPercent = xpForNextLevel > 0 ? (xpProgress / xpForNextLevel) * 100 : 100;

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 m-4">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-zinc-400 text-sm">Seu Saldo</p>
                    <p className="text-2xl font-bold text-white flex items-center gap-2">
                        <span className="text-yellow-400 text-2xl">🪙</span>
                        {user.promptCoins.toLocaleString()}
                    </p>
                </div>
                <div className="text-right">
                     <p className="text-zinc-400 text-sm">Nível Atual</p>
                    <p className="text-lg font-bold text-violet-400">{xpLevel.level} - {xpLevel.name}</p>
                </div>
            </div>
            <div className="mt-4">
                <div className="w-full bg-zinc-700 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-violet-500 to-cyan-400 h-2.5 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                </div>
                <div className="flex justify-between items-center mt-1 text-xs text-zinc-400">
                    <span>{user.xp.toLocaleString()} XP</span>
                    <span>{nextLevel ? nextLevel.xpRequired.toLocaleString() : 'MAX'} XP</span>
                </div>
            </div>
        </div>
    );
};

const MissionsTab = () => (
    <div className="space-y-4 px-4">
        <div>
            <h3 className="font-semibold text-white mb-2">Missões Diárias</h3>
            {MISSIONS.daily.map(mission => (
                 <div key={mission.id} className={`bg-zinc-900 border ${mission.completed ? 'border-green-500/50' : 'border-zinc-800'} rounded-lg p-3 flex items-center`}>
                    <div className="flex-grow">
                        <p className="text-white">{mission.description}</p>
                        <p className="text-xs text-cyan-400 mt-1">+ {mission.rewardCoins} 🪙 / + {mission.rewardXp} XP</p>
                    </div>
                     <button disabled={mission.completed} className={`text-sm font-semibold py-1 px-3 rounded-full ${mission.completed ? 'bg-green-500 text-white' : 'bg-violet-600 hover:bg-violet-500'}`}>
                        {mission.completed ? 'Coletado' : 'Coletar'}
                    </button>
                 </div>
            ))}
        </div>
        <div>
            <h3 className="font-semibold text-white mb-2">Missões Semanais</h3>
            {MISSIONS.weekly.map(mission => (
                <div key={mission.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-white">{mission.description}</p>
                        <p className="text-sm text-cyan-400">+ {mission.rewardCoins} 🪙 / + {mission.rewardXp} XP</p>
                    </div>
                    <div className="w-full bg-zinc-700 rounded-full h-2">
                        <div className="bg-violet-500 h-2 rounded-full" style={{ width: `${(mission.progress / mission.goal) * 100}%`}}></div>
                    </div>
                     <p className="text-xs text-zinc-400 text-right mt-1">{mission.progress} / {mission.goal}</p>
                </div>
            ))}
        </div>
    </div>
);

const RankingTab = () => {
    const rankColors = ['border-yellow-400', 'border-gray-400', 'border-amber-600'];
    const rankIcons = ['👑', '🥈', '🥉'];
    return (
        <div className="space-y-3 px-4">
            {WEEKLY_RANKING.map(({rank, user, weeklyLikes}) => (
                <div key={rank} className={`bg-zinc-900 border-l-4 ${rank <= 3 ? rankColors[rank-1] : 'border-zinc-700'} rounded-r-lg p-3 flex items-center gap-4`}>
                    <span className={`text-xl font-bold ${rank <= 3 ? 'text-white' : 'text-zinc-400'}`}>{rank <=3 ? rankIcons[rank-1] : `#${rank}`}</span>
                    <Avatar user={user} size="sm" />
                    <div className="flex-grow">
                        <p className="font-semibold text-white">{user.username}</p>
                        <p className="text-sm text-zinc-400">{weeklyLikes.toLocaleString()} curtidas</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

const StoreTab = () => (
     <div className="grid grid-cols-2 gap-4 px-4">
        {REWARD_SHOP_ITEMS.map(item => (
            <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col items-center text-center">
                 <div className="p-3 bg-zinc-800 rounded-full mb-3">
                    <Icon name={item.icon as any} className="w-6 h-6 text-cyan-400" />
                 </div>
                <h4 className="font-semibold text-white">{item.name}</h4>
                <p className="text-xs text-zinc-400 mt-1 flex-grow">{item.description}</p>
                <button className="w-full bg-violet-600 text-white font-semibold py-1.5 rounded-lg mt-4 text-sm flex items-center justify-center gap-1.5">
                    <span className="text-yellow-400">🪙</span>
                    {item.price.toLocaleString()}
                </button>
            </div>
        ))}
     </div>
);

const AffiliatesTab = () => (
    <div className="px-4 text-center">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <Icon name="user" className="w-12 h-12 mx-auto text-violet-400" />
            <h3 className="text-xl font-bold text-white mt-4">Convide e Ganhe</h3>
            <p className="text-zinc-400 mt-2">Ganhe <span className="text-yellow-400 font-semibold">200 🪙</span> por cada amigo que assinar o Premium com seu código.</p>
            <div className="my-6 p-3 border-2 border-dashed border-zinc-700 rounded-lg">
                <p className="text-2xl font-mono tracking-widest text-white">PROMP-A4B2C1</p>
            </div>
            <button className="w-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2">
                <Icon name="copy" className="w-5 h-5" />
                Copiar Código
            </button>
        </div>
    </div>
);

export const RewardsScreen: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState<RewardsTab>('missions');
    
    const tabs: {id: RewardsTab, label: string}[] = [
        {id: 'missions', label: 'Missões'},
        {id: 'ranking', label: 'Ranking'},
        {id: 'store', label: 'Loja'},
        {id: 'affiliates', label: 'Afiliados'},
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'missions': return <MissionsTab />;
            case 'ranking': return <RankingTab />;
            case 'store': return <StoreTab />;
            case 'affiliates': return <AffiliatesTab />;
            default: return null;
        }
    };

    return (
        <div className="pb-20">
            <div className="p-4 text-center">
                <h1 className="text-3xl font-bold text-white">Recompensas</h1>
                <p className="text-zinc-400 mt-1">Complete missões, suba no ranking e ganhe prêmios.</p>
            </div>

            <UserStatsCard />
            
            <div className="px-4 my-6">
                 <div className="bg-zinc-900 rounded-full p-1 flex items-center justify-around text-sm">
                    {tabs.map(tab => (
                         <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full py-2 rounded-full font-semibold transition-colors duration-300 ${activeTab === tab.id ? 'bg-violet-600 text-white' : 'text-zinc-400 hover:bg-zinc-800'}`}
                         >
                            {tab.label}
                         </button>
                    ))}
                 </div>
            </div>

            <div>{renderTabContent()}</div>
        </div>
    );
};
