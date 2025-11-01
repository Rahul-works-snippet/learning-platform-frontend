import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import UserMenu from './UserMenu';
import AuthenticationToggle from './AuthenticationToggle';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status from localStorage or context
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, [location]);

  const navigationItems = [
    {
      label: 'Course Catalog',
      path: '/course-catalog',
      icon: 'BookOpen',
      tooltip: 'Browse available courses'
    },
    {
      label: 'My Learning',
      path: '/student-dashboard',
      icon: 'GraduationCap',
      tooltip: 'View your enrolled courses',
      requiresAuth: true
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (isAuthenticated) {
      navigate('/student-dashboard');
    } else {
      navigate('/course-catalog');
    }
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-card border-b border-border shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-smooth focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md p-1"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">EduPlatform</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems?.map((item) => {
              if (item?.requiresAuth && !isAuthenticated) return null;
              
              return (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                    isActivePath(item?.path)
                      ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  title={item?.tooltip}
                >
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <UserMenu onLogout={() => setIsAuthenticated(false)} />
            ) : (
              <AuthenticationToggle />
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border shadow-elevated">
          <div className="px-4 py-2 space-y-1">
            {navigationItems?.map((item) => {
              if (item?.requiresAuth && !isAuthenticated) return null;
              
              return (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex items-center space-x-3 w-full px-3 py-3 rounded-md text-sm font-medium transition-smooth ${
                    isActivePath(item?.path)
                      ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </button>
              );
            })}
            
            {/* Mobile Auth Section */}
            <div className="pt-4 border-t border-border mt-4">
              {isAuthenticated ? (
                <div className="space-y-1">
                  <button
                    onClick={() => handleNavigation('/user-profile')}
                    className="flex items-center space-x-3 w-full px-3 py-3 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                  >
                    <Icon name="User" size={18} />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      localStorage.removeItem('authToken');
                      setIsAuthenticated(false);
                      setIsMobileMenuOpen(false);
                      navigate('/course-catalog');
                    }}
                    className="flex items-center space-x-3 w-full px-3 py-3 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                  >
                    <Icon name="LogOut" size={18} />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => handleNavigation('/login')}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="default"
                    fullWidth
                    onClick={() => handleNavigation('/register')}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;