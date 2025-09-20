import React from 'react';
import { CheckCircle, AlertTriangle, Target } from 'lucide-react';

export const Alert = ({ type = 'info', children }) => {
  const types = {
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };
  
  const icons = {
    success: CheckCircle,
    warning: AlertTriangle,
    error: AlertTriangle,
    info: Target
  };
  
  const Icon = icons[type];
  
  return (
    <div className={`p-4 rounded-lg border ${types[type]} flex items-start gap-3`}>
      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <div>{children}</div>
    </div>
  );
};
