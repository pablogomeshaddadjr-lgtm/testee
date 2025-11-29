import React from 'react';
import { User, PlanTier } from '../types';
import { Icon } from './Icon';

interface AvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-16 h-16',
  lg: 'w-28 h-28',
};

export const Avatar: React.FC<AvatarProps> = ({ user, size = 'md' }) => {
  const isPremium = user.plan === PlanTier.Premium || user.plan === PlanTier.CreatorPlus;
  
  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <img 
        className={`rounded-full w-full h-full object-cover ${isPremium ? 'border-[3px] border-violet-500' : 'border-2 border-zinc-700'}`} 
        src={user.avatar} 
        alt={user.username}
      />
    </div>
  );
};