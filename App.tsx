import React, { useState } from 'react';
import { FeedScreen } from './screens/FeedScreen';
import { LibraryScreen } from './screens/LibraryScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { PremiumScreen } from './screens/PremiumScreen';
import { RewardsScreen } from './screens/RewardsScreen';
import { PublishScreen } from './screens/PublishScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { USERS, CURRENT_USER_ID } from './constants';

export type Screen = 'feed' | 'library' | 'publish' | 'notifications' | 'premium' | 'profile' | 'rewards' | 'settings';

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>('library');
  const [viewedProfileId, setViewedProfileId] = useState<number>(CURRENT_USER_ID);
  const currentUser = USERS.find(u => u.id === CURRENT_USER_ID)!;

  const navigateTo = (screen: Screen, userId?: number) => {
    if (screen === 'profile') {
      setViewedProfileId(userId || CURRENT_USER_ID);
    }
    setActiveScreen(screen);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'feed':
        return <FeedScreen navigateTo={navigateTo} />;
      case 'library':
        return <LibraryScreen navigateTo={navigateTo} />;
      case 'publish':
        return <PublishScreen navigateTo={navigateTo} />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'premium':
        return <PremiumScreen />;
      case 'profile':
        return <ProfileScreen userId={viewedProfileId} navigateTo={navigateTo} />;
      case 'rewards':
        return <RewardsScreen />;
      case 'settings':
        return <SettingsScreen navigateTo={navigateTo} />;
      default:
        return <FeedScreen navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="app-background min-h-screen text-gray-100">
      <Header navigateTo={navigateTo} user={currentUser} />
      
      <main className="pb-24">
        {renderScreen()}
      </main>

      <Footer activeScreen={activeScreen} navigateTo={navigateTo} />
    </div>
  );
};

export default App;