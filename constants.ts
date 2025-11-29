import { User, PromptPost, Plan, Notification, Category, PlanTier } from './types';

export const USERS: User[] = [
  { id: 1, username: 'PixelPilot', avatar: 'https://picsum.photos/seed/user1/100', bio: 'Explorando a tela digital.', plan: PlanTier.CreatorPlus, followers: 1200, promptsPublished: 45, totalLikes: 15300, promptCoins: 2850, xp: 22500 },
  { id: 2, username: 'AI_Visionary', avatar: 'https://picsum.photos/seed/user2/100', bio: 'Criando sonhos com código.', plan: PlanTier.Premium, followers: 850, promptsPublished: 22, totalLikes: 9800, promptCoins: 1200, xp: 9800 },
  { id: 3, username: 'SynthWave', avatar: 'https://picsum.photos/seed/user3/100', bio: 'Apenas um usuário.', plan: PlanTier.Free, followers: 150, promptsPublished: 5, totalLikes: 400, promptCoins: 150, xp: 400 },
  { id: 4, username: 'NeuroNet', avatar: 'https://picsum.photos/seed/user4/100', bio: 'Conectando neurônios e pixels.', plan: PlanTier.Premium, followers: 560, promptsPublished: 18, totalLikes: 6200, promptCoins: 850, xp: 6200 },
];

export const CURRENT_USER_ID = 1;

export const PROMPTS: PromptPost[] = [
  { id: 1, userId: 1, imageUrl: 'https://picsum.photos/seed/prompt1/500/700', promptText: 'cinematic photo of a serene cyberpunk city at dusk, rainy, neon signs reflecting on wet streets, high detail, 8k', likes: 1250, comments: 45, saves: 300, category: Category.Photography, isPremium: true, createdAt: '2024-07-20T10:00:00Z' },
  { id: 2, userId: 2, imageUrl: 'https://picsum.photos/seed/prompt2/500/500', promptText: 'A hyper-realistic portrait of an astronaut looking at the Earth from the moon, detailed reflection in the helmet visor, cinematic lighting', likes: 980, comments: 32, saves: 210, category: Category.Portraits, isPremium: false, createdAt: '2024-07-21T11:30:00Z' },
  { id: 3, userId: 3, imageUrl: 'https://picsum.photos/seed/prompt3/500/600', promptText: 'A minimalist product shot of a futuristic watch on a black marble surface, clean lighting, sharp focus', likes: 250, comments: 10, saves: 50, category: Category.Products, isPremium: false, createdAt: '2024-07-22T14:00:00Z' },
  { id: 4, userId: 1, imageUrl: 'https://picsum.photos/seed/prompt4/500/800', promptText: 'High fashion model wearing a dress made of liquid chrome, abstract background, dynamic pose, studio lighting', likes: 2300, comments: 150, saves: 600, category: Category.Fashion, isPremium: true, createdAt: '2024-07-23T09:00:00Z' },
  { id: 5, userId: 4, imageUrl: 'https://picsum.photos/seed/prompt5/500/500', promptText: 'Impressionist painting of a bustling Parisian cafe scene, vibrant colors, loose brush strokes', likes: 720, comments: 28, saves: 150, category: Category.Art, isPremium: false, createdAt: '2024-07-24T18:00:00Z' },
  { id: 6, userId: 1, imageUrl: 'https://picsum.photos/seed/prompt6/500/600', promptText: 'Sora prompt: a drone shot flying through a fantastical forest with glowing mushrooms and floating islands', likes: 3100, comments: 200, saves: 850, category: Category.Video, isPremium: true, createdAt: '2024-07-25T12:00:00Z' },
  { id: 7, userId: 2, imageUrl: 'https://picsum.photos/seed/prompt7/500/700', promptText: 'A cozy lifestyle photo of a person reading a book by a fireplace, warm tones, soft focus, hygge aesthetic', likes: 650, comments: 22, saves: 180, category: Category.Lifestyle, isPremium: false, createdAt: '2024-07-26T15:20:00Z' },
  { id: 8, userId: 4, imageUrl: 'https://picsum.photos/seed/prompt8/500/500', promptText: 'Professional headshot for a tech CEO, clean background, confident expression, modern office setting', likes: 450, comments: 15, saves: 90, category: Category.Business, isPremium: false, createdAt: '2024-07-27T10:45:00Z' },
];

export const FAVORITED_PROMPTS_IDS = [2, 5, 6]; // User 1's favorites

