import React from 'react';
import { NOTIFICATIONS } from '../constants';
import { Icon } from '../components/Icon';
import { Notification } from '../types';

const notificationIcons = {
  like: <Icon name="heart" className="w-5 h-5 text-red-500" />,
  comment: <Icon name="comment" className="w-5 h-5 text-cyan-400" />,
  follow: <Icon name="user" className="w-5 h-5 text-violet-400" />,
  announcement: <Icon name="bell" className="w-5 h-5 text-yellow-400" />,
};

export const NotificationsScreen: React.FC = () => {
  return (
    <div className="pb-20">
       <div className="p-4">
          <h1 className="text-2xl font-bold text-white">Notificações</h1>
       </div>
      <div className="p-4 space-y-3">
        {NOTIFICATIONS.map((notif: Notification) => (
          <div
            key={notif.id}
            className={`flex items-start p-4 rounded-2xl border transition-colors ${
              notif.read
                ? 'bg-zinc-900/50 border-zinc-800'
                : 'bg-violet-500/10 border-violet-500/50'
            }`}
          >
            <div className="mr-4 mt-1 flex-shrink-0">
                {notificationIcons[notif.type]}
            </div>
            <div className="flex-grow">
              <p className="text-gray-200">{notif.message}</p>
              <p className="text-xs text-gray-400 mt-1">{notif.timestamp}</p>
            </div>
            {!notif.read && (
              <div className="w-2.5 h-2.5 bg-violet-400 rounded-full ml-4 mt-1 flex-shrink-0"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};