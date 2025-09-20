import React from 'react';

export const NavigationItem = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full px-4 py-3 text-left rounded-lg transition-all duration-200 ${
      isActive 
        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500' 
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
    }`}
  >
    <Icon className="w-5 h-5" />
    {label}
  </button>
);