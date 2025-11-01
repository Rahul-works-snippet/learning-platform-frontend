import React from 'react';

const LoadingSkeleton = ({ viewMode = 'grid' }) => {
  const skeletonCount = 12;
  
  const SkeletonCard = () => (
    <div className="bg-card border border-border rounded-lg shadow-card animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-muted rounded-t-lg"></div>
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Category and Duration */}
        <div className="flex items-center justify-between">
          <div className="h-4 bg-muted rounded w-20"></div>
          <div className="h-4 bg-muted rounded w-16"></div>
        </div>
        
        {/* Title */}
        <div className="space-y-2">
          <div className="h-5 bg-muted rounded w-full"></div>
          <div className="h-5 bg-muted rounded w-3/4"></div>
        </div>
        
        {/* Instructor */}
        <div className="h-4 bg-muted rounded w-1/2"></div>
        
        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {[...Array(5)]?.map((_, i) => (
              <div key={i} className="h-3 w-3 bg-muted rounded"></div>
            ))}
          </div>
          <div className="h-4 bg-muted rounded w-16"></div>
        </div>
        
        {/* Stats */}
        <div className="flex items-center justify-between">
          <div className="h-3 bg-muted rounded w-20"></div>
          <div className="h-3 bg-muted rounded w-16"></div>
        </div>
        
        {/* Price and Button */}
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 bg-muted rounded w-16"></div>
          <div className="h-8 bg-muted rounded w-20"></div>
        </div>
      </div>
    </div>
  );

  const gridClasses = viewMode === 'grid' ?'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6' :'space-y-4';

  return (
    <div className={gridClasses}>
      {[...Array(skeletonCount)]?.map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default LoadingSkeleton;