import React from 'react';
import { Upload, Bot, Image, Settings, Video } from 'lucide-react';
import { NavigationItem } from '../common/NavigationItem';

export const Sidebar = ({ selectedPage, onPageChange }) => (
  <aside className="w-80 bg-white border-r border-gray-200 min-h-screen p-6">
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Navigation</h3>
      <div className="space-y-2">
        <NavigationItem
          icon={Upload}
          label="Dataset & Labeling"
          isActive={selectedPage === 'Dataset & Labeling'}
          onClick={() => onPageChange('Dataset & Labeling')}
        />
        <NavigationItem
          icon={Bot}
          label="Training"
          isActive={selectedPage === 'Training'}
          onClick={() => onPageChange('Training')}
        />
        <NavigationItem
          icon={Image}
          label="Predictions"
          isActive={selectedPage === 'Predictions'}
          onClick={() => onPageChange('Predictions')}
        />
        <NavigationItem
          icon={Settings}
          label="Settings"
          isActive={selectedPage === 'Settings'}
          onClick={() => onPageChange('Settings')}
        />
        <NavigationItem
          icon={Video}
          label="Live Detection"
          isActive={selectedPage === 'Live Detection'}
          onClick={() => onPageChange('Live Detection')}
        />
      </div>
    </div>
  </aside>
);