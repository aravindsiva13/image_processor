import React from 'react';
import { Upload } from 'lucide-react';

export const FileUpload = ({ onUpload, accept, label, description }) => (
  <div 
    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
    onClick={() => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = accept;
      input.onchange = onUpload;
      input.click();
    }}
  >
    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
    <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
    {description && <p className="text-xs text-gray-500">{description}</p>}
  </div>
);
