export enum PlanTier {
  Free = 'Free',
  Premium = 'Premium',
  CreatorPlus = 'Creator+',
}

export enum Category {
  Photography = 'Photography',
  Portraits = 'Portraits',
  Fashion = 'Fashion',
  Business = 'Business',
  Products = 'Products',
  Video = 'Sora/Video',
  Art = 'Art',
  Lifestyle = 'Lifestyle',
}

export interface User {
  id: number;
  username: string;
  avatar: string;
  bio: string;
  plan: PlanTier;
  followers: number;
  promptsPublished: number;
  totalLikes: number;
  promptCoins: number;
  xp: number;
}

export interface PromptPost {
  id: number;
  userId: number;
  imageUrl: string;
  promptText: string;
  likes: number;
  comments: number;
  saves: number;
  category: Category;
  isPremium: boolean;
  createdAt: string;
}

export interface Plan {
  tier: PlanTier;
  price: string;
  features: string[];
  isFeatured?: boolean;
}

export interface Notification {
  id: number;
  type: 'like' | 'comment' | 'follow' | 'announcement';
  message: string;
  timestamp: string;
  read: boolean;
}
