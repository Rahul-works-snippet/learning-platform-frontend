import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const UserMenu = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef?.current && !menuRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuItemClick = (action) => {
    setIsOpen(false);
    action();
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    onLogout();
    navigate('/course-catalog');
  };

  const menuItems = [
    {
      label: 'Profile',
      icon: 'User',
      action: () => navigate('/user-profile')
    },
    {
      label: 'My Learning',
      icon: 'BookOpen',
      action: () => navigate('/student-dashboard')
    },
    {
      label: 'Settings',
      icon: 'Settings',
      action: () => console.log('Settings clicked') // Placeholder for future implementation
    },
    {
      type: 'divider'
    },
    {
      label: 'Sign Out',
      icon: 'LogOut',
      action: handleLogout,
      variant: 'destructive'
    }
  ];

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-full ${isOpen ? 'bg-muted' : ''}`}
      >
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Icon name="User" size={16} color="white" />
        </div>
      </Button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-elevated z-[1010] animate-fade-in">
          <div className="py-2">
            <div className="px-4 py-3 border-b border-border">
              <p className="text-sm font-medium text-foreground">Student Account</p>
              <p className="text-xs text-muted-foreground">student@example.com</p>
            </div>
            
            <div className="py-1">
              {menuItems?.map((item, index) => {
                if (item?.type === 'divider') {
                  return <div key={index} className="my-1 border-t border-border" />;
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleMenuItemClick(item?.action)}
                    className={`flex items-center space-x-3 w-full px-4 py-2 text-sm transition-smooth hover:bg-muted focus:outline-none focus:bg-muted ${
                      item?.variant === 'destructive' ?'text-error hover:text-error' :'text-foreground'
                    }`}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={16} 
                      color={item?.variant === 'destructive' ? 'var(--color-error)' : 'currentColor'}
                    />
                    <span>{item?.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;