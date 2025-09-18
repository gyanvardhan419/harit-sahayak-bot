import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategorySelection from "@/components/CategorySelection";
import ChatBot from "@/components/ChatBot";

interface FarmingData {
  state: string;
  landSize: string;
  soilType: string;
  climate: string;
  season: string;
}

type AppState = 'hero' | 'categories' | 'chat';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('hero');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [farmingData, setFarmingData] = useState<FarmingData | null>(null);

  const handleGetStarted = () => {
    setCurrentState('categories');
  };

  const handleCategoriesComplete = (data: FarmingData) => {
    setFarmingData(data);
    setCurrentState('chat');
  };

  const handleBackToCategories = () => {
    setCurrentState('categories');
  };

  const renderCurrentView = () => {
    switch (currentState) {
      case 'hero':
        return <Hero onGetStarted={handleGetStarted} />;
      
      case 'categories':
        return <CategorySelection onComplete={handleCategoriesComplete} />;
      
      case 'chat':
        return farmingData && (
          <ChatBot 
            farmingData={farmingData}
            selectedLanguage={selectedLanguage}
            onBack={handleBackToCategories}
          />
        );
      
      default:
        return <Hero onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
      />
      {renderCurrentView()}
    </div>
  );
};

export default Index;
