import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SortControls = ({ 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange,
  resultsCount = 0 
}) => {
  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'alphabetical', label: 'A to Z' }
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      {/* Results Info */}
      <div className="flex items-center space-x-4">
        <span className="text-sm text-muted-foreground">
          Showing {resultsCount?.toLocaleString()} courses
        </span>
      </div>
      {/* Sort and View Controls */}
      <div className="flex items-center space-x-4">
        {/* Sort Dropdown */}
        <div className="min-w-[180px]">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            placeholder="Sort by"
            className="text-sm"
          />
        </div>

        {/* View Mode Toggle - Desktop Only */}
        <div className="hidden md:flex items-center border border-border rounded-lg p-1 bg-muted/30">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            className="h-8 w-8 p-0"
          >
            <Icon name="Grid3X3" size={16} />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('list')}
            className="h-8 w-8 p-0"
          >
            <Icon name="List" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SortControls;