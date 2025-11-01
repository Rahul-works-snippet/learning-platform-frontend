import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  filters, 
  onFiltersChange, 
  isOpen, 
  onToggle, 
  courseCount = 0,
  onClearFilters 
}) => {
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'programming', label: 'Programming' },
    { value: 'design', label: 'Design' },
    { value: 'business', label: 'Business' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'photography', label: 'Photography' },
    { value: 'music', label: 'Music' },
    { value: 'fitness', label: 'Health & Fitness' }
  ];

  const levels = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const durations = [
    { value: 'all', label: 'Any Duration' },
    { value: 'short', label: '0-2 hours' },
    { value: 'medium', label: '3-6 hours' },
    { value: 'long', label: '7+ hours' }
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'free', label: 'Free' },
    { value: 'paid', label: 'Paid' },
    { value: 'under-50', label: 'Under $50' },
    { value: 'under-100', label: 'Under $100' },
    { value: 'over-100', label: '$100+' }
  ];

  const ratings = [
    { value: 'all', label: 'All Ratings' },
    { value: '4.5', label: '4.5 & up' },
    { value: '4.0', label: '4.0 & up' },
    { value: '3.5', label: '3.5 & up' },
    { value: '3.0', label: '3.0 & up' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleFeatureToggle = (feature) => {
    onFiltersChange({
      ...filters,
      features: {
        ...filters?.features,
        [feature]: !filters?.features?.[feature]
      }
    });
  };

  const hasActiveFilters = () => {
    return filters?.category !== 'all' ||
           filters?.level !== 'all' ||
           filters?.duration !== 'all' ||
           filters?.priceRange !== 'all' ||
           filters?.rating !== 'all' ||
           Object.values(filters?.features)?.some(Boolean);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Results Count */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">
          {courseCount?.toLocaleString()} courses found
        </span>
        {hasActiveFilters() && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Category Filter */}
      <div>
        <Select
          label="Category"
          options={categories}
          value={filters?.category}
          onChange={(value) => handleFilterChange('category', value)}
          className="w-full"
        />
      </div>

      {/* Level Filter */}
      <div>
        <Select
          label="Skill Level"
          options={levels}
          value={filters?.level}
          onChange={(value) => handleFilterChange('level', value)}
          className="w-full"
        />
      </div>

      {/* Duration Filter */}
      <div>
        <Select
          label="Duration"
          options={durations}
          value={filters?.duration}
          onChange={(value) => handleFilterChange('duration', value)}
          className="w-full"
        />
      </div>

      {/* Price Range Filter */}
      <div>
        <Select
          label="Price Range"
          options={priceRanges}
          value={filters?.priceRange}
          onChange={(value) => handleFilterChange('priceRange', value)}
          className="w-full"
        />
      </div>

      {/* Rating Filter */}
      <div>
        <Select
          label="Rating"
          options={ratings}
          value={filters?.rating}
          onChange={(value) => handleFilterChange('rating', value)}
          className="w-full"
        />
      </div>

      {/* Features */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Features</h4>
        <div className="space-y-3">
          <Checkbox
            label="Subtitles/CC"
            checked={filters?.features?.subtitles}
            onChange={() => handleFeatureToggle('subtitles')}
          />
          <Checkbox
            label="Quizzes"
            checked={filters?.features?.quizzes}
            onChange={() => handleFeatureToggle('quizzes')}
          />
          <Checkbox
            label="Coding Exercises"
            checked={filters?.features?.codingExercises}
            onChange={() => handleFeatureToggle('codingExercises')}
          />
          <Checkbox
            label="Practice Tests"
            checked={filters?.features?.practiceTests}
            onChange={() => handleFeatureToggle('practiceTests')}
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filter Panel */}
      <div className="hidden lg:block w-80 bg-card border border-border rounded-lg p-6 h-fit sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          {hasActiveFilters() && (
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          )}
        </div>
        <FilterContent />
      </div>
      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <Button
          variant="default"
          size="lg"
          onClick={onToggle}
          className="rounded-full shadow-elevated"
          iconName="Filter"
          iconPosition="left"
        >
          Filters
          {hasActiveFilters() && (
            <div className="w-2 h-2 bg-white rounded-full ml-2"></div>
          )}
        </Button>
      </div>
      {/* Mobile Filter Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-[1000] bg-black/50" onClick={onToggle}>
          <div 
            className="fixed right-0 top-0 h-full w-80 bg-card border-l border-border shadow-elevated overflow-y-auto"
            onClick={(e) => e?.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Filters</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggle}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <FilterContent />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterPanel;