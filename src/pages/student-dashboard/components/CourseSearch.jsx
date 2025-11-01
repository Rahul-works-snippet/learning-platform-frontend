import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const CourseSearch = ({ onSearch, enrolledCourses }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(query?.length > 0);
    
    if (query?.length > 0) {
      const filtered = enrolledCourses?.filter(course =>
        course?.title?.toLowerCase()?.includes(query?.toLowerCase()) ||
        course?.instructor?.toLowerCase()?.includes(query?.toLowerCase())
      );
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses([]);
      setIsSearching(false);
    }
    
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredCourses([]);
    setIsSearching(false);
    if (onSearch) {
      onSearch('');
    }
  };

  const handleCourseSelect = (course) => {
    console.log('Selected course:', course?.title);
    handleClearSearch();
  };

  return (
    <div className="relative">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search your enrolled courses..."
          value={searchQuery}
          onChange={(e) => handleSearch(e?.target?.value)}
          className="pl-10 pr-10"
        />
        <Icon 
          name="Search" 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
          >
            <Icon name="X" size={14} />
          </Button>
        )}
      </div>
      {/* Search Results Dropdown */}
      {isSearching && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-elevated z-50 max-h-64 overflow-y-auto">
          {filteredCourses?.length > 0 ? (
            <div className="py-2">
              {filteredCourses?.map((course) => (
                <button
                  key={course?.id}
                  onClick={() => handleCourseSelect(course)}
                  className="w-full px-4 py-3 text-left hover:bg-muted transition-smooth flex items-center space-x-3"
                >
                  <div className="w-12 h-8 bg-muted rounded overflow-hidden flex-shrink-0">
                    <img
                      src={course?.thumbnail}
                      alt={course?.thumbnailAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">
                      {course?.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {course?.instructor} • {course?.progress}% complete
                    </p>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                </button>
              ))}
            </div>
          ) : (
            <div className="py-8 px-4 text-center">
              <Icon name="Search" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No courses found</p>
              <p className="text-xs text-muted-foreground">
                Try searching with different keywords
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseSearch;