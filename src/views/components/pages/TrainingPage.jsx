// views/components/pages/TrainingPage.jsx
import React from 'react';
import { Bot, Zap, ExternalLink } from 'lucide-react';
import { Button } from '../common/Button';

export const TrainingPage = ({ viewModel }) => {
  const { isTraining, startTraining } = viewModel;

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Model Training</h2>
        <p className="text-gray-600">Configure and execute YOLO model training with your labeled dataset</p>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Bot className="w-6 h-6" />
          <h3 className="text-xl font-bold">YOLO Model Training</h3>
        </div>
        <p className="mb-6 opacity-95">Train state-of-the-art YOLO models using your annotated dataset</p>
        
        <Button 
          variant="secondary" 
          size="lg"
          onClick={startTraining}
        >
          <Zap className="w-5 h-5" />
          Train YOLO Model with Labeled Data
        </Button>
        
        {isTraining && (
          <div className="mt-6 p-6 bg-white rounded-lg text-gray-800">
            <h4 className="font-semibold text-green-600 mb-3">🎯 Training Environment Ready!</h4>
            <p className="mb-4">Click the link below to access your dedicated Google Colab training environment</p>
            <a 
              href="https://colab.research.google.com/drive/1_0eriSdP0ebUcrb7nOYHQgi3HB9fxABa?authuser=1#scrollTo=-gE-Ez1qtyIA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Open Advanced Training Notebook
            </a>
          </div>
        )}
      </div>
    </div>
  );
};