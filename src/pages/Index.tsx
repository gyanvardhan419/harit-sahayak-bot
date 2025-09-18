import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
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
  const [farmingData, setFarmingData] = useState<FarmingData | null>(null);
  const { currentLanguage, setCurrentLanguage } = useTranslation();

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
            selectedLanguage={currentLanguage}
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
        selectedLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />
      {renderCurrentView()}
    </div>
  );
};

export default Index;
