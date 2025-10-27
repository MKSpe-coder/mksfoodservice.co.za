import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-2 h-2 rounded-full bg-mks-gray animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="w-2 h-2 rounded-full bg-mks-gray animate-bounce" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-2 h-2 rounded-full bg-mks-gray animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
  );
};

export default LoadingSpinner;
