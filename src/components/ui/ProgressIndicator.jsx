import React from 'react';

const ProgressIndicator = ({ 
  progress = 0, 
  size = 'default', 
  variant = 'circular',
  showPercentage = true,
  className = '',
  animated = true
}) => {
  const progressValue = Math.min(Math.max(progress, 0), 100);
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    default: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    default: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  if (variant === 'linear') {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-foreground">Progress</span>
          {showPercentage && (
            <span className="text-sm text-muted-foreground font-mono">
              {progressValue}%
            </span>
          )}
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ease-out ${
              progressValue === 100 ? 'bg-success' : 'bg-primary'
            } ${animated ? 'animate-progress-fill' : ''}`}
            style={{ 
              width: `${progressValue}%`,
              '--progress-width': `${progressValue}%`
            }}
          />
        </div>
      </div>
    );
  }

  // Circular progress indicator
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progressValue / 100) * circumference;

  return (
    <div className={`relative ${sizeClasses?.[size]} ${className}`}>
      <svg
        className="transform -rotate-90 w-full h-full"
        viewBox="0 0 36 36"
      >
        {/* Background circle */}
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          stroke="var(--color-muted)"
          strokeWidth="2"
        />
        {/* Progress circle */}
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          stroke={progressValue === 100 ? "var(--color-success)" : "var(--color-primary)"}
          strokeWidth="2"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={animated ? "transition-all duration-300 ease-out" : ""}
        />
      </svg>
      {/* Percentage text */}
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-mono font-medium ${textSizeClasses?.[size]} ${
            progressValue === 100 ? 'text-success' : 'text-primary'
          }`}>
            {progressValue}%
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;