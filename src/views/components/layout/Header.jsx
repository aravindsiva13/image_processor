import React from 'react';
import { Target, BarChart3, Settings, User } from 'lucide-react';

export const Header = () => (
  <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-6">
    <div className="flex items-center gap-3">
      <Target className="w-8 h-8 text-blue-600" />
      <span className="text-xl font-bold text-gray-800">YOLO Vision Studio</span>
    </div>
    
    <div className="hidden md:flex items-center gap-4">
      <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
        <BarChart3 className="w-4 h-4" />
        Dashboard
      </button>
      <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
        <Settings className="w-4 h-4" />
        Settings
      </button>
      <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
        <User className="w-4 h-4" />
        Profile
      </button>
      <span className="text-sm text-gray-500">Live Detection!!</span>
      <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        Online
      </div>
    </div>
  </header>
);
