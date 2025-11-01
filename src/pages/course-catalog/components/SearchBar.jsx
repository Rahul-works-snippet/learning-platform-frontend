import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ searchQuery, onSearchChange, onSearch }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Mock search suggestions
  const mockSuggestions = [
    "React Development",
    "JavaScript Fundamentals", 
    "Python Programming",
    "Web Design",
    "Data Science",
    "Machine Learning",
    "Digital Marketing",
    "Photography Basics",
    "Business Strategy",
    "UI/UX Design"
  ];

  useEffect(() => {
    if (searchQuery?.length > 0) {
      const filtered = mockSuggestions?.filter(suggestion =>
        suggestion?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      setSuggestions(filtered?.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    setShowSuggestions(false);
    onSearch(searchQuery);
  };

  const handleSuggestionClick = (suggestion) => {
    onSearchChange(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  const handleInputFocus = () => {
    setIsSearchFocused(true);
    if (searchQuery?.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleClearSearch = () => {
    onSearchChange('');
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-2xl" ref={searchRef}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            <Icon name="Search" size={20} />
          </div>
          
          <Input
            type="search"
            placeholder="Search for courses, instructors, or topics..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            onFocus={handleInputFocus}
            className={`pl-10 pr-20 h-12 text-base transition-all duration-200 ${
              isSearchFocused ? 'ring-2 ring-primary' : ''
            }`}
          />
          
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleClearSearch}
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={16} />
              </Button>
            )}
            
            <Button
              type="submit"
              variant="default"
              size="sm"
              className="h-8"
            >
              <Icon name="Search" size={16} />
            </Button>
          </div>
        </div>
      </form>
      {/* Search Suggestions */}
      {showSuggestions && suggestions?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-elevated z-50 max-h-60 overflow-y-auto">
          <div className="py-2">
            {suggestions?.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="flex items-center w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors focus:outline-none focus:bg-muted"
              >
                <Icon name="Search" size={14} className="text-muted-foreground mr-3" />
                <span>{suggestion}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Popular Searches (when no query) */}
      {isSearchFocused && !searchQuery && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-elevated z-50">
          <div className="p-4">
            <h4 className="text-sm font-medium text-foreground mb-3">Popular Searches</h4>
            <div className="flex flex-wrap gap-2">
              {mockSuggestions?.slice(0, 6)?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-1 text-xs bg-muted text-muted-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;