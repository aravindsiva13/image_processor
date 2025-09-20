import React from 'react';

export const Card = ({ title, description, children, className = '' }) => (
  <div className={`bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 ${className}`}>
    {(title || description) && (
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
        {title && <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>}
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>
    )}
    <div className="p-6">
      {children}
    </div>
  </div>
);