export const PLANS: Plan[] = [
  { tier: PlanTier.Free, price: 'R$ 0/mês', features: ['Acesso limitado', 'Interação básica', 'Com anúncios'] },
  { tier: PlanTier.Premium, price: 'R$ 9,90/mês', features: ['Acesso completo aos PromptPacks', 'Avatar animado e selo premium', 'Sem anúncios', 'Favoritos ilimitados'], isFeatured: true },
  { tier: PlanTier.CreatorPlus, price: 'R$ 19,90/mês', features: ['Todos os benefícios Premium', 'Perfil em destaque', 'Acesso antecipado a novos packs', 'Prompts de vídeo (Sora, Runway)'] },
];

export const NOTIFICATIONS: Notification[] = [
    { id: 1, type: 'like', message: '🔥 Seu prompt "serene cyberpunk city" recebeu 20 curtidas!', timestamp: 'há 2h', read: false },
    { id: 2, type: 'announcement', message: '🚀 Novo pack de prompts de Fotografia disponível!', timestamp: 'há 1d', read: false },
    { id: 3, type: 'follow', message: 'AI_Visionary começou a seguir você.', timestamp: 'há 2d', read: true },
    { id: 4, type: 'comment', message: 'SynthWave comentou no seu prompt: "Incrível!"', timestamp: 'há 3d', read: true },
];

export const CATEGORIES_LIST = Object.values(Category);

// Renamed from LEVELS to RANKS to represent status based on likes
export const RANKS = [
  { level: 1, name: 'Prompt Explorer', minLikes: 0 },
  { level: 2, name: 'AI Apprentice', minLikes: 1000 },
  { level: 3, name: 'Creative Synthesizer', minLikes: 5000 },
  { level: 4, name: 'Prompt Virtuoso', minLikes: 10000 },
  { level: 5, name: 'Imagination Architect', minLikes: 20000 },
];

// Renamed from getUserLevel to getUserRank
export const getUserRank = (totalLikes: number) => {
  return [...RANKS].reverse().find(l => totalLikes >= l.minLikes) || RANKS[0];
};

// New XP-based leveling system
export const XP_LEVELS = [
  { level: 1, name: 'Iniciante', xpRequired: 0, benefits: 'Postar até 3 prompts/dia' },
  { level: 2, name: 'Criador', xpRequired: 500, benefits: 'Postar até 5 prompts/dia' },
  { level: 3, name: 'Influencer', xpRequired: 1500, benefits: 'Pode fixar um post' },
  { level: 4, name: 'Expert', xpRequired: 3000, benefits: 'Ganha selo “Expert”' },
  { level: 5, name: 'Master', xpRequired: 5000, benefits: 'Começa a receber bônus reais' },
  { level: 6, name: 'Lenda', xpRequired: 10000, benefits: 'Ganha bônus de XP' },
  { level: 7, name: 'Mestre Dimensional', xpRequired: 20000, benefits: 'Destaque no ranking' },
];

export const getUserXpLevel = (xp: number) => {
  return [...XP_LEVELS].reverse().find(l => xp >= l.xpRequired) || XP_LEVELS[0];
};

// Mock data for the new Rewards screen
export const MISSIONS = {
    daily: [
        { id: 'd1', description: 'Curta 10 prompts', rewardCoins: 20, rewardXp: 50, goal: 10, progress: 7 },
        { id: 'd2', description: 'Publique um novo prompt', rewardCoins: 50, rewardXp: 100, goal: 1, progress: 0 },
        { id: 'd3', description: 'Comente em 3 prompts', rewardCoins: 15, rewardXp: 30, goal: 3, progress: 3, completed: true },
    ],
    weekly: [
        { id: 'w1', description: 'Receba 500 curtidas totais', rewardCoins: 200, rewardXp: 500, goal: 500, progress: 310 },
        { id: 'w2', description: 'Publique 5 prompts Premium', rewardCoins: 300, rewardXp: 750, goal: 5, progress: 2 },
    ]
};

export const WEEKLY_RANKING = [
    { rank: 1, user: USERS[0], weeklyLikes: 5400 },
    { rank: 2, user: USERS[3], weeklyLikes: 3200 },
    { rank: 3, user: USERS[1], weeklyLikes: 1500 },
    { rank: 4, user: USERS[2], weeklyLikes: 150 },
];

export const REWARD_SHOP_ITEMS = [
    { id: 's1', name: 'Moldura Neon', price: 1000, description: 'Destaque seu avatar com uma moldura animada.', icon: 'sparkles' },
    { id: 's2', name: 'Avatar Animado "Glitch"', price: 2500, description: 'Um efeito glitch para seu avatar.', icon: 'user' },
    { id: 's3', name: 'Destaque de Perfil (24h)', price: 500, description: 'Seu perfil no topo da busca por um dia.', icon: 'fire' },
    { id: 's4', name: 'Pack de Prompts Exclusivo', price: 1500, description: 'Acesso a um pack de prompts raros.', icon: 'premium' },
];