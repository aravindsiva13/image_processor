import React from 'react';
import { Card } from '../common/Card';

export const SettingsPage = () => (
  <div className="space-y-6">
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Settings</h2>
      <p className="text-gray-600">Configure your YOLO Vision Studio preferences and system settings</p>
    </div>

    <Card 
      title="🔧 Model Configuration"
      description="Manage model weights and training parameters"
    >
      <p className="text-gray-600">Configure default model settings, weight management, and training hyperparameters.</p>
    </Card>
  </div>
);