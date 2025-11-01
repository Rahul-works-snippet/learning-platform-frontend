import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';

const WelcomeHeader = () => {
  const { user, userProfile, profileLoading } = useAuth();

  if (profileLoading) {
    // Loading skeleton
    return (
      <div className="bg-gradient-to-r from-primary to-primary-dark rounded-xl p-6 text-white">
        <div className="animate-pulse">
          <div className="h-8 bg-white/20 rounded w-64 mb-2"></div>
          <div className="h-4 bg-white/20 rounded w-96"></div>
        </div>
      </div>
    );
  }

  const displayName = userProfile?.full_name || user?.email?.split('@')?.[0] || 'Student';
  const role = userProfile?.role || 'student';
  
  const getWelcomeMessage = () => {
    switch (role) {
      case 'instructor':
        return 'Ready to inspire and teach today?';
      case 'admin':
        return 'Managing the platform with excellence.';
      default:
        return 'Ready to continue your learning journey?';
    }
  };

  const getRoleDisplayName = () => {
    switch (role) {
      case 'instructor':
        return 'Instructor';
      case 'admin':
        return 'Administrator';
      default:
        return 'Student';
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary to-primary-dark rounded-xl p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Welcome back, {displayName}! 👋
          </h1>
          <p className="text-white/80 text-lg">
            {getWelcomeMessage()}
          </p>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <div className="text-right">
            <p className="text-white/60 text-sm">Role</p>
            <p className="font-semibold">{getRoleDisplayName()}</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold">
              {displayName?.charAt(0)?.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;