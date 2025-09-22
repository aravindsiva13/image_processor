import React from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { DatasetPage } from './components/pages/DatasetPage';
import { TrainingPage } from './components/pages/TrainingPage';
import { PredictionPage } from './components/pages/PredictionPage';
import { LiveDetectionPage } from './components/pages/LiveDetectionPage';
import { SettingsPage } from './components/pages/SettingsPage';
import { useYoloStudio } from '../hooks/useYoloStudio';
import  LoginPage  from './components/pages/loginPage';

export const YoloStudioView = () => {
  const viewModels = useYoloStudio();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const renderContent = () => {
    switch (viewModels.main.selectedPage) {
      case 'Dataset & Labeling':
        return <DatasetPage viewModel={viewModels.dataset} />;
      case 'Training':
        return <TrainingPage viewModel={viewModels.training} />;
      case 'Predictions':
        return <PredictionPage viewModel={viewModels.prediction} />;
      case 'Live Detection':
        return (
          <LiveDetectionPage 
            viewModel={viewModels.liveDetection} 
            uploadedModel={viewModels.prediction.uploadedModel}
          />
        );
      case 'Settings':
        return <SettingsPage />;
      default:
        return <DatasetPage viewModel={viewModels.dataset} />;
    }
  };
  if (!isLoggedIn) {
    return(<LoginPage onLoginSuccess={()=> setIsLoggedIn(true)} />)
  }
  else{
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-16 flex">
        <Sidebar 
          selectedPage={viewModels.main.selectedPage}
          onPageChange={viewModels.main.handlePageChange}
        />
        
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
};